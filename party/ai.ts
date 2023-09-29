import {
  PartyKitServer,
  PartyKitConnection,
  PartyKitRoom,
} from 'partykit/server';
import { nanoid } from 'nanoid';
import type { Message, ChatMessage, UserMessage } from './utils/message';
import {
  getChatCompletionResponse,
  AIMessage,
  MAX_TOKENS,
} from './utils/openai';
import { notFound } from 'next/navigation';
import { error, ok } from './utils/response';

export const AI_USERNAME = 'AI';

/**
 * A chatroom party can request an AI to join it, and the AI party responds
 * by opening a WebSocket connection and simulating a user in the chatroom
 */
export default {
  async onRequest(req, room) {
    if (req.method !== 'POST') return notFound();

    const { id, action } = await req.json();
    if (action !== 'connect') return notFound();

    if (!room.env.OPENAI_API_KEY) return error('OPENAI_API_KEY not set');

    // open a websocket connection to the chatroom
    const chatRoom = room.parties.chatroom.get(id);
    const socket = chatRoom.connect();

    // simulate an user in the chatroom
    simulateUser(socket, room);

    return ok();
  },
} satisfies PartyKitServer;

function arrayToNaturalLanguage(arr: string[]) {
  if (arr.length === 0) {
    return '';
  } else if (arr.length === 1) {
    return arr[0];
  } else if (arr.length === 2) {
    return arr[0] + ' and ' + arr[1];
  } else {
    const commaSeparated = arr.slice(0, -1).join(', ');
    return commaSeparated + ', and ' + arr[arr.length - 1];
  }
}

// used to pull room details and inject into AI prompt in party/ai.ts
function processRoomDetails(rawString: string) {
  const allArr = rawString.split('_');
  const subject = allArr[0].replace('-', ' ');
  const topicsArr = allArr[1].replace('-', ' ').split('~');
  const expertsArr = allArr[2].replace('-', ' ').split('~');
  return { subject, topics: topicsArr, experts: expertsArr };
}

// act as a user in the room
function simulateUser(
  socket: PartyKitConnection['socket'],
  room: PartyKitRoom
) {
  let messages: Message[] = [];
  let identified = false;

  const PROMPT_MESSAGE_HISTORY_LENGTH = 5;

  const roomDetails = processRoomDetails(room.id);

  const PROMPT = `
    You are a participant in an internet chatroom about ${roomDetails.subject.replaceAll(
      '-',
      ' '
    )}.
    You are an expert in ${arrayToNaturalLanguage(roomDetails.topics)}.
    ${
      roomDetails.experts[0].length > 0
        ? `You are well-versed in the writings of ${arrayToNaturalLanguage(
            roomDetails.experts
          )}.`
        : ''
    }
    When presented with a chat history, you'll respond with interesting insights of how these topics might apply to the current conversation.
    Keep your responses no longer than a few sentences unless a chat participant explicitly tells you to "elaborate".
    Never exceed 5 sentences in a single response. Don't use unnecessary pleasantries, just get straight to the point.
    `;

  // listen to messages from the chatroom
  socket.addEventListener('message', message => {
    // before first message, let the room know who we are
    if (!identified) {
      identified = true;
      socket.send(
        JSON.stringify(<UserMessage>{
          type: 'identify',
          username: AI_USERNAME,
        })
      );
    }

    const data = JSON.parse(message.data as string) as ChatMessage;
    // the room sent us the whole list of messages
    if (data.type === 'sync') {
      messages = data.messages;
    }
    // a client updated a message
    if (data.type === 'edit') {
      messages = messages.map(m => (m.id === data.id ? data : m));
    }
    // a client sent a new message
    if (data.type === 'new') {
      messages.push(data);
      // don't respond to our own messages
      if (data.from.id !== AI_USERNAME && data.from.id !== 'system') {
        // construct a message history to send to the AI
        const prompt: AIMessage[] = [
          { role: 'system', content: PROMPT },
          ...messages.slice(-PROMPT_MESSAGE_HISTORY_LENGTH).map(message => ({
            role:
              message.from.id === AI_USERNAME
                ? ('assistant' as const)
                : ('user' as const),
            content: message.text,
          })),
        ];

        // give message an id so we can edit it
        const id = nanoid();
        let text = '';

        getChatCompletionResponse(
          room.env,
          prompt,
          () => {
            // post an empty message to start with
            socket.send(JSON.stringify(<UserMessage>{ type: 'new', id, text }));
          },
          token => {
            // edit the message as tokens arrive
            text += token;
            socket.send(
              JSON.stringify(<UserMessage>{ type: 'edit', id, text })
            );
          }
        );
      }
    }
  });
}

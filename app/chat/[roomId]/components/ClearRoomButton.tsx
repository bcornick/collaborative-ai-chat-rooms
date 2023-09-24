'use client';

import { useState } from 'react';
import { PARTYKIT_URL } from '@/app/env';
import { useRouter } from 'next/navigation';
import { SINGLETON_ROOM_ID } from '@/party/chatRooms';

export default function ClearRoomButton(props: { roomId: string }) {
  const router = useRouter();

  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const clearRoom = () => {
    fetch(`${PARTYKIT_URL}/parties/chatroom/${props.roomId}`, {
      method: 'DELETE',
    });
    setShowClearConfirmation(false);
  };
  const deleteRoom = () => {
    fetch(`${PARTYKIT_URL}/parties/chatrooms/${SINGLETON_ROOM_ID}`, {
      method: 'POST',
      body: JSON.stringify({
        id: props.roomId,
        action: 'delete',
      }),
    });
    router.push('/chat/');
  };
  return (
    <>
      {showClearConfirmation && (
        <div className="flex flex-wrap gap-2 justify-start items-center">
          <button
            className="outline outline-1 outline-red-400 rounded-full px-3 py-1 text-red-400 text-sm hover:bg-red-200 hover:text-red-500 whitespace-nowrap dark:outline-fuchsia-500 dark:text-fuchsia-500 dark:hover:bg-fuchsia-200"
            onClick={clearRoom}>
            I&apos;m sure! Clear all messages for everyone!
          </button>
          <button
            className="outline outline-1 outline-stone-400 rounded-full px-3 py-1 text-stone-400 text-sm hover:bg-stone-200 hover:text-stone-500 whitespace-nowrap"
            onClick={() => setShowClearConfirmation(false)}>
            No, don&apos;t clear
          </button>
        </div>
      )}
      {!showClearConfirmation && !showDeleteConfirmation && (
        <button
          className="outline outline-1 outline-stone-400 rounded-full px-3 py-1 text-stone-400 text-sm hover:bg-stone-200 hover:text-stone-500 whitespace-nowrap"
          onClick={() => setShowClearConfirmation(true)}>
          Clear all messages
        </button>
      )}
      {showDeleteConfirmation && (
        <div className="flex flex-wrap gap-2 justify-start items-center">
          <button
            className="outline outline-1 outline-red-400 rounded-full px-3 py-1 text-red-400 text-sm hover:bg-red-200 hover:text-red-500 whitespace-nowrap dark:outline-fuchsia-500 dark:text-fuchsia-500 dark:hover:bg-fuchsia-200"
            onClick={deleteRoom}>
            I&apos;m sure! Delete this room for everyone!
          </button>
          <button
            className="outline outline-1 outline-stone-400 rounded-full px-3 py-1 text-stone-400 text-sm hover:bg-stone-200 hover:text-stone-500 whitespace-nowrap"
            onClick={() => setShowDeleteConfirmation(false)}>
            No, don&apos;t delete
          </button>
        </div>
      )}
      {!showDeleteConfirmation && !showClearConfirmation && (
        <button
          className="outline outline-1 outline-stone-400 rounded-full px-3 py-1 text-stone-400 text-sm hover:bg-stone-200 hover:text-stone-500 whitespace-nowrap"
          onClick={() => setShowDeleteConfirmation(true)}>
          Delete this room
        </button>
      )}
    </>
  );
}

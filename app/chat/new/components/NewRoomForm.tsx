'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { PARTYKIT_URL } from '@/app/env';
import short from 'short-uuid';

type RoomDetailsType = {
  subject: string;
  topics: string;
  experts: string;
};

function splitStringByComma(inputString: string) {
  // Split the input string by commas and trim each element
  const resultArray = inputString.split(',').map(item => item.trim());

  // Remove empty strings from the result array
  const filteredArray = resultArray.filter(item => item !== '');

  return filteredArray;
}

const NewRoomForm = () => {
  const uuid = short.generate();
  const router = useRouter();

  const [roomDetails, setRoomDetails] = useState<RoomDetailsType>({
    subject: '',
    topics: '',
    experts: '',
  });

  const [invalidInput, setInvalidInput] = useState({
    subject: true,
    topics: true,
    experts: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const subjectArr = splitStringByComma(roomDetails.subject);
    const topicsArr = splitStringByComma(roomDetails.topics);
    const expertsArr = splitStringByComma(roomDetails.experts);
    const newRoomUrl = `${
      subjectArr.join('~').replaceAll(' ', '-') +
      '_' +
      topicsArr.join('~').replaceAll(' ', '-') +
      '_' +
      expertsArr.join('~').replaceAll(' ', '-') +
      '_' +
      uuid
    }`;
    await fetch(`${PARTYKIT_URL}/parties/chatroom/${newRoomUrl}`, {
      method: 'POST',
    });
    router.push(`/chat/${newRoomUrl}`);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const pattern = /^[a-zA-Z0-9, ]+$/;
    const isValid = pattern.test(value);
    setRoomDetails({
      ...roomDetails,
      [name]: value,
    });
    setInvalidInput({
      ...invalidInput,
      [name]: !isValid,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-900">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-50"
          htmlFor="subject">
          Room name
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:text-gray-100 dark:bg-gray-800 ${
            invalidInput.subject ? 'border-red-500 dark:border-fuchsia-600' : ''
          }`}
          id="subject"
          name="subject"
          value={roomDetails.subject}
          type="text"
          placeholder="A name that represents the main subject of the room..."
          onChange={handleInputChange}
        />
        {invalidInput.subject && (
          <p className="text-red-500 text-xs italic dark:text-fuchsia-600">
            This field is required. Only a-Z 0-9
          </p>
        )}
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-50"
          htmlFor="topics">
          What is this room about?
        </label>
        <input
          className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:text-gray-100 dark:bg-gray-800 ${
            invalidInput.topics ? 'border-red-500 dark:border-fuchsia-600' : ''
          }`}
          id="topics"
          name="topics"
          value={roomDetails.topics}
          type="text"
          placeholder="Separate topics by comma"
          onChange={handleInputChange}
        />
        {invalidInput.topics && (
          <p className="text-red-500 text-xs italic dark:text-fuchsia-600">
            This field is required. Only a-Z 0-9 ,
          </p>
        )}
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-50"
          htmlFor="experts">
          What authors or influencers are experts in this subject? (Optional)
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:text-gray-100 dark:bg-gray-800 ${
            invalidInput.experts && roomDetails.experts.length > 0
              ? 'border-red-500 dark:border-fuchsia-600'
              : ''
          }`}
          id="experts"
          name="experts"
          value={roomDetails.experts}
          type="text"
          placeholder="Separate experts by comma"
          onChange={handleInputChange}
        />
        {invalidInput.experts && roomDetails.experts.length > 0 && (
          <p className="text-red-500 text-xs italic dark:text-fuchsia-600">
            Only a-Z 0-9 ,
          </p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-stone-200 hover:bg-stone-300 disabled:opacity-50 disabled:bg-stone-200 p-2 rounded text-stone-600 whitespace-nowrap dark:text-gray-50 dark:bg-gray-700 dark:text-gray-100"
          type="submit"
          disabled={
            invalidInput.subject ||
            invalidInput.topics ||
            (invalidInput.experts && roomDetails.experts.length > 0)
          }>
          Create room -&gt;
        </button>
        <a
          className="inline-block align-baseline underline"
          href="/chat">
          Back to all rooms
        </a>
      </div>
    </form>
  );
};

export default NewRoomForm;

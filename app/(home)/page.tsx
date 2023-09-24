'use client';

import Link from 'next/link';
import { useCursors } from './cursors-provider';

export default function Home() {
  const { getCount } = useCursors();
  const count = getCount();

  return (
    <div className="w-full flex flex-col gap-8">
      <section className="bg-cyan-100 w-1/2 p-2 rounded flex justify-center self-center items-center text-xl dark:bg-cyan-800">
        <p>
          People here now: <strong>{count}</strong> 👋
        </p>
      </section>
      <section className="flex flex-col gap-2">
        <h1 className="text-4xl font-medium pb-6">
          VSD Collaborative AI Chat Rooms
        </h1>
        <p>What you can do here...</p>
        <ul className="list-disc list-inside">
          <li>
            Participate in multiplayer chat rooms focused on various topics
          </li>
          <li>Converse with AI chatbots that adapt to the conversation</li>
          <li>Create your own topic-specific chat rooms</li>
        </ul>
        <p>
          <strong>NOTE:</strong> A Github account is required to participate in
          chats. Create one{' '}
          <Link
            href="https://github.com/"
            rel="noreferrer"
            target="_blank"
            className="underline">
            here
          </Link>
          .
        </p>
      </section>
      <Link
        href="/chat"
        className="flex w-1/4 items-center underline justify-center px-10 py-6 border border-stone-200 rounded-lg shadow hover:shadow-md dark:bg-gray-900 dark:shadow-gray-700 dark:border-gray-600">
        AI Chat -&gt;
      </Link>
    </div>
  );
}

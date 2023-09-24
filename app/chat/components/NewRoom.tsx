'use client';

import Link from 'next/link';

export default function NewRoom() {
  return (
    <div className="mt-6 flex flex-row flex-wrap justify-start items-center gap-2">
      <Link
        href="/chat/new"
        className="bg-stone-200 hover:bg-stone-300 px-2 py-1 rounded whitespace-nowrap dark:bg-gray-900 dark:text-gray-50 dark:hover:bg-gray-950">
        Create a new room -&gt;
      </Link>
    </div>
  );
}

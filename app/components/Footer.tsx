import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';

export default function Footer() {
  return (
    <footer className="py-4 px-4 sm:px-6 w-full">
      <div className="pt-4 max-w-7xl m-auto text-sm text-stone-400 flex flex-row justify-between">
        <div className="flex flex-col gap-1 justify-start">
          <p>
            Built with{' '}
            <Link
              href="https://nextjs.org"
              className="underline">
              Next.js
            </Link>{' '}
            and{' '}
            <Link
              href="https://partykit.io"
              className="underline">
              PartyKit
            </Link>
          </p>
        </div>
        <div className="flex justify-end gap-5">
          <ThemeSwitcher />
          <Link
            href="https://github.com/bcornick/collaborative-ai-chat-rooms"
            className="bg-stone-200 hover:bg-stone-300 p-2 rounded text-stone-600 whitespace-nowrap dark:bg-gray-900 dark:text-gray-50 dark:hover:bg-gray-950">
            View on GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}

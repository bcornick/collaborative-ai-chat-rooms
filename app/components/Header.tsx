import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import type { User } from '@/party/utils/auth';
import Link from 'next/link';
import Signout from './Signout';
import Avatar from './Avatar';

export default async function Header() {
  const session = await getServerSession(authOptions);
  const user = session?.user as User | null;

  return (
    <header className="z-10 p-4 sm:p-6 w-full border-b border-stone-300 absolute sticky top-0 bg-white/80 backdrop-blur dark:bg-gray-900 dark:border-none">
      <nav className="max-w-7xl m-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex flex-column gap-2">
          <svg
            width="25"
            height="40"
            viewBox="0 0 665 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M661.698 352.156L662.75 352L665 350L662.75 348L656 347H656.364C523.191 329.129 360.217 230.273 350.46 20.0402C349.948 9.00635 341.028 -0.0594503 329.999 0.561888C146.006 10.9276 0 163.413 0 350C0 536.587 146.006 689.072 329.999 699.438C341.028 700.059 349.95 690.988 350.44 679.953C360.039 463.492 524.964 367.301 661.698 352.156Z"
              fill="currentColor"
            />
          </svg>
          <h1 className="font-medium my-2">VSD AI Chat Rooms</h1>
        </Link>
        {user && (
          <div className="flex gap-2 items-center">
            <Avatar
              username={user.username}
              image={user.image ?? null}
            />
            <span>Hi {user.username}!</span>
            <Signout />
          </div>
        )}
      </nav>
    </header>
  );
}

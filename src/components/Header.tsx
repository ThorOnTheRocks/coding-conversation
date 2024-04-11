import { Input } from './ui/input';
import AuthHeader from './AuthHeader';
import Link from 'next/link';
import * as paths from '../routes/routes';

export default function Header() {
  return (
    <nav className="flex items-center justify-between px-6 py-8 bg-gray-100">
      <Link href={paths.paths.home()}>Coding Conversations</Link>
      <div className="flex-grow mx-4">
        <Input
          className="px-4 py-2 rounded-md border border-gray-300"
          type="text"
        />
      </div>
      <div className="min-w-[200px] duration-500 transition-opacity ease-in-out">
        <AuthHeader />
      </div>
    </nav>
  );
}

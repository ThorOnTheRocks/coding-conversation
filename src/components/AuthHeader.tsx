'use client';

import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { signIn } from '@/actions';
import { useSession } from 'next-auth/react';
import { signOut } from '../actions/signOut';
import { Skeleton } from './ui/skeleton';

export default function AuthHeader() {
  const session = useSession();

  let authContent: React.ReactNode;

  if (session.status === 'loading') {
    authContent = <Skeleton className="w-32 h-10 bg-transparent" />;
  } else if (session.data?.user) {
    authContent = (
      <div className="text-center h-10">
        <Popover>
          <PopoverTrigger>
            {' '}
            <Avatar>
              <AvatarImage
                src={session.data.user.image || ''}
                className="w-10 h-10 rounded-full items-center"
              />
              <AvatarFallback>
                {session.data.user.name}
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <form action={signOut}>
              <Button type="submit">Sign out</Button>
            </form>
          </PopoverContent>
        </Popover>
      </div>
    );
  } else {
    authContent = (
      <form action={signIn} className="flex items-center space-x-2">
        <Button
          type="submit"
          variant="outline"
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          Sign in
        </Button>
        <Button
          type="submit"
          variant="secondary"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Sign Up
        </Button>
      </form>
    );
  }

  return <div>{authContent}</div>;
}

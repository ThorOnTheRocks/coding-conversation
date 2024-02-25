'use client';

import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Skeleton } from './ui/skeleton';
import { signIn } from '@/actions';
import { useSession } from 'next-auth/react';
import { signOut } from '../actions/signOut';
import { Suspense } from 'react';

export default function AuthHeader() {
  const session = useSession();

  let authContent: React.ReactNode;

  if (session.status === 'loading') {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover>
        <PopoverTrigger>
          {' '}
          <Avatar>
            <AvatarImage src={session.data.user.image || ''} />
            <AvatarFallback>{session.data.user.name}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <form action={signOut}>
            <Button type="submit">Sign out</Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <form action={signIn}>
        <Button type="submit" variant="outline">
          Sign in
        </Button>
        <Button type="submit" variant="secondary">
          Sign Up
        </Button>
      </form>
    );
  }

  return (
    <div className="flex align-center justify-between">
      <Suspense fallback={<Skeleton />}>{authContent}</Suspense>
    </div>
  );
}

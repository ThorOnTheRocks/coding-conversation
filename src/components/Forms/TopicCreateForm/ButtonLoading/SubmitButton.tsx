'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

type SubmitButtonProps = {
  children: React.ReactNode;
  isPending: boolean;
};

export function SubmitButton({
  children,
  isPending,
}: SubmitButtonProps) {
  console.log('pending: ', isPending);
  return (
    <div>
      <Button
        type="submit"
        aria-disabled={isPending}
        className="border-white"
        disabled={isPending}
      >
        {isPending ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <></>
        )}
        {children}
      </Button>
    </div>
  );
}

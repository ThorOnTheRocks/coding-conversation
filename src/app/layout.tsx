import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import '@/styles/globals.css';
import Providers from './providers';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Coding Conversations',
  description: 'Social media app about coding',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          <Header />
        </Providers>
        {children}
      </body>
    </html>
  );
}

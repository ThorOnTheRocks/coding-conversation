import { Button } from '@/components/ui/button';
import { signIn } from '@/actions/signIn';
import { signOut } from '@/actions/signOut';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Homepage
    </main>
  );
}

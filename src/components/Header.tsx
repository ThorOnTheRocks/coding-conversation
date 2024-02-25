import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';
import AuthHeader from './AuthHeader';

export default function Header() {
  return (
    <nav className="m-3 flex items-center justify-between">
      <h2>Coding Conversations</h2>
      <Input className="rounded max-w-80" />
      <AuthHeader />
    </nav>
  );
}

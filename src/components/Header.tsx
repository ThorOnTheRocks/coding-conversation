import { Input } from './ui/input';
import AuthHeader from './AuthHeader';

export default function Header() {
  return (
    <nav className="m-3 flex items-center justify-between">
      <h2>Coding Conversations</h2>
      <div>
        <Input className="rounded max-w-80" type="text" />
      </div>
      <div>
        <AuthHeader />
      </div>
    </nav>
  );
}

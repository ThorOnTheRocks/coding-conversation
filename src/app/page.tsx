import { Button } from '@/components/ui/button';
import TopicCreateForm from '@/components/Forms/TopicCreateForm/TopicCreateForm';

export default async function Home() {
  return (
    <main className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Posts</h1>
      </div>
      <div>
        <TopicCreateForm />
      </div>
    </main>
  );
}

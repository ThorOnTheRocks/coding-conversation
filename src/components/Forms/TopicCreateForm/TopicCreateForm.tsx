'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { createTopic } from '@/actions/create-topic';

function TopicCreateForm() {
  const [formState, formAction] = useFormState(createTopic, {
    errors: {},
  });
  console.log(formState.errors);
  return (
    <div className="">
      <Dialog>
        <DialogTrigger>Create New Topic</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-white">
              New Topic
            </DialogTitle>
          </DialogHeader>
          <form action={formAction}>
            <div>
              <Label htmlFor="name" className="text-white">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                className="border-white"
              />
              {formState.errors.name ? (
                <div className="rounded p-2 bg-red-200 border border-red-400">
                  {formState.errors.name?.join(', ')}
                </div>
              ) : null}
            </div>
            <div>
              <Label htmlFor="description" className="text-white">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                type="text"
                className="border-white text-white"
              />
              {formState.errors.description ? (
                <div className="rounded p-2 bg-red-200 border border-red-400">
                  {formState.errors.description?.join(', ')}
                </div>
              ) : null}
            </div>
            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState.errors._form?.join(', ')}
              </div>
            ) : null}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TopicCreateForm;

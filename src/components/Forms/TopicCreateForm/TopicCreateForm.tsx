'use client';

import { z } from 'zod';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useFormState } from 'react-dom';
import { createTopic } from '@/actions/create-topic';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTopicValidation } from '@/schemas/createTopicValidationSchema';

function TopicCreateForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, formAction] = useFormState(createTopic, {
    message: '',
  });

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.output<typeof createTopicValidation>>({
    resolver: zodResolver(createTopicValidation),
    defaultValues: {
      name: '',
      description: '',
      ...(formState.fields ?? {}),
    },
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
          <Form {...form}>
            {formState.message !== '' && !formState.errors && (
              <div className="text-red-500">{formState.message}</div>
            )}
            {formState.errors && (
              <div className="text-red-500">
                <ul>
                  {formState.errors.map((error) => (
                    <li key={error} className="flex gap-1">
                      <X fill="red" />
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <form
              ref={formRef}
              className="space-y-8"
              action={formAction}
              onSubmit={(evt) => {
                evt.preventDefault();
                form.handleSubmit(() => {
                  formAction(new FormData(formRef.current!));
                })(evt);
              }}
            >
              <div className="flex flex-col gap-2">
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your topic name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your topic description.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TopicCreateForm;

'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { createTopicValidation } from '@/schemas/createTopicValidationSchema';
import prisma from '@/db';
import * as path from '../routes/routes';
import type { TopicFormState } from '@/types/TopicForm.types';
import type { Topic } from '@prisma/client';

export async function createTopic(
  formState: TopicFormState,
  data: FormData
): Promise<TopicFormState> {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const formData = Object.fromEntries(data);
  const parsed = createTopicValidation.safeParse(formData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(fields)) {
      fields[key] = formData[key].toString();
    }
    return {
      message: 'Invalid form data',
      fields,
      errors: parsed.error.issues.map((issue) => issue.message),
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      message: 'You must be signed in to do this!',
    };
  }

  let topic: Topic;
  try {
    topic = await prisma?.topic.create({
      data: {
        slug: parsed.data.name,
        description: parsed.data.description,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: 'Something went wrong!',
      };
    }
  }
  // TODO: revalidate homepage
  revalidatePath('/');
  redirect(path.paths.topicShow(topic.slug));
}

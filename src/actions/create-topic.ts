'use server';

import { createTopicValidation } from '@/schemas/createTopicValidationSchema';

import { CreateTopicFormState } from '@/types/TopicForm.types';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import * as path from '../routes/routes';
import { revalidatePath } from 'next/cache';
import prisma from '@/db';
import type { Topic } from '@prisma/client';

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const result = createTopicValidation.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });
  console.log(
    'form submission: ',
    `${formState.errors.name} ${formState.errors.description}`
  );

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      },
    };
  }

  let topic: Topic;
  try {
    topic = await prisma?.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      };
    }
  }
  // TODO: revalidate homepage
  revalidatePath('/');
  redirect(path.paths.topicShow(topic.slug));
}

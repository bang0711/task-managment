'use server';

import { revalidatePath } from 'next/cache';

import prisma from './prisma';

const CURRENT_URL = '/dashboard/projects/';

export const createProject = async (name: string) => {
  await prisma.project.create({
    data: {
      name
    }
  });

  revalidatePath(CURRENT_URL);

  return { message: 'Project created successfully', statusCode: 201 };
};

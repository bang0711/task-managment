'use server';

import { revalidatePath } from 'next/cache';

import prisma from './prisma';

const CURRENT_URL = '/dashboard/projects/';

export const createTask = async (columnId: string, title: string) => {
  const column = await prisma.column.findUnique({
    where: {
      id: columnId
    },
    include: {
      tasks: true
    }
  });

  if (!column) {
    return { message: 'Column not found', statusCode: 404 };
  }

  await prisma.task.create({
    data: {
      title,
      columnId,
      order: column.tasks.length + 1
    }
  });

  revalidatePath(`${CURRENT_URL}${column.projectId}`);

  return { message: 'Task created', statusCode: 201 };
};

export const changeTaskOrder = async (id: string, order: number) => {
  const task = await prisma.task.findUnique({
    where: {
      id
    }
  });

  // Check if both columns were found
  if (!task) {
    return { message: 'Task not found', statusCode: 404 };
  }

  await prisma.task.update({
    where: {
      id
    },
    data: {
      order
    }
  });
  return { message: 'Task updated', statusCode: 200 };
};

export const changeTaskColumn = async (
  id: string,
  columnId: string,
  order: number
) => {
  const task = await prisma.task.findUnique({
    where: {
      id
    }
  });

  if (!task) {
    return { message: 'Task not found', statusCode: 404 };
  }

  await prisma.task.update({
    where: {
      id
    },
    data: {
      columnId,
      order
    }
  });

  return { message: 'Task updated', statusCode: 200 };
};

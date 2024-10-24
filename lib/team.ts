'use server';
import { revalidatePath } from 'next/cache';
import prisma from './prisma';

const CURRENT_URL = '/teams';

export const createTeam = async (name: string, icon: number) => {
  const newTeam = await prisma.team.create({
    data: {
      name,
      icon
    }
  });

  revalidatePath(CURRENT_URL);

  return { message: 'Team created successfully', statusCode: 201, newTeam };
};

export const deleteTeam = async (id: string) => {
  await prisma.team.delete({
    where: {
      id
    }
  });

  revalidatePath(CURRENT_URL);

  return { message: 'Team deleted successfully', statusCode: 200 };
};

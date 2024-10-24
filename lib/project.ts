'use server';

import { revalidatePath } from 'next/cache';

import prisma from './prisma';

const CURRENT_URL = '/teams/';

export const createProject = async (name: string, teamId: string) => {
  const newProject = await prisma.project.create({
    data: {
      name,
      teamId
    }
  });

  revalidatePath(`${CURRENT_URL}${teamId}`);

  return {
    message: 'Project created successfully',
    statusCode: 201,
    newProject
  };
};

export const deleteProject = async (
  id: string,
  currentProjectId: string,
  teamId: string
) => {
  let response = {
    message: '',
    statusCode: 200,
    redirect: false
  };
  await prisma.project.delete({
    where: {
      id
    }
  });
  response.message = 'Project deleted successfully';
  response.statusCode = 200;
  if (id === currentProjectId) {
    response.redirect = true;
  } else {
    response.redirect = false;
  }

  // revalidatePath(`${CURRENT_URL}${teamId}`);

  return response;
};

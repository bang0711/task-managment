'use server';
import { revalidatePath } from 'next/cache';
import prisma from './prisma';

const CURRENT_URL = '/team/';

type NewColumn = {
  title: string;
  projectId: string;
};

export const createColumn = async ({ title, projectId }: NewColumn) => {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId
    },
    include: {
      columns: true
    }
  });

  if (!project) {
    return { message: 'Project not found', statusCode: 404 };
  }

  const { columns } = project;

  if (columns.some((column) => column.title === title)) {
    return {
      message: 'Column with same title already exists',
      statusCode: 400
    };
  }

  await prisma.column.create({
    data: {
      title,
      projectId,
      order: columns.length + 1
    }
  });

  revalidatePath(`${CURRENT_URL}${project.teamId}/projects/${projectId}`);

  return {
    message: 'Column created successfully',
    statusCode: 201
  };
};

export const changeColumnOrder = async (
  sourceColId: string,
  destinationColId: string
) => {
  const [sourceCol, destinationCol] = await Promise.all([
    prisma.column.findUnique({
      where: {
        id: sourceColId
      }
    }),
    prisma.column.findUnique({
      where: {
        id: destinationColId
      }
    })
  ]);

  // Check if both columns were found
  if (!sourceCol || !destinationCol) {
    return { message: 'One or both column not found', statusCode: 404 };
  }

  // Swap the order of the two columns
  await prisma.$transaction([
    prisma.column.update({
      where: {
        id: sourceColId
      },
      data: {
        order: destinationCol.order
      }
    }),
    prisma.column.update({
      where: {
        id: destinationColId
      },
      data: {
        order: sourceCol.order
      }
    })
  ]);

  return { message: 'Column updated', statusCode: 200 };
};

export const deleteColumn = async (id: string) => {
  const column = await prisma.column.findUnique({
    where: {
      id
    },
    include: {
      Project: {
        select: {
          id: true,
          teamId: true
        }
      }
    }
  });

  if (!column) {
    return { message: 'Column not found', statusCode: 404 };
  }

  await prisma.column.delete({
    where: {
      id
    }
  });
  revalidatePath(
    `${CURRENT_URL}${column.Project?.teamId}/projects/${column.projectId}`
  );

  return { message: 'Column deleted', statusCode: 200 };
};

export const updateColumn = async (id: string, title: string) => {
  const [project, column] = await Promise.all([
    prisma.project.findFirst({
      where: {
        columns: {
          some: {
            id
          }
        }
      },
      include: {
        columns: {
          select: {
            title: true
          }
        }
      }
    }),
    prisma.column.findUnique({
      where: {
        id
      }
    })
  ]);
  if (!column || !project) {
    return { message: 'Column or project not found', statusCode: 404 };
  }

  if (project.columns.some((c) => c.title === title)) {
    return {
      message: 'Column with same title already exists',
      statusCode: 400
    };
  }

  await prisma.column.update({
    where: {
      id
    },
    data: {
      title
    }
  });

  revalidatePath(`${CURRENT_URL}${project.teamId}/projects/${project.id}`);

  return { message: 'Column updated', statusCode: 200 };
};

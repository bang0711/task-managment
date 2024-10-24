import prisma from '@/lib/prisma';

import { KanbanViewPage } from '@/sections/kanban/view';

import { redirect } from 'next/navigation';

type Props = {
  params: {
    projectId: string;
  };
};

async function ProjectDetailKanban({ params: { projectId } }: Props) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      columns: {
        include: {
          tasks: true // Include tasks through columns
        }
      }
    }
  });

  if (!project) {
    return redirect('/dashboard/projects');
  }

  const { columns } = project;

  return <KanbanViewPage project={project} columns={columns} />;
}

export default ProjectDetailKanban;

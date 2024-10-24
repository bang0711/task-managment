import ShadcnSidebar from '@/components/layout/sidebar/sidebar';

import prisma from '@/lib/prisma';
import { KanbanViewPage } from '@/sections/kanban/view';

import { redirect } from 'next/navigation';

import React from 'react';

type Props = {
  params: {
    projectId: string;
    teamId: string;
  };
};

async function ProjectDetailPage({ params: { projectId, teamId } }: Props) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      columns: {
        include: {
          tasks: true
        }
      },
      Team: true
    }
  });

  if (!project) {
    return redirect(`/teams/${teamId}`);
  }

  const { columns } = project;

  return (
    <ShadcnSidebar projectId={projectId} teamId={teamId}>
      <KanbanViewPage columns={columns} />
    </ShadcnSidebar>
  );
}

export default ProjectDetailPage;

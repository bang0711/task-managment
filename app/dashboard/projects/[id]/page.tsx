import PageContainer from '@/components/layout/page-container';
import prisma from '@/lib/prisma';
import { KanbanViewPage } from '@/sections/kanban/view';
import { redirect } from 'next/navigation';

import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

async function ProjectDetailPage({ params: { id } }: Props) {
  const project = await prisma.project.findUnique({
    where: { id },
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

  return (
    <PageContainer scrollable>
      <KanbanViewPage columns={columns} />
    </PageContainer>
  );
}

export default ProjectDetailPage;

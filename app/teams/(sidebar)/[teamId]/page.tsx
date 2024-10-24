import ShadcnSidebar from '@/components/layout/sidebar/sidebar';

import { Heading } from '@/components/ui/heading';

import prisma from '@/lib/prisma';

import ProjectCard from '@/sections/project/project-card';
import ProjectCreateForm from '@/sections/project/project-create-form';

import React from 'react';

type Props = {
  params: {
    teamId: string;
  };
};

async function TeamPage({ params: { teamId } }: Props) {
  const projects = await prisma.project.findMany({
    where: {
      teamId
    }
  });

  return (
    <ShadcnSidebar teamId={teamId}>
      <div className="space-y-3">
        <div className="flex max-w-full items-center gap-5">
          <Heading title={`Projects`} description="Manage tasks by dnd" />
          <ProjectCreateForm teamId={teamId} />
        </div>
        <div className="flex flex-1 flex-col gap-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3 lg:grid-cols-4">
            {projects.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </div>
        </div>
      </div>
    </ShadcnSidebar>
  );
}

export default TeamPage;

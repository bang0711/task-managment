import prisma from '@/lib/prisma';

import { Metadata } from 'next';

import React from 'react';

type Props = {
  params: {
    projectId: string;
  };
  children: React.ReactNode;
};
export const generateMetadata = async ({
  params: { projectId }
}: Props): Promise<Metadata> => {
  const project = await prisma.project.findUnique({
    where: { id: projectId }
  });

  return {
    title: project ? project.name : 'Project Not Found'
  };
};

function ProjectDetailLayout({ children }: Props) {
  return <>{children}</>;
}

export default ProjectDetailLayout;

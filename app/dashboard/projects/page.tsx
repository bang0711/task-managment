import prisma from '@/lib/prisma';
import { ProjectViewPage } from '@/sections/project/view';

import React from 'react';

type Props = {};

export const metadata = {
  title: 'Dashboard : Projects'
};

async function ProjectPage({}: Props) {
  const projects = await prisma.project.findMany();

  return <ProjectViewPage projects={projects} />;
}

export default ProjectPage;

import { Breadcrumbs } from '@/components/breadcrumbs';

import { Heading } from '@/components/ui/heading';

import React from 'react';

import ProjectCreateForm from './project-create-form';
import ProjectCard from './project-card';

import { Project } from '@prisma/client';

type Props = {
  projects: Project[];
};

const items = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Project', link: '/dashboard/project' }
];

function ProjectViewPage({ projects }: Props) {
  return (
    <div className="flex-1 space-y-4">
      <Breadcrumbs items={items} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Projects (${projects.length})`}
          description="Manage projects (Server side table functionalities.)"
        />

        <ProjectCreateForm teamId="" />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
}

export default ProjectViewPage;

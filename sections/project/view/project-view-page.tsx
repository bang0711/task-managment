import { Breadcrumbs } from '@/components/breadcrumbs';

import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';

import React from 'react';

import ProjectCreateForm from '../project-create-form';
import ProjectTable from '../project-table';
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
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Breadcrumbs items={items} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Projects (${projects.length})`}
            description="Manage projects (Server side table functionalities.)"
          />

          <ProjectCreateForm />
        </div>

        <ProjectTable data={projects} totalData={projects.length} />
      </div>
    </PageContainer>
  );
}

export default ProjectViewPage;

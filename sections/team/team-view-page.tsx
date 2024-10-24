import React from 'react';

import TeamCard from './team-card';

import { Team } from '@prisma/client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import PageContainer from '@/components/layout/page-container';
import TeamCreateForm from './team-create-form';

type Props = {
  teams: Team[];
};

function TeamViewPage({ teams }: Props) {
  return (
    <PageContainer scrollable>
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <Heading
            title={`Teams (${teams.length})`}
            description="Manage Teams"
          />

          <TeamCreateForm />
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

export default TeamViewPage;

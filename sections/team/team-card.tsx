import { Team } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TeamDeleteForm from './team-delete-form';

type Props = {
  team: Team;
};

function TeamCard({ team }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{team.name}</CardTitle>
        <CardDescription className="italic">
          {team.createdAt.toUTCString()}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center justify-between">
        <Link href={`/teams/${team.id}`}>
          <Button>View</Button>
        </Link>

        <div>
          <TeamDeleteForm teamId={team.id} />
        </div>
      </CardFooter>
    </Card>
  );
}

export default TeamCard;

'use client';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton } from '@/components/ui/sidebar';

import { Link } from 'next-view-transitions';

import { teamIconMap } from '@/constants';

import { ChevronsUpDown } from 'lucide-react';

import { Team } from '@prisma/client';

import TeamCreateForm from '@/sections/team/team-create-form';

type Props = {
  activeTeam: Team;
  teams: Team[];
  teamId: string;
};

function TeamList({ activeTeam, teams, teamId }: Props) {
  const getTeamIcon = (icon: number) => {
    const Icon = teamIconMap[icon];
    return <Icon className="size-4" />;
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            {getTeamIcon(activeTeam.icon)}
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{activeTeam.name}</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="start"
        side="bottom"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Teams
        </DropdownMenuLabel>
        {teams
          .filter((team) => team.id !== teamId)
          .map((team) => (
            <DropdownMenuItem key={team.id} className="mb-2 p-2">
              <Link className="flex w-full gap-2" href={`/teams/${team.id}`}>
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {getTeamIcon(team.icon)}
                </div>
                {team.name}
              </Link>
            </DropdownMenuItem>
          ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <TeamCreateForm isButton={false} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TeamList;

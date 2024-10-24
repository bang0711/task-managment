import * as React from 'react';

import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger
} from '@/components/ui/sidebar';

import TeamList from './team-list';
import UserActions from './user-actions';
import PageContainer from '../page-container';
import ProjectList from './project-list';
import SidebarMainItems from './sidebar-main-items';

import { Breadcrumbs } from '@/components/breadcrumbs';

import { redirect } from 'next/navigation';

import { generateBreadcrumbs, getSidebarTeam } from '@/lib/utils';

// This is sample data.

type Props = {
  children: React.ReactNode;
  teamId: string;
  projectId?: string;
};

export default async function ShadcnSidebar({
  children,
  teamId,
  projectId = ''
}: Props) {
  const { teams, activeTeam } = await getSidebarTeam(teamId);

  if (!activeTeam) {
    return redirect('/teams');
  }
  let project;
  if (projectId) {
    project = activeTeam.projects.find((p) => p.id === projectId);

    if (!project) {
      return redirect(`/teams/${teamId}`);
    }
  }

  // Dynamically generate breadcrumb items based on the team and project
  const breadcrumbItems = generateBreadcrumbs([
    { title: 'Teams', path: '' },
    { title: activeTeam.name, path: `${teamId}` },
    ...(project
      ? [
          { title: 'Projects', path: `projects` },
          {
            title: project.name,
            path: `/${projectId}`
          }
        ]
      : []) // Add project breadcrumb if project exists
  ]);

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="bg-card">
          <SidebarMenu>
            <SidebarMenuItem>
              <TeamList activeTeam={activeTeam} teamId={teamId} teams={teams} />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="bg-card">
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarMainItems teamId={teamId} />
          </SidebarGroup>
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <ProjectList teamId={teamId} projects={activeTeam.projects} />
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-card">
          <SidebarMenu>
            <SidebarMenuItem>
              <UserActions />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </header>
        <PageContainer>{children}</PageContainer>
      </SidebarInset>
    </SidebarProvider>
  );
}

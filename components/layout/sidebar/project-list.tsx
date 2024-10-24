'use client';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { LinkIcon, MoreHorizontal, Settings } from 'lucide-react';

import ProjectCreateForm from '@/sections/project/project-create-form';

import { Project } from '@prisma/client';
import { Link } from 'next-view-transitions';
import { useParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import ProjectDeleteForm from '@/sections/project/project-delete-form';
type Props = {
  teamId: string;
  projects: Project[];
};

function ProjectList({ teamId, projects }: Props) {
  const params = useParams();
  const { projectId } = params;

  const { toast } = useToast();

  const handleCopy = (projectId: string) => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/teams/${teamId}/projects/${projectId}`
    );

    toast({
      title: 'Link copied to clipboard',
      duration: 1000
    });
  };
  return (
    <SidebarMenu className="space-y-1.5">
      {projects.map((project) => (
        <SidebarMenuItem key={project.id}>
          <SidebarMenuButton
            asChild
            className={`transition-all duration-300 ${
              projectId === project.id && 'bg-sidebar-accent'
            }`}
          >
            <Link href={`/teams/${teamId}/projects/${project.id}`}>
              <span>{project.name}</span>
            </Link>
          </SidebarMenuButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction showOnHover>
                <MoreHorizontal />
                <span className="sr-only">More</span>
              </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-fit rounded-lg"
              side={'right'}
              align={'start'}
            >
              <DropdownMenuItem
                onClick={() => handleCopy(project.id)}
                className="flex items-center gap-2"
              >
                <LinkIcon size={15} className="text-muted-foreground" />
                <span>Copy link</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-2">
                <Settings size={15} className="text-muted-foreground" />
                <span>Edit</span>
              </DropdownMenuItem>

              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <ProjectDeleteForm
                  currentId={projectId as string}
                  projectId={project.id}
                  teamId={teamId}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      ))}
      <SidebarMenuItem className="flex justify-center">
        <ProjectCreateForm teamId={teamId} />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default ProjectList;

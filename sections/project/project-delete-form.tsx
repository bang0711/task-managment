'use client';
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

import { Trash2 } from 'lucide-react';

import { deleteProject } from '@/lib/project';

import { useRouter } from 'next/navigation';

type Props = {
  projectId: string;
  currentId: string;
  teamId: string;
};

function ProjectDeleteForm({ projectId, currentId, teamId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  const handleDeleteProject = async () => {
    setIsLoading(true);

    const res = await deleteProject(projectId, currentId, teamId);
    toast({
      title: res.message,
      variant: res.statusCode === 200 ? 'default' : 'destructive'
    });

    setIsLoading(false);

    if (res.redirect) {
      router.push(`/teams/${teamId}`);
    }
    router.refresh();
  };
  return (
    <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialogTrigger className="flex items-center gap-2">
        <Trash2 size={15} className="text-muted-foreground" />
        <span>Delete</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            project and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <Button
            disabled={isLoading}
            onClick={() => setIsOpen(false)}
            variant={'secondary'}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteProject}
            variant={'destructive'}
            disabled={isLoading}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ProjectDeleteForm;

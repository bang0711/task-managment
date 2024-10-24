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

import { useRouter } from 'next/navigation';
import { deleteTeam } from '@/lib/team';

type Props = {
  teamId: string;
};

function TeamDeleteForm({ teamId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  const handleDeleteTeam = async () => {
    setIsLoading(true);

    const res = await deleteTeam(teamId);
    toast({
      title: res.message,
      variant: res.statusCode === 200 ? 'default' : 'destructive'
    });

    if (res.statusCode === 200) {
      setIsOpen(false);
    }

    setIsLoading(false);

    router.push(`/teams`);
  };
  return (
    <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={'destructive'}>
          <Trash2 size={15} className="text-white" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your team
            and remove your data from our servers.
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
            onClick={handleDeleteTeam}
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

export default TeamDeleteForm;

'use client';
import React, { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

import { Plus } from 'lucide-react';
import { createProject } from '@/lib/project';

type Props = {};

function ProjectCreateForm({}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [pending, startTransition] = useTransition();

  const { toast } = useToast();

  const handleCreateProject = async (data: FormData) => {
    const name = data.get('name') as string;

    if (!name.trim()) {
      return toast({
        title: 'Please enter a name',
        variant: 'destructive'
      });
    }

    const res = await createProject(name);

    if (res.statusCode === 201) {
      toast({
        title: res.message
      });
      return setIsOpen(false);
    }
  };
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          action={(data) =>
            startTransition(async () => {
              await handleCreateProject(data);
            })
          }
        >
          <DialogHeader>
            <DialogTitle>Create project</DialogTitle>
            <DialogDescription>
              Add new project. You can modify project anytime you want.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                name="name"
                placeholder="Enter project name"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant={'secondary'}
              onClick={() => setIsOpen(false)}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button disabled={pending} type="submit">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ProjectCreateForm;

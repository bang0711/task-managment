'use client';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { createTeam } from '@/lib/team';

import { Plus } from 'lucide-react';

import React, { useEffect, useState, useTransition } from 'react';
import { teamIcons } from '@/constants';
import { useRouter } from 'next/navigation';

type Props = {
  isButton?: boolean;
};

function TeamCreateForm({ isButton = true }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Reset pointer events on close
  useEffect(() => {
    return () => {
      if (document.body.style.pointerEvents === 'none') {
        document.body.style.pointerEvents = '';
      }
    };
  }, [isOpen]);

  const [icon, setIcon] = useState(0);

  const [pending, startTransition] = useTransition();

  const { toast } = useToast();

  const router = useRouter();

  const handleCreateTeam = async (data: FormData) => {
    const name = data.get('name') as string;

    if (!name.trim() || icon === 0) {
      return toast({
        title: 'Please enter a name or choose an icon',
        variant: 'destructive'
      });
    }

    const res = await createTeam(name, icon);

    if (res.statusCode === 201) {
      toast({
        title: res.message
      });
      setIsOpen(false);

      return router.push(`/teams/${res.newTeam.id}`);
    }
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild={isButton} className={`${!isButton && 'w-full'}`}>
        {isButton ? (
          <Button variant="default">
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        ) : (
          <div className="flex w-full items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
              <Plus className="size-4" />
            </div>
            <div className="font-medium text-muted-foreground">Add team</div>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          action={(data) =>
            startTransition(async () => {
              await handleCreateTeam(data);
            })
          }
        >
          <DialogHeader>
            <DialogTitle>Create Team</DialogTitle>
            <DialogDescription>
              Add new team. You can modify project anytime you want.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                name="name"
                placeholder="Enter team name"
                className="col-span-3"
              />
            </div>
          </div>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icon" className="text-right">
                Icon
              </Label>
              <Select
                onValueChange={(value) => setIcon(parseInt(value))}
                name="icon"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Icons</SelectLabel>
                    {teamIcons.map((icon) => (
                      <SelectItem
                        key={icon.value}
                        value={icon.value.toString()}
                      >
                        <div className="flex items-center text-sm">
                          <icon.icon className="mr-2 h-4 w-4" />
                          <span className="text-xs">{icon.title}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <div className="flex items-center justify-end gap-2">
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
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TeamCreateForm;

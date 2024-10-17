'use client';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import * as React from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { UniqueIdentifier } from '@dnd-kit/core';
import { deleteColumn, updateColumn } from '@/lib/column';
import { Label } from '@/components/ui/label';
import { createTask } from '@/lib/task';

export function ColumnActions({
  title,
  id
}: {
  title: string;
  id: UniqueIdentifier;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState(title);
  const [oldName, setOldName] = React.useState(title);
  const [pending, startTransition] = React.useTransition();
  const [editDisable, setIsEditDisable] = React.useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showAddTasksDialog, setShowAddTasksDialog] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const removeCol = async (id: string) => {
    setIsLoading(true);

    const res = await deleteColumn(id);

    setIsLoading(false);

    toast({
      title: res.message,
      variant: res.statusCode === 200 ? 'default' : 'destructive'
    });

    if (res.statusCode === 200) {
      setShowDeleteDialog(false);
    }
  };

  const updateCol = async (name: string) => {
    setIsLoading(true);

    const res = await updateColumn(id.toString(), name);

    setIsLoading(false);

    toast({
      title: res.message,
      variant: res.statusCode === 200 ? 'default' : 'destructive'
    });

    if (res.statusCode !== 200) {
      // Rollback to the old name if update fails
      setName(oldName);
    } else {
      setOldName(name); // Update the old name if update succeeds
      setIsEditDisable(true);
    }
  };

  const addTask = async (data: FormData) => {
    const title = data.get('title') as string;

    if (!title.trim()) {
      return toast({
        title: 'Please enter a task title',
        variant: 'destructive'
      });
    }

    const res = await createTask(id.toString(), title);

    toast({
      title: res.message,
      variant: res.statusCode === 201 ? 'default' : 'destructive'
    });

    if (res.statusCode === 201) {
      setShowAddTasksDialog(false);
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsEditDisable(!editDisable);
          if (!editDisable) {
            updateCol(name);
          }
        }}
      >
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="!mt-0 mr-auto text-base disabled:cursor-pointer disabled:border-none disabled:opacity-100"
          disabled={editDisable}
          ref={inputRef}
        />
      </form>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="ml-1">
            <span className="sr-only">Actions</span>

            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setShowAddTasksDialog(true)}>
            Add Task
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => {
              setIsEditDisable(!editDisable);
              setTimeout(() => {
                inputRef.current && inputRef.current?.focus();
              }, 500);
            }}
          >
            Rename
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            Delete Section
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure want to delete column?
            </AlertDialogTitle>
            <AlertDialogDescription>
              NOTE: All tasks related to this category will also be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-center">
            <Button
              variant="secondary"
              disabled={isLoading}
              onClick={() => {
                setShowDeleteDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={() => {
                // yes, you have to set a timeout
                setTimeout(() => (document.body.style.pointerEvents = ''), 100);

                removeCol(id.toString());
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showAddTasksDialog} onOpenChange={setShowAddTasksDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <form
            action={(data) =>
              startTransition(async () => {
                await addTask(data);
              })
            }
          >
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Adding more task here. Click create when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  name="title"
                  placeholder="Enter task title"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button disabled={pending} type="submit">
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

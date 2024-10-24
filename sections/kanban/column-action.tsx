'use client';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';

import { UniqueIdentifier } from '@dnd-kit/core';

import { updateColumn } from '@/lib/column';

import TaskCreateForm from './task-create-form';
import ColumnDeleteForm from './column-delete-form';

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
  const [editDisable, setIsEditDisable] = React.useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showAddTasksDialog, setShowAddTasksDialog] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { toast } = useToast();

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

      <ColumnDeleteForm
        id={id.toString()}
        setShowDeleteDialog={setShowDeleteDialog}
        showDeleteDialog={showDeleteDialog}
      />

      <TaskCreateForm
        id={id.toString()}
        setShowAddTasksDialog={setShowAddTasksDialog}
        showAddTasksDialog={showAddTasksDialog}
      />
    </>
  );
}

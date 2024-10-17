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
import { useToast } from '@/components/ui/use-toast';

import { useParams } from 'next/navigation';
import { useState, useTransition } from 'react';

import { createColumn } from '@/lib/column';

export default function NewColumnDialog() {
  const params = useParams();
  const { id } = params;

  const { toast } = useToast();

  const [pending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);

  const handleAddNewColumn = async (data: FormData) => {
    const title = data.get('title') as string;

    if (!title.trim()) {
      return toast({
        title: 'Please enter a title',
        variant: 'destructive'
      });
    }

    setIsOpen(true);

    const res = await createColumn({ title, projectId: id as string });

    const isSuccess = res.statusCode === 201;

    toast({
      title: res.message,
      variant: isSuccess ? 'default' : 'destructive'
    });

    if (isSuccess) {
      setIsOpen(false);
    }
  };
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg" className="">
          ＋ Add New Column
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Section</DialogTitle>
          <DialogDescription>
            What section you want to add today?
          </DialogDescription>
        </DialogHeader>
        <form
          id="todo-form"
          className="grid gap-4 py-4"
          action={(data) =>
            startTransition(async () => {
              await handleAddNewColumn(data);
            })
          }
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="title"
              name="title"
              placeholder="Section title..."
              className="col-span-4"
            />
          </div>

          <DialogFooter>
            <Button type="submit" size="sm" form="todo-form" disabled={pending}>
              Add Section
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { createTask } from '@/lib/task';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
type Props = {
  id: string;
  showAddTasksDialog: boolean;
  setShowAddTasksDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function TaskCreateForm({
  id,
  showAddTasksDialog,
  setShowAddTasksDialog
}: Props) {
  const { toast } = useToast();

  const [pending, startTransition] = React.useTransition();

  const addTask = async (data: FormData) => {
    const title = data.get('title') as string;

    if (!title.trim()) {
      return toast({
        title: 'Please enter a task title',
        variant: 'destructive'
      });
    }

    const res = await createTask(id, title);

    toast({
      title: res.message,
      variant: res.statusCode === 201 ? 'default' : 'destructive'
    });

    if (res.statusCode === 201) {
      setShowAddTasksDialog(false);
    }
  };
  return (
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
  );
}

export default TaskCreateForm;

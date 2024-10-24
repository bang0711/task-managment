import { deleteColumn } from '@/lib/column';

import { useToast } from '@/components/ui/use-toast';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import React from 'react';

type Props = {
  showDeleteDialog: boolean;
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

function ColumnDeleteForm({
  id,
  setShowDeleteDialog,
  showDeleteDialog
}: Props) {
  const { toast } = useToast();

  const [pending, startTransition] = React.useTransition();

  const removeCol = async (id: string) => {
    const res = await deleteColumn(id);

    toast({
      title: res.message,
      variant: res.statusCode === 200 ? 'default' : 'destructive'
    });

    if (res.statusCode === 200) {
      setShowDeleteDialog(false);
    }
  };
  return (
    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent>
        <form
          action={() =>
            startTransition(async () => {
              await removeCol(id);
            })
          }
        >
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
              type="button"
              variant="secondary"
              onClick={() => {
                setShowDeleteDialog(false);
              }}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" variant="destructive" disabled={pending}>
              Delete
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ColumnDeleteForm;

import { KanbanBoard } from '../kanban-board';
import NewColumnDialog from '../new-column-dialog';

import { Heading } from '@/components/ui/heading';

import { ColumnWithTasks } from '@/types';

type Props = {
  columns: ColumnWithTasks[];
};

export default function KanbanViewPage({ columns }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex max-w-full items-center gap-5">
        <Heading title={`Kanban`} description="Manage tasks by dnd" />
        <NewColumnDialog />
      </div>
      <div className="max-w-7xl ">
        <KanbanBoard cols={columns} />
      </div>
    </div>
  );
}

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Active, DataRef, Over } from '@dnd-kit/core';
import { ColumnDragData } from '@/sections/kanban/board-column';
import { TaskDragData } from '@/sections/kanban/task-card';
import prisma from './prisma';

type DraggableData = ColumnDragData | TaskDragData;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined
): entry is T & {
  data: DataRef<DraggableData>;
} {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data?.type === 'Column' || data?.type === 'Task') {
    return true;
  }

  return false;
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'
  }`;
}

export function removePointerEventsFromBody() {
  if (document.body.style.pointerEvents === 'none') {
    document.body.style.pointerEvents = '';
  }
}

export const generateBreadcrumbs = (
  items: Array<{ title: string; path?: string }>
) => {
  let fullPath = '/teams';

  return items.map((item, index) => {
    if (item.path) {
      fullPath += `/${item.path}`;
    }

    return {
      title: item.title,
      link: fullPath
    };
  });
};

export const getSidebarTeam = async (teamId: string) => {
  const teams = await prisma.team.findMany({
    include: {
      projects: true
    }
  });

  const activeTeam = teams.find((team) => team.id === teamId);

  return {
    teams,
    activeTeam
  };
};

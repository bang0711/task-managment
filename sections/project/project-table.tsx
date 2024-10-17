import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import React from 'react';
import Link from 'next/link';

import { Eye, Trash } from 'lucide-react';

import { Project } from '@prisma/client';

type Props = {
  data: Project[];
  totalData: number;
};

function ProjectTable({ data, totalData }: Props) {
  return (
    <div className="space-y-4">
      <Table>
        <TableCaption>A list of your projects.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>

            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.id}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Link href={`/dashboard/projects/${project.id}`}>
                  <Eye />
                </Link>

                <Button variant={'destructive'}>
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProjectTable;

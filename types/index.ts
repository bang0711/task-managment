import { Column, Project, Task, Team } from '@prisma/client';

export type ColumnWithTasks = Column & { tasks: Task[] };

export type TeamWithProjects = Team & { projects: Project[] };

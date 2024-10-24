import { Button } from '@/components/ui/button';
import { Project } from '@prisma/client';
import { Link } from 'next-view-transitions';

type Props = {
  project: Project;
};

function ProjectCard({ project }: Props) {
  return (
    <div className="aspect-auto rounded-xl bg-muted/50 p-4">
      <h1 className="text-lg font-semibold">{project.name}</h1>

      <p className="text-sm font-light italic">
        {project.createdAt.toUTCString()}
      </p>

      <div className="mt-3">
        <Link href={`/teams/${project.teamId}/projects/${project.id}`}>
          <Button>View</Button>
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;

import prisma from '@/lib/prisma';
import TeamViewPage from '@/sections/team/team-view-page';

export const metadata = {
  title: 'Dashboard : Overview'
};

export default async function TeamsPage() {
  const teams = await prisma.team.findMany();

  return <TeamViewPage teams={teams} />;
}

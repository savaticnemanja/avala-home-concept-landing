import { prisma } from '@/lib/db';
import { ProjectsList } from './ProjectsList';

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { images: true, rooms: true, highlights: true } } },
  });

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl text-text mb-1">
        Projekti
      </h1>
      <p className="text-sm text-text-muted mb-8">
        Ponuda kuća. Prevucite za promenu redosleda; kliknite na projekat za izmenu.
      </p>
      <ProjectsList projects={projects} />
    </div>
  );
}

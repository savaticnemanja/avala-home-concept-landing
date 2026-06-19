import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { ProjectEditor } from './ProjectEditor';

export default async function EditProjectPage({ params }) {
  const { id } = await params;
  const projectId = Number(id);
  if (Number.isNaN(projectId)) notFound();

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      images: { orderBy: { order: 'asc' } },
      highlights: { orderBy: { order: 'asc' } },
      rooms: { orderBy: { order: 'asc' } },
    },
  });

  if (!project) notFound();

  return <ProjectEditor project={project} />;
}

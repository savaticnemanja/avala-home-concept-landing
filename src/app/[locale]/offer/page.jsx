import { prisma } from '@/lib/db';
import OfferClient from './OfferClient';

// Always reflect the latest DB content.
export const dynamic = 'force-dynamic';

export default async function OfferPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
    include: {
      images: { orderBy: { order: 'asc' } },
      highlights: { orderBy: { order: 'asc' } },
      rooms: { orderBy: { order: 'asc' } },
    },
  });

  return <OfferClient projects={projects} />;
}

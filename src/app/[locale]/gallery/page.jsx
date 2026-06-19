import { prisma } from '@/lib/db';
import GalleryClient from './GalleryClient';

// Always reflect the latest DB content.
export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const categories = await prisma.galleryCategory.findMany({
    orderBy: { order: 'asc' },
    include: { images: { orderBy: { order: 'asc' } } },
  });

  return <GalleryClient categories={categories} />;
}

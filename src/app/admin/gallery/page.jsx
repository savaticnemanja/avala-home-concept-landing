import { prisma } from '@/lib/db';
import { GalleryManager } from './GalleryManager';

export default async function AdminGalleryPage() {
  const categories = await prisma.galleryCategory.findMany({
    orderBy: { order: 'asc' },
    include: { images: { orderBy: { order: 'asc' } } },
  });

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl text-text mb-1">
        Galerija
      </h1>
      <p className="text-sm text-text-muted mb-8">
        Kategorije i slike. Prevucite za promenu redosleda; opis se može uneti na svakom jeziku.
      </p>
      <GalleryManager categories={categories} />
    </div>
  );
}

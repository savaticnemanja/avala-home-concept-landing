'use client';
import { useState } from 'react';
import { LuPlus, LuTrash2, LuChevronDown, LuSave } from 'react-icons/lu';
import { imageUrl } from '@/lib/imageUrl';
import { LocaleFields } from '@/components/admin/LocaleFields';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { SubmitButton } from '@/components/admin/SubmitButton';
import { Sortable, SortableItem, DragHandle } from '@/components/admin/Sortable';
import {
  createGalleryCategory,
  updateGalleryCategory,
  deleteGalleryCategory,
  reorderGalleryCategories,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  reorderGalleryImages,
} from '@/lib/admin/actions';

const confirmSubmit = (msg) => (e) => {
  if (!confirm(msg)) e.preventDefault();
};

const cardClass = 'bg-bg-alt border border-border rounded-[6px]';
const btnGhost =
  'inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-[3px] border border-border text-text-muted hover:text-text hover:border-accent transition-colors';
const btnAccent =
  'inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-[3px] bg-accent text-white hover:bg-accent-hover transition-colors';
const btnDanger =
  'inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-[3px] border border-red-300 text-red-600 hover:bg-red-50 transition-colors';

function ImageCard({ image }) {
  const [open, setOpen] = useState(false);
  return (
    <SortableItem id={image.id} className={`${cardClass} overflow-hidden`}>
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl(image.filename)} alt="" className="w-full h-32 object-cover" />
        <DragHandle className="absolute top-1.5 left-1.5 bg-white/85 rounded p-1" />
      </div>
      <div className="p-2 flex items-center justify-between gap-2">
        <button type="button" onClick={() => setOpen((v) => !v)} className="text-xs text-text-muted hover:text-accent inline-flex items-center gap-1">
          <LuChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
          Opis
        </button>
        <form action={deleteGalleryImage} onSubmit={confirmSubmit('Obrisati sliku?')}>
          <input type="hidden" name="id" value={image.id} />
          <button type="submit" aria-label="Obriši" className="text-text-muted hover:text-red-600 transition-colors">
            <LuTrash2 className="w-4 h-4" />
          </button>
        </form>
      </div>
      {open && (
        <form action={updateGalleryImage} className="p-2 pt-0 flex flex-col gap-2">
          <input type="hidden" name="id" value={image.id} />
          <LocaleFields base="caption" values={image} multiline placeholder="Opis slike…" />
          <SubmitButton className={`${btnAccent} self-end`} pendingText="Čuvanje…">
            <LuSave className="w-3.5 h-3.5" /> Sačuvaj
          </SubmitButton>
        </form>
      )}
    </SortableItem>
  );
}

function CategoryCard({ category }) {
  const [editing, setEditing] = useState(false);
  const orderedImages = category.images;
  const handleReorder = (ids) => reorderGalleryImages(ids);

  return (
    <SortableItem id={category.id} className={`${cardClass} p-4`}>
      <div className="flex items-center gap-3 mb-3">
        <DragHandle />
        <h3 className="flex-1 text-lg text-text" style={{ fontFamily: 'var(--font-heading)' }}>
          {category.nameSr || category.slug}
          <span className="ml-2 text-xs text-text-muted font-sans">({category.images.length})</span>
        </h3>
        <button type="button" onClick={() => setEditing((v) => !v)} className={btnGhost}>
          {editing ? 'Zatvori' : 'Izmeni'}
        </button>
        <form action={deleteGalleryCategory} onSubmit={confirmSubmit('Obrisati kategoriju i sve njene slike?')}>
          <input type="hidden" name="id" value={category.id} />
          <button type="submit" className={btnDanger}>
            <LuTrash2 className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {editing && (
        <form action={updateGalleryCategory} className="mb-4 flex flex-col gap-2 border border-border rounded-[4px] p-3 bg-bg">
          <input type="hidden" name="id" value={category.id} />
          <LocaleFields base="name" label="Naziv kategorije" values={category} required />
          <SubmitButton className={`${btnAccent} self-end`} pendingText="Čuvanje…">
            <LuSave className="w-3.5 h-3.5" /> Sačuvaj
          </SubmitButton>
        </form>
      )}

      <div className="mb-3">
        <ImageUploader onUploaded={(data) => createGalleryImage({ categoryId: category.id, ...data })} />
      </div>

      {orderedImages.length > 0 && (
        <Sortable ids={category.images.map((i) => i.id)} onReorder={handleReorder} layout="grid">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {orderedImages.map((img) => (
              <ImageCard key={img.id} image={img} />
            ))}
          </div>
        </Sortable>
      )}
    </SortableItem>
  );
}

export function GalleryManager({ categories }) {
  const [adding, setAdding] = useState(false);

  const handleReorder = (ids) => reorderGalleryCategories(ids);

  return (
    <div className="flex flex-col gap-4">
      <div>
        {adding ? (
          <form action={createGalleryCategory} className={`${cardClass} p-4 flex flex-col gap-3`}>
            <LocaleFields base="name" label="Naziv nove kategorije" required placeholder="npr. 3D renderi" />
            <div className="flex gap-2 self-end">
              <button type="button" onClick={() => setAdding(false)} className={btnGhost}>
                Otkaži
              </button>
              <SubmitButton className={btnAccent} pendingText="Dodavanje…">
                <LuPlus className="w-3.5 h-3.5" /> Dodaj kategoriju
              </SubmitButton>
            </div>
          </form>
        ) : (
          <button type="button" onClick={() => setAdding(true)} className={btnAccent}>
            <LuPlus className="w-4 h-4" /> Nova kategorija
          </button>
        )}
      </div>

      {categories.length > 0 && (
        <Sortable ids={categories.map((c) => c.id)} onReorder={handleReorder}>
          <div className="flex flex-col gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </Sortable>
      )}
    </div>
  );
}

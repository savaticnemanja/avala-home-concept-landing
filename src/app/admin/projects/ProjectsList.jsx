'use client';
import { useState } from 'react';
import Link from 'next/link';
import { LuPlus, LuPencil } from 'react-icons/lu';
import { imageUrl } from '@/lib/imageUrl';
import { LocaleFields } from '@/components/admin/LocaleFields';
import { SubmitButton } from '@/components/admin/SubmitButton';
import { Sortable, SortableItem, DragHandle } from '@/components/admin/Sortable';
import { createProject, reorderProjects } from '@/lib/admin/actions';

const cardClass = 'bg-bg-alt border border-border rounded-[6px]';
const btnAccent =
  'inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-[3px] bg-accent text-white hover:bg-accent-hover transition-colors';
const btnGhost =
  'inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-[3px] border border-border text-text-muted hover:text-text hover:border-accent transition-colors';

export function ProjectsList({ projects }) {
  const [adding, setAdding] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div>
        {adding ? (
          <form action={createProject} className={`${cardClass} p-4 flex flex-col gap-3`}>
            <LocaleFields base="title" label="Naslov novog projekta" required placeholder="npr. Projekat 1 — Prizemna kuća" />
            <div className="flex gap-2 self-end">
              <button type="button" onClick={() => setAdding(false)} className={btnGhost}>
                Otkaži
              </button>
              <SubmitButton className={btnAccent} pendingText="Kreiranje…">
                <LuPlus className="w-3.5 h-3.5" /> Kreiraj projekat
              </SubmitButton>
            </div>
          </form>
        ) : (
          <button type="button" onClick={() => setAdding(true)} className={btnAccent}>
            <LuPlus className="w-4 h-4" /> Novi projekat
          </button>
        )}
      </div>

      {projects.length > 0 && (
        <Sortable ids={projects.map((p) => p.id)} onReorder={(ids) => reorderProjects(ids)}>
          <div className="flex flex-col gap-3">
            {projects.map((p) => (
              <SortableItem key={p.id} id={p.id} className={`${cardClass} p-3 flex items-center gap-3`}>
                <DragHandle />
                <div className="w-16 h-12 rounded-[3px] overflow-hidden bg-bg flex-shrink-0 border border-border">
                  {p.coverFilename ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imageUrl(p.coverFilename)} alt="" className="w-full h-full object-cover" />
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-text truncate" style={{ fontFamily: 'var(--font-heading)' }}>
                    {p.titleSr || p.slug}
                  </p>
                  <p className="text-xs text-text-muted">
                    {p.areaLabel ? `${p.areaLabel} m² · ` : ''}
                    {p._count.images} slika · {p._count.rooms} prostorija · {p._count.highlights} izdvojeno
                  </p>
                </div>
                <Link href={`/admin/projects/${p.id}`} className={btnGhost}>
                  <LuPencil className="w-3.5 h-3.5" /> Izmeni
                </Link>
              </SortableItem>
            ))}
          </div>
        </Sortable>
      )}
    </div>
  );
}

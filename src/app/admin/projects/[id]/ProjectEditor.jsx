'use client';
import { useState } from 'react';
import Link from 'next/link';
import * as LuIcons from 'react-icons/lu';
import { LuArrowLeft, LuTrash2, LuSave, LuPlus, LuStar, LuImage } from 'react-icons/lu';
import { imageUrl } from '@/lib/imageUrl';
import { HIGHLIGHT_ICONS } from '@/lib/admin/constants';
import { LocaleFields } from '@/components/admin/LocaleFields';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { SubmitButton } from '@/components/admin/SubmitButton';
import { Sortable, SortableItem, DragHandle } from '@/components/admin/Sortable';
import {
  updateProject,
  deleteProject,
  createProjectImage,
  updateProjectImage,
  deleteProjectImage,
  setProjectCover,
  reorderProjectImages,
  createHighlight,
  updateHighlight,
  deleteHighlight,
  reorderHighlights,
  createRoom,
  updateRoom,
  deleteRoom,
  reorderRooms,
} from '@/lib/admin/actions';

const cardClass = 'bg-bg-alt border border-border rounded-[6px]';
const input =
  'w-full bg-bg-alt border border-border rounded-[3px] px-3 py-2 text-sm text-text placeholder-text-muted focus:outline-none focus:border-accent';
const btnAccent =
  'inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-[3px] bg-accent text-white hover:bg-accent-hover transition-colors';
const btnGhost =
  'inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-[3px] border border-border text-text-muted hover:text-text hover:border-accent transition-colors';
const btnDanger =
  'inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-[3px] border border-red-300 text-red-600 hover:bg-red-50 transition-colors';
const label = 'text-xs font-medium uppercase tracking-wide text-text-muted';

const confirmSubmit = (msg) => (e) => {
  if (!confirm(msg)) e.preventDefault();
};

const Icon = ({ name, className }) => {
  const Cmp = LuIcons[name] ?? LuIcons.LuDot;
  return <Cmp className={className} />;
};

function Section({ title, desc, children, actions }) {
  return (
    <section className={`${cardClass} p-4 md:p-5`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg text-text" style={{ fontFamily: 'var(--font-heading)' }}>
            {title}
          </h2>
          {desc && <p className="text-xs text-text-muted mt-0.5">{desc}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}

function ImageCard({ image, isCover }) {
  const [open, setOpen] = useState(false);
  return (
    <SortableItem id={image.id} className={`${cardClass} overflow-hidden ${isCover ? 'ring-2 ring-accent' : ''}`}>
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl(image.filename)} alt="" className="w-full h-28 object-cover" />
        <DragHandle className="absolute top-1.5 left-1.5 bg-white/85 rounded p-1" />
        {isCover && (
          <span className="absolute top-1.5 right-1.5 bg-accent text-white text-[0.6rem] px-1.5 py-0.5 rounded">
            Naslovna
          </span>
        )}
      </div>
      <div className="p-2 flex items-center justify-between gap-1">
        <button type="button" onClick={() => setOpen((v) => !v)} className="text-xs text-text-muted hover:text-accent">
          Opis
        </button>
        <div className="flex items-center gap-1">
          {!isCover && (
            <form action={setProjectCover}>
              <input type="hidden" name="projectId" value={image.projectId} />
              <input type="hidden" name="filename" value={image.filename} />
              <button type="submit" aria-label="Postavi kao naslovnu" className="text-text-muted hover:text-accent p-1">
                <LuStar className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
          <form action={deleteProjectImage} onSubmit={confirmSubmit('Obrisati sliku?')}>
            <input type="hidden" name="id" value={image.id} />
            <button type="submit" aria-label="Obriši" className="text-text-muted hover:text-red-600 p-1">
              <LuTrash2 className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
      {open && (
        <form action={updateProjectImage} className="p-2 pt-0 flex flex-col gap-2">
          <input type="hidden" name="id" value={image.id} />
          <LocaleFields base="caption" values={image} placeholder="Opis…" />
          <SubmitButton className={`${btnAccent} self-end`} pendingText="…">
            <LuSave className="w-3.5 h-3.5" /> Sačuvaj
          </SubmitButton>
        </form>
      )}
    </SortableItem>
  );
}

function HighlightRow({ highlight }) {
  return (
    <SortableItem id={highlight.id} className={`${cardClass} p-3`}>
      <form action={updateHighlight} className="flex flex-col gap-2">
        <input type="hidden" name="id" value={highlight.id} />
        <div className="flex items-center gap-2">
          <DragHandle />
          <span className="w-8 h-8 flex items-center justify-center rounded bg-accent/10 text-accent flex-shrink-0">
            <Icon name={highlight.icon} className="w-4 h-4" />
          </span>
          <select name="icon" defaultValue={highlight.icon} className={`${input} max-w-[10rem]`}>
            {HIGHLIGHT_ICONS.map((ic) => (
              <option key={ic} value={ic}>{ic.replace('Lu', '')}</option>
            ))}
          </select>
          <input name="value" defaultValue={highlight.value} placeholder="Vrednost (npr. 139 m²)" className={input} />
        </div>
        <LocaleFields base="label" label="Naziv" values={highlight} required />
        <div className="flex justify-end gap-2">
          <SubmitButton className={btnAccent} pendingText="…">
            <LuSave className="w-3.5 h-3.5" /> Sačuvaj
          </SubmitButton>
        </div>
      </form>
      <form action={deleteHighlight} onSubmit={confirmSubmit('Obrisati stavku?')} className="mt-2 flex justify-end">
        <input type="hidden" name="id" value={highlight.id} />
        <button type="submit" className={btnDanger}>
          <LuTrash2 className="w-3.5 h-3.5" /> Obriši
        </button>
      </form>
    </SortableItem>
  );
}

function RoomRow({ room }) {
  return (
    <SortableItem id={room.id} className={`${cardClass} p-3`}>
      <form action={updateRoom} className="flex flex-col gap-2">
        <input type="hidden" name="id" value={room.id} />
        <div className="flex items-center gap-2">
          <DragHandle />
          <div className="flex-1">
            <LocaleFields base="name" values={room} required placeholder="Naziv prostorije" />
          </div>
          <input name="area" defaultValue={room.area} placeholder="12,00 m²" className={`${input} max-w-[8rem]`} />
          <SubmitButton className={btnAccent} pendingText="…">
            <LuSave className="w-3.5 h-3.5" />
          </SubmitButton>
        </div>
      </form>
      <form action={deleteRoom} onSubmit={confirmSubmit('Obrisati prostoriju?')} className="mt-2 flex justify-end">
        <input type="hidden" name="id" value={room.id} />
        <button type="submit" className="text-text-muted hover:text-red-600 text-xs inline-flex items-center gap-1">
          <LuTrash2 className="w-3.5 h-3.5" /> Obriši
        </button>
      </form>
    </SortableItem>
  );
}

export function ProjectEditor({ project }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <Link href="/admin/projects" className={btnGhost}>
          <LuArrowLeft className="w-4 h-4" /> Nazad
        </Link>
        <form action={deleteProject} onSubmit={confirmSubmit('Trajno obrisati ovaj projekat?')}>
          <input type="hidden" name="id" value={project.id} />
          <button type="submit" className={btnDanger}>
            <LuTrash2 className="w-3.5 h-3.5" /> Obriši projekat
          </button>
        </form>
      </div>

      <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl text-text">
        {project.titleSr || project.slug}
      </h1>

      {/* Main fields */}
      <Section title="Osnovni podaci">
        <form action={updateProject} className="flex flex-col gap-4">
          <input type="hidden" name="id" value={project.id} />
          <LocaleFields base="title" label="Naslov" values={project} required />
          <LocaleFields base="subtitle" label="Podnaslov" values={project} />
          <LocaleFields base="badge" label="Oznaka (badge)" values={project} />
          <LocaleFields base="description" label="Opis" values={project} multiline />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex flex-col gap-1.5">
              <span className={label}>Kvadratura (labela)</span>
              <input name="areaLabel" defaultValue={project.areaLabel} placeholder="139" className={input} />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className={label}>Ukupna površina (m²)</span>
              <input name="totalAreaM2" type="number" step="0.01" defaultValue={project.totalAreaM2 ?? ''} placeholder="139" className={input} />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className={label}>Plan — top (%)</span>
              <input name="sitePlanTop" defaultValue={project.sitePlanTop ?? ''} placeholder="34%" className={input} />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className={label}>Plan — left (%)</span>
              <input name="sitePlanLeft" defaultValue={project.sitePlanLeft ?? ''} placeholder="72%" className={input} />
            </div>
          </div>

          <SubmitButton className={`${btnAccent} self-end`} pendingText="Čuvanje…">
            <LuSave className="w-4 h-4" /> Sačuvaj podatke
          </SubmitButton>
        </form>
      </Section>

      {/* Images */}
      <Section
        title="Slike"
        desc="Prva ili obeležena slika je naslovna. Prevucite za redosled."
        actions={
          <ImageUploader
            onUploaded={(data) =>
              createProjectImage({ projectId: project.id, ...data, isCover: !project.coverFilename })
            }
          />
        }
      >
        {project.images.length === 0 ? (
          <p className="text-sm text-text-muted flex items-center gap-2">
            <LuImage className="w-4 h-4" /> Nema slika. Otpremite prvu.
          </p>
        ) : (
          <Sortable ids={project.images.map((i) => i.id)} onReorder={(ids) => reorderProjectImages(ids)} layout="grid">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {project.images.map((img) => (
                <ImageCard key={img.id} image={img} isCover={project.coverFilename === img.filename} />
              ))}
            </div>
          </Sortable>
        )}
      </Section>

      {/* Highlights */}
      <Section
        title="Izdvojeno (bullets)"
        desc="Npr. neto površina, broj soba, bazen."
        actions={
          <form action={createHighlight}>
            <input type="hidden" name="projectId" value={project.id} />
            <button type="submit" className={btnAccent}>
              <LuPlus className="w-3.5 h-3.5" /> Dodaj
            </button>
          </form>
        }
      >
        {project.highlights.length === 0 ? (
          <p className="text-sm text-text-muted">Nema izdvojenih stavki.</p>
        ) : (
          <Sortable ids={project.highlights.map((h) => h.id)} onReorder={(ids) => reorderHighlights(ids)}>
            <div className="flex flex-col gap-3">
              {project.highlights.map((h) => (
                <HighlightRow key={h.id} highlight={h} />
              ))}
            </div>
          </Sortable>
        )}
      </Section>

      {/* Rooms */}
      <Section
        title="Tabela površina"
        desc="Prostorije i njihove kvadrature."
        actions={
          <form action={createRoom}>
            <input type="hidden" name="projectId" value={project.id} />
            <button type="submit" className={btnAccent}>
              <LuPlus className="w-3.5 h-3.5" /> Dodaj
            </button>
          </form>
        }
      >
        {project.rooms.length === 0 ? (
          <p className="text-sm text-text-muted">Nema prostorija.</p>
        ) : (
          <Sortable ids={project.rooms.map((r) => r.id)} onReorder={(ids) => reorderRooms(ids)}>
            <div className="flex flex-col gap-3">
              {project.rooms.map((r) => (
                <RoomRow key={r.id} room={r} />
              ))}
            </div>
          </Sortable>
        )}
      </Section>
    </div>
  );
}

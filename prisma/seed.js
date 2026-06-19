// Seed the database from the project's original hardcoded content so the public
// site keeps working after the static -> dynamic migration. Idempotent: skips if
// content already exists. Copies source assets into the uploads directory.

import { PrismaClient } from '@prisma/client';
import { readFileSync, copyFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const prisma = new PrismaClient();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const UPLOAD_DIR = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(ROOT, 'public', 'uploads');

const readDict = (loc) =>
  JSON.parse(readFileSync(path.join(ROOT, 'src', 'i18n', 'dictionaries', `${loc}.json`), 'utf8'));
const dicts = { sr: readDict('sr'), en: readDict('en'), ru: readDict('ru'), de: readDict('de') };

const LOCALES = ['sr', 'en', 'ru', 'de'];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Build { fieldSr, fieldEn, fieldRu, fieldDe } from a (locale)=>value fn.
const loc = (base, fn) => {
  const out = {};
  for (const l of LOCALES) out[`${base}${cap(l)}`] = fn(l) ?? '';
  return out;
};

// Copy a source asset into uploads under `destName`; returns destName.
const copyAsset = (srcRel, destName) => {
  const src = path.join(ROOT, srcRel);
  const dest = path.join(UPLOAD_DIR, destName);
  if (existsSync(src) && !existsSync(dest)) copyFileSync(src, dest);
  return destName;
};

// --- gallery categories text -------------------------------------------------
const GALLERY_CATEGORIES = [
  { slug: 'photos', name: { sr: 'Fotografije', en: 'Photos', ru: 'Фотографии', de: 'Fotos' }, count: 26 },
  { slug: '3d-renders', name: { sr: '3D renderi', en: '3D Renders', ru: '3D-рендеры', de: '3D-Renderings' }, count: 0 },
  { slug: 'interior', name: { sr: 'Enterijer', en: 'Interior', ru: 'Интерьер', de: 'Innenraum' }, count: 0 },
  { slug: 'progress', name: { sr: 'Napredak radova', en: 'Work Progress', ru: 'Ход работ', de: 'Baufortschritt' }, count: 0 },
];

// --- project definitions -----------------------------------------------------
const STAT_LABELS = {
  beds: { sr: 'Sobe', en: 'Bedrooms', ru: 'Спальни', de: 'Zimmer' },
  area: { sr: 'Površina', en: 'Area', ru: 'Площадь', de: 'Fläche' },
};

const PROJECTS = [
  {
    slug: 'project1',
    dictKey: 'project1',
    cardIndex: 0,
    folder: 'project-1',
    cover: 'plan-card.webp',
    images: ['plan-card.webp', 'render.webp', 'main.webp', 'view-1.webp', 'view-2.webp', 'view-3.webp'],
    areaLabel: '139',
    totalAreaM2: 139,
    beds: 3,
    terrace: '11m²',
    pin: { top: '34%', left: '72%' },
    netAreas: ['10,00 m²', '3,00 m²', '4,00 m²', '10,00 m²', '11,00 m²', '15,00 m²', '12,00 m²', '12,00 m²', '6,00 m²', '5,00 m²', '22,00 m²', '27,00 m²'],
  },
  {
    slug: 'project2',
    dictKey: 'project2',
    cardIndex: 1,
    folder: 'project-2',
    cover: 'plan-card.webp',
    images: ['plan-card.webp', 'render.webp', 'main.webp', 'view-1.webp', 'view-2.webp', 'view-3.webp'],
    areaLabel: '147',
    totalAreaM2: 147,
    beds: 3,
    terrace: '18m²',
    pin: { top: '40%', left: '43%' },
    netAreas: ['4,00 m²', '10,00 m²', '6,00 m²', '12,00 m²', '12,00 m²', '14,00 m²', '8,00 m²', '10,00 m²', '18,00 m²', '7,00 m²', '31,00 m²', '8,00 m²', '3,00 m²', '4,00 m²'],
  },
  {
    slug: 'small-houses',
    dictKey: 'smallHouses',
    cardIndex: 2,
    folder: 'small-houses',
    cover: 'main.webp',
    images: ['main.webp', 'info-1.webp', 'info-2.webp', 'view-1.webp', 'view-2.webp', 'view-3.webp', 'view-4.webp', 'view-5.webp', 'view-6.webp'],
    areaLabel: '80–100',
    totalAreaM2: null,
    beds: 2,
    terrace: null,
    pin: { top: '20%', left: '24%' },
    netAreas: null,
  },
];

async function main() {
  mkdirSync(UPLOAD_DIR, { recursive: true });

  const existingCats = await prisma.galleryCategory.count();
  const existingProjects = await prisma.project.count();
  if (existingCats > 0 || existingProjects > 0) {
    console.log('Seed skipped: content already exists.');
    return;
  }

  // Gallery
  let catOrder = 0;
  for (const cat of GALLERY_CATEGORIES) {
    const created = await prisma.galleryCategory.create({
      data: { slug: cat.slug, order: catOrder++, ...loc('name', (l) => cat.name[l]) },
    });
    for (let i = 1; i <= cat.count; i += 1) {
      const num = String(i).padStart(2, '0');
      const filename = copyAsset(`src/assets/gallery/gallery-${num}.webp`, `seed-gallery-${num}.webp`);
      await prisma.galleryImage.create({
        data: { categoryId: created.id, filename, order: i - 1 },
      });
    }
  }
  console.log(`Seeded ${GALLERY_CATEGORIES.length} gallery categories.`);

  // Projects
  let projOrder = 0;
  for (const p of PROJECTS) {
    const d = (l) => dicts[l].projects[p.dictKey];
    const card = (l) => dicts[l].offer.cards[p.cardIndex];

    const project = await prisma.project.create({
      data: {
        slug: p.slug,
        order: projOrder++,
        ...loc('title', (l) => d(l).title),
        ...loc('subtitle', (l) => card(l).subtitle),
        ...loc('badge', (l) => card(l).badge),
        ...loc('description', (l) => d(l).description),
        areaLabel: p.areaLabel,
        totalAreaM2: p.totalAreaM2,
        sitePlanTop: p.pin.top,
        sitePlanLeft: p.pin.left,
        coverFilename: `seed-${p.slug}-${p.cover}`,
      },
    });

    // Images
    let imgOrder = 0;
    for (const file of p.images) {
      const filename = copyAsset(`src/assets/projects/${p.folder}/${file}`, `seed-${p.slug}-${file}`);
      await prisma.projectImage.create({ data: { projectId: project.id, filename, order: imgOrder++ } });
    }

    // Highlights: structured stats first, then the textual card bullets.
    let hOrder = 0;
    await prisma.projectHighlight.create({
      data: {
        projectId: project.id,
        order: hOrder++,
        icon: 'LuBed',
        value: String(p.beds),
        ...loc('label', (l) => STAT_LABELS.beds[l]),
      },
    });
    if (p.terrace) {
      await prisma.projectHighlight.create({
        data: {
          projectId: project.id,
          order: hOrder++,
          icon: 'LuSunrise',
          value: p.terrace,
          ...loc('label', (l) => dicts[l].offer.terrace),
        },
      });
    }
    await prisma.projectHighlight.create({
      data: {
        projectId: project.id,
        order: hOrder++,
        icon: 'LuMaximize2',
        value: `${p.areaLabel} m²`,
        ...loc('label', (l) => STAT_LABELS.area[l]),
      },
    });
    for (let j = 0; j < 3; j += 1) {
      await prisma.projectHighlight.create({
        data: {
          projectId: project.id,
          order: hOrder++,
          icon: 'LuDot',
          value: '',
          ...loc('label', (l) => card(l).highlights[j]),
        },
      });
    }

    // Rooms (surface table)
    if (p.netAreas) {
      for (let i = 0; i < p.netAreas.length; i += 1) {
        await prisma.projectRoom.create({
          data: {
            projectId: project.id,
            order: i,
            area: p.netAreas[i],
            ...loc('name', (l) => dicts[l].projects[p.dictKey].rooms?.[i] ?? ''),
          },
        });
      }
    }
  }
  console.log(`Seeded ${PROJECTS.length} projects.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

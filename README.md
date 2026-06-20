# Avala Home Concept

Marketing and sales site for **Avala Home Concept** — a gated complex of family houses on Mount Avala, 20 minutes from Belgrade.

## Stack

- **Next.js 15** App Router, server components, `force-dynamic` rendering
- **Tailwind CSS 4**, CSS custom properties for theming
- **Prisma** ORM + **SQLite** database
- **sharp** for server-side WebP image processing
- **jose** for JWT session auth
- **@dnd-kit** for drag-to-reorder in admin
- **react-icons/lu** (Lucide) for icons
- Cookieless analytics (custom, no third-party scripts)
- Multilingual: **sr** (default), **en**, **ru**, **de**

## Project structure

```
src/
  app/
    [locale]/          # public routes (home, offer, gallery, contact, …)
    admin/             # password-protected admin panel
    api/               # track (analytics beacon), admin/upload, admin/login
  components/          # shared UI components
  i18n/
    config.js          # locales list, withLocale(), SITE_URL
    getDictionary.js   # server-side dictionary loader
    I18nProvider.jsx   # client context: useI18n() → { t, locale, href }
    dictionaries/      # sr.json, en.json, ru.json, de.json
  lib/                 # server-side logic (auth, db, uploads, metrics, localize)
  middleware.js        # JWT guard for /admin and /api/admin routes
prisma/
  schema.prisma        # data model
  migrations/          # Prisma migration history
  seed.js              # seed runner (calls prisma/projects-content.js)
  projects-content.js  # house data + image filenames for seeding
scripts/
  import-houses.mjs    # upserts the 3 seed houses + attaches images
public/
  uploads/             # uploaded images (bind-mounted in Docker)
```

## Environment variables

| Variable | Description |
|---|---|
| `SESSION_SECRET` | JWT signing secret, min 16 chars |
| `ADMIN_PASSWORD` | Admin panel password |
| `DATABASE_URL` | Prisma DB URL (default: `file:/data/prod.db`) |
| `UPLOAD_DIR` | Absolute path to uploads dir (default: `<cwd>/public/uploads`) |

## Local development

```bash
npm install
cp .env.example .env.local    # set SESSION_SECRET and ADMIN_PASSWORD
npx prisma migrate dev
npm run dev                   # http://localhost:3000 → redirects to /sr
```

To seed the database with the 3 houses and their images:

```bash
node scripts/import-houses.mjs
```

Images must already exist in `public/uploads/` (filenames are defined in `prisma/projects-content.js`).

## Docker deployment (production)

```bash
docker compose build
docker compose up -d --force-recreate
```

The container runs on port **8083**. Nginx proxies all traffic to it and serves `/uploads/` directly from `public/uploads/` on the host (bind-mounted, not a named volume).

To run the import script inside a running container:

```bash
docker exec -it avalahomeconcept-app-1 node scripts/import-houses.mjs
```

## Nginx

Config at `/etc/nginx/sites-available/avalahomeconcept.com`:

- `location /uploads/` → `alias /srv/avalahomeconcept.com/public/uploads/;`
- everything else → `proxy_pass http://127.0.0.1:8083`

## Internationalization

All UI copy lives in `src/i18n/dictionaries/*.json`. When adding text, update all four locale files and keep keys in sync. Use `useI18n()` (`t()`, `locale`, `href()`) in client components and `getDictionary(locale)` in server components.

## Admin panel

`/admin` — password-protected. Session is a 7-day httpOnly JWT cookie.

Features: manage projects (images, highlights, rooms, site-plan pin coordinates), gallery categories/images, and a metrics dashboard (cookieless analytics: visits, clicks, CTR, conversions).

Project slugs are auto-generated from the Serbian title on create and update.

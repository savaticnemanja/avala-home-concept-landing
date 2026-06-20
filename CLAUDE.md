# CLAUDE.md — Avala Home Concept

Guidance for AI agents working in this repo.

## Architecture

- **Next.js 15 App Router** — all pages under `src/app/[locale]/` are server components by default. Client components are explicitly marked `'use client'`.
- **SQLite via Prisma** — DB lives at `/data/prod.db` inside Docker, bind-mounted from the host. Never add `output: 'export'` to `next.config.js`; the app is dynamic.
- **Uploads** — images are saved to `public/uploads/` on the host via a Docker bind mount. Nginx serves `/uploads/` directly from that path (not through Next.js). The upload pipeline re-encodes everything to WebP via `sharp`.
- **Auth** — single admin password + HS256 JWT stored in an httpOnly cookie (`ahc_admin`). Middleware at `src/middleware.js` guards `/admin` and `/api/admin`. Always call `requireSession()` at the top of every server action.

## Conventions

### Slugs

Project slugs are auto-generated from the Serbian title (`titleSr`) via `slugify()` in `src/lib/admin/actions.js`. The function lowercases, NFKD-normalizes, strips combining characters, replaces non-alphanumeric runs with `-`, and truncates at 60 chars.

The seed script (`prisma/projects-content.js`) has a separate `filePrefix` field per house that decouples the image filenames on disk from the DB slug. When you rename a house, the slug changes but the filenames don't — keep `filePrefix` stable.

### i18n

- All user-facing strings go in `src/i18n/dictionaries/{sr,en,ru,de}.json`.
- Serbian (`sr`) is the primary locale and the fallback. DB fields are stored per locale (e.g. `titleSr`, `titleEn`, `titleRu`, `titleDe`). `pick(row, 'title', locale)` resolves the right field, falling back to `titleSr`.
- Use `useI18n()` → `{ t, locale, href }` in client components. `href('/path')` prepends the current locale prefix.
- When adding a new i18n key, update **all four** locale files.

### Offer page

`src/app/[locale]/offer/OfferClient.jsx` — full-screen split layout:
- Desktop: left catalog panel (scrollable) + right site-plan map with pins.
- Mobile: single-panel with a bottom tab bar switching between map and list views.
- `IntersectionObserver` (via `setupIO()`) syncs the active project as the user scrolls through the catalog. The observer is set up for both the desktop `catalogRef` and the mobile `mobileCatalogRef` (the latter re-runs when the list tab becomes active).
- The map image is `src/assets/gallery/gallery-23.webp` (the site plan photo). Pin positions are stored as `sitePlanTop` / `sitePlanLeft` CSS percentage strings on each `Project` record.
- The footer is suppressed on all `/offer` routes via `FooterConditional` — a client component that reads `usePathname()` and returns `null` when the path matches `/offer`.

### Analytics

Cookieless: a visitor hash is derived from IP + UA + a daily-rotating salt (keyed with `SESSION_SECRET`). The same visitor gets a different hash each day, making cross-day tracking impossible by design. Events are recorded once per `(visitorHash, type, name)` per day via an upsert-with-empty-update pattern.

## Deployment flow

```bash
# On the server, from /srv/avalahomeconcept.com:
git pull
docker compose build
docker compose up -d --force-recreate
```

The app takes ~5 s to start. Check with `curl -sf http://localhost:8083 | head -c 80`.

To run the import script (seed houses + images) inside the running container:

```bash
docker exec -it avalahomeconcept-app-1 node scripts/import-houses.mjs
```

The script deletes existing records matching the seed slugs before re-importing, so it is safe to re-run.

## Gotchas

- `LuHome` does not exist in the installed version of `react-icons/lu` — use `LuHouse`.
- Prisma `groupBy` does not accept `_all` in `orderBy._count`; use the actual field name (e.g. `{ name: 'desc' }`).
- The `cap` helper (capitalize first letter of a string) is defined in both `actions.js` and `localize.js`. They are intentionally local — do not extract to a shared util.
- Never import server-only modules (`prisma`, `actions`, `auth`) into client components.
- `sharp` is a native module; the Dockerfile must install the `sharp` npm package *after* setting the appropriate `SHARP_IGNORE_GLOBAL_LIBVIPS` flag or use the `linux-x64` pre-built binary.

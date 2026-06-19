#!/bin/sh
set -e

# Ensure persistent dirs exist (mounted as volumes in compose).
mkdir -p /data
mkdir -p "${UPLOAD_DIR:-/app/public/uploads}"

# Apply pending migrations against the SQLite volume.
echo "Running database migrations…"
npx prisma migrate deploy

# Seed once if the database is empty (idempotent — seed self-skips otherwise).
echo "Seeding database (no-op if already populated)…"
npx prisma db seed || echo "Seed skipped/failed (continuing)."

exec "$@"

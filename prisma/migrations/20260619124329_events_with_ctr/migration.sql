-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PageView" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL DEFAULT 'visit',
    "name" TEXT NOT NULL DEFAULT '',
    "path" TEXT NOT NULL DEFAULT '',
    "locale" TEXT NOT NULL DEFAULT '',
    "referrer" TEXT NOT NULL DEFAULT '',
    "device" TEXT NOT NULL DEFAULT '',
    "visitorHash" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_PageView" ("createdAt", "device", "id", "locale", "path", "referrer", "visitorHash") SELECT "createdAt", "device", "id", "locale", "path", "referrer", "visitorHash" FROM "PageView";
DROP TABLE "PageView";
ALTER TABLE "new_PageView" RENAME TO "PageView";
CREATE INDEX "PageView_createdAt_idx" ON "PageView"("createdAt");
CREATE INDEX "PageView_type_idx" ON "PageView"("type");
CREATE UNIQUE INDEX "PageView_visitorHash_type_name_key" ON "PageView"("visitorHash", "type", "name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- Drop the unused `areaLabel` column from Project (replaced by totalAreaM2 in the UI).
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "titleSr" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL DEFAULT '',
    "titleRu" TEXT NOT NULL DEFAULT '',
    "titleDe" TEXT NOT NULL DEFAULT '',
    "subtitleSr" TEXT NOT NULL DEFAULT '',
    "subtitleEn" TEXT NOT NULL DEFAULT '',
    "subtitleRu" TEXT NOT NULL DEFAULT '',
    "subtitleDe" TEXT NOT NULL DEFAULT '',
    "badgeSr" TEXT NOT NULL DEFAULT '',
    "badgeEn" TEXT NOT NULL DEFAULT '',
    "badgeRu" TEXT NOT NULL DEFAULT '',
    "badgeDe" TEXT NOT NULL DEFAULT '',
    "descriptionSr" TEXT NOT NULL DEFAULT '',
    "descriptionEn" TEXT NOT NULL DEFAULT '',
    "descriptionRu" TEXT NOT NULL DEFAULT '',
    "descriptionDe" TEXT NOT NULL DEFAULT '',
    "totalAreaM2" REAL,
    "sitePlanTop" TEXT,
    "sitePlanLeft" TEXT,
    "coverFilename" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("id","slug","order","titleSr","titleEn","titleRu","titleDe","subtitleSr","subtitleEn","subtitleRu","subtitleDe","badgeSr","badgeEn","badgeRu","badgeDe","descriptionSr","descriptionEn","descriptionRu","descriptionDe","totalAreaM2","sitePlanTop","sitePlanLeft","coverFilename","createdAt","updatedAt")
SELECT "id","slug","order","titleSr","titleEn","titleRu","titleDe","subtitleSr","subtitleEn","subtitleRu","subtitleDe","badgeSr","badgeEn","badgeRu","badgeDe","descriptionSr","descriptionEn","descriptionRu","descriptionDe","totalAreaM2","sitePlanTop","sitePlanLeft","coverFilename","createdAt","updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

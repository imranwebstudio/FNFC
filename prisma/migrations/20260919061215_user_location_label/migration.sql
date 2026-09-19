-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "defaultCutoffTime" SET DEFAULT '14:00';

-- AlterTable
ALTER TABLE "User" ADD COLUMN "locationLabel" TEXT;

-- Backfill free-text label from the assigned zone name when present
UPDATE "User" u
SET "locationLabel" = l.name
FROM "Location" l
WHERE u."locationId" = l.id
  AND (u."locationLabel" IS NULL OR u."locationLabel" = '');

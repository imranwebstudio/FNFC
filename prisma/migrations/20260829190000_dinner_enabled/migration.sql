-- Per-office switch: offer dinner or lunch-only
ALTER TABLE "Location"
  ADD COLUMN IF NOT EXISTS "dinnerEnabled" BOOLEAN NOT NULL DEFAULT false;

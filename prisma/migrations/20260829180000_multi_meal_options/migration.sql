-- Allow multiple meal options per weekday/slot and per calendar day/slot

-- WeekdayMenu: drop one-meal-per-slot unique
DROP INDEX IF EXISTS "WeekdayMenu_locationId_weekday_slot_key";
CREATE INDEX IF NOT EXISTS "WeekdayMenu_locationId_weekday_slot_idx"
  ON "WeekdayMenu"("locationId", "weekday", "slot");

-- DailyMenu: drop one-meal-per-day-slot unique; track weekday source
DROP INDEX IF EXISTS "DailyMenu_locationId_date_slot_key";

ALTER TABLE "DailyMenu"
  ADD COLUMN IF NOT EXISTS "sourceWeekdayMenuId" TEXT;

-- Partial unique: one daily row per weekday template per date
-- (Postgres allows multiple NULLs in a unique column pair)
CREATE UNIQUE INDEX IF NOT EXISTS "DailyMenu_date_sourceWeekdayMenuId_key"
  ON "DailyMenu"("date", "sourceWeekdayMenuId");

CREATE INDEX IF NOT EXISTS "DailyMenu_locationId_date_slot_idx"
  ON "DailyMenu"("locationId", "date", "slot");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'DailyMenu_sourceWeekdayMenuId_fkey'
  ) THEN
    ALTER TABLE "DailyMenu"
      ADD CONSTRAINT "DailyMenu_sourceWeekdayMenuId_fkey"
      FOREIGN KEY ("sourceWeekdayMenuId") REFERENCES "WeekdayMenu"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

/**
 * One-shot: copy Ambon Complex weekday menus to every other active office,
 * then materialize DailyMenu for today + next 7 days.
 *
 *   npx tsx scripts/copy-menus-all-locations.ts
 */
import { Prisma } from "../generated/prisma";
import { db } from "../src/server/db";
import { formatInTimeZone } from "date-fns-tz";

function todayDhaka() {
  return formatInTimeZone(new Date(), "Asia/Dhaka", "yyyy-MM-dd");
}

async function main() {
  const sourceId = "cmsjxho8p0005hcrzbdza51s1"; // Ambon Complex

  const weekResult = await db.$executeRaw(Prisma.sql`
    INSERT INTO "WeekdayMenu" (
      id, "locationId", weekday, slot, title, description, price,
      "imageUrl", "catalogItemId", "isActive", "createdAt", "updatedAt"
    )
    SELECT
      'cm' || substr(md5(random()::text || clock_timestamp()::text || t.id || l.id), 1, 22),
      l.id,
      t.weekday,
      t.slot,
      t.title,
      t.description,
      t.price,
      t."imageUrl",
      t."catalogItemId",
      true,
      NOW(),
      NOW()
    FROM "WeekdayMenu" t
    CROSS JOIN "Location" l
    WHERE t."locationId" = ${sourceId}
      AND t."isActive" = true
      AND l."isActive" = true
      AND l.id <> t."locationId"
      AND (t.slot <> 'DINNER' OR l."dinnerEnabled" = true)
      AND NOT EXISTS (
        SELECT 1 FROM "WeekdayMenu" e
        WHERE e."locationId" = l.id
          AND e.weekday = t.weekday
          AND e.slot = t.slot
          AND lower(e.title) = lower(t.title)
          AND e."isActive" = true
      )
  `);
  console.log(`WeekdayMenu rows inserted: ${weekResult}`);

  // Materialize today..+7 from weekday templates (skip if already present)
  const today = todayDhaka();
  let dailyInserted = 0;
  for (let i = 0; i < 8; i++) {
    const d = new Date(`${today}T12:00:00+06:00`);
    d.setDate(d.getDate() + i);
    const dateStr = formatInTimeZone(d, "Asia/Dhaka", "yyyy-MM-dd");

    const n = await db.$executeRaw(Prisma.sql`
      INSERT INTO "DailyMenu" (
        id, "locationId", date, slot, title, description, price,
        "imageUrl", "catalogItemId", "sourceWeekdayMenuId", "cutoffAt",
        "isPublished", skipped, "createdAt", "updatedAt"
      )
      SELECT
        'cm' || substr(md5(random()::text || clock_timestamp()::text || w.id || ${dateStr}), 1, 22),
        w."locationId",
        ${dateStr}::date,
        w.slot,
        w.title,
        w.description,
        w.price,
        w."imageUrl",
        w."catalogItemId",
        w.id,
        (
          timezone('Asia/Dhaka', (${dateStr} || ' ' || coalesce(l."defaultCutoffTime", '14:00') || ':00')::timestamp)
          AT TIME ZONE 'Asia/Dhaka'
        ),
        true,
        false,
        NOW(),
        NOW()
      FROM "WeekdayMenu" w
      JOIN "Location" l ON l.id = w."locationId"
      WHERE w."isActive" = true
        AND l."isActive" = true
        AND w.weekday = (
          CASE extract(isodow FROM ${dateStr}::date)
            WHEN 1 THEN 'MON'::"Weekday"
            WHEN 2 THEN 'TUE'::"Weekday"
            WHEN 3 THEN 'WED'::"Weekday"
            WHEN 4 THEN 'THU'::"Weekday"
            WHEN 5 THEN 'FRI'::"Weekday"
            WHEN 6 THEN 'SAT'::"Weekday"
            WHEN 7 THEN 'SUN'::"Weekday"
          END
        )
        AND (w.slot <> 'DINNER' OR l."dinnerEnabled" = true)
        AND NOT EXISTS (
          SELECT 1 FROM "DailyMenu" d
          WHERE d."locationId" = w."locationId"
            AND d.date = ${dateStr}::date
            AND (
              d."sourceWeekdayMenuId" = w.id
              OR (
                d.slot = w.slot
                AND lower(d.title) = lower(w.title)
                AND d.skipped = false
              )
            )
        )
    `);
    dailyInserted += Number(n);
    console.log(`  ${dateStr}: +${n} daily menus`);
  }
  console.log(`DailyMenu rows inserted: ${dailyInserted}`);

  const summary = await db.$queryRaw<
    Array<{ name: string; weekday: bigint; today: bigint }>
  >`
    SELECT l.name,
      (SELECT COUNT(*) FROM "WeekdayMenu" w WHERE w."locationId" = l.id AND w."isActive") AS weekday,
      (SELECT COUNT(*) FROM "DailyMenu" d
        WHERE d."locationId" = l.id AND d.date = ${today}::date
          AND d.skipped = false AND d."isPublished" = true) AS today
    FROM "Location" l
    WHERE l."isActive" = true
    ORDER BY l.name
  `;
  for (const row of summary) {
    console.log(
      `  ${row.name}: weekday=${row.weekday} today=${row.today}`,
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

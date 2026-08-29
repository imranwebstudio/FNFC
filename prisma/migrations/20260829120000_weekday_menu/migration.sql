-- CreateEnum
CREATE TYPE "Weekday" AS ENUM ('SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI');

-- CreateTable
CREATE TABLE "WeekdayMenu" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "weekday" "Weekday" NOT NULL,
    "slot" "MealSlot" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "catalogItemId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeekdayMenu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WeekdayMenu_weekday_isActive_idx" ON "WeekdayMenu"("weekday", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "WeekdayMenu_locationId_weekday_slot_key" ON "WeekdayMenu"("locationId", "weekday", "slot");

-- AddForeignKey
ALTER TABLE "WeekdayMenu" ADD CONSTRAINT "WeekdayMenu_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeekdayMenu" ADD CONSTRAINT "WeekdayMenu_catalogItemId_fkey" FOREIGN KEY ("catalogItemId") REFERENCES "MealCatalog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

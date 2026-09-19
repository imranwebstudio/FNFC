-- CreateTable
CREATE TABLE "ServiceDayOff" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceDayOff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceDayOff_date_key" ON "ServiceDayOff"("date");

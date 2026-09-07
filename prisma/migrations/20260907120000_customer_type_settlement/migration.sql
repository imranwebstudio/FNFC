-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('REGULAR', 'ONE_TIME');

-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'DUE';

-- AlterTable
ALTER TABLE "User" ADD COLUMN "customerType" "CustomerType" NOT NULL DEFAULT 'ONE_TIME';

-- Backfill: existing wallet users become REGULAR; everyone else stays ONE_TIME
UPDATE "User"
SET "customerType" = 'REGULAR'
WHERE "paymentMode" = 'WALLET';

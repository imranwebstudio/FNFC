-- Track admin who placed an order on behalf of a member
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "placedById" TEXT;

CREATE INDEX IF NOT EXISTS "Order_placedById_idx" ON "Order"("placedById");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Order_placedById_fkey'
  ) THEN
    ALTER TABLE "Order"
      ADD CONSTRAINT "Order_placedById_fkey"
      FOREIGN KEY ("placedById") REFERENCES "User"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

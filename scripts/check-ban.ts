import { PrismaClient } from "../generated/prisma";

async function main() {
  const db = new PrismaClient();
  const cols = await db.$queryRawUnsafe<Array<{ column_name: string }>>(
    `SELECT column_name FROM information_schema.columns WHERE table_name = 'User' AND column_name = 'isBanned'`,
  );
  console.log("isBanned column:", cols);
  const u = await db.user.findFirst({
    select: { id: true, email: true, isBanned: true },
  });
  console.log("sample user:", u);
  await db.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

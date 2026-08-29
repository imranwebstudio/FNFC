import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const locations = [
    {
      name: "Gulshan Office",
      address: "Gulshan, Dhaka",
      defaultCutoffTime: "14:00",
    },
    {
      name: "Banani Office",
      address: "Banani, Dhaka",
      defaultCutoffTime: "14:00",
    },
  ];

  for (const loc of locations) {
    const existing = await prisma.location.findFirst({
      where: { name: loc.name },
    });
    if (!existing) {
      await prisma.location.create({ data: loc });
    }
  }

  const catalog = [
    {
      name: "Chicken Biryani",
      description: "Fragrant basmati rice with spiced chicken",
      defaultPrice: 180,
    },
    {
      name: "Kacchi Biryani",
      description: "Traditional mutton kacchi with potato",
      defaultPrice: 220,
    },
    {
      name: "Polao + Chicken Roast",
      description: "Ghee polao with chicken roast and salad",
      defaultPrice: 200,
    },
    {
      name: "Bhat + Fish Curry",
      description: "Steamed rice with Rui/Ilish-style curry (seasonal)",
      defaultPrice: 160,
    },
    {
      name: "Bhat + Beef Bhuna",
      description: "White rice with beef bhuna and dal",
      defaultPrice: 180,
    },
    {
      name: "Khichuri + Beguni",
      description: "Comfort khichuri set with beguni",
      defaultPrice: 140,
    },
  ];

  for (const item of catalog) {
    const existing = await prisma.mealCatalog.findFirst({
      where: { name: item.name },
    });
    if (!existing) {
      await prisma.mealCatalog.create({ data: item });
    }
  }

  const superEmail = process.env.SUPER_ADMIN_EMAIL?.toLowerCase();
  if (superEmail) {
    const user = await prisma.user.findUnique({ where: { email: superEmail } });
    if (user && user.role !== "SUPER_ADMIN") {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: "SUPER_ADMIN" },
      });
      console.log(`Promoted ${superEmail} to SUPER_ADMIN`);
    } else if (!user) {
      console.log(
        `SUPER_ADMIN_EMAIL=${superEmail} will be promoted on first Google sign-in.`,
      );
    } else {
      console.log(`${superEmail} is already SUPER_ADMIN`);
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

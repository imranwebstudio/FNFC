import { redirect } from "next/navigation";

import { auth } from "~/server/auth";

export default async function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user?.role !== "SUPER_ADMIN") {
    redirect("/admin");
  }
  return children;
}

import { redirect } from "next/navigation";

import { AdminShell } from "~/components/admin-shell";
import { getAppName } from "~/lib/app-name.server";
import { auth } from "~/server/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!session.user.profileComplete) redirect("/onboarding");
  if (
    session.user.role !== "ADMIN" &&
    session.user.role !== "SUPER_ADMIN"
  ) {
    redirect("/app");
  }

  const isSuper = session.user.role === "SUPER_ADMIN";

  const links = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/menu", label: "Menu" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/users", label: "Users" },
    ...(isSuper ? [{ href: "/admin/team", label: "Staff" }] : []),
  ];

  return (
    <AdminShell user={session.user} links={links} appName={getAppName()}>
      {children}
    </AdminShell>
  );
}

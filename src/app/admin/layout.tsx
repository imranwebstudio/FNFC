import { redirect } from "next/navigation";

import { AdminSubNav } from "~/components/admin-sub-nav";
import { AppNav } from "~/components/nav";
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
    { href: "/admin/catalog", label: "Catalog" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/users", label: "Users" },
    ...(isSuper ? [{ href: "/admin/team", label: "Staff" }] : []),
  ];

  return (
    <div className="min-h-screen">
      <AppNav user={session.user} />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <AdminSubNav links={links} />
        {children}
      </div>
    </div>
  );
}

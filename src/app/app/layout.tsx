import { redirect } from "next/navigation";

import { AppNav } from "~/components/nav";
import { getAppName } from "~/lib/app-name.server";
import { auth } from "~/server/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!session.user.profileComplete) redirect("/onboarding");

  return (
    <div className="min-h-screen">
      <AppNav user={session.user} appName={getAppName()} />
      <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
    </div>
  );
}

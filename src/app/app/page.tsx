import { TodayMenu } from "~/components/today-menu";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function AppHomePage() {
  const session = await auth();
  // Only prefetch when the JWT is valid — otherwise dehydrate rejects with UNAUTHORIZED.
  if (session?.user) {
    await Promise.all([
      api.menu.todayForUser.prefetch(),
      api.user.me.prefetch(),
    ]);
  }

  return (
    <HydrateClient>
      <TodayMenu />
    </HydrateClient>
  );
}

import { LogIn } from "lucide-react";

import { redirect } from "next/navigation";

import { APP_NAME } from "~/lib/constants";
import { auth, signIn } from "~/server/auth";
import { env } from "~/env";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
  if (session?.user) {
    redirect(session.user.profileComplete ? "/app" : "/onboarding");
  }

  const googleReady = Boolean(env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(125deg, rgba(15,23,20,0.78) 0%, rgba(11,122,106,0.55) 55%, rgba(15,23,20,0.65) 100%), url('https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=2000&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,107,44,0.22),transparent_40%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-end px-6 pb-16 pt-24 text-white md:pb-24">
        <p className="font-display text-5xl font-extrabold tracking-tight md:text-7xl">
          {APP_NAME}
        </p>
        <h1 className="mt-4 max-w-lg text-xl font-medium text-white/90 md:text-2xl">
          Office lunch, one tap. Biryani, polao, bhat — ordered before cutoff,
          delivered to your desk.
        </h1>
        <p className="mt-3 max-w-md text-sm text-white/70">
          Cash on delivery or wallet deposit. No payment gateway — just
          today&apos;s set meal.
        </p>

        {params.error ? (
          <p className="mt-4 max-w-md rounded-2xl bg-red-100/95 px-3 py-2 text-sm text-red-900">
            Sign-in failed. Try again, or check Google OAuth settings.
          </p>
        ) : null}

        <div className="mt-8">
          {!googleReady ? (
            <p className="max-w-md rounded-2xl border border-white/25 bg-black/45 px-4 py-3 text-sm text-white/85 backdrop-blur">
              Set <code className="font-mono">AUTH_GOOGLE_ID</code> and{" "}
              <code className="font-mono">AUTH_GOOGLE_SECRET</code> in{" "}
              <code className="font-mono">.env</code> to enable Google login.
            </p>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google", {
                  redirectTo: "/onboarding",
                });
              }}
            >
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl bg-spice px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(255,122,69,0.4)] transition hover:bg-spice-deep active:scale-[0.98]"
              >
                <LogIn className="h-4 w-4" strokeWidth={2.25} />
                Continue with Google
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

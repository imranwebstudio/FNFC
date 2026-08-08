import { redirect } from "next/navigation";

/** Auth.js / middleware may still hit /login — send everyone to the single home sign-in. */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const params = await searchParams;
  const qs = new URLSearchParams();
  if (params.error) qs.set("error", params.error);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  redirect(`/${suffix}`);
}

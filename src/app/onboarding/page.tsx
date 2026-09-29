"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { BrandLogo } from "~/components/brand-logo";
import { ProfileForm } from "~/components/profile-form";
import { PageTitle, Panel } from "~/components/ui";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <main className="mx-auto max-w-lg px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="mb-6 flex justify-center">
          <BrandLogo size="lg" priority />
        </div>
        <PageTitle
          title="Almost there"
          subtitle="Choose your office / building — that becomes your catering zone. Add phone and desk details so we can reach you."
        />
        <Panel>
          <ProfileForm
            submitLabel="Save & continue"
            onSuccess={() => {
              router.replace("/app");
              router.refresh();
            }}
          />
        </Panel>
      </motion.div>
    </main>
  );
}

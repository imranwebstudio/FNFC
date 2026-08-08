"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
        <PageTitle
          title="Almost there"
          subtitle="Pick from suggestions or type your own if it’s not listed."
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

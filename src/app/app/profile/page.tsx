"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UserRound } from "lucide-react";

import { ProfileForm } from "~/components/profile-form";
import { PageTitle, Panel } from "~/components/ui";
import { api } from "~/trpc/react";

export default function ProfilePage() {
  const router = useRouter();
  const me = api.user.me.useQuery();

  return (
    <div className="mx-auto max-w-lg">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <PageTitle
          icon={<UserRound className="h-5 w-5" strokeWidth={2.25} />}
          title="Your profile"
          subtitle="Update desk, building, floor, or office. Changing office switches which menu you see."
        />
        <Panel>
          {me.isLoading ? (
            <p className="text-sm text-ink-muted">Loading…</p>
          ) : me.data ? (
            <ProfileForm
              key={me.data.id}
              initial={{
                employeeId: me.data.employeeId ?? "",
                deskNumber: me.data.deskNumber ?? "",
                buildingNumber: me.data.buildingNumber ?? "",
                floorNumber: me.data.floorNumber ?? "",
                locationName: me.data.location?.name ?? "",
              }}
              submitLabel="Save changes"
              onSuccess={() => router.refresh()}
            />
          ) : (
            <p className="text-sm text-red-700">Couldn’t load profile.</p>
          )}
        </Panel>
      </motion.div>
    </div>
  );
}

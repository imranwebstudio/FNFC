"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UserRound } from "lucide-react";

import { ProfileForm } from "~/components/profile-form";
import { FoodPlateLoader } from "~/components/food-plate-loader";
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
          subtitle="Update desk, building, floor, office address, or phone. Your catering zone is assigned by an admin."
        />
        <Panel>
          {me.isLoading ? (
            <FoodPlateLoader size="inline" label="Loading profile…" />
          ) : me.data ? (
            <ProfileForm
              key={me.data.id}
              initial={{
                employeeId: me.data.employeeId ?? "",
                phoneNumber: me.data.phoneNumber ?? "",
                deskNumber: me.data.deskNumber ?? "",
                buildingNumber: me.data.buildingNumber ?? "",
                floorNumber: me.data.floorNumber ?? "",
                locationName: me.data.locationLabel ?? "",
              }}
              submitLabel="Save changes"
              onSuccess={() => router.refresh()}
            />
          ) : (
            <p className="text-sm text-red-700">Couldn’t load profile.</p>
          )}
          {me.data && !me.data.locationId ? (
            <p className="mt-4 rounded-xl bg-leaf/10 px-3 py-2 text-sm text-ink-muted">
              No catering zone yet — you can still order from any office menu.
              An admin will assign your zone later.
            </p>
          ) : me.data?.location ? (
            <p className="mt-4 text-xs text-ink-muted">
              Catering zone:{" "}
              <span className="font-semibold text-ink">{me.data.location.name}</span>
            </p>
          ) : null}
        </Panel>
      </motion.div>
    </div>
  );
}

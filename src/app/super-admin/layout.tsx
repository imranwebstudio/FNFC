import { redirect } from "next/navigation";

/** Legacy /super-admin → unified /admin */
export default function LegacySuperAdminLayout() {
  redirect("/admin");
}

import { redirect } from "next/navigation";

/** Catalog merged into Menu — keep URL for old bookmarks. */
export default function CatalogRedirectPage() {
  redirect("/admin/menu");
}

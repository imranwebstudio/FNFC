/**
 * Insert Cloudinary delivery transforms for display-sized images.
 * Falls back to the original URL if it isn't a Cloudinary delivery URL.
 */
export function cloudinaryDisplayUrl(
  url: string | null | undefined,
  opts: { width: number; height: number; crop?: "fill" | "limit" } = {
    width: 1200,
    height: 800,
  },
): string | undefined {
  if (!url) return undefined;
  const crop = opts.crop ?? "fill";
  const marker = "/upload/";
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  const transform = `c_${crop},w_${opts.width},h_${opts.height},q_auto,f_auto`;
  // Avoid stacking transforms if already transformed
  const after = url.slice(idx + marker.length);
  if (/^(c_|w_|h_|q_|f_|fl_)/.test(after) || after.startsWith("v")) {
    // insert before version or public_id
    return (
      url.slice(0, idx + marker.length) + transform + "/" + after
    );
  }
  return url.slice(0, idx + marker.length) + transform + "/" + after;
}

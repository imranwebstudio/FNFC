import { v2 as cloudinary } from "cloudinary";
import { env } from "~/env";

export function configureCloudinary() {
  if (
    !env.CLOUDINARY_CLOUD_NAME ||
    !env.CLOUDINARY_API_KEY ||
    !env.CLOUDINARY_API_SECRET
  ) {
    return false;
  }
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  return true;
}

/** Signed upload params for browser direct upload */
export function getCloudinaryUploadSignature() {
  if (!configureCloudinary()) {
    throw new Error("Cloudinary is not configured");
  }
  const timestamp = Math.round(Date.now() / 1000);
  const folder = "office-catering";
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    env.CLOUDINARY_API_SECRET!,
  );
  return {
    timestamp,
    folder,
    signature,
    cloudName: env.CLOUDINARY_CLOUD_NAME!,
    apiKey: env.CLOUDINARY_API_KEY!,
  };
}

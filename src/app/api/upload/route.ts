import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import { env } from "~/env";
import { auth } from "~/server/auth";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (
    session.user.role !== "ADMIN" &&
    session.user.role !== "SUPER_ADMIN"
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (
    !env.CLOUDINARY_CLOUD_NAME ||
    !env.CLOUDINARY_API_KEY ||
    !env.CLOUDINARY_API_SECRET
  ) {
    return NextResponse.json(
      { error: "Cloudinary is not configured" },
      { status: 503 },
    );
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Only image files are allowed" },
      { status: 400 },
    );
  }

  // Keep under typical serverless body limits (~4.5MB on Vercel)
  if (file.size > 4.5 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Image must be under 4.5MB" },
      { status: 400 },
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "office-catering",
            resource_type: "image",
            transformation: [
              { width: 1600, height: 1200, crop: "limit", quality: "auto" },
            ],
          },
          (err, result) => {
            if (err || !result?.secure_url) {
              reject(err ?? new Error("Upload failed"));
              return;
            }
            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
            });
          },
        )
        .end(buffer);
    });

    return NextResponse.json({
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    });
  } catch (err) {
    console.error("Cloudinary upload error", err);
    const message =
      err && typeof err === "object" && "message" in err
        ? String((err as { message: string }).message)
        : "Failed to upload image";
    const status =
      err && typeof err === "object" && "http_code" in err
        ? Number((err as { http_code: number }).http_code)
        : 500;
    return NextResponse.json(
      {
        error:
          status === 401
            ? "Cloudinary rejected the API key. Update CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env from the Cloudinary dashboard (Settings → API Keys), then restart npm run dev."
            : message,
      },
      { status: status === 401 ? 401 : 500 },
    );
  }
}

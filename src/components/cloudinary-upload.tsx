"use client";

import { useRef, useState } from "react";

import { Button, Label } from "~/components/ui";
import { cloudinaryDisplayUrl } from "~/lib/cloudinary-url";
import { showSuccess } from "~/lib/swal";

type CloudinaryUploadProps = {
  value?: string;
  onUploaded: (url: string) => void;
  onClear?: () => void;
  label?: string;
};

export function CloudinaryUpload({
  value,
  onUploaded,
  onClear,
  label = "Meal photo",
}: CloudinaryUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string | null>(null);

  const preview = cloudinaryDisplayUrl(value, { width: 800, height: 500 });

  async function uploadFile(file: File) {
    setBusy(true);
    setError(null);
    setProgress("Uploading to Cloudinary…");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !json.url) {
        throw new Error(json.error ?? "Upload failed");
      }
      onUploaded(json.url);
      showSuccess("Photo uploaded");
      setProgress(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setProgress(null);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {preview ? (
        <div className="overflow-hidden rounded-xl border border-line bg-sand/30">
          <div className="relative h-40 w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Meal preview"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 p-2">
            <Button
              type="button"
              variant="secondary"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
            >
              Replace photo
            </Button>
            {onClear ? (
              <Button
                type="button"
                variant="ghost"
                disabled={busy}
                onClick={onClear}
              >
                Remove
              </Button>
            ) : null}
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const file = e.dataTransfer.files?.[0];
            if (file) void uploadFile(file);
          }}
          className="flex h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-rice/80 px-4 text-center transition hover:border-leaf hover:bg-leaf/5 disabled:opacity-50"
        >
          <span className="text-sm font-semibold text-ink">
            {busy ? "Uploading…" : "Click or drop an image"}
          </span>
          <span className="text-xs text-ink-muted">
            JPG, PNG, WebP · up to 4.5MB · uploaded to Cloudinary
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={busy}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void uploadFile(file);
        }}
      />

      {progress ? (
        <p className="text-xs text-ink-muted">{progress}</p>
      ) : null}
      {error ? <p className="text-xs text-red-700">{error}</p> : null}
    </div>
  );
}

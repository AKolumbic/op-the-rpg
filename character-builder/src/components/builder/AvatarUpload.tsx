"use client";

import { useState, useRef, useCallback } from "react";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { createClient } from "@/lib/supabase/client";

interface Props {
  avatarUrl: string;
  onUpload: (url: string) => void;
}

function getCroppedCanvas(
  image: HTMLImageElement,
  crop: PixelCrop
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width * scaleX;
  canvas.height = crop.height * scaleY;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return canvas;
}

export default function AvatarUpload({ avatarUrl, onUpload }: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 10,
    y: 10,
    width: 80,
    height: 80,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }

    setError("");
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result as string);
    reader.readAsDataURL(file);
  }

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    imgRef.current = e.currentTarget;
  }, []);

  function cancelCrop() {
    setSrc(null);
    setCompletedCrop(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleCropAndUpload() {
    if (!imgRef.current || !completedCrop) return;

    setUploading(true);
    setError("");

    try {
      const canvas = getCroppedCanvas(imgRef.current, completedCrop);
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Failed to create image"))),
          "image/webp",
          0.85
        );
      });

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileName = `${user.id}/${Date.now()}.webp`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, blob, {
          contentType: "image/webp",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName);

      onUpload(publicUrl);
      setSrc(null);
      setCompletedCrop(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Upload failed. Make sure the 'avatars' storage bucket exists in Supabase."
      );
    } finally {
      setUploading(false);
    }
  }

  function removeAvatar() {
    onUpload("");
  }

  return (
    <div>
      {/* Current avatar or placeholder */}
      {!src && (
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 border-3 border-accent bg-card-bg shadow-[4px_4px_0_#000] overflow-hidden flex-shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Character portrait"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="comic-btn bg-comic-blue text-white text-sm cursor-pointer inline-block text-center">
              {avatarUrl ? "Change Photo" : "Upload Photo"}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
            {avatarUrl && (
              <button
                type="button"
                onClick={removeAvatar}
                className="text-xs text-comic-red font-display hover:underline text-left"
              >
                Remove
              </button>
            )}
            <p className="text-xs text-muted">JPG, PNG, or WebP. Max 5MB.</p>
          </div>
        </div>
      )}

      {/* Crop interface */}
      {src && (
        <div className="border-3 border-accent bg-card-bg p-4 shadow-[4px_4px_0_#000]">
          <p className="font-display text-sm tracking-wide text-accent mb-3">
            Crop Your Photo
          </p>
          <div className="max-w-md mx-auto mb-4">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
            >
              <img
                src={src}
                alt="Crop preview"
                onLoad={onImageLoad}
                style={{ maxHeight: "400px", width: "100%" }}
              />
            </ReactCrop>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={cancelCrop}
              disabled={uploading}
              className="comic-btn bg-card-bg text-foreground/70 text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCropAndUpload}
              disabled={uploading || !completedCrop}
              className="comic-btn bg-comic-green text-black text-sm disabled:opacity-30"
            >
              {uploading ? "Uploading..." : "Save Photo"}
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="text-comic-red text-xs font-semibold mt-2">{error}</p>
      )}
    </div>
  );
}

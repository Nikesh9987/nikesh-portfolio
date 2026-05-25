// lib/cloudinary.ts
// Cloudinary helpers — upload video, delete video
// Upload uses unsigned preset (no server needed)
// Delete goes through our API route (requires API secret — server only)

// ── Types ──────────────────────────────────────────────────────────────────
export interface CloudinaryUploadResult {
  public_id:    string;   // e.g. "portfolio/videos/my-demo"
  secure_url:   string;   // https://res.cloudinary.com/djpxtndjc/video/...
  duration:     number;   // video duration in seconds
  bytes:        number;   // file size in bytes
  format:       string;   // "mp4", "webm", etc.
  width:        number;
  height:       number;
  thumbnail_url: string;  // auto-generated thumbnail
}

export interface UploadProgress {
  percent:   number;   // 0–100
  loaded:    number;   // bytes uploaded
  total:     number;   // total bytes
}

// ── Constants ──────────────────────────────────────────────────────────────
const CLOUD_NAME    = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const UPLOAD_URL    = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`;

// ── Upload video to Cloudinary ─────────────────────────────────────────────
// Uses unsigned preset — no API secret needed on client
export async function uploadVideoToCloudinary(
  file:           File,
  onProgress?:    (progress: UploadProgress) => void
): Promise<CloudinaryUploadResult> {

  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file",           file);
    formData.append("upload_preset",  UPLOAD_PRESET);
    formData.append("resource_type",  "video");
    formData.append("folder",         "portfolio/videos");

    const xhr = new XMLHttpRequest();

    // Track upload progress
    if (onProgress) {
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          onProgress({
            percent: Math.round((e.loaded / e.total) * 100),
            loaded:  e.loaded,
            total:   e.total,
          });
        }
      });
    }

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);

        // Build thumbnail URL from the video public_id
        const thumbnailUrl = buildThumbnailUrl(data.public_id);

        resolve({
          public_id:    data.public_id,
          secure_url:   data.secure_url,
          duration:     data.duration     ?? 0,
          bytes:        data.bytes        ?? 0,
          format:       data.format       ?? "mp4",
          width:        data.width        ?? 0,
          height:       data.height       ?? 0,
          thumbnail_url: thumbnailUrl,
        });
      } else {
        const err = JSON.parse(xhr.responseText);
        reject(new Error(err?.error?.message ?? "Upload failed"));
      }
    });

    xhr.addEventListener("error", () => {
      reject(new Error("Network error during upload"));
    });

    xhr.addEventListener("abort", () => {
      reject(new Error("Upload cancelled"));
    });

    xhr.open("POST", UPLOAD_URL);
    xhr.send(formData);
  });
}

// ── Build auto-generated thumbnail URL from Cloudinary ────────────────────
// Cloudinary auto-generates a thumbnail for videos
export function buildThumbnailUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_1,w_480,h_270,c_fill,f_jpg/${publicId}.jpg`;
}

// ── Build video streaming URL ──────────────────────────────────────────────
export function buildVideoUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/q_auto,f_auto/${publicId}`;
}

// ── Format file size for display ──────────────────────────────────────────
export function formatBytes(bytes: number): string {
  if (bytes === 0)             return "0 B";
  if (bytes < 1024 * 1024)    return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Format duration for display ───────────────────────────────────────────
export function formatDuration(seconds: number): string {
  if (!seconds || seconds === 0) return "";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ── Delete video via our server API route ─────────────────────────────────
// (API secret stays server-side — never exposed to client)
export async function deleteVideoFromCloudinary(
  publicId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/admin/cloudinary-delete", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ publicId }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error ?? "Delete failed" };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Network error" };
  }
}
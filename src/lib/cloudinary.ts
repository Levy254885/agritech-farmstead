/**
 * Cloudinary — set on Vercel:
 * VITE_CLOUDINARY_CLOUD_NAME
 * VITE_CLOUDINARY_UPLOAD_PRESET  (must be UNSIGNED)
 */

const cloudName = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined)?.trim();
const uploadPreset = (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined)?.trim();

export function isCloudinaryConfigured(): boolean {
  return Boolean(cloudName && uploadPreset);
}

export function getCloudinaryCloudName(): string | undefined {
  return cloudName;
}

/** Normalize any stored image value to a browser-loadable HTTPS URL */
export function resolveImageUrl(src: string | undefined | null): string {
  if (!src) return '';
  const s = src.trim();
  if (!s) return '';
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith('//')) return `https:${s}`;
  if (cloudName) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${s.replace(/^\//, '')}`;
  }
  if (s.startsWith('/')) return s;
  return s;
}

export function cloudinaryUrl(
  publicIdOrUrl: string,
  options?: { width?: number; height?: number; crop?: string }
): string {
  if (!publicIdOrUrl) return '';
  if (/^https?:\/\//i.test(publicIdOrUrl)) return publicIdOrUrl;
  if (!cloudName) return publicIdOrUrl;
  const w = options?.width ? `w_${options.width},` : '';
  const h = options?.height ? `h_${options.height},` : '';
  const c = options?.crop ? `c_${options.crop},` : 'c_fill,';
  return `https://res.cloudinary.com/${cloudName}/image/upload/${w}${h}${c}q_auto,f_auto/${publicIdOrUrl}`;
}

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width?: number;
  height?: number;
}

export async function uploadImage(file: File): Promise<CloudinaryUploadResult> {
  if (!cloudName || !uploadPreset) {
    throw new Error(
      'Cloudinary is not configured. In Vercel set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET (unsigned preset), then redeploy.'
    );
  }

  const form = new FormData();
  form.append('file', file);
  form.append('upload_preset', uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: form }
  );

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg =
      data?.error?.message ||
      data?.message ||
      `Upload failed (${res.status}). Check that the upload preset is UNSIGNED and the cloud name is correct.`;
    throw new Error(msg);
  }

  if (!data.secure_url) {
    throw new Error('Upload succeeded but no secure_url returned from Cloudinary.');
  }

  return {
    public_id: data.public_id as string,
    secure_url: data.secure_url as string,
    width: data.width,
    height: data.height,
  };
}

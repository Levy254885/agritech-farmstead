/**
 * Cloudinary image delivery helpers.
 * Upload from the admin UI uses unsigned preset or server-side when configured.
 * Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env
 */

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;

export function isCloudinaryConfigured(): boolean {
  return Boolean(cloudName && uploadPreset);
}

/** Build a delivery URL from a public ID or return external URLs as-is */
export function cloudinaryUrl(
  publicIdOrUrl: string,
  options?: { width?: number; height?: number; crop?: string }
): string {
  if (!publicIdOrUrl) return '';
  if (publicIdOrUrl.startsWith('http://') || publicIdOrUrl.startsWith('https://')) {
    return publicIdOrUrl;
  }
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

/** Client-side unsigned upload (requires upload preset on Cloudinary dashboard) */
export async function uploadImage(file: File): Promise<CloudinaryUploadResult> {
  if (!cloudName || !uploadPreset) {
    throw new Error(
      'Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET, or paste an image URL instead.'
    );
  }
  const form = new FormData();
  form.append('file', file);
  form.append('upload_preset', uploadPreset);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: form }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'Upload failed');
  }
  const data = await res.json();
  return {
    public_id: data.public_id,
    secure_url: data.secure_url,
    width: data.width,
    height: data.height,
  };
}

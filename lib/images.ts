export const IMAGE_BUCKET = "post-images";
export const MAX_IMAGE_MB = 5;
export const MAX_IMAGE_BYTES = MAX_IMAGE_MB * 1024 * 1024;
export const IMAGE_ACCEPT = "image/*";

export function imageExtension(type: string): string | null {
  switch (type) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      return null;
  }
}

export function imageFileError(file: {
  readonly type: string;
  readonly size: number;
}): string | null {
  if (!imageExtension(file.type)) {
    if (file.type === "image/heic" || file.type === "image/heif") {
      return "HEIC photos aren't supported. Choose a JPEG, PNG, or WebP, or set your iPhone camera to Most Compatible.";
    }
    return "Choose a JPEG, PNG, or WebP image.";
  }
  if (file.size <= 0) {
    return "That image file is empty.";
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return `Keep the photo under ${MAX_IMAGE_MB} MB.`;
  }
  return null;
}

export function imageObjectName(type: string): string {
  const extension = imageExtension(type);
  if (!extension) {
    throw new Error("Unsupported image type.");
  }
  return `${crypto.randomUUID()}.${extension}`;
}

function detail(message: string | null | undefined): string | null {
  const value = message?.trim();
  return value && value.length > 0 ? value : null;
}

export function storageErrorMessage(message: string | null | undefined): string {
  const value = detail(message);
  if (!value) {
    return "The photo upload failed and Supabase returned no reason.";
  }
  const text = value.toLowerCase();

  if (text.includes("bucket not found")) {
    return "The post-images bucket is missing. Run supabase/photo-upload.sql, then try again.";
  }
  if (
    text.includes("row-level security") ||
    text.includes("unauthorized") ||
    text.includes("permission")
  ) {
    return "The photo bucket rejected the upload. Check the Storage insert policy for post-images.";
  }
  if (
    text.includes("too large") ||
    text.includes("maximum allowed size") ||
    text.includes("payload")
  ) {
    return "The photo is over the 5 MB bucket limit.";
  }
  if (text.includes("mime") || text.includes("content type")) {
    return "The bucket does not allow that file type. Use JPEG, PNG, or WebP.";
  }
  if (text.includes("failed to fetch") || text.includes("network")) {
    return "The upload could not reach Supabase. Check your connection and try again.";
  }

  return `The photo upload failed. Supabase said: ${value}`;
}

export function postErrorMessage(message: string | null | undefined): string {
  const value = detail(message);
  if (!value) {
    return "The post wasn't saved and Supabase returned no reason.";
  }
  const text = value.toLowerCase();

  if (text.includes("image_url") || text.includes("schema cache")) {
    return "The posts table is missing image_url. Run supabase/photo-upload.sql, then try again.";
  }
  if (text.includes("row-level security")) {
    return "The posts insert policy rejected this post.";
  }
  if (text.includes("check constraint")) {
    return "The database rejected the message length.";
  }

  return `The post wasn't saved. Supabase said: ${value}`;
}

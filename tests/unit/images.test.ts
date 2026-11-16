import { describe, expect, it } from "vitest";
import {
  IMAGE_ACCEPT,
  MAX_IMAGE_BYTES,
  imageExtension,
  imageFileError,
} from "../../lib/images";

describe("image validation", () => {
  it("accepts supported image types", () => {
    expect(imageExtension("image/jpeg")).toBe("jpg");
    expect(imageExtension("image/png")).toBe("png");
    expect(imageExtension("image/webp")).toBe("webp");
    expect(IMAGE_ACCEPT).toBe("image/jpeg,image/png,image/webp");
  });

  it("rejects unsupported types", () => {
    expect(imageExtension("image/gif")).toBeNull();
    expect(imageFileError({ type: "text/plain", size: 10 })).toMatch(
      /JPEG, PNG, or WebP/,
    );
  });

  it("rejects empty and oversized files", () => {
    expect(imageFileError({ type: "image/png", size: 0 })).toMatch(/empty/i);
    expect(
      imageFileError({ type: "image/png", size: MAX_IMAGE_BYTES + 1 }),
    ).toMatch(/5 MB/);
    expect(
      imageFileError({ type: "image/png", size: MAX_IMAGE_BYTES }),
    ).toBeNull();
  });
});

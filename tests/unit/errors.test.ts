import { describe, expect, it } from "vitest";
import { postErrorMessage, storageErrorMessage } from "../../lib/errors";

describe("storageErrorMessage", () => {
  it("names a missing bucket", () => {
    expect(storageErrorMessage("Bucket not found")).toMatch(/photo-upload/);
  });

  it("names policy, size, type, and network failures", () => {
    expect(
      storageErrorMessage("new row violates row-level security policy"),
    ).toMatch(/policy/i);
    expect(storageErrorMessage("The object exceeded the maximum allowed size")).toMatch(
      /5 MB/,
    );
    expect(storageErrorMessage("invalid mime type")).toMatch(/JPEG, PNG, or WebP/);
    expect(storageErrorMessage("Failed to fetch")).toMatch(/connection/i);
  });

  it("keeps the original reason when it has no mapping", () => {
    expect(storageErrorMessage("The resource already exists")).toContain(
      "The resource already exists",
    );
    expect(storageErrorMessage(undefined)).toMatch(/no reason/i);
  });
});

describe("postErrorMessage", () => {
  it("names a missing image_url column", () => {
    expect(postErrorMessage("column image_url does not exist")).toMatch(
      /photo-upload/,
    );
  });

  it("names policy and length failures", () => {
    expect(postErrorMessage("new row violates row-level security policy")).toMatch(
      /policy/i,
    );
    expect(postErrorMessage("violates check constraint")).toMatch(/length/i);
  });

  it("keeps the original reason when it has no mapping", () => {
    expect(postErrorMessage("connection reset")).toContain("connection reset");
  });
});

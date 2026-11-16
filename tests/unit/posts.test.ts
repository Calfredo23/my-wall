import { describe, expect, it } from "vitest";
import {
  FEED_LIMIT,
  POST_LIMIT,
  formatPostTime,
  mergePosts,
  messageError,
  normalizeMessage,
  parsePost,
  sortPosts,
  type Post,
} from "../../lib/posts";

function post(overrides: Partial<Post> = {}): Post {
  return {
    id: "post-1",
    author: "Cedrick Alfredo Catimbang",
    content: "Hello wall.",
    createdAt: "2026-11-16T10:00:00.000Z",
    ...overrides,
  };
}

describe("message validation", () => {
  it("trims outer whitespace and normalizes line endings", () => {
    expect(normalizeMessage("  hello\r\nwall  ")).toBe("hello\nwall");
  });

  it("rejects empty messages", () => {
    expect(messageError("   ")).toMatch(/write something/i);
    expect(messageError("\n\t")).toMatch(/write something/i);
  });

  it("accepts a message at the limit", () => {
    expect(messageError("x".repeat(POST_LIMIT))).toBeNull();
  });

  it("rejects a message over the limit", () => {
    expect(messageError("x".repeat(POST_LIMIT + 1))).toMatch(/280/);
  });

  it("exposes the feed limit", () => {
    expect(FEED_LIMIT).toBe(50);
  });
});

describe("parsePost", () => {
  it("parses a valid row", () => {
    expect(
      parsePost({
        id: "abc",
        author: "Cedrick",
        content: "  Hello  ",
        created_at: "2026-11-16T10:00:00.000Z",
      }),
    ).toEqual({
      id: "abc",
      author: "Cedrick",
      content: "Hello",
      createdAt: "2026-11-16T10:00:00.000Z",
    });
  });

  it("rejects malformed rows", () => {
    expect(parsePost(null)).toBeNull();
    expect(parsePost({})).toBeNull();
    expect(
      parsePost({
        id: "abc",
        author: "Cedrick",
        content: "x".repeat(POST_LIMIT + 1),
        created_at: "2026-11-16T10:00:00.000Z",
      }),
    ).toBeNull();
    expect(
      parsePost({
        id: "abc",
        author: "Cedrick",
        content: "Hello",
        created_at: "not-a-date",
      }),
    ).toBeNull();
  });
});

describe("feed ordering", () => {
  it("sorts newest first and breaks ties by id", () => {
    const sorted = sortPosts([
      post({ id: "a", createdAt: "2026-11-16T10:00:00.000Z" }),
      post({ id: "c", createdAt: "2026-11-16T12:00:00.000Z" }),
      post({ id: "b", createdAt: "2026-11-16T12:00:00.000Z" }),
      post({ id: "d", createdAt: "2026-11-16T09:00:00.000Z" }),
    ]);
    expect(sorted.map((entry) => entry.id)).toEqual(["c", "b", "a", "d"]);
  });

  it("deduplicates by id and keeps the newest version", () => {
    const merged = mergePosts(
      [post({ id: "a", content: "old" })],
      [post({ id: "a", content: "new" }), post({ id: "b" })],
    );
    expect(merged).toHaveLength(2);
    expect(merged.find((entry) => entry.id === "a")?.content).toBe("new");
  });
});

describe("formatPostTime", () => {
  it("formats a valid timestamp in a fixed timezone", () => {
    expect(formatPostTime("2026-11-16T10:00:00.000Z")).toBe(
      "Nov 16, 2026, 6:00 PM",
    );
  });

  it("ignores an invalid timestamp", () => {
    expect(formatPostTime("nope")).toBe("");
  });
});

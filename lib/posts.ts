export const POST_LIMIT = 280;
export const FEED_LIMIT = 50;
export const DEFAULT_AUTHOR = "Cedrick Alfredo Catimbang";

export type Post = {
  readonly id: string;
  readonly author: string;
  readonly content: string;
  readonly createdAt: string;
};

export function normalizeMessage(value: string): string {
  return value.replace(/\r\n?/g, "\n").trim();
}

export function messageError(value: string): string | null {
  const content = normalizeMessage(value);
  if (!content) {
    return "Write something before sharing.";
  }
  if (content.length > POST_LIMIT) {
    return `Keep it to ${POST_LIMIT} characters.`;
  }
  return null;
}

export function parsePost(value: unknown): Post | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }
  const row = value as Record<string, unknown>;
  if (typeof row.id !== "string" || row.id.length === 0) {
    return null;
  }
  if (typeof row.author !== "string" || row.author.trim().length === 0) {
    return null;
  }
  if (typeof row.content !== "string") {
    return null;
  }
  const content = row.content.trim();
  if (content.length === 0 || content.length > POST_LIMIT) {
    return null;
  }
  if (typeof row.created_at !== "string") {
    return null;
  }
  const createdAt = row.created_at;
  if (Number.isNaN(Date.parse(createdAt))) {
    return null;
  }
  return {
    id: row.id,
    author: row.author.trim(),
    content,
    createdAt,
  };
}

export function sortPosts(posts: readonly Post[]): Post[] {
  return [...posts].sort((left, right) => {
    const timeDelta =
      Date.parse(right.createdAt) - Date.parse(left.createdAt);
    if (timeDelta !== 0) {
      return timeDelta;
    }
    return right.id.localeCompare(left.id);
  });
}

export function mergePosts(
  current: readonly Post[],
  incoming: readonly Post[],
): Post[] {
  const byId = new Map<string, Post>();
  for (const post of current) {
    byId.set(post.id, post);
  }
  for (const post of incoming) {
    byId.set(post.id, post);
  }
  return sortPosts([...byId.values()]);
}

export function formatPostTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Manila",
  }).format(date);
}

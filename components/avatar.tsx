import { DEFAULT_AUTHOR } from "@/lib/posts";

function initials(author: string): string {
  const parts = author.trim().split(/\s+/).slice(0, 3);
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
}

export function Avatar({
  author = DEFAULT_AUTHOR,
  size = "large",
}: {
  author?: string;
  size?: "small" | "large";
}) {
  return (
    <div
      aria-hidden="true"
      className={
        size === "small"
          ? "wall-avatar wall-avatar-small"
          : "wall-avatar wall-avatar-large"
      }
    >
      <span>{initials(author)}</span>
    </div>
  );
}

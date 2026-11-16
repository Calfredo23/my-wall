/* eslint-disable @next/next/no-img-element */
import { Avatar } from "@/components/avatar";
import { formatPostTime, type Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <article data-testid="wall-post" className="wall-post">
      <Avatar author={post.author} size="small" />
      <div className="min-w-0 flex-1">
        <div className="wall-post-head">
          <a href="#profile" className="wall-author">
            {post.author}
          </a>
          <span className="wall-dot" aria-hidden="true">
            ·
          </span>
          <time dateTime={post.createdAt} className="wall-time">
            {formatPostTime(post.createdAt)}
          </time>
        </div>
        <p data-testid="wall-post-content" className="wall-post-content">
          {post.content}
        </p>
        {post.imageUrl ? (
          <a
            href={post.imageUrl}
            target="_blank"
            rel="noreferrer"
            className="wall-post-photo"
            data-testid="wall-post-image-link"
          >
            <img
              src={post.imageUrl}
              alt={`Photo shared by ${post.author}`}
              loading="lazy"
              data-testid="wall-post-image"
            />
          </a>
        ) : null}
      </div>
    </article>
  );
}

"use client";

import { POST_LIMIT } from "@/lib/posts";

export function Composer({
  value,
  onChange,
  onSubmit,
  submitting,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  submitting: boolean;
  error: string | null;
}) {
  const count = value.length;
  const canShare = value.trim().length > 0 && !submitting;

  return (
    <form
      className="wall-panel wall-composer"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="wall-composer-title">What&apos;s on your mind?</div>
      <label htmlFor="wall-message" className="sr-only">
        Write a message for the wall
      </label>
      <textarea
        id="wall-message"
        data-testid="wall-message"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        maxLength={POST_LIMIT}
        rows={3}
        placeholder="Share something with the wall..."
        className="wall-textarea"
        aria-describedby="wall-count"
      />
      <div className="wall-composer-actions">
        <span
          id="wall-count"
          data-testid="character-count"
          className={count >= 260 ? "wall-count wall-count-near" : "wall-count"}
        >
          {count}/{POST_LIMIT}
        </span>
        <button
          type="submit"
          data-testid="share-post"
          disabled={!canShare}
          className="wall-button"
        >
          {submitting ? "Sharing..." : "Share"}
        </button>
      </div>
      {error ? (
        <p role="alert" data-testid="composer-error" className="wall-error">
          {error}
        </p>
      ) : null}
    </form>
  );
}

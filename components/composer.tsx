/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
import { IMAGE_ACCEPT, imageFileError } from "@/lib/images";
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
  onSubmit: (image: File | null) => void;
  submitting: boolean;
  error: string | null;
}) {
  const count = value.length;
  const canShare = value.trim().length > 0 && !submitting;
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  function clearImage() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImage(null);
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function pickFile(file: File | null) {
    if (!file) {
      clearImage();
      setFileError(null);
      return;
    }

    const nextError = imageFileError(file);
    if (nextError) {
      clearImage();
      setFileError(nextError);
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setFileError(null);
  }

  const visibleError = error ?? fileError;

  return (
    <form
      className="wall-panel wall-composer"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(image);
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

      {previewUrl ? (
        <div data-testid="wall-photo-preview" className="wall-photo-preview">
          <img
            src={previewUrl}
            alt="Selected photo preview"
            className="wall-photo-preview-image"
          />
          <div className="wall-photo-preview-meta">
            <span className="wall-photo-name">{image?.name}</span>
            <button
              type="button"
              data-testid="remove-photo"
              className="wall-photo-remove"
              onClick={() => {
                clearImage();
                setFileError(null);
              }}
            >
              Remove photo
            </button>
          </div>
        </div>
      ) : null}

      <div className="wall-composer-actions">
        <span
          id="wall-count"
          data-testid="character-count"
          className={count >= 260 ? "wall-count wall-count-near" : "wall-count"}
        >
          {count}/{POST_LIMIT}
        </span>
        <label className="wall-photo-pick">
          <span aria-hidden="true">+</span> Add photo
          <input
            ref={inputRef}
            id="wall-photo"
            data-testid="wall-photo"
            type="file"
            accept={IMAGE_ACCEPT}
            className="sr-only"
            disabled={submitting}
            onChange={(event) => pickFile(event.target.files?.[0] ?? null)}
          />
        </label>
        <button
          type="submit"
          data-testid="share-post"
          disabled={!canShare}
          title={!canShare && image ? "Add a message before sharing" : undefined}
          className="wall-button"
        >
          {submitting ? "Sharing..." : "Share"}
        </button>
      </div>
      {image && value.trim().length === 0 && !visibleError ? (
        <p data-testid="photo-message-hint" className="wall-photo-hint">
          Add a message before sharing your photo.
        </p>
      ) : null}
      {visibleError ? (
        <p role="alert" data-testid="composer-error" className="wall-error">
          {visibleError}
        </p>
      ) : null}
    </form>
  );
}

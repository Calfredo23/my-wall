"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Composer } from "@/components/composer";
import { PostCard } from "@/components/post-card";
import { ProfileCard } from "@/components/profile-card";
import { WallHeader } from "@/components/wall-header";
import {
  FEED_LIMIT,
  messageError,
  mergePosts,
  normalizeMessage,
  parsePost,
  sortPosts,
  type Post,
} from "@/lib/posts";
import { IMAGE_BUCKET, imageObjectName } from "@/lib/images";
import {
  getSupabaseClient,
} from "@/lib/supabase/client";

type FeedStatus = "loading" | "ready" | "error" | "unconfigured";

function SetupNotice() {
  return (
    <section
      data-testid="wall-setup"
      className="wall-panel wall-setup"
      aria-labelledby="setup-title"
    >
      <h2 id="setup-title" className="wall-setup-title">
        Connect Supabase
      </h2>
      <p>
        The wall is ready, but it needs a database. Create a Supabase project
        with a <code>posts</code> table, then add the environment variables.
      </p>
      <ol>
        <li>
          Create <code>posts</code> with <code>id</code>, <code>author</code>,{" "}
          <code>content</code>, and <code>created_at</code>.
        </li>
        <li>
          Enable RLS with public <code>select</code> and <code>insert</code>{" "}
          policies, and turn on Realtime for the table.
        </li>
        <li>
          Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code>.env.local</code>{" "}
          and Vercel.
        </li>
      </ol>
      <p className="wall-muted">
        The app does not ship with keys. Follow <code>.env.example</code>.
      </p>
    </section>
  );
}

export function Wall({
  configured,
  initialPosts,
  initialError,
}: {
  configured: boolean;
  initialPosts: readonly Post[];
  initialError: string | null;
}) {
  const supabase = useMemo(() => getSupabaseClient(), []);
  const [posts, setPosts] = useState<Post[]>(() => [...initialPosts]);
  const [status, setStatus] = useState<FeedStatus>(() =>
    !configured ? "unconfigured" : initialError ? "error" : "ready",
  );
  const [loadError, setLoadError] = useState<string | null>(initialError);
  const [draft, setDraft] = useState("");
  const [composerKey, setComposerKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [composerError, setComposerError] = useState<string | null>(null);
  const [live, setLive] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const loadPosts = useCallback(async () => {
    if (!supabase) {
      return;
    }
    const { data, error } = await supabase
      .from("posts")
      .select("id,author,content,image_url,created_at")
      .order("created_at", { ascending: false })
      .limit(FEED_LIMIT);

    if (error) {
      setStatus("error");
      setLoadError("The wall couldn't load. Check the Supabase table and policies.");
      return;
    }

    const parsed = (data ?? [])
      .map(parsePost)
      .filter((post): post is Post => post !== null);
    setPosts(sortPosts(parsed));
    setStatus("ready");
  }, [supabase]);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    const channel = supabase
      .channel("wall-posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => {
          const post = parsePost(payload.new);
          if (!post) {
            return;
          }
          setPosts((current) => mergePosts(current, [post]));
          setStatus("ready");
          setAnnouncement("A new post was added to the wall.");
        },
      )
      .subscribe((state) => {
        if (state === "SUBSCRIBED") {
          setLive(true);
        } else if (
          state === "CHANNEL_ERROR" ||
          state === "TIMED_OUT" ||
          state === "CLOSED"
        ) {
          setLive(false);
        }
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase]);

  const handleSubmit = async (image: File | null) => {
    if (!supabase) {
      return;
    }
    const error = messageError(draft);
    if (error) {
      setComposerError(error);
      return;
    }

    setSubmitting(true);
    setComposerError(null);

    let imageUrl: string | null = null;
    let uploadedPath: string | null = null;

    if (image) {
      const objectName = imageObjectName(image.type);
      const { error: uploadError } = await supabase.storage
        .from(IMAGE_BUCKET)
        .upload(objectName, image, {
          contentType: image.type,
          cacheControl: "31536000",
        });

      if (uploadError) {
        setSubmitting(false);
        setComposerError(
          "Couldn't upload that photo. Try a JPEG, PNG, or WebP under 5 MB.",
        );
        return;
      }

      uploadedPath = objectName;
      imageUrl = supabase.storage
        .from(IMAGE_BUCKET)
        .getPublicUrl(objectName).data.publicUrl;
    }

    const { data, error: insertError } = await supabase
      .from("posts")
      .insert({
        content: normalizeMessage(draft),
        ...(imageUrl ? { image_url: imageUrl } : {}),
      })
      .select("id,author,content,image_url,created_at")
      .single();

    if (insertError) {
      if (uploadedPath) {
        await supabase.storage.from(IMAGE_BUCKET).remove([uploadedPath]);
      }
      setSubmitting(false);
      setComposerError(
        "Couldn't share that. Check the Supabase table and try again.",
      );
      return;
    }

    const post = parsePost(data);
    if (!post) {
      setSubmitting(false);
      setComposerError(
        "The post was saved but the response was incomplete. Refresh the wall.",
      );
      return;
    }

    setPosts((current) => mergePosts(current, [post]));
    setStatus("ready");
    setDraft("");
    setComposerKey((current) => current + 1);
    setSubmitting(false);
    setAnnouncement(
      image
        ? "Your post with a photo is on the wall."
        : "Your post is on the wall.",
    );
  };

  return (
    <div className="wall-page">
      <WallHeader />

      <main className="wall-layout">
        <ProfileCard />

        <section id="feed" aria-labelledby="wall-title" className="wall-main">
          <div className="wall-panel wall-feed-title">
            <div>
              <h2 id="wall-title">The Wall</h2>
              <p className="wall-muted">
                {posts.length} {posts.length === 1 ? "post" : "posts"} · newest
                first
              </p>
            </div>
            <span
              data-testid="feed-status"
              className={live ? "wall-live wall-live-on" : "wall-live"}
            >
              <span className="wall-live-dot" aria-hidden="true" />
              {live ? "Live" : "Feed"}
            </span>
          </div>

          {status === "unconfigured" ? <SetupNotice /> : null}

          {status !== "unconfigured" && status !== "error" ? (
            <Composer
              key={composerKey}
              value={draft}
              onChange={(next) => {
                setDraft(next);
                if (composerError) {
                  setComposerError(null);
                }
              }}
              onSubmit={handleSubmit}
              submitting={submitting}
              error={composerError}
            />
          ) : null}

          {status === "loading" ? (
            <p data-testid="feed-loading" className="wall-state" role="status">
              Loading the wall...
            </p>
          ) : null}

          {status === "error" ? (
            <div data-testid="feed-error" className="wall-state" role="alert">
              <p>{loadError}</p>
              <button
                type="button"
                data-testid="retry-feed"
                className="wall-button"
                onClick={() => {
                  setStatus("loading");
                  setLoadError(null);
                  void loadPosts();
                }}
              >
                Try again
              </button>
            </div>
          ) : null}

          {status === "ready" && posts.length === 0 ? (
            <p data-testid="feed-empty" className="wall-state">
              No posts yet. Write the first one.
            </p>
          ) : null}

          {posts.length > 0 ? (
            <div data-testid="wall-feed" className="wall-panel wall-feed">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : null}

          <p className="sr-only" aria-live="polite">
            {announcement}
          </p>
        </section>
      </main>

      <footer className="wall-footer">
        <p>
          The Wall · a 2008-style social wall · posts stored with Supabase
        </p>
      </footer>
    </div>
  );
}

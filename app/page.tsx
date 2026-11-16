import { Wall } from "@/components/wall";
import { FEED_LIMIT, parsePost, sortPosts, type Post } from "@/lib/posts";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return <Wall configured={false} initialPosts={[]} initialError={null} />;
  }

  const { data, error } = await supabase
    .from("posts")
    .select("id,author,content,image_url,created_at")
    .order("created_at", { ascending: false })
    .limit(FEED_LIMIT);

  if (error) {
    console.error("Supabase posts fetch failed:", error.message);
  }

  const posts = (data ?? [])
    .map(parsePost)
    .filter((post): post is Post => post !== null);

  return (
    <Wall
      configured
      initialPosts={sortPosts(posts)}
      initialError={
        error
          ? "The wall couldn't load. Check the Supabase table and policies."
          : null
      }
    />
  );
}

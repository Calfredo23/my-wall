-- Optional photo upload for the Test 2 wall.
-- Run this in the Supabase SQL editor after schema.sql.
-- Reversible: drop the column and bucket if the bonus is removed.

alter table public.posts
  add column if not exists image_url text;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'post-images',
  'post-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read post images" on storage.objects;
create policy "Public can read post images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'post-images');

drop policy if exists "Public can upload post images" on storage.objects;
create policy "Public can upload post images"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'post-images');

notify pgrst, 'reload schema';

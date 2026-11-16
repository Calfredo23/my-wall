-- Test 2 wall schema.
-- Run this in the Supabase SQL editor.

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author text not null default 'Cedrick Alfredo Catimbang',
  content text not null check (char_length(content) between 1 and 280),
  image_url text,
  created_at timestamptz not null default now()
);

create index if not exists posts_created_at_idx
  on public.posts (created_at desc);

alter table public.posts enable row level security;

drop policy if exists "Public can read posts" on public.posts;
create policy "Public can read posts"
  on public.posts for select
  using (true);

drop policy if exists "Public can insert posts" on public.posts;
create policy "Public can insert posts"
  on public.posts for insert
  with check (char_length(content) between 1 and 280);

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'posts'
  ) then
    alter publication supabase_realtime add table public.posts;
  end if;
end $$;

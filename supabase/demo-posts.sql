-- Optional: clean E2E posts and reseed the demo feed.
-- Safe to rerun on the Test 2 project before capturing submission screenshots.

delete from public.posts
where content like 'Wall test %'
   or content like 'Realtime test %'
   or content in (
     'Back on the wall. 2008 forever.',
     'Who else remembers poking someone at 2am?',
     'Coffee, coursework, and a wall post. Some things never change.',
     'Trying out my first Supabase-backed wall. Feels like 2008 in here.'
   );

insert into public.posts (author, content, created_at) values
  ('Cedrick Alfredo Catimbang', 'Back on the wall. 2008 forever.', now() - interval '4 minutes'),
  ('Cedrick Alfredo Catimbang', 'Who else remembers poking someone at 2am?', now() - interval '3 minutes'),
  ('Cedrick Alfredo Catimbang', 'Coffee, coursework, and a wall post. Some things never change.', now() - interval '2 minutes'),
  ('Cedrick Alfredo Catimbang', 'Trying out my first Supabase-backed wall. Feels like 2008 in here.', now() - interval '1 minute');

# Notes for the reviewer — Test 2

**What it is:** a 2008-style social wall built with Next.js 16, React 19, TypeScript,
Tailwind CSS 4, and Supabase.

**Core flow:** write a message, press **Share**, and the post is inserted into the
Supabase `posts` table. The feed renders newest-first and loads the latest 50 posts from
the database on each request.

**Persistence:** posts survive a page refresh because they live in Supabase, not the
browser.

**Extras:** 280-character limit in the composer and as a database check, Supabase
Realtime so a second visitor sees new posts without refreshing, empty/loading/error
states, responsive layout, and axe-checked accessibility.

**Author:** posts use a fixed author name, `Cedrick Alfredo Catimbang`. There is no
login, as allowed by the brief.

**Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind 4,
`@supabase/supabase-js`, Vercel, Vitest, Playwright, axe-core.

**Live:** https://my-wall-calfredo.vercel.app  
**Repo:** https://github.com/Calfredo23/my-wall

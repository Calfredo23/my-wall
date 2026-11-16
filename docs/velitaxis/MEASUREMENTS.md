# MEASUREMENTS

## Tests

- Vitest: 10 passing (validation, parsing, ordering, deduplication, fixed-timezone formatting).
- Playwright: 8 passing with Supabase (post, reload persistence, newest-first, Realtime,
  over-limit rejection, axe, responsive widths, screenshots).
- Live smoke: `https://my-wall-calfredo.vercel.app` — canonical URL, post → reload
  persistence, Realtime in a second tab, 0 console errors.
- CI: run `43806451793` on `de8f27a` — both jobs passed.
- Cleanup: the local E2E run adds three `Wall test…` / `Realtime test…` rows; the fixed
  `supabase/demo-posts.sql` restores the clean five-post feed. Final screenshots were
  recaptured after cleanup.
- axe: 0 violations on the opening wall after contrast correction.
- Responsive: no horizontal page scroll at 360, 768, and 1440.

## Build

- Next.js 16.4.6 Turbopack production build: passes.
- Route `/` is dynamic because it reads the live Supabase feed on each request.
- TypeScript strict and ESLint: clean.

## Database

- Table: `public.posts` (`id`, `author`, `content`, `created_at`).
- RLS: public select and insert only; 280-character database check.
- Realtime publication: `posts`.
- Feed query: newest first, limit 50.

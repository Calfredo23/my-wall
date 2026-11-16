# MEASUREMENTS

## Tests

- Vitest: 10 passing (validation, parsing, ordering, deduplication, time formatting).
- Playwright: 7 defined; 3 pass without Supabase, 4 skipped until env exists.
- axe: 0 violations on the opening/setup wall after contrast correction.
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

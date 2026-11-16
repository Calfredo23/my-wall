# MEASUREMENTS

## Tests

- Vitest: 21 passing (validation, parsing, ordering, deduplication, fixed-timezone
  formatting, image type/size rules, upload/posts error mapping).
- Playwright: 10 defined; the 9-test suite passed before the photo-error change, and the 2
  new photo validation tests pass. Full rerun was deferred because the live Supabase tests
  add temporary rows.
- Photo smoke: local PNG upload → preview → Storage upload → feed image → reload persistence.
- Live photo UI: `accept="image/*"`, valid PNG preview, missing-message hint, HEIC rejection
  reason, 0 console errors.
- Live smoke: `https://my-wall-calfredo.vercel.app` — photo loaded
  (`naturalWidth > 0`), correct canonical URL, Live status.
- CI: run `43819009021` on `bad55b6` — both jobs passed.
- Cleanup: the full local E2E run adds three `Wall test…` / `Realtime test…` rows; the fixed
  `supabase/demo-posts.sql` removes them and restores the demo feed.
- axe: 0 violations on the opening wall after contrast correction.
- Responsive: no horizontal page scroll at 360, 768, and 1440.

## Build

- Next.js 16.4.6 Turbopack production build: passes.
- Route `/` is dynamic because it reads the live Supabase feed on each request.
- TypeScript strict and ESLint: clean.

## Database

- Table: `public.posts` (`id`, `author`, `content`, `image_url`, `created_at`).
- RLS: public select and insert only; 280-character database check.
- Realtime publication: `posts`.
- Storage: public `post-images` bucket, 5 MB limit, JPEG/PNG/WebP only.
- Feed query: newest first, limit 50.

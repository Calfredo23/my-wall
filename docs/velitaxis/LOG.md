# LOG

## 2026-11-16 — Test 2 Wall scaffolded

- Mode: BALANCED. Photo upload skipped by owner decision.
- Created `wall/` with Next.js 16.4.6, React 19.3, TypeScript strict, Tailwind 4, and
  `@supabase/supabase-js` 2.119.0.
- Built a 2008-style blue wall: header, profile card, composer, newest-first feed,
  empty/loading/error states, character counter, and a Supabase setup notice.
- Added `supabase/schema.sql` for `posts`, RLS public read/insert, and Realtime.
- Added pure helpers for validation, parsing, sorting, deduplication, and timestamp
  formatting, with 10 unit tests.
- Playwright covers shell, axe, responsive widths, and a gated Supabase flow (post,
  reload persistence, newest-first, Realtime, over-limit rejection).
- Verified locally without env: typecheck, lint, 10 unit, build, 3 e2e pass. Four Supabase
  tests skipped. A 404 favicon console error was found in the manual visual pass; an
  `app/icon.svg` was added.
- Next: owner Supabase project setup and env names; then real flow, repo, deploy,
  screenshots, and submission.

## 2026-11-16 — Supabase, repo, deployment, and submission prep

- Owner created the Supabase project and `public.posts`, added `.env.local`, and seeded the
  demo feed. Values stayed out of chat and git.
- Ran the full local suite against Supabase: typecheck, lint, 10 unit, build, and 8
  Playwright tests pass. Covered post → reload persistence, newest-first, Realtime,
  over-limit rejection, axe, and responsive widths.
- Created the public repo `https://github.com/Calfredo23/my-wall`; CI run `43801992652`
  passed. Captured desktop/mobile screenshots and wrote reviewer notes.
- Deployed on Vercel at `https://my-wall-coral.vercel.app`. `https://my-wall.vercel.app`
  is an unrelated React app and must not be submitted.
- Found a live-only React hydration error: server timestamps were formatted in the Vercel
  timezone while the browser used the visitor’s timezone. Pinned `formatPostTime` to
  `Asia/Manila` and added an exact-format regression test.
- Next: push the fix, verify the redeploy and live flow, then submit Test 2.

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

## 2026-11-16 — Live verification and cleanup

- Pushed `de8f27a` (`fix: stabilize timestamps across server and browser`). Vercel deployed
  successfully; CI run `43806451793` passed both jobs.
- Verified `https://my-wall-coral.vercel.app`: canonical and OG URLs point at the correct
  host, a new post appears first, a second tab receives it through Realtime, reload keeps
  it, and the page logs zero console errors.
- Re-ran the full local suite after the timestamp change: 11 unit and 8 Playwright pass.
  The E2E run added three temporary rows to the live feed.
- Next: run `supabase/demo-posts.sql` to remove those rows, then submit Test 2.

## 2026-11-16 — Demo seed made idempotent

- Rerunning `supabase/demo-posts.sql` duplicated three demo rows because only one content
  string was deleted first. Updated the script to delete all four demo contents plus the
  E2E patterns before inserting, so it is safe to rerun.
- Live feed currently has duplicates; one final SQL run will restore the five-post feed
  (four demo posts plus the live smoke post).

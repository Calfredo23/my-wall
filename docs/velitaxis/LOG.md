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

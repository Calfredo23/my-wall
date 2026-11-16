# PROJECT MEMORY — The Wall

Framework Version: 1.22.1
Current Execution Mode: BALANCED
Project Status: FEATURE_DEVELOPMENT
Lifecycle Stage: 8 — QA, SECURITY, ACCESSIBILITY, AND PERFORMANCE
Owner: Cedrick Alfredo Catimbang (Calfredo)

## What this is

Test 2 for the SUpost / CapM application: a 2008-style social wall using React,
Next.js, and Supabase. A visitor writes a message, presses Share, and the message is
saved in Supabase. The feed is newest-first and survives a refresh. Realtime updates the
feed without reloading. A fixed author name is used; there is no login.

## Scope

- Required: compose, Share, Supabase insert, newest-first feed, persistence after refresh.
- Included extras: 280-character limit, Realtime updates, photo upload, responsive/accessible UI.
- Explicitly skipped: authentication.

## Stack

Next.js 16.4.6 (App Router), React 19.3, TypeScript strict, Tailwind 4,
@supabase/supabase-js 2.119.0, Vitest, Playwright, axe-core.

## Current state

The app now covers all three bonus items: 280-character limit, Realtime, and photo upload.
Typecheck, lint, build, 15 unit tests, and 9 Playwright tests pass. A local photo smoke
uploaded a PNG to the `post-images` bucket, inserted the post, rendered the image, and kept
it after reload. The migration added `posts.image_url`, a public 5 MB bucket, and
read/upload policies.

The public repo is `https://github.com/Calfredo23/my-wall`; the public deployment is
`https://my-wall-calfredo.vercel.app`. The new code is not deployed yet because the E2E run
added three text rows to the live feed. Next: run `supabase/demo-posts.sql`, recapture
screenshots, deploy, verify the live photo post, then submit Test 2.

Known deployment note: timestamps use `Asia/Manila` so server and browser render identical
text and do not trigger a hydration mismatch.

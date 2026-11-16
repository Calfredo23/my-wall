# PROJECT MEMORY — The Wall

Framework Version: 1.22.1
Current Execution Mode: BALANCED
Project Status: SUBMISSION_READY
Lifecycle Stage: 10 — DELIVERY AND SUBMISSION
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

All three bonus items are live: 280-character limit, Realtime, and photo upload. Typecheck,
lint, build, 15 unit tests, and 9 Playwright tests pass. A real PNG uploaded to the
`post-images` bucket, rendered in the feed, and survived reload. The public deployment
`https://my-wall-calfredo.vercel.app` shows six clean posts, including the photo, with the
correct canonical URL, Live status, and zero console errors. CI run `43816580178` passed.
Screenshots were recaptured against the clean feed. The only remaining step is submitting
Test 2.

Known deployment note: timestamps use `Asia/Manila` so server and browser render identical
text and do not trigger a hydration mismatch.

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
- Included extras: 280-character limit, Realtime updates, responsive/accessible UI.
- Explicitly skipped: photo upload and authentication.

## Stack

Next.js 16.4.6 (App Router), React 19.3, TypeScript strict, Tailwind 4,
@supabase/supabase-js 2.119.0, Vitest, Playwright, axe-core.

## Current state

The local app is fully implemented and verified against Supabase: typecheck, lint, build,
10 unit tests, and 8 Playwright tests pass, including post → reload persistence,
newest-first ordering, Realtime, axe, and responsive checks. The public repo is
`https://github.com/Calfredo23/my-wall`; CI passed at `af35ebb`. The public deployment is
`https://my-wall-coral.vercel.app`; `https://my-wall.vercel.app` is an unrelated app.
Supabase `public.posts` has RLS public select/insert, a 280-character check, and Realtime.
Demo posts were seeded and final screenshots captured. Remaining work: push the fixed
timezone/hydration and live-link updates, recheck the live deployment, then submit Test 2.

Known deployment note: timestamps are formatted with `Asia/Manila` so the server and
browser render identical text and do not trigger a hydration mismatch.

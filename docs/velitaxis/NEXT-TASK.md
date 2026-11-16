# NEXT TASK

## Task ID

TASK-0001

## Title

The Wall — Test 2 submission build

## Objective

Build, connect to Supabase, test, deploy, and package a 2008-style wall that satisfies
Test 2 on a public Vercel URL.

## Status

Local UI and data layer are implemented. Supabase project/table/env setup is the next
owner action. No repo or deployment yet.

## Next action

1. Owner creates the Supabase project, runs `supabase/schema.sql`, and adds
   `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.
2. Run the Supabase Playwright flow, then create the public GitHub repo and Vercel project.
3. Capture screenshots, add reviewer notes, deploy, smoke the live URL, submit.

## Acceptance criteria

1. A visitor can write a message and press Share.
2. The message is saved in Supabase.
3. The feed is newest-first and posts survive a page refresh.
4. 280-character limit is enforced in the UI and database.
5. Realtime adds new posts without a refresh.
6. Public repo and Vercel production URL.
7. Typecheck, lint, unit, build, and Playwright pass.
8. Screenshots include a posted message on desktop and mobile.

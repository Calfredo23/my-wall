# NEXT TASK

## Task ID

TASK-0001

## Title

The Wall — Test 2 submission build

## Objective

Build, connect to Supabase, test, deploy, and package a 2008-style wall that satisfies
Test 2 on a public Vercel URL.

## Status

Implementation, Supabase integration, repo, CI, deployment, demo feed, screenshots, and
live verification are done. The canonical live URL is
`https://my-wall-coral.vercel.app`. The hydration mismatch was fixed by pinning
`formatPostTime` to `Asia/Manila`.

## Next action

1. Owner reruns the fixed `supabase/demo-posts.sql` to remove the duplicated demo rows and
   restore the five-post feed.
2. Confirm the live feed is clean.
3. Submit Test 2 with the live URL, repo, screenshots, and reviewer notes.

## Acceptance criteria

1. A visitor can write a message and press Share.
2. The message is saved in Supabase.
3. The feed is newest-first and posts survive a page refresh.
4. 280-character limit is enforced in the UI and database.
5. Realtime adds new posts without a refresh.
6. Public repo and Vercel production URL.
7. Typecheck, lint, unit, build, and Playwright pass.
8. Screenshots include a posted message on desktop and mobile.

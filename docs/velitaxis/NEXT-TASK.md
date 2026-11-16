# NEXT TASK

## Task ID

TASK-0001

## Title

The Wall — Test 2 submission build

## Objective

Build, connect to Supabase, test, deploy, and package a 2008-style wall that satisfies
Test 2 on a public Vercel URL.

## Status

Photo upload is implemented and verified locally. The migration and Storage bucket are live;
the app code is not deployed yet. The E2E suite added three temporary text rows to the
public feed.

## Next action

1. Run `supabase/demo-posts.sql` to remove the E2E rows; keep the photo post.
2. Recapture the desktop/mobile screenshots against the clean six-post feed.
3. Deploy, verify the live photo post and Realtime, then submit Test 2.

## Acceptance criteria

1. A visitor can write a message and press Share.
2. The message is saved in Supabase.
3. The feed is newest-first and posts survive a page refresh.
4. 280-character limit is enforced in the UI and database.
5. Realtime adds new posts without a refresh.
6. Public repo and Vercel production URL.
7. Typecheck, lint, unit, build, and Playwright pass.
8. Screenshots include a posted message on desktop and mobile.
9. Optional photo upload saves an image, renders it in the feed, and survives refresh.

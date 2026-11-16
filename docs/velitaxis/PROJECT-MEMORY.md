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
- Included extras: 280-character limit, Realtime updates, responsive/accessible UI.
- Explicitly skipped: photo upload and authentication.

## Stack

Next.js 16.4.6 (App Router), React 19.3, TypeScript strict, Tailwind 4,
@supabase/supabase-js 2.119.0, Vitest, Playwright, axe-core.

## Current state

Local app is implemented and verified without Supabase credentials: typecheck, lint,
10 unit tests, build, and 3 non-database Playwright tests pass. Supabase E2E tests are
written and skipped until env vars exist. The UI is a retro blue wall with profile card,
composer, feed, empty/error states, and a setup notice. No repo, deploy, or database
project has been created yet.

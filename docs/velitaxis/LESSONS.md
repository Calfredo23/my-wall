# LESSONS

## LESSON-0001 — Keep reviewer notes out of the public repo

- Scope: ACTIVE
- Trigger: creating or editing any reviewer-facing note under `submission/`.
- Root cause: I treated submission notes as project documentation and committed them to a public repo.
- Guard: reviewer notes stay in chat or a local ignored file. `/submission/*.md` is gitignored, and `submission/NOTES-FOR-REVIEWER.md` must not be recreated in the repo.

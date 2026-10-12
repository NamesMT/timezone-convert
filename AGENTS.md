# AGENTS.md

Publishable TypeScript library **and CLI** that (smart-)parses and converts between Windows display
names, Windows timezone ids and IANA (Olsen) tzdb ids. Node >= 22.14.0, ESM only, `#src/*` import
aliases, tsdown build, Vitest tests, `citty` CLI.

## Docs

Where knowledge lives, and when to reach for each:

| tier | what it holds | when you use it |
| --- | --- | --- |
| `AGENTS.md` — this file | orientation and the rules that prevent defects | read every session; write when a rule is learned the hard way |
| `.agentDocs/` | depth: module rationale, traps with their causes, compatibility | read on demand, before touching that area; write when a rule needs its reasoning kept |
| `docs/` | how-to and reference for a person using this package | read when the task is user-facing; write in the same commit as the change |
| `README.md` | the first read, for a person | write alongside `docs/` |

- **One home per fact.** State the rule here, keep the reasoning in `.agentDocs/` and link it — never both.
- **A dead pointer is a bug.** If the target is gone, delete the pointer rather than leave it.
- Move depth behind a pointer once a section outgrows a screen or two; keep the rule inline.

## Commands

```sh
pnpm run dev              # tsx watch on src/index.ts
pnpm run lint             # eslint (@antfu/eslint-config) — it also owns formatting
pnpm run test             # vitest watch; `pnpm exec vitest run` for a one-shot run
pnpm run test:types       # tsc --noEmit
pnpm run check            # lint + test:types + vitest run --coverage — the full gate
pnpm run build            # tsdown -> dist/index.mjs, dist/index.d.mts, dist/cli-entry.mjs
pnpm run release:check 1.5.0    # validate a version against package.json
pnpm run release:preview        # print the changelog the next release would get
pnpm run watch                  # tsx watch src/index.ts (bare; pass no arg)
pnpm run prerelease             # alias of `pnpm run check`
pnpm exec tsx src/cli-entry.ts "Europe/Athens"  # CLI from source; `pnpm start` is bare tsx and reads the arg as a module path
```

## Structure

- `src/index.ts` — entry; re-exports `allTimezones`, `dataMaps`, `parse` and `types`.
- `src/allTimezones.ts` — the data table (`readonly TimezonesElement[]`), the single source of truth.
- `src/dataMaps.ts` — folds it into `ianaMap`, `windowsIdMap` and `windowsDisplayMap`.
- `src/parse.ts` — `parseTzFromIana`, `parseTzFromWindowsId`, `parseTzFromWindowsDisplay` and
  `parseTzAuto` (the three, in that order).
- `src/types.ts` — `TimezonesElement`/`TimezonesElementMap`, the shape of every entry and map.
- `src/cli-entry.ts` — `citty` CLI behind the `timezone-convert` bin; excluded from coverage.
- `test/**` — `index.test.ts`, `allTimezones.test.ts`, `validIanaIds.ts`; `#src/*` imports carry a
  `.js` suffix on `.ts` files.
- `.github/workflows/` — `test-and-codecov.yml` (push/PR: types + coverage), `typedoc.yml` (push:
  Pages docs), `release.yml` (manual, below).

## Conventions

- Conventional commits (`feat:`, `fix:`, `chore:`, …) — the changelog is derived from them.
- ESLint (`@antfu/eslint-config`) owns lint and formatting; `lint-staged` runs `eslint --fix` on commit — run `pnpm run lint` before claiming clean.
- ESM only (`"type": "module"`) and the public API changes through `src/index.ts`; no CJS build.

## How to work here

- **Check the callers before you change anything.** Grep who uses it and which tests name it. If the
  impact is unclear, say so — do not guess.
- **Never overwrite or delete a large section you have not understood.** Read it, or say what you could
  not determine and ask.
- **Do not invent requirements.** Build what was asked; surface what else you notice and let it be
  decided.
- **Fix the class, not the instance.** A copied helper, a rule stated twice, a guard bypassed by a
  second path is one problem: one implementation, one guard. That is the work, not a follow-up to ask
  for. Stay inside the task rather than refactoring the world.
- **Verify before claiming, and say what you checked.** A passing test is not evidence it pins
  anything — **break the thing it guards and watch it fail.** If it still passes, either the test is
  decoration or a different guard is running; find out which. Where a stub cannot answer the question,
  drive the real thing.
- **Never write an identifier from memory.** A commit hash, path, line number or version must be quoted
  from the source; a plausible-looking invented one is worse than none.
- **A stated blocker is a hypothesis, not a fact.** Re-test "cannot install X" / "tool unavailable"
  before inheriting it, and never report a failure your own flag forced.
- **Report the risk with the change** — correctness, security, operational and integration; plus what
  you could not verify and every assumption you made. An unverified claim marked as such beats a
  confident one that is wrong.
- **Missing recall of this repo?** Read this file, `.agentDocs/` and `git log` before acting, then ask
  1–3 focused questions rather than guessing at intent.

## Conciseness

**Prune verbose, keep correctness** — code, comments, docs alike.

- Code: a comment only for non-obvious *intent*, never to restate the line, and never long. A block
  arguing for its own change is a commit message.
- Docs: one idea per sentence. Cut anything that would not change what a reader does.
- Delete history `git log` already holds — keep the *rule* that came out of it, not the story.
- **Never drop a caveat to save a line.** Concise means no filler, not fewer facts.

## User-facing docs

`README.md` is the only hand-written user-facing doc. Keep it a **concise first read**; put depth
in `<details>` spoilers and add visuals where they help. (The `docs/` that `typedoc.yml` generates is an API site, not prose.)
Docs ship with the change, in the same commit.

## Releasing

Version-first and manual: Actions → Release → Run workflow with the version (no `v`). The workflow
is the only publish path (a pushed tag publishes nothing) and runs the full `check` gate on Node 24
(CI uses 22.x) before changelogen writes `CHANGELOG.md`, bumps `package.json` and commits and tags
`v<version>`. `dry-run` only skips the push, release and publish — the changelog, bump, commit and
tag still happen on the runner. Trusted-publisher setup is in the README.

## Gotchas

- Partial IANA support is deliberate: only the `Etc/*` ids Windows uses plus common `backward` ids
  (`WET`, `W-SU` absent); the test skips `Etc/` ids instead of matching `validIanaIds`.
- `windowsIdMap`/`windowsDisplayMap` are last-write-wins over 555 rows: 139 Windows ids (and display names) cover many IANA ids, so a Windows lookup returns one representative (`Monrovia, Reykjavik` → `Iceland`, not `Africa/Abidjan`).
- `parseTzFromWindowsDisplay` strips a leading `(UTC…)`/`(UTC±hh:mm)` prefix before lookup; `parseTzFromWindowsId` does no such stripping and misses that form.
- `scripts/*.mjs` are copied verbatim from `starter-ts` and need no repo-specific edits.
- The version must match `/^\d+\.\d+\.\d+(?:-[0-9A-Z.-]+)?$/i` — a prerelease such as `1.5.0-rc.1` is accepted; `v1.5.0` and `1.5` are rejected and must be strictly greater
  than the current one.

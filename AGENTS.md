# AGENTS.md

Publishable TypeScript library **and CLI** that (smart-)parses and converts between Windows display
names, Windows timezone ids and IANA (Olsen) tzdb ids. Node >= 22.14.0, ESM only, `#src/*` import
aliases, tsdown build, Vitest tests, `citty` CLI.

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
- `@antfu/eslint-config` owns formatting (no Prettier, single quotes, 2-space); `lint-staged` runs
  `eslint --fix` on every commit, so run `pnpm run lint` before claiming clean.
- ESM only (`"type": "module"`) and the public API changes through `src/index.ts`; no CJS build.

## Releasing

Version-first and manual: Actions → Release → Run workflow with the version (no `v`). The workflow
is the only publish path (a pushed tag publishes nothing) and runs the full `check` gate on Node 24
(CI uses 22.x) before changelogen writes `CHANGELOG.md`, bumps `package.json` and commits and tags
`v<version>`. `dry-run` only skips the push, release and publish — the changelog, bump, commit and
tag still happen on the runner. Trusted-publisher setup is in the README.

## Gotchas

- Partial IANA support is deliberate: only the `Etc/*` ids Windows uses plus common `backward` ids
  (`WET`, `W-SU` absent); the test skips `Etc/` ids instead of matching `validIanaIds`.
- `scripts/*.mjs` are copied verbatim from `starter-ts` and need no repo-specific edits.
- The version needs a strict `\d+\.\d+\.\d+` (`v1.5.0`, `1.5` rejected) and must be strictly greater
  than the current one.

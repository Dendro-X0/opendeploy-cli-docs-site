# Roadmap

OpenDeploy’s roadmap captures what’s shipping next, near‑term goals for polish, and which providers we plan to add. It mirrors the repository’s `ROADMAP.md` and is kept in sync as we iterate.

> Status: 1.0.0‑beta complete. Netlify and Vercel have full wizard support with valid URLs/logs and deterministic JSON/NDJSON outputs. Phase 2 added first‑class Next.js on Netlify via the official runtime.

## Near‑Term (1.0 GA)

- Wizard & Summaries
  - Add optional fields to the `start` schema: `logsUrl`, `cwd`, `alias`, `siteId`, `siteName`.
  - Ensure the final `done` NDJSON event always emits (success and failure).
  - Idle‑timeout defaults in `--ci` with helpful “reason” in summaries.
- Netlify UX Polish (Next.js runtime)
  - Prefer `@netlify/next` runtime; run `netlify build && netlify deploy` (omit `--dir`).
  - Non‑interactive linking: require `--project <SITE_ID>` in machine/CI mode; clear error if missing.
  - Robust URL capture: stream → JSON → API fallback; stable `logsUrl` via `admin_url` (sites/<name>/deploys).
  - Tests for runtime detection, auto‑install prompt, and API fallback.
- pnpm build‑scripts guidance
  - Document how to approve build scripts (e.g., `@tailwindcss/oxide`, `esbuild`) to remove the “Ignored build scripts” warning on Vercel.
  - Add a wizard hint when such warnings are detected.
- Docs & Distribution
  - Deploy Docs site with `opd start/up`; link prominently in README.
  - Sweep examples to use `opd` alias consistently.
- Release Readiness
  - Version bump and concise changelog.
  - Smoke pass matrix on real apps: Next, Astro (static), Nuxt (static), and one Remix static.

## 1.1 (2–3 weeks)

- Providers
  - Cloudflare Pages (static export first).
  - GitHub Pages helper (simplified adapter + `generate gh-pages`).
- Detection & UX
  - React Router v7 detector and SPA redirect heuristics.
  - Monorepo chosen‑cwd advisories (doctor + wizard hints).
- Commands & CI
  - `explain` plan clarity; promote/rollback polish.
  - GitHub Actions templates refinements and `--gha` improvements.

## Provider Expansion (Outlook)

- Vercel — Complete (primary).
- Netlify — Complete (full wizard deploy; Next.js runtime).
- Cloudflare Pages — Planned (static export first).
- GitHub Pages — Planned helper flow.
- Render, Fly.io — Backlog (exploratory adapters).

## UX & CI Improvements

- Better error mapping and remedies in summaries (`errorLogTail`, `logsUrl`).
- Always‑on capture in CI (`--capture` or `--gha`), with compact JSON and timestamps.
- Monorepo ergonomics: workspace lock, link hints, path selection cues.

## Known Limitations

- Remix/React Router v7 SSR requires adapters; static is supported out‑of‑the‑box.
- Expo deploys are out‑of‑scope for 1.0 (env workflows supported).
- pnpm secure scripts can block native post‑install steps; approve builds or add `trustedDependencies`.

## Change Log & Updates

- Release notes ship with each tag on GitHub.
- See also: `docs/commands.md` and `docs/recipes.md` for usage patterns.

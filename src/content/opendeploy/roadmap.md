# Roadmap

OpenDeploy’s roadmap captures what’s shipping next, near‑term goals for polish, and which providers we plan to add. It mirrors the repository’s `ROADMAP.md` and is kept in sync as we iterate.

> Status: v1.1.1 (Remastered) released. Vercel, Netlify, Cloudflare Pages, and GitHub Pages are supported in the Start wizard with consistent `url`/`logsUrl` summaries. Next.js on Netlify uses the official runtime.

## Near‑Term

- Wizard & Summaries
  - Maintain parity across providers; ensure `done` NDJSON event always emits (success and failure).
  - CI defaults: idle‑timeout with helpful `reason` in summaries.
- Netlify UX Polish (Next.js runtime)
  - Prefer `@netlify/next` runtime; run `netlify build && netlify deploy` (omit `--dir`).
  - Non‑interactive linking: require `--project <SITE_ID>` in machine/CI mode; clear error if missing.
  - Robust URL capture: stream → JSON → API fallback; stable `logsUrl` via `admin_url` (sites/<name>/deploys).
  - Tests for runtime detection, auto‑install prompt, and API fallback.
- pnpm build‑scripts guidance
  - Document approving build scripts (e.g., `@tailwindcss/oxide`, `esbuild`) to remove the “Ignored build scripts” warning on Vercel.
  - Keep wizard hints when such warnings are detected.
- Docs & Distribution
  - Deploy Docs site with `opd start/up`; link prominently in README.
  - Sweep examples to use `opd` alias consistently.
- Release Readiness
  - Version bump and concise changelog.
  - Smoke pass matrix on real apps: Next, Astro (static), Nuxt (static), and one Remix static.

## 1.2 (2–3 weeks)

- Providers
  - Cloudflare Pages SSR and logs follow (exploratory).
  - GitHub Pages enhancements and site origin helpers.
- Detection & UX
  - React Router v7 detector and SPA redirect heuristics.
  - Monorepo chosen‑cwd advisories (doctor + wizard hints).
- Commands & CI
  - `explain` plan clarity; promote/rollback polish.
  - GitHub Actions templates refinements and `--gha` improvements.

## Provider Expansion (Outlook)

- Vercel — Complete (primary).
- Netlify — Complete (full wizard deploy; Next.js runtime).
- Cloudflare Pages — Complete (static export). SSR under exploration.
- GitHub Pages — Complete (Actions workflow‑only path).
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

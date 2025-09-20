# System Commands

## start
Guided wizard for selecting framework, provider, environment, optional env sync, and deploying.

Usage:
```bash
opendeploy start [--framework <next|astro|sveltekit>] \
  [--provider <vercel|netlify>] [--env <prod|preview>] \
  [--path <dir>] [--project <id>] [--org <id>] \
  [--sync-env] [--dry-run] [--json] [--ci] [--no-save-defaults]
```

Behavior:
- Auto-detects frameworks when possible; otherwise prompts for a choice.
- Shows provider login status and offers one‑click login if required.
- Env sync is optional; when enabled, the wizard chooses a sensible `.env` file per target.
- Prints a final JSON summary `{ ok, provider, target, url?, logsUrl?, final: true }` when `--json` is used.
- With `--dry-run`, the wizard prints `{ ok: true, mode: 'dry-run', final: true }` and exits before syncing/deploying.
- If you pass `--project`/`--org` (Vercel) or `--project` (Netlify) and the directory is not linked yet, the wizard offers to run `vercel link` / `netlify link` inline.
- After deployment, the wizard prints a copyable non‑interactive command showing an equivalent `opendeploy up ...` invocation.

Notes:
- The deploy step reuses the same logic as `up` for parity.
- Non‑interactive usage is supported with flags.
- Defaults: When confirmed, the wizard stores your selections under `startDefaults` in the root `opendeploy.config.json`. To clear, delete the file or remove the `startDefaults` property. Use `--no-save-defaults` to suppress the save prompt.

## detect
Detect a Next.js app and its configuration.

Usage:
```bash
opendeploy detect [--json]
```
Output fields:
- framework, rootDir, appDir, hasAppRouter
- packageManager (pnpm | yarn | npm | bun)
- monorepo (turborepo | nx | workspaces | none)
- buildCommand, outputDir, environmentFiles

Notes:
- With `--json`, only JSON is printed.

## doctor
Validate local environment and provider CLIs.

Usage:
```bash
opendeploy doctor [--ci] [--json] [--verbose] [--fix] [--path <dir>] [--project <vercelProjectId>] [--org <orgId>] [--site <netlifySiteId>]
```
Checks:
- Node version
- pnpm, bun, vercel, netlify CLIs
- Auth for Vercel/Netlify
- Monorepo sanity (workspace lockfile, `.vercel/project.json`, optional root `vercel.json`)
- Monorepo linked apps scan (`apps/*`) and chosen deploy cwd advisories for common paths (e.g., `apps/web`).

Notes:
- With `--json`, only JSON is printed. `--ci` exits non‑zero if any check fails.
- With `--fix`, the CLI attempts best‑effort linking fixes:
  - Vercel: `vercel link --yes --project <id> [--org <id>]` when `--project` is provided
  - Netlify: `netlify link --id <siteId>` when `--site` is provided

## completion
Generate shell completion scripts for bash, zsh, or PowerShell.

Usage:
```bash
opendeploy completion --shell <bash|zsh|pwsh>
```

Install (user-local examples):

- Bash (Linux/macOS):
```bash
# macOS (Homebrew bash-completion):
opendeploy completion --shell bash > $(brew --prefix)/etc/bash_completion.d/opendeploy
# Generic (user):
opendeploy completion --shell bash > ~/.opendeploy-completion.bash
echo 'source ~/.opendeploy-completion.bash' >> ~/.bashrc
```

- Zsh:
```bash
opendeploy completion --shell zsh > ~/.opendeploy-completion.zsh
echo 'fpath=(~/.zfunc $fpath)' >> ~/.zshrc
mkdir -p ~/.zfunc
mv ~/.opendeploy-completion.zsh ~/.zfunc/_opendeploy
echo 'autoload -U compinit && compinit' >> ~/.zshrc
```

- PowerShell (Windows/macOS/Linux):
```powershell
opendeploy completion --shell pwsh | Out-File -FilePath $PROFILE -Append -Encoding utf8
# Restart PowerShell
```

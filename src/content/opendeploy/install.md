# Install

This page describes supported installation methods for the OpenDeploy CLI. The recommended method is GitHub Releases, which gives you the short `opd` command.

## Releases (recommended)

Install the short command `opd` from the latest GitHub Release.

- macOS/Linux (bash):
```bash
curl -fsSL https://raw.githubusercontent.com/Dendro-X0/OpenDeploy-CLI/main/OpenDeploy%20CLI/scripts/install/install.sh | bash
opd --help
```

- Windows (PowerShell):
```powershell
iwr https://raw.githubusercontent.com/Dendro-X0/OpenDeploy-CLI/main/OpenDeploy%20CLI/scripts/install/install.ps1 -UseBasicParsing | iex
opd --help
```

Notes:
- The install script downloads the latest `opd.js`, verifies its checksum when possible, and creates a thin wrapper `opd`/`opd.cmd` on your PATH directory.
- Requires Node.js 18+ at runtime. If you prefer zero‑Node environments, use the Docker method below.

## Docker/OCI (no Node required)

Use the container image published to GHCR.

```bash
docker run --rm -it \
  -v "$PWD:/work" -w /work \
  ghcr.io/dendro-x0/opd:latest start --provider vercel --env preview
```

Tip: add a tiny shell/pwsh wrapper named `opd` that calls the container so you can run `opd …` locally.

## Package managers (alternative)

If you prefer a package-manager invocation, use one of the following. These work best when the package is available on a registry; otherwise, use the “Git (dlx)” option.

- npm (if published):
```bash
npx opendeploy-cli start
```
- pnpm:
```bash
pnpm dlx opendeploy-cli start
```
- yarn:
```bash
yarn dlx opendeploy-cli start
```
- bun:
```bash
bunx opendeploy-cli start
```

### Git (dlx) — no registry required

Use the GitHub repo as the source (pin to a tag for stability):

- pnpm:
```bash
pnpm dlx github:Dendro-X0/OpenDeploy-CLI#v1.0.0 start
```
- yarn:
```bash
yarn dlx github:Dendro-X0/OpenDeploy-CLI#v1.0.0 start
```
- bun:
```bash
bunx github:Dendro-X0/OpenDeploy-CLI#v1.0.0 start
```

## Verify

- Show help:
```bash
opd --help
```
- Run a dry-run plan:
```bash
opd start --provider vercel --env preview --dry-run --json
```
- Use NDJSON streaming in CI:
```bash
OPD_NDJSON=1 opd start --provider vercel --env preview --ci
```

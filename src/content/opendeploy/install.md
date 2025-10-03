# Install

This page describes supported installation methods for the OpenDeploy CLI. The recommended method is GitHub Releases, which gives you the short `opd` command.

## Install (recommended)

Download a prebuilt binary from GitHub Releases, make it executable, and place it in your PATH.

- Windows (PowerShell):
```powershell
$version = "v1.1.1"
$dest = "$env:USERPROFILE\\bin"
New-Item -ItemType Directory -Force -Path $dest | Out-Null
Invoke-WebRequest -Uri "https://github.com/Dendro-X0/OpenDeploy-CLI/releases/download/$version/opd-windows-x64.exe" -OutFile "$dest/opd.exe"
# Ensure $env:USERPROFILE\bin is on PATH, then:
opd -h
```

- macOS (Apple Silicon):
```bash
VERSION=v1.1.1
curl -L -o opd https://github.com/Dendro-X0/OpenDeploy-CLI/releases/download/$VERSION/opd-darwin-arm64
chmod +x opd && sudo mv opd /usr/local/bin/opd
opd -h
```

- macOS (Intel):
```bash
VERSION=v1.1.1
curl -L -o opd https://github.com/Dendro-X0/OpenDeploy-CLI/releases/download/$VERSION/opd-darwin-x64
chmod +x opd && sudo mv opd /usr/local/bin/opd
opd -h
```

- Linux (x64):
```bash
VERSION=v1.1.1
curl -L -o opd https://github.com/Dendro-X0/OpenDeploy-CLI/releases/download/$VERSION/opd-linux-x64
chmod +x opd && sudo mv opd /usr/local/bin/opd
opd -h
```

- Linux (arm64):
```bash
VERSION=v1.1.1
curl -L -o opd https://github.com/Dendro-X0/OpenDeploy-CLI/releases/download/$VERSION/opd-linux-arm64
chmod +x opd && sudo mv opd /usr/local/bin/opd
opd -h
```

Notes:
- The binary is self-contained; no Node.js is required.
- Prefer the Docker method below if you cannot install binaries system-wide.

## Docker/OCI (no Node required)

Use the container image published to GHCR (if available for your architecture).

```bash
docker run --rm -it \
  -v "$PWD:/work" -w /work \
  ghcr.io/dendro-x0/opd:latest start --provider vercel --env preview
```

Tip: add a tiny shell/pwsh wrapper named `opd` that calls the container so you can run `opd …` locally.

## Package managers (alternative)

Not available yet. We’ll update docs when the package is published to registries. Use GitHub Releases (above) or Docker instead.

### Git (dlx) — experimental

Running directly from Git is currently not supported for most users. It may work in limited scenarios, but we recommend the Releases binaries above (or Docker). We’ll revisit this path later.

## Verify

- Show help:
```bash
opd -h
```
- Run a dry-run plan:
```bash
opd -s --provider vercel --env preview --dry-run --json
```
- Use NDJSON streaming in CI:
```bash
OPD_NDJSON=1 opd start --provider vercel --env preview --ci
```

Shortcuts:
- `opd -v` — version
- `opd -h` — help
- `opd -s` — start wizard (equivalent to `opd start`)

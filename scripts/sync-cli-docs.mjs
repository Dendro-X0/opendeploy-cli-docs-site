import { cp, mkdir, access } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { constants as fsConstants } from 'node:fs'

const root = resolve(process.cwd())
const cliDocs = process.env.CLI_DOCS_DIR
  ? resolve(process.env.CLI_DOCS_DIR)
  : resolve(root, '..', 'OpenDeploy CLI', 'docs')
const outDir = join(root, 'src', 'content', 'opendeploy')

async function pathExists(p) {
  try { await access(p, fsConstants.F_OK); return true } catch { return false }
}

async function main() {
  await mkdir(outDir, { recursive: true })
  const files = ['overview.md', 'commands.md', 'recipes.md', 'troubleshooting.md', 'providers.md']
  // If the external CLI docs folder is not present (e.g., on Vercel), skip sync gracefully
  if (!(await pathExists(cliDocs))) {
    console.log(`Skipping external docs sync. Source not found: ${cliDocs}`)
    return
  }
  for (const f of files) {
    const src = join(cliDocs, f)
    const dst = join(outDir, f)
    await mkdir(dirname(dst), { recursive: true })
    if (!(await pathExists(src))) {
      console.log(`Warn: source file missing, skipping: ${src}`)
      continue
    }
    await cp(src, dst)
    console.log(`Synced ${src} -> ${dst}`)
  }
}

main().catch((err) => { console.error(err); process.exit(1) })

import { cp, mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'

const root = resolve(process.cwd())
const cliDocs = process.env.CLI_DOCS_DIR
  ? resolve(process.env.CLI_DOCS_DIR)
  : resolve(root, '..', 'OpenDeploy CLI', 'docs')
const outDir = join(root, 'src', 'content', 'opendeploy')

async function main() {
  await mkdir(outDir, { recursive: true })
  const files = ['overview.md', 'commands.md', 'recipes.md', 'troubleshooting.md', 'providers.md']
  for (const f of files) {
    const src = join(cliDocs, f)
    const dst = join(outDir, f)
    await mkdir(dirname(dst), { recursive: true })
    await cp(src, dst)
    console.log(`Synced ${src} -> ${dst}`)
  }
}

main().catch((err) => { console.error(err); process.exit(1) })

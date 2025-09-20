"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

type Cmd = { readonly key: string; readonly label: string; readonly code: string }

export function QuickStart(): React.ReactElement {
  const [copiedKey, setCopiedKey] = useState<string>("")

  const commands: ReadonlyArray<Cmd> = [
    { key: "start", label: "# Start wizard", code: "opendeploy start" },
    { key: "gen-vercel", label: "# Generate vercel.json", code: "opendeploy generate vercel" },
    { key: "gen-netlify", label: "# Generate netlify.toml", code: "opendeploy generate netlify" },
    { key: "gen-turbo", label: "# Generate turbo.json", code: "opendeploy generate turbo" },
    { key: "up-vercel", label: "# Preview deploy (Vercel)", code: "opendeploy up vercel --env preview --ndjson --timestamps" },
    { key: "up-netlify", label: "# Preview deploy (Netlify)", code: "opendeploy up netlify --env preview --project <SITE_ID> --ndjson --timestamps" },
  ]

  const all: string = commands.map((c) => `${c.label}\n${c.code}`).join("\n\n") + "\n"

  async function copy(text: string, key: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(""), 1500)
    } catch {
      setCopiedKey("")
    }
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl -z-10" />
      <div className="text-left rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 flex items-center justify-between gap-2" aria-live="polite">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Quick Start</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3"
            onClick={async () => copy(all, "all")}
            aria-label="Copy quick start commands"
          >
            {copiedKey === "all" ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" /> Copy
              </>
            )}
          </Button>
        </div>
        <div className="p-6 font-mono text-sm leading-7 space-y-3">
          {commands.map((c) => (
            <div key={c.key} className="flex items-start justify-between gap-3 group">
              <div
                role="button"
                tabIndex={0}
                onClick={async () => copy(c.code, c.key)}
                onKeyDown={async (e) => { if (e.key === "Enter" || e.key === " ") { await copy(c.code, c.key) } }}
                className="rounded-md px-2 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors max-w-full"
                aria-label={`Copy: ${c.code}`}
              >
                <div className="text-gray-600 dark:text-gray-400">{c.label}</div>
                <div className="text-blue-700 dark:text-blue-300 break-all">{c.code}</div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={async () => copy(c.code, c.key)}
                aria-label={`Copy ${c.key}`}
              >
                {copiedKey === c.key ? (<><Check className="mr-2 h-4 w-4" /> Copied</>) : (<><Copy className="mr-2 h-4 w-4" /> Copy</>)}
              </Button>
            </div>
          ))}
          <div className="text-xs text-muted-foreground pt-1 pl-2">Tip: Click a command to copy. Hover reveals an action button.</div>
        </div>
      </div>
    </div>
  )
}

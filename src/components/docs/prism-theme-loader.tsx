"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

// Lightweight loader that swaps Prism theme CSS based on the active theme.
// Now self-hosted from public/prism/
const DARK_CSS = "/prism/one-dark.css"
const LIGHT_CSS = "/prism/one-light.css"

export function PrismThemeLoader(): null {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const id = "__prism-theme__"
    let link = document.getElementById(id) as HTMLLinkElement | null
    if (!link) {
      link = document.createElement("link")
      link.id = id
      link.rel = "stylesheet"
      document.head.appendChild(link)
    }
    link.href = resolvedTheme === "dark" ? DARK_CSS : LIGHT_CSS
  }, [resolvedTheme])

  return null
}

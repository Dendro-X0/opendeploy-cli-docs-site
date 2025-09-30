"use client"

import { useEffect, type ReactElement } from "react"
import { useSearchParams } from "next/navigation"

/**
 * MobileSafeMode
 * Enables a conservative, overflow-proof rendering mode on mobile when:
 * - Query param mobile=safe is present, or
 * - NEXT_PUBLIC_MOBILE_SAFE_MODE is set to "1" at build time.
 *
 * It sets a data attribute on <html> that globals.css can target to clamp widths,
 * disable sticky/complex effects, and turn off gradient text if needed.
 */
export default function MobileSafeMode(): ReactElement | null {
  const params = useSearchParams()
  useEffect((): void => {
    const qp: string | null = params.get("mobile")
    const env: string | undefined = process.env.NEXT_PUBLIC_MOBILE_SAFE_MODE
    const enable: boolean = qp === "safe" || env === "1"
    const root: HTMLElement = document.documentElement
    if (enable) {
      root.setAttribute("data-mobile-safe", "1")
    } else {
      root.removeAttribute("data-mobile-safe")
    }
  }, [params])
  return null
}

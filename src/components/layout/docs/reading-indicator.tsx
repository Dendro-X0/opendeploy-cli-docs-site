"use client"

import { useEffect, useMemo, useRef, useState, type RefObject } from "react"
import { cn } from "@/lib/utils"

type Heading = { id: string; title: string; level: number }

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
}

interface ReadingIndicatorProps {
  contentRef: RefObject<HTMLElement | null>
  className?: string
}

export function ReadingIndicator({ contentRef, className }: ReadingIndicatorProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const [progress, setProgress] = useState<number>(0)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    // Collect h2-h4 headings, ensure they have ids
    const nodes = Array.from(el.querySelectorAll<HTMLElement>("h2, h3, h4"))
    const used = new Set<string>()
    const hs: Heading[] = nodes.map((node) => {
      let id = node.id
      if (!id) {
        const base = slugify(node.textContent || "") || "section"
        let unique = base
        let i = 1
        while (used.has(unique)) {
          unique = `${base}-${i++}`
        }
        node.id = unique
        id = unique
      }
      used.add(id)
      const level = Number(node.tagName.replace("H", ""))
      return { id, title: node.textContent || id, level }
    })
    setHeadings(hs)

    // Intersection observer for active heading
    observerRef.current?.disconnect()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId((entry.target as HTMLElement).id)
          }
        })
      },
      { root: null, rootMargin: "-40% 0px -55% 0px", threshold: [0, 1] },
    )
    nodes.forEach((n) => io.observe(n))
    observerRef.current = io

    // Cleanup
    return () => io.disconnect()
  }, [contentRef])

  useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const contentHeight = el.offsetHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(contentHeight - viewportHeight, 1))
      const pct = (scrolled / Math.max(contentHeight - viewportHeight, 1)) * 100
      setProgress(pct)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [contentRef])

  const items = useMemo(() => headings, [headings])

  if (items.length === 0) return null

  return (
    <aside className={cn("hidden lg:block w-64 flex-shrink-0", className)}>
      <div className="sticky top-24">
        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Outline */}
        <div className="border-l border-border pl-6">
          <h4 className="font-semibold text-sm mb-4 text-muted-foreground uppercase tracking-wide">On This Page</h4>
          <nav className="space-y-2">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 border-l-2 border-transparent pl-3 -ml-3",
                  item.level === 2 && "font-medium",
                  item.level === 3 && "pl-6 -ml-6",
                  item.level === 4 && "pl-9 -ml-9",
                  activeId === item.id && "text-foreground border-border",
                )}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  )
}

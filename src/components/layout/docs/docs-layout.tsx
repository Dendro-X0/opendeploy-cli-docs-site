"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { DocsHeader } from "@/components/layout/docs/docs-header"
import { DocsSidebar } from "@/components/layout/docs/docs-sidebar"
import { ReadingIndicator } from "@/components/layout/docs/reading-indicator"
import { DocsPageFlip } from "@/components/layout/docs/docs-page-flip"
import { cn } from "@/lib/utils"
import SkipLink from "@/components/a11y/skip-link"

interface DocsLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  showTableOfContents?: boolean
  tableOfContents?: Array<{ id: string; title: string; level: number }>
}

export function DocsLayout({
  children,
  showSidebar = true,
  showTableOfContents = false,
  tableOfContents = [],
}: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const contentRef = useRef<HTMLElement | null>(null)

  // Prevent background scroll when the mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
    return
  }, [sidebarOpen])

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <SkipLink />
      <DocsHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

      <div className="flex flex-1">
        {/* Fixed Sidebar */}
        {showSidebar && (
          <>
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
              <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" role="presentation" aria-hidden onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside
              className={cn(
                "fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 sm:w-72 transform border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95 transition-transform duration-200 ease-in-out lg:translate-x-0 lg:z-30",
                sidebarOpen ? "translate-x-0" : "-translate-x-full",
              )}
              id="docs-sidebar"
            >
              <DocsSidebar onItemClick={() => setSidebarOpen(false)} />
            </aside>

            {/* Sidebar spacer for desktop */}
            <div className="hidden lg:block w-64 sm:w-72 flex-shrink-0" />
          </>
        )}

        {/* Main content area */}
        <main className="flex-1 min-w-0 flex flex-col" id="main-content" role="main" aria-hidden={sidebarOpen ? true : undefined}>
          <div className="flex-1 mx-auto px-4 sm:px-6 py-8 pb-16 overflow-x-hidden">
            <div className="flex justify-center">
              {/* Centered content container */}
              <div className={cn(
                "w-full",
                showTableOfContents
                  ? "max-w-4xl xl:max-w-5xl flex gap-6 xl:gap-8"
                  : "max-w-3xl"
              )}>
                {/* Main content */}
                <div
                  ref={contentRef as any}
                  className={cn(
                    "flex-1 min-w-0 docs-container",
                    showTableOfContents ? "xl:max-w-3xl" : ""
                  )}
                >
                  {children}
                  <DocsPageFlip />
                </div>

                {/* Reading Indicator (right rail) */}
                {showTableOfContents && (
                  <div className="hidden xl:block">
                    <ReadingIndicator contentRef={contentRef} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

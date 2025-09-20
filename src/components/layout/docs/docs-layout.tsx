"use client"

import type React from "react"
import { useRef, useState } from "react"
import { DocsHeader } from "@/components/layout/docs/docs-header"
import { DocsSidebar } from "@/components/layout/docs/docs-sidebar"
import { ReadingIndicator } from "@/components/layout/docs/reading-indicator"
import { DocsPageFlip } from "@/components/layout/docs/docs-page-flip"
import { cn } from "@/lib/utils"

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DocsHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1">
        {/* Fixed Sidebar */}
        {showSidebar && (
          <>
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
              <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside
              className={cn(
                "fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-72 transform border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95 transition-transform duration-200 ease-in-out lg:translate-x-0 lg:z-30",
                sidebarOpen ? "translate-x-0" : "-translate-x-full",
              )}
            >
              <DocsSidebar onItemClick={() => setSidebarOpen(false)} />
            </aside>

            {/* Sidebar spacer for desktop */}
            <div className="hidden lg:block w-72 flex-shrink-0" />
          </>
        )}

        {/* Main content area */}
        <main className="flex-1 min-w-0 flex flex-col">
          <div className="flex-1 mx-auto px-6 py-8">
            <div className="flex justify-center">
              {/* Centered content container */}
              <div className={cn("w-full", showTableOfContents ? "max-w-5xl flex gap-8" : "max-w-4xl")}>
                {/* Main content */}
                <div
                  ref={contentRef as any}
                  className={cn("flex-1 min-w-0", showTableOfContents ? "lg:max-w-3xl" : "")}
                >
                  {children}
                  <DocsPageFlip />
                </div>

                {/* Reading Indicator (right rail) */}
                {showTableOfContents && <ReadingIndicator contentRef={contentRef} />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

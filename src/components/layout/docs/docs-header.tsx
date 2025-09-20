"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Github, ExternalLink, Menu, Package, Terminal, BookOpen } from "lucide-react"
import Link from "next/link"
import { ThemeToggleSwitch } from "@/components/theme/ThemeToggleSwitch"

interface DocsHeaderProps {
  onMenuClick?: () => void
}

export function DocsHeader({ onMenuClick }: DocsHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={onMenuClick}>
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Package className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">OpenDeploy CLI</span>
              <span className="text-xs text-muted-foreground">v1.0.0-beta</span>
            </div>
          </Link>

          <Badge variant="outline" className="hidden md:inline-flex text-xs">
            Beta
          </Badge>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative max-w-sm w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search documentation..." className="pl-9 h-9" />
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/docs/opendeploy/overview">
                <BookOpen className="h-4 w-4" />
                <span className="sr-only">Documentation</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://github.com/Dendro-X0/OpenDeploy-CLI" target="_blank">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/docs/opendeploy/ci" target="_blank">
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">CI Recipes</span>
              </Link>
            </Button>
            <ThemeToggleSwitch />
          </div>
        </div>
      </div>
    </header>
  )
}

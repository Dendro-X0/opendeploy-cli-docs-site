import type { ComponentType, HTMLAttributes } from "react"
import { CodeBlock } from "@/components/docs/code-block"

// Next.js will automatically use this mapping for MDX files
// when this file exists at the project root.

type MDXMap = Record<string, ComponentType<any>>

export function useMDXComponents(components: MDXMap): MDXMap {
  return {
    pre: (props: HTMLAttributes<HTMLPreElement>) => <CodeBlock {...props} />,
    ...components,
  }
}

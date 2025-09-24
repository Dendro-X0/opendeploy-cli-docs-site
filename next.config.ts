import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.(md|mdx)?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [["rehype-prism-plus", { ignoreMissing: true, showLineNumbers: true }]],
  },
});

const basePathEnv = process.env.NEXT_BASE_PATH?.trim() ?? ""
const isExport = process.env.NEXT_EXPORT === "1";
// Default base path for GitHub Pages project pages when exporting and not explicitly provided
const autoBasePath = isExport && !basePathEnv
  ? `/${String(process.env.npm_package_name ?? '').replace(/^@[^/]+\//, '')}`
  : ''
const basePath = (basePathEnv || autoBasePath).trim()

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // Vercel build: use standard Next output (SSR/SSG)
  // GitHub Pages: set NEXT_EXPORT=1 and (optionally) NEXT_BASE_PATH=/<repo>
  ...(isExport
    ? {
        output: "export",
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default withMDX(nextConfig);

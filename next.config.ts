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
const siteOriginEnv = (process.env.NEXT_PUBLIC_SITE_ORIGIN ?? '').trim().replace(/\/$/, '')
const isDev = process.env.NODE_ENV !== 'production'
// Default base path for GitHub Pages project pages when not explicitly provided
const autoBasePath = !basePathEnv
  ? `/${String(process.env.npm_package_name ?? '').replace(/^@[^/]+\//, '')}`
  : ''
const basePath = (basePathEnv || autoBasePath).trim()
// In development, serve the site at root to avoid 404 on '/'
const effectiveBasePath = isDev ? '' : basePath

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // Always export static output (Next 15): next build creates ./out
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Expose basePath to client so components can prefix static assets reliably on GitHub Pages
  env: {
    NEXT_PUBLIC_BASE_PATH: effectiveBasePath,
  },
  ...(effectiveBasePath
    ? {
        basePath: effectiveBasePath,
        // Use an absolute asset prefix when a public site origin is provided (e.g., https://<owner>.github.io)
        assetPrefix: siteOriginEnv ? `${siteOriginEnv}${effectiveBasePath}` : effectiveBasePath,
      }
    : {}),
};

export default withMDX(nextConfig);

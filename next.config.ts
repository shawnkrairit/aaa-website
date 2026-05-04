import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Static export for GitHub Pages.
 * Site is served at https://shawnkrairit.github.io/aaa-website/, so basePath
 * and assetPrefix are set in production. images.unoptimized is required —
 * the Image Optimization API only runs on a Node server.
 */
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/aaa-website" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default withNextIntl(nextConfig);

import type { NextConfig } from "next";

/**
 * Static export configuration.
 *
 * `output: "export"` renders the whole site to plain HTML/CSS/JS in `/out`,
 * which is exactly what GitHub Pages serves. Trade-off: no server features
 * (Route Handlers, ISR, `next/image` optimisation, middleware). This site does
 * not need any of them - and if it ever does, switching to Vercel is a one-line
 * change (delete `output` and `images.unoptimized`).
 */
const nextConfig: NextConfig = {
  output: "export",

  // GitHub Pages serves directories, so every route becomes `/route/index.html`.
  trailingSlash: true,

  // No image optimisation server exists on GitHub Pages.
  images: { unoptimized: true },

  reactStrictMode: true,

  // Fail the build on type or lint errors instead of shipping broken code.
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
};

export default nextConfig;

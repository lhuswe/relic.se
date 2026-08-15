import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * Emitted as a static /sitemap.xml during `next build`.
 * When a blog or project detail routes arrive, map them in here.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.url}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

/**
 * Single source of truth for everything that identifies the site.
 * Metadata, sitemap, robots, footer and OG tags all read from here.
 */
export const siteConfig = {
  name: "relic.se",
  title: "relic.se",
  shortDescription: "Personal projects, experiments and tools.",
  description:
    "A collection of personal projects, experiments and tools built to learn, automate and solve problems.",
  /** No trailing slash. Used for canonical URLs, sitemap and OG images. */
  url: "https://relic.se",
  locale: "en_US",
  author: {
    name: "Linus",
    email: "lhuswe@relic.se",
  },
  links: {
    github: "https://github.com/lhuswe",
  },
  /** Relative to /public. Regenerate with `npm run build` after replacing. */
  ogImage: "/og.png",
} as const;

export type SiteConfig = typeof siteConfig;

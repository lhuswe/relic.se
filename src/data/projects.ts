import type { Project } from "@/types/project";

/**
 * THE ONLY FILE YOU NEED TO EDIT TO ADD A PROJECT.
 *
 * Copy an object, change the fields, save. The grid, the sort order, the
 * category list, the project counter and the empty state all follow
 * automatically. Delete every object and the page shows the "coming soon"
 * state instead - it is a designed state, not a fallback.
 *
 * Fields:
 *   slug        required  unique, url-safe
 *   name        required
 *   description required  one or two sentences
 *   icon        required  a key from src/lib/icons.ts (autocompletes)
 *   status      required  live | beta | in-progress | planned | archived
 *   category    required  free text, e.g. "Tools", "Web app", "Automation"
 *   url         optional  omit and the card renders without a link
 *   repo        optional  source code link
 *   featured    optional  sorts first, spans two columns on large screens
 *   tags        optional  reserved for the future tag filter
 *   year        optional
 *   hidden      optional  keep the entry, hide it from the site
 */
export const projects: readonly Project[] = [
  {
    slug: "example-reading-log",
    name: "Reading Log",
    description:
      "One place for physical books and web novels. Tracks chapters, sources and reading pace without turning reading into homework.",
    icon: "book",
    status: "in-progress",
    category: "Web app",
    url: "https://example.com",
    featured: true,
    tags: ["nextjs", "supabase"],
    year: 2026,
  },
  {
    slug: "example-trail-planner",
    name: "Trail Planner",
    description:
      "Plans multi-day routes in the Swedish mountains: day stages, elevation, huts and a packing list that adapts to the forecast.",
    icon: "mountain",
    status: "beta",
    category: "Tools",
    url: "https://example.com",
    tags: ["maps", "gpx"],
    year: 2025,
  },
  {
    slug: "example-list-formatter",
    name: "List Formatter",
    description:
      "A visual editor for SharePoint JSON formatting. Write the layout, preview the card, copy the JSON.",
    icon: "code",
    status: "live",
    category: "Tools",
    url: "https://example.com",
    repo: "https://github.com/lhuswe",
    tags: ["sharepoint", "json"],
    year: 2025,
  },
  {
    slug: "example-status-board",
    name: "Status Board",
    description:
      "A small dashboard that pings my own services every few minutes and complains loudly when one of them stops answering.",
    icon: "gauge",
    status: "planned",
    category: "Automation",
    tags: ["monitoring"],
    year: 2026,
  },
];

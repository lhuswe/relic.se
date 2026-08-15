import type { ProjectIconName } from "@/lib/icons";

/**
 * Lifecycle of a project. Ordered from "most interesting to a visitor" to
 * "least", which is also the order used when sorting the grid.
 */
export const PROJECT_STATUSES = [
  "live",
  "beta",
  "in-progress",
  "planned",
  "archived",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export interface Project {
  /** Stable, URL-safe identifier. Used as React key and future detail route. */
  readonly slug: string;
  readonly name: string;
  /** One or two sentences. Plain text, no markdown. */
  readonly description: string;
  /** Key from the icon registry in `src/lib/icons.ts`. */
  readonly icon: ProjectIconName;
  readonly status: ProjectStatus;
  /** Where the card links to. Omit for projects that are not public yet. */
  readonly url?: string;
  /** Optional source link, shown as a secondary action. */
  readonly repo?: string;
  /** Free-form grouping. Powers the (future) category filter. */
  readonly category: string;
  /** Featured projects sort first and get a wider card on large screens. */
  readonly featured?: boolean;
  /** Reserved for the future tag filter and search index. */
  readonly tags?: readonly string[];
  /** Reserved: hide a project without deleting it from the file. */
  readonly hidden?: boolean;
  readonly year?: number;
}

interface ProjectStatusMeta {
  readonly label: string;
  readonly tone: "accent" | "positive" | "neutral" | "muted";
}

/** Presentation metadata for each status. Add a status -> add an entry here. */
export const PROJECT_STATUS_META: Record<ProjectStatus, ProjectStatusMeta> = {
  live: { label: "Live", tone: "positive" },
  beta: { label: "Beta", tone: "accent" },
  "in-progress": { label: "In progress", tone: "neutral" },
  planned: { label: "Planned", tone: "muted" },
  archived: { label: "Archived", tone: "muted" },
};

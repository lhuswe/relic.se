import { projects } from "@/data/projects";
import { PROJECT_STATUSES, type Project, type ProjectStatus } from "@/types/project";

/**
 * Data access layer for projects.
 *
 * Components never import `data/projects.ts` directly - they go through these
 * functions. That indirection is what makes the roadmap features cheap: a
 * search box, a category filter or a GitHub API merge only changes this file.
 */

const STATUS_WEIGHT: Record<ProjectStatus, number> = Object.fromEntries(
  PROJECT_STATUSES.map((status, index) => [status, index]),
) as Record<ProjectStatus, number>;

function compareProjects(a: Project, b: Project): number {
  // 1. Featured first.
  if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
  // 2. Then by lifecycle: live before planned.
  if (a.status !== b.status) return STATUS_WEIGHT[a.status] - STATUS_WEIGHT[b.status];
  // 3. Then newest, then alphabetical - so the order is always deterministic.
  if ((b.year ?? 0) !== (a.year ?? 0)) return (b.year ?? 0) - (a.year ?? 0);
  return a.name.localeCompare(b.name);
}

/** Every project that should be rendered, in display order. */
export function getProjects(): Project[] {
  return projects.filter((project) => !project.hidden).sort(compareProjects);
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((project) => project.featured);
}

/** Unique categories, alphabetical. Ready for a filter bar. */
export function getCategories(): string[] {
  return [...new Set(getProjects().map((project) => project.category))].sort((a, b) =>
    a.localeCompare(b),
  );
}

/** Unique tags, alphabetical. Ready for a tag filter. */
export function getTags(): string[] {
  return [...new Set(getProjects().flatMap((project) => project.tags ?? []))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export interface ProjectFilter {
  readonly category?: string;
  readonly tag?: string;
  readonly status?: ProjectStatus;
  /** Matches name, description, category and tags, case-insensitive. */
  readonly query?: string;
}

/** Pure filter used by the future search and category UI. */
export function filterProjects(
  list: readonly Project[],
  { category, tag, status, query }: ProjectFilter = {},
): Project[] {
  const needle = query?.trim().toLowerCase();

  return list.filter((project) => {
    if (category && project.category !== category) return false;
    if (tag && !(project.tags ?? []).includes(tag)) return false;
    if (status && project.status !== status) return false;
    if (!needle) return true;

    return [project.name, project.description, project.category, ...(project.tags ?? [])]
      .join(" ")
      .toLowerCase()
      .includes(needle);
  });
}

export interface ProjectStats {
  readonly total: number;
  readonly live: number;
  readonly building: number;
  readonly categories: number;
}

/** Small aggregate used in the hero. Extend when GitHub stats land. */
export function getProjectStats(): ProjectStats {
  const all = getProjects();

  return {
    total: all.length,
    live: all.filter((project) => project.status === "live").length,
    building: all.filter(
      (project) => project.status === "in-progress" || project.status === "beta",
    ).length,
    categories: getCategories().length,
  };
}

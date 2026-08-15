import { ProjectGrid } from "@/components/projects/project-grid";
import { ProjectsEmptyState } from "@/components/projects/projects-empty-state";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import type { Project } from "@/types/project";

interface ProjectsSectionProps {
  projects: readonly Project[];
  categories: readonly string[];
}

/**
 * Server component: the grid and its empty state are decided at build time,
 * so the browser only ships the card interactivity.
 *
 * Roadmap seam: a <ProjectFilters /> client component drops in between the
 * header and the grid, calls `filterProjects()` and passes the result down.
 * Nothing else in this file changes.
 */
export function ProjectsSection({ projects, categories }: ProjectsSectionProps) {
  const hasProjects = projects.length > 0;

  return (
    <section id="projects" className="scroll-mt-24 pb-24 sm:pb-32">
      <Container>
        <div aria-hidden="true" className="rule-fade mb-14 h-px w-full sm:mb-16" />

        <Reveal>
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                Projects
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                Side projects and small tools. Some finished, some very much not.
              </p>
            </div>

            {hasProjects ? (
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                {projects.length} project{projects.length === 1 ? "" : "s"}
                {categories.length > 0
                  ? ` · ${categories.length} categor${categories.length === 1 ? "y" : "ies"}`
                  : ""}
              </p>
            ) : null}
          </header>
        </Reveal>

        <div className="mt-10 sm:mt-12">
          {hasProjects ? (
            <ProjectGrid projects={projects} />
          ) : (
            <Reveal>
              <ProjectsEmptyState />
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}

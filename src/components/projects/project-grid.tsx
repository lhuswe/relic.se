import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/motion/reveal";
import type { Project } from "@/types/project";

export function ProjectGrid({ projects }: { projects: readonly Project[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <li
          key={project.slug}
          className={project.featured ? "sm:col-span-2 lg:col-span-2" : undefined}
        >
          {/* Stagger caps at 6 items so late cards never feel delayed. */}
          <Reveal delay={Math.min(index, 5) * 0.06} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

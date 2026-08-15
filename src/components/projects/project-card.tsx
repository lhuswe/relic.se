"use client";

import { ArrowUpRight, Github } from "lucide-react";
import type { PointerEvent } from "react";

import { StatusBadge } from "@/components/projects/status-badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProjectIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

/**
 * Writes the pointer position to CSS variables that drive the `.spotlight`
 * halo. Kept off React state on purpose - this runs on every pointer move.
 */
function handlePointerMove(event: PointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();

  card.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
  card.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
}

export function ProjectCard({ project }: { project: Project }) {
  const Icon = getProjectIcon(project.icon);
  const isLinked = Boolean(project.url);

  return (
    <Card
      onPointerMove={handlePointerMove}
      className={cn(
        "spotlight group flex h-full flex-col justify-between gap-6 p-6",
        "hover:border-border-strong hover:bg-surface-raised",
        "motion-safe:hover:-translate-y-0.5 motion-safe:transition-[transform,background-color,border-color] motion-safe:duration-300",
      )}
    >
      <CardHeader className="justify-between">
        <span
          aria-hidden="true"
          className={cn(
            "flex size-10 items-center justify-center rounded-lg border border-border bg-surface-raised text-muted",
            "transition-colors duration-300 group-hover:border-accent/30 group-hover:text-accent",
          )}
        >
          <Icon className="size-5" strokeWidth={1.75} />
        </span>

        <div className="flex items-center gap-3">
          <StatusBadge status={project.status} />
          {isLinked ? (
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            />
          ) : null}
        </div>
      </CardHeader>

      <div className="space-y-2">
        {/* Stretched link: the whole card is clickable, the accessible name
            stays on the title, and only one tab stop is added. */}
        <CardTitle>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="after:absolute after:inset-0 after:z-0 after:content-['']"
            >
              {project.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            project.name
          )}
        </CardTitle>
        <CardDescription className={project.featured ? "max-w-prose" : undefined}>
          {project.description}
        </CardDescription>
      </div>

      <CardFooter className="justify-between border-t border-border pt-4">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted">
          {project.category}
          {project.year ? ` · ${project.year}` : ""}
        </span>

        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="relative z-10 flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted transition-colors hover:text-foreground"
          >
            <Github aria-hidden="true" className="size-3.5" />
            Source
            <span className="sr-only"> code for {project.name} (opens in a new tab)</span>
          </a>
        ) : null}
      </CardFooter>
    </Card>
  );
}

import { ArrowUpRight, Sparkles } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * Shown when `data/projects.ts` is empty. Designed as a real state: it says
 * what is happening and offers somewhere to go, and never reads as an error.
 */
export function ProjectsEmptyState() {
  return (
    <Card className="flex flex-col items-center gap-5 border-dashed px-6 py-16 text-center sm:py-20">
      <span
        aria-hidden="true"
        className="flex size-11 items-center justify-center rounded-lg border border-border bg-surface-raised text-accent"
      >
        <Sparkles className="size-5" strokeWidth={1.75} />
      </span>

      <div className="space-y-2">
        <h3 className="text-lg font-medium tracking-tight text-foreground">
          New projects are on the way.
        </h3>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-muted">
          I&apos;m currently building new tools and experiments. Check back soon.
        </p>
      </div>

      <Button asChild variant="secondary" size="sm">
        <a href={siteConfig.links.github} target="_blank" rel="noreferrer noopener">
          Follow along on GitHub
          <ArrowUpRight aria-hidden="true" />
        </a>
      </Button>
    </Card>
  );
}

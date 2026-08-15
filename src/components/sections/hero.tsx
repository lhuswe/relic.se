"use client";

import { ArrowDown, Github } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { EASE_OUT } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import type { ProjectStats } from "@/lib/projects";

/**
 * The eyebrow states the truth about the content instead of decorating it:
 * how many projects exist, and how many are actually running. When the list is
 * empty it says so, which makes the empty state below feel intentional.
 */
function eyebrowLabel({ total, live }: ProjectStats): string {
  if (total === 0) return "New projects incoming";

  const projectLabel = `${total} project${total === 1 ? "" : "s"}`;
  return live > 0 ? `${projectLabel} · ${live} live` : projectLabel;
}

export function Hero({ stats }: { stats: ProjectStats }) {
  const shouldReduceMotion = useReducedMotion();

  // One orchestrated entrance instead of many small ones.
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };

  const item: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: EASE_OUT },
        },
      };

  return (
    <section className="relative isolate overflow-hidden">
      {/* Backdrop: engineering grid + a single cool glow, both masked out. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-grid absolute inset-0" />
        <div className="hero-glow absolute inset-x-0 top-0 h-[36rem]" />
      </div>

      <Container className="flex flex-col items-start pb-20 pt-24 sm:pb-28 sm:pt-32 lg:pb-36 lg:pt-40">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="w-full max-w-3xl"
        >
          <motion.p
            variants={item}
            className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-muted"
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]"
            />
            {eyebrowLabel(stats)}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-7xl"
          >
            Building things.{" "}
            <span className="bg-linear-to-br from-foreground via-foreground to-muted bg-clip-text text-transparent">
              Learning constantly.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="#projects">
                Explore projects
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>

            <Button asChild size="lg" variant="secondary">
              <a href={siteConfig.links.github} target="_blank" rel="noreferrer noopener">
                <Github aria-hidden="true" />
                GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

import { Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

/**
 * Sticky, quiet, and only two controls wide. The header is a wayfinder, not a
 * navigation system - when a blog or an about page lands, add it to `nav`.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="font-mono text-sm tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          relic<span className="text-accent">.</span>
          <span className="text-muted">se</span>
        </a>

        <nav aria-label="Primary" className="flex items-center gap-1">
          <Button asChild variant="ghost" size="sm">
            <a href="#projects">Projects</a>
          </Button>

          <Button asChild variant="ghost" size="icon" aria-label="GitHub profile">
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer noopener">
              <Github aria-hidden="true" />
            </a>
          </Button>
        </nav>
      </Container>
    </header>
  );
}

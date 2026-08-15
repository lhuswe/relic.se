import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">404</p>
      <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="max-w-sm text-sm leading-relaxed text-muted">
        The link may be outdated, or the project moved. Everything that is live is on
        the start page.
      </p>
      <Button asChild variant="secondary">
        <Link href="/">Back to start</Link>
      </Button>
    </Container>
  );
}

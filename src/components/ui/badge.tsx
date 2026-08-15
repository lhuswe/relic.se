import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5",
    "font-mono text-[0.6875rem] uppercase tracking-[0.08em] leading-5",
  ],
  {
    variants: {
      tone: {
        accent: "border-accent/25 bg-accent/10 text-accent",
        positive: "border-positive/25 bg-positive/10 text-positive",
        neutral: "border-border-strong bg-surface-raised text-foreground/80",
        muted: "border-border bg-surface text-muted",
      },
    },
    defaultVariants: {
      tone: "muted",
    },
  },
);

export type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export { badgeVariants };

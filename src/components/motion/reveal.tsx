import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Shared easing. Slow-out curve that reads as "settled", not bouncy. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Use the item index * 0.06 for a stagger. */
  delay?: number;
}

/**
 * Fades content up once, on load, via a pure-CSS animation (`.reveal` in
 * globals.css). The element's resting state is fully visible - the fade lives
 * only in the keyframe - so if the animation is blocked, unsupported or
 * reduced-motion strips it, the content still shows. It can never get stuck
 * invisible.
 *
 * This replaced a Motion `whileInView` version that started content at
 * opacity:0 and revealed it only when an IntersectionObserver fired. On tall
 * displays where the whole page fits without scrolling, that observer could
 * never fire, leaving the projects section blank on some machines.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <div
      className={cn("reveal", className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

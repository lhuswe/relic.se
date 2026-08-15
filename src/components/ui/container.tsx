import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * The single horizontal rhythm of the site. `max-w-6xl` keeps line length
 * readable on ultrawide displays while the padding scale handles small screens.
 */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10", className)}
      {...props}
    />
  );
}

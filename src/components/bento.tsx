import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Bento primitives — the homepage's grid language.
 *
 * A bento page is one canvas of rounded tiles at mixed sizes rather than
 * alternating full-width bands: the grid owns the gap, every tile is a
 * `ds-card` (radius, border, fill and hover all stay inside the design
 * system), and columns are always the caller's decision. `BentoGrid` owns
 * only the gap and the grid display so each section can pick 12-column,
 * 6-column or 2-column without fighting a helper — `as="ul"` keeps list
 * semantics where the tiles are a set of links.
 */
export function BentoGrid({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn("grid gap-4 md:gap-5", className)}>{children}</Tag>;
}

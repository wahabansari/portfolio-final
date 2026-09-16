"use client";

import { Tooltip as TooltipPrimitive } from "radix-ui";
import type { ReactNode } from "react";

/**
 * Tooltip — Radix behaviour, styled by this system.
 *
 * Part of the open design system: delay, positioning, focus reading and
 * aria-describedby linkage all come from Radix; the only styling is the
 * background colour and the slightly widened delay so fast mouse-hovering
 * never surfaces a tooltip accidentally.
 *
 * Usage: wrap any single interactive element. The provider is included
 * internally so callers do not need to think about tree-level providers —
 * multiple instances of `<Tooltip>` are fine.
 */

export function Tooltip({
  label,
  children,
  side = "bottom",
  delayDuration = 400,
}: {
  label: string;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delayDuration?: number;
}) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={6}
            className="z-[90] rounded-full border border-border bg-surface px-3 py-1.5 text-[0.75rem] font-medium text-ink shadow-[0_2px_10px_rgb(2_6_23_/_0.12)] ds-panel"
          >
            {label}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
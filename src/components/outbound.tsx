"use client";

import type { ReactNode } from "react";
import { track, type TrackEvent } from "@/lib/analytics";

/**
 * An external link that reports a business event.
 *
 * This exists as its own tiny client component so the pages that use it stay
 * server-rendered. Marking a whole work grid `"use client"` just to attach one
 * onClick would ship the entire card tree, its content imports and its layout
 * logic to the browser for no rendering benefit.
 */
export function OutboundLink({
  href,
  event,
  payload,
  children,
  className,
  ariaLabel,
}: {
  href: string;
  event: TrackEvent;
  payload?: Record<string, string>;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={() => track(event, payload)}
      className={className}
    >
      {children}
    </a>
  );
}

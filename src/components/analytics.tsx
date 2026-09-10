"use client";

import { useEffect } from "react";
import { track, type TrackEvent } from "@/lib/analytics";

/**
 * One delegated click listener for the whole site.
 *
 * The alternative — an onClick on every CTA — would turn each of those pages
 * into a client component just to attach a handler, which is exactly the
 * client-JS creep the performance budget is meant to prevent. Instead, server
 * components mark a link with `data-track="cta_click"` and this
 * listener, mounted once in the root layout, reads it on the way up.
 *
 * `closest` means the attribute can sit on the anchor while the click lands on
 * an icon or a span inside it.
 */
export function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-track]");
      if (!el) return;

      const event = el.dataset.track as TrackEvent | undefined;
      if (!event) return;

      track(event, el.dataset.trackLabel ? { label: el.dataset.trackLabel } : {});
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

/**
 * Fires a single event when a page mounts — used for the two view events that
 * have no click to hang off. Rendered from a server page, so the page itself
 * stays server-rendered and only this null component is client-side.
 */
export function PageEvent({
  event,
  label,
}: {
  event: TrackEvent;
  label?: string;
}) {
  useEffect(() => {
    track(event, label ? { label } : {});
  }, [event, label]);

  return null;
}

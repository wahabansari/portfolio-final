"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track, trackPageView, type TrackEvent } from "@/lib/analytics";

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
 *
 * Links that carry no `data-track` are still classified, so contact paths and
 * external links are measured without anyone having to remember to tag them:
 * `mailto:` is an email click, `tel:` a phone click, LinkedIn and GitHub their
 * own events, a document (pdf, doc, zip) a file download, and any other
 * external host an outbound click. Only the destination is recorded, never
 * anything typed by the visitor.
 */
function classifyLink(a: HTMLAnchorElement): { event: TrackEvent; payload: Record<string, string> } | null {
  const raw = a.getAttribute("href");
  if (!raw || raw.startsWith("#") || raw.startsWith("javascript:")) return null;

  if (raw.startsWith("mailto:")) return { event: "email_click", payload: { label: "link" } };
  if (raw.startsWith("tel:")) return { event: "phone_click", payload: { label: "link" } };

  let url: URL;
  try {
    url = new URL(a.href, window.location.href);
  } catch {
    return null;
  }

  const file = url.pathname.match(/\.(pdf|docx?|xlsx?|pptx?|zip)$/i);
  if (file) {
    return {
      event: "file_download",
      payload: {
        file_name: decodeURIComponent(url.pathname.split("/").pop() ?? ""),
        file_extension: file[1].toLowerCase(),
        link_url: url.href,
      },
    };
  }

  if (url.hostname === window.location.hostname) return null;

  const host = url.hostname.replace(/^www\./, "");
  if (host.endsWith("linkedin.com")) return { event: "linkedin_click", payload: { link_url: url.href } };
  if (host.endsWith("github.com")) return { event: "github_click", payload: { link_url: url.href } };
  return { event: "outbound_click", payload: { link_url: url.href, link_domain: host } };
}

export function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;

      const el = target?.closest<HTMLElement>("[data-track]");
      if (el) {
        const event = el.dataset.track as TrackEvent | undefined;
        if (!event) return;
        track(event, el.dataset.trackLabel ? { label: el.dataset.trackLabel } : {});
        return;
      }

      /* Links that report their own event (OutboundLink) are not counted twice. */
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.hasAttribute("data-outbound")) return;

      const found = classifyLink(anchor);
      if (found) track(found.event, found.payload);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

/**
 * Sends a page view on the first load and again on every client-side route
 * change. The App Router swaps pages without a document load, so without this
 * only the landing page would ever be counted.
 *
 * The send is deferred a tick so the new page's <title> has been applied by
 * the time it is read.
 */
export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const timeout = setTimeout(() => trackPageView(pathname), 0);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}

/**
 * Reports how far down a page people read, at 25, 50, 75 and 90 percent, once
 * each per page view. A page that fits on one screen reports nothing, since
 * there is no scrolling to measure. The label is the path, so depth can be
 * compared page by page.
 */
const DEPTHS = [25, 50, 75, 90] as const;

export function ScrollDepthTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const reached = new Set<number>();
    let frame = 0;

    const check = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable < window.innerHeight * 0.2) return;

      const percent = Math.min(100, ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100);
      for (const depth of DEPTHS) {
        if (percent >= depth && !reached.has(depth)) {
          reached.add(depth);
          track("scroll_depth", { percent: depth, label: pathname });
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}

/**
 * Fires a single event when a page mounts — used for the view events that
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

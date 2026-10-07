"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ReactNode } from "react";

/**
 * Wraps every page in a short opacity fade-in (`.page-enter`, CSS only).
 *
 * The children are rendered on the server like any other markup. An earlier
 * version returned `null` until a post-mount timer fired, which meant the
 * server HTML contained no page content at all: crawlers, link previews and
 * no-JS readers received an empty body. The fade is a CSS animation, so it
 * plays on first paint without any state.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    /* Next.js's own post-navigation scroll handling skips our fixed header
       (documented: it walks past sticky/fixed elements looking for a
       scrollable one) and on this layout it lands on <Footer>, dragging the
       page to the bottom instead of the top. Forcing scrollTo(0, 0) here —
       after that handling has already run in the same commit — overrides it
       with the behavior every page on this site actually wants. Skipped on
       the very first load and on any URL carrying a hash, so a deep link
       like /services/x#faq still lands on its anchor. */
    const skipScrollReset = isFirstRender.current || window.location.hash;
    isFirstRender.current = false;
    if (skipScrollReset) return;

    const timeout = setTimeout(() => window.scrollTo(0, 0), 36);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return <div className="page-enter">{children}</div>;
}

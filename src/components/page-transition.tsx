"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const isFirstRender = useRef(true);

  // Wait one animation cycle (360ms) before mounting so the fade-in plays.
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

    const timeout = setTimeout(() => {
      setMounted(true);
      if (!skipScrollReset) window.scrollTo(0, 0);
    }, 36);
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!mounted) return null;

  return <div className="page-enter">{children}</div>;
}
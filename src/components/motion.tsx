"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * The presentation layer's only motion primitive.
 *
 * This replaced a `motion/react` implementation. The animation is a 14px rise
 * and a fade — one transition on two properties — and shipping a general
 * animation runtime to every page to express that was the wrong trade for a
 * site whose performance budget is part of the pitch. The effect is identical;
 * the JavaScript is an IntersectionObserver and one attribute write.
 *
 * There is deliberately no React state here. The reveal is a visual state
 * owned by an external system (the observer), so the effect writes the
 * attribute straight to the node instead of re-rendering the tree to change
 * one string. `data-reveal` is rendered as a constant, so React's own record
 * of the prop never changes and reconciliation will not overwrite what the
 * observer wrote.
 *
 * How it degrades, in order of importance:
 *
 *   · No JavaScript — `js-motion` is never added to <html> (see themeScript),
 *     so the CSS that hides pending elements never matches and everything is
 *     visible. The old implementation server-rendered `opacity: 0`, which
 *     meant a no-JS visitor saw an empty page.
 *   · No IntersectionObserver — the effect reveals immediately on mount.
 *   · Reduced motion — the media query in globals.css keeps pending elements
 *     fully visible, so there is no transition to sit through.
 *
 * Revealing once is deliberate. Re-animating on every scroll past is
 * decoration that fights the reader.
 */

const REVEAL_MARGIN = "0px 0px -8% 0px";

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** Seconds, matching the previous API. Applied as a transition delay. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "header";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      el.dataset.reveal = "shown";
    };

    /* Nothing to observe with — show it and stop. */
    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    /* Fires immediately for anything already on screen at mount, so
       above-the-fold content does not wait for a scroll that may never come. */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show();
          observer.disconnect();
        }
      },
      { rootMargin: REVEAL_MARGIN },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal="pending"
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={cn("ds-reveal", className)}
    >
      {children}
    </Tag>
  );
}

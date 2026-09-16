"use client";

import { useEffect, useRef } from "react";

const GLOW_SIZE = 416; // matches h-[26rem] w-[26rem]

/**
 * Animated grid band + cursor glow for hero and page-header sections.
 *
 * Two stacked layers, both aria-hidden and pointer-events: none so content
 * sits and clicks on top untouched:
 *
 *  1. The grid itself — `.ds-grid-lines`, a 24px pure-CSS line grid with a
 *     slow "breathing" opacity animation (reduced-motion aware).
 *  2. A soft radial accent glow that follows the pointer across the band.
 *     Position is written straight to `transform` with a CSS ease-out
 *     transition, so the glow trails the cursor smoothly without React
 *     re-renders or rAF churn.
 */
export function GridOverlay() {
  const rootRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const glow = glowRef.current;
    if (!root || !glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let shown = false;
    const onMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
      glow.style.transform = `translate(${x - GLOW_SIZE / 2}px, ${y - GLOW_SIZE / 2}px)`;
      if (!shown) {
        shown = true;
        glow.style.opacity = "1";
      }
    };

    root.addEventListener("mousemove", onMove, { passive: true });
    return () => root.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="ds-grid-lines absolute inset-0" />
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[26rem] w-[26rem] rounded-full opacity-0 transition-[transform,opacity] duration-500 ease-out"
        style={{
          willChange: "transform",
          background:
            "radial-gradient(circle, var(--color-glow) 0%, var(--color-glow) 35%, transparent 70%)",
        }}
      />
    </div>
  );
}
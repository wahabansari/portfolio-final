"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./ui";

type ProcessStep = { step: string; detail: string; benefit?: string };

/**
 * The five-step process — scroll-driven stepper with a progress track.
 *
 * Desktop: five columns with a horizontal progress line behind them.
 * Active step gets a subtle accent fill and the progress line advances.
 * Mobile: stacked cards with a vertical progress track on the left edge.
 *
 * Each step shows the benefit in an accent-bordered callout — the buyer
 * reads "what I do" first (the heading), and "what you get" immediately
 * after without scanning separate sections.
 */
export function ProcessSteps({ steps }: { steps: readonly ProcessStep[] }) {
  const olRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(-1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = olRef.current;
    if (!root) return;

    let raf = 0;

    const update = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = rect.height + vh;
      const p = Math.min(1, Math.max(0, (vh - rect.top) / total));
      setProgress(p);

      const next =
        p >= 1
          ? steps.length - 1
          : Math.min(steps.length - 1, Math.floor(p * steps.length));
      setActive((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps.length]);

  return (
    <div className="relative">
      {/* Desktop: horizontal track */}
      <div className="absolute top-[26px] left-0 right-0 hidden h-px bg-border md:block" />
      <div
        className="absolute top-[26px] left-0 hidden h-px bg-accent transition-all duration-300 md:block"
        style={{ width: `${(progress * 100)}%` }}
      />

      {/* Mobile: vertical track */}
      <div className="absolute top-0 bottom-0 left-[19px] w-px bg-border md:hidden" />
      <div
        className="absolute top-0 left-[19px] w-px bg-accent transition-all duration-300 md:hidden"
        style={{ height: `${(progress * 100)}%` }}
      />

      <ol ref={olRef} className="md:grid md:grid-cols-5 md:gap-8">
        {steps.map((s, i) => {
          const isActive = active === i;
          return (
            <Reveal
              as="li"
              key={s.step}
              delay={i * 0.04}
              className="relative pb-10 md:pb-0"
            >
              {/* Step number badge */}
              <div
                className={cn(
                  "relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 md:h-13 md:w-13",
                  isActive
                    ? "border-accent bg-accent text-accent-fg shadow-[0_0_0_4px_var(--color-accent-soft)]"
                    : "border-border bg-surface text-fg-subtle",
                )}
              >
                <span
                  className={cn(
                    "font-display text-[1.125rem] font-semibold tabular-nums transition-colors",
                    isActive ? "text-accent-fg" : "",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Step content */}
              <div
                className={cn(
                  "rounded-xl px-5 py-4 transition-colors duration-300",
                  isActive ? "bg-accent-soft/40" : "",
                )}
              >
                <h3 className="ds-title-sm">{s.step}</h3>
                <p className="ds-body-sm mt-2">{s.detail}</p>

                {s.benefit && (
                  <p className="ds-body-sm mt-3 border-l-2 border-accent pl-4">
                    <span className="font-semibold text-accent">You get </span>
                    <span className="text-fg-muted">{s.benefit}</span>
                  </p>
                )}
              </div>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}

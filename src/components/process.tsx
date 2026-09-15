"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./ui";

type ProcessStep = { step: string; detail: string; benefit?: string };

/**
 * The five-step process, now a working stepper.
 *
 * The numbered badges double as a progress indicator: as the section scrolls
 * through the viewport centre, the active step lights in sequence (accent) so
 * the timeline visibly "advances" instead of sitting static. One scroll value
 * drives all five badges, so it reads correctly whether the steps are a
 * single horizontal row (desktop) or stacked vertically (mobile).
 *
 * Each step is an index cell rather than a card: the numeral stands alone at
 * display scale above a hairline, then the name and detail run beneath it.
 */
export function ProcessSteps({ steps }: { steps: readonly ProcessStep[] }) {
  const olRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const root = olRef.current;
    if (!root) return;

    let raf = 0;

    const update = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = rect.height + vh;
      /* 0 → 1 across the whole pass: the section entering at the bottom of the
         viewport through to leaving at the top. */
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / total));
      const next =
        progress >= 1
          ? steps.length - 1
          : Math.min(steps.length - 1, Math.floor(progress * steps.length));
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
    <ol ref={olRef} className="md:grid md:grid-cols-5 md:gap-8">
      {steps.map((s, i) => {
        const isActive = active === i;
        return (
          <Reveal
            as="li"
            key={s.step}
            delay={i * 0.04}
            className="relative pb-8 md:pb-0"
          >
            <span
              aria-hidden
              className={cn(
                "font-display text-[2.5rem] leading-none font-medium tracking-[-0.02em] transition-colors duration-300",
                isActive ? "text-accent" : "text-border",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <span
              aria-hidden
              className={cn(
                "mt-3 block h-px w-10 transition-colors duration-300",
                isActive ? "bg-accent" : "bg-border",
              )}
            />

            <div className="mt-4">
              <h3 className="ds-title-sm">{s.step}</h3>
              <p className="ds-body-sm mt-2">{s.detail}</p>
              {s.benefit && (
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink">
                  <span className="font-medium text-accent">You get&nbsp;</span>
                  <span className="text-ink-muted">{s.benefit}</span>
                </p>
              )}
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
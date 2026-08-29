"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * FAQ accordion.
 *
 * This replaced a <details>/<summary> implementation. Native disclosure is
 * accessible and costs no JavaScript, but it does not expose `aria-expanded`
 * or `aria-controls` — the trigger is a <summary>, not a button — and the
 * spec requires both. A real button with both attributes and a stable id also
 * gives assistive technology the relationship between trigger and panel
 * explicitly rather than by implication.
 *
 * Every answer is rendered into the server HTML and hidden with the `hidden`
 * attribute rather than being mounted on open, so the text is present for
 * crawlers and for in-page search on first load, not just after hydration.
 *
 * Multiple panels may be open at once. Auto-closing the previous one is a
 * common default and a bad one: it destroys the comparison a reader is
 * usually making between two answers.
 */
export function Accordion({
  items,
  className,
}: {
  items: readonly { q: string; a: string }[];
  className?: string;
}) {
  /* useId gives an id that is identical on the server and the client, so the
     aria-controls relationship survives hydration. Deriving one from the
     question text would break on punctuation and duplicate wording. */
  const baseId = useId();
  const [open, setOpen] = useState<number[]>([]);

  const toggle = (i: number) =>
    setOpen((current) =>
      current.includes(i) ? current.filter((n) => n !== i) : [...current, i],
    );

  return (
    <div className={cn("border-t border-border", className)}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        const triggerId = `${baseId}-trigger-${i}`;
        const panelId = `${baseId}-panel-${i}`;

        return (
          <div key={item.q} className="border-b border-border">
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left"
              >
                <span className="ds-title-sm pr-2 text-ink">{item.q}</span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-[rotate,border-color,color] duration-200",
                    isOpen
                      ? "rotate-45 border-accent text-accent"
                      : "border-border text-ink-muted",
                  )}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 5h2v14h-2z" />
                    <path d="M5 11h14v2H5z" />
                  </svg>
                </span>
              </button>
            </h3>

            <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen}>
              <p className="ds-body ds-measure ds-panel pr-10 pb-6">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

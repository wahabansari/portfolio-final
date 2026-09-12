"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Accordion — Radix behaviour, styled by this system.
 *
 * Part of the open design system: the component is a thin styled shell over
 * Radix's headless Accordion, so every accessible behaviour (roving focus,
 * arrow-key navigation, aria-expanded/controls, Enter/Space toggling) comes
 * from Radix and only the look is ours.
 *
 * Design decisions:
 *   · Multiple panels may be open at once. Auto-closing the previous panel is
 *     a common default and a bad one — it destroys the comparison a reader is
 *     usually making between two answers.
 *   · Each item is its own card: white fill, hairline, a sky tint that fades
 *     in on the open state. Rows of hairline-only dividers read as a list the
 *     eye has to parse; cards make the open/closed state unmistakable.
 *   · Content is force-mounted and collapsed with grid rows, so every answer
 *     stays in the initial HTML for crawlers and in-page search while looking
 *     like a smooth open/close to the eye.
 *   · The reveal uses `data-[state=open]` on the trigger: no JavaScript state
 *     is involved, so reduced-motion and no-JS degrade cleanly.
 */

export type AccordionEntry = {
  value: string;
  title: ReactNode;
  panel: ReactNode;
};

export function Accordion({
  entries,
  className,
  defaultOpen = [],
  icon = "chevron",
}: {
  entries: readonly AccordionEntry[];
  className?: string;
  /** Which entries start open. Freeform default: none. */
  defaultOpen?: string[];
  icon?: "chevron" | "plus";
}) {
  return (
    <AccordionPrimitive.Root
      type="multiple"
      defaultValue={defaultOpen}
      className={cn("flex flex-col gap-3", className)}
    >
      {entries.map((entry) => (
        <AccordionPrimitive.Item
          key={entry.value}
          value={entry.value}
          className="group border-b border-border transition-colors duration-200 last:border-b-0"
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="flex w-full cursor-pointer items-start justify-between gap-6 py-4 text-left transition-colors hover:text-accent md:py-5">
              <span className="text-[0.9375rem] font-semibold leading-snug text-ink transition-colors group-data-[state=open]:text-accent md:text-base">
                {entry.title}
              </span>
              <span
                aria-hidden
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-ink-muted transition-colors group-data-[state=open]:border-accent group-data-[state=open]:bg-accent group-data-[state=open]:text-accent-fg"
              >
                {icon === "plus" ? <Plus /> : <Chevron />}
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          {/* forceMount keeps answers in the server HTML while closed (SEO),
              the grid-rows swap is the whole animation — no animated height. */}
          <AccordionPrimitive.Content
            forceMount
            className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out data-[state=open]:grid-rows-[1fr]"
          >
            <div className="min-h-0 overflow-hidden">
              <div className="pb-5">{entry.panel}</div>
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

function Chevron() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="transition-transform duration-300 group-data-[state=open]:rotate-180"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function Plus() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
      className="transition-transform duration-300 group-data-[state=open]:rotate-45"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";

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
 *   · Items are ruled rows — a hairline between questions, no fill of their
 *     own. Where the section needs a surface (e.g. the homepage FAQ on a
 *     gray band) the whole accordion sits inside a `ds-card`, so the rules
 *     read as inset lines rather than as the only edge on screen.
 *   · The question is set at 16–17px/600 and the answer at 17px regular, so
 *     the question always outweighs the answer it introduces.
 *   · Content is force-mounted and collapsed with grid rows, so every answer
 *     stays in the initial HTML for crawlers and in-page search while looking
 *     like a smooth open/close to the eye. Closed panels are hidden with
 *     `visibility: hidden`, which also takes them out of the a11y tree and
 *     keyboard tab order — force-mount alone leaves the collapsed answers
 *     (or any links inside them) reachable by screen readers.
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
  /* Which panels are open, so a change can be read as "this one just opened".
     Only openings are reported; closing a question says nothing about interest. */
  const open = useRef<string[]>(defaultOpen);

  const onValueChange = (next: string[]) => {
    const opened = next.find((value) => !open.current.includes(value));
    open.current = next;
    if (!opened) return;
    const entry = entries.find((e) => e.value === opened);
    track("faq_open", { label: typeof entry?.title === "string" ? entry.title : opened });
  };

  return (
    <AccordionPrimitive.Root
      type="multiple"
      defaultValue={defaultOpen}
      onValueChange={onValueChange}
      className={cn("flex flex-col border-t border-border", className)}
    >
      {entries.map((entry) => (
        <AccordionPrimitive.Item
          key={entry.value}
          value={entry.value}
          className="group border-b border-border"
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="flex w-full cursor-pointer items-start justify-between gap-6 py-4 text-left transition-colors hover:text-accent">
              <span className="text-base leading-snug font-semibold text-ink transition-colors group-data-[state=open]:text-accent md:text-[1.0625rem]">
                {entry.title}
              </span>
              <span
                aria-hidden
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-ink-muted transition-colors group-data-[state=open]:text-accent"
              >
                {icon === "plus" ? <Plus /> : <Chevron />}
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          {/* forceMount keeps answers in the server HTML while closed (SEO),
              the grid-rows swap is the whole animation — no animated height. */}
<AccordionPrimitive.Content
          forceMount
          className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out data-[state=closed]:invisible data-[state=open]:grid-rows-[1fr] data-[state=open]:visible"
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
import Link from "next/link";
import { engagements } from "@/content/site";
import { cn } from "@/lib/cn";
import { ArrowIcon, Reveal, Section, SectionHeading } from "./ui";

/* Border per pane in the 3-up window grid, spelled out per index the same
   way the homepage's offer grid is — divide-x/divide-y borders every DOM
   sibling in source order, which cannot express "only the first two columns
   get a left rule" once panes wrap onto a second row on narrow screens. */
const PANE_DIVIDER = [
  "",
  "border-t sm:border-t-0 sm:border-l border-border",
  "border-t md:border-t-0 md:border-l border-border",
];

/**
 * Three ways to work together, as panes in a window grid — not stacked
 * hairline rows and not cards. Each pane carries its own index numeral,
 * the arrangement at display scale, what it means in practice and the
 * route into it; separated from its neighbours only by the grid's own
 * dividers.
 */
export function Engagement({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="engagement" tone={tone}>
      <SectionHeading
        overline="Engagement"
        title="Work with me"
        description="Three arrangements, each with a different shape. Whichever fits, the first step is the same conversation."
      />

      <div className="grid border-t border-border sm:grid-cols-2 md:grid-cols-3">
        {engagements.map((option, i) => (
          <Reveal key={option.title} delay={i * 0.05} className={cn("group", PANE_DIVIDER[i])}>
            <Link href={option.cta.href} className="flex h-full flex-col p-7 transition-colors duration-200 hover:bg-surface md:p-8">
              <span className="font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-accent-soft tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-[1.375rem] leading-snug font-bold tracking-[-0.015em] text-ink transition-colors group-hover:text-accent md:text-[1.5rem]">
                {option.title}
              </h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
                {option.detail}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-accent">
                {option.cta.label}
                <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

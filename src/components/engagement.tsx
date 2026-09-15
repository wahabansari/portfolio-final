import Link from "next/link";
import { engagements } from "@/content/site";
import { ArrowIcon, Reveal, Section, SectionHeading } from "./ui";

/**
 * Three ways to work together, set as a full-width index.
 *
 * Three audiences — a hiring manager, a direct client and an agency — each
 * need to see their own path named explicitly. Each arrangement is a hairline
 * row: a mono index number, the shape at display scale, what it means in
 * practice, and the route on the right — no cards, no equal-weight boxes.
 */
export function Engagement({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="engagement" tone={tone}>
      <SectionHeading
        overline="Engagement"
        title="Work with me"
        description="Three arrangements, each with a different shape. Whichever fits, the first step is the same conversation."
      />

      <ul className="border-t border-border">
        {engagements.map((option, i) => (
          <Reveal as="li" key={option.title} delay={i * 0.05}>
            <div className="group grid items-center gap-x-8 gap-y-3 border-b border-border py-8 transition-colors hover:bg-surface md:grid-cols-12 md:py-10">
              <span className="md:col-span-1 md:pl-2">
                <span className="font-display text-[1.25rem] font-medium text-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>

              <h3 className="font-display text-[1.375rem] leading-snug font-medium tracking-[-0.014em] text-ink transition-colors group-hover:text-accent md:text-[1.625rem] md:col-span-3">
                {option.title}
              </h3>

              <p className="text-[0.9375rem] leading-relaxed text-ink-muted md:col-span-5">
                {option.detail}
              </p>

              <Link
                href={option.cta.href}
                data-track={option.cta.href.includes("agency") ? "cta_click" : undefined}
                className="inline-flex items-center gap-1.5 font-mono text-[0.8125rem] font-medium uppercase tracking-[0.06em] text-accent md:col-span-3 md:justify-end md:pr-2"
              >
                {option.cta.label}
                <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
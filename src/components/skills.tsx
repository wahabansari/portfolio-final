import Link from "next/link";
import { byRequest, capabilities } from "@/content/site";
import { ArrowIcon, Reveal, Section, SectionHeading } from "./ui";

/**
 * Capabilities as a full-width ledger.
 *
 * Each group is a hairline row: mono index on the left, the category at
 * display scale, the plain description, and the ranked inventory — lead items
 * as mono labels, the supporting stack as a secondary line — on the right.
 * The hierarchy is visible in one pass: what I lead with, and what supports it.
 */
export function Capabilities({
  tone = "plain",
  hideHeading = false,
}: {
  tone?: "plain" | "soft" | "deep";
  hideHeading?: boolean;
}) {
  return (
    <Section id="capabilities" tone={tone}>
      {!hideHeading && (
        <SectionHeading
          overline="Capabilities"
          title="What I am actually deep in"
          description="Grouped by what it does rather than listed alphabetically. The first line of each group is the part I would want to be judged on; the second is the supporting inventory."
        />
      )}

      <ul className="border-t border-border">
        {capabilities.map((group, i) => (
          <Reveal as="li" key={group.title} delay={i * 0.04}>
            <div className="grid items-start gap-x-8 gap-y-4 border-b border-border py-8 md:grid-cols-12 md:py-10">
              <span className="md:col-span-1 md:pl-2">
                <span className="font-display text-[1.25rem] font-medium text-ink-soft tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>

              <h3 className="font-display text-[1.375rem] leading-snug font-medium tracking-[-0.014em] text-ink md:col-span-3 md:text-[1.5rem]">
                {group.title}
              </h3>

              <p className="text-[0.875rem] leading-relaxed text-ink-muted md:col-span-3">
                {group.summary}
              </p>

              <div className="md:col-span-5">
                <ul className="flex flex-wrap gap-x-3 gap-y-2">
                  {group.lead.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-soft">
                  {group.support.join(" · ")}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>

      {/* The honest footnote: capabilities that are real but are not what I
          lead with commercially. Kept visible so nobody has to guess. */}
      <Reveal delay={0.1} className="mt-8">
        <div className="flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between md:gap-8">
          <div>
            <p className="ds-meta">Also available, by request</p>
            <p className="ds-body-sm mt-2">{byRequest.join(" · ")}</p>
          </div>
          <Link href="/contact" className="ds-link shrink-0">
            Ask about one
            <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
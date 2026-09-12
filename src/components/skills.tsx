import Link from "next/link";
import { byRequest, capabilities } from "@/content/site";
import { ArrowIcon, Reveal, Section, SectionHeading } from "./ui";

/**
 * Capabilities, grouped and ranked — depth before breadth.
 *
 * This replaced a flat 46-item technology wall. The inventory is all still
 * here; what changed is the hierarchy. Each group leads with what I would want
 * to be judged on, and keeps the rest as a secondary line, so a reader can
 * tell in one pass what is central and what is supporting.
 *
 * There is deliberately no /skills route. A page whose only purpose is to list
 * technologies is thin by construction — this is a section on the homepage and
 * on /about instead.
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

      <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((group, i) => (
          <Reveal as="li" key={group.title} delay={i * 0.04} className="flex flex-col bg-card p-7">
            <h3 className="ds-title-sm">{group.title}</h3>
            <p className="ds-body-sm mt-2">{group.summary}</p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {group.lead.map((item) => (
                <li key={item} className="ds-chip ds-chip-accent text-[0.75rem]">
                  {item}
                </li>
              ))}
            </ul>

            <p className="ds-body-sm mt-4 flex-1 text-[0.8125rem] text-ink-soft">
              {group.support.join(" · ")}
            </p>
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

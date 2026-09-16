import Link from "next/link";
import { byRequest, capabilities } from "@/content/site";
import { ArrowIcon, Reveal, Section, SectionHeading } from "./ui";

/**
 * Capabilities as a card grid.
 *
 * Each group is a real card: three-beat hierarchy instead of a flat ledger.
 * Title → summary → lead items as accent chips → supporting inventory as a
 * quiet "Also" footnote. The numbered corner keeps the scanning cue of the
 * old index without the table feel.
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
          description="Grouped by what it does rather than listed alphabetically. The chips are what I would want to be judged on; the line below them is the supporting inventory."
        />
      )}

      <ul className="grid gap-5 md:grid-cols-2">
        {capabilities.map((group, i) => (
          <Reveal as="li" key={group.title} delay={i * 0.04} className="h-full">
            <div className="ds-card ds-card-tags flex h-full flex-col p-6 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <h3 className="ds-h3">{group.title}</h3>
                <span className="ds-meta tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="ds-body-sm mt-2">{group.summary}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {group.lead.map((item) => (
                  <li key={item} className="ds-chip ds-chip-accent">
                    {item}
                  </li>
                ))}
              </ul>

              <p className="ds-meta mt-auto pt-5 border-t border-border">
                <span className="inline-block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-fg-subtle">
                  Also&nbsp;
                </span>
                {group.support.join(" · ")}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>

      {/* The honest footnote: capabilities that are real but are not what I
          lead with commercially. Kept visible so nobody has to guess. */}
      <Reveal delay={0.1} className="mt-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface px-6 py-6 md:flex-row md:items-center md:justify-between">
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
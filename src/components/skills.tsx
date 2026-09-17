import Link from "next/link";
import { byRequest, capabilities } from "@/content/site";
import { ArrowIcon, Reveal, Section, SectionHeading } from "./ui";

/**
 * Capabilities as a compact typographic grid, not a card grid or a bordered
 * list. Categories sit side by side — two up on tablet, three on desktop —
 * so the section reads as a dense reference block rather than a long column
 * of full-width rows. Each cell is just a label, the lead skills as tight
 * wrapping display type, and a quiet footnote of supporting skills; nothing
 * here has its own border, fill or shadow.
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
          description="Grouped by what it does rather than listed alphabetically. The bold words are what I would want to be judged on; the line below is the supporting inventory."
        />
      )}

      <div className="mt-4 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.04}>
            <span className="ds-overline-accent block">{group.title}</span>

            <p className="mt-4 leading-[1.35]">
              {group.lead.map((item, li) => (
                <span
                  key={item}
                  className="mr-2 inline-block font-display text-[1.0625rem] font-semibold tracking-[-0.01em] text-fg"
                >
                  {item}
                  {li < group.lead.length - 1 && (
                    <span aria-hidden className="text-accent">
                      {" "}
                      ·
                    </span>
                  )}
                </span>
              ))}
            </p>

            <p className="ds-meta mt-4 normal-case text-fg-subtle">{group.support.join(" · ")}</p>
          </Reveal>
        ))}
      </div>

      {/* The honest footnote: capabilities that are real but are not what I
          lead with commercially. Kept visible so nobody has to guess. */}
      <Reveal delay={0.1} className="mt-4 border-t border-border pt-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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

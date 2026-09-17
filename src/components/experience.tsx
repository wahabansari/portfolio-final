import { experience } from "@/content/site";
import { CheckIcon, ChipList, Reveal, Section, SectionHeading } from "./ui";

/**
 * Experience. Two roles, both written up in full — a long run on one product
 * is the substance of the CV, not a gap to apologise for, so it gets the space
 * rather than being compressed into a two-line timeline entry.
 *
 * The role header used to live in a small tinted card next to the highlight
 * list — a box next to a bullet list read as two disconnected UI elements.
 * A large numeral plus bare, bold typography now carries the same
 * information as one continuous block, matching the numeral language used
 * everywhere else on the site.
 */
export function ExperienceList({
  tone = "plain",
  hideHeading = false,
}: {
  tone?: "plain" | "soft" | "deep";
  hideHeading?: boolean;
}) {
  return (
    <Section id="experience" tone={tone}>
      {!hideHeading && (
        <SectionHeading
          overline="Experience"
          title="Where the five years went"
          description="Production frontend engineering, and the interface and design-system work underneath it."
        />
      )}

      <ol className="border-t border-border">
        {experience.map((role, i) => (
          <Reveal as="li" key={role.company} delay={i * 0.05}>
            <article className="border-b border-border py-10 md:py-12">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                <header className="lg:col-span-4">
                  <span className="font-display text-[2.5rem] font-bold leading-none tracking-[-0.03em] text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[1.5rem] font-bold leading-[1.2] tracking-[-0.02em] text-fg mt-4">
                    {role.role}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] font-semibold text-accent">{role.company}</p>
                  {role.client && <p className="ds-meta mt-3 normal-case">Client &middot; {role.client}</p>}
                  {role.period && <p className="ds-meta mt-1 normal-case">{role.period}</p>}
                  <p className="ds-body-sm mt-5">{role.summary}</p>
                  <ChipList items={role.stack} className="mt-6" />
                </header>

                <div className="lg:col-span-8">
                  <ul className="space-y-5 border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                    {role.highlights.map((h) => (
                      <li key={h} className="flex gap-3.5">
                        <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <p className="ds-body">{h}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

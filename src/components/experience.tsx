import { experience } from "@/content/site";
import { ChipList, Reveal, Section, SectionHeading } from "./ui";

/**
 * Experience. Two roles, both written up in full — a long run on one product
 * is the substance of the CV, not a gap to apologise for, so it gets the space
 * rather than being compressed into a two-line timeline entry.
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
            <article className="border-b border-border py-8 md:py-10">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                <header className="lg:col-span-4">
                  <h3 className="ds-title">{role.role}</h3>
                  <p className="mt-2 text-[0.9375rem] font-medium text-accent">{role.company}</p>
                  {role.client && <p className="ds-meta mt-2 normal-case">Client · {role.client}</p>}
                  {role.period && <p className="ds-meta mt-1 normal-case">{role.period}</p>}
                  <p className="ds-body-sm mt-5">{role.summary}</p>
                  <ChipList items={role.stack} className="mt-6" />
                </header>

                <div className="lg:col-span-8">
                  <ul className="space-y-4 border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                    {role.highlights.map((h) => (
                      <li key={h} className="flex gap-3.5">
                        <span
                          aria-hidden
                          className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        />
                        <p className="ds-body-sm">{h}</p>
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

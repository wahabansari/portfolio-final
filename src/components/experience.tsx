import { experience } from "@/content/site";
import { CheckIcon, ChipList, Reveal, Section, SectionHeading } from "./ui";

/**
 * Experience as a vertical timeline: a rail down the left, a node per role and
 * one bordered card each. A long run on one product is the substance of the
 * founder's experience, so each role keeps its full write-up; the current role
 * is marked with a pulsing node. Highlights are the founder's own, unchanged.
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
          title="Where the experience comes from"
          description="Production frontend engineering, and the interface and design-system work underneath it."
        />
      )}

      <ol className="relative mx-auto max-w-5xl space-y-8 pl-8 md:pl-12">
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[0.6875rem] w-0.5 rounded-full bg-border md:left-[1.1875rem]"
        />
        {experience.map((role, i) => {
          const current = role.period?.toLowerCase().includes("present");
          return (
            <Reveal as="li" key={role.company} delay={i * 0.08} className="relative">
              <span
                aria-hidden
                className="absolute top-7 -left-8 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent-deep bg-bg md:-left-12 md:h-7 md:w-7"
              >
                <span className="relative flex h-2.5 w-2.5">
                  {current && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-deep opacity-60" />
                  )}
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-deep" />
                </span>
              </span>

              <article className="rounded-3xl border border-border-subtle bg-bg p-6 shadow-[0_1px_2px_rgba(28,30,60,0.03)] md:p-8">
                <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="ds-h3">{role.role}</h3>
                    <p className="mt-1 text-[1rem] font-semibold text-accent">
                      {role.company}
                      {role.client && <span className="font-normal text-fg-muted"> · for {role.client}</span>}
                    </p>
                  </div>
                  {role.period && (
                    <span className="ds-chip shrink-0 self-start !text-[0.8125rem] font-medium">{role.period}</span>
                  )}
                </header>

                <p className="ds-body mt-4 max-w-3xl">{role.summary}</p>

                <ul className="mt-6 grid gap-x-8 gap-y-4 border-t border-border-subtle pt-6 md:grid-cols-2">
                  {role.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      <p className="ds-body-sm text-fg-muted">{h}</p>
                    </li>
                  ))}
                </ul>

                <ChipList items={role.stack} className="mt-6" />
              </article>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}

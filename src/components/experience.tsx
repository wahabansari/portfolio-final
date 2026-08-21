import { experience } from "@/content/site";
import { Reveal, Section, SectionHeading } from "./ui";

export function Experience() {
  return (
    <Section id="experience" tone="grey">
      <SectionHeading
        overline="Experience"
        title="Where I've worked"
        description="Five years across product engineering and interface design."
      />

      <div className="space-y-6">
        {experience.map((role, i) => (
          <Reveal key={role.company} delay={i * 0.06}>
            <article className="g-card-plain p-7 md:p-10">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                {/* Meta pinned to a fixed left column so both roles align. */}
                <div className="lg:col-span-4">
                  <h3 className="g-title">{role.company}</h3>
                  <p className="mt-2 text-[0.9375rem] font-medium text-primary">{role.role}</p>

                  {role.client && (
                    <p className="g-body-sm mt-4">
                      Client: <span className="text-ink">{role.client}</span>
                    </p>
                  )}

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {role.stack.map((s) => (
                      <li key={s} className="g-chip !py-1 !text-[0.8125rem] font-normal text-ink-muted">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-8">
                  <p className="text-[1.0625rem] leading-relaxed text-ink">{role.summary}</p>

                  <ul className="mt-7 space-y-4">
                    {role.highlights.map((h, hi) => (
                      <li key={hi} className="grid grid-cols-[1.25rem_1fr] gap-x-3">
                        <span
                          aria-hidden
                          className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-primary"
                        />
                        <span className="g-body text-[0.9375rem]">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

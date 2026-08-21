import { about, site } from "@/content/site";
import { DownloadIcon, Field, Reveal, Section, SectionHeading } from "./ui";

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        overline="About"
        title="Design sensibility, engineering discipline"
        description={about.statement}
      />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <div className="max-w-prose space-y-6">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="g-body text-[1.0625rem] leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <a href={site.resumeHref} className="g-btn g-btn-tonal mt-9">
            <DownloadIcon />
            Download résumé
          </a>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-5">
          <div className="g-card-soft p-7 md:p-8">
            <h3 className="g-title-sm">At a glance</h3>
            <dl className="mt-6 space-y-6">
              {about.facts.map((f) => (
                <Field key={f.k} label={f.k} value={f.v} />
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

import { certifications, education } from "@/content/site";
import { Reveal, Section, SectionHeading } from "./ui";

function Row({ title, org, period, note }: { title: string; org: string; period: string; note: string }) {
  return (
    <li className="flex flex-col gap-1 border-b border-border py-5 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <div>
        <p className="text-[0.9375rem] font-medium text-ink">{title}</p>
        <p className="ds-body-sm mt-0.5">{org}</p>
      </div>
      <div className="shrink-0 sm:text-right">
        <p className="ds-meta normal-case">{period}</p>
        <p className="ds-meta mt-0.5 normal-case">{note}</p>
      </div>
    </li>
  );
}

export function Credentials({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section tone={tone}>
      <SectionHeading
        overline="Credentials"
        title="Education and certification"
        description="Listed for completeness. The production work above is the substantive part of the record."
      />

      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <Reveal>
          <div className="border-t border-border pt-6">
            <p className="ds-meta">Education</p>
            <ul className="mt-4">
              {education.map((e) => (
                <Row key={e.title} {...e} />
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="border-t border-border pt-6">
            <p className="ds-meta">Certification</p>
            <ul className="mt-4">
              {certifications.map((c) => (
                <Row key={c.title} {...c} />
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

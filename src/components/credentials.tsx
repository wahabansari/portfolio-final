import { certifications, education } from "@/content/site";
import { Reveal, Section, SectionHeading } from "./ui";

type Entry = { title: string; org: string; period: string; note: string };

export function Credentials() {
  return (
    <Section id="background" tone="grey">
      <SectionHeading overline="Background" title="Education & certifications" />

      <div className="grid gap-6 md:grid-cols-2">
        <Column label="Education" items={education} accent="bg-g-blue" />
        <Column label="Certifications" items={certifications} accent="bg-g-green" delay={0.06} />
      </div>
    </Section>
  );
}

function Column({
  label,
  items,
  accent,
  delay = 0,
}: {
  label: string;
  items: readonly Entry[];
  accent: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="g-card-plain h-full p-7 md:p-8">
        <div className="flex items-center gap-2.5">
          <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${accent}`} />
          <h3 className="g-title-sm">{label}</h3>
        </div>

        <ul className="mt-6 space-y-6">
          {items.map((item) => (
            <li
              key={item.title}
              className="grid gap-x-6 gap-y-1 border-b border-border pb-6 last:border-b-0 last:pb-0 sm:grid-cols-[1fr_auto] sm:items-start"
            >
              <div>
                <h4 className="text-[1.0625rem] leading-snug font-medium text-ink">
                  {item.title}
                </h4>
                <p className="g-body-sm mt-1">{item.org}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-[0.875rem] font-medium whitespace-nowrap text-ink">
                  {item.period}
                </p>
                <p className="g-body-sm mt-0.5">{item.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

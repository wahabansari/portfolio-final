import { skills } from "@/content/site";
import { Reveal, Section, SectionHeading } from "./ui";

/* Cycle the four brand colours across the groups. */
const DOTS = ["bg-g-blue", "bg-g-red", "bg-g-yellow", "bg-g-green"];

export function Skills() {
  const total = skills.reduce((n, g) => n + g.items.length, 0);

  return (
    <Section id="skills">
      <SectionHeading
        level="h1"
        overline="Skills"
        title="Tools and technologies"
        description="What I reach for, grouped by what it does."
        aside={<p className="g-body-sm">{total} technologies</p>}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 0.05}>
            <div className="g-card-soft h-full p-6">
              <div className="flex items-center gap-2.5">
                <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${DOTS[i % 4]}`} />
                <h3 className="g-title-sm">{group.title}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="g-chip !py-1 !text-[0.8125rem] font-normal text-ink-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

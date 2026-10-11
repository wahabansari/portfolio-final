import Link from "next/link";
import { engagements } from "@/content/site";
import { ArrowIcon, BriefcaseIcon, Reveal, Section, SectionHeading, UsersIcon } from "./ui";

const ICONS = [BriefcaseIcon, UsersIcon];

/**
 * Two ways to work together as one split panel: the arrangement, what it
 * means in practice and the route into it.
 */
export function Engagement({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="engagement" tone={tone}>
      <SectionHeading
        overline="Engagement"
        title="Two ways to work with us"
        description="Two arrangements, each with a different shape. Whichever fits, the first step is the same conversation."
      />

      {/* Two separate tiles rather than one divided panel: on the canvas the
          gap is the division, the way the homepage cards run. */}
      <ul className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2 md:gap-5">
        {engagements.map((option, i) => {
          const Icon = ICONS[i] ?? BriefcaseIcon;
          return (
            <Reveal as="li" key={option.title} delay={i * 0.06} className="h-full">
              <Link
                href={option.cta.href}
                data-track="cta_click"
                data-track-label={`engagement:${i}`}
                className="group ds-card ds-card-interactive flex h-full flex-col p-7 md:p-8"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="ds-h3 mt-5">{option.title}</h3>
                <p className="ds-body-sm mt-2 flex-1">{option.detail}</p>
                <span className="ds-link mt-5 text-[0.9375rem]">
                  {option.cta.label}
                  <ArrowIcon className="h-3 w-3" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

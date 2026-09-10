import Link from "next/link";
import { engagements } from "@/content/site";
import { ArrowIcon, Reveal, Section, SectionHeading } from "./ui";

/**
 * Three ways to work together. This exists because the site has three distinct
 * audiences — a hiring manager, a direct client and an agency — and each one
 * needs to see their own path named explicitly rather than inferring it from a
 * generic "get in touch".
 */
export function Engagement({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="engagement" tone={tone}>
      <SectionHeading
        overline="Engagement"
        title="Work with me"
        description="Three arrangements, each with a different shape. Whichever fits, the first step is the same conversation."
      />

      <ul className="grid gap-6 lg:grid-cols-3">
        {engagements.map((option, i) => (
          <Reveal as="li" key={option.title} delay={i * 0.05} className="h-full">
            <div className="ds-card ds-card-interactive group flex h-full flex-col p-7 md:p-8">
              <span className="ds-meta text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="ds-title mt-4">{option.title}</h3>
              <p className="ds-body-sm mt-4 flex-1">{option.detail}</p>
              <Link
                href={option.cta.href}
                data-track={option.cta.href.includes("agency") ? "cta_click" : undefined}
                className="ds-link mt-7"
              >
                {option.cta.label}
                <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

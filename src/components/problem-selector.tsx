import Link from "next/link";
import { problemPaths } from "@/content/site";
import { ArrowIcon, Reveal, Section, SectionHeading } from "./ui";

/**
 * "What are you trying to solve?"
 *
 * The routing layer between a visitor's problem and the right service page.
 *
 * A services list asks a buyer to translate their situation into my vocabulary
 * before they can act — to know that "our site is slow and nobody converts" is
 * filed under "Website Redesign & Conversion". This asks the question in their
 * words instead, and every answer goes to exactly one page.
 *
 * The cards are links rather than a filter or an accordion on purpose: the
 * fastest possible interaction is the one that just takes you there. Anything
 * that reveals more copy in place is a second decision before the first one
 * has paid off.
 */
export function ProblemSelector({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="start" tone={tone}>
      <SectionHeading
        overline="Start here"
        title="What are you trying to solve?"
        description="Pick the closest one. Each goes to a page that states who it is for, what it includes and where the scope ends — no form in between."
      />

      <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {problemPaths.map((path, i) => (
          <Reveal as="li" key={path.href + path.problem} delay={i * 0.04} className="bg-card">
            <Link
              href={path.href}
              data-track="cta_click"
              data-track-label={`problem:${path.href.replace("/services/", "")}`}
              className="group flex h-full flex-col p-7 transition-colors hover:bg-surface md:p-8"
            >
              <h3 className="ds-title-sm text-ink transition-colors group-hover:text-accent">
                {path.problem}
              </h3>
              <p className="ds-body-sm mt-3 flex-1">{path.detail}</p>
              <span className="ds-link mt-6">
                {path.label}
                <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

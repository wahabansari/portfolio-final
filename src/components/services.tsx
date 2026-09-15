import Link from "next/link";
import { services, TIER_LABEL } from "@/content/services";
import { ArrowIcon, Reveal, Section } from "./ui";

/**
 * Services — 2-column asymmetric, premium style.
 *
 * Left: overline + heading. Right: numbered service list, 40px gaps.
 * No cards. Hairline separation. Number in mono, name at 500 weight,
 * one-line muted description.
 */
export function ServicesOverview({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="services" tone={tone}>
      <div className="ds-container">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div>
            <span className="ds-overline mb-4 block">What I do</span>
            <h2 className="ds-h2">Frontend engineering, end to end</h2>

            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 text-[1rem] font-medium text-fg underline-offset-4 transition-colors duration-150 hover:text-accent hover:underline"
            >
              Compare services
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>

          <ul className="border-t border-border">
            {services.map((sv, i) => (
              <Reveal as="li" key={sv.slug} delay={i * 0.05}>
                <Link
                  href={`/services/${sv.slug}`}
                  data-track="cta_click"
                  data-track-label={`home-services:${sv.slug}`}
                  className="group grid grid-cols-[48px_1fr] gap-4 border-b border-border py-8 transition-colors duration-200 hover:bg-surface-hover md:grid-cols-[64px_1fr_28px] md:px-4"
                >
                  <span className="pt-1.5 font-mono text-[0.8125rem] tabular-nums text-fg-subtle transition-colors duration-150 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[1.375rem] font-medium leading-snug tracking-[-0.02em] text-fg transition-colors duration-150 group-hover:text-accent">
                      {sv.title}
                    </span>
                    <span className="ds-meta mt-2 block">
                      {TIER_LABEL[sv.tier]}
                    </span>
                    <span className="ds-body-sm mt-2 block max-w-md text-fg-muted">
                      {sv.summary}
                    </span>
                  </span>
                  <span className="hidden items-center justify-end text-fg-subtle transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-accent md:flex">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/** /services hub — the full set as numbered rows. */
export function ServicesList() {
  return (
    <Section tone="plain">
      <div className="ds-container">
        <span className="ds-overline mb-4 block">Services</span>
        <h2 className="ds-h2 mb-16">What I take on</h2>
        <ul className="border-t border-border">
          {services.map((sv, i) => (
            <Reveal as="li" key={sv.slug} delay={i * 0.04}>
              <Link
                href={`/services/${sv.slug}`}
                data-track="cta_click"
                data-track-label={`hub:${sv.slug}`}
                className="group grid grid-cols-[48px_1fr] gap-4 border-b border-border py-8 transition-colors duration-200 hover:bg-surface-hover md:grid-cols-[64px_1fr_200px_28px] md:px-4"
              >
                <span className="pt-1.5 font-mono text-[0.8125rem] tabular-nums text-fg-subtle transition-colors duration-150 group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[1.375rem] font-medium leading-snug tracking-[-0.02em] text-fg transition-colors duration-150 group-hover:text-accent">
                    {sv.title}
                  </span>
                  <span className="ds-meta mt-2 block">{sv.eyebrow}</span>
                </span>
                <span className="ds-body-sm hidden text-fg-muted md:block">
                  {sv.summary}
                </span>
                <span className="hidden items-center justify-end text-fg-subtle transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-accent md:flex">
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
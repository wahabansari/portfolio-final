import Link from "next/link";
import { serviceGroups, services } from "@/content/services";
import { ArrowIcon, Reveal, Section, SectionHeading } from "./ui";
import { cn } from "@/lib/cn";

/**
 * The services display, tiered.
 *
 * Six services presented as six identical cards is a catalogue, and a
 * catalogue makes the buyer do the ranking. This leads with the core offering
 * at full width and groups the rest underneath by the kind of engagement they
 * are — the same three groups the mega-menu uses, so a visitor who opened the
 * menu already has the model.
 *
 * The grouping is not a quality ranking. "Specialized" is where the highest
 * intent lives (the migration page is the strongest entry point this site
 * has); it is grouped separately because it is a different shape of
 * engagement, not because it matters less.
 */

const [primaryService] = services;

function ServiceLink({
  slug,
  title,
  summary,
  source,
}: {
  slug: string;
  title: string;
  summary: string;
  source: string;
}) {
  return (
    <Link
      href={`/services/${slug}`}
      data-track="cta_click"
      data-track-label={`${source}:${slug}`}
      className="group flex h-full flex-col rounded-[var(--radius-md)] p-5 transition-colors hover:bg-surface"
    >
      <span className="flex items-center gap-1.5 font-display text-[1rem] font-medium text-ink transition-colors group-hover:text-accent">
        {title}
        <ArrowIcon className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-[translate,opacity] duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
      </span>
      <span className="ds-body-sm mt-1.5 block">{summary}</span>
    </Link>
  );
}

/** The lead card — the offering everything else on the site supports. */
function PrimaryServiceCard({ source }: { source: string }) {
  return (
    <Reveal>
      <Link
        href={`/services/${primaryService.slug}`}
        data-track="cta_click"
        data-track-label={`${source}:${primaryService.slug}`}
        className="ds-card ds-card-interactive group block overflow-hidden p-7 md:p-9"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <span className="ds-chip ds-chip-accent">{primaryService.eyebrow}</span>
            <h3 className="ds-h3 mt-5 transition-colors group-hover:text-accent">
              {primaryService.title}
            </h3>
            <p className="ds-body mt-4 max-w-2xl">{primaryService.definition}</p>
            <span className="ds-link mt-7">
              {primaryService.cta.primaryLabel}
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </div>

          <div className="lg:col-span-5">
            <p className="ds-meta">Typically includes</p>
            <ul className="mt-4 space-y-2.5 border-t border-border pt-4">
              {primaryService.deliverables.slice(0, 4).map((d) => (
                <li key={d.title} className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span className="text-[0.9375rem] leading-relaxed text-ink-muted">{d.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/** The remaining five, grouped by engagement type. */
function ServiceGroups({ source }: { source: string }) {
  return (
    <div className="mt-6 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border lg:grid-cols-3">
      {serviceGroups.map((group, i) => {
        const items = group.items.filter((s) => s.slug !== primaryService.slug);
        if (items.length === 0) return null;

        return (
          <Reveal key={group.tier} delay={i * 0.05} className="bg-card p-6 md:p-7">
            <p className="ds-meta">{group.label}</p>
            <ul className="mt-3 -mx-5">
              {items.map((sv) => (
                <li key={sv.slug}>
                  <ServiceLink
                    slug={sv.slug}
                    title={sv.title}
                    summary={sv.summary}
                    source={source}
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        );
      })}
    </div>
  );
}

/** Homepage block. */
export function ServicesOverview({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="services" tone={tone}>
      <SectionHeading
        overline="What I do"
        title="One core offering, and the work that surrounds it"
        description="Every engagement is production frontend delivery. What changes is the shape — a new product, a rebuild, a migration, or capacity behind your brand."
        align="between"
        aside={
          <Link href="/services" className="ds-btn ds-btn-secondary">
            Compare services
            <ArrowIcon />
          </Link>
        }
      />
      <PrimaryServiceCard source="home" />
      <ServiceGroups source="home" />
    </Section>
  );
}

/**
 * /services hub — the full set as rows, grouped by tier.
 *
 * Rows rather than a card grid: the ordering is information here, and rows let
 * the eye run down titles without a card boundary interrupting every line.
 */
export function ServicesList() {
  return (
    <Section tone="plain">
      <div className="space-y-14">
        {serviceGroups.map((group) => (
          <div key={group.tier}>
            <div className="flex items-baseline justify-between gap-6">
              <h2 className="ds-meta">{group.label}</h2>
              <span className="ds-meta">
                {group.items.length} {group.items.length === 1 ? "service" : "services"}
              </span>
            </div>

            <ul className="mt-5 border-t border-border">
              {group.items.map((service, i) => (
                <Reveal as="li" key={service.slug} delay={i * 0.04}>
                  <Link
                    href={`/services/${service.slug}`}
                    data-track="cta_click"
                    data-track-label={`hub:${service.slug}`}
                    className="group grid grid-cols-1 items-baseline gap-x-8 gap-y-3 border-b border-border py-7 transition-colors hover:bg-surface md:grid-cols-12 md:py-8"
                  >
                    <span className="md:col-span-5 md:pl-2">
                      <span
                        className={cn(
                          "ds-h3 block text-ink transition-colors group-hover:text-accent",
                        )}
                      >
                        {service.title}
                      </span>
                      <span className="ds-meta mt-2 block">{service.eyebrow}</span>
                    </span>

                    <span className="ds-body md:col-span-6">{service.summary}</span>

                    <span className="flex md:col-span-1 md:justify-end md:pr-2">
                      <span
                        aria-hidden
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-soft transition-[border-color,color,translate] duration-200 group-hover:translate-x-0.5 group-hover:border-accent group-hover:text-accent"
                      >
                        <ArrowIcon />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

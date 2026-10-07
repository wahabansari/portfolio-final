import Link from "next/link";
import { services, type Service } from "@/content/services";
import { ServicesShowcase, type ShowcaseService } from "./services-showcase";
import { ArrowIcon, CodeIcon, LayoutIcon, RefreshIcon, SparklesIcon, Reveal, Section, SectionHeading } from "./ui";

// Service slug → icon mapping. Exported so anything routing to the same
// service topic (e.g. the problem selector, an Insight's `relatedServiceSlug`)
// can reuse the exact same icon rather than maintaining a second, driftable mapping.
export const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "custom-web-development": CodeIcon,
  "business-dashboards": LayoutIcon,
  "software-modernization": RefreshIcon,
  "ai-business-automation": SparklesIcon,
};

/**
 * One service as an editorial row: a large numeral, the name and summary, an
 * optional "best for" line and the link, separated from its neighbours only by
 * a rule. Used by the homepage (`compact`) and the /services hub. The whole
 * row is the link.
 */
function ServiceRow({
  service,
  track,
  compact = false,
}: {
  service: Service;
  track: string;
  compact?: boolean;
}) {
  const Icon = SERVICE_ICONS[service.slug] || CodeIcon;
  const fit = service.idealFor[0];
  return (
    <Link
      href={`/services/${service.slug}`}
      data-track="cta_click"
      data-track-label={track}
      className="group -mx-4 grid items-center gap-x-8 gap-y-3 rounded-3xl px-4 py-6 transition-colors duration-200 hover:bg-accent-soft md:grid-cols-12 md:py-7"
    >
      <span className="flex items-center gap-4 md:col-span-5">
        <span className="font-display text-[2.5rem] leading-none font-bold tracking-[-0.03em] text-accent-hairline tabular-nums transition-colors duration-200 group-hover:text-accent md:text-[3.25rem]">
          {service.index}
        </span>
        <span className="flex min-w-0 items-center gap-3">
          <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent sm:flex">
            <Icon className="h-5 w-5" />
          </span>
          <span className="ds-h3 transition-colors duration-200 group-hover:text-accent">{service.title}</span>
        </span>
      </span>

      <span className="md:col-span-6">
        <span className="ds-body-sm block">{service.summary}</span>
        {!compact && (
          <span className="ds-body-sm mt-2 block">
            <span className="font-medium text-fg">Best for: </span>
            {fit.charAt(0).toLowerCase() + fit.slice(1)}
            {fit.endsWith(".") ? "" : "."}
          </span>
        )}
      </span>

      <span
        aria-hidden
        className="hidden h-10 w-10 items-center justify-center justify-self-end rounded-full border border-border text-accent transition-all duration-200 group-hover:translate-x-0.5 group-hover:border-accent group-hover:bg-accent-deep group-hover:text-accent-fg md:col-span-1 md:flex"
      >
        <ArrowIcon className="h-4 w-4" />
      </span>
    </Link>
  );
}

function RowList({ track, compact }: { track: string; compact?: boolean }) {
  return (
    <ul className="mx-auto max-w-6xl border-b border-border">
      {services.map((sv, i) => (
        <Reveal as="li" key={sv.slug} delay={i * 0.05} className="border-t border-border">
          <ServiceRow service={sv} track={`${track}:${sv.slug}`} compact={compact} />
        </Reveal>
      ))}
    </ul>
  );
}

/** Homepage: the four services as a selector (list on the left, detail on the right). */
export function ServicesOverview({ tone = "plain" }: { tone?: "plain" | "soft" | "deep" }) {
  const items: ShowcaseService[] = services.map((sv) => {
    const fit = sv.idealFor[0];
    return {
      slug: sv.slug,
      index: sv.index,
      title: sv.title,
      shortTitle: sv.shortTitle,
      eyebrow: sv.eyebrow,
      summary: sv.summary,
      bestFor: `${fit.charAt(0).toLowerCase()}${fit.slice(1)}${fit.endsWith(".") ? "" : "."}`,
      gets: sv.deliverables.slice(0, 3).map((d) => d.title),
    };
  });

  return (
    <Section id="services" tone={tone}>
      <Reveal className="mx-auto mb-8 flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="ds-overline-accent block">Services</span>
          <h2 className="mt-3 text-[1.75rem] leading-tight font-bold tracking-[-0.025em] text-fg md:text-[2rem]">
            Four ways we can help
          </h2>
        </div>
        <Link href="/services" className="ds-link shrink-0 text-[0.9375rem]">
          Compare all services
          <ArrowIcon className="h-3 w-3" />
        </Link>
      </Reveal>
      <Reveal delay={0.05}>
        <ServicesShowcase items={items} />
      </Reveal>
    </Section>
  );
}

/** /services hub: the four services, with who each one is for. */
export function ServicesList() {
  return (
    <Section tone="plain">
      <SectionHeading
        overline="The services"
        title="Four services, one way of working"
        description="Pick the one closest to your situation. Each page explains what we build, what you get and how the engagement runs."
      />
      <RowList track="hub" />
    </Section>
  );
}

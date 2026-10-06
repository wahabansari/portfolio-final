import Link from "next/link";
import { serviceGroups, type Service } from "@/content/services";
import { ArrowIcon, CodeIcon, GaugeIcon, LayoutIcon, RefreshIcon, UsersIcon, LayersIcon, SparklesIcon, Reveal, Section, SectionHeading } from "./ui";

// Service slug → icon mapping. Exported so anything routing to the same
// service topic (e.g. an Insights article's `relatedServiceSlug`) can reuse
// the exact same icon rather than maintaining a second, driftable mapping.
export const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "frontend-product-engineering": CodeIcon,
  "website-redesign-rebuild": LayoutIcon,
  "performance-engineering": GaugeIcon,
  "wordpress-to-nextjs-migration": RefreshIcon,
  "agency-frontend-development": UsersIcon,
  "saas-product-development": LayersIcon,
  "ai-product-integration": SparklesIcon,
};

/**
 * A horizontal service card for the /services hub: icon, title, summary, the
 * first "good fit" line, then a footer of real counts pulled from the
 * service itself. The whole card is the link.
 */
function ServiceCard({ service, track }: { service: Service; track: string }) {
  const Icon = SERVICE_ICONS[service.slug] || CodeIcon;
  const fit = service.idealFor[0];
  return (
    <Link
      href={`/services/${service.slug}`}
      data-track="cta_click"
      data-track-label={track}
      className="group ds-card ds-card-interactive flex h-full flex-col gap-5 p-6 sm:flex-row sm:p-7"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-accent-fg">
        <Icon className="h-5 w-5" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="ds-h3 transition-colors duration-200 group-hover:text-accent">
          {service.title}
        </span>
        <span className="ds-body-sm mt-2.5 text-fg-muted">{service.summary}</span>
        <span className="ds-body-sm mt-4 block">
          <span className="font-medium text-fg">Best for: </span>
          {fit.charAt(0).toLowerCase() + fit.slice(1)}.
        </span>
        <span className="mt-auto flex items-center gap-2 pt-6">
          <span className="ds-chip">{service.deliverables.length} deliverables</span>
          <span className="ds-chip">{service.engagement.length}-step process</span>
          <span
            aria-hidden
            className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-fg-subtle transition-all duration-200 group-hover:translate-x-0.5 group-hover:border-accent group-hover:text-accent"
          >
            <ArrowIcon className="h-3.5 w-3.5" />
          </span>
        </span>
      </span>
    </Link>
  );
}

/**
 * /services hub — the full set, grouped by engagement tier. Each group is a
 * two-part row: the tier label and its count on the left, the group's cards
 * stacked on the right, so a buyer can discard a whole kind of engagement
 * without reading its cards.
 */
export function ServicesList() {
  return (
    <Section tone="plain">
      <SectionHeading
        overline="All services"
        title="What I take on"
        description="Seven services grouped by the kind of engagement each one is, so you can rule most of them out in one pass."
      />

      <div className="mx-auto max-w-6xl space-y-14 md:space-y-16">
        {serviceGroups.map((group) => (
          <div key={group.tier} className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <span className="ds-overline-accent">
                  {group.items.length} {group.items.length === 1 ? "service" : "services"}
                </span>
                <h3 className="ds-h3 mt-3">{group.label}</h3>
              </div>
            </div>
            <ul className="grid gap-6 lg:col-span-9">
              {group.items.map((sv, i) => (
                <Reveal as="li" key={sv.slug} delay={i * 0.05}>
                  <ServiceCard service={sv} track={`hub:${sv.slug}`} />
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

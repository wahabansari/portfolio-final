import Link from "next/link";
import { services, serviceGroups, TIER_LABEL, type Service } from "@/content/services";
import { cn } from "@/lib/cn";
import { ArrowIcon, CodeIcon, GaugeIcon, LayoutIcon, RefreshIcon, UsersIcon, LayersIcon, SparklesIcon, Reveal, Section } from "./ui";

/**
 * The four commercial headline offers. These lead the homepage ledger because
 * they are what a buyer actually chooses between; the rest of the catalogue
 * supports them. The set drives grouping only — display order follows the
 * catalogue (services.ts) itself, so the two can never disagree.
 */
const COMMERCIAL_SLUGS = new Set([
  "frontend-product-engineering",
  "saas-product-development",
  "wordpress-to-nextjs-migration",
  "performance-engineering",
]);

// Service slug → icon mapping
const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "frontend-product-engineering": CodeIcon,
  "website-redesign-rebuild": LayoutIcon,
  "performance-engineering": GaugeIcon,
  "wordpress-to-nextjs-migration": RefreshIcon,
  "agency-frontend-development": UsersIcon,
  "saas-product-development": LayersIcon,
  "ai-product-integration": SparklesIcon,
};

/**
 * One of the four headline offers, as a column in a single ledger row.
 * Stacked on mobile, one unbroken row of four from `md` up — jumping
 * straight from one column to four (skipping an intermediate two-column
 * step) means the dividers never have to describe a wrapped grid, so a
 * plain `divide-x`/`divide-y` pair is enough and never looks uneven.
 * Content is a short, single column: icon + index, title, summary, then
 * the tier pinned to the bottom — no oversized ghost numeral fighting the
 * icon for the same corner.
 */
function OfferBlock({ service, index }: { service: Service; index: number }) {
  const Icon = SERVICE_ICONS[service.slug] || CodeIcon;
  return (
    <Link
      href={`/services/${service.slug}`}
      data-track="cta_click"
      data-track-label={`home-services:${service.slug}`}
      className="group flex h-full flex-col p-8 transition-colors duration-200 hover:bg-accent-soft/40 md:p-9"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-accent-fg">
          <Icon className="h-5 w-5" />
        </span>
        <span
          aria-hidden
          className="font-display text-[0.9375rem] font-semibold text-ink-soft tabular-nums"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 font-display text-[1.375rem] font-bold leading-[1.2] tracking-[-0.02em] text-fg transition-colors duration-200 group-hover:text-accent md:text-[1.5rem]">
        {service.title}
      </h3>
      <p className="ds-body-sm mt-3 text-fg-muted">{service.summary}</p>
      <span className="mt-auto flex items-center gap-3 pt-6">
        <span className="ds-chip">{TIER_LABEL[service.tier]}</span>
        <span className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-fg-subtle transition-all duration-200 group-hover:translate-x-0.5 group-hover:border-accent group-hover:text-accent">
          <ArrowIcon className="h-3.5 w-3.5" />
        </span>
      </span>
    </Link>
  );
}

/**
 * One ledger row, shared by the homepage overview and the /services hub so
 * the two never drift apart: index numeral in the display face, large title,
 * one-line summary, tier label and an arrow. The whole row is the link.
 */
function ServiceRow({
  service,
  index,
  track,
  featured = false,
}: {
  service: Service;
  index: number;
  track: string;
  featured?: boolean;
}) {
  const Icon = SERVICE_ICONS[service.slug] || CodeIcon;
  return (
    <Link
      href={`/services/${service.slug}`}
      data-track="cta_click"
      data-track-label={track}
      className={cn(
        "group grid grid-cols-[40px_48px_minmax(0,1fr)_auto] items-center gap-x-4 border-b border-border py-7 transition-colors duration-200 hover:bg-surface-hover md:grid-cols-[56px_64px_minmax(0,1fr)_auto] md:px-5 md:py-8",
        featured && "bg-accent-soft/40",
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center h-10 w-10 rounded-xl text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-accent-fg",
          featured ? "bg-bg/80" : "bg-accent-soft",
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="font-display text-[1.25rem] font-semibold tabular-nums tracking-[-0.02em] text-fg-subtle transition-colors duration-200 group-hover:text-accent md:text-[1.5rem]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[1.375rem] font-semibold leading-[1.15] tracking-[-0.02em] text-fg transition-colors duration-200 group-hover:text-accent md:text-[1.5rem]">
          {service.title}
        </span>
        <span className="ds-meta mt-2 block md:hidden">{TIER_LABEL[service.tier]}</span>
        <span className="ds-body-sm mt-2 block max-w-xl text-fg-muted md:mt-1.5">
          {service.summary}
        </span>
      </span>
      <span className="flex items-center gap-3 md:pl-8">
        <span className="ds-chip hidden md:inline-flex">{TIER_LABEL[service.tier]}</span>
        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-fg-subtle transition-all duration-200 group-hover:translate-x-0.5 group-hover:border-accent group-hover:text-accent"
        >
          <ArrowIcon className="h-4 w-4" />
        </span>
      </span>
    </Link>
  );
}

/**
 * Homepage — the commercial layer. The four headline offers first, in
 * catalogue order, then the supporting services behind a quiet divider.
 * Single-column ledger, hairline-separated, hover reads as accent.
 */
export function ServicesOverview({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  const offers = services.filter((s) => COMMERCIAL_SLUGS.has(s.slug));
  const supporting = services.filter((s) => !COMMERCIAL_SLUGS.has(s.slug));

  return (
    <Section id="services" tone={tone}>
      <div className="max-w-2xl border-b-2 border-accent pb-8">
        <span className="ds-overline-accent block">What I do</span>
        <h2 className="ds-h2 mt-5">Four offers, one accountable engineer</h2>
        <p className="ds-body-lg mt-6 text-fg-muted">
          Frontend development, product engineering, WordPress → Next.js migration and
          performance optimisation — the four engagements I lead with, followed by the
          services that support them.
        </p>
      </div>

      <div className="grid divide-y divide-border border-y border-border md:grid-cols-4 md:divide-x md:divide-y-0">
        {offers.map((sv, i) => (
          <Reveal key={sv.slug} delay={i * 0.05} className="h-full">
            <OfferBlock service={sv} index={i} />
          </Reveal>
        ))}
      </div>

      <ul className="mt-14 border-t border-border md:mt-16">
        {supporting.map((sv, i) => (
          <Reveal as="li" key={sv.slug} delay={i * 0.04}>
            <ServiceRow service={sv} index={offers.length + i} track={`home-services:${sv.slug}`} />
          </Reveal>
        ))}
      </ul>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="ds-body-sm text-fg-muted">
          Every service page states who it is for, what it includes and where the scope ends.
        </p>
        <Link href="/services" className="ds-link shrink-0">
          Compare all {services.length} services
          <ArrowIcon className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}

/** /services hub — the full set, faceted by engagement tier. */
export function ServicesList() {
  return (
    <Section tone="plain">
      <div className="max-w-2xl">
        <span className="ds-overline block">Services</span>
        <h2 className="ds-h2 mt-5">What I take on</h2>
        <p className="ds-body-lg mt-6 text-fg-muted">
          Seven services grouped by the kind of engagement each one is, so a buyer scanning
          the list can discard most of it in one pass.
        </p>
      </div>

      <div className="mt-14 space-y-14 md:mt-16">
        {serviceGroups.map((group) => (
          <div key={group.tier}>
            <div className="mb-5 flex items-center gap-4 border-t border-border pt-6">
              <h3 className="ds-h3">{group.label}</h3>
              <span className="ds-meta">{group.items.length}</span>
              <span aria-hidden className="ds-hairline hidden flex-1 sm:block" />
            </div>
            <ul>
              {group.items.map((sv, i) => (
                <Reveal as="li" key={sv.slug} delay={i * 0.04}>
                  <ServiceRow service={sv} index={i} track={`hub:${sv.slug}`} />
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
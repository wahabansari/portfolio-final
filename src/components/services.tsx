import Link from "next/link";
import { services, type Service } from "@/content/services";
import { problemPaths } from "@/content/site";
import { SERVICE_ICONS } from "./service-icons";
import { ArrowIcon, CodeIcon, Reveal, Section, SectionHeading } from "./ui";

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
        <span className="ds-h4 transition-colors duration-200 group-hover:text-accent">{service.title}</span>
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

/**
 * Homepage: the four services as bento cards. Each card opens with the
 * buyer's own sentence (`problemPaths`) and lands on the service that fits —
 * the problem selector and the service list collapsed into one routing tile,
 * because they were the same four destinations twice.
 */
export function ServicesOverview({ tone = "plain" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="services" tone={tone}>
      <SectionHeading
        title="Four ways we can help"
        description="Each card opens with the situation the way you would say it, and names the service underneath."
      />
      <ul className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 md:gap-5">
        {services.map((sv, i) => {
          const Icon = SERVICE_ICONS[sv.slug] ?? CodeIcon;
          const path = problemPaths.find((p) => p.href === `/services/${sv.slug}`);
          return (
            <Reveal as="li" key={sv.slug} delay={i * 0.05} className="h-full">
              <Link
                href={`/services/${sv.slug}`}
                data-track="cta_click"
                data-track-label={`home-service:${sv.slug}`}
                className="group ds-card ds-card-interactive flex h-full flex-col p-6 md:p-7"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-[2rem] leading-none font-bold tracking-[-0.03em] text-accent-hairline tabular-nums transition-colors duration-200 group-hover:text-accent">
                    {sv.index}
                  </span>
                </span>
                <h3 className="ds-h3 mt-5">{path?.problem ?? sv.shortTitle}</h3>
                <p className="ds-body-sm mt-2.5">{sv.summary}</p>
                <span className="ds-link mt-auto pt-6 text-[0.9375rem]">
                  {sv.shortTitle}
                  <ArrowIcon className="h-3 w-3" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
      <div className="mt-8 text-center">
        <Link href="/services" className="ds-link text-[0.9375rem]">
          Compare all services
          <ArrowIcon className="h-3 w-3" />
        </Link>
      </div>
    </Section>
  );
}

/** /services hub: the four services, with who each one is for. */
export function ServicesList() {
  return (
    <Section tone="soft">
      <SectionHeading
        overline="The services"
        title="Four services, one way of working"
        description="Pick the one closest to your situation. Each page explains what we build, what you get and how the engagement runs."
      />
      <RowList track="hub" />
    </Section>
  );
}

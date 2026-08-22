import Link from "next/link";
import { services, site, type Service } from "@/content/site";
import { ArrowIcon, Reveal, Section, SectionHeading } from "./ui";

const ACCENTS: Record<Service["accent"], string> = {
  blue: "var(--color-g-blue)",
  red: "var(--color-g-red)",
  yellow: "var(--color-g-yellow)",
  green: "var(--color-g-green)",
};

export function Services() {
  return (
    <Section id="services" tone="grey">
      <SectionHeading
        overline="Services"
        title="What I can build for you"
        description="Available for full-time roles, and for freelance and contract projects. Four things I take on most often — all of them work I already do in production."
        aside={
          <Link href="/services" className="g-link">
            All services
            <ArrowIcon className="h-4 w-4" />
          </Link>
        }
      />

      <ul className="grid gap-6 md:grid-cols-2">
        {services.map((service, i) => (
          <Reveal as="li" key={service.slug} delay={(i % 2) * 0.06} className="h-full">
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </ul>

      {/* Closing call to action for the client half of the audience. */}
      <Reveal delay={0.12}>
        <div className="g-card-plain mt-10 flex flex-col gap-6 p-8 md:mt-12 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h3 className="g-title">Have a project in mind?</h3>
            <p className="g-body mt-2 max-w-lg">
              Tell me what you&apos;re building and I&apos;ll come back with an approach, a
              timeline and a price. No obligation.
            </p>
          </div>
          {/* Full width on phones, side by side from sm up. */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/#contact" className="g-btn g-btn-filled w-full sm:w-auto sm:shrink-0">
              Start a project
              <ArrowIcon />
            </Link>
            <a
              href={site.resumeHref}
              className="g-btn g-btn-outlined w-full sm:w-auto sm:shrink-0"
            >
              Download résumé
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const accent = ACCENTS[service.accent];
  /* Categories with a page behind them become links; the rest stay plain
     until their pages exist. */
  const Wrapper = service.href ? Link : "div";
  const wrapperProps = service.href ? { href: service.href } : {};

  return (
    <article className="g-card-plain flex h-full flex-col p-7 md:p-8">
      <Wrapper {...(wrapperProps as { href: string })} className="group flex h-full flex-col">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ background: accent }}
          />
          <h3 className="g-title">{service.title}</h3>
        </div>

        <p className="g-body mt-4">{service.blurb}</p>

          <ul className="mt-6 space-y-3 border-t border-border pt-6">
        {service.includes.map((item) => (
          <li key={item} className="grid grid-cols-[1.125rem_1fr] gap-x-3">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mt-0.5 shrink-0"
              style={{ color: accent }}
              aria-hidden
            >
              <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
            <span className="text-[0.9375rem] leading-relaxed text-ink">{item}</span>
          </li>
        ))}
        </ul>

        {service.href && (
          <span className="g-link mt-auto pt-6">
            Explore {service.title.toLowerCase()}
            <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        )}
      </Wrapper>
    </article>
  );
}

import Link from "next/link";
import { services } from "@/content/services";
import { ArrowIcon, Reveal, Section, SectionHeading } from "./ui";

/**
 * The services list. Rows rather than a card grid: five services read as an
 * ordered set of choices this way, and the ordering itself is information —
 * it says which one is the primary offering.
 */
function ServiceRows({ dense = false }: { dense?: boolean }) {
  return (
    <ul className="border-t border-border">
      {services.map((service, i) => (
        <Reveal as="li" key={service.slug} delay={i * 0.04}>
          <Link
            href={`/services/${service.slug}`}
            className="group grid grid-cols-1 items-baseline gap-x-8 gap-y-3 border-b border-border py-7 transition-colors hover:bg-surface md:grid-cols-12 md:py-8"
          >
            <span
              aria-hidden
              className="ds-meta text-accent md:col-span-1 md:pl-2"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="md:col-span-4">
              <span className="ds-h3 block text-ink transition-colors group-hover:text-accent">
                {service.title}
              </span>
              {!dense && (
                <span className="ds-meta mt-2 block normal-case">{service.eyebrow}</span>
              )}
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
  );
}

/** Homepage block. */
export function ServicesOverview({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="services" tone={tone}>
      <SectionHeading
        overline="What I do"
        title="Five services, not a capability list"
        description="Each one is a distinct engagement with its own scope, process and proof. The page for each states who it is for, what it includes, and where the scope ends."
        align="between"
        aside={
          <Link href="/services" className="ds-btn ds-btn-secondary">
            Compare services
            <ArrowIcon />
          </Link>
        }
      />
      <ServiceRows />
    </Section>
  );
}

/** /services hub — the same rows, without the section heading around them. */
export function ServicesList() {
  return (
    <Section tone="plain">
      <ServiceRows />
    </Section>
  );
}

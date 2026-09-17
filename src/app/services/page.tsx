import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ServicesList } from "@/components/services";
import { Process } from "@/components/about";
import { ServicesIndexJsonLd } from "@/components/json-ld";
import { ArrowIcon, CtaBand, PageHeader, Reveal, Section, SectionHeading } from "@/components/ui";
import { services, servicesHub } from "@/content/services";
import { process } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: servicesHub.metaTitle,
  description: servicesHub.metaDescription,
  path: "/services",
});

/**
 * The services hub is a routing page, not a catalogue. Its job is to get a
 * buyer into the right detail page in one decision — which is why the headline
 * copy leads with the four commercial offers, the faceted list groups served
 * engagements by kind, and the block below states the fit for each one in a
 * sentence.
 */
export default function ServicesPage() {
  return (
    <>
      <ServicesIndexJsonLd services={services} />
      <Nav />
      <main id="main">
        <PageHeader
          trail={[{ label: "Home", href: "/" }, { label: "Services" }]}
          eyebrow="Services"
          title={servicesHub.h1}
          lede={servicesHub.intro}
          intro={[servicesHub.note]}
          actions={
            <>
              <Link href="/contact" className="ds-btn ds-btn-primary">
                Discuss your project
                <ArrowIcon />
              </Link>
              <Link href="/work" className="ds-btn ds-btn-secondary">
                View work
              </Link>
            </>
          }
        />

        <ServicesList />

        <Section tone="soft">
          <SectionHeading
            overline="Choosing"
            title="Which one is yours?"
            description="If two of these look right, it is usually the first one — the others are shaped around a specific situation."
          />

          <ul className="grid border-t border-border sm:grid-cols-2">
            {services.map((service, i) => (
              <Reveal
                as="li"
                key={service.slug}
                delay={i * 0.03}
                className="border-b border-border py-7 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
              >
                <span className="font-display text-[1.75rem] font-semibold leading-none tracking-[-0.02em] text-ink-soft tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[1.0625rem] font-semibold leading-[1.3] tracking-[-0.01em] text-fg mt-3">
                  {service.title}
                </h3>
                <p className="ds-body-sm mt-3">
                  <span className="font-medium text-ink">Pick this if: </span>
                  {service.idealFor[0].charAt(0).toLowerCase() + service.idealFor[0].slice(1)}.
                </p>
                <Link href={`/services/${service.slug}`} className="ds-link mt-5">
                  {service.title}
                  <ArrowIcon className="h-3.5 w-3.5" />
                </Link>
              </Reveal>
            ))}
          </ul>
        </Section>

        <Process
          tone="plain"
          steps={process}
          overline="Process"
          title="How every engagement runs"
          description="The shape is the same whichever service applies. What changes is the depth of each step, not the order."
        />

        <CtaBand
          navy
          tone="soft"
          heading="Not sure which one applies?"
          body="Describe the problem rather than the service. I will tell you which of these fits, whether it is a smaller job than you think, and if it is something I should not be doing."
          primary={{ label: "Discuss your project", href: "/contact" }}
          secondary={{ label: "See the work first", href: "/work" }}
        />
      </main>
      <Footer />
    </>
  );
}

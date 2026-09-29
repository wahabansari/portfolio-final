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
          align="center"
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
            description="Find the sentence that sounds like your situation. If two fit, it is usually the first one — the others are shaped around a specific case."
          />

          <Reveal className="mx-auto max-w-4xl">
            <ul className="ds-card divide-y divide-border overflow-hidden">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex flex-col gap-3 px-6 py-5 transition-colors duration-200 hover:bg-surface-hover sm:flex-row sm:items-center sm:gap-6 sm:px-8"
                  >
                    <span className="ds-body-sm min-w-0 flex-1">
                      <span className="font-medium text-fg">If </span>
                      {service.idealFor[0].charAt(0).toLowerCase() + service.idealFor[0].slice(1)}.
                    </span>
                    <span className="flex shrink-0 items-center gap-3 text-[0.9375rem] font-medium text-accent">
                      {service.title}
                      <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
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

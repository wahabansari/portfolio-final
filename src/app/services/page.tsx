import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ServicesList } from "@/components/services";
import { ProcessTimeline } from "@/components/process";
import { WorkResults } from "@/components/home-sections";
import { ServicesIndexJsonLd } from "@/components/json-ld";
import { ArrowIcon, CtaBand, PageHeader, Reveal, Section, SectionHeading } from "@/components/ui";
import { getService, services, servicesHub } from "@/content/services";
import { process } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: servicesHub.metaTitle,
  description: servicesHub.metaDescription,
  path: "/services",
});

/**
 * The services hub is a routing page, not a catalogue. Its job is to get a
 * buyer into the right detail page in one decision: hero, the four services,
 * "which one fits your situation?", the shared process, relevant proof and a
 * single call to action. Agencies are an engagement model, not a fifth service,
 * so they are addressed in the "ways to work" block rather than the list.
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
          actions={
            <>
              <Link href="/contact" className="ds-btn ds-btn-primary">
                Start a project
                <ArrowIcon />
              </Link>
              <Link href="/work" className="ds-btn ds-btn-secondary">
                View our work
              </Link>
            </>
          }
        />

        <ServicesList />

        <Section tone="soft">
          <SectionHeading
            overline="Choosing"
            title={servicesHub.fit.heading}
            description={servicesHub.fit.description}
          />

          <Reveal className="mx-auto max-w-4xl">
            <ul className="ds-card divide-y divide-border overflow-hidden">
              {servicesHub.fit.rows.map((row) => {
                const service = getService(row.slug);
                if (!service) return null;
                return (
                  <li key={row.slug}>
                    <Link
                      href={`/services/${row.slug}`}
                      data-track="cta_click"
                      data-track-label={`fit:${row.slug}`}
                      className="group flex flex-col gap-3 px-6 py-5 transition-colors duration-200 hover:bg-surface-hover sm:flex-row sm:items-center sm:gap-6 sm:px-8"
                    >
                      <span className="ds-body-sm min-w-0 flex-1">{row.situation}</span>
                      <span className="flex shrink-0 items-center gap-3 text-[0.9375rem] font-medium text-accent">
                        {service.shortTitle}
                        <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </Section>

        <Section tone="plain">
          <SectionHeading overline="Engagement" title={servicesHub.ways.heading} />
          <ul className="mx-auto grid max-w-4xl overflow-hidden rounded-3xl border border-border bg-bg md:grid-cols-2">
            {servicesHub.ways.items.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 0.06}
                className="border-b border-border-subtle last:border-b-0 md:border-b-0 md:[&:not(:first-child)]:border-l"
              >
                <Link
                  href={item.cta.href}
                  data-track="cta_click"
                  data-track-label={`ways:${i}`}
                  className="group flex h-full flex-col p-7 transition-colors duration-200 hover:bg-accent-soft md:p-8"
                >
                  <h3 className="ds-h3">{item.title}</h3>
                  <p className="ds-body-sm mt-2 flex-1">{item.detail}</p>
                  <span className="ds-link mt-5 text-[0.9375rem]">
                    {item.cta.label}
                    <ArrowIcon className="h-3 w-3" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Section>

        <Section tone="soft">
          <SectionHeading
            overline="Process"
            title="How every engagement runs"
            description="Five steps, in this order, whichever service applies."
          />
          <ProcessTimeline steps={process} />
        </Section>

        <WorkResults tone="plain" />

        <CtaBand
          navy
          tone="soft"
          heading="Not sure which one applies?"
          body="Describe the problem rather than the service. We will tell you which of these fits, whether it is a smaller job than you think, and if it is something we should not be doing."
          primary={{ label: "Start a project", href: "/contact" }}
          secondary={{ label: "See the work first", href: "/work" }}
        />
      </main>
      <Footer />
    </>
  );
}

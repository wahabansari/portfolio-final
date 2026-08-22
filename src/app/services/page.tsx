import type { Metadata } from "next";
import Link from "next/link";
import { serviceCategories } from "@/content/services";
import { site } from "@/content/site";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ArrowIcon, Reveal, Section, SectionHeading } from "@/components/ui";
import { ACCENT_BG, PageHeader, ServicesIndexJsonLd } from "@/components/service-ui";

export const metadata: Metadata = {
  title: "Services — Frontend Development & AI Automation",
  description:
    "Frontend and AI automation services: React and Next.js interfaces, email templates, website and dashboard redesigns, UI/UX design, AI chatbots, RAG agents and n8n workflow automation.",
  keywords: [
    "frontend development services",
    "ai automation services",
    "n8n automation",
    "react developer for hire",
    "ui ux design services",
    "freelance web developer",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services — ${site.name}`,
    description:
      "Frontend development and AI automation services — interfaces, redesigns, chatbots and workflow automation.",
    url: `${site.url}/services`,
  },
};

export default function ServicesIndexPage() {
  return (
    <>
      <ServicesIndexJsonLd categories={serviceCategories} />
      <Nav />
      <main id="main">
        <PageHeader
          trail={[{ label: "Home", href: "/" }, { label: "Services" }]}
          overline="Services"
          title="Two things I build: interfaces, and the automation behind them."
          lede="Five years of production frontend work, extending into Node.js and AI automation. Available full-time, or for individual projects."
          actions={
            <>
              <Link href="/contact" className="g-btn g-btn-filled w-full sm:w-auto">
                Start a project
                <ArrowIcon />
              </Link>
              <Link href="/work" className="g-btn g-btn-outlined w-full sm:w-auto">
                See past work
              </Link>
            </>
          }
        />

        {/* Categories, each with its services listed inline */}
        {serviceCategories.map((category, i) => (
          <Section
            key={category.slug}
            id={category.slug}
            tone={i % 2 === 0 ? "plain" : "grey"}
          >
            <SectionHeading
              overline={category.shortTitle}
              title={category.title}
              description={category.intro[0]}
              aside={
                <Link href={`/services/${category.slug}`} className="g-link">
                  Category overview
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              }
            />

            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.services.map((service, n) => (
                <Reveal
                  as="li"
                  key={service.slug}
                  delay={(n % 3) * 0.05}
                  className="h-full"
                >
                  <Link
                    href={`/services/${category.slug}/${service.slug}`}
                    className={`${i % 2 === 0 ? "g-card-soft" : "g-card-plain"} group flex h-full flex-col p-7`}
                  >
                    <span
                      aria-hidden
                      className={`h-1 w-10 rounded-full ${ACCENT_BG[category.accent]}`}
                    />
                    <h3 className="g-title mt-5">{service.title}</h3>
                    <p className="g-body mt-3 flex-1 text-[0.9375rem]">{service.summary}</p>
                    <span className="g-link mt-6">
                      Learn more
                      <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Section>
        ))}

        {/* Closing CTA */}
        <Section tone="blue">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="g-h2">Not sure which you need?</h2>
              <p className="g-body-lg mt-5">
                Describe the problem rather than the solution and I&apos;ll tell you what would
                actually fix it — including when the answer is that you don&apos;t need me.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="g-btn g-btn-filled w-full sm:w-auto">
                  Get in touch
                  <ArrowIcon />
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="g-btn g-btn-outlined w-full sm:w-auto"
                >
                  Email me directly
                </a>
              </div>
            </div>
          </Reveal>
        </Section>
      </main>
      <Footer />
    </>
  );
}

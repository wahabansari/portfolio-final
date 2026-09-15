import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WorkIndex } from "@/components/work";
import { WorkIndexJsonLd } from "@/components/json-ld";
import { ArrowIcon, CtaBand, PageHeader } from "@/components/ui";
import { projects } from "@/content/work";
import { pageMetadata } from "@/lib/seo";

const description =
  "Selected React & Next.js production work and case studies across frontend engineering, performance optimization, web applications and Next.js architecture.";

export const metadata: Metadata = pageMetadata({
  title: "React & Next.js Projects & Case Studies",
  description,
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <WorkIndexJsonLd projects={projects} />
      <Nav />
      <main id="main">
        <PageHeader
          trail={[{ label: "Home", href: "/" }, { label: "Work" }]}
          eyebrow="Work"
          title="Selected work"
          lede="A focused selection of web products and interfaces I have designed, built, improved or migrated."
          intro={[
            "I prioritise production constraints, maintainability, responsive behaviour and the path from requirement to shipped feature. Where a project has a case study, it covers the problem, my role and the technical decisions rather than a screenshot and a stack list.",
            "Every project below is live and linked. Nothing here is a concept, a redesign exercise or a template.",
          ]}
          actions={
            <>
              <Link href="/contact" className="ds-btn ds-btn-primary">
                Discuss your project
                <ArrowIcon />
              </Link>
              <Link href="/services" className="ds-btn ds-btn-secondary">
                View services
              </Link>
            </>
          }
        />

        <WorkIndex />

        <CtaBand
          navy
          tone="plain"
          heading="Have something with a similar shape?"
          body="Send the product, the current site or the Figma file. I will tell you which of these is the closest comparison and what I would do differently for you."
          primary={{ label: "Discuss your project", href: "/contact" }}
          secondary={{ label: "View services", href: "/services" }}
        />
      </main>
      <Footer />
    </>
  );
}

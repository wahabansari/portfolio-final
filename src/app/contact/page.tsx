import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/contact";
import { PageJsonLd } from "@/components/json-ld";
import { ArrowIcon, Reveal, Section, SectionHeading } from "@/components/ui";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

const description =
  "Start a project, discuss an agency partnership or ask about a full-time role. Frontend product engineering in React, Next.js and TypeScript.";

export const metadata: Metadata = pageMetadata({
  title: "Contact | Start a Project",
  description,
  path: "/contact",
});

/**
 * Different visitors arrive here for different reasons, and a single "get in
 * touch" serves none of them well. The routing block names all four paths
 * explicitly so nobody has to work out whether the form is meant for them.
 */
const paths = [
  {
    who: "Product or company buyer",
    what: "A build, a rebuild, or frontend capacity on something already live.",
    label: "Start a project",
    href: "#contact",
    routed: false,
  },
  {
    who: "Agency",
    what: "White-label React and Next.js delivery behind your brand, under NDA.",
    label: "Discuss an agency partnership",
    href: "/services/agency-frontend-development",
    routed: true,
  },
  {
    who: "Recruiter or hiring manager",
    what: "Remote frontend and product engineering roles. The CV covers the detail.",
    label: "View résumé",
    /* A static asset, not a route — Link would try to client-navigate to it. */
    href: site.resumeHref,
    routed: false,
  },
  {
    who: "Technical collaborator",
    what: "Code, an idea, or a question that does not need a project attached.",
    label: "Email directly",
    href: `mailto:${site.email}`,
    routed: false,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageJsonLd
        name="Contact"
        path="/contact"
        description={description}
        trail={[
          { name: "Home", item: `${site.url}/` },
          { name: "Contact", item: `${site.url}/contact` },
        ]}
      />
      <Nav />
      <main id="main">
        <Contact tone="plain" level="h1" />

        <Section tone="soft">
          <SectionHeading
            overline="Routing"
            title="Whichever of these you are"
            description="Four reasons people land here. Each one has a different first step."
          />
          <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border md:grid-cols-2">
            {paths.map((path, i) => (
              <Reveal as="li" key={path.who} delay={i * 0.04} className="flex flex-col bg-card p-7">
                <p className="ds-meta">{path.who}</p>
                <p className="ds-body-sm mt-3 flex-1">{path.what}</p>
                {path.routed ? (
                  <Link href={path.href} className="ds-link mt-5">
                    {path.label}
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <a href={path.href} className="ds-link mt-5">
                    {path.label}
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </a>
                )}
              </Reveal>
            ))}
          </ul>
        </Section>
      </main>
      <Footer />
    </>
  );
}

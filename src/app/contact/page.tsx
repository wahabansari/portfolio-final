import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/contact";
import { PageJsonLd } from "@/components/json-ld";
import { ArrowIcon, CheckIcon, Reveal, Section, SectionHeading } from "@/components/ui";
import { assurances, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

const description =
  "Tell Wahab what you are building, improving or redesigning. Send a project brief for frontend engineering, website, SaaS or AI product work.";

export const metadata: Metadata = pageMetadata({
  title: "Contact | Hire a React & Next.js Developer",
  description,
  path: "/contact",
  absoluteTitle: true,
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
    label: "Discuss your project",
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
        action={{
          "@type": "ContactAction",
          target: `${site.url}/contact#contact`,
          result: { "@type": "Message", name: "Project enquiry" },
        }}
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
          <ul className="grid gap-4 md:grid-cols-2">
            {paths.map((path, i) => (
              <Reveal as="li" key={path.who} delay={i * 0.04} className="flex flex-col rounded-[var(--radius-card)] bg-card p-7">
                <p className="ds-meta">{path.who}</p>
                <p className="ds-body-sm mt-3 flex-1">{path.what}</p>
                {path.routed ? (
                  <Link href={path.href} className="ds-link mt-5">
                    {path.label}
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <a
                    href={path.href}
                    data-track={
                      path.href.startsWith("mailto:")
                        ? "email_click"
                        : path.href.endsWith(".pdf")
                          ? "resume_click"
                          : undefined
                    }
                    data-track-label="contact-routing"
                    className="ds-link mt-5"
                  >
                    {path.label}
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </a>
                )}
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* Risk reduction, stated where the decision is made. Each of these is
            a question a cautious buyer asks internally before enquiring, and
            leaving them unanswered is what makes an enquiry feel like a
            commitment rather than a conversation. */}
        <Section tone="plain">
          <SectionHeading
            overline="How the work runs"
            title="What you are agreeing to, before you agree to it"
            description="No engagement starts with a surprise. These four things are true of every project, whatever the service."
          />
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {assurances.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 0.04}
                className="flex flex-col rounded-[var(--radius-card)] bg-surface p-7"
              >
                <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                  <CheckIcon className="text-accent" />
                </span>
                <h3 className="ds-title-sm mt-4">{item.title}</h3>
                <p className="ds-body-sm mt-3 flex-1">{item.detail}</p>
              </Reveal>
            ))}
          </ul>
        </Section>
      </main>
      <Footer />
    </>
  );
}

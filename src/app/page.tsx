import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/work";
import { ServicesOverview } from "@/components/services";
import { AboutTeaser, Process } from "@/components/about";
import { Audiences, Principles } from "@/components/positioning";
import { HomeJsonLd } from "@/components/json-ld";
import { ArrowIcon, CtaBand, Faqs, Reveal, Section, SectionHeading } from "@/components/ui";
import { homeFaqs, process } from "@/content/site";

/**
 * Homepage.
 *
 * The section order is the argument: who I am, then proof, then who I work
 * with, then what I sell, then why me, then how it runs, then background, then
 * objections, then the ask. Proof sits above the services block deliberately —
 * a visitor should see evidence before a pitch.
 *
 * Capabilities, experience and credentials are on /about rather than here.
 * This page is a summary with routes behind it, not a copy of them, so the
 * homepage and its detail pages are not competing for the same queries.
 *
 * Band rhythm is set here rather than left to each component's default, so the
 * whole alternation is visible in one place. No two touching bands share a
 * fill — the hero closes on a soft proof strip, so Work opens plain and it
 * alternates from there.
 */
export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <Nav />
      <main id="main">
        <Hero />
        <SelectedWork tone="plain" />
        <Audiences tone="soft" />
        <ServicesOverview tone="plain" />
        <Principles tone="soft" />
        <Process tone="plain" steps={process} />
        <AboutTeaser tone="soft" />

        <Section id="faq" tone="plain">
          <SectionHeading
            overline="Questions"
            title="Before you get in touch"
            description="The things people actually ask first — about scope, fit, working arrangements and how the work runs."
            align="between"
            aside={
              <Link href="/contact" className="ds-btn ds-btn-secondary">
                Ask something else
                <ArrowIcon />
              </Link>
            }
          />
          <Reveal>
            <Faqs faqs={homeFaqs} className="mx-auto max-w-4xl" />
          </Reveal>
        </Section>

        <CtaBand
          tone="soft"
          heading="Have a product or website that needs a stronger frontend?"
          body="Send the product, the current site or the Figma file. I will reply with what I would build first, the approach I would take, and what I need in order to estimate it."
          primary={{ label: "Start a project", href: "/contact" }}
          secondary={{ label: "View my work", href: "/work" }}
        />
      </main>
      <Footer />
    </>
  );
}

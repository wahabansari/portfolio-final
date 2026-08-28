import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/work";
import { ServicesOverview } from "@/components/services";
import { AboutTeaser, Process } from "@/components/about";
import { Capabilities } from "@/components/skills";
import { Engagement } from "@/components/engagement";
import { Contact } from "@/components/contact";
import { HomeJsonLd } from "@/components/json-ld";
import { ArrowIcon, Faqs, Reveal, Section, SectionHeading } from "@/components/ui";
import { homeFaqs, process } from "@/content/site";

/**
 * Homepage.
 *
 * The order is the argument: identity, then proof, then what I sell, then how
 * it runs, then who I am, then the ways to work together, then objections,
 * then the ask. Proof sits above the services block deliberately — a visitor
 * should see evidence before a pitch.
 *
 * Each section is a summary with a route behind it rather than a copy of that
 * route's content, so the homepage and its detail pages are not competing for
 * the same queries.
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
        <ServicesOverview tone="soft" />
        <Process tone="plain" steps={process} />
        <AboutTeaser tone="soft" />
        <Capabilities tone="plain" />
        <Engagement tone="soft" />

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

        <Contact tone="soft" />
      </main>
      <Footer />
    </>
  );
}

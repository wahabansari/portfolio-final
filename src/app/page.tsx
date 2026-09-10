import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { ProblemSelector } from "@/components/problem-selector";
import { SelectedWork } from "@/components/work";
import { ServicesOverview } from "@/components/services";
import { Process } from "@/components/about";
import { TrustLayer } from "@/components/trust";
import { InsightsTeaser } from "@/components/insights";
import { Audiences, Principles } from "@/components/positioning";
import { HomeJsonLd } from "@/components/json-ld";
import { ArrowIcon, CtaBand, Faqs, Reveal, Section, SectionHeading } from "@/components/ui";
import { contactSteps, homeFaqs, process } from "@/content/site";

/**
 * Homepage.
 *
 * The section order is the journey: understand → self-select → see proof →
 * understand process → reduce risk → contact.
 *
 *   1. Hero + proof strip — who, what, for whom, and the evidence, in the
 *      first screen.
 *   2. Problem selector — the routing layer. A visitor names their situation
 *      in their own words and lands on the right service page without reading
 *      a catalogue first.
 *   3. Selected work — proof before pitch, deliberately above the services
 *      block. Evidence earns the right to sell.
 *   4. Who I work with — the three audiences, each routed.
 *   5. Services — the core offering at full width, the rest grouped.
 *   6. Why work with me — capability translated into buyer outcome.
 *   7. How I work — the five-step delivery model.
 *   8. Trust layer — the commitments, or testimonials once they exist.
 *   9. Insights — authority, with author and date visible.
 *   10. FAQ — objections, in the order buyers raise them.
 *   11. Final CTA — one action, with what happens next stated beside it.
 *
 * There is no About teaser here any more. It restated what /about says in
 * full, and on a page this long the duplicate was costing a scroll without
 * adding an argument — the nav and the footer both route there.
 *
 * Band rhythm is set here rather than left to each component's default, so the
 * whole alternation is visible in one place. No two touching bands share a
 * fill — the hero closes on a soft proof strip, so the selector opens plain
 * and it alternates from there.
 */
export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <Nav />
      <main id="main">
        <Hero />
        <ProblemSelector tone="plain" />
        <SelectedWork tone="soft" />
        <Audiences tone="plain" />
        <ServicesOverview tone="soft" />
        <Principles tone="plain" />
        <Process tone="soft" steps={process} />
        <TrustLayer tone="plain" />
        <InsightsTeaser tone="soft" />

        <Section id="faq" tone="plain">
          <SectionHeading
            overline="Questions"
            title="Before you get in touch"
            description="The things people actually ask first — about scope, fit, migrations, performance and how the work runs."
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
          heading="Tell me what you're building, or what's getting in the way."
          body="Send your current site, a Figma file, a repository, API notes or a short description of the problem. I'll review it and tell you what I would tackle first."
          primary={{ label: "Discuss your project", href: "/contact" }}
          secondary={{ label: "View selected work", href: "/work" }}
          steps={contactSteps}
        />
      </main>
      <Footer />
    </>
  );
}

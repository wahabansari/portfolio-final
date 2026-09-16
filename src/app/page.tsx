import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { ProofStrip } from "@/components/proof";
import { SelectedWork } from "@/components/work";
import { ServicesOverview } from "@/components/services";
import { AboutTeaser, Process } from "@/components/about";
import { ExperienceList } from "@/components/experience";
import { Capabilities } from "@/components/skills";
import { ContactCTA } from "@/components/contact";
import { HomeJsonLd } from "@/components/json-ld";
import { process } from "@/content/site";

/**
 * Homepage — premium proof wall for a senior product-minded engineer.
 *
 * Order: Hero → Proof strip → Selected work → Services → How I work →
 * Experience → Stack by capability → About → Final CTA.
 *
 * The first screen answers who/what/value; every section after earns the
 * next scroll with proof rather than claims. Bricolage Grotesque display
 * over Inter body; one indigo accent; light warm paper default.
 */
export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <Nav />
      <main id="main">
        <Hero />
        <ProofStrip tone="soft" />
        <SelectedWork tone="plain" />
        <ServicesOverview tone="soft" />
        <Process
          tone="plain"
          steps={process}
          overline="How I work"
          title="From product idea to shipped interface"
          description="Understand, shape, build, refine and ship. The shape is the same whichever service applies — what changes is the depth of each step, not the order."
        />
        <ExperienceList tone="soft" />
        <Capabilities tone="plain" />
        <AboutTeaser tone="soft" />
        <ContactCTA tone="deep" />
      </main>
      <Footer />
    </>
  );
}
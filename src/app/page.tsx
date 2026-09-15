import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/work";
import { ServicesOverview } from "@/components/services";
import { TrustLayer } from "@/components/trust";
import { ContactCTA } from "@/components/contact";
import { HomeJsonLd } from "@/components/json-ld";

/**
 * Homepage — research-backed minimal composition.
 *
 * Hero → Work → Services → Trust → Contact → Footer.
 * Typography IS the container. No cards, no shadows, no radius >2px.
 * 104px section rhythm. Oversized DM Serif Display for hierarchy.
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
        <TrustLayer tone="plain" />
        <ContactCTA tone="deep" />
      </main>
      <Footer />
    </>
  );
}
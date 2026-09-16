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
 * Inter throughout, weight contrast carries hierarchy. Monochrome base with
 * one indigo accent; surfaces are defined by a tint against the page
 * background (bg-surface on bg-bg) rather than a border or shadow. See
 * globals.css for the token set.
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
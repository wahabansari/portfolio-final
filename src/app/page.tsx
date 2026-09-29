import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/work";
import { ServicesOverview } from "@/components/services";
import { Process } from "@/components/about";
import { TrustLayer } from "@/components/trust";
import { HomeFaq } from "@/components/home-faq";
import { ContactCTA } from "@/components/contact";
import { HomeJsonLd } from "@/components/json-ld";
import { process } from "@/content/site";

/**
 * Homepage — a bento layout on a dark dot grid.
 *
 * Order: Hero (headline + proof tiles) → Selected work → Services → How I
 * work → Testimonials → FAQ → Contact. The proof figures live inside the
 * hero's bento grid rather than in a separate strip; experience and the
 * longer about story stay on /about.
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
        <Process
          tone="plain"
          steps={process}
          overline="How I work"
          title="From product idea to shipped interface"
          description="Understand, shape, build, refine and ship — the same five steps whichever service applies."
        />
        <TrustLayer tone="soft" />
        <HomeFaq tone="plain" />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

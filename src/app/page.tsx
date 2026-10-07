import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero, ProofBand } from "@/components/hero";
import { HomeClose, HowItWorks, ProblemPaths, WhyMe, WorkResults } from "@/components/home-sections";
import { ServicesOverview } from "@/components/services";
import { TrustLayer } from "@/components/trust";
import { HomeFaq } from "@/components/home-faq";
import { StickyCta } from "@/components/sticky-cta";
import { HomeJsonLd } from "@/components/json-ld";

/**
 * Homepage - built to convert, and short on purpose. In the order a buyer's
 * questions arrive: what is this (hero), can they be trusted (proof), is this
 * my problem (selector), has it been done (work), what is offered (services),
 * how does it run (process), why this studio (reasons), what do clients say
 * (testimonials), the objections (FAQ) and a clear next step (close). Each
 * section is an icon, a title and a line; the depth sits one click away on the
 * service, work and About pages.
 *
 * White and light bands alternate so two neighbours never share a fill.
 */
export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <Nav />
      <main id="main">
        <Hero />
        <ProofBand tone="soft" />
        <ProblemPaths tone="plain" />
        <WorkResults tone="soft" />
        <ServicesOverview tone="plain" />
        <HowItWorks tone="soft" />
        <WhyMe tone="plain" />
        <TrustLayer tone="soft" />
        <HomeFaq tone="plain" />
        <HomeClose tone="soft" />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}

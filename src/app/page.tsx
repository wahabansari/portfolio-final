import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero, ProofBand } from "@/components/hero";
import {
  HomeClose,
  HomeEngagement,
  HowItWorks,
  ProblemPaths,
  StackGrid,
  WhyMe,
  WorkResults,
} from "@/components/home-sections";
import { TrustLayer } from "@/components/trust";
import { HomeFaq } from "@/components/home-faq";
import { StickyCta } from "@/components/sticky-cta";
import { HomeJsonLd } from "@/components/json-ld";

/**
 * Homepage - built to convert. Everything a buyer needs to decide is on this
 * one page, in short pieces: who I am and the proof (hero, stats), whether I
 * solve their problem (problem paths), evidence (results, testimonials), how
 * it works (process, stack, commitments, engagement models), the objections
 * (FAQ), and a clear next step (close). Each section is an icon, a title and
 * a line; the depth sits one click away on the pages they link to.
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
        <HowItWorks tone="plain" />
        <StackGrid tone="soft" />
        <WhyMe tone="plain" />
        <HomeEngagement tone="soft" />
        <TrustLayer tone="plain" />
        <HomeFaq tone="soft" />
        <HomeClose tone="plain" />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}

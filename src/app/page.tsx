import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HomeClose, HowItWorks, WorkResults } from "@/components/home-sections";
import { ServicesOverview } from "@/components/services";
import { TrustLayer } from "@/components/trust";
import { HomeFaq } from "@/components/home-faq";
import { StickyCta } from "@/components/sticky-cta";
import { HomeJsonLd } from "@/components/json-ld";

/**
 * Homepage — the bento.
 *
 * Instead of alternating full-width bands, the middle of the page is one
 * continuous light canvas (`tone-soft`) of rounded tiles at mixed sizes,
 * the way a bento box mixes what sits on it:
 *
 *   hero     aurora opener on white: tinted statement panel, project stack,
 *            four proof stat tiles (the old proof band, absorbed)
 *   services four 2-up cards, each opening with the buyer's own sentence
 *            (the old problem selector and service list, collapsed into one)
 *   work     asymmetric grid: one wide lead case, two supporting cards
 *   process  the five-step timeline
 *   trust    testimonials and the three working assurances as one tile field
 *   faq      the objection card
 *   close    back to plain white, one tinted panel
 *
 * The buyer's questions still arrive in order — what is this, can they be
 * trusted, is this my problem, has it been done, how does it run, why this
 * studio, the objections, the next step — only the presentation is tiled.
 * Three fills, no fights: white hero, one gray canvas, white close; every
 * tile inside the canvas is a `ds-card`.
 */
export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <Nav />
      <main id="main">
        <Hero />
        <ServicesOverview tone="soft" />
        <WorkResults tone="soft" size="roomy" />
        <HowItWorks tone="soft" />
        <TrustLayer tone="soft" />
        <HomeFaq tone="soft" />
        <HomeClose tone="plain" size="roomy" />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}

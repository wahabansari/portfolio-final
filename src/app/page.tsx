import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";

/**
 * The landing page is deliberately short: hero, services, done. The detail
 * lives on its own routes so those pages rank for their own terms instead of
 * competing with a single page that repeats all of it.
 */
export default function Home() {
  return (
    <>
      <JsonLd />
      <Nav />
      <main id="main">
        <Hero />
        <Services />
      </main>
      <Footer />
    </>
  );
}

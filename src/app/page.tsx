import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Work } from "@/components/work";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";

/**
 * The home page runs each section in `preview` mode — a trimmed version with a
 * link through to the full route. That keeps the landing page complete without
 * republishing the detail pages word for word, which would leave the two
 * competing for the same search terms.
 */
export default function Home() {
  return (
    <>
      <JsonLd />
      <Nav />
      <main id="main">
        <Hero />
        <Services />
        <About preview />
        <Work preview />
        <Experience preview />
        <Skills preview />
        <Contact preview />
      </main>
      <Footer />
    </>
  );
}

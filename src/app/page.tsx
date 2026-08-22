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
        {/*
          Band rhythm, set here rather than left to each component's default so
          the whole sequence is visible in one place. No two touching bands
          share a fill: the hero closes on a grey stats strip, so Services has
          to open white and everything below alternates from there.

            hero      white  (closing on a grey strip)
            services  white -> grey handled by the strip above it
            about     grey
            work      white
            experience grey
            skills    white
            contact   blue   (the one accent band, at the end)
        */}
        <Hero />
        <Services tone="plain" />
        <About preview tone="grey" />
        <Work preview tone="plain" />
        <Experience preview tone="grey" />
        <Skills preview tone="plain" />
        <Contact preview />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AboutHero, AboutStory } from "@/components/about";
import { ExperienceList } from "@/components/experience";
import { Capabilities } from "@/components/skills";
import { Engagement } from "@/components/engagement";
import { ProfilePageJsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

const description =
  "Craftwise is a founder-led software studio in Lahore. Meet Muhammad Wahab Ansari: 5+ years of production React and Next.js, and a design background.";

export const metadata: Metadata = pageMetadata({
  title: "About Craftwise | Founder-led software development studio",
  description,
  path: "/about",
  type: "profile",
  absoluteTitle: true,
});

/**
 * Who is behind Craftwise? The founder, the story, the experience and the
 * skills behind the studio, then the two ways to work with it. The capability
 * inventory lives here rather than on the homepage.
 */
export default function AboutPage() {
  return (
    <>
      <ProfilePageJsonLd />
      <Nav />
      <main id="main">
        <AboutHero />
        <AboutStory tone="soft" />
        <ExperienceList tone="plain" />
        <Capabilities tone="soft" />
        <Engagement tone="plain" />
        <CtaBand
          navy
          tone="soft"
          heading="Have a project in mind?"
          body="Tell us what you are building, what needs to change, or where your current system is getting in the way."
          primary={{ label: "Start a project", href: "/contact" }}
          secondary={{ label: "View our work", href: "/work" }}
        />
      </main>
      <Footer />
    </>
  );
}

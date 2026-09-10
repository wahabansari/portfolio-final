import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/ui";
import { AboutNarrative } from "@/components/about";
import { ExperienceList } from "@/components/experience";
import { Capabilities } from "@/components/skills";
import { Credentials } from "@/components/credentials";
import { Engagement } from "@/components/engagement";
import { ProfilePageJsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/ui";
import { about } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

const description =
  "Learn about Wahab Ansari, a React & Next.js product engineer with 5+ years of production experience building web products.";

export const metadata: Metadata = pageMetadata({
  title: "About Wahab Ansari | React & Next.js Product Engineer",
  description,
  path: "/about",
  type: "profile",
  absoluteTitle: true,
});

export default function AboutPage() {
  return (
    <>
      <ProfilePageJsonLd />
      <Nav />
      <main id="main">
        <PageHeader
          trail={[{ label: "Home", href: "/" }, { label: "About" }]}
          eyebrow="About"
          title={about.h1}
          lede={about.statement}
        />
        <AboutNarrative />
        <ExperienceList tone="soft" />
        <Capabilities tone="plain" />
        <Engagement tone="soft" />
        <Credentials tone="plain" />
        <CtaBand
          tone="soft"
          heading="Hiring, or have something to build?"
          body="I am open to remote product roles, project and contract work, and agency frontend partnerships. Tell me which one this is and we can work out whether it fits."
          primary={{ label: "Work with me", href: "/contact" }}
          secondary={{ label: "View selected work", href: "/work" }}
        />
      </main>
      <Footer />
    </>
  );
}

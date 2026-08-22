import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHeader, PageJsonLd } from "@/components/service-ui";
import { Skills } from "@/components/skills";

export const metadata: Metadata = {
  title: "Skills — React, Next.js, Node.js & AI Automation",
  description: "The full technical stack: React, Next.js, TypeScript, Node.js, PostgreSQL, WordPress, n8n automation and design systems.",
  alternates: { canonical: "/skills" },
  openGraph: { title: "Skills — React, Next.js, Node.js & AI Automation", description: "The full technical stack: React, Next.js, TypeScript, Node.js, PostgreSQL, WordPress, n8n automation and design systems.", url: "/skills" },
};

export default function SkillsPage() {
  return (
    <>
      <PageJsonLd name="Skills" path="/skills" description={"The full technical stack: React, Next.js, TypeScript, Node.js, PostgreSQL, WordPress, n8n automation and design systems."} />
      <Nav />
      <main id="main">
        <PageHeader
          trail={[{ label: "Home", href: "/" }, { label: "Skills" }]}
          overline="Skills"
          title="Tools and technologies"
          lede="What I reach for, grouped by what it does."
        />
        <Skills hideHeading tone="plain" />
      </main>
      <Footer />
    </>
  );
}

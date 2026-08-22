import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
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
      <Nav />
      <main id="main" className="pt-6">
        <Skills />
      </main>
      <Footer />
    </>
  );
}

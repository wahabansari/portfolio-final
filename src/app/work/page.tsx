import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Work } from "@/components/work";

export const metadata: Metadata = {
  title: "Selected Work — Production Web Platforms",
  description: "Production platforms designed, built or migrated: e-commerce, marketplaces, healthcare portals and real estate CMS builds. All live and linked.",
  alternates: { canonical: "/work" },
  openGraph: { title: "Selected Work — Production Web Platforms", description: "Production platforms designed, built or migrated: e-commerce, marketplaces, healthcare portals and real estate CMS builds. All live and linked.", url: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-6">
        <Work />
      </main>
      <Footer />
    </>
  );
}

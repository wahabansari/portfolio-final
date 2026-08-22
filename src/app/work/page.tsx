import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHeader, PageJsonLd } from "@/components/service-ui";
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
      <PageJsonLd name="Work" path="/work" description={"Production platforms designed, built or migrated: e-commerce, marketplaces, healthcare portals and real estate CMS builds."} />
      <Nav />
      <main id="main">
        <PageHeader
          trail={[{ label: "Home", href: "/" }, { label: "Work" }]}
          overline="Work"
          title="Selected projects"
          lede="Production platforms I have designed, built or migrated. Every one is live and linked."
        />
        <Work hideHeading tone="plain" />
      </main>
      <Footer />
    </>
  );
}

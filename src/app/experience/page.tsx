import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHeader, PageJsonLd } from "@/components/service-ui";
import { Experience } from "@/components/experience";

export const metadata: Metadata = {
  title: "Experience — 5 Years in Frontend Engineering",
  description: "Five years across product engineering and interface design, including a 30% Core Web Vitals improvement on a production platform.",
  alternates: { canonical: "/experience" },
  openGraph: { title: "Experience — 5 Years in Frontend Engineering", description: "Five years across product engineering and interface design, including a 30% Core Web Vitals improvement on a production platform.", url: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageJsonLd name="Experience" path="/experience" description={"Five years across product engineering and interface design, including a 30% Core Web Vitals improvement on a production platform."} />
      <Nav />
      <main id="main">
        <PageHeader
          trail={[{ label: "Home", href: "/" }, { label: "Experience" }]}
          overline="Experience"
          title="Where I have worked"
          lede="Five years across product engineering and interface design."
        />
        <Experience hideHeading />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHeader, PageJsonLd } from "@/components/service-ui";
import { About } from "@/components/about";
import { Credentials } from "@/components/credentials";

export const metadata: Metadata = {
  title: "About Muhammad Wahab Ansari — Frontend Engineer",
  description: "Frontend engineer with 5 years building production React and Next.js applications, with a background in design systems and interface design.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Muhammad Wahab Ansari — Frontend Engineer", description: "Frontend engineer with 5 years building production React and Next.js applications, with a background in design systems and interface design.", url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageJsonLd name="About" path="/about" description={"Frontend engineer with 5 years building production React and Next.js applications, with a background in design systems and interface design."} />
      <Nav />
      <main id="main">
        <PageHeader
          trail={[{ label: "Home", href: "/" }, { label: "About" }]}
          overline="About"
          title="Design sensibility, engineering discipline"
          lede="I sit in the seam between design and engineering — where a Figma file becomes something a browser renders in under a second."
        />
        <About hideHeading />
        <Credentials tone="grey" />
      </main>
      <Footer />
    </>
  );
}

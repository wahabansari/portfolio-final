import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
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
      <Nav />
      <main id="main" className="pt-6">
        <Experience />
      </main>
      <Footer />
    </>
  );
}

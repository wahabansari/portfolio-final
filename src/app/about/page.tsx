import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
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
      <Nav />
      <main id="main" className="pt-6">
        <About />
        <Credentials />
      </main>
      <Footer />
    </>
  );
}

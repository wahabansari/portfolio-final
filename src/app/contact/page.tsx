import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact — Hire a Frontend Engineer",
  description: "Get in touch about a full-time role or a freelance project. Frontend, full-stack, WordPress and AI automation work.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact — Hire a Frontend Engineer", description: "Get in touch about a full-time role or a freelance project. Frontend, full-stack, WordPress and AI automation work.", url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-6">
        <Contact />
      </main>
      <Footer />
    </>
  );
}

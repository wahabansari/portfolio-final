import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHeader, PageJsonLd } from "@/components/service-ui";
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
      <PageJsonLd name="Contact" path="/contact" description={"Get in touch about a full-time role or a freelance project. Frontend, full-stack, WordPress and AI automation work."} />
      <Nav />
      <main id="main">
        <PageHeader
          trail={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          overline="Contact"
          title="Let us build something together"
          lede="Hire me full-time, or bring me a project. Frontend, full-stack, WordPress and AI automation."
        />
        <Contact hideHeading tone="plain" />
      </main>
      <Footer />
    </>
  );
}

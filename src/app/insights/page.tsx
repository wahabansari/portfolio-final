import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { InsightsHero, InsightsList } from "@/components/insights";
import { InsightsIndexJsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/ui";
import { insights, insightsHub } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: insightsHub.metaTitle,
  description: insightsHub.metaDescription,
  path: "/insights",
});

/**
 * The insights hub is a routing page into first-hand articles, the same way
 * /services routes into service pages: a topic index to jump by problem, the
 * latest article featured, then every topic with its articles. Image frames
 * are placeholders until real images are supplied.
 */
export default function InsightsPage() {
  return (
    <>
      <InsightsIndexJsonLd insights={insights} />
      <Nav />
      <main id="main">
        <InsightsHero />
        <InsightsList />

        <CtaBand
          navy
          tone="plain"
          heading="Have the situation one of these describes?"
          body="Send the site, the repo or a description of the problem. We will tell you honestly what we would do first."
          primary={{ label: "Start a project", href: "/contact" }}
          secondary={{ label: "See the services", href: "/services" }}
        />
      </main>
      <Footer />
    </>
  );
}

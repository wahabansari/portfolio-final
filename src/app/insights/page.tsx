import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { InsightsList } from "@/components/insights";
import { InsightsIndexJsonLd } from "@/components/json-ld";
import { CtaBand, PageHeader } from "@/components/ui";
import { insights, insightsHub } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: insightsHub.metaTitle,
  description: insightsHub.metaDescription,
  path: "/insights",
});

/**
 * The insights hub is a routing page into first-hand articles, the same way
 * /services routes into service pages — a reader lands here from search or a
 * service page, finds the closest article, and reads answer-first content
 * rather than a scroll of teaser copy.
 */
export default function InsightsPage() {
  return (
    <>
      <InsightsIndexJsonLd insights={insights} />
      <Nav />
      <main id="main">
        <PageHeader
          trail={[{ label: "Home", href: "/" }, { label: "Insights" }]}
          eyebrow="Insights"
          title={insightsHub.h1}
          lede={insightsHub.intro}
        />

        <InsightsList />

        <CtaBand
          navy
          tone="soft"
          heading="Have the situation one of these describes?"
          body="Send the site, the repo or a description of the problem. I will tell you honestly what I would do first."
          primary={{ label: "Discuss your project", href: "/contact" }}
          secondary={{ label: "See the services", href: "/services" }}
        />
      </main>
      <Footer />
    </>
  );
}

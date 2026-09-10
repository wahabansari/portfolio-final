import Link from "next/link";
import { insights, type Insight } from "@/content/insights";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { ArrowIcon, Reveal, Section, SectionHeading } from "./ui";

/** Human-readable date, stable between server and client (no relative time). */
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * An insight card carries a visible byline and date.
 *
 * Not decoration: authorship and freshness are the two signals that separate
 * a first-hand engineering note from anonymous content, and they are exactly
 * what the Article structured data on the page itself asserts. If the markup
 * claims an author and a modified date, the card a reader actually sees
 * should show the same two facts.
 */
function InsightCard({ insight }: { insight: Insight }) {
  const service = getService(insight.relatedServiceSlug);

  return (
    <article className="ds-card ds-card-interactive group flex h-full flex-col p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="ds-chip">{insight.cluster}</span>
        <time dateTime={insight.updatedAt} className="ds-meta">
          {formatDate(insight.updatedAt)}
        </time>
      </div>

      <h3 className="ds-title mt-4">
        <Link
          href={`/insights/${insight.slug}`}
          data-track="cta_click"
          data-track-label={insight.slug}
          className="transition-colors group-hover:text-accent"
        >
          {insight.title}
        </Link>
      </h3>

      <p className="ds-body-sm mt-3 flex-1">{insight.dek}</p>

      <p className="ds-meta mt-5">{site.name}</p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <Link
          href={`/insights/${insight.slug}`}
          data-track="cta_click"
          data-track-label={insight.slug}
          className="ds-link"
        >
          Read
          <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
        {service && (
          <span className="ds-body-sm text-[0.8125rem]">{service.shortTitle}</span>
        )}
      </div>
    </article>
  );
}

/**
 * /insights hub — every published article, grouped by cluster.
 *
 * Twelve articles in one undifferentiated grid is a list to scroll; grouped by
 * topic it becomes a map of what I actually know, which is the job this page
 * does for both a reader and a search engine. The clusters are derived from the
 * content rather than hard-coded, so publishing into a new topic creates its
 * own group without anyone maintaining a second list.
 */
export function InsightsList() {
  const clusters = Array.from(new Set(insights.map((i) => i.cluster)));

  return (
    <Section tone="plain">
      <div className="space-y-16">
        {clusters.map((cluster) => {
          const items = insights.filter((i) => i.cluster === cluster);
          return (
            <div key={cluster}>
              <div className="flex items-baseline justify-between gap-6 border-b border-border pb-4">
                <h2 className="ds-h3">{cluster}</h2>
                <span className="ds-meta">
                  {items.length} {items.length === 1 ? "article" : "articles"}
                </span>
              </div>
              <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:gap-7">
                {items.map((insight, i) => (
                  <Reveal as="li" key={insight.slug} delay={i * 0.04} className="h-full">
                    <InsightCard insight={insight} />
                  </Reveal>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/**
 * Homepage teaser. Three articles, not the full list — this is an internal-
 * linking hook into /insights, not a second hub competing with the real one.
 */
export function InsightsTeaser({ tone = "plain" }: { tone?: "plain" | "soft" | "deep" }) {
  const featured = insights.slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <Section id="insights" tone={tone}>
      <SectionHeading
        overline="Insights"
        title="Notes from production work"
        description="Problem-led write-ups on migration and performance — first-hand, not generic advice."
        align="between"
        aside={
          <Link href="/insights" className="ds-btn ds-btn-secondary">
            All insights
            <ArrowIcon />
          </Link>
        }
      />
      <ul className="grid gap-6 md:grid-cols-3">
        {featured.map((insight, i) => (
          <Reveal as="li" key={insight.slug} delay={i * 0.05} className="h-full">
            <InsightCard insight={insight} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

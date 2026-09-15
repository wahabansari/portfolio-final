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
 * An insight rendered as a magazine contents row.
 *
 * Date on the left, the title at display scale, the cluster as a mono label,
 * and the read arrow on the right — authorship and freshness stay visible so
 * the card carries the same two facts the Article structured data asserts.
 */
function InsightCard({ insight }: { insight: Insight }) {
  const service = getService(insight.relatedServiceSlug);

  return (
    <article className="group grid items-baseline gap-x-8 gap-y-3 border-b border-border py-8 transition-colors hover:bg-surface md:grid-cols-12 md:py-9">
      <time
        dateTime={insight.updatedAt}
        className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft md:col-span-2 md:pl-2"
      >
        {formatDate(insight.updatedAt)}
      </time>

      <h3 className="font-display text-[1.25rem] leading-snug font-medium tracking-[-0.014em] text-ink transition-colors group-hover:text-accent md:col-span-5 md:text-[1.5rem]">
        <Link
          href={`/insights/${insight.slug}`}
          data-track="cta_click"
          data-track-label={insight.slug}
        >
          {insight.title}
        </Link>
      </h3>

      <p className="text-[0.875rem] leading-relaxed text-ink-muted md:col-span-3">
        {insight.dek}
      </p>

      <div className="flex items-center gap-3 md:col-span-2 md:justify-end md:pr-2">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft">
          {service ? service.shortTitle : insight.cluster}
        </span>
        <Link
          href={`/insights/${insight.slug}`}
          data-track="cta_click"
          data-track-label={insight.slug}
          aria-label={`Read ${insight.title}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform duration-200 group-hover:translate-x-0.5"
        >
          <ArrowIcon className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

/**
 * /insights hub — every published article, grouped by cluster as a magazine
 * table of contents. The clusters come from the content itself, so publishing
 * into a new topic creates its own group without maintaining a second list.
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
                <h2 className="font-display text-[1.5rem] md:text-[1.75rem] font-medium text-ink">
                  {cluster}
                </h2>
                <span className="ds-meta">
                  {items.length} {items.length === 1 ? "article" : "articles"}
                </span>
              </div>
              <ul className="border-t border-border">
                {items.map((insight, i) => (
                  <Reveal as="li" key={insight.slug} delay={i * 0.04}>
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
 * Homepage teaser. Three articles as a table-of-contents strip — an internal-
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
      <ul className="border-t border-border">
        {featured.map((insight, i) => (
          <Reveal as="li" key={insight.slug} delay={i * 0.05}>
            <InsightCard insight={insight} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
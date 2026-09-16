import Link from "next/link";
import { insights, type Insight } from "@/content/insights";
import { ArrowIcon, Reveal, Section, SectionHeading } from "./ui";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function readingTime(insight: Insight): number {
  const words =
    insight.definition.split(/\s+/).length +
    insight.intro.reduce((n, p) => n + p.split(/\s+/).length, 0) +
    insight.sections.reduce(
      (n, s) => n + s.body.reduce((m, p) => m + p.split(/\s+/).length, 0),
      0,
    );
  return Math.max(1, Math.round(words / 250));
}

function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      data-track="cta_click"
      data-track-label={insight.slug}
      className="group ds-card ds-card-interactive flex flex-col p-7"
    >
      <span className="ds-chip ds-chip-accent mb-5 w-fit">{insight.cluster}</span>
      <h3 className="ds-h3 text-fg transition-colors group-hover:text-accent">
        {insight.title}
      </h3>
      <p className="ds-body-sm mt-3 flex-1">
        {insight.dek}
      </p>
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <time dateTime={insight.updatedAt} className="ds-meta">
          {formatDate(insight.updatedAt)}
        </time>
        <span className="ds-meta" aria-hidden="true">&middot;</span>
        <span className="ds-meta">{readingTime(insight)} min read</span>
        <span className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform duration-200 group-hover:translate-x-0.5">
          <ArrowIcon className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

/**
 * /insights hub — every published article, grouped by cluster as a responsive
 * card grid. The clusters come from the content itself, so publishing into a
 * new topic creates its own group without maintaining a second list.
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
                <h2 className="ds-h2">{cluster}</h2>
                <span className="ds-meta">
                  {items.length} {items.length === 1 ? "article" : "articles"}
                </span>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((insight, i) => (
                  <Reveal key={insight.slug} delay={i * 0.04}>
                    <InsightCard insight={insight} />
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/**
 * Homepage teaser. Three articles as a card grid — an internal-linking hook
 * into /insights, not a second hub competing with the real one.
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
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((insight, i) => (
          <Reveal key={insight.slug} delay={i * 0.05}>
            <InsightCard insight={insight} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

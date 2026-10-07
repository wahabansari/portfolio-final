import Link from "next/link";
import { insights, insightsHub, type Insight } from "@/content/insights";
import { cn } from "@/lib/cn";
import { ArrowIcon, Breadcrumbs, Reveal, Section } from "./ui";

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function readingTime(insight: Insight): number {
  const words =
    insight.definition.split(/\s+/).length +
    insight.intro.reduce((n, p) => n + p.split(/\s+/).length, 0) +
    insight.sections.reduce(
      (n, s) => n + s.body.reduce((m, p) => m + p.split(/\s+/).length, 0),
      0,
    );
  return Math.max(1, Math.round(words / 250));
}

export function clusterId(cluster: string) {
  return `topic-${cluster.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

/**
 * A neutral frame where an article's image will go. It carries no artwork on
 * purpose: nothing is generated or invented, the frame simply holds the space
 * (and the aspect ratio) until a real image is supplied. `compact` drops the
 * caption for thumbnail sizes.
 */
export function ImagePlaceholder({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label="Image placeholder"
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-surface",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 14px, var(--color-border-subtle) 14px 15px)",
        }}
      />
      <span className="relative flex flex-col items-center gap-2 text-fg-subtle">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={compact ? "h-6 w-6" : "h-8 w-8"}
        >
          <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="m4.5 17.5 4.6-4.4a1.5 1.5 0 0 1 2.1 0l2.3 2.2 1.7-1.6a1.5 1.5 0 0 1 2.1 0l2.2 2.1" />
        </svg>
        {!compact && <span className="text-[0.75rem] font-medium tracking-[0.04em]">Image placeholder</span>}
      </span>
    </div>
  );
}

function Meta({ insight, className }: { insight: Insight; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1", className)}>
      <time dateTime={insight.updatedAt} className="ds-meta whitespace-nowrap normal-case">
        {formatDate(insight.updatedAt)}
      </time>
      <span className="ds-meta" aria-hidden="true">
        &middot;
      </span>
      <span className="ds-meta whitespace-nowrap normal-case">{readingTime(insight)} min read</span>
    </div>
  );
}

/**
 * Hub opener: the title and the one-line promise on the left, and on the right
 * a topic index (each topic with its article count, linking down to its
 * section) so a reader can jump straight to the problem they have.
 */
export function InsightsHero() {
  const topics = Array.from(new Set(insights.map((i) => i.cluster))).map((cluster) => ({
    cluster,
    count: insights.filter((i) => i.cluster === cluster).length,
  }));

  return (
    <section className="hero-aurora border-b border-border pt-28 pb-14 md:pt-32 md:pb-20">
      <div className="ds-container">
        <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Insights" }]} />

        <div className="mt-8 grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-border bg-bg/80 px-4 py-1.5 text-[0.8125rem] font-medium text-fg-muted backdrop-blur-sm">
                {insights.length} articles &middot; {topics.length} topics
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="display mt-5 text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold">{insightsHub.h1}</h1>
              <p className="body-large mt-5 max-w-xl">{insightsHub.intro}</p>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:col-span-5">
            <nav aria-label="Topics" className="rounded-3xl border border-border bg-bg/80 p-2 backdrop-blur-sm">
              <p className="ds-meta px-4 pt-3 pb-2">Jump to a topic</p>
              <ul>
                {topics.map((t) => (
                  <li key={t.cluster}>
                    <a
                      href={`#${clusterId(t.cluster)}`}
                      className="group flex items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-colors duration-200 hover:bg-accent-soft"
                    >
                      <span className="text-[0.9375rem] font-semibold text-fg transition-colors group-hover:text-accent">
                        {t.cluster}
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="ds-chip">{t.count}</span>
                        <ArrowIcon className="h-3.5 w-3.5 rotate-90 text-fg-subtle transition-colors group-hover:text-accent" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** The most recently updated article, given the page's one large moment. */
function FeaturedInsight({ insight }: { insight: Insight }) {
  return (
    <Section tone="plain">
      <Reveal>
        <Link
          href={`/insights/${insight.slug}`}
          data-track="cta_click"
          data-track-label={insight.slug}
          className="group grid gap-8 overflow-hidden rounded-[2rem] border border-border bg-bg p-4 transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)] md:p-5 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12"
        >
          <ImagePlaceholder className="aspect-[16/11] w-full" />
          <div className="px-2 pb-3 lg:py-6 lg:pr-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-[0.75rem] font-semibold tracking-[0.04em] text-accent uppercase">
              Latest &middot; {insight.cluster}
            </span>
            <h2 className="mt-5 text-[1.75rem] leading-[1.18] font-bold tracking-[-0.02em] text-fg transition-colors duration-200 group-hover:text-accent md:text-[2.25rem]">
              {insight.title}
            </h2>
            <p className="ds-body-lg mt-4 max-w-xl text-fg-muted">{insight.dek}</p>
            <Meta insight={insight} className="mt-5" />
            <span className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-accent">
              Read the article
              <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </Reveal>
    </Section>
  );
}

/** One article in a topic: a thumbnail frame beside the title, dek and meta. */
function InsightRow({ insight }: { insight: Insight }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      data-track="cta_click"
      data-track-label={insight.slug}
      className="group -mx-3 flex items-start gap-5 rounded-2xl px-3 py-5 transition-colors duration-200 hover:bg-accent-soft md:gap-6"
    >
      <ImagePlaceholder compact className="aspect-[4/3] w-28 shrink-0 sm:w-40" />
      <div className="min-w-0 flex-1">
        <h3 className="text-[1.0625rem] leading-snug font-semibold tracking-[-0.015em] text-fg transition-colors duration-200 group-hover:text-accent md:text-[1.25rem]">
          {insight.title}
        </h3>
        <p className="ds-body-sm mt-1.5 line-clamp-2 max-w-2xl">{insight.dek}</p>
        <Meta insight={insight} className="mt-3" />
      </div>
      <ArrowIcon className="mt-2 hidden h-4 w-4 shrink-0 text-fg-subtle transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent md:block" />
    </Link>
  );
}

/**
 * /insights hub. The featured article (the most recently updated, computed so
 * a refreshed article moves up on its own), then each topic as a two-column
 * block: the topic name and count held in place on the left, its articles as
 * ruled rows on the right.
 */
export function InsightsList() {
  const [featured, ...rest] = [...insights].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const clusters = Array.from(new Set(rest.map((i) => i.cluster)));

  return (
    <>
      {featured && <FeaturedInsight insight={featured} />}
      {clusters.map((cluster, ci) => {
        const items = rest.filter((i) => i.cluster === cluster);
        return (
          <Section key={cluster} id={clusterId(cluster)} tone={ci % 2 === 0 ? "soft" : "plain"}>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <span className="ds-overline-accent block">Topic</span>
                  <h2 className="ds-h2 mt-3">{cluster}</h2>
                  <p className="ds-body-sm mt-3">
                    {items.length} {items.length === 1 ? "article" : "articles"}
                  </p>
                </div>
              </div>
              <ul className="border-b border-border lg:col-span-8">
                {items.map((insight, i) => (
                  <Reveal as="li" key={insight.slug} delay={i * 0.03} className="border-t border-border">
                    <InsightRow insight={insight} />
                  </Reveal>
                ))}
              </ul>
            </div>
          </Section>
        );
      })}
    </>
  );
}

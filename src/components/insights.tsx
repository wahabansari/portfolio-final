import Link from "next/link";
import { insights, type Insight } from "@/content/insights";
import { cn } from "@/lib/cn";
import { ArrowIcon, Reveal, Section, SectionHeading } from "./ui";

/* A short, stable integer from a string — used to vary each article's cover
   deterministically (same slug always renders the same cover) without
   storing per-article art direction anywhere. */
function hashSeed(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

/**
 * The "image" for an article that has no photography — a soft two-tone
 * gradient-mesh cover, the same accent/coral pair used everywhere else on
 * the site, laid out differently per article from a hash of its slug so the
 * hub doesn't repeat one identical tile. Used small as a hub thumbnail and
 * large as the article page's hero cover.
 */
export function InsightCover({ slug, className }: { slug: string; className?: string }) {
  const seed = hashSeed(slug);
  const x1 = 10 + (seed % 35);
  const y1 = 5 + ((seed >> 3) % 45);
  const x2 = 45 + ((seed >> 6) % 45);
  const y2 = 35 + ((seed >> 9) % 45);
  return (
    <div className={cn("relative overflow-hidden rounded-[var(--radius-card)] bg-bg", className)}>
      <div aria-hidden className="ds-grid-lines absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="absolute h-[75%] w-[75%] rounded-full bg-accent-soft blur-3xl"
        style={{ left: `${x1}%`, top: `${y1}%`, transform: "translate(-50%,-50%)" }}
      />
      <div
        aria-hidden
        className="absolute h-[60%] w-[60%] rounded-full bg-coral-soft blur-3xl"
        style={{ left: `${x2}%`, top: `${y2}%`, transform: "translate(-50%,-50%)" }}
      />
      <div aria-hidden className="absolute inset-0 border border-border/60" />
    </div>
  );
}

function formatDate(iso: string) {
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

/**
 * One article entry — a compact vertical block that flows in a CSS-columns
 * index, not a row in a list and not a bordered card. No border, no fill,
 * no shadow of its own; only the cover, the typography and the space around
 * it. `break-inside-avoid` keeps a block from being split across columns.
 */
function InsightEntry({ insight, index }: { insight: Insight; index: number }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      data-track="cta_click"
      data-track-label={insight.slug}
      className="group mb-10 block break-inside-avoid"
    >
      <InsightCover slug={insight.slug} className="aspect-[4/3] w-full" />
      <span className="ds-meta mt-4 block text-accent">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-1.5 font-display text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.015em] text-fg transition-colors group-hover:text-accent">
        {insight.title}
      </h3>
      <p className="ds-body-sm mt-2 text-fg-muted">{insight.dek}</p>
      <div className="mt-3 flex items-center gap-2">
        <time dateTime={insight.updatedAt} className="ds-meta whitespace-nowrap">
          {formatDate(insight.updatedAt)}
        </time>
        <span className="ds-meta" aria-hidden="true">&middot;</span>
        <span className="ds-meta whitespace-nowrap">{readingTime(insight)} min</span>
      </div>
    </Link>
  );
}

/**
 * /insights hub — every published article, grouped by cluster. Each cluster
 * is its own full-width band (tone alternates cluster to cluster) with a
 * bold, accent-ruled heading, then a CSS-columns index rather than a card
 * grid or a stacked row list — entries flow and settle at whatever height
 * their own content needs, so the section reads as a magazine index rather
 * than a rack of identical boxes or a scrolling table.
 */
export function InsightsList() {
  const clusters = Array.from(new Set(insights.map((i) => i.cluster)));

  return (
    <>
      {clusters.map((cluster, ci) => {
        const items = insights.filter((i) => i.cluster === cluster);
        return (
          <Section key={cluster} tone={ci % 2 === 0 ? "plain" : "soft"}>
            <div className="flex items-baseline justify-between gap-6 border-b-2 border-accent pb-5">
              <h2 className="font-display text-[1.75rem] font-bold tracking-[-0.02em] text-fg md:text-[2.25rem]">
                {cluster}
              </h2>
              <span className="ds-meta whitespace-nowrap">
                {items.length} {items.length === 1 ? "article" : "articles"}
              </span>
            </div>
            <div className="columns-1 gap-10 pt-9 sm:columns-2 lg:columns-3">
              {items.map((insight, i) => (
                <Reveal key={insight.slug} delay={i * 0.04}>
                  <InsightEntry insight={insight} index={i} />
                </Reveal>
              ))}
            </div>
          </Section>
        );
      })}
    </>
  );
}

/**
 * Homepage teaser. Three articles in a simple row of the same entry blocks
 * the hub uses — an internal-linking hook into /insights, not a second hub
 * competing with it.
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
      <div className="grid gap-10 sm:grid-cols-3">
        {featured.map((insight, i) => (
          <Reveal key={insight.slug} delay={i * 0.05}>
            <InsightEntry insight={insight} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

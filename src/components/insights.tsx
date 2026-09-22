import Link from "next/link";
import { insights, type Insight } from "@/content/insights";
import { cn } from "@/lib/cn";
import { SERVICE_ICONS } from "./services";
import { ArrowIcon, CodeIcon, Reveal, Section, SectionHeading } from "./ui";

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

/* Deterministic float in [0,1) from two integers — a sine-hash PRNG. Pure
   floating-point, no bitwise shifts, so there is no signed/unsigned pitfall
   to repeat (an earlier cover generator used `seed >> n` on a value that can
   exceed 2^31 and got reinterpreted as negative — see git history). Used
   here only to vary the background wash angle, which has no bounds to
   overflow regardless of the input. */
function rand(seed: number, salt: number): number {
  const x = Math.sin(seed * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * The "image" for an article that has no photography — a solid indigo
 * gradient tile (the same accent → accent-deep pairing the brand mark and
 * OG card use, so it reads as designed rather than as a faded placeholder),
 * with the matching service's icon (via `SERVICE_ICONS`, one shared mapping
 * so a topic never gets two different icons on different pages) floating in
 * an elevated white card on top. A light grid texture and a few small dots
 * — decorative only, small enough that any hash-driven position still looks
 * intentional — keep the fill from reading as flat. The gradient angle and
 * dot layout are the only things varied per article; nothing here is
 * positioned in a way that can clip or land off-tile. Used small as a hub
 * thumbnail and large as the article page's hero cover.
 */
export function InsightCover({ insight, className }: { insight: Insight; className?: string }) {
  const seed = hashSeed(insight.slug);
  const angle = Math.round(rand(seed, 0) * 360);
  const Icon = SERVICE_ICONS[insight.relatedServiceSlug] ?? CodeIcon;
  const dots = Array.from({ length: 5 }, (_, i) => ({
    x: 10 + rand(seed, 10 + i * 2) * 80,
    y: 10 + rand(seed, 11 + i * 2) * 80,
    r: 1 + rand(seed, 30 + i) * 1.4,
  }));

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-card)] shadow-[0_10px_28px_-14px_rgba(28,23,18,0.4)]",
        className,
      )}
      style={{ background: `linear-gradient(${angle}deg, var(--color-accent) 0%, var(--color-accent-deep) 100%)` }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#fff" fillOpacity={0.3} />
        ))}
      </svg>
      <div aria-hidden className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface text-accent shadow-[0_14px_30px_-10px_rgba(0,0,0,0.4)] md:h-20 md:w-20">
          <Icon className="h-8 w-8 md:h-10 md:w-10" />
        </span>
      </div>
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
 * The one magazine-cover moment on the hub — the single most recently
 * updated article, full width, cover art on one side and an oversized
 * headline on the other. This is the only place on the hub that spends a
 * cover on a list item; everything below it is typography-only, which is
 * what actually separates this page from a generic blog grid rather than
 * just re-skinning the same thumbnail-plus-title card.
 */
function FeaturedInsight({ insight }: { insight: Insight }) {
  return (
    <Section tone="plain">
      <Reveal>
        <Link
          href={`/insights/${insight.slug}`}
          data-track="cta_click"
          data-track-label={insight.slug}
          className="group grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16"
        >
          <div>
            <span className="ds-overline-accent block">Latest &middot; {insight.cluster}</span>
            <h2 className="mt-5 font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-fg transition-colors duration-200 group-hover:text-accent md:text-[2.75rem]">
              {insight.title}
            </h2>
            <p className="ds-body-lg mt-5 max-w-xl text-fg-muted">{insight.dek}</p>
            <div className="mt-6 flex items-center gap-3">
              <time dateTime={insight.updatedAt} className="ds-meta whitespace-nowrap">
                {formatDate(insight.updatedAt)}
              </time>
              <span className="ds-meta" aria-hidden="true">&middot;</span>
              <span className="ds-meta whitespace-nowrap">{readingTime(insight)} min read</span>
            </div>
            <span className="mt-7 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-fg transition-colors duration-200 group-hover:text-accent">
              Read the article
              <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
          <InsightCover
            insight={insight}
            className="aspect-[4/3] w-full transition-transform duration-500 ease-out group-hover:scale-[1.01] lg:aspect-[5/4]"
          />
        </Link>
      </Reveal>
    </Section>
  );
}

/**
 * One row in the index — a large tabular numeral, the title, a single-line
 * dek and the date/reading-time off to the side, separated only by a
 * hairline. No cover, no card, no fill: below the one featured article, the
 * hub is typography doing all the work, the way a table of contents or an
 * editorial index reads rather than a scanned rack of thumbnails.
 */
function InsightIndexRow({ insight, index }: { insight: Insight; index: number }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      data-track="cta_click"
      data-track-label={insight.slug}
      className="group flex items-start gap-5 border-b border-border py-7 transition-colors duration-150 hover:bg-surface-hover md:items-center md:gap-8 md:py-8"
    >
      <span className="shrink-0 font-display text-[1.375rem] font-bold leading-none text-ink-softest tabular-nums transition-colors duration-150 group-hover:text-accent md:text-[1.75rem]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-[1.1875rem] font-bold leading-[1.2] tracking-[-0.015em] text-fg transition-colors duration-150 group-hover:text-accent md:text-[1.5rem]">
          {insight.title}
        </h3>
        <p className="ds-body-sm mt-1.5 max-w-2xl text-fg-muted">{insight.dek}</p>
      </div>
      <div className="hidden shrink-0 flex-col items-end gap-1 text-right sm:flex">
        <time dateTime={insight.updatedAt} className="ds-meta whitespace-nowrap">
          {formatDate(insight.updatedAt)}
        </time>
        <span className="ds-meta whitespace-nowrap">{readingTime(insight)} min</span>
      </div>
      <ArrowIcon className="hidden h-4 w-4 shrink-0 text-ink-soft transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-accent md:block" />
    </Link>
  );
}

/**
 * /insights hub. One featured article leads (see `FeaturedInsight`), then
 * every remaining article grouped by cluster as a plain typographic index
 * (see `InsightIndexRow`) — no thumbnail grid, no cards, no CSS-columns
 * masonry. The featured pick is whichever article has the most recent
 * `updatedAt`, computed rather than hardcoded, so publishing a new or
 * refreshed article moves it to the top automatically.
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
          <Section key={cluster} tone={ci % 2 === 0 ? "soft" : "plain"}>
            <div className="flex items-baseline justify-between gap-6 border-b-2 border-accent pb-5">
              <h2 className="font-display text-[1.75rem] font-bold tracking-[-0.02em] text-fg md:text-[2.25rem]">
                {cluster}
              </h2>
              <span className="ds-meta whitespace-nowrap">
                {items.length} {items.length === 1 ? "article" : "articles"}
              </span>
            </div>
            <div className="mt-2">
              {items.map((insight, i) => (
                <Reveal key={insight.slug} delay={i * 0.03}>
                  <InsightIndexRow insight={insight} index={i} />
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
 * Homepage teaser — three index rows, the same typography-only treatment
 * the hub uses below its featured pick. An internal-linking hook into
 * /insights, not a second hub competing with it.
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
      <div className="mt-2 border-t border-border">
        {featured.map((insight, i) => (
          <Reveal key={insight.slug} delay={i * 0.05}>
            <InsightIndexRow insight={insight} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

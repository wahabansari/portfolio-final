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
      <InsightCover
        insight={insight}
        className="aspect-[4/3] w-full transition-transform duration-300 ease-out group-hover:scale-[1.015]"
      />
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

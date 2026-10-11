import Link from "next/link";
import { featuredProjects } from "@/content/work";
import { hero, proof, site, type ProofItem } from "@/content/site";
import { cn } from "@/lib/cn";
import { BentoGrid } from "./bento";
import { FlickStack, type StackItem } from "./flick-stack";
import { ChevronRightIcon, Reveal } from "./ui";

/**
 * Hero — the bento opener.
 *
 * One 12-column grid with three kinds of tile: the indigo-tinted statement
 * panel (eyebrow, availability, headline, actions), the flickable project
 * stack (the page's one memorable element, deliberately the only thing
 * without a tile of its own), and the four proof facts as small stat tiles
 * underneath. The old proof band is absorbed here — a bento page states its
 * facts in the same breath as its headline rather than in a strip below it.
 *
 * The stack only fields the cards' display fields, so case-study bodies
 * never travel to the client.
 */
export function Hero() {
  const items: StackItem[] = featuredProjects.map((p) => ({
    slug: p.slug,
    title: p.title,
    kind: p.kind,
    blurb: p.blurb,
    href: p.href,
    domain: p.domain,
    plate: p.plate,
    image: p.image,
    hasCaseStudy: Boolean(p.caseStudy),
  }));

  return (
    <section className="hero-aurora pt-24 pb-14 md:pt-28 md:pb-16">
      <div className="ds-container">
        <BentoGrid className="sm:grid-cols-2 lg:grid-cols-12">
          {/* Statement panel — the one tinted tile in the opener. */}
          <Reveal className="sm:col-span-2 lg:col-span-7">
            <div className="theme-tint flex h-full flex-col rounded-[20px] border border-border px-6 py-8 md:px-10 md:py-11">
              <p className="ds-overline-accent">{hero.eyebrow}</p>
              {site.available && (
                <p className="mt-3 inline-flex w-fit items-center gap-2.5 rounded-full border border-border bg-bg/80 px-4 py-1.5 text-[0.8125rem] font-medium text-fg-muted backdrop-blur-sm">
                  <span className="relative flex h-2 w-2" aria-hidden>
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  {hero.availability}
                </p>
              )}

              <h1 className="display mt-5 text-[clamp(2.125rem,3.6vw,3.25rem)] font-extrabold">
                {hero.headline}
              </h1>
              <p className="body-large mt-4 max-w-lg">{hero.support}</p>

              <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-3 pt-8 md:gap-x-4">
                <Link
                  href={hero.primaryCta.href}
                  data-track="cta_click"
                  data-track-label="hero-primary"
                  className="ds-btn ds-btn-primary"
                >
                  {hero.primaryCta.label}
                </Link>
                <Link
                  href={hero.secondaryCta.href}
                  data-track="cta_click"
                  data-track-label="hero-secondary"
                  className="ds-link px-4 py-2 text-[0.9375rem]"
                >
                  {hero.secondaryCta.label}
                  <ChevronRightIcon />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* The stack — content sitting directly on the aurora, no tile. */}
          <Reveal delay={0.08} className="flex items-center justify-center sm:col-span-2 lg:col-span-5">
            <FlickStack items={items} />
          </Reveal>

          {/* The four proof facts, as stat tiles. */}
          {proof.map((item, i) => (
            <Reveal key={item.label} delay={0.14 + i * 0.05} className="lg:col-span-3">
              <ProofTile item={item} />
            </Reveal>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

/**
 * One proof fact as a bento stat tile: the figure (or chip row) first, then
 * what it is and the basis for it. The verified metric is the only figure in
 * colour, carries the "Measured" badge and links to the case study where it
 * was measured. Figures are static text, never counted up, so the server
 * HTML is already correct.
 */
function ProofTile({ item }: { item: ProofItem }) {
  const body = (
    <>
      <span className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
        {item.chips ? (
          item.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-border bg-bg px-2.5 py-1 text-[0.75rem] font-semibold tracking-[-0.01em] text-fg"
            >
              {chip}
            </span>
          ))
        ) : (
          <span
            className={cn(
              "text-[1.75rem] leading-none font-bold tracking-[-0.03em] tabular-nums",
              item.verified ? "text-accent" : "text-fg",
            )}
          >
            {item.display}
          </span>
        )}
        {item.verified && (
          <span className="rounded-full border border-success-border bg-success-soft px-2 py-0.5 text-[0.625rem] font-semibold tracking-[0.05em] text-success uppercase">
            Measured
          </span>
        )}
      </span>
      <span className="mt-3 block text-[0.875rem] leading-snug font-semibold text-fg">{item.label}</span>
      <span className="ds-meta mt-1 block">{item.note}</span>
    </>
  );

  const cls = "ds-card flex h-full flex-col p-5 md:p-6";
  if (item.href) {
    return (
      <Link
        href={item.href}
        data-track="cta_click"
        data-track-label={`proof:${item.label}`}
        className={cn(cls, "ds-card-interactive")}
      >
        {body}
      </Link>
    );
  }
  return <div className={cls}>{body}</div>;
}

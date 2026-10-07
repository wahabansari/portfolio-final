import Link from "next/link";
import { featuredProjects } from "@/content/work";
import { hero, proof, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { FlickStack, type StackItem } from "./flick-stack";
import { ChevronRightIcon, LayersIcon, Reveal, Section, UserIcon } from "./ui";
import { CalendarIcon, TrendUpIcon } from "./home-svg";

/**
 * Hero - a two-part layout that fits one screen: the studio statement and
 * actions on the left, the flickable project stack on the right. The stack is the page's one memorable element (see
 * flick-stack.tsx); only the fields a card needs are passed down, so the
 * case-study bodies never travel to the client.
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
    <section className="hero-aurora pt-24 pb-12 md:pt-28 md:pb-16">
      <div className="ds-container">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            {site.available && (
              <Reveal>
                <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-bg/80 px-4 py-1.5 text-[0.8125rem] font-medium text-fg-muted backdrop-blur-sm">
                  <span className="relative flex h-2 w-2" aria-hidden>
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  {hero.availability}
                </p>
              </Reveal>
            )}

            <Reveal delay={0.06}>
              <h1 className="display mt-5 text-[clamp(2.375rem,4.6vw,4rem)] font-extrabold">{hero.headline}</h1>
              <p className="body-large mt-5 max-w-lg">{hero.support}</p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-3">
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
            </Reveal>
          </div>

          <Reveal delay={0.16} className="lg:col-span-6">
            <FlickStack items={items} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Proof band - the four facts a buyer needs, as one slim row: a small icon,
 * the figure, what it is and the basis for it, with a hairline between items.
 * No box and no fill, so it reads as a quiet strip under the hero rather than
 * a section of its own. The verified metric is the only figure in colour and
 * links to the case study where it was measured. Figures are static text,
 * never counted up, so the server HTML is already correct.
 */
const PROOF_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Production experience": CalendarIcon,
  "Measured Core Web Vitals improvement": TrendUpIcon,
  "Core engineering stack": LayersIcon,
  "Direct engineering ownership": UserIcon,
};

export function ProofBand({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section tone={tone} className="!py-8 md:!py-10">
      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-y-1 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
        {proof.map((item, i) => {
          const Icon = PROOF_ICONS[item.label];
          const compact = item.chips || item.display.length > 4;
          const body = (
            <>
              {Icon && (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="h-[1.125rem] w-[1.125rem]" />
                </span>
              )}
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  {item.chips ? (
                    item.chips.map((chip) => (
                      <span key={chip} className="text-[0.9375rem] leading-tight font-bold whitespace-nowrap text-fg">
                        {chip}
                        {chip !== item.chips?.[item.chips.length - 1] && (
                          <span aria-hidden className="text-fg-subtle">
                            {" "}
                            ·
                          </span>
                        )}
                      </span>
                    ))
                  ) : (
                    <span
                      className={cn(
                        "leading-none font-bold tabular-nums",
                        compact ? "text-[1.25rem] tracking-normal whitespace-nowrap" : "text-[1.875rem] tracking-[-0.03em]",
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
                <span className="mt-1.5 block text-[0.8125rem] leading-snug font-semibold text-fg">{item.label}</span>
                <span className="mt-0.5 block text-[0.75rem] leading-snug text-fg-muted">{item.note}</span>
              </span>
            </>
          );
          const row = "flex items-start gap-3.5 px-1 py-3 lg:px-6";
          return (
            <Reveal as="li" key={item.label} delay={i * 0.06}>
              {item.href ? (
                <Link
                  href={item.href}
                  data-track="cta_click"
                  data-track-label={`proof:${item.label}`}
                  className={cn(row, "rounded-xl transition-colors duration-200 hover:bg-accent-soft")}
                >
                  {body}
                </Link>
              ) : (
                <div className={row}>{body}</div>
              )}
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

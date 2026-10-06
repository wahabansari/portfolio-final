import Link from "next/link";
import { featuredProjects } from "@/content/work";
import { hero, proof, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { FlickStack, type StackItem } from "./flick-stack";
import { ArrowIcon, ChevronRightIcon, DownloadIcon, LayersIcon, Reveal, Section } from "./ui";
import { CalendarIcon, ShieldCheckIcon, TrendUpIcon } from "./home-svg";

/**
 * Hero - a two-part layout that fits one screen: the founder-facing
 * statement and actions on the left, the flickable project stack on the
 * right. The stack is the page's one memorable element (see
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
                <p className="inline-flex items-center gap-2.5 rounded-full bg-surface px-4 py-1.5 text-[0.8125rem] text-fg-muted">
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
              <Link
                href={hero.resumeCta.href}
                target="_blank"
                rel="noreferrer"
                data-track="cta_click"
                data-track-label="hero-resume"
                className="ds-link mt-4 text-[0.9375rem]"
              >
                <DownloadIcon className="h-3.5 w-3.5" />
                {hero.resumeCta.label}
              </Link>
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
 * Proof band - the four facts a founder or recruiter needs, set as plain
 * type. The verified metric is the only one in colour and links to the case
 * study where it was measured.
 */
const PROOF_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Years of experience": CalendarIcon,
  "Core Web Vitals improvement": TrendUpIcon,
  "What I build with": LayersIcon,
  "Delivery focus": ShieldCheckIcon,
};

export function ProofBand({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section tone={tone}>
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 text-center md:grid-cols-4">
        {proof.map((item, i) => {
          const value = item.chips ? item.chips.join(", ") : item.display;
          const Icon = PROOF_ICONS[item.label];
          const body = (
            <>
              {Icon && (
                <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" />
                </span>
              )}
              <span
                className={cn(
                  "block font-semibold tabular-nums",
                  item.chips
                    ? "text-[1.0625rem] leading-snug tracking-[-0.01em]"
                    : "text-[2.75rem] leading-none tracking-[-0.025em]",
                  item.verified ? "text-accent" : "text-fg",
                )}
              >
                {value}
              </span>
              <span className="mt-3 block text-[0.9375rem] font-medium text-fg">{item.label}</span>
              <span className="ds-body-sm mt-1 block">{item.note}</span>
              {item.verified && (
                <span className="ds-link mt-2 text-[0.8125rem]">
                  Verified, see how
                  <ArrowIcon className="h-3 w-3" />
                </span>
              )}
            </>
          );
          return (
            <Reveal as="li" key={item.label} delay={i * 0.06}>
              {item.href ? (
                <Link
                  href={item.href}
                  data-track="cta_click"
                  data-track-label={`proof:${item.label}`}
                  className="group block rounded-2xl p-3 transition-colors hover:bg-surface"
                >
                  {body}
                </Link>
              ) : (
                <div className="p-3">{body}</div>
              )}
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

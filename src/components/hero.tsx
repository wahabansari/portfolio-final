import Link from "next/link";
import { hero, site } from "@/content/site";
import { ArrowIcon, Reveal } from "./ui";

/**
 * Hero — 100svh, left-aligned, ambient glow.
 *
 * Deep charcoal-navy base with a soft accent glow bleeding in behind the
 * headline — enough depth that it is clearly designed, not template-dark.
 * Accent overline, display headline, two CTAs, quiet availability dot.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-border bg-bg">
      {/* Ambient accent glow behind the content */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full blur-[120px]"
        style={{ background: "var(--color-glow)" }}
      />
      {/* Background watermark */}
      <span
        aria-hidden
        className="ds-watermark absolute -bottom-8 right-0 text-[clamp(8rem,26vw,24rem)] md:right-8"
      >
        {site.shortName}
      </span>

      <div className="ds-container relative w-full">
        <Reveal>
          <span className="ds-overline-accent mb-8 flex items-center gap-3">
            <span className="ds-dot" aria-hidden />
            {hero.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="display max-w-[15ch]">{hero.headline}</h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="body-large mt-8 max-w-xl">{hero.support}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href={hero.primaryCta.href}
              data-track="cta_click"
              data-track-label="hero-primary"
              className="ds-btn ds-btn-primary"
            >
              {hero.primaryCta.label}
              <ArrowIcon className="h-4 w-4" />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              data-track="cta_click"
              data-track-label="hero-secondary"
              className="ds-btn ds-btn-secondary"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-20 flex flex-wrap items-center gap-x-10 gap-y-4">
            <span className="ds-meta tabular-nums">{site.locationShort}</span>
            <span className="h-3 w-px bg-border" aria-hidden />
            <span className="ds-meta tabular-nums">{site.timezone.split(" ")[0]}</span>
            <span className="h-3 w-px bg-border" aria-hidden />
            <span className="ds-meta tabular-nums">5+ years production</span>
            {site.available && (
              <>
                <span className="h-3 w-px bg-border" aria-hidden />
                <span className="ds-meta text-success">{site.availabilityNote}</span>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
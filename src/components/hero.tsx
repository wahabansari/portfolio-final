import Link from "next/link";
import { hero, site } from "@/content/site";
import { ArrowIcon, Reveal } from "./ui";

/**
 * Hero — compact first screen, no longer 100svh.
 *
 * Bricolage display on a warm-paper grid background with a soft accent glow
 * and a quiet watermark. Eyebrow → headline → support copy → two CTAs →
 * meta row. The grid lines dissolve downward via mask so they never fight
 * the content.
 */
export function Hero() {
  return (
    <section className="ds-grid-lines relative overflow-hidden border-b border-border bg-bg pt-32 pb-16 md:pt-40 md:pb-20 lg:pb-24">
      {/* Ambient accent glow */}
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
          <span className="ds-overline-accent mb-6 flex items-center gap-3">
            <span className="ds-dot" aria-hidden />
            {hero.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="display max-w-[15ch]">{hero.headline}</h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="body-large mt-6 max-w-xl">{hero.support}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
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
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
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

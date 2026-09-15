import Link from "next/link";
import { hero, site } from "@/content/site";
import { ArrowIcon, Reveal } from "./ui";

/**
 * Hero — 100vh, left-aligned, DM Sans display.
 *
 * The whole pitch in one headline. 500 weight, tight tracking,
 * near-black background, single accent somewhere down the page.
 * Left-aligned within the container reads as editorial, not template.
 */
export function Hero() {
  return (
    <section className="flex min-h-[100svh] items-center border-b border-border bg-bg">
      <div className="ds-container w-full">
        <Reveal>
          <span className="ds-overline mb-8 block">{hero.eyebrow}</span>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="display max-w-[15ch]">{hero.headline}</h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="body-large mt-8 max-w-xl">{hero.support}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex items-center gap-6">
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
          <div className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="ds-overline tabular-nums">
              {site.locationShort}
            </span>
            <span className="ds-overline tabular-nums">
              {site.timezone.split(" ")[0]}
            </span>
            <span className="ds-overline tabular-nums">
              5+ years production
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
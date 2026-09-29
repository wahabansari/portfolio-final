import Link from "next/link";
import { hero, proof, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ArrowIcon, DownloadIcon, Reveal } from "./ui";

/**
 * Hero — one large left-aligned headline, the support line and actions on a
 * two-part row beneath it, then the proof as a four-cell table. No imagery,
 * no gradient: the type is the design.
 *
 * Every figure in the table comes from the site's own `proof` content, so the
 * hero can never claim something the proof data does not.
 */
export function Hero() {
  return (
    <section className="pt-28 pb-10 md:pt-36 md:pb-14">
      <div className="ds-container">
        {site.available && (
          <Reveal>
            <p className="flex items-center gap-2.5 text-[0.8125rem] font-medium text-fg-muted">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              {hero.availability}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.05}>
          <p className="ds-overline-accent mt-7">{hero.eyebrow}</p>
          <h1 className="display mt-4 max-w-[19ch]">{hero.headline}</h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 grid gap-7 md:grid-cols-12 md:items-end">
            <p className="body-large md:col-span-5">{hero.support}</p>
            <div className="flex flex-wrap items-center gap-3 md:col-span-7 md:justify-end">
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
              <Link
                href={hero.resumeCta.href}
                target="_blank"
                rel="noreferrer"
                data-track="cta_click"
                data-track-label="hero-resume"
                className="ds-link px-2 text-[0.875rem] text-fg-muted"
              >
                <DownloadIcon className="h-3.5 w-3.5" />
                {hero.resumeCta.label}
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Proof table: 1px gaps over a border-coloured backdrop draw the
            cell dividers, so the grid stays clean at 2 or 4 columns. */}
        <Reveal delay={0.15}>
          <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-border bg-border lg:grid-cols-4">
            {proof.map((item) => {
              const value = item.chips ? item.chips.join(" · ") : item.display;
              const cell = (
                <>
                  <span className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
                    <span className="ds-overline">{item.label}</span>
                    {item.verified && (
                      <span className="shrink-0 rounded bg-coral-soft px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.06em] text-coral">
                        Verified
                      </span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "mt-3 block font-semibold tracking-[-0.02em] tabular-nums",
                      item.chips ? "text-[1rem] leading-snug" : "text-[2.25rem] leading-none",
                      item.verified ? "text-accent" : "text-fg",
                    )}
                  >
                    {value}
                  </span>
                  <span className="ds-body-sm mt-3 block">{item.note}</span>
                  {item.href && (
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-accent">
                      See how
                      <ArrowIcon className="h-3 w-3" />
                    </span>
                  )}
                </>
              );
              return (
                <li key={item.label} className="bg-bg">
                  {item.href ? (
                    <Link
                      href={item.href}
                      data-track="cta_click"
                      data-track-label={`hero-proof:${item.label}`}
                      className="block h-full p-5 transition-colors hover:bg-surface-hover md:p-6"
                    >
                      {cell}
                    </Link>
                  ) : (
                    <div className="h-full p-5 md:p-6">{cell}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

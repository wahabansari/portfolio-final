import Link from "next/link";
import { hero, proof, site } from "@/content/site";
import { ArrowIcon, DownloadIcon, Reveal } from "./ui";
import { GridOverlay } from "./grid-overlay";

/**
 * The hero's terminal panel — the same facts as the headline and the proof
 * strip below it, read back as if queried from a system rather than stated
 * as marketing copy. Pulled from `proof` rather than hardcoded so it cannot
 * drift from the numbers the rest of the page already shows.
 */
function TerminalPanel() {
  const verified = proof.find((p) => p.verified);
  const stack = proof.find((p) => p.chips)?.chips ?? [];

  return (
    <div className="rounded-[var(--radius-card)] border border-panel-border bg-panel shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-2 border-b border-panel-border px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6159]" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-[#29ca41]" aria-hidden />
        <span className="ml-2 text-[0.6875rem] font-medium text-panel-dim">
          ~/{site.shortName.toLowerCase().replace(/\s+/g, "-")}
        </span>
      </div>
      <div className="space-y-4 px-5 py-6 text-[0.875rem] font-medium leading-relaxed text-panel-text sm:px-6">
        <p>
          <span className="text-panel-dim">$</span> whoami
          <br />
          {site.shortName.toLowerCase().replace(/\s+/g, "_")}{" "}
          <span className="text-panel-dim">— {site.role.toLowerCase()}</span>
        </p>
        <p>
          <span className="text-panel-dim">$</span> cat stack.json
          <br />
          {"{ "}
          <span className="text-accent">&quot;core&quot;</span>
          {": ["}
          {stack.map((chip, i) => (
            <span key={chip}>
              <span className="text-coral">&quot;{chip}&quot;</span>
              {i < stack.length - 1 ? ", " : ""}
            </span>
          ))}
          {"] }"}
        </p>
        {verified && (
          <p>
            <span className="text-panel-dim">$</span> ./verify --claim &quot;core-web-vitals&quot;
            <br />
            <span className="text-success">
              ✓ {verified.display} improvement — measured, {verified.note.replace("Measured on ", "")}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Hero — compact first screen, split into two columns from lg up.
 *
 * Left: availability badge → eyebrow → headline → support copy → CTAs →
 * meta row. Right: a terminal panel that shows the same facts — role,
 * stack, the verified metric — read back as system output rather than
 * prose, so the "engineer" identity is a visual fact on the first screen,
 * not only a word in the eyebrow.
 *
 * Two UX fixes over the previous version:
 * - Three equal-weight buttons made "Start a project" compete with its own
 *   supporting actions. The résumé link is now a small, quietly-styled
 *   link under the CTA row rather than a third button of the same size.
 * - `hero.availability` (the commercial-framed line written for this exact
 *   spot) was never actually rendered — the hero was pulling
 *   `site.availabilityNote` instead, the job-seeking phrasing meant for
 *   /about and the contact page. It now leads as an explicit status badge,
 *   which also means it is no longer duplicated (differently worded) in
 *   the meta row below.
 *
 * Below lg the panel drops beneath the text column; it is illustrative
 * supporting content, not a replacement for the copy above it.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-bg pt-32 pb-16 md:pt-40 md:pb-20 lg:pb-24">
      {/* Animated grid + cursor glow background */}
      <GridOverlay />
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
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
          <div>
            {site.available && (
              <Reveal>
                <span className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-1.5">
                  <span className="relative flex h-2 w-2" aria-hidden>
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  <span className="text-[0.8125rem] font-semibold text-fg">{hero.availability}</span>
                </span>
              </Reveal>
            )}

            <Reveal delay={0.03}>
              <span className="ds-overline-accent mb-6 block">{hero.eyebrow}</span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="display max-w-[15ch]">{hero.headline}</h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="body-large mt-6 max-w-xl">{hero.support}</p>
            </Reveal>

            <Reveal delay={0.16}>
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
              <Link
                href={hero.resumeCta.href}
                target="_blank"
                rel="noreferrer"
                data-track="cta_click"
                data-track-label="hero-resume"
                className="ds-link mt-6 text-[0.9375rem] text-fg-muted"
              >
                <DownloadIcon className="h-3.5 w-3.5" />
                {hero.resumeCta.label}
              </Link>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                <span className="ds-meta tabular-nums">{site.locationShort}</span>
                <span className="h-3 w-px bg-border" aria-hidden />
                <span className="ds-meta tabular-nums">{site.timezone.split(" ")[0]}</span>
                <span className="h-3 w-px bg-border" aria-hidden />
                <span className="ds-meta tabular-nums">5+ years production</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.28}>
            <TerminalPanel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

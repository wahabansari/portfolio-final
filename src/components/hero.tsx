import Link from "next/link";
import { about, hero, proof, site } from "@/content/site";
import { ArrowIcon, DownloadIcon, Field, Reveal } from "./ui";
import { cn } from "@/lib/cn";

/**
 * Hero. Identity, outcome, proof and two actions — in that order, above the
 * fold, in the initial HTML.
 *
 * The aside is a credentials panel rather than a portrait or an illustration.
 * A visitor deciding whether to keep reading wants the same handful of facts a
 * recruiter screens on, and putting them here means they never have to hunt.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <span aria-hidden className="ds-grid-field pointer-events-none absolute inset-0" />

      <div className="ds-container relative pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              {/* The eyebrow states the role and nothing else. The availability
                  signal used to sit beside it; it now sits below the CTAs,
                  because a hiring-availability badge in the first line makes a
                  client-acquisition site read as a job search. It is still
                  here — it is true and it matters to one of the three
                  audiences — just not ahead of the commercial message. */}
              <span className="ds-overline">{hero.eyebrow}</span>
            </Reveal>

            <Reveal delay={0.04}>
              {/* The one h1 on the page. The measure is set in characters
                  rather than pixels so the line count holds as the clamped
                  display size changes — this headline is longer than the one
                  it replaced, and at 16ch it broke to four lines. */}
              <h1 className="ds-display mt-7 max-w-[20ch]">{hero.headline}</h1>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="ds-lede ds-measure mt-7">{hero.support}</p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href={hero.primaryCta.href}
                  data-track="cta_click"
                  data-track-label="hero"
                  className="ds-btn ds-btn-primary"
                >
                  {hero.primaryCta.label}
                  <ArrowIcon />
                </Link>
                <Link href={hero.secondaryCta.href} className="ds-btn ds-btn-secondary">
                  {hero.secondaryCta.label}
                </Link>
                {/* The recruiter path, kept visible but subordinate to the two
                    commercial actions. */}
                <a
                  href={site.resumeHref}
                  className="ds-link sm:ml-2"
                  data-track="resume_click"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DownloadIcon className="h-4 w-4" />
                  View résumé
                </a>
              </div>
            </Reveal>

            {site.available && (
              <Reveal delay={0.16}>
                <p className="mt-7 flex flex-wrap items-center gap-2.5 text-[0.875rem] text-ink-muted">
                  <span aria-hidden className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                  </span>
                  {hero.availability}
                </p>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.16} className="lg:col-span-5">
            <div className="ds-card h-full p-7 md:p-8">
              <p className="ds-meta">At a glance</p>
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
                {about.facts.map((f) => (
                  <Field key={f.k} label={f.k} value={f.v} />
                ))}
              </dl>

              <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-border pt-6">
                <span className="ds-chip ds-chip-success">Measured · 30% on Sunhub</span>
                <Link href="/work/sunhub" className="ds-link">
                  See how
                  <ArrowIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <ProofStrip />
    </section>
  );
}

/**
 * The proof strip.
 *
 * Every figure is static text rendered on the server. There is no count-up:
 * a counter that starts at zero shows a false value in its first frame, and
 * that frame is what a crawler rendering the page — or a reader on a slow
 * device — can end up seeing. These are verifiable claims, so they have to be
 * correct with JavaScript disabled and correct in the very first paint.
 *
 * The one measured figure links to the case study that explains how it was
 * measured, rather than sitting on the page as a bare number.
 */
export function ProofStrip() {
  return (
    <div className="border-t border-border bg-surface">
      <div className="ds-container">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {proof.map((item, i) => {
            const value = (
              <span
                className={cn(
                  "font-display leading-none font-medium tracking-[-0.0083em]",
                  item.verified ? "text-success" : "text-ink",
                  item.wide
                    ? "text-[1.0625rem] leading-snug md:text-[1.25rem]"
                    : "text-[1.75rem] md:text-[2.25rem]",
                )}
              >
                {item.display}
              </span>
            );

            return (
              <div
                key={item.label}
                className={cn(
                  "px-1 py-7 md:py-9",
                  /* Hairlines between cells rather than around them: a left
                     border on everything except the first item in each row. */
                  i % 2 !== 0 && "border-l border-border pl-6",
                  i >= 2 && "border-t border-border lg:border-t-0",
                  i % 4 !== 0 && "lg:border-l lg:pl-6",
                )}
              >
                <dd>
                  {item.href ? (
                    <Link href={item.href} className="group inline-flex items-baseline gap-2">
                      {value}
                      <ArrowIcon className="h-4 w-4 shrink-0 text-ink-soft transition-[color,translate] duration-200 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </Link>
                  ) : (
                    value
                  )}
                </dd>
                <dt className="mt-3 text-[0.9375rem] leading-snug font-medium text-ink">
                  {item.label}
                </dt>
                <p className="ds-meta mt-1.5 normal-case">{item.note}</p>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}

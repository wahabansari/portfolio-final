import Link from "next/link";
import { about, hero, proof, site } from "@/content/site";
import { ArrowIcon, Counter, DownloadIcon, Field, Reveal } from "./ui";

/**
 * Hero. Identity, outcome, proof and two actions — in that order, above the
 * fold, in the initial HTML.
 *
 * The aside is a credentials panel rather than a portrait or an illustration.
 * A visitor deciding whether to keep reading wants the same four facts a
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
              <p className="ds-chip ds-chip-accent">
                {site.available && (
                  <span aria-hidden className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                  </span>
                )}
                {hero.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.04}>
              {/* The one h1 on the page. */}
              <h1 className="ds-display mt-7 max-w-[19ch]">{hero.headline}</h1>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="ds-lede ds-measure mt-7">{hero.support}</p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link href={hero.primaryCta.href} className="ds-btn ds-btn-primary">
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
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DownloadIcon className="h-4 w-4" />
                  View résumé
                </a>
              </div>
            </Reveal>
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
                <span className="ds-chip ds-chip-success">Verified · 30% Core Web Vitals</span>
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
 * The proof strip. Four readouts, hairline-separated, on the soft band that
 * closes the hero. Every figure here has to be defensible — the 30% is the
 * only measured performance claim on the site, and it links to the case study
 * that explains how it was measured rather than sitting as a bare number.
 */
export function ProofStrip() {
  return (
    <div className="border-t border-border bg-surface">
      <div className="ds-container">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {proof.map((item, i) => (
            <div
              key={item.label}
              className={[
                "px-1 py-7 md:py-9",
                /* Hairlines between cells, not around them: a left border on
                   everything except the first item in each row. */
                i % 2 !== 0 && "border-l border-border pl-6",
                i >= 2 && "border-t border-border lg:border-t-0",
                i % 4 !== 0 && "lg:border-l lg:pl-6",
                i === 2 && "lg:border-l",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <dd className="font-display text-[1.75rem] leading-none font-medium tracking-[-0.0083em] text-ink md:text-[2.25rem]">
                {item.numeric ? (
                  <Counter to={item.value} suffix={item.suffix} />
                ) : (
                  <span className="text-[1.0625rem] leading-snug md:text-[1.25rem]">
                    {item.display}
                  </span>
                )}
              </dd>
              <dt className="mt-3 text-[0.9375rem] leading-snug font-medium text-ink">
                {item.label}
              </dt>
              <p className="ds-meta mt-1.5 normal-case">{item.note}</p>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

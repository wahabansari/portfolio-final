import Link from "next/link";
import { about, hero, proof, site } from "@/content/site";
import { ArrowIcon, DownloadIcon, Reveal } from "./ui";
import { cn } from "@/lib/cn";

/**
 * Hero — centred opener with light animated grid, compact proof strip and
 * credentials row. All figures are static server-rendered text.
 */

function accentPhrase(headline: string, phrase: string) {
 const [lead, tail] = headline.split(phrase);
 if (!tail) return headline;
 return (
 <>
 {lead}
 <span className="ds-grad-text">{phrase}</span>
 {tail}
 </>
 );
}

export function Hero() {
 return (
 <section className="relative overflow-hidden border-b border-border">
 <div className="relative z-10 ds-container pt-16 md:pt-24">
 <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
 {site.available && (
 <Reveal>
 <span className="ds-chip ds-chip-accent">
 <span aria-hidden className="relative flex h-1.5 w-1.5">
 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
 <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
 </span>
 {hero.availability}
 </span>
 </Reveal>
 )}

 <Reveal delay={0.04}>
 <span className="ds-overline mt-7">{hero.eyebrow}</span>
 </Reveal>

 <Reveal delay={0.08}>
 <h1 className="ds-display mt-6">{accentPhrase(hero.headline, "React & Next.js")}</h1>
 </Reveal>

 <Reveal delay={0.12}>
 <p className="ds-lede mt-7">{hero.support}</p>
 </Reveal>

 <Reveal delay={0.16}>
 <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
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
 </div>

 {/* Proof band — four figures in a flat band with hairline dividers.
 Wide enough that even the stack readout sits on one line, and
 generous padding so the numbers carry the row without boxes. */}
 <Reveal delay={0.2}>
 <div className="mx-auto mt-16 max-w-6xl md:mt-20">
 <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
 {proof.map((item) => {
 const value = (
 <span
 className={cn(
 "font-display leading-none font-medium tracking-[-0.0083em] tabular-nums",
 item.verified ? "text-accent" : "text-ink",
 item.wide
 ? "text-[0.9375rem] leading-snug md:text-[1.0625rem]"
 : "text-[1.875rem] md:text-[2.25rem]",
 )}
 >
 {item.display}
 </span>
 );

 return (
 <div
 key={item.label}
 className="flex flex-col items-center bg-surface px-6 py-8 text-center md:px-10 md:py-10"
 >
 <dd className="flex items-baseline gap-1.5">
 {item.href ? (
 <Link href={item.href} className="group inline-flex items-baseline gap-1">
 {value}
 <ArrowIcon
 className={cn(
 "h-3.5 w-3.5 shrink-0 transition-[color,translate] duration-200",
 item.verified
 ? "text-accent"
 : "text-ink-soft group-hover:translate-x-0.5 group-hover:text-accent",
 )}
 />
 </Link>
 ) : (
 value
 )}
 </dd>
 <dt className="mt-3 text-[0.875rem] leading-snug font-medium text-ink">
 {item.label}
 </dt>
 <p className="mt-1 text-[0.8125rem] leading-snug text-ink-muted">
 {item.note}
 </p>
 </div>
 );
 })}
 </dl>
 </div>
 </Reveal>
 </div>

 {/* At-a-glance marquee — full-viewport width, white band, the six facts
 scrolling as an infinite horizontal strip. Track rendered twice
 (second copy aria-hidden) and CSS translates it by -50% for the
 seamless loop; pauses on hover, static under reduced motion. */}
 <Reveal delay={0.24}>
 <div className="ds-marquee-paused relative mt-16 overflow-hidden border-b border-border bg-card md:mt-20">
 <div
 aria-hidden
 className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-card to-transparent md:w-28"
 />
 <div
 aria-hidden
 className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-card to-transparent md:w-28"
 />

 <div className="ds-marquee-track flex w-max items-stretch py-7">
 {[0, 1].map((copy) => (
 <dl
 key={copy}
 aria-hidden={copy === 1 || undefined}
 className="flex shrink-0 items-stretch"
 >
 <div className="flex items-center pr-8 md:pr-12">
 <span className="ds-overline">At a glance</span>
 </div>
 {about.facts.map((f, j) => (
 <div key={f.k} className="flex shrink-0 items-center">
 <div className="flex flex-col px-8 md:px-12">
 <dt className="text-[0.6875rem] font-semibold tracking-[0.1em] whitespace-nowrap text-ink-soft uppercase">
 {f.k}
 </dt>
 <dd className="mt-1 text-[0.9375rem] leading-snug font-medium whitespace-nowrap text-ink">
 {f.v}
 </dd>
 </div>
 {j < about.facts.length - 1 && (
 <span aria-hidden className="h-9 w-px shrink-0 bg-border" />
 )}
 </div>
 ))}
 </dl>
 ))}
 </div>
 </div>
 </Reveal>
 </section>
 );
}

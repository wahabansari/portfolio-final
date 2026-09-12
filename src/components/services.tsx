import Link from "next/link";
import { serviceGroups, services, TIER_LABEL } from "@/content/services";
import { ArrowIcon, CheckIcon, Reveal, Section, SectionHeading } from "./ui";
import { cn } from "@/lib/cn";

/**
 * The services display on the homepage.
 *
 * Seven equal tabs make the buyer reconcile seven promises at once. This
 * layout states the hierarchy plainly instead: the primary offering — frontend
 * product engineering — is presented large in its own featured panel, and the
 * six engagement shapes that surround it are a numbered directory to its side.
 * No interaction is hidden behind a click, the ranking is declared outright,
 * and every service's story stays in the initial HTML.
 */

const [primaryService] = services;
const surrounding = services.slice(1);

/** The core offering — a full-width featured band: story on the left,
 best-fit + action on the right. */
function CoreBand() {
 const sv = primaryService;

 return (
 <div className="rounded-2xl border border-accent/20 bg-accent-soft/40 p-7 md:p-10">
 <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
 <div className="lg:col-span-7">
 <div className="flex flex-wrap items-center gap-3">
 <span className="ds-chip ds-chip-accent">{sv.eyebrow}</span>
 <span className="ds-meta">{TIER_LABEL[sv.tier]}</span>
 </div>

 <h3 className="ds-h2 mt-5">{sv.title}</h3>
 <p className="ds-body mt-3">{sv.definition}</p>
 </div>

 <div className="lg:col-span-5">
 <p className="ds-meta text-ink-muted">Best for</p>
 <ul className="mt-4 space-y-3">
 {sv.idealFor.slice(0, 3).map((fit) => (
 <li key={fit} className="flex items-start gap-2.5">
 <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-success" />
 <span className="text-[0.9375rem] leading-relaxed text-ink">{fit}</span>
 </li>
 ))}
 </ul>

 <Link
 href={`/services/${sv.slug}`}
 data-track="cta_click"
 data-track-label={`home-services:${sv.slug}`}
 className="ds-btn ds-btn-primary mt-7"
 >
 Explore {sv.title}
 <ArrowIcon />
 </Link>
 </div>
 </div>
 </div>
 );
}

/** The six engagement shapes encircling the core offer — a hairline grid of
 equal cells so nothing outranks anything else outside the core. */
function SurroundingGrid() {
 return (
 <div className="mt-8">
 <p className="ds-meta text-ink-muted">Also covered</p>
 <ul className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
 {surrounding.map((sv, i) => (
 <Reveal as="li" key={sv.slug} delay={i * 0.04} className="h-full">
 <Link
 href={`/services/${sv.slug}`}
 data-track="cta_click"
 data-track-label={`home-services:${sv.slug}`}
 className="group flex h-full flex-col bg-card p-6 transition-colors hover:bg-surface md:p-7"
 >
 <span className="flex items-center justify-between">
 <span className="font-display text-[0.8125rem] font-semibold text-ink-soft tabular-nums">
 {String(i + 2).padStart(2, "0")}
 </span>
 <span className="ds-meta">{TIER_LABEL[sv.tier]}</span>
 </span>

 <h4 className="ds-title mt-4 text-ink transition-colors group-hover:text-accent">
 {sv.title}
 </h4>
 <p className="ds-body-sm mt-2 text-ink-muted">{sv.summary}</p>

 <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.875rem] font-semibold text-accent">
 Explore
 <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
 </span>
 </Link>
 </Reveal>
 ))}
 </ul>
 </div>
 );
}

/** Homepage block. */
export function ServicesOverview({ tone = "plain" }: { tone?: "plain" | "soft" | "deep" }) {
 return (
 <Section id="services" tone={tone}>
 <SectionHeading
 overline="What I do"
 title="One core offering, and the work that surrounds it"
 description="Every engagement is production frontend delivery. What changes is the shape — a new product, a rebuild, a migration, or capacity behind your brand."
 align="between"
 aside={
 <Link href="/services" className="ds-btn ds-btn-secondary">
 Compare services
 <ArrowIcon />
 </Link>
 }
 />
 <Reveal>
 <CoreBand />
 </Reveal>
 <SurroundingGrid />
 </Section>
 );
}

/**
 * /services hub — the full set as rows, grouped by tier.
 *
 * Rows rather than a card grid: the ordering is information here, and rows let
 * the eye run down titles without a card boundary interrupting every line.
 */
export function ServicesList() {
 return (
 <Section tone="plain">
 <div className="space-y-14">
 {serviceGroups.map((group) => (
 <div key={group.tier}>
 <div className="flex items-baseline justify-between gap-6">
 <h2 className="ds-meta">{group.label}</h2>
 <span className="ds-meta">
 {group.items.length} {group.items.length === 1 ? "service" : "services"}
 </span>
 </div>

 <ul className="mt-5 border-t border-border">
 {group.items.map((service, i) => (
 <Reveal as="li" key={service.slug} delay={i * 0.04}>
 <Link
 href={`/services/${service.slug}`}
 data-track="cta_click"
 data-track-label={`hub:${service.slug}`}
 className="group grid grid-cols-1 items-baseline gap-x-8 gap-y-3 border-b border-border py-7 transition-colors hover:bg-surface md:grid-cols-12 md:py-8"
 >
 <span className="md:col-span-5 md:pl-2">
 <span
 className={cn(
 "ds-h3 block text-ink transition-colors group-hover:text-accent",
 )}
 >
 {service.title}
 </span>
 <span className="ds-meta mt-2 block">{service.eyebrow}</span>
 </span>

 <span className="ds-body md:col-span-6">{service.summary}</span>

 <span className="flex md:col-span-1 md:justify-end md:pr-2">
 <span
 aria-hidden
 className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-soft transition-[border-color,color,translate] duration-200 group-hover:translate-x-0.5 group-hover:border-accent group-hover:text-accent"
 >
 <ArrowIcon />
 </span>
 </span>
 </Link>
 </Reveal>
 ))}
 </ul>
 </div>
 ))}
 </div>
 </Section>
 );
}

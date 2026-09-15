import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Accordion } from "./ds";
import { Reveal } from "./motion";

export { Reveal } from "./motion";
export { cn } from "@/lib/cn";

/* ── Layout ─────────────────────────────────────────────────────────────── */

export function Section({
 id,
 children,
 className,
 tone = "plain",
 bordered = false,
}: {
 id?: string;
 children: ReactNode;
 className?: string;
 /** Bands alternate; two touching sections never share a fill. */
 tone?: "plain" | "soft" | "deep";
 /** A hairline above the section, for when two plain bands have to meet. */
 bordered?: boolean;
}) {
 return (
 <section
 id={id}
 className={cn(
 "ds-section scroll-mt-20",
 tone === "soft" && "bg-surface",
 tone === "deep" && "bg-surface-2",
 bordered && "border-t border-border",
 className,
 )}
 >
 <div className="ds-container">{children}</div>
 </section>
 );
}

/**
 * Section opener. The overline is a plain blue label, so the markup here stays
 * a heading and a paragraph — which is also what a crawler and a screen reader
 * get.
 */
export function SectionHeading({
 overline,
 title,
 description,
 aside,
 level = "h2",
 align = "center",
 size,
}: {
 overline: string;
 title: ReactNode;
 description?: string;
 aside?: ReactNode;
 level?: "h1" | "h2";
 align?: "left" | "center" | "between";
 size?: "default" | "sm";
}) {
 const Heading = level;
 return (
 <Reveal className="mb-10 md:mb-14">
 <div
 className={cn(
 "flex flex-col gap-6",
 align === "center" && "items-center text-center",
 align === "between" && "md:flex-row md:items-end md:justify-between",
 )}
 >
 <div className={cn("max-w-3xl", align === "center" && "text-center")}>
 <span className="ds-overline">{overline}</span>
 <Heading
 className={cn(
 "mt-5",
 level === "h1"
 ? "ds-h1"
 : size === "sm"
 ? "ds-h3"
 : "ds-h2",
 )}
 >
 {title}
 </Heading>
 {description && <p className="ds-lede mt-5 mx-auto">{description}</p>}
 </div>
 {aside && <div className="shrink-0">{aside}</div>}
 </div>
 </Reveal>
 );
}

/* ── Icons ──────────────────────────────────────────────────────────────── */

export function ArrowIcon({ className }: { className?: string }) {
 return (
 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
 <path d="M13.3 5.3a1 1 0 0 0 0 1.4l4.3 4.3H4a1 1 0 1 0 0 2h13.6l-4.3 4.3a1 1 0 1 0 1.4 1.4l6-6a1 1 0 0 0 0-1.4l-6-6a1 1 0 0 0-1.4 0z" />
 </svg>
 );
}

export function ExternalIcon({ className }: { className?: string }) {
 return (
 <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
 <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.6l-9.8 9.8 1.4 1.4L19 6.4V10h2V3h-7z" />
 </svg>
 );
}

export function DownloadIcon({ className }: { className?: string }) {
 return (
 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
 <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
 </svg>
 );
}

export function SearchIcon({ className }: { className?: string }) {
 return (
 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
 <circle cx="11" cy="11" r="7" />
 <path d="m20 20-3.5-3.5" />
 </svg>
 );
}

export function CheckIcon({ className }: { className?: string }) {
 return (
 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
 <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
 </svg>
 );
}

export function MinusIcon({ className }: { className?: string }) {
 return (
 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
 <path d="M5 11h14v2H5z" />
 </svg>
 );
}

export function UserIcon({ className }: { className?: string }) {
 return (
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
 <circle cx="12" cy="8" r="3.5" />
 <path d="M5 20c0-3.6 3.1-5.5 7-5.5s7 1.9 7 5.5" />
 </svg>
 );
}

export function FileCheckIcon({ className }: { className?: string }) {
 return (
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
 <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8z" />
 <path d="M14 3v5h5" />
 <path d="m9 14 2 2 4-4" />
 </svg>
 );
}

export function GaugeIcon({ className }: { className?: string }) {
 return (
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
 <path d="M3 15a9 9 0 1 1 18 0" />
 <path d="M12 15 16 9" />
 <path d="M7.5 17.5A3.5 3.5 0 0 1 12 14" />
 </svg>
 );
}

export function CodeIcon({ className }: { className?: string }) {
 return (
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
 <path d="m8 7-5 5 5 5" />
 <path d="m16 7 5 5-5 5" />
 </svg>
 );
}

export function MailIcon({ className }: { className?: string }) {
 return (
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
 <rect x="3" y="5" width="18" height="14" rx="2" />
 <path d="m3 7 9 6 9-6" />
 </svg>
 );
}

export function GithubIcon({ className }: { className?: string }) {
 return (
 <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
 <path d="M12 2A10 10 0 0 0 8.8 21.8c.5.1.7-.2.7-.5v-1.7c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.5 4.9.3.3.6.8.6 1.6v2.4c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
 </svg>
 );
}

export function LinkedinIcon({ className }: { className?: string }) {
 return (
 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
 <path d="M4.98 3.5A2.5 2.5 0 0 0 2.5 6a2.5 2.5 0 0 0 2.48 2.5A2.5 2.5 0 0 0 7.5 6a2.5 2.5 0 0 0-2.52-2.5zM3 9h4v12H3V9zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.4c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9V9z" />
 </svg>
 );
}

/* ── Wordmark ───────────────────────────────────────────────────────────────
 The full name, not a first name. On a site whose job is to be trusted by
 someone deciding whether to hire, the legal name is the asset — and it is
 the string that has to stay identical across the site, the résumé, LinkedIn
 and the Person structured data for the entity to resolve to one person. */

export function Wordmark({
  compact = false,
  role,
}: {
  compact?: boolean;
  role?: string;
}) {
  return (
    <span className="flex items-center gap-3">
      <span aria-hidden className="relative flex h-9 w-9 shrink-0 items-center justify-center">
        <svg viewBox="0 0 36 36" fill="none" className="h-full w-full">
          <rect width="36" height="36" rx="8" fill="currentColor" className="text-accent" />
          <path
            d="M9 26V10l4.5 10L18 10l4.5 10L27 10v16"
            stroke="currentColor"
            className="text-accent-fg"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="18"
            y1="10"
            x2="18"
            y2="7"
            stroke="currentColor"
            className="text-accent-fg"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.9375rem] font-semibold tracking-[-0.005em] text-ink">
          Wahab Ansari
        </span>
        {!compact && (
          <span className="ds-meta mt-1.5 hidden text-[0.6875rem] sm:block">
            {role ?? site.role}
          </span>
        )}
      </span>
    </span>
  );
}

/* ── Metadata pair ──────────────────────────────────────────────────────── */

export function Field({
 label,
 value,
 className,
}: {
 label: string;
 value: ReactNode;
 /* Layout classes belong here, not on a wrapper element: a <div> inside a
 <dl> has to contain the dt/dd pair directly, so nesting one more div
 around a Field makes the list malformed. */
 className?: string;
}) {
 return (
 <div className={cn("flex flex-col gap-1.5", className)}>
 <dt className="ds-meta">{label}</dt>
 <dd className="text-[0.9375rem] font-medium text-ink">{value}</dd>
 </div>
 );
}

/* ── Chips ──────────────────────────────────────────────────────────────── */

export function ChipList({ items, className }: { items: readonly string[]; className?: string }) {
 return (
 <ul className={cn("flex flex-wrap gap-2", className)}>
 {items.map((item) => (
 <li key={item} className="ds-chip">
 {item}
 </li>
 ))}
 </ul>
 );
}

/* ── FAQ ────────────────────────────────────────────────────────────────────
 Delegates to the client accordion, which owns the open state. The answers
 themselves are rendered server-side inside it, so they are in the initial
 HTML whether or not a panel is open. */

export function Faqs({
 faqs,
 className,
}: {
 faqs: readonly { q: string; a: string }[];
 className?: string;
}) {
 const entries = faqs.map((f, i) => ({
 value: `faq-${i}`,
 title: f.q,
 panel: <p className="ds-body">{f.a}</p>,
 }));
 return <Accordion entries={entries} className={className} />;
}

/* ── Fit lists ──────────────────────────────────────────────────────────────
 "Who this is for" beside "who it is not for". The second column is the one
 that earns trust: a service page that cannot name anyone it is wrong for is
 a sales page. Side-by-side soft cards — no outlines. */

export function FitLists({
 idealFor,
 notIdealFor,
}: {
 idealFor: readonly string[];
 notIdealFor: readonly string[];
}) {
 return (
 <div className="grid gap-4 md:grid-cols-2">
 <div className="rounded-[var(--radius-card)] bg-surface p-7">
 <p className="ds-meta text-success">A good fit</p>
 <ul className="mt-5 space-y-3.5">
 {idealFor.map((item) => (
 <li key={item} className="flex items-start gap-3">
 <CheckIcon className="mt-1 shrink-0 text-success" />
 <span className="text-[0.9375rem] leading-relaxed text-ink">{item}</span>
 </li>
 ))}
 </ul>
 </div>
 <div className="rounded-[var(--radius-card)] bg-surface p-7">
 <p className="ds-meta">Not a fit</p>
 <ul className="mt-5 space-y-3.5">
 {notIdealFor.map((item) => (
 <li key={item} className="flex items-start gap-3">
 <MinusIcon className="mt-1 shrink-0 text-ink-soft" />
 <span className="text-[0.9375rem] leading-relaxed text-ink-muted">{item}</span>
 </li>
 ))}
 </ul>
 </div>
 </div>
 );
}

/* ── Numbered steps ─────────────────────────────────────────────────────────
 A grid of soft cards rather than a hairline table: each step is a #F8F9FA
 fill on the white band, with a plain blue index number — no boxes inside
 boxes. */

export function StepList({
  steps,
  columns = 4,
}: {
  steps: readonly { step: string; detail: string }[];
  columns?: 4 | 5;
}) {
  return (
    <ol
      className={cn(
        "grid gap-4 sm:grid-cols-2",
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-5",
      )}
    >
      {steps.map((s, i) => (
        <li key={s.step} className="flex flex-col rounded-[var(--radius-card)] bg-surface p-6">
          <span
            aria-hidden
            className="font-display text-[0.8125rem] font-medium text-accent tabular-nums"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="ds-title mt-4">{s.step}</h3>
          <p className="ds-body-sm mt-2.5">{s.detail}</p>
        </li>
      ))}
    </ol>
  );
}

/* ── CTA band ───────────────────────────────────────────────────────────────
 One dominant action, wherever this appears. */

export function CtaBand({
  heading,
  body,
  primary,
  secondary,
  steps,
  tone = "soft",
  navy = false,
}: {
  heading: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  /**
   * The enquiry sequence, shown beside the action on the page where the
   * decision is actually made. "What happens after I click this" is the last
   * unanswered question at the point of conversion, and answering it in place
   * costs less friction than a reassurance paragraph does.
   */
  steps?: readonly { step: string; detail: string }[];
  tone?: "plain" | "soft" | "deep";
  /**
   * Renders the band as the closing bookend: a full-bleed tonal-blue panel
   * (#E8F0FE) with ink type and the filled blue action. When off, the band
   * stays on the section tone with the accent hairline.
   */
  navy?: boolean;
}) {
  const hasSteps = Boolean(steps?.length);

  if (navy) {
    return (
      <Section tone={tone}>
        <Reveal>
          <div className="rounded-[1.75rem] bg-surface-blue px-6 py-12 sm:px-10 md:px-14 md:py-16">
            <div
              className={cn(
                "relative",
                hasSteps ? "grid gap-10 lg:grid-cols-12 lg:gap-16" : "max-w-3xl",
              )}
            >
              <div className={hasSteps ? "lg:col-span-7" : undefined}>
                <h2 className="ds-h2">{heading}</h2>
                <p className="ds-lede mt-5">{body}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={primary.href}
                    data-track={primary.href === "/contact" ? "cta_click" : undefined}
                    data-track-label="cta-band"
                    className="ds-btn ds-btn-primary"
                  >
                    {primary.label}
                    <ArrowIcon />
                  </Link>
                  {secondary && (
                    <Link href={secondary.href} className="ds-btn ds-btn-secondary">
                      {secondary.label}
                    </Link>
                  )}
                </div>
              </div>

              {steps && steps.length > 0 && (
                <div className="lg:col-span-5">
                  <p className="ds-meta">What happens next</p>
                  <ol className="mt-5 space-y-5 border-t border-accent-line pt-5">
                    {steps.map((item, i) => (
                      <li key={item.step} className="flex gap-4">
                        <span
                          aria-hidden
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-card text-[0.75rem] font-semibold text-accent"
                        >
                          {i + 1}
                        </span>
                        <span>
                          <span className="block text-[0.9375rem] font-medium text-ink">
                            {item.step}
                          </span>
                          <span className="ds-body-sm mt-1 block">{item.detail}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </Section>
    );
  }

  return (
    <Section tone={tone}>
      <Reveal>
        <div className="relative border-t border-border pt-8 md:pt-10">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-accent-line"
          />
          <div
            className={cn(
              "relative",
              hasSteps ? "grid gap-10 lg:grid-cols-12 lg:gap-16" : "max-w-2xl",
            )}
          >
            <div className={hasSteps ? "lg:col-span-7" : undefined}>
              <h2 className="ds-h2">{heading}</h2>
              <p className="ds-lede mt-5">{body}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={primary.href}
                  data-track={primary.href === "/contact" ? "cta_click" : undefined}
                  data-track-label="cta-band"
                  className="ds-btn ds-btn-primary"
                >
                  {primary.label}
                  <ArrowIcon />
                </Link>
                {secondary && (
                  <Link href={secondary.href} className="ds-btn ds-btn-secondary">
                    {secondary.label}
                  </Link>
                )}
              </div>
            </div>

            {steps && steps.length > 0 && (
              <div className="lg:col-span-5">
                <p className="ds-meta">What happens next</p>
                <ol className="mt-5 space-y-5 border-t border-border pt-5">
                  {steps.map((item, i) => (
                    <li key={item.step} className="flex gap-4">
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[0.75rem] font-semibold text-accent"
                      >
                        {i + 1}
                      </span>
                      <span>
                        <span className="block text-[0.9375rem] font-medium text-ink">
                          {item.step}
                        </span>
                        <span className="ds-body-sm mt-1 block">{item.detail}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── Breadcrumbs ────────────────────────────────────────────────────────────
 Real anchors, matching the BreadcrumbList emitted alongside them. Structured
 data has to describe what is visibly on the page. */

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
 return (
 <nav aria-label="Breadcrumb">
 <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
 {trail.map((crumb, i) => {
 const last = i === trail.length - 1;
 return (
 <li key={crumb.label} className="flex items-center gap-2">
 {crumb.href && !last ? (
 <Link
 href={crumb.href}
 className="inline-flex min-h-8 items-center py-1 text-[0.8125rem] text-accent hover:underline"
 >
 {crumb.label}
 </Link>
 ) : (
 <span
 className="inline-flex min-h-8 items-center py-1 text-[0.8125rem] text-ink-muted"
 aria-current={last ? "page" : undefined}
 >
 {crumb.label}
 </span>
 )}
 {!last && (
 <span aria-hidden className="text-[0.8125rem] text-ink-soft select-none">
 /
 </span>
 )}
 </li>
 );
 })}
 </ol>
 </nav>
 );
}

/**
 * The header band every inner page opens with. Breadcrumbs, eyebrow, the one
 * h1, its value proposition, and the page's dominant action — on the soft
 * band, so the page has a distinct head and body.
 */
export function PageHeader({
 trail,
 eyebrow,
 title,
 lede,
 intro,
 actions,
 aside,
}: {
 trail?: Crumb[];
 eyebrow?: string;
 title: string;
 lede?: string;
 intro?: readonly string[];
 actions?: ReactNode;
 aside?: ReactNode;
}) {
 return (
 <section className="relative overflow-hidden border-b border-border bg-surface pt-6 pb-14 md:pt-8 md:pb-20">
 <div className="ds-container relative">
 {trail && <Breadcrumbs trail={trail} />}

 <div className={cn("grid gap-10 lg:grid-cols-12 lg:gap-16", trail && "mt-8")}>
 <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
 {eyebrow && <span className="ds-overline">{eyebrow}</span>}
 <h1 className={cn("ds-h1", eyebrow && "mt-5")}>{title}</h1>
 {lede && <p className="ds-lede mt-6">{lede}</p>}

 {intro && (
 <div className=" mt-6 space-y-4">
 {intro.map((p) => (
 <p key={p} className="ds-body">
 {p}
 </p>
 ))}
 </div>
 )}

 {actions && (
 <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>
 )}
 </div>

 {aside && <div className="lg:col-span-5">{aside}</div>}
 </div>
 </div>
 </section>
 );
}

/**
 * The answer-first block. One sentence, visually set apart, near the top of
 * every service page — the thing a reader skimming for thirty seconds, or a
 * generative search system extracting an answer, should come away with.
 */
export function Definition({ term, children }: { term: string; children: ReactNode }) {
 return (
 <div className="border-l-[3px] border-l-accent bg-accent-soft p-7 md:p-8">
 <p className="ds-meta text-accent">{term}</p>
 <p className=" mt-3 font-display text-[1.1875rem] leading-[1.55] font-medium text-ink md:text-[1.3125rem]">
 {children}
 </p>
 </div>
 );
}

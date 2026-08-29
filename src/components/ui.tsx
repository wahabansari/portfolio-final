import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Accordion } from "./accordion";
import { Reveal } from "./motion";

export { Reveal } from "./motion";

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
 * Section opener. The overline carries its own rule (drawn in CSS), so the
 * markup here stays a heading and a paragraph — which is also what a crawler
 * and a screen reader get.
 */
export function SectionHeading({
  overline,
  title,
  description,
  aside,
  level = "h2",
  align = "left",
}: {
  overline: string;
  title: ReactNode;
  description?: string;
  aside?: ReactNode;
  level?: "h1" | "h2";
  align?: "left" | "between";
}) {
  const Heading = level;
  return (
    <Reveal className="mb-10 md:mb-14">
      <div
        className={cn(
          "flex flex-col gap-6",
          align === "between" && "md:flex-row md:items-end md:justify-between",
        )}
      >
        <div className="max-w-3xl">
          <span className="ds-overline">{overline}</span>
          <Heading className={cn("mt-5", level === "h1" ? "ds-h1" : "ds-h2")}>{title}</Heading>
          {description && <p className="ds-lede ds-measure mt-5">{description}</p>}
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

/* ── Wordmark ───────────────────────────────────────────────────────────────
   The full name, not a first name. On a site whose job is to be trusted by
   someone deciding whether to hire, the legal name is the asset — and it is
   the string that has to stay identical across the site, the résumé, LinkedIn
   and the Person structured data for the entity to resolve to one person. */

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-accent font-display text-[0.9375rem] leading-none font-medium text-accent-fg"
      >
        W
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.9375rem] font-medium tracking-[-0.005em] text-ink">
          Wahab Ansari
        </span>
        {!compact && (
          <span className="ds-meta mt-1 hidden text-[0.6875rem] sm:block">
            Frontend Product Engineer
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
  return <Accordion items={faqs} className={className} />;
}

/* ── Fit lists ──────────────────────────────────────────────────────────────
   "Who this is for" beside "who it is not for". The second column is the one
   that earns trust: a service page that cannot name anyone it is wrong for is
   a sales page. */

export function FitLists({
  idealFor,
  notIdealFor,
}: {
  idealFor: readonly string[];
  notIdealFor: readonly string[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
      <div className="ds-card p-7">
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
      <div className="ds-card p-7">
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
   A hairline grid rather than separate cards: the 1px gap over a border-
   coloured background draws every divider at once, and the steps read as one
   sequence instead of four unrelated boxes. */

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
        "grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border sm:grid-cols-2",
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-5",
      )}
    >
      {steps.map((s, i) => (
        <li key={s.step} className="flex flex-col bg-card p-6">
          <span className="ds-meta text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="ds-title-sm mt-3">{s.step}</h3>
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
  tone = "soft",
}: {
  heading: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  tone?: "plain" | "soft" | "deep";
}) {
  return (
    <Section tone={tone}>
      <Reveal className="ds-card overflow-hidden">
        <div className="relative px-7 py-12 md:px-14 md:py-16">
          <span aria-hidden className="ds-grid-field pointer-events-none absolute inset-0" />
          <div className="relative max-w-2xl">
            <h2 className="ds-h2">{heading}</h2>
            <p className="ds-lede mt-5">{body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={primary.href}
                data-track={primary.href === "/contact" ? "cta_start_project" : undefined}
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
      <span aria-hidden className="ds-grid-field pointer-events-none absolute inset-0" />
      <div className="ds-container relative">
        {trail && <Breadcrumbs trail={trail} />}

        <div className={cn("grid gap-10 lg:grid-cols-12 lg:gap-16", trail && "mt-8")}>
          <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
            {eyebrow && <span className="ds-overline">{eyebrow}</span>}
            <h1 className={cn("ds-h1", eyebrow && "mt-5")}>{title}</h1>
            {lede && <p className="ds-lede ds-measure mt-6">{lede}</p>}

            {intro && (
              <div className="ds-measure mt-6 space-y-4">
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
    <div className="ds-card border-l-2 border-l-accent p-7 md:p-8">
      <p className="ds-meta text-accent">{term}</p>
      <p className="ds-measure mt-3 font-display text-[1.1875rem] leading-[1.55] font-medium text-ink md:text-[1.3125rem]">
        {children}
      </p>
    </div>
  );
}

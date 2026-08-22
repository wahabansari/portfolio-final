import Link from "next/link";
import type { ReactNode } from "react";
import type { Accent, ServiceCategory, ServiceDetail } from "@/content/services";
import { site } from "@/content/site";

/** Brand colour per category. Used on artwork only, never on text. */
export const ACCENT_VAR: Record<Accent, string> = {
  blue: "var(--color-g-blue)",
  red: "var(--color-g-red)",
  yellow: "var(--color-g-yellow)",
  green: "var(--color-g-green)",
};

export const ACCENT_BG: Record<Accent, string> = {
  blue: "bg-g-blue",
  red: "bg-g-red",
  yellow: "bg-g-yellow",
  green: "bg-g-green",
};

/* ── Breadcrumbs ───────────────────────────────────────────────────────── */

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
                  className="g-body-sm inline-flex min-h-8 items-center py-1 !text-primary hover:underline"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className="g-body-sm inline-flex min-h-8 items-center py-1 text-ink"
                  aria-current={last ? "page" : undefined}
                >
                  {crumb.label}
                </span>
              )}
              {!last && (
                <span aria-hidden className="g-body-sm select-none">
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

/* ── Checklist ─────────────────────────────────────────────────────────── */

export function CheckList({
  items,
  accent,
}: {
  items: { title: string; detail: string }[];
  accent: Accent;
}) {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.title} className="g-card-soft p-6">
          <div className="flex items-start gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mt-0.5 shrink-0"
              style={{ color: ACCENT_VAR[accent] }}
              aria-hidden
            >
              <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
            <div>
              <h3 className="g-title-sm">{item.title}</h3>
              <p className="g-body mt-2 text-[0.9375rem]">{item.detail}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ── Numbered process ──────────────────────────────────────────────────── */

export function ProcessList({
  steps,
  accent,
}: {
  steps: { step: string; detail: string }[];
  accent: Accent;
}) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.step} className="g-card-plain p-6">
          {/*
            The number sits on a tint of the accent with ink text, not white on
            the solid colour. White reaches only 3.9:1 on Google red, 3.1:1 on
            green and 1.7:1 on yellow — all below AA. A tint keeps the colour
            association while the label stays readable at every accent.
          */}
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full text-[0.9375rem] font-medium text-ink"
            style={{
              background: `color-mix(in srgb, ${ACCENT_VAR[accent]} 18%, transparent)`,
            }}
          >
            {i + 1}
          </span>
          <h3 className="g-title-sm mt-4">{s.step}</h3>
          <p className="g-body mt-2 text-[0.9375rem]">{s.detail}</p>
        </li>
      ))}
    </ol>
  );
}

/* ── FAQ ───────────────────────────────────────────────────────────────────
   Native <details> rather than a JS accordion: it is keyboard accessible and
   findable by in-page search with no client bundle at all. */

export function Faqs({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="mx-auto max-w-3xl">
      {faqs.map((faq) => (
        <details key={faq.q} className="g-disclosure group border-b border-border py-2">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 marker:hidden [&::-webkit-details-marker]:hidden">
            <h3 className="g-title-sm">{faq.q}</h3>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            >
              <path d="M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6z" />
            </svg>
          </summary>
          <p className="g-body pr-8 pb-5">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ── Structured data ───────────────────────────────────────────────────── */

export function ServiceJsonLd({
  category,
  service,
}: {
  category: ServiceCategory;
  service: ServiceDetail;
}) {
  const url = `${site.url}/services/${category.slug}/${service.slug}`;

  const graph = [
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.title,
      description: service.metaDescription,
      serviceType: service.title,
      url,
      provider: {
        "@type": "Person",
        name: site.name,
        jobTitle: site.role,
        url: site.url,
      },
      areaServed: { "@type": "Place", name: "Worldwide" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Services", item: `${site.url}/services` },
        {
          "@type": "ListItem",
          position: 2,
          name: category.shortTitle,
          item: `${site.url}/services/${category.slug}`,
        },
        { "@type": "ListItem", position: 3, name: service.title, item: url },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: service.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}

/**
 * Schema for a category page: where it sits in the hierarchy, plus the list of
 * services it contains so search engines can see the whole catalogue.
 */
export function CategoryJsonLd({ category }: { category: ServiceCategory }) {
  const url = `${site.url}/services/${category.slug}`;

  const graph = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
        { "@type": "ListItem", position: 3, name: category.shortTitle, item: url },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": url,
      name: category.title,
      description: category.metaDescription,
      url,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: category.services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.title,
          url: `${url}/${s.slug}`,
        })),
      },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}

/** Schema for the /services index — breadcrumb plus every category. */
export function ServicesIndexJsonLd({ categories }: { categories: ServiceCategory[] }) {
  const url = `${site.url}/services`;

  const graph = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Services", item: url },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": url,
      name: "Services",
      url,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: categories.flatMap((c) =>
          c.services.map((s) => ({
            "@type": "ListItem",
            name: s.title,
            url: `${url}/${c.slug}/${s.slug}`,
          })),
        ),
      },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}

/**
 * Real scenarios beat feature lists — a reader recognises their own situation
 * far faster than they parse a bullet of capabilities. Each row pairs the
 * situation with what changed.
 */
export function UseCases({
  cases,
  accent,
}: {
  cases: { scenario: string; outcome: string }[];
  accent: Accent;
}) {
  return (
    <ol className="grid gap-6 lg:grid-cols-3">
      {cases.map((c, i) => (
        <li key={i} className="g-card-plain flex h-full flex-col p-7">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-[0.875rem] font-medium text-ink"
            style={{
              background: `color-mix(in srgb, ${ACCENT_VAR[accent]} 18%, transparent)`,
            }}
          >
            {i + 1}
          </span>

          <p className="mt-5 text-[1rem] leading-relaxed font-medium text-ink">{c.scenario}</p>

          <div className="mt-5 flex flex-1 items-start gap-3 border-t border-border pt-5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mt-0.5 shrink-0"
              style={{ color: ACCENT_VAR[accent] }}
              aria-hidden
            >
              <path d="M13.3 5.3a1 1 0 0 0 0 1.4l4.3 4.3H4a1 1 0 1 0 0 2h13.6l-4.3 4.3a1 1 0 1 0 1.4 1.4l6-6a1 1 0 0 0 0-1.4l-6-6a1 1 0 0 0-1.4 0z" />
            </svg>
            <p className="g-body text-[0.9375rem]">{c.outcome}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * The header band every inner page opens with: breadcrumbs, an accent rule,
 * the h1 and its supporting copy, on the grey surface. Content below it sits on
 * white, so the page has a clear head and body rather than one long white run.
 */
export function PageHeader({
  trail,
  accent,
  overline,
  title,
  lede,
  intro,
  actions,
}: {
  trail?: Crumb[];
  accent?: Accent;
  overline?: string;
  title: string;
  lede?: string;
  intro?: string[];
  actions?: ReactNode;
}) {
  return (
    <section className="bg-surface pt-6 pb-12 md:pt-8 md:pb-16">
      <div className="g-container">
        {trail && <Breadcrumbs trail={trail} />}

        <div className={trail ? "mt-6" : undefined}>
          {accent && (
            <span
              aria-hidden
              className={`block h-1 w-12 rounded-full ${ACCENT_BG[accent]}`}
            />
          )}
          {overline && <p className={`g-overline ${accent ? "mt-5" : ""}`}>{overline}</p>}

          <h1 className={`g-display max-w-4xl ${accent || overline ? "mt-4" : ""}`}>{title}</h1>

          {lede && <p className="g-body-lg mt-5 max-w-2xl">{lede}</p>}

          {intro && (
            <div className="mt-7 max-w-2xl space-y-5">
              {intro.map((p, i) => (
                <p key={i} className="g-body text-[1.0625rem]">
                  {p}
                </p>
              ))}
            </div>
          )}

          {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
        </div>
      </div>
    </section>
  );
}

/** Breadcrumb + WebPage schema for the standalone pages. */
export function PageJsonLd({
  name,
  path,
  description,
}: {
  name: string;
  path: string;
  description: string;
}) {
  const url = `${site.url}${path}`;
  const graph = [
    {
      "@type": "WebPage",
      "@id": url,
      name,
      description,
      url,
      isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
      about: { "@type": "Person", name: site.name, url: site.url },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}

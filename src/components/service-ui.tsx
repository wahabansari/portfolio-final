import Link from "next/link";
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
                  className="g-body-sm inline-flex min-h-8 items-center py-1 hover:text-primary"
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
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full text-[0.9375rem] font-medium text-white"
            style={{ background: ACCENT_VAR[accent] }}
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
        <details key={faq.q} className="group border-b border-border py-2">
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

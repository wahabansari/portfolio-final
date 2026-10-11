/**
 * Client-safe service navigation list — the labels the header dropdown and
 * the footer need, without pulling the full services content tree into the
 * browser bundle (see the note in locale-provider.tsx: server content stays
 * server-side; only site-level content crosses that boundary).
 *
 * Slugs must match `services` in src/content/en/services.ts; `label` is the
 * dropdown wording, `footerLabel` the shorter footer wording (the service's
 * shortTitle).
 */
export const SERVICE_NAV = [
  {
    slug: "custom-web-development",
    label: "Custom Web Development",
    footerLabel: "Custom Web Development",
  },
  {
    slug: "business-dashboards",
    label: "Business Dashboards & Custom Software",
    footerLabel: "Business Dashboards",
  },
  {
    slug: "software-modernization",
    label: "Software Modernization",
    footerLabel: "Software Modernization",
  },
  {
    slug: "ai-business-automation",
    label: "AI Business Automation",
    footerLabel: "AI Business Automation",
  },
] as const;

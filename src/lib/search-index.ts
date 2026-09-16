/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SEARCH INDEX — server-only, consumed by the Spotlight client component.
 *
 * Built at render time in the root layout and passed as a serialised prop, so
 * the full content modules never enter the client bundle. Keeping this
 * deliberately compact: each entry carries just enough for a search algorithm
 * and one line of result UI.
 *
 * Additions flow in automatically — a maintenance note lives at the bottom.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { experience, hero } from "@/content/site";
import { services } from "@/content/services";
import { projects } from "@/content/work";
import { insights } from "@/content/insights";

export type SearchEntry = {
  type: "Page" | "Service" | "Project" | "Insight" | "Experience";
  title: string;
  href: string;
  /** One line, used as the result subtitle and also for matching. */
  excerpt: string;
  /** Low-priority search tokens. */
  keywords: string[];
};

/**
 * The indexing job. Runs server-side once per request (static pages cache it).
 * Only entry type, title, excerpt, href and keywords are sent to the client —
 * the full content modules (insights, services, etc.) stay server-only.
 */
export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [
    /* ── Pages ─────────────────────────────────────────────────────────────── */
    {
      type: "Page",
      title: "Home",
      href: "/",
      excerpt:
        hero.headline + " " + hero.support,
      keywords: ["home", "portfolio", "senior", "react", "next.js", "engineer", "hire"],
    },
    {
      type: "Page",
      title: "Work — React & Next.js projects",
      href: "/work",
      excerpt:
        "Selected production work and case studies across frontend engineering, performance and Next.js architecture.",
      keywords: ["projects", "case studies", "portfolio", "production work"],
    },
    {
      type: "Page",
      title: "Services",
      href: "/services",
      excerpt:
        "Seven frontend engineering services — build, migrate, modernise and partner.",
      keywords: ["services", "offerings", "engagements"],
    },
    {
      type: "Page",
      title: "About Wahab Ansari",
      href: "/about",
      excerpt:
        "Background, experience, capabilities and credentials — the person behind the portfolio.",
      keywords: ["about", "background", "experience", "capabilities", "resume", "education", "design system"],
    },
    {
      type: "Page",
      title: "Contact",
      href: "/contact",
      excerpt: "Send a project brief or discuss frontend engineering, SaaS, website or AI product work.",
      keywords: ["contact", "hire", "brief", "project", "inquiry"],
    },
    {
      type: "Page",
      title: "Insights",
      href: "/insights",
      excerpt:
        "First-hand notes on React, Next.js, migrations, performance and AI integration.",
      keywords: ["articles", "blog", "notes", "insights", "guides"],
    },

    /* ── Services ──────────────────────────────────────────────────────────── */
    ...services.map((s): SearchEntry => ({
      type: "Service",
      title: s.title,
      href: `/services/${s.slug}`,
      excerpt: s.summary || s.definition,
      keywords: s.keywords,
    })),

    /* ── Projects (inc. case studies) ──────────────────────────────────────── */
    ...projects.map((p): SearchEntry => ({
      type: "Project",
      title: p.title,
      href: p.caseStudy ? `/work/${p.slug}` : (p.href ?? "/work"),
      excerpt: p.blurb,
      keywords: [p.kind, p.role, ...p.tools],
    })),

    /* ── Insights ──────────────────────────────────────────────────────────── */
    ...insights.map((i): SearchEntry => ({
      type: "Insight",
      title: i.title,
      href: `/insights/${i.slug}`,
      excerpt: i.definition || i.dek,
      keywords: i.keywords,
    })),

    /* ── Experience ────────────────────────────────────────────────────────── */
    ...experience.map((e): SearchEntry => ({
      type: "Experience",
      title: `${e.role} — ${e.company}`,
      href: "/about",
      excerpt: e.summary,
      keywords: [e.company, e.role, e.client].filter(Boolean) as string[],
    })),
  ];

  return entries;
}

/**
 * MAINTENANCE: new insights, services or projects flow in automatically —
 * everything is pulled in by the imports above and spread with .map. Only
 * touch this file when you add an entry type or change a field's meaning.
 */

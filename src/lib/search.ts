import { insights } from "@/content/insights";
import { services } from "@/content/services";
import { hero, sections } from "@/content/site";
import { projects } from "@/content/work";

/**
 * Spotlight search index.
 *
 * Built by importing the content modules, so the index can never drift from
 * what the site actually contains — a page that is added to `sections`, a
 * service shipped to `services`, or an insight published to `insights` starts
 * appearing in search with no second list to maintain.
 *
 * The heavy content modules are ONLY pulled into the client through this file,
 * and the spotlight component loads it with a dynamic `import()`, so the full
 * article/service bodies stay out of the initial bundle and arrive as a chunk
 * the first time the search is opened.
 */

export type SearchGroup = "Page" | "Service" | "Work" | "Insight";

export type SearchEntry = {
  id: string;
  group: SearchGroup;
  title: string;
  /** One-line context shown under the title. */
  blurb?: string;
  href: string;
  /** Extra searchable text (eyebrows, clusters, problems) never shown. */
  keywords: string;
};

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  const pageEntries: { title: string; blurb?: string; href: string }[] = [
    { title: "Home", blurb: hero.eyebrow, href: "/" },
    ...sections.map((s) => ({ title: s.label, href: s.href })),
    { title: "Book a consultation", blurb: "Discuss your project", href: "/contact" },
  ];

  for (const [i, page] of pageEntries.entries()) {
    entries.push({
      id: `page-${i}`,
      group: "Page",
      title: page.title,
      blurb: page.blurb,
      href: page.href,
      keywords: "",
    });
  }

  for (const s of services) {
    entries.push({
      id: `svc-${s.slug}`,
      group: "Service",
      title: s.title,
      blurb: s.summary,
      href: `/services/${s.slug}`,
      keywords: [s.eyebrow, ...s.keywords, ...s.idealFor].join(" "),
    });
  }

  for (const p of projects) {
    entries.push({
      id: `wrk-${p.slug}`,
      group: "Work",
      title: p.title,
      blurb: p.blurb,
      /* Case studies get their own route; the rest link to the live site. */
      href: p.caseStudy ? `/work/${p.slug}` : p.href ?? "/work",
      keywords: [p.kind, p.role, p.problem, p.outcome, p.scope].join(" "),
    });
  }

  for (const i of insights) {
    entries.push({
      id: `ins-${i.slug}`,
      group: "Insight",
      title: i.title,
      blurb: i.dek,
      href: `/insights/${i.slug}`,
      keywords: [i.cluster, i.definition, i.intro.join(" ")].join(" "),
    });
  }

  return entries;
}

/**
 * Ranked, case-insensitive substring search. A query that matches the start of
 * a title beats one that matches keywords or body text, so "perf" surfaces the
 * performance service before the migration article that mentions it.
 */
export function search(query: string, entries: SearchEntry[], limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored: { entry: SearchEntry; score: number }[] = [];
  for (const entry of entries) {
    const title = entry.title.toLowerCase();
    const body = `${entry.blurb ?? ""} ${entry.keywords}`.toLowerCase();

    let score = 0;
    if (title === q) score += 100;
    else if (title.startsWith(q)) score += 60;
    else if (title.includes(q)) score += 40;
    if (body.includes(q)) score += 18;

    if (score > 0) scored.push({ entry, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.entry);
}
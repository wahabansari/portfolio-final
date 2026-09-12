import type { MetadataRoute } from "next";
import { insights } from "@/content/insights";
import { serviceSlugs } from "@/content/services";
import { site } from "@/content/site";
import { caseStudySlugs } from "@/content/work";
import { urInsights } from "@/content";

/**
 * Indexable pages for both locales, interlinked through hreflang alternates.
 * English URLs are bare (`/services/...`), Urdu URLs are prefixed
 * (`/ur/services/...`), and every entry points at the `x-default` English URL
 * so a crawler can always resolve the canonical form.
 *
 * No redirects, no duplicates, no thin utility routes — the old /skills and
 * /experience routes now 308 to /about and are deliberately absent, because a
 * sitemap containing a redirect is a contradictory signal.
 *
 * `lastModified` is the build date for routes whose content ships with the
 * deployment, and the insight's own `updatedAt` where the post has real
 * freshness to report. Urdu mirrors English 1:1 except where the Urdu content
 * set is its own editorial list (insights).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pair = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
    lastModified: Date = now,
  ): MetadataRoute.Sitemap[number][] => {
    const enUrl = `${site.url}${path === "/" ? "/" : path}`;
    const urUrl = `${site.url}/ur${path === "/" ? "/" : path}`;
    const languages = { en: enUrl, ur: urUrl, "x-default": enUrl };
    const base: MetadataRoute.Sitemap[number] = {
      url: enUrl,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    };
    return [base, { ...base, url: urUrl }];
  };

  return [
    ...pair("/", 1),
    ...pair("/services", 0.9),
    ...serviceSlugs.flatMap((slug) => pair(`/services/${slug}`, 0.9)),
    ...pair("/work", 0.8),
    ...caseStudySlugs.flatMap((slug) => pair(`/work/${slug}`, 0.8)),
    ...pair("/insights", 0.7),
    ...insights.flatMap((i) => pair(`/insights/${i.slug}`, 0.6, "monthly", new Date(i.updatedAt))),
    ...urInsights.insights.flatMap((i) =>
      pair(`/insights/${i.slug}`, 0.6, "monthly", new Date(i.updatedAt)),
    ),
    ...pair("/about", 0.7),
    ...pair("/contact", 0.6),
  ];
}
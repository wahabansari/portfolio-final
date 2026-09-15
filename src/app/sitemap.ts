import type { MetadataRoute } from "next";
import { insights } from "@/content/insights";
import { serviceSlugs } from "@/content/services";
import { site } from "@/content/site";
import { caseStudySlugs } from "@/content/work";

/**
 * Every indexable page, at the root — the site is English-only, so there are
 * no locale prefixes and no hreflang alternates to interleave.
 *
 * No redirects, no duplicates, no thin utility routes — the old /skills and
 * /experience routes now 308 to /about and are deliberately absent, because a
 * sitemap containing a redirect is a contradictory signal.
 *
 * `lastModified` is the build date for routes whose content ships with the
 * deployment, and the insight's own `updatedAt` where the post has real
 * freshness to report.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
    lastModified: Date = now,
  ): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path === "/" ? "/" : path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1),
    entry("/services", 0.9),
    ...serviceSlugs.map((slug) => entry(`/services/${slug}`, 0.9)),
    entry("/work", 0.8),
    ...caseStudySlugs.map((slug) => entry(`/work/${slug}`, 0.8)),
    entry("/insights", 0.7),
    ...insights.map((i) => entry(`/insights/${i.slug}`, 0.6, "monthly", new Date(i.updatedAt))),
    entry("/about", 0.7),
    entry("/contact", 0.6),
  ];
}
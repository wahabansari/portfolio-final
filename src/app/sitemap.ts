import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/content/services";
import { site } from "@/content/site";
import { caseStudySlugs } from "@/content/work";

/**
 * Only canonical, indexable pages that should appear in Search. No redirects,
 * no duplicates, no thin utility routes — the old /skills and /experience
 * routes now 308 to /about and are deliberately absent, because a sitemap
 * containing a redirect is a contradictory signal.
 *
 * `lastModified` is the build date. That is honest for a statically generated
 * site whose content ships with the deployment, and it stays accurate without
 * anyone remembering to bump a date by hand.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  ) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1),
    entry("/services", 0.9),
    ...serviceSlugs.map((slug) => entry(`/services/${slug}`, 0.9)),
    entry("/work", 0.8),
    ...caseStudySlugs.map((slug) => entry(`/work/${slug}`, 0.8)),
    entry("/about", 0.7),
    entry("/contact", 0.6),
  ];
}

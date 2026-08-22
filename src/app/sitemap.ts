import type { MetadataRoute } from "next";
import { allServicePaths, serviceCategories } from "@/content/services";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...["about", "work", "experience", "skills", "contact"].map((r) => ({
      url: `${site.url}/${r}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${site.url}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...serviceCategories.map((c) => ({
      url: `${site.url}/services/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...allServicePaths.map(({ category, service }) => ({
      url: `${site.url}/services/${category}/${service}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

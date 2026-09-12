"use client";

/**
 * Locale + localized content for Client Components.
 *
 * Server Components resolve the locale themselves via `next/root-params`
 * (`lang()`) and `getContent()` in `@/content/root` — no context needed.
 * Client components cannot call `lang()`, so the `[lang]` layout hands them
 * the locale and the full content tree through this provider instead.
 *
 * The provider is mounted once in `app/[lang]/layout.tsx`; the values are
 * stable (they come straight from the resolved route), so consumers can
 * depend on them freely.
 */

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { isRtl, localeHref as prefix } from "@/lib/i18n";
import type { Content, FlatSite, InsightsContent } from "@/content";
import { flattenSite } from "@/content";

/*
 * Only serializable data crosses the server→client boundary. Functions are
 * rebuilt on the client (see `getInsight` below), so nothing here can trip the
 * "Functions cannot be passed directly to Client Components" check.
 */
type InsightsData = Pick<
  InsightsContent,
  "insights" | "insightSlugs" | "insightsHub"
>;

type Localized = {
  locale: Locale;
  site: FlatSite;
  services: Content["services"];
  work: Content["work"];
  insights: InsightsData["insights"];
  insightSlugs: InsightsData["insightSlugs"];
  insightsHub: InsightsData["insightsHub"];
  getInsight: InsightsContent["getInsight"];
};

const LocaleContext = createContext<Localized | null>(null);

export function LocaleProvider({
  locale,
  content,
  insights,
  children,
}: {
  locale: Locale;
  content: Content;
  insights: InsightsData;
  children: ReactNode;
}) {
  const value = useMemo<Localized>(
    () => ({
      locale,
      site: flattenSite(content.site),
      services: content.services,
      work: content.work,
      insights: insights.insights,
      insightSlugs: insights.insightSlugs,
      insightsHub: insights.insightsHub,
      getInsight: (slug) => insights.insights.find((i) => i.slug === slug),
    }),
    [locale, content, insights],
  );
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/** Full localized content tree for client components. Throws outside the provider. */
export function useContent(): Localized {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useContent must be used inside <LocaleProvider>");
  return ctx;
}

/** The active locale, for building locale-prefixed links and RTL-aware UI. */
export function useLocale(): Locale {
  return useContent().locale;
}

/** Locale-prefix a site href (en stays unprefixed). Use like `localeHref("/services")`. */
export function useLocaleHref(): (href: string) => string {
  const { locale } = useContent();
  return useMemo(() => (href: string) => prefix(locale, href), [locale]);
}

/** RTL flag for the active locale. */
export function useIsRtl(): boolean {
  return isRtl(useContent().locale);
}
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
import type { Content, FlatSite } from "@/content";
import { flattenSite } from "@/content";

/*
 * Only site-level content crosses the server→client boundary here.
 *
 * Services/work/insights are consumed server-side through their own content
 * modules and never through this provider — passing the full tree into the
 * root provider pushed ~240 KB of duplicated JSON into every HTML document.
 * Nav and footer (the only client consumers) need `site` and nothing else.
 */
type Localized = {
  locale: Locale;
  site: FlatSite;
};

const LocaleContext = createContext<Localized | null>(null);

export function LocaleProvider({
  locale,
  content,
  children,
}: {
  locale: Locale;
  content: { site: Content["site"] };
  children: ReactNode;
}) {
  const value = useMemo<Localized>(
    () => ({
      locale,
      site: flattenSite(content.site),
    }),
    [locale, content],
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

/** RTL flag for the active locale. English is LTR, so this is always false. */
export function useIsRtl(): boolean {
  return isRtl();
}
/**
 * Content registry — the English content set.
 *
 * The site is English-only now. Every content module keeps its original shape
 * (site / services / work / insights); this file assembles them into the
 * serialisable `en` set plus `enInsights`, and provides the
 * `useContent()`-friendly `flattenSite` helper. Everything in this file is
 * client-safe (data only).
 *
 * `site`, `services`, `work` are type-checked against the modules exported
 * under `./en`, which is also what `@/content/site` / `@/content/services` /
 * `@/content/work` re-export verbatim for server pages.
 */

import * as siteEn from "./en/site";
import * as servicesEn from "./en/services";
import * as workEn from "./en/work";
import * as insightsEn from "./en/insights";

type Widen<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : T extends readonly (infer U)[]
          ? readonly Widen<U>[]
          : T extends object
            ? { [K in keyof T]: Widen<T[K]> }
            : T;

type AnyFn = (...args: never[]) => unknown;

/*
 * A content module as it may cross the server→client boundary: plain objects
 * and data only. Function exports (getService, getInsight, …) are excluded
 * from the type and stripped at runtime by `plain()` — React forbids both
 * module namespace objects and function-valued props on Client Components.
 */
export type Content = {
  readonly site: {
    [K in keyof typeof siteEn as typeof siteEn[K] extends AnyFn ? never : K]: Widen<
      typeof siteEn[K]
    >;
  };
  readonly services: {
    [K in keyof typeof servicesEn as typeof servicesEn[K] extends AnyFn ? never : K]: Widen<
      typeof servicesEn[K]
    >;
  };
  readonly work: {
    [K in keyof typeof workEn as typeof workEn[K] extends AnyFn ? never : K]: Widen<
      typeof workEn[K]
    >;
  };
};

export type InsightsContent = {
  readonly insights: Widen<typeof insightsEn.insights>;
  readonly getInsight: (slug: string) => Widen<typeof insightsEn.insights>[number] | undefined;
  readonly insightSlugs: readonly string[];
  readonly insightsHub: Widen<typeof insightsEn.insightsHub>;
};

/*
 * The site module carries both the branding const (`site.name`, `site.role`,
 * …) and the page sections (`site.hero`, `site.positioning`, …) under the same
 * name. Consumers rarely care which is which — they want `site.name` and
 * `site.hero` to both work on one object. `FlatSite` merges the const into the
 * module, and `flattenSite` builds it, so `useContent().site` behaves like the
 * single exports of the old `@/content/site` entry point.
 */
export type FlatSite = Content["site"] & Widen<typeof siteEn.site>;

export function flattenSite(site: Content["site"]): FlatSite {
  return {
    ...((site as { site?: Record<string, unknown> }).site ?? {}),
    ...(site as Record<string, unknown>),
  } as FlatSite;
}

/**
 * Convert a content module namespace into a plain serialisable object, dropping
 * function exports. `import * as` namespaces are exotic objects React refuses
 * to pass to Client Components ("Module objects are not supported"), and
 * function-valued props are equally verboten.
 */
function plain<T extends Record<string, unknown>>(
  mod: T,
): {
  [K in keyof T as T[K] extends AnyFn ? never : K]: Widen<T[K]>;
} {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(mod)) {
    if (typeof value !== "function") out[key] = value;
  }
  return out as never;
}

export const en: Content = {
  site: plain(siteEn),
  services: plain(servicesEn),
  work: plain(workEn),
};

export const enInsights: InsightsContent = {
  insights: insightsEn.insights,
  getInsight: insightsEn.getInsight,
  insightSlugs: insightsEn.insightSlugs,
  insightsHub: insightsEn.insightsHub,
};

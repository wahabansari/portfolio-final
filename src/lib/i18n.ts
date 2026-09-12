/**
 * i18n foundation.
 *
 * Two locales, English (default, LTR) and Urdu (RTL). The site follows the
 * documented Next.js pattern: every special file lives under `app/[lang]`,
 * the root layout lives at `app/[lang]/layout.tsx` and sets `lang`/`dir` per
 * locale, and `proxy.ts` redirects locale-less requests to the negotiated
 * locale. `next/root-params` (`lang()`) resolves the current locale in Server
 * Components without prop drilling; Client Components receive `locale` as a
 * prop (the only client-aware components that render content are the nav,
 * footer, spotlight and the contact form).
 */

export const locales = ["en", "ur"] as const;

/** `Locale` is used everywhere; `Lang` is what the route segment is called. */
export type Locale = (typeof locales)[number];

export type Lang = Locale;

export const defaultLocale: Locale = "en";

export const RTL: Record<Locale, boolean> = { en: false, ur: true };

export function isRtl(locale: Locale): boolean {
  return RTL[locale];
}

/** BCP 47 tag used on <html lang="…"> and in metadata. */
export function langTag(locale: Locale): string {
  return locale === "ur" ? "ur-PK" : "en";
}

export const isLocale = (value: string): value is Locale =>
  (["en", "ur"] as const).includes(value as Locale);

/**
 * Prefix a path with the locale, correctly handling root ("/").
 * Client navigation only needs this for the non-default locale.
 */
export function localeHref(locale: Locale, href: string): string {
  if (locale === defaultLocale) return href === "/" ? "/" : href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}
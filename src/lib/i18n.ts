/**
 * i18n foundation — English only.
 *
 * The site shipped bilingual (en/ur); after dropping the second locale the
 * helpers collapse to a single language so the client chrome (nav, footer)
 * keeps one stable code path. `localeHref` is the identity, `isRtl` is always
 * false, and `Locale` is literally `"en"` wherever a component reads it —
 * nothing about the routing or the content tree varies with locale any more.
 */

export const locales = ["en"] as const;

/** `Locale` is the type all consumers read; `Lang` was the route segment name. */
export type Locale = (typeof locales)[number];

export type Lang = Locale;

export const defaultLocale: Locale = "en";

export const RTL: Record<Locale, boolean> = { en: false };

export function isRtl(): boolean {
  return false;
}

/** BCP 47 tag used on <html lang="…">. */
export function langTag(): string {
  return "en";
}

export const isLocale = (value: string): value is Locale => value === "en";

/** Prefix a path with the locale. English stays unprefixed, so this is the identity. */
export function localeHref(_locale: Locale, href: string): string {
  return href;
}
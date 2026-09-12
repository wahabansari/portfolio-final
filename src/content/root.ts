/**
 * Server-side content accessor — resolves the current locale from the route
 * via `next/root-params` and returns that locale's content modules, 404ing on
 * an unsupported locale. Async (the getter returns a promise), so consumers
 * `await` it.
 *
 * Only callable from Server Components (see the `next/root-params` docs).
 */
import "server-only";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { contentFor } from "./index";

export async function getContent() {
  const locale = await lang();
  if (!isLocale(locale)) notFound();
  return contentFor(locale);
}

/** Resolve a `next/root-params` language without erroring in odd contexts. */
export async function resolveLocale(): Promise<import("@/lib/i18n").Locale> {
  const locale = await lang();
  return isLocale(locale) ? locale : "en";
}
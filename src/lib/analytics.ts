/**
 * Business event tracking.
 *
 * This is an integration seam, not an analytics provider. No tracking script
 * is loaded by this site — GA4 and GTM were deliberately removed — so `track`
 * is inert until something is actually listening. Wiring up a provider later
 * means pointing `deliver` at it; every call site is already correct.
 *
 * The events are the ones that answer a business question: which services get
 * interest, whether proof gets read, and where enquiries come from. Nothing
 * here is tracked because it is technically possible to track it.
 *
 * Payloads carry a service slug, a page path or a label — never the contents
 * of a form field. The brief, the sender's name and their email address stay
 * between the visitor's mail client and my inbox.
 */

export type TrackEvent =
  | "cta_start_project"
  | "view_service"
  | "view_case_study"
  | "resume_click"
  | "contact_start"
  | "contact_submit"
  | "outbound_project_click"
  | "agency_cta";

type Payload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: TrackEvent, payload: Payload = {}): void {
  if (typeof window === "undefined") return;

  /* No consumer, no work. A missing dataLayer is the normal state of this
     site, not an error condition. */
  if (!Array.isArray(window.dataLayer)) return;

  try {
    window.dataLayer.push({ event, ...payload });
  } catch {
    /* Analytics must never be able to break a page. */
  }
}

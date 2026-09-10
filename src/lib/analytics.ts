/**
 * Business event tracking.
 *
 * This is the first-party event layer. It pushes to a dataLayer that Google
 * Tag Manager consumes (see components/gtm.tsx), which is what lets GA4 and
 * Microsoft Clarity be configured as container tags rather than being wired
 * into the codebase one script at a time.
 *
 * The events answer four questions and nothing else: which service attracts
 * attention, whether proof gets read, where a visitor commits, and which
 * external profile carries the authority signal. Nothing here is tracked
 * because it is technically possible to track it.
 *
 * Payloads carry a service slug, a page path or a label — never the contents
 * of a form field. The brief, the sender's name and their email address stay
 * between the visitor's mail client and my inbox.
 */

export type TrackEvent =
  /* Interest — which offer and which evidence actually hold attention. A view
     answers that in a way a click cannot: a click is intent, a view is
     consumption. */
  | "service_view"
  | "case_study_view"
  /* Commitment. One CTA event for every call to action, distinguished by its
     `label` rather than by a separate event name — one funnel step should be
     one event, or every new button location fragments the same metric into
     another series nobody remembers to sum. */
  | "cta_click"
  | "contact_form_start"
  | "contact_form_submit"
  /* The key event, and the only one that represents money. It fires alongside
     contact_form_submit so the conversion definition survives the form being
     replaced by something else later. */
  | "generate_lead"
  /* Authority — the contact paths and external profiles the entity model
     depends on. */
  | "email_click"
  | "linkedin_click"
  | "github_click"
  | "resume_click";

type Payload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: TrackEvent, payload: Payload = {}): void {
  if (typeof window === "undefined") return;

  try {
    /* Create the queue if the container has not booted yet. GTM loads
       `afterInteractive`, so a fast click on the header CTA can land before
       it — pushing into an array GTM later adopts is how that event survives
       instead of being dropped. When no container is configured at all, this
       is a few objects held in memory and read by nobody, which is the
       correct cost for an unconfigured analytics stack. */
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
  } catch {
    /* Analytics must never be able to break a page. */
  }
}

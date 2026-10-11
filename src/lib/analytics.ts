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
 *
 * Two destinations, one call. Every event is pushed to the GTM `dataLayer`
 * under its own name (so existing container triggers keep working) and sent
 * to GA4 directly through gtag.js under the GA4-standard name where one exists
 * (`form_start`, `form_submit`, `generate_lead`, `file_download`). gtag.js runs
 * on its own queue, `gaLayer`, so its commands never mix with the container's
 * dataLayer and nothing is counted twice by accident.
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
  | "resume_click"
  /* Discoverability — whether the spotlight is the route into the site's
     content. Distinguished by `label`: header box, icon button or ⌘K. */
  | "search_open"
  /* Engagement depth and friction — what people read, open and trip over. */
  | "insight_view"
  | "faq_open"
  | "scroll_depth"
  | "form_error"
  /* Generic link tracking, fired by the delegated click listener for any
     link that does not already carry a `data-track` of its own. */
  | "phone_click"
  | "outbound_click"
  | "file_download";

type Payload = Record<string, string | number | boolean | undefined>;

/** GA4 measurement ID. Overridable per environment; defaults to the live property. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-Y5V2MKFRJ6";

/** The name of the GA4 queue gtag.js reads (`&l=gaLayer` on its script URL). */
export const GA_LAYER = "gaLayer";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gaLayer?: unknown[];
    __gaReady?: boolean;
  }
}

/**
 * The standard gtag() command. gtag.js reads `Arguments` objects off the queue,
 * not arrays, which is why this cannot be an arrow function or take a rest
 * array and push that. The queue is created if the script has not loaded yet:
 * gtag.js adopts it and replays everything in order, so an early click is not
 * lost.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- the parameters only type the call; the body reads `arguments`
function gtag(..._args: unknown[]): void {
  window.gaLayer = window.gaLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.gaLayer.push(arguments);
}

/**
 * Starts the GA4 stream once per page load: the `js` timestamp, then `config`
 * with the automatic page_view switched off. Page views are sent explicitly by
 * <PageViewTracker /> on every route change instead, so the first load and
 * every client-side navigation are counted the same way, once each, and the
 * result does not depend on a GA4 setting that someone could toggle.
 */
export function initGa(): void {
  if (typeof window === "undefined" || window.__gaReady) return;
  window.__gaReady = true;
  gtag("js", new Date());
  gtag("config", GA_ID, { send_page_view: false });
}

/** The GA4 name and parameters for an internal event. */
function toGa(event: TrackEvent, payload: Payload): [string, Payload] {
  switch (event) {
    case "contact_form_start":
      return ["form_start", { form_id: "project_inquiry", form_name: "Project inquiry", ...payload }];
    case "contact_form_submit":
      return ["form_submit", { form_id: "project_inquiry", form_name: "Project inquiry", ...payload }];
    case "generate_lead":
      /* GA4's recommended lead event, so it can be marked as a key event. */
      return ["generate_lead", { form_id: "project_inquiry", ...payload }];
    case "resume_click":
      return ["file_download", { file_extension: "pdf", ...payload }];
    case "service_view":
      return ["service_view", { content_type: "service", item_id: payload.label, ...payload }];
    case "case_study_view":
      return ["case_study_view", { content_type: "case_study", item_id: payload.label, ...payload }];
    case "insight_view":
      return ["insight_view", { content_type: "insight", item_id: payload.label, ...payload }];
    default:
      return [event, payload];
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

    initGa();
    const [name, params] = toGa(event, payload);
    gtag("event", name, params);
  } catch {
    /* Analytics must never be able to break a page. */
  }
}

/**
 * A page view, sent to GA4 as `page_view` and to GTM as `virtual_page_view`
 * (a distinct name so a container that already tracks history changes does not
 * double count it). Called on the first load and on every route change.
 */
export function trackPageView(path: string): void {
  if (typeof window === "undefined") return;

  try {
    const title = document.title;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "virtual_page_view", page_path: path, page_title: title });

    initGa();
    gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: title,
    });
  } catch {
    /* Analytics must never be able to break a page. */
  }
}

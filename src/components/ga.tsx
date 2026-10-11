import Script from "next/script";
import { GA_ID, GA_LAYER } from "@/lib/analytics";

/**
 * Google Analytics 4 (gtag.js).
 *
 * Loads the library only. Initialisation (`js` and `config`) and every event
 * are sent from lib/analytics.ts, which queues commands on `window.gaLayer`
 * before this script arrives and lets gtag.js replay them in order, so nothing
 * that happens before the script loads is lost.
 *
 * The library is told to read `gaLayer` (`&l=`) rather than the default
 * `dataLayer`. `dataLayer` belongs to the Google Tag Manager container (see
 * gtm.tsx); keeping gtag's commands on their own queue stops the two from
 * processing each other's entries and counting a page view or event twice.
 *
 * `afterInteractive` keeps measurement off the critical path. The measurement
 * ID is public by design and can be overridden with `NEXT_PUBLIC_GA_ID`.
 */
export function GoogleAnalytics() {
  return (
    <Script
      id="ga4-lib"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}&l=${GA_LAYER}`}
      strategy="afterInteractive"
    />
  );
}

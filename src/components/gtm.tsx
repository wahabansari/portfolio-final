import Script from "next/script";

/**
 * Google Tag Manager container.
 *
 * GTM is the only measurement script this site loads directly. GA4 and
 * Microsoft Clarity are configured as tags *inside* the container rather than
 * hard-coded here, which is the point of using GTM at all: adding or removing
 * a measurement tool becomes a change in the container, not a deploy.
 *
 * The container ID comes from `NEXT_PUBLIC_GTM_ID`. With no ID set — local
 * development, previews, or a deployment where measurement has not been
 * configured yet — this renders nothing at all and the site ships zero
 * third-party JavaScript. That is a deliberate default rather than a fallback:
 * an unconfigured analytics stack should cost a visitor nothing.
 *
 * `afterInteractive` keeps the container off the critical path. Measurement is
 * never worth an LCP regression, and every event this site fires is either a
 * click or a mount that happens well after hydration — see lib/analytics.ts,
 * which pushes to the same dataLayer this script consumes.
 */
export function Gtm() {
  const id = process.env.NEXT_PUBLIC_GTM_ID;
  if (!id) return null;

  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${id}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}

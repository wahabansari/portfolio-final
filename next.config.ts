import type { NextConfig } from "next";

/**
 * Redirects from the previous information architectures.
 *
 * The site has published two earlier service structures: three categories with
 * sixteen detail pages (/services/frontend/*, /automation/*, /wordpress/*), and
 * then seven standalone services. It now publishes four. Every one of those
 * URLs may be indexed or linked, so none of them may simply 404: each one 308s
 * straight to the page that now covers the same intent. A permanent redirect
 * passes the signals on; a 404 discards them.
 *
 * Every destination below is a final URL (one of the four services, or the
 * /services hub), never another redirect, so there are no chains.
 *
 * Order matters: Next matches top to bottom, so the specific mappings come
 * before the category-wide catch-alls beneath them. The catch-alls exist so
 * that any old URL missed here still lands on a relevant page.
 */
const CUSTOM_WEB = "/services/custom-web-development";
const DASHBOARDS = "/services/business-dashboards";
const MODERNIZATION = "/services/software-modernization";
const AI_AUTOMATION = "/services/ai-business-automation";

const serviceRedirects: { source: string; destination: string }[] = [
  /* ── The seven standalone services (previous structure) ───────────────── */
  { source: "/services/frontend-product-engineering", destination: CUSTOM_WEB },
  { source: "/services/website-redesign-rebuild", destination: CUSTOM_WEB },
  { source: "/services/website-redesign-conversion", destination: CUSTOM_WEB },
  { source: "/services/saas-product-development", destination: DASHBOARDS },
  { source: "/services/performance-engineering", destination: MODERNIZATION },
  { source: "/services/wordpress-to-nextjs-migration", destination: MODERNIZATION },
  { source: "/services/ai-product-integration", destination: AI_AUTOMATION },
  /* Agency work is an engagement model, not a service: it lives on the hub. */
  { source: "/services/agency-frontend-development", destination: "/services" },

  /* ── Frontend detail pages (original structure) ──────────────────────── */
  { source: "/services/frontend/email-template-development", destination: CUSTOM_WEB },
  { source: "/services/frontend/website-dashboard-redesign", destination: CUSTOM_WEB },
  { source: "/services/frontend/react-nextjs-development", destination: CUSTOM_WEB },
  { source: "/services/frontend/responsive-web-development", destination: CUSTOM_WEB },
  { source: "/services/frontend/progressive-web-app-development", destination: CUSTOM_WEB },
  { source: "/services/frontend/ui-ux-design", destination: CUSTOM_WEB },

  /* ── Automation category → AI business automation ────────────────────── */
  { source: "/services/automation/ai-chatbot-development", destination: AI_AUTOMATION },
  { source: "/services/automation/rag-chatbot-agent", destination: AI_AUTOMATION },
  { source: "/services/automation/dental-clinic-ai-assistant", destination: AI_AUTOMATION },
  { source: "/services/automation/n8n-workflow-automation", destination: AI_AUTOMATION },

  /* ── WordPress category ───────────────────────────────────────────────
     Migration and speed work are software modernization; theme, plugin and
     landing-page work are custom web development. */
  { source: "/services/wordpress/wordpress-to-nextjs-migration", destination: MODERNIZATION },
  { source: "/services/wordpress/wordpress-speed-optimization", destination: MODERNIZATION },
  { source: "/services/wordpress/custom-wordpress-theme-development", destination: CUSTOM_WEB },
  { source: "/services/wordpress/wordpress-plugin-development", destination: CUSTOM_WEB },
  { source: "/services/wordpress/landing-page-development", destination: CUSTOM_WEB },

  /* ── Category roots, then their catch-alls ───────────────────────────── */
  { source: "/services/frontend", destination: CUSTOM_WEB },
  { source: "/services/frontend/:path*", destination: CUSTOM_WEB },
  { source: "/services/automation", destination: AI_AUTOMATION },
  { source: "/services/automation/:path*", destination: AI_AUTOMATION },
  { source: "/services/wordpress", destination: MODERNIZATION },
  { source: "/services/wordpress/:path*", destination: CUSTOM_WEB },
];

const nextConfig: NextConfig = {
  // The repo lives under a OneDrive path with a lockfile above it; pin the root
  // so Turbopack does not walk up out of the project.
  turbopack: { root: __dirname },

  /* Security headers.
   *
   * Deliberately not a Content-Security-Policy. A useful CSP here needs a
   * per-request nonce for Next's inline bootstrap and the inline theme script
   * in the root layout; a static policy loose enough to permit both would be
   * `unsafe-inline`, which is a CSP in name only. The headers below are the
   * ones that are unambiguously correct for a static marketing site. HSTS is
   * already applied by the host, so it is not duplicated here.
   */
  headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Stop MIME sniffing turning a mistyped asset into script.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // No framing: nothing here is meant to be embedded.
          { key: "X-Frame-Options", value: "DENY" },
          // Send the origin cross-site, the full path same-origin.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // The site asks for none of these; say so explicitly.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
        ],
      },
    ];
  },

  redirects() {
    return [
      ...serviceRedirects.map((r) => ({ ...r, permanent: true })),

      /* Skills and experience are sections on /about now. A page whose only
         purpose is to list technologies is thin by construction, and the
         experience narrative belongs with the person it describes. */
      { source: "/skills", destination: "/about", permanent: true },
      { source: "/experience", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;

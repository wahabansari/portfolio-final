import type { NextConfig } from "next";

/**
 * Redirects from the previous information architecture.
 *
 * The old site published three service categories with sixteen detail pages
 * beneath them, plus standalone /skills and /experience routes. All of those
 * URLs are indexed, so none of them may simply 404 — each one 308s to the page
 * that now covers the same intent. A permanent redirect passes the signals on;
 * a 404 discards them.
 *
 * Order matters: Next matches top to bottom, so the specific mappings have to
 * come before the category-wide catch-alls beneath them. The catch-alls exist
 * so that any old URL missed here still lands on a relevant page rather than
 * an error.
 */
const serviceRedirects: { source: string; destination: string }[] = [
  /* ── The redesign service's own rename ────────────────────────────────
     "Conversion" became "Rebuild" when the service was repositioned around
     modernization rather than conversion-rate work. The old slug was
     indexed, so it redirects rather than 404s — and it has to sit above the
     catch-alls, which is why it leads the list. */
  {
    source: "/services/website-redesign-conversion",
    destination: "/services/website-redesign-rebuild",
  },

  /* ── Frontend detail pages that now belong to the redesign service ───── */
  {
    source: "/services/frontend/email-template-development",
    destination: "/services/website-redesign-rebuild",
  },
  {
    source: "/services/frontend/website-dashboard-redesign",
    destination: "/services/website-redesign-rebuild",
  },

  /* ── Frontend detail pages absorbed into the primary service ─────────── */
  {
    source: "/services/frontend/react-nextjs-development",
    destination: "/services/frontend-product-engineering",
  },
  {
    source: "/services/frontend/responsive-web-development",
    destination: "/services/frontend-product-engineering",
  },
  {
    source: "/services/frontend/progressive-web-app-development",
    destination: "/services/frontend-product-engineering",
  },
  {
    source: "/services/frontend/ui-ux-design",
    destination: "/services/frontend-product-engineering",
  },

  /* ── Automation category → AI product integration ────────────────────── */
  {
    source: "/services/automation/ai-chatbot-development",
    destination: "/services/ai-product-integration",
  },
  {
    source: "/services/automation/rag-chatbot-agent",
    destination: "/services/ai-product-integration",
  },
  {
    source: "/services/automation/dental-clinic-ai-assistant",
    destination: "/services/ai-product-integration",
  },
  {
    source: "/services/automation/n8n-workflow-automation",
    destination: "/services/ai-product-integration",
  },

  /* ── WordPress category ───────────────────────────────────────────────
     Two of these now have an exact-intent destination that did not exist when
     the map was first written: the old migration URL points at the dedicated
     migration service rather than at a general redesign page, and the speed
     URL points at performance engineering. A redirect to a merely related
     page keeps the signal; a redirect to the page about the same problem
     keeps the visitor too. */
  {
    source: "/services/wordpress/wordpress-to-nextjs-migration",
    destination: "/services/wordpress-to-nextjs-migration",
  },
  {
    source: "/services/wordpress/wordpress-speed-optimization",
    destination: "/services/performance-engineering",
  },
  {
    source: "/services/wordpress/custom-wordpress-theme-development",
    destination: "/services/website-redesign-rebuild",
  },
  {
    source: "/services/wordpress/wordpress-plugin-development",
    destination: "/services/website-redesign-rebuild",
  },
  {
    source: "/services/wordpress/landing-page-development",
    destination: "/services/website-redesign-rebuild",
  },

  /* ── Category roots, then their catch-alls ───────────────────────────── */
  { source: "/services/frontend", destination: "/services/frontend-product-engineering" },
  { source: "/services/frontend/:path*", destination: "/services/frontend-product-engineering" },
  { source: "/services/automation", destination: "/services/ai-product-integration" },
  { source: "/services/automation/:path*", destination: "/services/ai-product-integration" },
  { source: "/services/wordpress", destination: "/services/wordpress-to-nextjs-migration" },
  { source: "/services/wordpress/:path*", destination: "/services/website-redesign-rebuild" },
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

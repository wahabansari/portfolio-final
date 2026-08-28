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
  /* ── Frontend detail pages that now belong to the redesign service ───── */
  {
    source: "/services/frontend/email-template-development",
    destination: "/services/website-redesign-conversion",
  },
  {
    source: "/services/frontend/website-dashboard-redesign",
    destination: "/services/website-redesign-conversion",
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

  /* ── WordPress category → redesign & conversion ──────────────────────── */
  {
    source: "/services/wordpress/custom-wordpress-theme-development",
    destination: "/services/website-redesign-conversion",
  },
  {
    source: "/services/wordpress/wordpress-plugin-development",
    destination: "/services/website-redesign-conversion",
  },
  {
    source: "/services/wordpress/wordpress-speed-optimization",
    destination: "/services/website-redesign-conversion",
  },
  {
    source: "/services/wordpress/wordpress-to-nextjs-migration",
    destination: "/services/website-redesign-conversion",
  },
  {
    source: "/services/wordpress/landing-page-development",
    destination: "/services/website-redesign-conversion",
  },

  /* ── Category roots, then their catch-alls ───────────────────────────── */
  { source: "/services/frontend", destination: "/services/frontend-product-engineering" },
  { source: "/services/frontend/:path*", destination: "/services/frontend-product-engineering" },
  { source: "/services/automation", destination: "/services/ai-product-integration" },
  { source: "/services/automation/:path*", destination: "/services/ai-product-integration" },
  { source: "/services/wordpress", destination: "/services/website-redesign-conversion" },
  { source: "/services/wordpress/:path*", destination: "/services/website-redesign-conversion" },
];

const nextConfig: NextConfig = {
  // The repo lives under a OneDrive path with a lockfile above it; pin the root
  // so Turbopack does not walk up out of the project.
  turbopack: { root: __dirname },

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

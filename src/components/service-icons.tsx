import type { ReactNode } from "react";

/**
 * One small icon per service, used in the nav's services dropdown. Kept as
 * plain stroke shapes (rects, circles, lines) rather than dense illustrative
 * icons — legible at 20px and consistent with the rest of the icon set in
 * `ui.tsx`.
 */
function Base({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

const ICONS: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  "react-nextjs-development": ({ className }) => (
    <Base className={className}>
      <polyline points="9 6 3 12 9 18" />
      <polyline points="15 6 21 12 15 18" />
    </Base>
  ),
  "responsive-web-development": ({ className }) => (
    <Base className={className}>
      <rect x="2" y="4" width="13" height="9" rx="1.5" />
      <line x1="5.5" y1="16.5" x2="11.5" y2="16.5" />
      <rect x="16" y="9" width="6" height="10" rx="1.2" />
    </Base>
  ),
  "progressive-web-app-development": ({ className }) => (
    <Base className={className}>
      <rect x="4" y="3" width="16" height="18" rx="3" />
      <path d="M12 8v6" />
      <path d="M9.5 12l2.5 2.5 2.5-2.5" />
      <line x1="9" y1="18" x2="15" y2="18" />
    </Base>
  ),
  "email-template-development": ({ className }) => (
    <Base className={className}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </Base>
  ),
  "website-dashboard-redesign": ({ className }) => (
    <Base className={className}>
      <rect x="3" y="3" width="8" height="9" rx="1.5" />
      <rect x="13" y="3" width="8" height="5" rx="1.5" />
      <rect x="13" y="10" width="8" height="11" rx="1.5" />
      <rect x="3" y="14" width="8" height="7" rx="1.5" />
    </Base>
  ),
  "ui-ux-design": ({ className }) => (
    <Base className={className}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </Base>
  ),
  "ai-chatbot-development": ({ className }) => (
    <Base className={className}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <polyline points="7 16 7 20 11 16" />
      <circle cx="9" cy="10" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="0.9" fill="currentColor" stroke="none" />
    </Base>
  ),
  "rag-chatbot-agent": ({ className }) => (
    <Base className={className}>
      <rect x="5" y="8" width="14" height="10" rx="2" />
      <circle cx="9.5" cy="13" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="13" r="1.1" fill="currentColor" stroke="none" />
      <path d="M12 8V5" />
      <circle cx="12" cy="3.4" r="1.3" />
      <path d="M2 12h3M19 12h3" />
    </Base>
  ),
  "dental-clinic-ai-assistant": ({ className }) => (
    <Base className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </Base>
  ),
  "n8n-workflow-automation": ({ className }) => (
    <Base className={className}>
      <circle cx="5" cy="6" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="18" cy="12" r="2.2" />
      <path d="M7 6h6a4 4 0 0 1 4 4M7 18h6a4 4 0 0 0 4-4" />
    </Base>
  ),
  "custom-wordpress-theme-development": ({ className }) => (
    <Base className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="8" x2="21" y2="8" />
      <line x1="8" y1="8" x2="8" y2="21" />
    </Base>
  ),
  "wordpress-plugin-development": ({ className }) => (
    <Base className={className}>
      <rect x="3" y="3" width="11" height="11" rx="2.5" />
      <rect x="10" y="10" width="11" height="11" rx="2.5" />
    </Base>
  ),
  "wordpress-speed-optimization": ({ className }) => (
    <Base className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </Base>
  ),
  "wordpress-to-nextjs-migration": ({ className }) => (
    <Base className={className}>
      <path d="M4 8h13" />
      <polyline points="14 4 17 8 14 12" />
      <path d="M20 16H7" />
      <polyline points="10 12 7 16 10 20" />
    </Base>
  ),
  "landing-page-development": ({ className }) => (
    <Base className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="8" x2="21" y2="8" />
      <circle cx="6" cy="5.5" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="5.5" r="0.7" fill="currentColor" stroke="none" />
      <rect x="6" y="11" width="12" height="5" rx="1" />
      <line x1="6" y1="19" x2="14" y2="19" />
    </Base>
  ),
};

const Fallback = ({ className }: { className?: string }) => (
  <Base className={className}>
    <circle cx="12" cy="12" r="8" />
  </Base>
);

export function ServiceIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = ICONS[slug] ?? Fallback;
  return <Icon className={className} />;
}

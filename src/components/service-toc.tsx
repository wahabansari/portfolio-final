import { cn } from "@/lib/cn";

/**
 * In-page section navigation for a service page.
 *
 * One component covers both required behaviours. On desktop it is a sticky
 * bar under the site header; on mobile the same row scrolls horizontally as
 * compact chips. Solving it once means the two can never drift apart.
 *
 * No JavaScript is involved: these are ordinary anchors, sticky positioning
 * and horizontal overflow. Scroll-spy would add a client bundle and an
 * IntersectionObserver to tell a reader something the page already shows them.
 *
 * `top` matches the header height exactly so the two stack flush, and
 * `scroll-padding-top` on <html> accounts for both when a link is followed.
 */
export function ServiceToc({
  sections,
  className,
}: {
  sections: readonly { id: string; label: string }[];
  className?: string;
}) {
  return (
    <nav
      aria-label="On this page"
      className={cn(
        "sticky top-[4.5rem] z-30 border-b border-border bg-bg/90 backdrop-blur-md",
        className,
      )}
    >
      <div className="ds-container">
        {/* The negative margin lets the row bleed to the container edge on
            mobile, so a partially visible chip signals that it scrolls. */}
        <ul className="-mx-6 flex gap-1 overflow-x-auto px-6 py-2.5 md:mx-0 md:flex-wrap md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((section) => (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                className="inline-flex min-h-9 items-center rounded-full px-3.5 text-[0.8125rem] font-medium whitespace-nowrap text-ink-muted transition-colors hover:bg-surface hover:text-ink"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

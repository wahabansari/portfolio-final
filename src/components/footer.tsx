"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContent, useLocaleHref } from "./locale-provider";

/**
 * Footer — one horizontal row, space-between.
 *
 * Name left. Copyright center. Built-with note right.
 * Quiet, no decoration. The page already made its pitch.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const localeHref = useLocaleHref();
  const pathname = usePathname();
  const { site } = useContent();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="ds-container flex h-20 items-center justify-between">
        <span className="text-[0.9375rem] font-medium text-fg">
          {site.shortName}
        </span>
        <span className="ds-meta hidden sm:block">
          © {year}
        </span>
        <span className="ds-meta">
          {pathname === "/" ? (
            "Built with React, Next.js & TypeScript"
          ) : (
            <>
              <Link
                href={localeHref("/")}
                data-track="footer_home"
                className="text-fg-muted transition-colors duration-150 hover:text-fg"
              >
                Back to top
              </Link>
            </>
          )}
        </span>
      </div>
    </footer>
  );
}
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { useContent, useLocaleHref } from "./locale-provider";
import { ArrowIcon } from "./ui";

/**
 * Minimal fixed nav.
 *
 * Name left. Three links center-right. One CTA right.
 * No dropdowns, no dialogs, no hamburger on desktop.
 * Active link gets the accent; everything else stays quiet.
 */
export function Nav() {
  const pathname = usePathname();
  const localeHref = useLocaleHref();
  const { site } = useContent();
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 8);
  }, []);
  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const links = [
    { label: "Work", href: localeHref("/work") },
    { label: "Services", href: localeHref("/services") },
    { label: "About", href: localeHref("/about") },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled
          ? "border-b border-border bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="ds-container flex h-16 items-center justify-between">
        <Link
          href={localeHref("/")}
          data-track="nav_logo"
          aria-label="Home"
          className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-fg transition-colors duration-150 hover:text-fg"
        >
          {site.shortName}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-track="nav_link"
              data-track-label={link.label.toLowerCase()}
              className={cn(
                "text-[0.9375rem] font-medium transition-colors duration-150",
                isActive(link.href)
                  ? "text-fg"
                  : "text-fg-muted hover:text-fg"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={localeHref("/contact")}
          data-track="nav_cta"
          className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-fg transition-colors duration-150 hover:text-accent"
        >
          Let&apos;s talk
          <ArrowIcon className="h-3.5 w-3.5 -translate-x-0.5 transition-all duration-150 group-hover:translate-x-0" />
        </Link>
      </div>
    </header>
  );
}
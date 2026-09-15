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
 * Active link gets the accent. Scrolled state gains a blurred surface.
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
          className="relative text-[1.0625rem] font-semibold tracking-[-0.02em] text-fg"
        >
          {site.shortName}
          <span className="absolute -right-2 -top-1 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-track="nav_link"
              data-track-label={link.label.toLowerCase()}
              className={cn(
                "relative text-[0.9375rem] font-medium transition-colors duration-150",
                isActive(link.href)
                  ? "text-fg"
                  : "text-fg-muted hover:text-fg"
              )}
            >
              {link.label}
              <span
                aria-hidden
                className={cn(
                  "absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-200",
                  isActive(link.href) ? "w-full" : "w-0"
                )}
              />
            </Link>
          ))}
        </nav>

        <Link
          href={localeHref("/contact")}
          data-track="nav_cta"
          className="ds-btn ds-btn-primary !px-5 !py-2.5 !text-[0.875rem]"
        >
          Let&apos;s talk
          <ArrowIcon className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}
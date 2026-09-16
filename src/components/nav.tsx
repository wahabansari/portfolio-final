"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { useContent, useLocaleHref } from "./locale-provider";
import { ThemeToggle } from "./theme-toggle";
import { ArrowIcon } from "./ui";

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  const onScroll = useCallback(() => setScrolled(window.scrollY > threshold), [threshold]);
  useEffect(() => {
    onScroll();
    return subscribeToScroll(onScroll);
  }, [onScroll]);
  return scrolled;
}

/**
 * Header — wordmark left, three core links center-right, theme toggle and
 * one CTA right. Sticky; scrolled state gains a blurred surface and a
 * hairline. On mobile the core links collapse into an accessible panel.
 */
export function Nav() {
  const pathname = usePathname();
  const localeHref = useLocaleHref();
  const { site } = useContent();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  /* Close on Escape and return focus to the trigger. */
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const links = [
    { label: "Work", href: localeHref("/work") },
    { label: "Services", href: localeHref("/services") },
    { label: "About", href: localeHref("/about") },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled
          ? "border-b border-border bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="ds-container flex h-16 items-center justify-between gap-3 md:gap-6">
        <Link
          href={localeHref("/")}
          data-track="nav_logo"
          aria-label="Home"
          className="flex items-center gap-2 text-[1.0625rem] font-semibold tracking-[-0.02em] text-fg"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-[0.75rem] font-bold text-accent-fg">
            {site.initials}
          </span>
          <span className="hidden sm:inline">{site.shortName}</span>
          <span className="sm:hidden">W.</span>
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
                isActive(link.href) ? "text-fg" : "text-fg-muted hover:text-fg",
              )}
            >
              {link.label}
              <span
                aria-hidden
                className={cn(
                  "absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-200",
                  isActive(link.href) ? "w-full" : "w-0",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href={localeHref("/contact")}
            data-track="nav_cta"
            className="ds-btn ds-btn-primary !px-5 !py-2.5 !text-[0.875rem]"
          >
            Start a project
            <ArrowIcon className="h-3.5 w-3.5" />
          </Link>

          {/* Mobile menu trigger */}
          <button
            type="button"
            ref={triggerRef}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-border-strong hover:bg-surface hover:text-fg md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={cn(
          "border-b border-border bg-bg/95 backdrop-blur-md md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="ds-container flex flex-col py-3" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-track="nav_link"
              data-track-label={`mobile:${link.label.toLowerCase()}`}
              className={cn(
                "flex items-center justify-between border-b border-border py-4 text-[1.0625rem] font-medium",
                isActive(link.href) ? "text-fg" : "text-fg-muted",
              )}
            >
              {link.label}
              <ArrowIcon className="h-4 w-4 text-fg-subtle" />
            </Link>
          ))}
          <Link
            href={localeHref("/contact")}
            data-track="nav_cta"
            data-track-label="mobile"
            className="ds-btn ds-btn-primary mt-4"
          >
            Start a project
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
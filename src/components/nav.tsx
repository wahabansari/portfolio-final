"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { useContent, useLocaleHref } from "./locale-provider";
import { ThemeToggle } from "./theme-toggle";
import { ArrowIcon, BrandMark, ChevronDownIcon } from "./ui";

function useScrolled(threshold = 4) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

// Services for dropdown — keep in sync with src/content/en/services.ts
const SERVICE_ITEMS = [
  { slug: "frontend-product-engineering", label: "React & Next.js Development" },
  { slug: "website-redesign-rebuild", label: "Website Redesign & Rebuild" },
  { slug: "performance-engineering", label: "Web Performance & Core Web Vitals" },
  { slug: "wordpress-to-nextjs-migration", label: "WordPress to Next.js Migration" },
  { slug: "agency-frontend-development", label: "White-Label & Agency Development" },
  { slug: "saas-product-development", label: "SaaS & MVP Development" },
  { slug: "ai-product-integration", label: "AI Integration for Web Products" },
] as const;

/**
 * Header — 68px fixed bar.
 *
 * Wordmark left, three core links center-right, theme toggle and one CTA
 * right. Scrolled state gains a blurred surface and a hairline.
 *
 * On mobile the core links collapse into an animated panel using
 * grid-rows (0fr → 1fr) + visibility so closed panels leave the a11y
 * tree and keyboard tab order. Escape closes the panel and returns
 * focus to the trigger.
 */
export function Nav() {
  const pathname = usePathname();
  const localeHref = useLocaleHref();
  const { site } = useContent();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close all panels when route changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }

  // Close mobile panel on Escape
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        setServicesOpen(false);
        setMobileServicesOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Close services dropdown on outside click
  useEffect(() => {
    if (!servicesOpen) return;
    function onPointerDown(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [servicesOpen]);

  const links = [
    { label: "Work", href: localeHref("/work") },
    { label: "Services", href: localeHref("/services") },
    { label: "Insights", href: localeHref("/insights") },
    { label: "About", href: localeHref("/about") },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        /* The slide is tied to the `scrolled` state change, not to mount —
           a CSS transition only ever plays in response to a property
           actually changing, never on first render, so there's nothing to
           see at the top of a freshly loaded page. Scrolling past the
           threshold is the only thing that moves it. */
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
        scrolled
          ? "translate-y-0 bg-surface backdrop-blur-md shadow-[0_6px_20px_-12px_rgba(28,23,18,0.25)] border-b border-border"
          : "-translate-y-1.5 bg-transparent shadow-none border-b border-transparent",
      )}
    >
      <div className="ds-container flex h-17 items-center justify-between gap-4 md:gap-6">
        {/* Wordmark */}
        <Link
          href={localeHref("/")}
          data-track="nav_logo"
          aria-label="Home"
          className="flex items-center gap-2.5 text-[1.0625rem] font-semibold tracking-[-0.02em] text-fg"
        >
          <BrandMark className="h-9 w-9" />
          <span className="hidden sm:inline">{site.shortName}</span>
          <span className="sm:hidden">W.</span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((link) => {
            const active = isActive(link.href);
            if (link.label === "Services") {
              return (
                <div key={link.href} className="relative" ref={servicesRef}>
                  <button
                    type="button"
                    onClick={() => setServicesOpen((v) => !v)}
                    onMouseEnter={() => {
                      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
                      setServicesOpen(true);
                    }}
                    onMouseLeave={() => {
                      closeTimeoutRef.current = setTimeout(() => setServicesOpen(false), 120);
                    }}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    data-track="nav_services_toggle"
                    className={cn(
                      "flex items-center gap-1.5 rounded-md px-3 py-2 text-[0.875rem] font-medium tracking-wide transition-colors duration-150",
                      active || servicesOpen ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {link.label}
                    <ChevronDownIcon className={cn("h-3.5 w-3.5 transition-transform duration-200", servicesOpen && "rotate-180")} />
                    <span
                      aria-hidden
                      className={cn(
                        "absolute bottom-0.5 left-3 right-3 h-px bg-accent transition-all duration-200",
                        active ? "scale-x-100" : "scale-x-0 origin-left",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "absolute left-0 top-full z-50 mt-0.5 min-w-70 rounded-xl border border-border bg-bg/95 backdrop-blur-md shadow-[0_12px_32px_-12px_rgba(28,23,18,0.25)] py-2 transition-all duration-200 ease-out",
                      servicesOpen
                        ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-y-95 translate-y-1 pointer-events-none",
                    )}
                    role="menu"
                    aria-label="Services"
                    onMouseEnter={() => {
                      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
                      setServicesOpen(true);
                    }}
                    onMouseLeave={() => {
                      closeTimeoutRef.current = setTimeout(() => setServicesOpen(false), 120);
                    }}
                  >
                    {SERVICE_ITEMS.map((svc) => (
                      <Link
                        key={svc.slug}
                        href={localeHref(`/services/${svc.slug}`)}
                        data-track="nav_service"
                        data-track-label={svc.slug}
                        role="menuitem"
                        className="flex items-center gap-3 px-4 py-2.5 text-[0.875rem] font-medium text-fg-muted hover:text-fg hover:bg-accent-soft/50 transition-colors"
                      >
                        {svc.label}
                      </Link>
                    ))}
                    <hr className="my-2 border-border" />
                    <Link
                      href={localeHref("/services")}
                      data-track="nav_service"
                      data-track-label="all"
                      role="menuitem"
                      className="flex items-center gap-3 px-4 py-2.5 text-[0.875rem] font-medium text-accent hover:text-accent-hover"
                    >
                      View all services
                      <ArrowIcon className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                data-track="nav_link"
                data-track-label={link.label.toLowerCase()}
                className={cn(
                  "relative rounded-md px-3 py-2 text-[0.875rem] font-medium tracking-wide transition-colors duration-150",
                  active ? "text-fg" : "text-fg-muted hover:text-fg",
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute bottom-0.5 left-3 right-3 h-px bg-accent transition-all duration-200",
                    active ? "scale-x-100" : "scale-x-0 origin-left",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Spotlight search — Cmd/Ctrl+K also toggles it (see Spotlight) */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("spotlight:open"))}
            aria-label="Search the site"
            title="Search (Ctrl K)"
            data-track="nav_search_open"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-border-strong hover:bg-surface hover:text-fg"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
          <ThemeToggle />
          <Link
            href={localeHref("/contact")}
            data-track="nav_cta"
            className="hidden items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-[0.8125rem] font-semibold text-accent-fg transition-all duration-150 hover:bg-accent-hover hover:shadow-card sm:inline-flex"
          >
            Start a project
            <ArrowIcon className="h-3.5 w-3.5" />
          </Link>

          {/* Mobile trigger */}
          <button
            type="button"
            ref={triggerRef}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-fg-muted transition-colors hover:border-border-strong hover:bg-surface hover:text-fg md:hidden"
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

      {/* Mobile panel — animated with grid rows + visibility */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={cn(
          "grid overflow-hidden border-b border-border bg-bg/95 backdrop-blur-md transition-[grid-template-rows,visibility] duration-300 md:hidden",
          open ? "grid-rows-[1fr] visible" : "grid-rows-[0fr] invisible",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <nav className="ds-container flex flex-col py-2" aria-label="Mobile">
            {links.map((link) => {
              const active = isActive(link.href);
              if (link.label === "Services") {
                return (
                  <div key={link.href}>
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      aria-expanded={mobileServicesOpen}
                      className={cn(
                        "flex items-center justify-between w-full rounded-lg border-l-2 px-4 py-4 text-[1rem] font-medium transition-colors",
                        active || mobileServicesOpen
                          ? "border-l-accent text-fg bg-accent-soft"
                          : "border-l-transparent text-fg-muted",
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronDownIcon className={cn("h-4 w-4 text-fg-subtle transition-transform", mobileServicesOpen && "rotate-180")} />
                    </button>
                    {mobileServicesOpen && (
                      <div className="pl-6 pb-2 space-y-1 border-l-2 border-accent-soft ml-2">
                        {SERVICE_ITEMS.map((svc) => (
                          <Link
                            key={svc.slug}
                            href={localeHref(`/services/${svc.slug}`)}
                            data-track="nav_service"
                            data-track-label={svc.slug}
                            className="block px-2 py-2 text-[0.9375rem] font-medium text-fg-muted hover:text-fg transition-colors"
                          >
                            {svc.label}
                          </Link>
                        ))}
                        <Link
                          href={localeHref("/services")}
                          data-track="nav_service"
                          data-track-label="all"
                          className="block px-2 py-2 text-[0.9375rem] font-medium text-accent hover:text-accent-hover"
                        >
                          View all services
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-track="nav_link"
                  data-track-label={`mobile:${link.label.toLowerCase()}`}
                  className={cn(
                    "flex items-center justify-between rounded-lg border-l-2 px-4 py-4 text-[1rem] font-medium transition-colors",
                    active
                      ? "border-l-accent text-fg bg-accent-soft"
                      : "border-l-transparent text-fg-muted",
                  )}
                >
                  {link.label}
                  <ArrowIcon className="h-4 w-4 text-fg-subtle" />
                </Link>
              );
            })}
            <Link
              href={localeHref("/contact")}
              data-track="nav_cta"
              data-track-label="mobile"
              className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-[0.9375rem] font-semibold text-accent-fg"
            >
              Start a project
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

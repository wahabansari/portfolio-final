"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { serviceCategories } from "@/content/services";
import { sections } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";
import { ArrowIcon } from "./ui";
import { ACCENT_VAR } from "./service-ui";
import { ServiceIcon } from "./service-icons";
import { cn } from "@/lib/cn";

/**
 * The wordmark. Uses the *accessible* variants of the brand colours rather than
 * the raw ones — brand blue is 4.27:1 on white and brand red 3.9:1, both below
 * AA. Blue 700 and Red 700 look the same at this size and clear it comfortably.
 */
function Wordmark() {
  return (
    <span className="text-[1.375rem] leading-none font-medium tracking-[-0.01em] text-ink">
      <span className="text-primary">W</span>
      ahab
      <span className="text-g-red-strong">.</span>
    </span>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={cn("transition-transform duration-200", open && "rotate-180")}
    >
      <path d="M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6z" />
    </svg>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const openerRef = useRef<HTMLButtonElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  /** A route is current if it matches, or if it's the parent of the page. */
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  // Escape closes whichever menu is open; a click outside closes the dropdown.
  useEffect(() => {
    if (!open && !servicesOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (servicesOpen) setServicesOpen(false);
      if (open) {
        setOpen(false);
        openerRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open, servicesOpen]);

  // Close everything when the route changes. Adjusting state during render is
  // React's documented pattern for this — an effect would fire a second render
  // pass with the menus still open.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }

  const itemClass = (active: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
      active
        ? "bg-surface-blue text-on-tonal"
        : "text-ink-muted hover:bg-surface hover:text-ink",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-sm">
      <div className="g-container flex h-16 items-center justify-between gap-6">
        <Link href="/" className="-mx-2 flex min-h-11 items-center gap-2 rounded-full px-2">
          <Wordmark />
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
          {sections.map((s) =>
            s.href === "/services" ? (
              <div
                key={s.id}
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  aria-current={isActive(s.href) ? "page" : undefined}
                  className={cn(itemClass(isActive(s.href)), "flex items-center gap-1")}
                >
                  {s.label}
                  <Chevron open={servicesOpen} />
                </button>

                {/* Full-bleed catalogue, grouped by category. Fixed (not
                    absolute) so it spans the viewport regardless of where the
                    trigger sits, anchored right under the header's h-16. It
                    stays a DOM descendant of the hover target above, so
                    pointer travel down into it never fires mouseleave. */}
                <div
                  inert={!servicesOpen}
                  className={cn(
                    "fixed inset-x-0 top-16 z-50 transition-[opacity,transform] duration-200",
                    servicesOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-1 opacity-0",
                  )}
                >
                  <div className="border-b border-border bg-bg shadow-[0_8px_24px_rgba(32,33,36,0.12)]">
                    <div className="g-container grid grid-cols-3 gap-8 py-8">
                      {serviceCategories.map((c) => (
                        <div key={c.slug}>
                          <Link
                            href={`/services/${c.slug}`}
                            className="flex items-center gap-2 px-3 text-[0.9375rem] font-medium text-ink hover:text-primary"
                          >
                            <span
                              aria-hidden
                              className={cn(
                                "h-2 w-2 shrink-0 rounded-full",
                                c.accent === "blue" && "bg-g-blue",
                                c.accent === "red" && "bg-g-red",
                                c.accent === "green" && "bg-g-green",
                                c.accent === "yellow" && "bg-g-yellow",
                              )}
                            />
                            {c.shortTitle}
                          </Link>
                          <ul className="mt-2">
                            {c.services.map((sv) => {
                              const active = pathname === `/services/${c.slug}/${sv.slug}`;
                              return (
                                <li key={sv.slug}>
                                  <Link
                                    href={`/services/${c.slug}/${sv.slug}`}
                                    aria-current={active ? "page" : undefined}
                                    className={cn(
                                      "group flex items-center gap-3 rounded-xl p-3 transition-colors",
                                      active
                                        ? "bg-surface-blue text-on-tonal"
                                        : "text-ink hover:bg-surface",
                                    )}
                                  >
                                    <span
                                      aria-hidden
                                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                                      style={{
                                        background: `color-mix(in srgb, ${ACCENT_VAR[c.accent]} 16%, transparent)`,
                                      }}
                                    >
                                      <ServiceIcon
                                        slug={sv.slug}
                                        className={active ? "text-on-tonal" : "text-ink-muted"}
                                      />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <span className="block truncate text-[0.875rem] font-medium">
                                        {sv.title}
                                      </span>
                                      {/* Full-opacity, not /80 — on this light
                                          tonal chip, on-tonal only clears AA at
                                          full strength (4.68:1); dimming it
                                          drops to 3.38:1 and fails. */}
                                      <span
                                        className={cn(
                                          "block truncate text-[0.75rem]",
                                          active ? "text-on-tonal" : "text-ink-muted",
                                        )}
                                      >
                                        {sv.summary}
                                      </span>
                                    </span>
                                    <ArrowIcon
                                      className={cn(
                                        "h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100",
                                        active && "translate-x-0 opacity-100",
                                      )}
                                    />
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border">
                      <div className="g-container flex items-center justify-between py-4">
                        <p className="g-body-sm">
                          Every service, in one place — frontend, automation and WordPress.
                        </p>
                        <Link href="/services" className="g-link !text-[0.9375rem]">
                          All services
                          <ArrowIcon className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={s.id}
                href={s.href}
                aria-current={isActive(s.href) ? "page" : undefined}
                className={itemClass(isActive(s.href))}
              >
                {s.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            className="g-btn g-btn-filled hidden h-10 min-h-10 px-5 text-sm sm:inline-flex"
          >
            Get in touch
          </Link>
          <button
            ref={openerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              {open ? (
                <path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7l1.4-1.4L10.6 10.6l6.3-6.3z" />
              ) : (
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu — grid-rows collapse, inert when closed. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "grid overflow-hidden bg-bg transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden",
          open ? "grid-rows-[1fr] border-t border-border opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <nav aria-label="Sections" className="g-container flex flex-col gap-1 py-4">
            {sections.map((s) =>
              s.href === "/services" ? (
                <div key={s.id}>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    aria-expanded={mobileServicesOpen}
                    className={cn(
                      "flex w-full items-center justify-between rounded-full px-4 py-3 text-[0.9375rem] font-medium transition-colors",
                      isActive(s.href)
                        ? "bg-surface-blue text-on-tonal"
                        : "text-ink-muted hover:bg-surface hover:text-ink",
                    )}
                  >
                    {s.label}
                    <Chevron open={mobileServicesOpen} />
                  </button>

                  <div
                    inert={!mobileServicesOpen}
                    className={cn(
                      "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300",
                      mobileServicesOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <ul className="mt-1 ml-4 border-l border-border pl-3">
                        {serviceCategories.map((c) => (
                          <li key={c.slug} className="py-1">
                            <Link
                              href={`/services/${c.slug}`}
                              className="block px-2 py-2 text-[0.9375rem] font-medium text-ink"
                            >
                              {c.shortTitle}
                            </Link>
                            <ul>
                              {c.services.map((sv) => {
                                const active = pathname === `/services/${c.slug}/${sv.slug}`;
                                return (
                                  <li key={sv.slug}>
                                    <Link
                                      href={`/services/${c.slug}/${sv.slug}`}
                                      aria-current={active ? "page" : undefined}
                                      className={cn(
                                        "flex items-center gap-3 rounded-md px-2 py-2 text-[0.875rem]",
                                        active ? "bg-surface-blue text-on-tonal" : "text-ink-muted",
                                      )}
                                    >
                                      <span
                                        aria-hidden
                                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                                        style={{
                                          background: `color-mix(in srgb, ${ACCENT_VAR[c.accent]} 16%, transparent)`,
                                        }}
                                      >
                                        <ServiceIcon
                                          slug={sv.slug}
                                          className={cn("h-4 w-4", active ? "text-on-tonal" : "text-ink-muted")}
                                        />
                                      </span>
                                      {sv.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={s.id}
                  href={s.href}
                  aria-current={isActive(s.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-3 text-[0.9375rem] font-medium transition-colors",
                    isActive(s.href)
                      ? "bg-surface-blue text-on-tonal"
                      : "text-ink-muted hover:bg-surface hover:text-ink",
                  )}
                >
                  {s.label}
                </Link>
              ),
            )}
            <Link href="/contact" className="g-btn g-btn-filled mt-3">
              Get in touch
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

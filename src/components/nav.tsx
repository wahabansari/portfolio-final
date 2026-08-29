"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { services } from "@/content/services";
import { sections } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";
import { ArrowIcon, Wordmark } from "./ui";
import { cn } from "@/lib/cn";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
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
  const drawerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openServices = () => {
    cancelClose();
    setServicesOpen(true);
  };

  /* Leaving starts a short grace period rather than closing on the spot, so
     clipping a corner on the way to an item doesn't dismiss the panel from
     under the cursor. */
  const closeServicesSoon = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 150);
  };

  useEffect(
    () => () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    },
    [],
  );

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  /* Mobile drawer: lock the page behind it and keep focus inside.
   *
   * `inert` already removes the closed drawer from the tab order, but an open
   * drawer over a scrollable page is only a dialog if focus cannot wander out
   * of it. Tab is cycled manually rather than relying on DOM order, because
   * everything behind the drawer is still focusable — it is a panel in the
   * header, not a portal at the end of <body>. */
  useEffect(() => {
    if (!open) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const focusable = () =>
      Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);

    focusable()[0]?.focus();

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      /* Wrap at both ends, and pull focus back in if it has escaped — which
         it will have if the drawer's contents changed while it was open. */
      if (e.shiftKey && (active === first || !drawer.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !drawer.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onTab);
    return () => {
      window.removeEventListener("keydown", onTab);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open && !servicesOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (servicesOpen) {
        cancelClose();
        setServicesOpen(false);
        servicesBtnRef.current?.focus();
      }
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

  /* Close everything on navigation. Adjusting state during render is React's
     documented pattern for this — an effect fires a second render pass with
     the menus still open. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }

  const itemClass = (active: boolean) =>
    cn(
      "relative rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors",
      active ? "text-ink" : "text-ink-muted hover:text-ink",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="ds-container flex h-[4.5rem] items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`Wahab Ansari — home`}
          className="-mx-2 flex min-h-11 items-center rounded-lg px-2"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {sections.map((s) =>
            s.href === "/services" ? (
              /* h-[4.5rem] is load-bearing: it stretches the hover target to
                 the full header height so its bottom edge meets the panel's
                 top edge exactly. Sized to the button instead, the strip of
                 header below it belongs to no one, and moving the pointer
                 down towards the menu fires mouseleave and closes it. */
              <div
                key={s.id}
                ref={servicesRef}
                className="relative flex h-[4.5rem] items-center"
                onMouseEnter={openServices}
                onMouseLeave={closeServicesSoon}
                /* Deliberately no onFocus: tabbing onto the trigger shouldn't
                   drop the whole submenu into the tab order. Enter/Space
                   opens it, Escape closes it, tabbing out closes it below. */
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                    cancelClose();
                    setServicesOpen(false);
                  }
                }}
              >
                <button
                  ref={servicesBtnRef}
                  type="button"
                  onClick={() => (servicesOpen ? setServicesOpen(false) : openServices())}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  aria-current={isActive(s.href) ? "page" : undefined}
                  className={cn(itemClass(isActive(s.href)), "flex items-center gap-1")}
                >
                  {s.label}
                  <Chevron open={servicesOpen} />
                </button>

                {/* Fixed, not absolute, so it spans the viewport regardless of
                    where the trigger sits — anchored under the header. It
                    stays a DOM descendant of the hover target above, so
                    pointer travel down into it never fires mouseleave. */}
                <div
                  inert={!servicesOpen}
                  className={cn(
                    /* `translate`, not `transform`: Tailwind v4 compiles
                       translate-* to the standalone `translate` property, so
                       transitioning `transform` animates nothing and the panel
                       snaps into place while only the opacity fades. */
                    "fixed inset-x-0 top-[4.5rem] z-50 transition-[opacity,translate] duration-200 ease-out",
                    servicesOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-3 opacity-0",
                  )}
                >
                  <div className="border-b border-border bg-bg">
                    <div className="ds-container py-7">
                      <ul className="grid grid-cols-3 gap-x-6 gap-y-1">
                        {services.map((sv, i) => {
                          const href = `/services/${sv.slug}`;
                          const active = pathname === href;
                          return (
                            <li key={sv.slug}>
                              <Link
                                href={href}
                                aria-current={active ? "page" : undefined}
                                className={cn(
                                  "group flex h-full items-start gap-3.5 rounded-[var(--radius-md)] p-3.5 transition-colors",
                                  active ? "bg-accent-soft" : "hover:bg-surface",
                                )}
                              >
                                <span
                                  aria-hidden
                                  className={cn(
                                    "mt-px font-mono text-[0.6875rem] tracking-widest",
                                    active ? "text-accent" : "text-ink-soft",
                                  )}
                                >
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span
                                    className={cn(
                                      "flex items-center gap-1.5 font-display text-[0.9375rem] font-medium",
                                      active ? "text-accent" : "text-ink",
                                    )}
                                  >
                                    {sv.title}
                                    <ArrowIcon className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-[translate,opacity] duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                                  </span>
                                  <span className="ds-body-sm mt-1 block">{sv.summary}</span>
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div className="border-t border-border bg-surface">
                      <div className="ds-container flex items-center justify-between gap-6 py-3.5">
                        <p className="ds-body-sm">
                          Not sure which one? Describe the problem and I will tell you.
                        </p>
                        <Link href="/services" className="ds-link">
                          Compare all services
                          <ArrowIcon className="h-3.5 w-3.5" />
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
            data-track="cta_start_project"
            data-track-label="header"
            className="ds-btn ds-btn-primary hidden h-10 min-h-10 px-5 text-[0.875rem] sm:inline-flex"
          >
            Start a project
          </Link>
          <button
            ref={openerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors hover:bg-surface lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              {open ? (
                <path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7l1.4-1.4L10.6 10.6l6.3-6.3z" />
              ) : (
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu — grid-rows collapse, inert when closed so its links stay
          out of the tab order. */}
      <div
        id="mobile-menu"
        ref={drawerRef}
        inert={!open}
        role="dialog"
        aria-modal={open || undefined}
        aria-label="Site menu"
        className={cn(
          "grid overflow-hidden bg-bg transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden",
          open ? "grid-rows-[1fr] border-t border-border opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <nav aria-label="Primary" className="ds-container flex flex-col gap-1 py-5">
            {sections.map((s) =>
              s.href === "/services" ? (
                <div key={s.id}>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    aria-expanded={mobileServicesOpen}
                    className={cn(
                      "flex w-full items-center justify-between rounded-[var(--radius-md)] px-3 py-3 text-[0.9375rem] font-medium transition-colors",
                      isActive(s.href) ? "bg-accent-soft text-accent" : "text-ink-muted",
                    )}
                  >
                    {s.label}
                    <Chevron open={mobileServicesOpen} />
                  </button>

                  <div
                    inert={!mobileServicesOpen}
                    className={cn(
                      "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300",
                      mobileServicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <ul className="mt-1 ml-3 border-l border-border pl-3">
                        {services.map((sv) => {
                          const href = `/services/${sv.slug}`;
                          const active = pathname === href;
                          return (
                            <li key={sv.slug}>
                              <Link
                                href={href}
                                aria-current={active ? "page" : undefined}
                                className={cn(
                                  "block rounded-[var(--radius-sm)] px-3 py-2.5 text-[0.9375rem]",
                                  active ? "text-accent" : "text-ink-muted",
                                )}
                              >
                                {sv.title}
                              </Link>
                            </li>
                          );
                        })}
                        <li>
                          <Link
                            href="/services"
                            className="block rounded-[var(--radius-sm)] px-3 py-2.5 text-[0.9375rem] font-medium text-ink"
                          >
                            All services
                          </Link>
                        </li>
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
                    "rounded-[var(--radius-md)] px-3 py-3 text-[0.9375rem] font-medium transition-colors",
                    isActive(s.href) ? "bg-accent-soft text-accent" : "text-ink-muted",
                  )}
                >
                  {s.label}
                </Link>
              ),
            )}
            <Link
              href="/contact"
              data-track="cta_start_project"
              data-track-label="mobile-menu"
              className="ds-btn ds-btn-primary mt-3"
            >
              Start a project
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

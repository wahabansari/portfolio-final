"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { serviceGroups } from "@/content/services";
import { sections } from "@/content/site";
import { track } from "@/lib/analytics";
import { ThemeToggle } from "./theme-toggle";
import { ArrowIcon, Wordmark } from "./ui";
import { cn } from "@/lib/cn";

/**
 * Site header, with a services mega-menu.
 *
 * Two interactions, deliberately built to different accessibility contracts,
 * because they are different things:
 *
 *   Desktop panel — a NON-modal disclosure. It dims the page behind it so the
 *     panel reads as the subject, but it does not block the page: no focus
 *     trap, no role="dialog", no scroll lock. Tab moves through the panel and
 *     then out of it, which closes the menu. Trapping focus in a dropdown a
 *     user can simply tab past is a common and irritating mistake.
 *
 *   Mobile drawer — genuinely modal. It covers the page, so it gets
 *     role="dialog", aria-modal, a focus trap, a scroll lock and Escape. The
 *     difference is not stylistic: the drawer blocks the page, so it has to
 *     behave like something that blocks the page.
 *
 * Both restore focus to the control that opened them, and both close on
 * Escape, on backdrop click and on navigation. Motion is CSS only — a
 * translate and an opacity — so `prefers-reduced-motion` is handled globally
 * in globals.css and no JavaScript is involved in the animation at all.
 *
 * Hover opens the desktop panel as an enhancement, never as the only way in:
 * the trigger is a real button that responds to click, Enter, Space and
 * ArrowDown, so pointer-less and touch users are not locked out of the menu.
 */

const HEADER_H = "4.5rem";

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

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7l1.4-1.4L10.6 10.6l6.3-6.3z" />
    </svg>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerServicesOpen, setDrawerServicesOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerBtnRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  /**
   * How the panel was opened, which decides what a click on the trigger does.
   *
   * Without this, hover and click fight each other: moving the pointer onto
   * the trigger opens the panel, and the click that naturally follows toggles
   * it straight back shut — so to a user who clicks rather than hovers, the
   * menu appears not to open at all. Tracking the source means a click on a
   * hover-opened panel adopts it (keeps it open) rather than closing it, and
   * only a second, deliberate click dismisses it.
   */
  const openedBy = useRef<"hover" | "click" | null>(null);

  /* Both are stable: they touch only refs and setState, so the effects below
     can depend on them without re-subscribing their listeners every render. */
  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openServices = (source: "hover" | "click") => {
    cancelClose();
    /* Hover never downgrades a click-opened panel, so moving the pointer over
       an already-pinned menu cannot make it dismissible by hovering away. */
    if (!(openedBy.current === "click" && source === "hover")) {
      openedBy.current = source;
    }
    setServicesOpen((wasOpen) => {
      if (!wasOpen) track("cta_click", { label: "services-menu-open" });
      return true;
    });
  };

  const closeServices = useCallback(() => {
    cancelClose();
    openedBy.current = null;
    setServicesOpen(false);
  }, [cancelClose]);

  /* Leaving starts a short grace period rather than closing on the spot, so
     clipping a corner on the way to an item doesn't dismiss the panel from
     under the cursor. A panel the user opened by clicking stays put — having
     it evaporate because the pointer drifted would undo a deliberate act. */
  const closeServicesSoon = () => {
    if (openedBy.current === "click") return;
    cancelClose();
    closeTimer.current = window.setTimeout(closeServices, 150);
  };

  useEffect(
    () => () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    },
    [],
  );

  /* Escape closes whichever surface is open, and returns focus to the control
     that opened it — otherwise focus is left on a node that just became
     inert, and the next Tab starts from the top of the document. */
  useEffect(() => {
    if (!servicesOpen && !drawerOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (servicesOpen) {
        closeServices();
        servicesBtnRef.current?.focus();
      }
      if (drawerOpen) {
        setDrawerOpen(false);
        drawerBtnRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [servicesOpen, drawerOpen, closeServices]);

  /* The desktop panel is dismissed by any pointer press outside it. The
     backdrop covers the page below the header, but the header itself is not
     dimmed, so a click on the logo or the CTA also has to close the panel. */
  useEffect(() => {
    if (!servicesOpen) return;

    const onPointer = (e: PointerEvent) => {
      if (servicesRef.current?.contains(e.target as Node)) return;
      if (panelRef.current?.contains(e.target as Node)) return;
      closeServices();
    };

    window.addEventListener("pointerdown", onPointer);
    return () => window.removeEventListener("pointerdown", onPointer);
  }, [servicesOpen, closeServices]);

  /* Modal behaviour for the drawer only: lock the page behind it and keep Tab
     inside it. `inert` already removes it from the tab order when closed, but
     an open drawer over a scrollable page is only a dialog if focus cannot
     wander out of it. Tab is cycled manually rather than relying on DOM order,
     because everything behind the drawer is still focusable — it is a panel in
     the header, not a portal at the end of <body>. */
  useEffect(() => {
    if (!drawerOpen) return;

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
  }, [drawerOpen]);

  /* Close everything on navigation. Adjusting state during render is React's
     documented pattern for this — an effect fires a second render pass with
     the menus still open. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setServicesOpen(false);
    setDrawerOpen(false);
    setDrawerServicesOpen(false);
  }

  /* The open-source flag is a ref, so it is cleared in an effect rather than
     in the render-time reset above — writing a ref during render is what the
     rule about refs not being render state exists to prevent. Without this
     reset, a panel that was click-opened before a navigation would still be
     marked "click" afterwards, and the next hover-open would refuse to close
     itself on mouse-leave. */
  useEffect(() => {
    openedBy.current = null;
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const itemClass = (active: boolean) =>
    cn(
      "relative rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors",
      active ? "text-ink" : "text-ink-muted hover:text-ink",
    );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="ds-container flex h-[4.5rem] items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Wahab Ansari — home"
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
                  onMouseEnter={() => openServices("hover")}
                  onMouseLeave={closeServicesSoon}
                >
                  <button
                    ref={servicesBtnRef}
                    type="button"
                    onClick={() =>
                      servicesOpen && openedBy.current === "click"
                        ? closeServices()
                        : openServices("click")
                    }
                    onKeyDown={(e) => {
                      if (e.key !== "ArrowDown") return;
                      e.preventDefault();
                      openServices("click");
                      /* Move into the panel on the next frame, once it is no
                         longer inert and its links can take focus. */
                      requestAnimationFrame(() =>
                        panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus(),
                      );
                    }}
                    aria-expanded={servicesOpen}
                    aria-controls="services-menu"
                    aria-haspopup="true"
                    aria-current={isActive(s.href) ? "page" : undefined}
                    className={cn(itemClass(isActive(s.href)), "flex items-center gap-1")}
                  >
                    {s.label}
                    <Chevron open={servicesOpen} />
                  </button>
                </div>
              ) : (
                <Link
                  key={s.id}
                  href={s.href}
                  data-track={s.href === "/work" ? "case_study_view" : undefined}
                  data-track-label={s.href === "/work" ? "header" : undefined}
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
              data-track="cta_click"
              data-track-label="header"
              className="ds-btn ds-btn-primary hidden h-10 min-h-10 px-5 text-[0.875rem] sm:inline-flex"
            >
              Discuss your project
            </Link>
            <button
              ref={drawerBtnRef}
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-expanded={drawerOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors hover:bg-surface lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Desktop mega-menu panel ────────────────────────────────────────
            Fixed, not absolute, so it spans the viewport regardless of where
            the trigger sits. It is a sibling of the header row rather than a
            child of the trigger, so its width is the page, not the button. */}
        <div
          id="services-menu"
          ref={panelRef}
          inert={!servicesOpen}
          onMouseEnter={cancelClose}
          onMouseLeave={closeServicesSoon}
          /* Non-modal: tabbing out of the panel closes it rather than being
             trapped inside. */
          onBlur={(e) => {
            if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
            if (servicesRef.current?.contains(e.relatedTarget as Node | null)) return;
            closeServices();
          }}
          /* Interactivity is governed by `inert`, not by `visibility`. An
             inert subtree is already unfocusable, unreachable by assistive
             technology and transparent to hit-testing, so adding `invisible`
             would be redundant — and transitioning visibility makes focus
             timing-dependent, because a control cannot take focus until the
             property has actually flipped. Opacity and translate carry the
             animation; `inert` carries the semantics. */
          className={cn(
            "fixed inset-x-0 z-50 hidden lg:block",
            "transition-[opacity,translate] duration-[220ms] ease-out",
            servicesOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
          )}
          style={{ top: HEADER_H }}
        >
          <div className="border-b border-border bg-bg shadow-[0_18px_40px_-32px_rgb(15_23_42_/_0.45)]">
            <div className="ds-container py-9">
              <div className="grid grid-cols-12 gap-x-8 gap-y-8">
                {serviceGroups.map((group) => (
                  <div key={group.tier} className="col-span-3">
                    <p className="ds-meta pb-3">{group.label}</p>
                    <ul className="border-t border-border pt-2">
                      {group.items.map((sv) => {
                        const href = `/services/${sv.slug}`;
                        const active = pathname === href;
                        return (
                          <li key={sv.slug}>
                            <Link
                              href={href}
                              data-track="cta_click"
                              data-track-label={sv.slug}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "group block rounded-[var(--radius-md)] px-3.5 py-3 transition-colors",
                                active ? "bg-accent-soft" : "hover:bg-surface",
                              )}
                            >
                              <span
                                className={cn(
                                  "flex items-center gap-1.5 font-display text-[0.9375rem] font-semibold",
                                  active ? "text-accent" : "text-ink",
                                )}
                              >
                                {sv.title}
                                <ArrowIcon className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-[translate,opacity] duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                              </span>
                              <span className="ds-body-sm mt-1 block">{sv.summary}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}

                {/* Proof column. A catalogue overlay that only lists what is
                    for sale asks for trust it has not earned yet; the evidence
                    belongs at the moment of choosing, not three scrolls into
                    whichever page gets picked. Both figures are the ones the
                    rest of the site substantiates — nothing new is claimed
                    here. */}
                <div className="col-span-3">
                  <p className="ds-meta pb-3">Proof</p>
                  <div className="ds-card border-t border-border p-6">
                    <dl className="space-y-5">
                      <div>
                        <dt className="font-display text-[1.5rem] leading-none font-bold text-ink">
                          7
                        </dt>
                        <dd className="ds-body-sm mt-1.5">
                          production projects, every one live and linked
                        </dd>
                      </div>
                      <div className="border-t border-border pt-5">
                        <dt className="font-display text-[1.5rem] leading-none font-bold text-success">
                          30%
                        </dt>
                        <dd className="ds-body-sm mt-1.5">
                          measured Core Web Vitals improvement on Sunhub
                        </dd>
                      </div>
                    </dl>
                    <Link
                      href="/work"
                      data-track="cta_click"
                      data-track-label="services-menu-proof"
                      className="ds-link mt-6"
                    >
                      See the proof
                      <ArrowIcon className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border bg-surface">
              <div className="ds-container flex items-center justify-between gap-6 py-3">
                <div className="flex items-center gap-8">
                  <Link href="/services" className="ds-link">
                    Compare all services
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/insights"
                    data-track="cta_click"
                    data-track-label="services-menu"
                    className="ds-body-sm transition-colors hover:text-ink"
                  >
                    Read the insights →
                  </Link>
                </div>

                {/* An explicit dismiss. Escape and click-outside already close
                    the panel, but both are learned behaviours — a visible
                    control is the one route out that needs no prior knowledge,
                    and it is the only one a touch user on a hybrid device can
                    see. */}
                <button
                  type="button"
                  onClick={() => {
                    closeServices();
                    servicesBtnRef.current?.focus();
                  }}
                  className="inline-flex min-h-10 items-center gap-2 rounded-[var(--radius-control)] px-3 text-[0.875rem] font-medium text-ink-muted transition-colors hover:bg-card hover:text-ink"
                >
                  Close
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop for the desktop panel. Starts below the header so the header
          itself stays undimmed and the panel reads as attached to it. */}
      <div
        aria-hidden
        data-open={servicesOpen}
        onClick={closeServices}
        className="ds-backdrop z-40 hidden lg:block"
        style={{ top: HEADER_H }}
      />

      {/* ── Mobile drawer ──────────────────────────────────────────────────
          Modal, so it gets the full dialog contract: labelled, focus-trapped,
          scroll-locked, Escape-closable, focus restored on close. */}
      <div
        aria-hidden
        data-open={drawerOpen}
        onClick={() => {
          setDrawerOpen(false);
          drawerBtnRef.current?.focus();
        }}
        className="ds-backdrop z-50 lg:hidden"
      />

      <div
        id="mobile-menu"
        ref={drawerRef}
        inert={!drawerOpen}
        role="dialog"
        aria-modal={drawerOpen || undefined}
        aria-label="Site menu"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[min(22rem,88vw)] flex-col border-l border-border bg-bg lg:hidden",
          "transition-[translate] duration-[280ms] ease-out",
          drawerOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-border px-6">
          <Wordmark compact />
          <button
            type="button"
            onClick={() => {
              setDrawerOpen(false);
              drawerBtnRef.current?.focus();
            }}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink transition-colors hover:bg-surface"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
          <nav aria-label="Primary" className="flex flex-col gap-1">
            {sections.map((s) =>
              s.href === "/services" ? (
                <div key={s.id}>
                  <button
                    type="button"
                    onClick={() => setDrawerServicesOpen((v) => !v)}
                    aria-expanded={drawerServicesOpen}
                    className={cn(
                      "flex min-h-12 w-full items-center justify-between rounded-[var(--radius-md)] px-3 text-[1rem] font-medium transition-colors",
                      isActive(s.href) ? "bg-accent-soft text-accent" : "text-ink",
                    )}
                  >
                    {s.label}
                    <Chevron open={drawerServicesOpen} />
                  </button>

                  <div
                    inert={!drawerServicesOpen}
                    className={cn(
                      "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300",
                      drawerServicesOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-1 ml-3 border-l border-border pl-3">
                        {serviceGroups.map((group) => (
                          <div key={group.tier} className="mt-4 first:mt-2">
                            <p className="ds-meta px-3">{group.label}</p>
                            <ul className="mt-1">
                              {group.items.map((sv) => {
                                const href = `/services/${sv.slug}`;
                                const active = pathname === href;
                                return (
                                  <li key={sv.slug}>
                                    <Link
                                      href={href}
                                      data-track="cta_click"
                                      data-track-label={sv.slug}
                                      aria-current={active ? "page" : undefined}
                                      className={cn(
                                        "block min-h-12 rounded-[var(--radius-sm)] px-3 py-2.5 text-[0.9375rem]",
                                        active ? "text-accent" : "text-ink-muted",
                                      )}
                                    >
                                      {sv.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                        <Link
                          href="/services"
                          className="mt-4 block min-h-12 rounded-[var(--radius-sm)] px-3 py-2.5 text-[0.9375rem] font-medium text-ink"
                        >
                          All services
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={s.id}
                  href={s.href}
                  data-track={s.href === "/work" ? "case_study_view" : undefined}
                  data-track-label={s.href === "/work" ? "drawer" : undefined}
                  aria-current={isActive(s.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-12 items-center rounded-[var(--radius-md)] px-3 text-[1rem] font-medium transition-colors",
                    isActive(s.href) ? "bg-accent-soft text-accent" : "text-ink",
                  )}
                >
                  {s.label}
                </Link>
              ),
            )}

            <Link
              href="/insights"
              data-track="cta_click"
              data-track-label="drawer"
              aria-current={isActive("/insights") ? "page" : undefined}
              className={cn(
                "flex min-h-12 items-center rounded-[var(--radius-md)] px-3 text-[1rem] font-medium transition-colors",
                isActive("/insights") ? "bg-accent-soft text-accent" : "text-ink",
              )}
            >
              Insights
            </Link>
          </nav>
        </div>

        <div className="shrink-0 border-t border-border px-6 py-5">
          <Link
            href="/contact"
            data-track="cta_click"
            data-track-label="drawer"
            className="ds-btn ds-btn-primary w-full"
          >
            Discuss your project
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </>
  );
}

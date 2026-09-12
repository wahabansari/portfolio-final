"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { ThemeToggle } from "./theme-toggle";
import { ArrowIcon, CheckIcon, SearchIcon, Wordmark } from "./ui";
import { Spotlight } from "./spotlight";
import { useContent, useLocaleHref } from "./locale-provider";
import { cn } from "@/lib/cn";

/**
 * Site header, with a services mega-menu built on a completely different idea
 * to a catalogue grid: a LIST → INSPECTOR.
 *
 * The old menu spread all seven services across columns, which made every item
 * small and forced the reader to build the mental model of "which one is mine"
 * by scanning. The new menu inverts that: the left rail is a compact index of
 * the seven services; the right side is a live preview that shows the details
 * of the item currently *in the reading position* — the tier, the fit chips,
 * and the route into the full spec. The menu becomes a lens for comparing one
 * service at a time instead of a poster for all of them at once. Choosing the
 * service is the job; the grid was decoration, the preview is a decision aid.
 *
 * Selection state makes that possible. The rail is keyboard navigable — ↑/↓
 * moves the index, Enter opens the focused service — and the pointer updates
 * the same selection, so the preview and the keyboard always agree on what is
 * being inspected. This is also why the data is locale-aware: on /ur the rail
 * lists the Urdu service set with its own slugs, so every link inside the
 * panel lands on a real page instead of a dead English URL.
 *
 * Two interaction contracts, kept deliberately different.
 *
 *   Desktop panel — a NON-modal disclosure. It dims the page behind it so the
 *     panel reads as the subject, but it does not block the page: no focus
 *     trap, no role="dialog", no scroll lock. Tab moves through the panel and
 *     then out of it, which closes the menu. Focus is the honest contract for
 *     "you can leave", and the preview follows the focused rail item too — the
 *     panel stays coherent for a keyboard user who never hovers.
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
  const { site, services } = useContent();
  const localeHref = useLocaleHref();

  /* The locale-aware content drive every label and every href inside the
     panel, so the panel renders the locale's own services on its own URLs. */
  const sections = site.sections;
  const serviceGroups = services.serviceGroups;
  const allServices = useMemo(
    () => serviceGroups.flatMap((g) => g.items),
    [serviceGroups],
  );

  const [servicesOpen, setServicesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerServicesOpen, setDrawerServicesOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);

  /* List → inspector: which service is in the reading position right now. */
  const [selectedIndex, setSelectedIndex] = useState(0);

  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerBtnRef = useRef<HTMLButtonElement>(null);
  const searchBoxRef = useRef<HTMLButtonElement>(null);
  const searchIconRef = useRef<HTMLButtonElement>(null);
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
    setSpotlightOpen(false);
  }

  /* ⌘K / Ctrl+K opens the spotlight from anywhere on the page; the box and
     icon buttons are the pointer routes in. The listener lives here because
     the Nav owns the palette's open state. */
  useEffect(() => {
    const onShortcut = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== "k") return;
      e.preventDefault();
      if (spotlightOpen) {
        setSpotlightOpen(false);
      } else {
        setSpotlightOpen(true);
        track("search_open", { label: "shortcut" });
      }
    };
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, [spotlightOpen]);

  const openSpotlight = () => {
    setSpotlightOpen(true);
    track("search_open", { label: "header" });
  };

  /* Restore focus to the control that opened the palette — the desktop box on
     a wide viewport, the icon button on narrow. Whichever is mounted wins. */
  const closeSpotlight = () => {
    setSpotlightOpen(false);
    (searchBoxRef.current ?? searchIconRef.current)?.focus();
  };

  /* The open-source flag is a ref, so it is cleared in an effect rather than
     in the render-time reset above — writing a ref during render is what the
     rule about refs not being render state exists to prevent. Without this
     reset, a panel that was click-opened before a navigation would still be
     marked "click" afterwards, and the next hover-open would refuse to close
     itself on mouse-leave. */
  useEffect(() => {
    openedBy.current = null;
  }, [pathname]);

  /* The pathname carries the locale prefix (`/en`, `/ur`); the links in the
     menu are locale-prefixed too. Matching against the unprefixed path keeps
     the active states honest without depending on which locale is on screen. */
  const barePath = pathname.replace(/^\/(en|ur)(?=\/|$)/, "") || "/";

  const isActive = (href: string) =>
    href === "/" ? barePath === "/" : barePath === href || barePath.startsWith(`${href}/`);

  const focusIndex = (index: number) => {
    /* The preview follows the reading position; focus follows too when
       navigating by keyboard, so Enter after ↓ lands on the focused item. */
    const idx = (index + allServices.length) % allServices.length;
    setSelectedIndex(idx);
    const links = panelRef.current?.querySelectorAll<HTMLElement>("[data-menu-index]");
    links?.[idx]?.focus({ preventScroll: true });
  };

  const selected = allServices[selectedIndex];

  const itemClass = (active: boolean) =>
    cn(
      "relative rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors",
      active ? "text-ink" : "text-ink-muted hover:text-ink",
    );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg/75 backdrop-blur-xl">
        <div className="ds-container flex h-[4.5rem] items-center justify-between gap-6">
          <Link
            href={localeHref("/")}
            aria-label="Wahab Ansari — home"
            className="-mx-2 flex min-h-11 shrink-0 items-center rounded-lg px-2"
          >
            <Wordmark role={site.role} />
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
                        panelRef.current?.querySelector<HTMLElement>("[data-menu-index]")?.focus(),
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
                  href={localeHref(s.href)}
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
            {/* Desktop search box — small by design. It is a button styled
                like an input: click always opens the full spotlight. The
                box stays quiet in the header; everything it is for happens
                inside the palette. */}
            <button
              ref={searchBoxRef}
              type="button"
              onClick={openSpotlight}
              data-track="search_open"
              data-track-label="header"
              className="hidden h-10 w-36 items-center gap-2 rounded-full border border-border bg-surface/60 pr-2 pl-4 text-[0.875rem] text-ink-soft transition-colors hover:border-border-strong hover:text-ink-muted lg:inline-flex xl:w-56 2xl:w-64"
            >
              <SearchIcon className="h-4 w-4 shrink-0" />
              <span className="truncate select-none">Search</span>
              <span aria-hidden className="ml-auto hidden items-center md:flex">
                <kbd className="inline-flex h-6 min-w-7 items-center justify-center rounded border border-border bg-card px-1.5 font-mono text-[0.6875rem] leading-none text-ink-muted">
                  ⌘K
                </kbd>
              </span>
            </button>

            {/* Mobile search icon */}
            <button
              ref={searchIconRef}
              type="button"
              onClick={openSpotlight}
              aria-label="Search"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink-muted transition-colors hover:bg-surface hover:text-ink lg:hidden"
            >
              <SearchIcon className="h-[1.125rem] w-[1.125rem]" />
            </button>

            <ThemeToggle />

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
          /* ↑/↓ walk the rail; the preview follows. */
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowRight") {
              e.preventDefault();
              focusIndex(selectedIndex + 1);
            } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
              e.preventDefault();
              focusIndex(selectedIndex - 1);
            }
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
          <div className="border-b border-border bg-card/90 shadow-[0_24px_60px_-24px_rgb(2_6_23_/_0.35)] backdrop-blur-xl">
            <div className="ds-container pt-7 pb-6">
              {/* Menu header — the reading-position model in two lines, with
                  the route to the whole set on the right. */}
              <div className="flex items-end justify-between gap-6 border-b border-border pb-5">
                <div>
                  <p className="ds-meta">Services</p>
                  <p className="mt-1.5 font-display text-[1.25rem] leading-tight font-semibold text-ink">
                    Compare them one at a time — move down the list, watch the
                    preview.
                  </p>
                </div>
                <Link href={localeHref("/services")} className="ds-link text-[0.875rem]">
                  All services
                  <ArrowIcon className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-12 gap-x-10 pt-5">
                {/* ── The rail: one compact index, grouped, scannable. ────── */}
                <div className="col-span-7">
                  <ul className="divide-y divide-border/70">
                    {serviceGroups.map((group, gi) => (
                      <li key={group.tier}>
                        <p className="ds-meta pt-4 pb-2 text-[0.6875rem] first:pt-0">
                          {group.label}
                        </p>
                        <ul>
                          {group.items.map((sv) => {
                            const svIndex =
                              serviceGroups
                                .slice(0, gi)
                                .reduce((n, g) => n + g.items.length, 0) +
                              group.items.indexOf(sv);
                            const href = localeHref(`/services/${sv.slug}`);
                            const active = isActive(`/services/${sv.slug}`);
                            const focusSelected = selectedIndex === svIndex;
                            return (
                              <li key={sv.slug}>
                                <Link
                                  href={href}
                                  data-menu-index={svIndex}
                                  data-track="cta_click"
                                  data-track-label={sv.slug}
                                  aria-current={active ? "page" : undefined}
                                  onMouseEnter={() => setSelectedIndex(svIndex)}
                                  onFocus={() => setSelectedIndex(svIndex)}
                                  className={cn(
                                    "flex items-center gap-4 rounded-[var(--radius-sm)] px-2 py-3 transition-colors",
                                    focusSelected ? "bg-accent-soft/50" : "hover:bg-surface",
                                  )}
                                >
                                  <span
                                    className={cn(
                                      "w-5 shrink-0 text-center font-display text-[0.8125rem] leading-none font-bold tabular-nums",
                                      focusSelected ? "text-accent" : "text-ink-soft",
                                    )}
                                  >
                                    {svIndex + 1}
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span
                                      className={cn(
                                        "block truncate text-[0.9375rem] font-medium transition-colors",
                                        focusSelected ? "text-accent" : "text-ink",
                                      )}
                                    >
                                      {sv.title}
                                    </span>
                                    {!!sv.summary && (
                                      <span className="mt-0.5 block truncate text-[0.8125rem] text-ink-muted">
                                        {sv.summary}
                                      </span>
                                    )}
                                  </span>
                                  <CheckIcon
                                    className={cn(
                                      "h-4 w-4 shrink-0 text-accent transition-opacity",
                                      focusSelected ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ── The inspector: the service in the reading position. ── */}
                <div className="col-span-5">
                  <div className="sticky top-[5.5rem] rounded-2xl border border-border bg-surface/80 p-5 backdrop-blur">
                    {selected ? (
                      <>
                        <div className="flex items-center justify-between gap-4">
                          <span className="ds-chip text-[0.6875rem] uppercase tracking-wide">
                            {selectedIndex + 1} / {allServices.length}
                          </span>
                          <span className="ds-chip ds-chip-accent text-[0.6875rem]">
                            {serviceGroups.find((g) => g.items.includes(selected))?.label ?? "Service"}
                          </span>
                        </div>

                        <p className="ds-title mt-4 text-[1.15rem] leading-tight text-ink">
                          {selected.title}
                        </p>
                        {!!selected.summary && (
                          <p className="ds-body-sm mt-2 leading-relaxed text-ink-muted">
                            {selected.summary}
                          </p>
                        )}

                        {selected.idealFor.length > 0 && (
                          <ul className="mt-4 flex flex-wrap gap-1.5">
                            {selected.idealFor.slice(0, 3).map((fit) => (
                              <li
                                key={fit}
                                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[0.75rem] text-ink"
                              >
                                <CheckIcon className="h-3 w-3 text-accent" />
                                {fit}
                              </li>
                            ))}
                          </ul>
                        )}

                        <Link
                          href={localeHref(`/services/${selected.slug}`)}
                          data-track="cta_click"
                          data-track-label={`menu-inspector:${selected.slug}`}
                          className="ds-btn ds-btn-primary mt-5 w-full"
                        >
                          Open the full spec
                          <ArrowIcon />
                        </Link>

                        <div className="mt-4 border-t border-border pt-4 text-[0.75rem] text-ink-muted">
                          Use the list, Arrow keys or Tab to switch service.
                        </div>
                      </>
                    ) : (
                      <p className="ds-body-sm text-ink-muted">
                        Nothing to preview yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom strip: quick routes out of the menu, dismiss on the end. */}
            <div className="border-t border-border bg-surface">
              <div className="ds-container flex items-center justify-between gap-6 py-3">
                <div className="flex items-center gap-8">
                  <Link
                    href={localeHref("/work")}
                    data-track="cta_click"
                    data-track-label="services-menu"
                    className="text-[0.875rem] font-medium text-ink-muted transition-colors hover:text-ink"
                  >
                    See the proof →
                  </Link>
                  <Link
                    href={localeHref("/insights")}
                    data-track="cta_click"
                    data-track-label="services-menu"
                    className="text-[0.875rem] font-medium text-ink-muted transition-colors hover:text-ink"
                  >
                    Read the insights →
                  </Link>
                  <Link
                    href={localeHref("/contact")}
                    data-track="cta_click"
                    data-track-label="services-menu"
                    className="text-[0.875rem] font-medium text-ink-muted transition-colors hover:text-ink"
                  >
                    Discuss your project →
                  </Link>
                </div>

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
          <Wordmark compact role={site.role} />
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
                                const href = localeHref(`/services/${sv.slug}`);
                                const active = isActive(`/services/${sv.slug}`);
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
                          href={localeHref("/services")}
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
                  href={localeHref(s.href)}
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
              href={localeHref("/insights")}
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
            href={localeHref("/contact")}
            data-track="cta_click"
            data-track-label="drawer"
            className="ds-btn ds-btn-primary w-full"
          >
            Discuss your project
            <ArrowIcon />
          </Link>
        </div>
      </div>

      {/* ── Spotlight search ────────────────────────────────────────────── */}
      <Spotlight open={spotlightOpen} onClose={closeSpotlight} />
    </>
  );
}
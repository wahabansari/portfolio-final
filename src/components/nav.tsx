"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { ThemeToggle } from "./theme-toggle";
import { ArrowIcon, SearchIcon, Wordmark } from "./ui";
import { Spotlight } from "./spotlight";
import { useContent, useLocaleHref } from "./locale-provider";
import { cn } from "@/lib/cn";

/**
 * Site header.
 *
 * A Google header: a 64px white bar sitting over the page with a single
 * hairline under it, not a floating dark band. Links are grey text that hover
 * to a grey pill; the active route is a tonal blue pill; every action —
 * search, the CTA, the theme toggle — is a filled or outlined Google control.
 *
 * Services dropdown — a LIST, not a cabinet of cards. The previous menu spread
 * every service across a preview rail with summaries and fit chips; the job of
 * a navigation menu is to get out of the way, so this one is a plain list of
 * links anchored under the Services button — it opens beneath the link, never
 * off to one side — with a single route to the whole set at the end. No
 * content, no boxes, no previews, no dimming.
 *
 * Two interaction contracts, kept deliberately different.
 *
 *   Desktop dropdown — a NON-modal disclosure. A small panel that tucks under
 *     its trigger and does not dim or block the page: no focus trap, no
 *     role="dialog", no scroll lock. Tab moves through the menu and then out
 *     of it, which closes it.
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
 * Hover opens the desktop dropdown as an enhancement, never as the only way
 * in: the trigger is a real button that responds to click, Enter, Space and
 * ArrowDown, so pointer-less and touch users are not locked out.
 */

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

  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerBtnRef = useRef<HTMLButtonElement>(null);
  const searchBoxRef = useRef<HTMLButtonElement>(null);
  const searchIconRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  /**
   * How the dropdown was opened, which decides what a click on the trigger
   * does. Without this, hover and click fight each other: moving the pointer
   * onto the trigger opens the menu, and the click that naturally follows
   * toggles it straight back shut — so to a user who clicks rather than
   * hovers, the menu appears not to open at all. Tracking the source means a
   * click on a hover-opened menu adopts it (keeps it open) rather than
   * closing it, and only a second, deliberate click dismisses it.
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
    /* Hover never downgrades a click-opened menu, so moving the pointer over
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
     clipping a corner on the way to an item doesn't dismiss the dropdown from
     under the cursor. A menu the user opened by clicking stays put — having
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

  /* The desktop dropdown is dismissed by any pointer press outside it. The
     panel lives inside the Services button's wrapper, but the rest of the
     header is not covered, so a click on the logo or the CTA also closes it. */
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
     reset, a menu that was click-opened before a navigation would still be
     marked "click" afterwards, and the next hover-open would refuse to close
     itself on mouse-leave. */
  useEffect(() => {
    openedBy.current = null;
  }, [pathname]);

  /* The pathname has no locale prefix any more (English-only, routes at the
     root), so the bare path is the pathname itself. */
  const barePath = pathname || "/";

  const isActive = (href: string) =>
    href === "/" ? barePath === "/" : barePath === href || barePath.startsWith(`${href}/`);

  const itemClass = (active: boolean) =>
    cn(
      "relative rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-colors",
      active
        ? "bg-surface-blue text-accent"
        : "text-ink-muted hover:bg-surface hover:text-ink",
    );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg">
        <div className="ds-container flex h-16 items-center justify-between gap-6">
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
                /* h-16 is load-bearing: it stretches the hover target to
                   the full header height so its bottom edge meets the menu's
                   top edge exactly. Sized to the button instead, the strip of
                   header below it belongs to no one, and moving the pointer
                   down towards the menu fires mouseleave and closes it. */
                <div
                  key={s.id}
                  ref={servicesRef}
                  className="relative flex h-16 items-center"
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
                      /* Move into the menu on the next frame, once it is no
                         longer inert and its links can take focus. */
                      requestAnimationFrame(() =>
                        panelRef.current?.querySelector<HTMLElement>("a")?.focus(),
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

                  {/* ── Desktop services dropdown ──────────────────────────
                      A plain link list, anchored under this button (absolute
                      inside the relative wrapper, so it opens beneath the
                      link, never off to one side). Kept deliberately free of
                      previews and cards: the job of a menu is to route, not
                      to sell. Hover and click both open it; Escape, an outside
                      press or navigating all close it — and tabbing out of a
                      hover-opened menu dismisses it too. */}
                  <div
                    id="services-menu"
                    ref={panelRef}
                    inert={!servicesOpen}
                    /* Non-modal: tabbing out of the dropdown closes it rather
                       than being trapped inside. */
                    onBlur={(e) => {
                      if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
                      if (servicesRef.current?.contains(e.relatedTarget as Node | null)) return;
                      closeServices();
                    }}
                    className={cn(
                      "absolute top-full left-0 z-50 mt-2 hidden w-max max-w-[19rem] lg:block",
                      "rounded-2xl border border-border bg-bg p-2",
                      "transition-[opacity,translate] duration-[220ms] ease-out",
                      servicesOpen
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0",
                    )}
                  >
                    <p className="ds-meta px-3 pt-2 pb-1">Services</p>
                    <ul className="pb-1">
                      {allServices.map((sv) => {
                        const active = isActive(`/services/${sv.slug}`);
                        return (
                          <li key={sv.slug}>
                            <Link
                              href={localeHref(`/services/${sv.slug}`)}
                              data-track="cta_click"
                              data-track-label={sv.slug}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "block rounded-lg px-3 py-2 text-[0.9375rem] font-medium transition-colors",
                                active
                                  ? "bg-surface-blue text-accent"
                                  : "text-ink-muted hover:bg-surface hover:text-ink",
                              )}
                            >
                              {sv.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <Link
                      href={localeHref("/services")}
                      data-track="cta_click"
                      data-track-label="services-menu-all"
                      className="ds-link mt-1 flex items-center gap-3 rounded-lg border-t border-border px-3 pt-2.5 pb-2"
                    >
                      All services
                      <ArrowIcon className="h-3.5 w-3.5" />
                    </Link>
                  </div>
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

            {/* Desktop CTA — the header carries the same filled blue action
                the hero does, so the conversion point is never more than a
                click (and a scroll) away. */}
            <Link
              href={localeHref("/contact")}
              data-track="cta_click"
              data-track-label="header"
              className="ds-btn ds-btn-primary hidden h-10 min-h-10 px-5 text-sm xl:inline-flex"
            >
              Discuss your project
              <ArrowIcon />
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
      </header>

      {/* ── Mobile drawer ──────────────────────────────────────────────────
          Modal, so it gets the full dialog contract: labelled, focus-trapped,
          scroll-locked, Escape-closable, focus restored on close. Carries the
          same white surface as the header above it. */}
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
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
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
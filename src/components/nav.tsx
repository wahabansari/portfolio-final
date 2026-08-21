"use client";

import { useEffect, useRef, useState } from "react";
import { sections } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/cn";

/** The wordmark, with the trailing letter picked out in Google's four colours. */
function Wordmark() {
  const colors = ["text-g-blue", "text-g-red", "text-g-yellow", "text-g-green"];
  return (
    <span className="text-[1.375rem] leading-none font-medium tracking-[-0.01em] text-ink">
      {"Wahab".split("").map((c, i) => (
        <span key={i} className={i === 0 ? colors[0] : undefined}>
          {c}
        </span>
      ))}
      <span className={colors[1]}>.</span>
    </span>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.6, 1] },
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        openerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-sm">
      <div className="g-container flex h-16 items-center justify-between gap-6">
        <a href="#home" className="-mx-2 flex min-h-11 items-center gap-2 rounded-full px-2">
          <Wordmark />
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={activeId === s.id ? "true" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeId === s.id
                  ? "bg-surface-blue text-on-tonal"
                  : "text-ink-muted hover:bg-surface hover:text-ink",
              )}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="g-btn g-btn-filled hidden h-10 min-h-10 px-5 text-sm sm:inline-flex"
          >
            Get in touch
          </a>
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
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-full px-4 py-3 text-[0.9375rem] font-medium transition-colors",
                  activeId === s.id
                    ? "bg-surface-blue text-on-tonal"
                    : "text-ink-muted hover:bg-surface hover:text-ink",
                )}
              >
                {s.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="g-btn g-btn-filled mt-3"
            >
              Get in touch
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

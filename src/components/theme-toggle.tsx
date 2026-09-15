"use client";

import { useSyncExternalStore } from "react";
import { Tooltip } from "@/components/ds/tooltip";

type Theme = "dark" | "light";

/** Runs before paint so there's no flash of the wrong palette.
    Light is the designed default (white with the sky accent); dark is opt-in
    via the toggle and is remembered.

    It also stamps `js-motion` on <html>, which is what gates the scroll-reveal
    entrance in globals.css. Doing it here rather than in a component is the
    whole point: the class lands before first paint, so revealed content is
    never painted visible and then hidden. And because the class only exists
    when this script runs, a visitor with JavaScript disabled — or a crawler
    that does not execute it — gets every section fully visible rather than a
    page of elements stuck at opacity 0. */
export const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t!=='dark'){t='dark'}d.setAttribute('data-theme',t)}catch(e){d.setAttribute('data-theme','dark')}d.classList.add('js-motion')})();`;

/* The <html data-theme> attribute is the source of truth; the toggle reads it
   from the DOM instead of keeping a second copy in React state. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

const getServerSnapshot = (): Theme => "light";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  const toggle = () => {
    // Read the live attribute so rapid clicks can't act on a stale render.
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage blocked — the in-session switch still works */
    }
  };

  return (
    <Tooltip label={`Switch to ${isDark ? "light" : "dark"} theme`} side="bottom" delayDuration={500}>
      <button
        type="button"
        onClick={toggle}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink-muted transition-colors hover:border-border-strong hover:bg-surface hover:text-ink"
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </Tooltip>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

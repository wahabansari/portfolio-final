"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import type { SearchEntry } from "@/lib/search-index";

/**
 * Spotlight — a command-palette style search modal.
 *
 * Triggered by the Cmd/Ctrl+K keyboard shortcut or the nav search button (via
 * a custom `spotlight:open` event dispatched on `window`). Groups results by
 * type, highlights the first matched token in the title, and navigates on Enter
 * or click. External project URLs open in a new tab.
 *
 * Styled with the site's design tokens so it feels native to the warm-paper
 * theme rather than a generic copy-paste palette.
 */

const RESULT_LIMIT = 10;

type ScoredEntry = SearchEntry & { score: number; highlighted: string };

function normalise(s: string) {
  return s.toLowerCase();
}

/** Return tokens, dropping very short strings so single-letter matches don't
 * overpower results. */
function tokenise(q: string) {
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length >= 2);
}

function highlightTitle(title: string, tokens: string[]): string {
  const low = title.toLowerCase();
  for (const t of tokens) {
    const idx = low.indexOf(t);
    if (idx === -1) continue;
    const before = title.slice(0, idx);
    const match = title.slice(idx, idx + t.length);
    const after = title.slice(idx + t.length);
    return `${before}\u0001${match}\u0002${after}`;
  }
  return title;
}

function renderHighlighted(raw: string) {
  const parts = raw.split(/\u0001|\u0002/);
  if (parts.length === 1) return raw;
  // parts: [before, match, after]
  return (
    <>
      {parts[0]}
      <mark className="rounded bg-accent-soft px-0.5 text-accent">{parts[1]}</mark>
      {parts[2] ?? ""}
    </>
  );
}

function score(entries: SearchEntry[], tokens: string[]): ScoredEntry[] {
  if (tokens.length === 0) return [];
  return entries
    .map((e) => {
      const titleLow = normalise(e.title);
      const kwLow = normalise(e.keywords.join(" "));
      const excLow = normalise(e.excerpt);
      let score = 0;
      for (const t of tokens) {
        if (titleLow.includes(t)) score += 3;
        if (kwLow.includes(t)) score += 2;
        if (excLow.includes(t)) score += 1;
      }
      const highlighted = highlightTitle(e.title, tokens);
      return { ...e, score, highlighted };
    })
    .filter((e) => e.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, RESULT_LIMIT);
}

type Group = { type: string; items: ScoredEntry[] };

function groupResults(items: ScoredEntry[]): Group[] {
  const map = new Map<string, ScoredEntry[]>();
  for (const item of items) {
    const arr = map.get(item.type) ?? [];
    arr.push(item);
    map.set(item.type, arr);
  }
  return Array.from(map, ([type, items]) => ({ type, items }));
}

const GROUP_LABELS: Record<string, string> = {
  Page: "Pages",
  Service: "Services",
  Project: "Work",
  Insight: "Articles",
  Experience: "Experience",
};

const SUGGESTIONS = [
  "migration",
  "performance",
  "Next.js",
  "React",
  "SaaS",
  "AI",
  "WordPress",
  "hire",
];

function navigate(href: string) {
  if (href.startsWith("http")) {
    window.open(href, "_blank", "noopener,noreferrer");
  } else {
    window.location.href = href;
  }
}

export function Spotlight({ entries }: { entries: SearchEntry[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const results = useMemo(() => score(entries, tokenise(query)), [entries, query]);
  const groups = useMemo(() => groupResults(results), [results]);
  const flatResults = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const totalResults = flatResults.length;

  /* ── Open / Close ────────────────────────────────────────────────────────── */

  const openSpotlight = useCallback(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    setOpen(true);
    setQuery("");
    setActiveIdx(0);
  }, []);

  const closeSpotlight = useCallback(() => {
    setOpen(false);
    previousFocus.current?.focus();
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (openRef.current) {
          closeSpotlight();
        } else {
          openSpotlight();
        }
      }
    }
    function onCustomOpen() {
      openSpotlight();
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("spotlight:open", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("spotlight:open", onCustomOpen);
    };
  }, [openSpotlight, closeSpotlight]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      // Small delay to ensure DOM is painted before focusing
      const t = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(t);
    }
  }, [open]);

  // Prevent body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Keep the active result in view while navigating with the keyboard
  useEffect(() => {
    resultsRef.current
      ?.querySelector<HTMLElement>('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  /* ── Keyboard navigation inside the modal ──────────────────────────────── */

  function onKeyDown(e: ReactKeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeSpotlight();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % totalResults);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + totalResults) % totalResults);
      return;
    }
    if (e.key === "Enter" && totalResults > 0) {
      e.preventDefault();
      navigate(flatResults[activeIdx].href);
      closeSpotlight();
    }
  }

  /* ── Render ────────────────────────────────────────────────────────────── */

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Search this site"
      aria-modal="true"
      className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh]"
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-deep/40 backdrop-blur-sm"
        onClick={closeSpotlight}
      />

      {/* Panel */}
      <div className="relative flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_16px_64px_-16px_var(--color-deep)]">
        {/* Search input row */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          {/* Magnifier */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
            className="shrink-0 text-fg-subtle"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            placeholder="Search work, services, articles\u2026"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            onKeyDown={onKeyDown}
            aria-activedescendant={
              totalResults > 0 ? `spotlight-result-${activeIdx}` : undefined
            }
            aria-controls="spotlight-results"
            className="flex-1 bg-transparent text-[0.9375rem] text-fg outline-none placeholder:text-fg-muted"
          />

          {/* Kbd hint */}
          <kbd className="hidden rounded-md border border-border bg-surface-hover px-2 py-1 text-[0.6875rem] font-medium tabular-nums text-fg-subtle sm:inline">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div
          id="spotlight-results"
          ref={resultsRef}
          role="listbox"
          aria-label="Search results"
          className="max-h-[min(60vh,28rem)] overflow-auto overscroll-contain p-2"
        >
          {query.trim().length === 0 && (
            <div className="px-3 py-6 text-center">
              <p className="ds-body-sm text-fg-muted">
                Type to search across projects, services and articles.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setQuery(s);
                    }}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-[0.75rem] font-medium text-fg-subtle transition-colors hover:border-accent hover:text-accent"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim().length > 0 && totalResults === 0 && (
            <div className="px-3 py-8 text-center">
              <p className="ds-body-sm text-fg-muted">
                No results for &ldquo;{query}&rdquo;
              </p>
              <p className="ds-meta mt-2 text-fg-subtle">
                Try one of: {SUGGESTIONS.join(", ")}
              </p>
            </div>
          )}

          {groups.map((group) => (
            <div key={group.type} role="group" aria-label={GROUP_LABELS[group.type] ?? group.type}>
              <p className="px-3 pb-2 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-fg-subtle">
                {GROUP_LABELS[group.type] ?? group.type}
              </p>
              {group.items.map((item) => {
                const globalIdx = flatResults.indexOf(item);
                const active = globalIdx === activeIdx;
                return (
                  <button
                    key={`${item.type}-${item.href}`}
                    id={`spotlight-result-${globalIdx}`}
                    role="option"
                    aria-selected={active}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                      closeSpotlight();
                    }}
                    onMouseEnter={() => setActiveIdx(globalIdx)}
                    className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                      active
                        ? "bg-accent-soft/60 text-fg"
                        : "text-fg hover:bg-surface-hover"
                    }`}
                  >
                    <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-accent/50" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.875rem] font-medium">
                        {renderHighlighted(item.highlighted)}
                      </span>
                      <span className="mt-0.5 block truncate text-[0.75rem] text-fg-muted">
                        {item.excerpt}
                      </span>
                    </span>
                    <span className="mt-0.5 hidden whitespace-nowrap rounded bg-surface-hover px-1.5 py-0.5 text-[0.625rem] font-medium tabular-nums text-fg-subtle sm:inline-block">
                      {item.type}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer hints */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[0.6875rem] text-fg-subtle">
          <span>{totalResults > 0 ? `${totalResults} result${totalResults === 1 ? "" : "s"}` : ""}</span>
          <span className="flex items-center gap-2">
            <kbd className="rounded border border-border px-1.5 py-0.5 text-[0.625rem] font-medium">↑↓</kbd> navigate
            <kbd className="rounded border border-border px-1.5 py-0.5 text-[0.625rem] font-medium">⏎</kbd> open
          </span>
        </div>
      </div>
    </div>
  );
}

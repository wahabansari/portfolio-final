"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { SearchEntry, SearchGroup } from "@/lib/search";
import { cn } from "@/lib/cn";
import { ArrowIcon, SearchIcon } from "./ui";
import { Dialog } from "./ds";

/**
 * Spotlight search — macOS Command-K-style command palette over the site.
 *
 * The header's search box opens it; ⌘K / Ctrl+K works anywhere on the page;
 * Escape, the backdrop, or navigating to a result closes it. The index is
 * built lazily by a dynamic import the first time the palette opens, so the
 * content modules (services, work, insights) never load in the initial bundle.
 *
 * Modal contract is Radix's, not reimplemented here: the Dialog owns the
 * focus trap, the initial focus into the field, the scroll lock behind it,
 * Escape-to-close and aria-modal. This component only owns the search itself —
 * the index, the query, the selection, and Arrow/Enter handling on top of
 * whatever Radix already does. That is the point of building the palette on
 * the design-system Dialog: the one piece of genuinely reused behaviour here
 * is the hardest part to get right by hand.
 */

const GROUPS: { key: SearchGroup; label: string }[] = [
  { key: "Page", label: "Pages" },
  { key: "Service", label: "Services" },
  { key: "Work", label: "Work" },
  { key: "Insight", label: "Insights" },
];

const QUICK = ["Next.js", "WordPress", "Performance", "Redesign", "Sunhub", "AI"];

const kbdClass =
  "inline-flex h-5 min-w-5 items-center justify-center rounded border border-slate-300 bg-white px-1.5 font-mono text-[0.6875rem] leading-none text-slate-600";

export function Spotlight({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [active, setActive] = useState(0);

  const listRef = useRef<HTMLDivElement>(null);

  /* The Dialog content unmounts on close, so this component (inside it) is
     remounted fresh every time the palette opens: query and selection are
     already reset, and the index reloads below with nothing to guard. */

  /* Load the index on first open of each session — a dynamic import so the
     heavy content modules are a lazy chunk, not part of the initial payload. */
  useEffect(() => {
    if (!open) return;
    let alive = true;
    import("@/lib/search").then((m) => {
      if (alive) setEntries(m.buildSearchIndex());
    });
    return () => {
      alive = false;
    };
  }, [open]);

  const results = useMemo(() => searchIn(entries, query), [entries, query]);

  const groups = useMemo(() => {
    const grouped = new Map<SearchGroup, SearchEntry[]>();
    for (const item of results) {
      const bucket = grouped.get(item.group);
      if (bucket) bucket.push(item);
      else grouped.set(item.group, [item]);
    }
    return GROUPS.filter(
      (g) => (grouped.get(g.key)?.length ?? 0) > 0,
    ).map((g) => ({ ...g, items: grouped.get(g.key) ?? [] }));
  }, [results]);

  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  /* Scroll the selected row into view without moving the page behind it. */
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-result-idx="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const navigate = useCallback(
    (item: SearchEntry) => {
      router.push(item.href);
      onClose();
    },
    [router, onClose],
  );

  /* Modal keys once open. (⌘K / Ctrl+K to open lives in the Nav, which owns
     the open state — this component only closes with Escape.) */
  const onDocumentKey = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setActive((a) => Math.min(a + 1, Math.max(flat.length - 1, 0)));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActive((a) => Math.max(a - 1, 0));
          break;
        case "Enter": {
          const item = flat[active];
          if (item) {
            e.preventDefault();
            navigate(item);
          }
          break;
        }
      }
    },
    [open, flat, active, navigate, onClose],
  );

  useEffect(() => {
    window.addEventListener("keydown", onDocumentKey);
    return () => window.removeEventListener("keydown", onDocumentKey);
  }, [onDocumentKey]);

  const noQuery = query.trim() === "";
  const showResults = !noQuery && results.length > 0;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
      description="Search services, projects and notes on this site"
    >
      {/* ── Input row ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 border-b border-slate-200 px-5">
        <SearchIcon className="h-5 w-5 shrink-0 text-slate-400" />
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          placeholder="Search services, work, insights…"
          aria-label="Search"
          className="h-14 min-w-0 flex-1 border-0 bg-transparent text-[1.0625rem] text-ink outline-none placeholder:text-ink-soft focus-visible:outline-none"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="inline-flex h-7 items-center rounded-md border border-slate-300 px-2 font-mono text-[0.6875rem] text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900"
        >
          esc
        </button>
      </div>

        {/* ── Body ──────────────────────────────────────────────────────── */}
        <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
          {noQuery && (
            <div className="px-3 py-4">
              <p className="ds-meta">What are you looking for?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuery(q)}
                    className="ds-chip ds-chip-accent transition-transform hover:-translate-y-0.5"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!noQuery && results.length === 0 && entries.length > 0 && (
            <div className="px-5 py-10 text-center">
              <p className="text-[0.9375rem] font-medium text-ink">No results for “{query.trim()}”</p>
              <p className="ds-body-sm mt-1">Try a service, a project, or one of the quick chips below.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuery(q)}
                    className="ds-chip transition-colors hover:border-accent-line hover:text-accent"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {showResults && (
            <div className="space-y-4 py-1">
              {groups.map((g) => (
                <div key={g.key}>
                  <p className="ds-meta px-3 pt-2 pb-1">{g.label}</p>
                  <ul>
                    {g.items.map((item) => {
                      const idx = flat.indexOf(item);
                      const isActive = idx === active;
                      return (
                        <li key={item.id}>
                          <Link
                            href={item.href}
                            data-result-idx={idx}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(item);
                            }}
                            className={cn(
                              "group flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-3 transition-colors",
                              isActive ? "bg-accent-soft" : "hover:bg-surface",
                            )}
                          >
                            <span
                              aria-hidden
                              className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border transition-colors",
                                isActive
                                  ? "border-accent-line bg-accent text-accent-fg"
                                  : "border-border bg-surface text-ink-soft group-hover:text-accent",
                              )}
                            >
                              <GroupMark group={item.group} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[0.9375rem] font-medium text-ink">
                                {item.title}
                              </span>
                              {item.blurb && (
                                <span className="ds-body-sm mt-0.5 block truncate">{item.blurb}</span>
                              )}
                            </span>
                            <ArrowIcon
                              className={cn(
                                "h-4 w-4 shrink-0 transition-all",
                                isActive ? "text-accent" : "text-ink-soft opacity-0 group-hover:opacity-100",
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
          )}
        </div>

        {/* ── Footer hints ───────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 px-5 py-3">
          <p className="ds-body-sm text-[0.8125rem]">
            {showResults
              ? `${results.length} ${results.length === 1 ? "result" : "results"}`
              : "Search across pages, services, work and insights"}
          </p>
          <div className="flex items-center gap-3 text-ink-muted">
            <span className="hidden items-center gap-1.5 sm:flex">
              <span className={kbdClass}>↑</span>
              <span className={kbdClass}>↓</span>
              <span className="ds-body-sm text-[0.75rem]">move</span>
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <span className={kbdClass}>↵</span>
              <span className="ds-body-sm text-[0.75rem]">open</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className={kbdClass}>esc</span>
              <span className="ds-body-sm text-[0.75rem]">close</span>
            </span>
          </div>
        </div>
    </Dialog>
  );
}

/* Inline filter so the component never waits on a second module round-trip;
   logic mirrors lib/search.ts so behaviour stays identical if it is reused. */
function searchIn(entries: SearchEntry[], query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored: { entry: SearchEntry; score: number }[] = [];
  for (const entry of entries) {
    const title = entry.title.toLowerCase();
    const body = `${entry.blurb ?? ""} ${entry.keywords}`.toLowerCase();

    let score = 0;
    if (title === q) score += 100;
    else if (title.startsWith(q)) score += 60;
    else if (title.includes(q)) score += 40;
    if (body.includes(q)) score += 18;

    if (score > 0) scored.push({ entry, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .map((s) => s.entry);
}

function GroupMark({ group }: { group: SearchGroup }) {
  const paths: Record<SearchGroup, ReactNode> = {
    Page: (
      <>
        <path d="M14 3v5h5" />
        <path d="M13.5 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8.5z" />
      </>
    ),
    Service: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    Work: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      </>
    ),
    Insight: (
      <>
        <path d="M7 3h10a1 1 0 0 1 1 1v16l-3-2-3 2-3-2-3 2V4a1 1 0 0 1 1-1z" />
        <path d="M9 8h6M9 12h6" />
      </>
    ),
  };

  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[group]}
    </svg>
  );
}
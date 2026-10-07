"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { ArrowIcon, CheckIcon, CodeIcon, LayoutIcon, RefreshIcon, SparklesIcon } from "./ui";

export type ShowcaseService = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  bestFor: string;
  gets: string[];
};

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "custom-web-development": CodeIcon,
  "business-dashboards": LayoutIcon,
  "software-modernization": RefreshIcon,
  "ai-business-automation": SparklesIcon,
};

/**
 * The four services as a selector: a list on the left (icon, name and a short
 * descriptor per service, the chosen one raised), the chosen service's detail
 * on the right. One service is open at a time, so the section
 * stays short however much each one says. Every panel is rendered in the
 * server HTML (inactive ones are only `hidden`), so crawlers and no-JS readers
 * get all four; the buttons are a proper tablist with arrow-key navigation.
 */
export function ServicesShowcase({ items }: { items: ShowcaseService[] }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = items.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (i + 1) % items.length
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (i - 1 + items.length) % items.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-12 lg:gap-8">
      <div className="flex flex-col gap-3 lg:col-span-5">
        <div
          role="tablist"
          aria-label="Services"
          aria-orientation="vertical"
          className="flex flex-col gap-2 lg:flex-1"
        >
          {items.map((s, i) => {
            const selected = i === active;
            const Icon = ICONS[s.slug] ?? CodeIcon;
            return (
              <button
                key={s.slug}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`${base}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${base}-panel-${i}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                data-track="cta_click"
                data-track-label={`home-service-tab:${s.slug}`}
                className={cn(
                  "group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border px-4 py-4 text-left transition-all duration-200 lg:flex-1",
                  selected
                    ? "border-accent-hairline bg-bg shadow-[var(--shadow-card-hover)]"
                    : "border-border-subtle bg-surface hover:border-border hover:bg-bg",
                )}
              >
                {/* Accent bar: grows in on the selected row. */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-y-3 left-0 w-[3px] rounded-r-full bg-accent-deep transition-transform duration-300",
                    selected ? "scale-y-100" : "scale-y-0",
                  )}
                />
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200",
                    selected
                      ? "bg-accent-deep text-accent-fg"
                      : "bg-accent-soft text-accent group-hover:bg-accent-deep group-hover:text-accent-fg",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[1rem] leading-snug font-semibold tracking-[-0.01em] text-fg">
                    {s.shortTitle}
                  </span>
                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-fg-muted">{s.eyebrow}</span>
                </span>
                <span
                  className={cn(
                    "text-[0.75rem] font-bold tabular-nums transition-colors",
                    selected ? "text-accent" : "text-fg-subtle",
                  )}
                >
                  {s.index}
                </span>
              </button>
            );
          })}
        </div>

        <p className="px-1 text-[0.875rem] text-fg-muted">
          Not sure which one fits?{" "}
          <Link
            href="/contact"
            data-track="cta_click"
            data-track-label="home-service-unsure"
            className="font-semibold text-accent hover:underline"
          >
            Tell us the problem
          </Link>
        </p>
      </div>

      <div className="lg:col-span-7">
        {items.map((s, i) => {
          const Icon = ICONS[s.slug] ?? CodeIcon;
          return (
            <div
              key={s.slug}
              role="tabpanel"
              id={`${base}-panel-${i}`}
              aria-labelledby={`${base}-tab-${i}`}
              hidden={i !== active}
              className="service-panel h-full rounded-3xl border border-border bg-bg p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-deep text-accent-fg">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[1.375rem] leading-tight font-bold tracking-[-0.02em] text-fg">{s.title}</h3>
                  <p className="ds-body-sm mt-2">{s.summary}</p>
                </div>
              </div>

              <div className="mt-6 border-t border-border-subtle pt-5">
                <p className="ds-meta">What you get</p>
                <ul className="mt-3 space-y-2.5">
                  {s.gets.map((g) => (
                    <li key={g} className="flex items-start gap-3">
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      <span className="ds-body-sm text-fg">{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-border-subtle pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="ds-body-sm">
                  <span className="font-semibold text-fg">Best for: </span>
                  {s.bestFor}
                </p>
                <Link
                  href={`/services/${s.slug}`}
                  data-track="cta_click"
                  data-track-label={`home-service:${s.slug}`}
                  className="ds-btn ds-btn-primary shrink-0 self-start sm:self-auto"
                >
                  See the service
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

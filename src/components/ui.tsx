"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const EASE = [0.2, 0, 0, 1] as const; // Material's standard easing

/** Gentle fade-and-lift as content scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/**
 * Section band. Google alternates plain white with a #F8F9FA fill rather than
 * using borders or shadows to separate content.
 */
export function Section({
  id,
  children,
  className,
  tone = "plain",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "plain" | "grey" | "blue";
}) {
  return (
    <section
      id={id}
      className={cn(
        "g-section scroll-mt-16",
        tone === "grey" && "bg-surface",
        tone === "blue" && "bg-surface-blue",
        className,
      )}
    >
      <div className="g-container">{children}</div>
    </section>
  );
}

/**
 * Section heading — overline, large light title, supporting line. Left
 * aligned, matching how Google opens each block.
 */
export function SectionHeading({
  overline,
  title,
  description,
  aside,
  /* A section that owns its own route is that page's h1. Left as h2 when the
     section is one block among several on a page. */
  level = "h2",
}: {
  overline: string;
  title: string;
  description?: string;
  aside?: ReactNode;
  level?: "h1" | "h2";
}) {
  const Heading = level;
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="g-overline">{overline}</p>
          <Heading className={level === "h1" ? "g-display mt-4" : "g-h2 mt-4"}>
            {title}
          </Heading>
          {description && <p className="g-body-lg mt-5 max-w-2xl">{description}</p>}
        </div>
        {aside && <div className="shrink-0">{aside}</div>}
      </div>
    </Reveal>
  );
}

/** A label above a value, used wherever meta data appears so it lines up. */
export function Field({
  label,
  value,
  className,
}: {
  label: string;
  value: ReactNode;
  /* Layout classes belong here rather than on a wrapper element: a <div>
     inside a <dl> has to contain the dt/dd pair directly, so nesting one more
     div around a Field makes the list malformed. */
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <dt className="g-body-sm">{label}</dt>
      <dd className="text-[0.9375rem] font-medium text-ink">{value}</dd>
    </div>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M13.3 5.3a1 1 0 0 0 0 1.4l4.3 4.3H4a1 1 0 1 0 0 2h13.6l-4.3 4.3a1 1 0 1 0 1.4 1.4l6-6a1 1 0 0 0 0-1.4l-6-6a1 1 0 0 0-1.4 0z" />
    </svg>
  );
}

export function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.6l-9.8 9.8 1.4 1.4L19 6.4V10h2V3h-7z" />
    </svg>
  );
}

export function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
    </svg>
  );
}

/**
 * The wordmark: a monogram tile plus the name, the way Google pairs its "G"
 * mark with the Google wordmark. White on Blue 600 is 4.51:1, so the tile
 * clears AA; the name itself stays ink so it never depends on the accent.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span
        aria-hidden
        className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary-bg text-[1.0625rem] leading-none font-medium text-primary-fg"
      >
        W
      </span>
      <span className="text-[1.375rem] leading-none font-medium tracking-[-0.01em] text-ink">
        Wahab
        <span className="text-g-red-strong">.</span>
      </span>
    </span>
  );
}

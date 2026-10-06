import type { CSSProperties } from "react";

/**
 * Homepage icons - SF Symbols-style line icons (24px grid, 1.6 stroke,
 * round caps and joins), a few of them animated.
 *
 * Paths marked `draw` carry `pathLength={1}`, so one pair of CSS rules in
 * globals.css (`.draw`) can draw any of them in when their `Reveal` wrapper
 * becomes visible. With JavaScript off, or with reduced motion, the rules
 * never hide anything: the icons are simply drawn.
 */

type IconProps = { className?: string };

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const delay = (d: number): CSSProperties => ({ ["--d" as string]: d });

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <path className="draw" pathLength={1} style={delay(0.3)} d="M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01" />
    </svg>
  );
}

export function TrendUpIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path className="draw" pathLength={1} d="M3 17.5 9 11.5l4 4 7.5-8" />
      <path className="draw" pathLength={1} style={delay(0.55)} d="M15 7.5h5.5V13" />
    </svg>
  );
}

export function ShieldCheckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.2 5 6v5.6c0 4.2 2.8 7.4 7 9.2 4.2-1.8 7-5 7-9.2V6l-7-2.8Z" />
      <path className="draw" pathLength={1} style={delay(0.35)} d="m8.8 12.2 2.4 2.4 4-4.6" />
    </svg>
  );
}

/** A circled check that draws itself in - used for the working commitments. */
export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle className="draw" pathLength={1} cx="12" cy="12" r="8.75" />
      <path className="draw" pathLength={1} style={delay(0.45)} d="m8.2 12.4 2.7 2.7 5-5.6" />
    </svg>
  );
}

/**
 * The process timeline: one line that draws left to right behind the step
 * badges. Decorative; the steps themselves are an ordered list.
 */
export function TimelineLine({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 4"
      preserveAspectRatio="none"
      className={className}
      fill="none"
    >
      <path
        className="draw"
        pathLength={1}
        d="M0 2H100"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ ["--dur" as string]: "1.8s" }}
      />
    </svg>
  );
}

import type { CSSProperties } from "react";
import { CodeIcon, CompassIcon, GaugeIcon, LayoutIcon, Reveal, RocketIcon } from "./ui";

type ProcessStep = { step: string; detail: string };

const STEP_ICONS = [CompassIcon, LayoutIcon, CodeIcon, GaugeIcon, RocketIcon];

/* Seconds the progress line takes to cross the whole timeline, and the pause
   before it starts. Badge i is timed to the moment the line reaches it, so the
   line, the leading dot, the badges and the cards read as one sequence. */
const LINE_DUR = 2.4;
const LINE_START = 0.3;

const delay = (i: number, count: number) => LINE_START + (i / Math.max(count - 1, 1)) * LINE_DUR;
const style = (vars: Record<string, string | number>) => vars as CSSProperties;

/**
 * The five-step process as an animated timeline, used on the homepage and the
 * services page so the sequence is identical wherever it appears.
 *
 * When the timeline scrolls into view a progress line draws across it with a
 * dot leading the way; each numbered badge pops as the line reaches it (with a
 * single expanding ring) and its card rises in just after. On narrow screens
 * the same sequence runs top to bottom, segment by segment. Pure CSS driven by one `Reveal`: no
 * scroll listener, nothing hidden without JavaScript, and reduced motion shows
 * the finished timeline.
 */
export function ProcessTimeline({ steps }: { steps: readonly ProcessStep[] }) {
  const count = steps.length;

  return (
    <Reveal className="mx-auto max-w-6xl">
      <ol
        className="relative grid gap-4 lg:grid-cols-5 lg:gap-5"
        style={style({ "--line-dur": `${LINE_DUR}s` })}
      >
        {/* Desktop: a track with a progress line and a leading dot, running
            through the centre of the badges (first to last). */}
        <li
          aria-hidden
          className="pointer-events-none absolute top-[1.625rem] right-[10%] left-[10%] hidden h-[3px] lg:block"
        >
          <span className="absolute inset-0 rounded-full bg-border-subtle" />
          <span className="line-grow-x absolute inset-0 rounded-full bg-accent-deep" />
          <span className="travel-dot absolute top-1/2 -mt-[7px] -ml-[7px] h-[14px] w-[14px] rounded-full bg-accent-deep shadow-[0_0_0_4px_var(--color-accent-soft)]" />
        </li>

        {steps.map((s, i) => {
          const Icon = STEP_ICONS[i] ?? CodeIcon;
          const d = delay(i, count);
          return (
            <li key={s.step} className="relative flex gap-4 lg:flex-col lg:items-center lg:gap-5">
              {/* Mobile: a vertical segment from this badge to the next, timed
                  to the same schedule as the desktop line. */}
              {i < count - 1 && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-[1.625rem] -bottom-[2.625rem] left-[1.5625rem] w-[3px] lg:hidden"
                >
                  <span className="absolute inset-0 rounded-full bg-border-subtle" />
                  <span
                    className="line-grow-y absolute inset-0 rounded-full bg-accent-deep"
                    style={{
                      transitionDuration: `${LINE_DUR / Math.max(count - 1, 1)}s`,
                      transitionDelay: `${d}s`,
                    }}
                  />
                </span>
              )}
              <span className="relative z-10 shrink-0">
                <span
                  className="badge-ring absolute inset-0 rounded-full bg-accent-deep"
                  style={style({ "--d": d })}
                />
                <span
                  className="pop relative flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-accent-deep text-accent-fg shadow-[0_0_0_5px_var(--color-bg)]"
                  style={style({ "--d": d })}
                >
                  <Icon className="h-[1.375rem] w-[1.375rem]" />
                </span>
              </span>

              <div
                className="step-in flex-1 pb-4 lg:w-full lg:pb-0 lg:text-center"
                style={style({ "--d": d + 0.15 })}
              >
                <span className="text-[0.75rem] font-semibold tracking-[0.08em] text-accent tabular-nums">
                  STEP {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="ds-title mt-1.5">{s.step}</h3>
                <p className="ds-body-sm mt-1.5">{s.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Reveal>
  );
}

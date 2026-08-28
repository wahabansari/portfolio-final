"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * The only two client components in the presentation layer. Everything else
 * renders on the server, so the page is complete in the initial HTML and the
 * motion is genuinely additive — remove it and nothing is lost but the fade.
 */

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "header";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/**
 * Counts up once, when the figure scrolls into view. The final value is what
 * renders on the server, so the number is correct with JavaScript disabled and
 * for anyone who has asked for reduced motion — the animation only ever runs
 * backwards from the truth, never towards it.
 */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  const started = useRef(false);

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;

    setValue(0);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const duration = 900;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
          setValue(Math.round(to * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [to, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

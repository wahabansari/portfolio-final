"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * The presentation layer's only motion primitive. Everything else renders on
 * the server, so the page is complete in the initial HTML and the motion is
 * genuinely additive — remove it and nothing is lost but the fade.
 *
 * There is deliberately no count-up component here. Animating a figure from
 * zero renders a false value in the first frame, which is what a crawler or a
 * fast reader sees; the proof figures are static text instead.
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

"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site, stats, summaryShort } from "@/content/site";
import { ArrowIcon, DownloadIcon, Field } from "./ui";

const EASE = [0.2, 0, 0, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const step = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.06 * i, ease: EASE },
  });

  return (
    <section id="home" className="scroll-mt-16 pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="g-container">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {site.available && (
              <motion.p
                {...step(0)}
                className="g-chip g-chip-tonal"
              >
                <span className="h-2 w-2 rounded-full bg-g-green" aria-hidden />
                {site.availabilityNote}
              </motion.p>
            )}

            {/* Speaks to both halves of the audience: hiring managers and
                clients looking to commission work. */}
            <motion.h1 {...step(1)} className="g-display mt-7">
              I build <span className="text-primary">fast web apps</span> — and the{" "}
              <span className="text-primary">AI automations</span> that run behind them.
            </motion.h1>

            <motion.p {...step(2)} className="g-body-lg mt-6 max-w-xl">
              {summaryShort}
            </motion.p>

            <motion.div {...step(3)} className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/services" className="g-btn g-btn-filled">
                Hire me for a project
                <ArrowIcon />
              </Link>
              <Link href="/work" className="g-btn g-btn-outlined">
                View my work
              </Link>
              <a href={site.resumeHref} className="g-btn g-btn-tonal">
                <DownloadIcon />
                Résumé
              </a>
            </motion.div>

            <motion.p {...step(4)} className="g-body-sm mt-7">
              {site.name} · {site.roleLong} · {site.location}
            </motion.p>
          </div>

          {/* Profile card, with the four brand colours as a top rule. */}
          <motion.div {...step(5)} className="lg:col-span-5">
            <div className="g-card-soft overflow-hidden">
              <div aria-hidden className="flex h-1.5">
                <span className="flex-1 bg-g-blue" />
                <span className="flex-1 bg-g-red" />
                <span className="flex-1 bg-g-yellow" />
                <span className="flex-1 bg-g-green" />
              </div>

              <div className="p-7 md:p-8">
                <p className="g-title">Profile</p>

                <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-6">
                  <Field label="Role" value={site.role} />
                  <Field label="Experience" value="5+ years" />
                  <Field label="Location" value={site.location} />
                  <Field label="Timezone" value="PKT (UTC+5)" />
                  <div className="col-span-2">
                    <Field label="Core stack" value="React · Next.js · TypeScript" />
                  </div>
                  <div className="col-span-2">
                    <Field label="Services" value="Full-stack · AI automation" />
                  </div>
                </dl>

                <div className="mt-7 border-t border-border pt-6">
                  <p className="g-body-sm">Email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="g-link mt-1 inline-flex min-h-9 items-center py-1 !text-[0.9375rem] break-all"
                  >
                    {site.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats — a grey band, cards floating on it without borders. */}
      <motion.div {...step(6)} className="mt-20 bg-surface py-14 md:mt-24 md:py-16">
        <div className="g-container">
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label}>
                <dd className="g-display !text-[2.75rem] !leading-none text-primary">
                  {"display" in s && s.display ? (
                    s.display
                  ) : s.numeric ? (
                    <CountUp to={s.value} suffix={s.suffix} delay={i * 110} />
                  ) : (
                    `${s.value}${s.suffix}`
                  )}
                </dd>
                <dt className="g-title-sm mt-4 text-ink">{s.label}</dt>
                <p className="g-body-sm mt-1">{s.sub}</p>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}

function CountUp({ to, suffix, delay = 0 }: { to: number; suffix: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [counted, setCounted] = useState(0);
  const value = reduced ? to : counted;

  useEffect(() => {
    if (reduced || !inView) return;
    let frame = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / 1000, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setCounted(Math.round(eased * to));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const timeout = setTimeout(run, delay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [inView, reduced, to, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

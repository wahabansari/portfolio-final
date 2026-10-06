"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Plate } from "./plate";
import type { Project } from "@/content/work";
import { ArrowIcon, ExternalIcon } from "./ui";

/**
 * The flickable project stack.
 *
 * The one memorable element on the site, and a small demonstration of the
 * thing being sold: an interface that moves the way a hand does.
 *
 *  · Direct manipulation — the top card tracks the pointer 1:1, keeping the
 *    offset from where it was grabbed.
 *  · Momentum projection — on release the resting point is projected from the
 *    release velocity (the exponential-decay form, rate 0.998); if it lands
 *    past the threshold the card is thrown off, otherwise it springs home.
 *  · Velocity handoff — the spring starts from the card's live position with
 *    the finger's own velocity, so there is no seam between drag and motion.
 *  · Springs, not tweens — critically damped for cards that slide forward in
 *    the stack, slightly under-damped (0.8) for the card that was let go,
 *    because that one carried momentum.
 *  · Interruptible — a card can be grabbed again mid-flight; motion always
 *    starts from the on-screen value.
 *
 * Accessibility: Previous/Next buttons and the arrow keys do the same job,
 * the current project is announced and linked as plain text below, and with
 * reduced motion the springs collapse to instant moves.
 */

export type StackItem = Pick<Project, "slug" | "title" | "kind" | "blurb" | "href" | "domain" | "plate" | "image"> & {
  hasCaseStudy: boolean;
};

type Body = { x: number; y: number; s: number; vx: number; vy: number; vs: number; zeta: number };

const SLOT_Y = 14;
const SLOT_SCALE = 0.055;
const RESPONSE = 0.4;
const THROW_DISTANCE = 140;
const FLY_X = 520;

/** Where a flick would come to rest, in px, from a release velocity in px/s. */
function project(velocity: number, rate = 0.998) {
  return ((velocity / 1000) * rate) / (1 - rate);
}

export function FlickStack({ items }: { items: StackItem[] }) {
  const router = useRouter();
  const n = items.length;

  const [order, setOrder] = useState<number[]>(() => items.map((_, i) => i));
  const orderRef = useRef(order);
  const els = useRef<(HTMLDivElement | null)[]>([]);
  const bodies = useRef<Body[]>(
    items.map((_, i) => ({ x: 0, y: i * SLOT_Y, s: 1 - i * SLOT_SCALE, vx: 0, vy: 0, vs: 0, zeta: 1 })),
  );
  const flying = useRef<Set<number>>(new Set());
  const held = useRef<number | null>(null);
  const reduced = useRef(false);
  const raf = useRef<number | null>(null);
  const tickRef = useRef<(now: number) => void>(() => {});
  const last = useRef(0);
  const drag = useRef<{
    id: number;
    pointer: number;
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
    samples: { t: number; x: number }[];
    moved: number;
    t0: number;
  } | null>(null);

  /* Where a card wants to be: its slot among the cards that are not
     currently being thrown, so the rest move up as soon as one leaves. */
  const targetFor = useCallback((i: number) => {
    const live = orderRef.current.filter((k) => !flying.current.has(k));
    const slot = Math.max(0, live.indexOf(i));
    return { y: slot * SLOT_Y, s: 1 - slot * SLOT_SCALE };
  }, []);

  const paint = useCallback((i: number) => {
    const el = els.current[i];
    const b = bodies.current[i];
    if (!el) return;
    const rot = Math.max(-14, Math.min(14, b.x / 22));
    el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0) scale(${b.s}) rotate(${rot}deg)`;
  }, []);

  const finishFlight = useCallback(
    (i: number) => {
      flying.current.delete(i);
      const next = [...orderRef.current.filter((k) => k !== i), i];
      orderRef.current = next;
      setOrder(next);
      const b = bodies.current[i];
      const slot = next.length - 1;
      b.x = 0;
      b.vx = 0;
      b.y = slot * SLOT_Y;
      b.vy = 0;
      b.s = 1 - slot * SLOT_SCALE;
      b.vs = 0;
      b.zeta = 1;
      paint(i);
    },
    [paint],
  );

  const tick = useCallback(
    (now: number) => {
      const dt = Math.min(0.032, (now - (last.current || now)) / 1000) || 0.016;
      last.current = now;
      let active = false;

      bodies.current.forEach((b, i) => {
        if (held.current === i) {
          active = true;
          paint(i);
          return;
        }
        const isFlying = flying.current.has(i);
        const flyDir = b.x === 0 ? 1 : Math.sign(b.x);
        const tx = isFlying ? flyDir * FLY_X : 0;
        const { y: ty, s: ts } = isFlying ? { y: b.y, s: b.s } : targetFor(i);

        if (reduced.current) {
          b.x = tx;
          b.y = ty;
          b.s = ts;
          b.vx = b.vy = b.vs = 0;
        } else {
          const k = Math.pow((2 * Math.PI) / RESPONSE, 2);
          const c = (4 * Math.PI * b.zeta) / RESPONSE;
          b.vx += (-k * (b.x - tx) - c * b.vx) * dt;
          b.x += b.vx * dt;
          b.vy += (-k * (b.y - ty) - c * b.vy) * dt;
          b.y += b.vy * dt;
          b.vs += (-k * (b.s - ts) - c * b.vs) * dt;
          b.s += b.vs * dt;
        }

        if (isFlying && Math.abs(b.x) > FLY_X * 0.8) {
          finishFlight(i);
          active = true;
          return;
        }
        paint(i);

        const settled =
          Math.abs(b.x - tx) < 0.1 &&
          Math.abs(b.y - ty) < 0.1 &&
          Math.abs(b.s - ts) < 0.0005 &&
          Math.abs(b.vx) < 1 &&
          Math.abs(b.vy) < 1;
        if (!settled) active = true;
      });

      raf.current = active ? requestAnimationFrame((t) => tickRef.current(t)) : null;
      if (!active) last.current = 0;
    },
    [finishFlight, paint, targetFor],
  );

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  const kick = useCallback(() => {
    if (raf.current === null) raf.current = requestAnimationFrame((t) => tickRef.current(t));
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
    const onChange = () => {
      reduced.current = mq.matches;
    };
    mq.addEventListener("change", onChange);
    /* One orchestrated moment: the stack fans in from below and settles on
       springs. Skipped entirely under reduced motion. */
    const atRest = bodies.current.every((b, i) => b.y === i * SLOT_Y);
    if (atRest && !mq.matches) {
      bodies.current.forEach((b) => {
        b.y += 90;
        b.s -= 0.07;
      });
    }
    kick();
    bodies.current.forEach((_, i) => paint(i));
    const frame = raf;
    return () => {
      mq.removeEventListener("change", onChange);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
    };
  }, [paint, kick]);

  const open = (item: StackItem) => {
    if (item.hasCaseStudy) router.push(`/work/${item.slug}`);
    else if (item.href) window.open(item.href, "_blank", "noopener,noreferrer");
  };

  const throwTop = useCallback(
    (dir: 1 | -1, velocity = 900) => {
      const top = orderRef.current.find((k) => !flying.current.has(k));
      if (top === undefined || held.current !== null) return;
      const b = bodies.current[top];
      if (b.x === 0) b.x = dir; // gives the flight a direction
      b.vx = dir * Math.max(Math.abs(velocity), 900);
      b.zeta = 0.8;
      flying.current.add(top);
      kick();
    },
    [kick],
  );

  const bringBack = useCallback(() => {
    if (flying.current.size > 0 || held.current !== null) return;
    const cur = orderRef.current;
    const next = [cur[cur.length - 1], ...cur.slice(0, -1)];
    orderRef.current = next;
    setOrder(next);
    kick();
  }, [kick]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>, i: number) => {
    const top = orderRef.current.find((k) => !flying.current.has(k));
    if (top !== i || e.button > 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const b = bodies.current[i];
    held.current = i;
    b.vx = b.vy = 0;
    drag.current = {
      id: i,
      pointer: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      baseX: b.x,
      baseY: b.y,
      samples: [{ t: e.timeStamp, x: b.x }],
      moved: 0,
      t0: e.timeStamp,
    };
    kick();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>, i: number) => {
    const d = drag.current;
    if (!d || d.id !== i || d.pointer !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    d.moved = Math.max(d.moved, Math.hypot(dx, dy));
    const b = bodies.current[i];
    b.x = d.baseX + dx;
    b.y = d.baseY + dy * 0.18;
    const t = e.timeStamp;
    d.samples.push({ t, x: b.x });
    while (d.samples.length > 2 && t - d.samples[0].t > 100) d.samples.shift();
  };

  const release = (e: React.PointerEvent<HTMLDivElement>, i: number, cancelled = false) => {
    const d = drag.current;
    if (!d || d.id !== i || d.pointer !== e.pointerId) return;
    drag.current = null;
    held.current = null;
    const b = bodies.current[i];

    if (!cancelled && d.moved < 6 && e.timeStamp - d.t0 < 500) {
      b.x = d.baseX;
      b.y = d.baseY;
      kick();
      open(items[i]);
      return;
    }

    const first = d.samples[0];
    const lastSample = d.samples[d.samples.length - 1];
    const span = Math.max(16, lastSample.t - first.t);
    const vx = ((lastSample.x - first.x) / span) * 1000;
    const projected = b.x + project(vx);

    if (!cancelled && Math.abs(projected) > THROW_DISTANCE) {
      const dir = (Math.abs(vx) > 300 ? Math.sign(vx) : Math.sign(b.x)) as 1 | -1;
      throwTop(dir || 1, vx);
    } else {
      b.vx = vx; // hand the finger's velocity to the spring
      b.zeta = 0.8; // it carried momentum, so a little bounce is honest
      kick();
    }
  };

  const topIndex = order[0];
  const current = items[topIndex];

  return (
    <div className="mx-auto w-full max-w-[480px]">
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Selected projects. Use the arrow keys, or the buttons below, to move between them."
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") throwTop(1);
          if (e.key === "ArrowLeft") bringBack();
        }}
        className="relative h-[330px] rounded-[28px] outline-offset-8 sm:h-[410px]"
      >
        {items.map((item, i) => {
          const slot = order.indexOf(i);
          return (
            <div
              key={item.slug}
              ref={(el) => {
                els.current[i] = el;
              }}
              onPointerDown={(e) => onPointerDown(e, i)}
              onPointerMove={(e) => onPointerMove(e, i)}
              onPointerUp={(e) => release(e, i)}
              onPointerCancel={(e) => release(e, i, true)}
              aria-hidden={slot !== 0}
              style={{ zIndex: n - slot, touchAction: "pan-y", willChange: "transform", transformOrigin: "50% 100%" }}
              className={`theme-light absolute inset-0 flex select-none flex-col overflow-hidden rounded-[28px] border border-border-subtle bg-bg shadow-[0_18px_44px_-20px_rgba(0,0,0,0.25)] ${
                slot === 0 ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
              }`}
            >
              <Plate project={item} className="!aspect-[2/1] shrink-0 border-b border-border-subtle" />
              <div className="flex flex-1 flex-col p-5 text-left">
                <p className="ds-meta">{item.kind}</p>
                <p className="ds-h3 mt-1">{item.title}</p>
                <p className="ds-body-sm mt-2 line-clamp-2">{item.blurb}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col items-center gap-3 text-center">
        <p className="ds-body-sm" aria-live="polite">
          <span className="font-semibold text-fg">{current.title}</span>
          {" "}
          {current.hasCaseStudy ? (
            <Link href={`/work/${current.slug}`} className="ds-link">
              Read the case study
              <ArrowIcon className="h-3.5 w-3.5" />
            </Link>
          ) : current.href ? (
            <a href={current.href} target="_blank" rel="noopener noreferrer" className="ds-link">
              Visit the live site
              <ExternalIcon className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={bringBack} className="ds-btn ds-btn-secondary px-4 py-1.5 text-[0.8125rem]" aria-label="Previous project">
            Previous
          </button>
          <button type="button" onClick={() => throwTop(1)} className="ds-btn ds-btn-secondary px-4 py-1.5 text-[0.8125rem]" aria-label="Next project">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

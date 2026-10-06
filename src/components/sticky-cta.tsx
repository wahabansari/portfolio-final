"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * A phone-only "Start a project" bar that appears once the visitor has
 * scrolled past the hero, so the main action is always one tap away on a
 * long page. Hidden from tablet width up, where the header already carries
 * the same action.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-4 bottom-4 z-40 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <Link
        href="/contact"
        data-track="cta_click"
        data-track-label="sticky-mobile"
        tabIndex={visible ? 0 : -1}
        className="ds-btn ds-btn-primary w-full shadow-[0_12px_32px_-12px_rgba(0,0,0,0.45)]"
      >
        Start a project
      </Link>
    </div>
  );
}

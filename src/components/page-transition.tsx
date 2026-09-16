"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Wait one animation cycle (360ms) before mounting so the fade-in plays.
  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 36);
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!mounted) return null;

  return <div className="page-enter">{children}</div>;
}
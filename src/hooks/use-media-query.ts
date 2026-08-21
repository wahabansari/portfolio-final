"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query without a mount-time setState, so the value is
 * correct on the very first client render and stays in sync afterwards.
 * Returns `false` during SSR.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

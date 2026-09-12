"use client";

import { Dialog as DialogPrimitive } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Dialog — Radix behaviour, styled by this system.
 *
 * Used for the full-screen Spotlight search. Everything accessible about a
 * modal (focus trap, Escape to dismiss, click-outside, aria-modal, role) comes
 * from Radix; only the look is ours: a white sheet on a slate fog, a sky
 * accent for the input focus, slate hairline dividers.
 */

export function Dialog({
  open,
  onOpenChange,
  description,
  children,
  className,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="ds-backdrop" />
        <DialogPrimitive.Content
          aria-describedby={description ? "spotlight-description" : undefined}
          className={cn(
            "fixed left-1/2 top-[12vh] z-[81] w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2",
            "flex max-h-[80vh] flex-col overflow-hidden",
            "rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_-12px_rgb(2_6_23_/0.25)]",
            "ds-dialog-enter focus:outline-none",
            className,
          )}
        >
          {description ? (
            <p id="spotlight-description" className="sr-only">
              {description}
            </p>
          ) : null}
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function DialogCloseButton({
  onClose,
  className,
  label = "Close",
}: {
  onClose: () => void;
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label={label}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-sky-500 hover:bg-sky-50 hover:text-sky-700",
        className,
      )}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  );
}
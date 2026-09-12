"use client";

import { Tabs as TabsPrimitive } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Tabs — Radix behaviour, styled by this system.
 *
 * The Services overview is the showcase use: a vertical rail of segments on
 * the left (the customer's different pains) and one focused panel on the
 * right where the answer for the selected pain is told once, properly.
 *
 * Behaviour comes from Radix (arrow-key roving focus, aria-selected,
 * aria-controls), the art direction is ours: the rail is invisible until
 * you're on it — plain text rows that fill with a soft sky tint and an accent
 * hairline when active, and the panel is a single flat card. No socks of
 * small cards; one calm statement at a time.
 *
 * Content is force-mounted so every panel stays in the initial HTML
 * (crawlable), Radix hides the inactive panels with the native `hidden`
 * attribute so the DOM stays ignored while mounted.
 */

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  className,
  orientation = "vertical",
  children,
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  orientation?: "horizontal" | "vertical";
  children: ReactNode;
}) {
  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      orientation={orientation}
      className={cn(
        "flex gap-6",
        orientation === "vertical" && "flex-col lg:flex-row lg:gap-10",
        orientation === "horizontal" && "flex-col",
        className,
      )}
    >
      {children}
    </TabsPrimitive.Root>
  );
}

export function TabsList({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <TabsPrimitive.List
      className={cn(
        "flex shrink-0 flex-col gap-1.5 lg:w-72",
        className,
      )}
    >
      {children}
    </TabsPrimitive.List>
  );
}

export function TabsTrigger({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <TabsPrimitive.Trigger
      value={value}
      className={cn(
        "group flex w-full cursor-pointer flex-col items-start gap-1 rounded-xl border border-transparent px-4 py-3.5 text-left transition-colors duration-200 hover:bg-surface",
        "data-[state=active]:border-accent-line data-[state=active]:bg-accent-soft",
        "focus-visible:outline-accent",
        className,
      )}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}

export function TabsPanel({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <TabsPrimitive.Content
      value={value}
      forceMount
      className={cn(
        "hidden min-w-0 flex-1 rounded-[var(--radius-card)] bg-accent-soft/40 p-6 data-[state=active]:block md:p-8",
        "focus-visible:outline-accent",
        className,
      )}
    >
      {children}
    </TabsPrimitive.Content>
  );
}
"use client";

import { Select as SelectPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";

/**
 * SelectField — Radix behaviour, styled by this system.
 *
 * Part of the open design system: behaviour (native select semantics, listbox
 * composition, typeahead, arrow-key and Enter navigation, aria-*) all come
 * from Radix; only the look is ours. The trigger mirrors `ds-field` exactly —
 * same border, fill, radius and focus ring — so a SelectField sits beside a
 * text input in the same field grid without announcing itself as a
 * third-party widget.
 *
 * Styling notes:
 *   · The value renders in ink once chosen; the placeholder keeps the muted
 *     field colour so an unanswered required control is obvious at a glance.
 *   · The chevron flips on open but stays muted — direction on a select is
 *     discovered, not decorated.
 *   · The listbox portal is the same sheet language as the Dialog: white
 *     panel on a fog, hairline border, accent ring on the focused option.
 *
 * `data-field={name}` participates in the contact form's "jump to what needs
 * attention" behaviour without colliding with native inputs' `[name]`.
 */

export type SelectOption = { value: string; label: string };

export function SelectField({
  id,
  name,
  value,
  onValueChange,
  placeholder,
  options,
  invalid,
  disabled,
  className,
}: {
  id: string;
  name: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: readonly SelectOption[];
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <SelectPrimitive.Root
      value={value || undefined}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        id={id}
        data-field={name}
        aria-invalid={invalid ? true : undefined}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-[var(--radius-control)] border bg-surface px-[0.9375rem] py-3 text-left text-[0.9375rem] transition-[border-color,box-shadow] data-[placeholder]:text-ink-soft",
          invalid ? "border-warn" : "border-border-strong",
          "focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_18%,transparent)]",
          invalid &&
            "focus:border-warn focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-warn)_18%,transparent)]",
          className,
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="shrink-0 text-ink-soft transition-transform duration-200 data-[state=open]:rotate-180"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className={cn(
            "z-[90] max-h-[min(20rem,var(--viewport-height))] min-w-[var(--radix-select-trigger-width)]",
            "overflow-y-auto rounded-xl border border-border bg-surface shadow-[0_20px_50px_-20px_rgb(2_6_23_/0.35)]",
            "ds-panel",
          )}
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className={cn(
                  "flex min-h-9 cursor-pointer items-center gap-2.5 rounded-[var(--radius-sm)] px-3 text-[0.9375rem] text-ink transition-colors",
                  "outline-none hover:bg-surface focus:bg-accent-soft data-[state=checked]:text-accent",
                  "select-none data-[disabled]:cursor-not-allowed data-[disabled]:text-ink-soft",
                )}
              >
                <SelectPrimitive.ItemIndicator className="w-4 shrink-0 text-accent">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </SelectPrimitive.ItemIndicator>
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
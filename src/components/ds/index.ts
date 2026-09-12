/**
 * Design system — Radix-backed primitives.
 *
 * These are the keys of the open design system: behaviour from Radix UI,
 * art direction from this project. New surfaces on the site should compose
 * these rather than reach for bespoke dialogs or hand-rolled accordions.
 *
 *   · Accordion — Radix headless accordion, styled as stacked cards with a
 *     grid-rows collapse so answers stay in the initial HTML.
 *   · Tabs      — Radix headless tabs, styled as a vertical rail + flat panel
 *     (showcased by the Services overview).
 *   · Dialog    — Radix headless dialog, the Spotlight search sheet.
 *   · Select    — Radix headless select, styled to match `ds-field` exactly so
 *     it sits beside a text input without announcing itself (contact form
 *     project type / timeline / budget).
 *   · Tooltip   — Radix headless tooltip for icon-only controls; provider is
 *     included internally. Used by the theme toggle.
 */

export { Accordion, type AccordionEntry } from "./accordion";
export { Tabs, TabsList, TabsTrigger, TabsPanel } from "./tabs";
export { Dialog, DialogCloseButton } from "./dialog";
export { SelectField, type SelectOption } from "./select";
export { Tooltip } from "./tooltip";
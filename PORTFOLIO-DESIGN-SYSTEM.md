# Muhammad Wahab Ansari — Portfolio Design System

Extracted directly from the `resume-portfolio` codebase. This is not a new design — it is a document of the system that already exists in `src/app/globals.css`, `src/components/ui.tsx`, `src/components/nav.tsx`, `src/components/hero.tsx`, `src/components/motion.tsx`, `src/components/grid-overlay.tsx`, `src/components/plate.tsx`, `src/app/icon.tsx`, and `src/app/opengraph-image.tsx`.

**How to read confidence markers in this document:**
- **Exact** — copied directly from a CSS variable, Tailwind token, or component source line, cited with its file.
- **Inferred** — not a named token; derived from consistent usage across multiple components, or a reasonable extrapolation. Marked explicitly wherever it appears.
- **Not present** — the brief asked for this, the codebase does not have it. Stated rather than invented.

---

## 0. Quick-Reference Brand Sheet

| | |
|---|---|
| **Primary font** | Bricolage Grotesque (variable, `opsz` 12–96, `wght` 200–800) — the only typeface on the entire site |
| **Secondary font** | None. There is no second family — the brief's "Bricolage vs body font" question has one answer: Bricolage handles both. |
| **Primary background** | `#faf8f4` — warm off-white paper, not cool grey |
| **Primary text** | `#1c1712` — near-black, warm-toned |
| **Accent** | `#4f46e5` indigo-violet (links, CTAs, focus rings) — `#4338ca`/`#3730a3` for button fills |
| **Second accent** | `#e8542e` coral — data points and one illustrative highlight only, never body text or large fills |
| **Border** | `#e8e2d6` — a warm 1px hairline, used constantly; shadows are a supporting actor, not the main structural device |
| **Design style** | Editorial, technical, restrained — warm-paper minimalism with one confident accent, real 1px-bordered cards, and a numeral-led visual motif instead of icon-heavy decoration |
| **LinkedIn banner** | 1584×396px, warm-paper background, indigo brand tile + wordmark, one accent-colored line in the headline — see `LINKEDIN-BRAND-GUIDELINES.md` |

---

## 1. Brand Foundation

**Brand:** Muhammad Wahab Ansari
**Professional identity:** React & Next.js Product Engineer (`site.role`, `src/content/en/site.ts:17`)
**Positioning sentence (verbatim, used site-wide):**
> "I am a Frontend Product Engineer specializing in React and Next.js, with 5+ years of production experience building web products, customer-facing interfaces and performance-focused frontend systems." — `src/content/en/site.ts:34`

**Brand personality — extracted, not invented.** Each trait below is tied to a concrete implementation choice, not a vibe:

| Trait | Evidence |
|---|---|
| **Premium** | Real 1px-bordered cards with a genuinely restrained shadow (`--shadow-card`), not flat fills; a hand-drawn single-stroke monogram instead of a stock icon; `--radius-card: 18px` — confident, not default |
| **Technical** | Tabular numerals (`tabular-nums`) used as a structural device throughout (numeral-led section openers, project indices); a terminal-panel component in the hero rendering real stack facts as system output |
| **Editorial** | CSS-columns "magazine index" layout for Insights; numeral + heading + accent-rule openers instead of card grids; generous `ds-lede` paragraph styling |
| **Minimal / restrained** | One accent color used sparingly (`ds-overline-accent` = one label per viewport, per its own comment); coral capped to decorative/data use only, with the ceiling stated in-code: "never a large fill, never body text" |
| **Structured** | An explicit 8px spacing scale, a fixed section rhythm (120px desktop / 80px mobile), a single container system used by every page |
| **Confident, not loud** | No gradients outside single-hue indigo glows at 10–14% opacity; no drop shadows heavier than `0 4px 12px` at 4–5% opacity in light mode |
| **Honest** | Project "screenshots" are openly-labeled schematic wireframes (`plate.tsx`) when no real screenshot exists, rather than fabricated imagery — this is a stated design principle in the code, not a limitation |

**Not part of the personality (explicitly ruled out by the code):** neon color use, multi-hue gradients, drop-shadow-heavy "floating panel" cards, icon-as-decoration density, a second display/mono typeface for "data" styling.

---

## 2. Color System

All values from `src/app/globals.css:26-129` (`:root` = light, `html[data-theme="dark"]` = dark). **Confidence: Exact** for every row below.

### Primary

| Token | HEX (light) | HEX (dark) | Purpose | Use | Do not use |
|---|---|---|---|---|---|
| `--color-bg` | `#faf8f4` | `#14110d` | Page background | Every page's base fill | As a text color; as a border |
| `--color-fg` | `#1c1712` | `#f5f1e8` | Primary text | H1–H3, body headings, primary nav text, wordmark | Large background fills |
| `--color-surface` | `#ffffff` | `#1c1812` | Card / elevated surface | Cards, nav dropdown, terminal-adjacent panels, inputs | Page-level background (would flatten the surface/page distinction) |

### Secondary

| Token | HEX (light) | HEX (dark) | Purpose | Use | Do not use |
|---|---|---|---|---|---|
| `--color-fg-muted` | `#5a5245` | `#b3a996` | Secondary text | Body copy, descriptions, blurbs | Headings; anything needing full contrast |
| `--color-fg-subtle` | `#756c5d` | `#948a76` | Muted / metadata text | `.ds-meta`, timestamps, captions | Body paragraphs (too quiet at length) |
| `--color-fg-softest` | `#ded6c7` | `#4a4335` | Ghost / disabled-weight text | Large decorative numerals, disabled states | Any text meant to be read normally |
| `--color-surface-hover` | `#f3efe7` | `#241f17` | Secondary surface (hover) | Row/button hover backgrounds | Static/default surface fill |
| `--color-border` | `#e8e2d6` | `#322b20` | Default border | Card borders, dividers, input borders | Text color |
| `--color-border-subtle` | `#f0ebe1` | `#241f17` | Subtle border | Barely-there separators | High-emphasis dividers |

### Accent

| Token | HEX (light) | HEX (dark) | Purpose | Use | Do not use |
|---|---|---|---|---|---|
| `--color-accent` | `#4f46e5` | `#8b83ff` | Interactive accent | Links, focus outline, active nav underline, `.ds-overline-accent` | Large fills, body text |
| `--color-accent-hover` | `#4338ca` | `#a29aff` | Accent hover | Link/nav hover state | — |
| `--color-accent-deep` | `#3730a3` | `#5b52e8` | Button fill | `.ds-btn-primary` background — deliberately a separate, darker step from `--color-accent` so white button text clears 4.5:1 in dark mode (accent itself is tuned for text-on-dark, too light for a button fill) | Text-on-light (too dark to read as a link color against the paper background at small sizes... it *is* used for the brand-mark gradient, which is a fill, not text) |
| `--color-accent-deep-hover` | `#312e81` | `#6860ea` | Button hover fill | `.ds-btn-primary:hover` | — |
| `--color-accent-soft` | `rgba(79,70,229,0.1)` | `rgba(139,131,255,0.14)` | Accent tint fill | Chip backgrounds, icon-tile backgrounds, hover tints | As a solid text color (it's translucent — renders inconsistently as text fill, confirmed bug pattern from this session's work) |
| `--color-accent-fg` | `#ffffff` | `#ffffff` | Text-on-accent | Primary button label | Anywhere not sitting on a solid accent-deep/accent fill |
| `--color-accent-hairline` | `#c7c2f9` | `rgba(139,131,255,0.4)` | Accent-tinted border | `.ds-chip-accent` border, accordion open-state border | Default borders |
| `--color-glow` | `rgba(79,70,229,0.1)` | `rgba(139,131,255,0.14)` | Ambient glow | Hero/page-header radial background bloom, cursor-follow glow | Anywhere needing a solid color |

### Background

| Token | HEX (light) | HEX (dark) | Purpose |
|---|---|---|---|
| `--color-bg` | `#faf8f4` | `#14110d` | Page background (`tone-plain`) |
| `--color-surface` | `#ffffff` | `#1c1812` | Section band (`tone-soft`), cards |
| `--color-deep` | `#211a6e` | `#0d0a2e` | Inverted band (`tone-deep`) — full indigo fill with white text |
| `--color-surface-blue` | `#eef0fe` | `#1d2135` | One tonal-blue CTA panel fill (`CtaBand navy` variant) and open-accordion fill |
| `--color-panel` | `#14110d` | `#0a0805` | Terminal/data panel — **deliberately fixed-dark in both themes**, like a real terminal window rather than a themed surface |

### Typography colors

| Token | Purpose |
|---|---|
| `--color-fg` | Headings, primary body |
| `--color-fg-muted` | Secondary/supporting body text |
| `--color-fg-subtle` | Metadata, captions, timestamps |
| `--color-fg-softest` | Decorative/ghost numerals only |
| `--color-panel-text` (`#f5f1e8` both themes) | Terminal panel text |
| `--color-panel-dim` (`#948a76` both themes) | Terminal panel secondary text |
| `--color-deep-text` (`#ffffff` both themes) | Inverse text on the `tone-deep` band |

There is no separate "disabled text" token; disabled buttons use `opacity: 0.5` on `.ds-btn:disabled` (**Exact**, `globals.css:413-416`) rather than a dedicated color.

### Borders

| Token | Purpose |
|---|---|
| `--color-border` | Default — cards, dividers, dropdowns |
| `--color-border-subtle` | Barely-visible separators |
| `--color-border-strong` (alias for `--c-fg-subtle`) | Form-field borders (`.ds-field`), stronger emphasis dividers |
| `--color-accent-hairline` | Accent-tinted borders (accent chips, active accordion) |
| `--color-accent-line` | A near-duplicate of `--color-accent-hairline`, used specifically for the CTA-band top rule and "what happens next" step-list rule. **Inferred note:** these two tokens carry identical values in both themes — functionally interchangeable, kept separate in the source for call-site clarity rather than a real distinction. |

### States

| Token | HEX (light) | HEX (dark) | Purpose |
|---|---|---|---|
| `--color-success` | `#15803d` | `#4ade80` | Success text/icon (availability dot, checkmarks) |
| `--color-success-soft` | `#dcfce7` | `#0b2214` | Success chip fill |
| `--color-success-border` | `#bbf7d0` | `#164329` | Success chip border |
| `--color-warn` | `#b91c1c` | `#f87171` | Form validation error text/border |
| `--color-warn-soft` | `#fef2f2` | `#2d1414` | Error banner/field fill |
| `--color-warn-border` | `#fecaca` | `#4c1d1d` | Error field border |

There is no `info` state token. **Not present.**

---

## 3. Color Hierarchy

```
Primary Background (#faf8f4)
        ↓  (near-white paper the whole system sits on)
Surface (#ffffff)
        ↓  (cards and elevated panels lift one step off the page)
Primary Text (#1c1712)
        ↓  (maximum-contrast reading layer — headings, key statements)
Secondary Text (#5a5245)
        ↓  (body copy — present, but visibly one step back from headings)
Muted / Metadata Text (#756c5d)
        ↓  (timestamps, captions — present only when you look for it)
Border (#e8e2d6)
        ↓  (the quiet structural line — visible enough to separate, never to compete)
Accent (#4f46e5)
        ↑  (the one color allowed to interrupt the hierarchy — reserved for exactly one job: "click here" or "this is different")
```

The system's discipline is that **only one color (indigo accent) is allowed to break the neutral hierarchy**, and even that one is capped by convention: `.ds-overline-accent`'s own code comment states it is "used on one label per viewport." Coral is a second, even more restricted accent — confined to data points and single illustrative highlights, never body text (documented in-code as 2.9:1 contrast on white, i.e. explicitly decorative-only).

---

## 4. Color Accessibility

Computed using the standard WCAG relative-luminance formula against the actual token pairs. Ratios not already stated in-code are marked **Computed**; ratios with an existing code comment are marked **Source-documented**.

| Foreground | Background | Contrast | WCAG | Confidence |
|---|---|---:|---|---|
| `--color-fg` `#1c1712` | `--color-bg` `#faf8f4` (light) | 16.8:1 | AAA | Computed |
| `--color-fg-muted` `#5a5245` | `--color-bg` `#faf8f4` (light) | 7.3:1 | AAA (normal text) | Computed |
| `--color-fg-subtle` `#756c5d` | `--color-bg` `#faf8f4` (light) | 5.4:1 | AA | Source-documented (`globals.css:35-36`) |
| `--color-accent` `#4f46e5` | `--color-bg` `#faf8f4` (light) | 5.9:1 | AA | Computed |
| `--color-accent-fg` `#ffffff` | `--color-accent-deep` `#3730a3` (light button fill) | 9.9:1 | AAA | Computed |
| `--color-fg` `#f5f1e8` | `--color-bg` `#14110d` (dark) | 16.7:1 | AAA | Computed |
| `--color-fg-muted` `#b3a996` | `--color-bg` `#14110d` (dark) | 8.1:1 | AAA (normal text) | Computed |
| `--color-fg-subtle` `#948a76` | `--color-bg` `#14110d` (dark) | 5.3:1 | AA | Source-documented (`globals.css:73-74`) |
| `--color-accent` `#8b83ff` | `--color-bg` `#14110d` (dark) | 6.1:1 | AA | Computed |
| `--color-accent-fg` `#ffffff` | `--color-accent-deep` `#5b52e8` (dark button fill) | ~4.7:1 | AA | Source-documented (`globals.css:100-104` — the code explicitly notes the light-theme accent step "drops white-on-it to 4.18:1 and fails AA," and caps the dark hover step at 4.72:1 for this reason) |
| `--color-warn` `#b91c1c` | `--color-warn-soft` `#fef2f2` | 6.1:1 | AAA | Source-documented (`globals.css:56-63`) |
| `--color-coral` `#e8542e` | `#ffffff` | 2.9:1 | **Fails AA** | Source-documented — this is *why* the code restricts coral to decorative/data-point use and never body text |
| `--color-panel-dim` `#948a76` | `--color-panel` `#14110d` | 5.3:1 | AA | Source-documented (`globals.css:73-75`) |

**Accessibility improvement recommendation (not a change made to the portfolio):** coral fails AA as a text color by design and is already restricted correctly. The one genuine gap is that there is no `info` state token — if a neutral informational banner is ever needed (distinct from success/warning), it currently has nothing to reach for and would likely reuse `--color-accent-soft`, which is untested for that specific role.

---

## 5. Typography System

### Font source

**Exact**, `src/app/layout.tsx:2,24-29`:
```ts
import { Bricolage_Grotesque } from "next/font/google";
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});
```
- **Source:** Google Fonts, loaded via `next/font/google` (self-hosted at build time by Next.js — not a runtime Google Fonts CDN request).
- **Variable font:** yes — optical-size axis (`opsz`) is explicitly loaded, meaning the font redraws its letterforms for the size it's rendered at, not just scaling one fixed drawing.
- **Weight range:** 200–800 (continuous, variable), used throughout via arbitrary `font-weight` values like `780`, `750`, `700`, `650`, `600`, `550` — not the fixed 100/200/.../900 steps a static font would offer.
- **Fallback stack:** `ui-sans-serif, system-ui, sans-serif` (`globals.css:135-141`).

### Font roles — **there is exactly one role**

```
--font-sans:    Bricolage Grotesque
--font-body:    Bricolage Grotesque
--font-display: Bricolage Grotesque
--font-mono:    Bricolage Grotesque   ← intentionally remapped, not a real monospace
```
(**Exact**, `globals.css:135-141`, with its own comment: "anything that used to reach for a separate mono face for 'data' styling ... uses Bricolage too, leaning on tabular-nums and weight instead of a second family.")

This means: **Display font = Body font = UI font = "mono"/data font = Bricolage Grotesque.** Hierarchy is built entirely from weight (200–800), size, and `tabular-nums` alignment — never a second typeface. This is a firm, explicit rule in the codebase, confirmed by the fact that the one place the rule bends is a generated image asset that can't run the variable font (see §18, Design Inconsistencies).

### Typography scale

All from `globals.css:284-379`. Sizes use `clamp()` where responsive — the actual clamp expression is recorded, not converted to a fixed value.

| Class | Font | Weight | Size (clamp / fixed) | Line-height | Letter-spacing |
|---|---|---:|---|---:|---:|
| `.display` | Bricolage | 780 | `clamp(2.25rem, 3.8vw, 3.75rem)` | 1.0 | −0.035em |
| `.ds-h1` | Bricolage | 750 | `clamp(2.125rem, 4.4vw, 3.5rem)` | 1.02 | −0.028em |
| `.ds-h2` | Bricolage | 700 | `clamp(1.75rem, 3.2vw, 2.5rem)` | 1.08 | −0.022em |
| `.ds-h3` | Bricolage | 650 | `clamp(1.375rem, 2.5vw, 1.625rem)` | 1.2 | −0.015em |
| `.ds-title` | Bricolage | 600 | 1.0625rem (17px, fixed) | 1.35 | −0.01em |
| `.ds-title-sm` | Bricolage | 600 | 0.9375rem (15px, fixed) | 1.4 | −0.005em |
| `.ds-lede` | Bricolage (body weight) | 400 (inherited) | 1.125rem (18px) | 1.7 | normal |
| `.ds-body-lg` / `.body-large` | Bricolage | 400 | 1.125rem (18px) | 1.65 | normal |
| `.ds-body` (browser default via `body{}`) | Bricolage | 400 | 1rem (16px) | 1.55 | normal |
| `.ds-body-sm` | Bricolage | 400 | 0.875rem (14px) | 1.5 | normal |
| `.ds-meta` (caption/metadata) | Bricolage | 550 | 0.8125rem (13px) | default | 0 |
| `.ds-overline` | Bricolage | 650 | 0.75rem (12px) | default | +0.1em, uppercase |
| `.ds-overline-accent` | Bricolage | 650 | 0.75rem (12px) | default | +0.12em, uppercase |
| Button (`.ds-btn`) | Bricolage | 600 | 0.9375rem (15px) | 1.0 | normal |
| Navigation link | Bricolage | 500 (`font-medium`, Tailwind utility) | 0.875rem (14px) | default | normal (`tracking-wide` utility applied) |
| Wordmark | Bricolage | 600 (`font-semibold`) | 1rem (16px) | none | −0.01em |
| Badge/chip (`.ds-chip`) | Bricolage | 550 | 0.8125rem (13px) | default | normal |

There is no separate "Display / Brand Font vs Body Font" split table to fill — see above, they are the same family, distinguished only by weight and size.

### Font weight system

| Weight | Named steps used in code | Typical role |
|---:|---|---|
| 780 | `.display` | Hero headline — the single heaviest weight on the site, reserved for the homepage's biggest statement |
| 750 | `.ds-h1` | Page-level H1 |
| 700 | `.ds-h2` | Section headings |
| 650 | `.ds-h3`, `.ds-overline`, `.ds-overline-accent` | Sub-section headings and the uppercase label device |
| 600 | `.ds-title`, `.ds-title-sm`, buttons, wordmark | Card/ledger titles, all buttons, brand name |
| 550 | `.ds-meta`, `.ds-chip`, `.ds-link` | Metadata, chips, inline text links |
| 500 | Navigation links (Tailwind `font-medium`) | Nav item labels |
| 400 (default/unset) | Body copy, `.ds-lede`, `.ds-body*` | All reading text |

**Hero headline weight:** 780 (heaviest on the site).
**H2 weight:** 700.
**Body weight:** 400 (never bolded for emphasis in body copy anywhere reviewed).
**Button weight:** 600.
**Navigation weight:** 500.
**Metadata weight:** 550.

### Typography rules

- **Bricolage is used for everything** — there is no "when to switch fonts" decision to make.
- **Bold/heavy weights (650–780)** are reserved for headings and the uppercase overline device — never for emphasis inside a body paragraph (no `<strong>`/bold-body usage found in the components reviewed).
- **Medium weight (500–600)** carries UI chrome: buttons, nav, chips, card titles — the "this is interactive or structural" signal.
- **Uppercase + letter-spacing** is deliberately restricted to exactly two classes (`.ds-overline`, `.ds-overline-accent`) — **Inferred rule**: uppercase tracking is a single, consistent "section label" device, not a general-purpose emphasis tool.
- **Muted text (`--color-fg-muted` / `--color-fg-subtle`)** is used for anything secondary: descriptions, metadata, timestamps — never for a heading.
- **Maximum line length:** `.ds-lede` and `PageHeader` lede/intro paragraphs are capped at `max-w-2xl`/`max-w-3xl` (Tailwind, ≈42–48ch at typical body size) — **Inferred** from consistent `max-w-*` usage rather than a single named "measure" token.
- **Heading line length:** H1/H2 elements are frequently wrapped in `max-w-[15ch]`–`max-w-2xl` containers (e.g. hero `h1` at `max-w-[15ch]`, `PageHeader` at `max-w-2xl`/`max-w-3xl`) — **Inferred**, consistent pattern, no single named token.

---

## 6. Spacing System

**Exact**, `globals.css:192-206` — an 8px base scale exposed as Tailwind tokens via `@theme inline`:

| Token | Value | Typical usage |
|---|---:|---|
| `--space-1` | 4px | Icon-to-label gaps, tight inline spacing |
| `--space-2` | 8px | Chip padding, small gaps |
| `--space-4` | 16px | Component-internal padding |
| `--space-6` | 24px | Card padding, standard gaps |
| `--space-8` | 32px | Larger component gaps |
| `--space-10` | 40px | Sub-section spacing |
| `--space-12` | 48px | Section-internal rhythm |
| `--space-16` | 64px | Large gaps between major blocks |
| `--space-20` | 80px | Mobile section padding (`--spacing-section-mobile`) |
| `--space-24` | 96px | Large-scale spacing |
| `--space-30` | 120px | Desktop section padding (`--spacing-section`) |

**Section rhythm** (the site's real spacing "heartbeat"): every `<Section>` component uses `padding-top/bottom: var(--spacing-section)` = **120px desktop**, dropping to **80px** under 768px (`globals.css:524-533`). This single rule governs the vertical rhythm of every page on the site — there is no per-section custom spacing override found in the components reviewed.

---

## 7. Layout System

**Container** (**Exact**, `globals.css:508-521`):
```
.ds-container {
  max-width: 1320px;
  padding: 0 24px;        /* base */
  padding: 0 48px;        /* ≥768px */
  padding: 0 80px;        /* ≥1280px */
}
```

**Breakpoints:** Tailwind v4 defaults — `sm 640px / md 768px / lg 1024px / xl 1280px / 2xl 1536px`. **Inferred/confirmed**: no `@theme` override of breakpoint values exists in `globals.css`, and the container's own media queries land exactly on Tailwind's `md` (768px) and `xl` (1280px) steps, confirming the defaults are what's actually in effect.

**Grid:** there is **no fixed 12-column grid system** as a named token. Individual components use ad-hoc Tailwind grid arrangements (e.g. `lg:grid-cols-12` appears in `PageHeader` and `CtaBand` specifically for their own two-column layouts, not as a site-wide 12-col convention). **Not present** as a formal system — do not assume a strict 12-column grid exists site-wide; it's used situationally in exactly those two components.

**Desktop / Tablet / Mobile summary:**
- **Desktop (≥1280px):** 80px container gutters, full multi-column component grids active (e.g. `md:grid-cols-4` offer grid, `lg:grid-cols-3` proof grid), 120px section padding.
- **Tablet (768–1279px):** 48px container gutters, most grids collapse from 3–4 columns to 2, section padding still 120px (the mobile step only triggers under 768px).
- **Mobile (<768px):** 24px container gutters, virtually all multi-column grids collapse to a single column, section padding drops to 80px, nav collapses to the animated mobile panel.

---

## 8. Border Radius System

**Exact**, `globals.css:207-221`:

| Token | Value | Usage |
|---|---:|---|
| `--radius-sm` | 10px | Form fields (`.ds-field`) |
| `--radius-control` | 10px | Combobox/select control (explicitly aliased to `--radius-sm`, same "form control" family) |
| `--radius-md` | 12px | Buttons (`.ds-btn`) |
| `--radius-lg` | 16px | Defined but not observed applied to a named component class in the files reviewed — available for one-off use |
| `--radius-card` | 18px | Cards (`.ds-card`), the brand-mark tile, project "Plate" containers |
| `999px` (not a named token, literal value) | Pill radius | Chips (`.ds-chip`), the availability-badge pill, avatar/status dots |

There is no separate documented radius for "modals" or "images" as distinct tokens — images use either the card radius (`--radius-card`, when framed) or no radius (full-bleed). **Not present** as separate named tokens; inferred from actual usage that images inherit whichever container radius they sit inside.

---

## 9. Border System

- **Default border color:** `--color-border` (`#e8e2d6` light / `#322b20` dark) — used everywhere: card edges, dividers, dropdown panels, input borders' resting state is actually `--color-border-strong` (see below).
- **Subtle border:** `--color-border-subtle` — used for barely-visible separators (`.ds-card-tags`/soft-band internal dividers).
- **Input border:** `--color-border-strong` (aliased to `--c-fg-subtle`) — form fields deliberately use a *stronger* border than the site's default hairline, since a field's boundary needs to be findable at a glance.
- **Interactive/hover border:** buttons and cards shift to `--color-fg-subtle` or `--color-accent` on hover/focus (`.ds-card-interactive:hover` → `--color-fg-softest`; `.ds-field:focus` → `--color-accent` + a 2px accent-soft ring).
- **Divider:** `.ds-hairline` — a bare 1px `--color-border` line with no border-radius or shadow, used as a standalone rule between blocks.
- **Width:** every border in the system reviewed is **1px** — no 2px/3px structural borders found, except decorative accent left-borders on pull-quotes/`Definition` blocks, which use `border-l-[3px]` specifically as a callout device, not a structural border.
- **Style:** solid throughout — no dashed/dotted borders found anywhere in the system.

---

## 10. Shadow System

**Exact**, `globals.css:79-80` (light) and `127-128` (dark):

| Name | Light value | Dark value | Usage |
|---|---|---|---|
| `--shadow-card` | `0 1px 2px rgba(28,23,18,.03), 0 2px 8px rgba(28,23,18,.04)` | `0 1px 2px rgba(0,0,0,.2), 0 4px 12px rgba(0,0,0,.25)` | Resting card shadow, primary button resting shadow |
| `--shadow-card-hover` | `0 1px 3px rgba(28,23,18,.04), 0 4px 12px rgba(28,23,18,.05)` | `0 2px 4px rgba(0,0,0,.25), 0 8px 20px rgba(0,0,0,.3)` | Card/button hover lift |

Additional one-off shadows found inline in components (**Exact**, cited per use):
- Scrolled nav bar: `0 6px 20px -12px rgba(28,23,18,0.25)` (`nav.tsx:112`)
- Services dropdown panel: `0 12px 32px -12px rgba(28,23,18,0.25)` (`nav.tsx:166`)
- Hero terminal panel: `0 30px 60px -30px rgba(0,0,0,0.45)` (`hero.tsx:17`) — the single largest shadow in the system, reserved for the one "floating object" the design allows
- Brand-mark tile: `0 6px 16px -8px var(--color-accent-deep)` — a colored shadow, tinted to the brand accent rather than neutral black

**The design relies primarily on borders and surface contrast, not shadows.** The code's own comment calls this out directly: card shadows are "genuinely restrained: a soft, close, low-opacity lift, not a floating-panel drop shadow." Only two elements in the whole system get a heavier shadow treatment: the hero terminal panel and dropdown/scrolled-nav overlays — both are literally floating above other content, which is exactly when the system allows a heavier shadow.

---

## 11. Gradient System

There is **no decorative multi-color gradient anywhere in this system.** Every gradient found is single-hue (indigo) or a two-tone indigo/coral soft-mesh, always low-opacity:

| Gradient | Colors | Direction | Opacity | Location | Purpose |
|---|---|---|---|---|---|
| Brand-mark tile | `--color-accent → --color-accent-deep` | Vertical (top→bottom) | 100% (solid gradient, not transparent) | `BrandMark`, favicon (`icon.tsx`), OG image, wordmark logo | The one "designed object" gradient — a confident, premium tile treatment |
| Ambient page glow | `--color-glow` (10–14% opacity accent) → transparent | Radial, positioned top-right | 10–14% | Hero, `PageHeader`, body background | Quiet depth without a hard-edged shape |
| `tone-deep` band glow | Same `--color-glow` | Radial, bottom-center | 10–14% | Inverted indigo section bands | Keeps the deep band from being a flat solid fill |
| Cursor-follow glow | `--color-glow` | Radial (circular, follows pointer) | 0→100% on reveal, same 10–14% base | `GridOverlay`, hero + page headers | Interactive depth cue |
| Page-header top wash | `--color-accent-line` at 50% → transparent | Linear, top edge | ~50% of an already-soft tint | `PageHeader` | Softens the top edge of inner-page headers |
| Insight cover / cluster art | `--color-accent-soft` + `--color-coral-soft` (blurred circles, not a linear/radial CSS gradient) | Positioned per-slug hash | 10–14% each | Generated "cover art" for articles with no photography | Honest placeholder imagery, see §12 |

**Rule, inferred from the consistency above:** gradients are for atmosphere (glow, depth, generated art), never for headline text, buttons, or large content fills. The one gradient that IS a solid fill (the brand-mark tile) is reserved exclusively for the logo mark.

---

## 12. Background System

```
Page background            --color-bg      (warm paper / near-black)
        ↓
Section band (soft tone)   --color-surface (white / dark-brown-black, one step up)
        ↓
Card / elevated surface    --color-surface (same token — cards use a border+shadow to read as elevated, not a different fill)
        ↓
Inverted band (deep tone)  --color-deep    (full indigo fill, white text)
        ↓
Terminal/data panel        --color-panel   (fixed dark in both themes — deliberately NOT theme-responsive)
```

**Hierarchy rule (Exact, code comment in `globals.css`):** "Fill still inverts against the band behind it (surface on a plain band, bg on a soft band) so a card can't land the same colour as what it sits on." This is a deliberate anti-collision rule, not an accident — Section components alternate `tone-plain`/`tone-soft` specifically so a card's `--color-surface` fill never matches its parent section's fill.

---

## 13. Component Design System

### Header / Nav (`nav.tsx`)

- **Height:** `h-17` (68px, Tailwind arbitrary value).
- **Typography:** wordmark `1.0625rem`/600 weight; nav links `0.875rem`/500 weight, `tracking-wide`.
- **Logo:** `BrandMark` (36px, `h-9 w-9`) + short name text, collapses to "W." on mobile.
- **Active state:** a `2px`-equivalent (`h-px` with `scale-x` transform) accent underline that scales in from 0, plus a text-color shift from `--color-fg-muted` to `--color-fg`.
- **Scroll state:** transparent + `-translate-y-1.5` at rest, becomes `bg-surface` + `backdrop-blur-md` + a soft shadow + hairline border past a 4px scroll threshold — a CSS transition tied to a boolean state change, not a mount animation.
- **CTA:** solid accent pill button, `Start a project`, visible ≥`sm` breakpoint.
- **Mobile behavior:** links collapse into a `grid-template-rows: 0fr → 1fr` animated panel (not `max-height`, which the code deliberately avoids for animate-to-auto-height reasons); Escape key and outside-click both close open panels.

### Buttons (`.ds-btn` family, `globals.css:396-449`)

| Variant | Background | Text | Border | Hover |
|---|---|---|---|---|
| Primary | `--color-accent-deep` | `--color-accent-fg` (white) | none | `--color-accent-deep-hover` fill + `scale(1.02)` + `--shadow-card-hover` |
| Secondary | `--color-surface` | `--color-fg` | 1px `--color-border` | border → `--color-fg-subtle`, fill → `--color-surface-hover` |
| Ghost | transparent | `--color-fg-muted` | none | text → `--color-fg` |

- **Size:** `padding: 0.875rem 1.75rem` (14px/28px), `font-size: 0.9375rem` (15px), `font-weight: 600`, `border-radius: var(--radius-md)` (12px).
- **Active:** `scale(0.98)` on `:active`.
- **Disabled:** `opacity: 0.5`, `cursor: not-allowed`.
- **Focus:** global `:focus-visible` rule — `2px solid --color-accent`, `2px` offset (inverts to white outline on the `tone-deep` band, since indigo-on-indigo would vanish at ~2.3:1).
- **Icon button:** not a distinct class — icon-only circular buttons (search trigger, theme toggle, mobile menu trigger) are all built ad hoc as `h-10 w-10`/`h-11 w-11` circles with a `border-border` ring, not a shared `.ds-icon-btn` component. **Inferred pattern**, not a named token.

### Cards (`.ds-card`, `globals.css:482-505`)

- **Background:** `--color-surface`.
- **Border:** 1px `--color-border`.
- **Radius:** `--radius-card` (18px).
- **Shadow:** `--shadow-card` at rest, `--shadow-card-hover` + `border-color: --color-fg-softest` + `translateY(-2px)` on hover (only when `.ds-card-interactive` is also applied).
- **Typography inside:** no fixed rule — cards compose `.ds-title`/`.ds-body-sm`/`.ds-meta` as needed.
- **Variant:** `.ds-card-tags` — accent-soft fill + accent-hairline border, used specifically for cards that are mostly a set of chips/tags.

### Badges / Chips (`.ds-chip` family, `globals.css:452-474`)

- **Radius:** `999px` (full pill).
- **Padding:** `0.375rem 0.875rem` (6px/14px).
- **Typography:** `0.8125rem` (13px), weight 550.
- **Default:** `--color-surface` fill, 1px `--color-border`, `--color-fg-muted` text.
- **Accent variant:** `--color-accent-soft` fill, `--color-accent-hairline` border, `--color-accent` text.
- **Success variant:** `--color-success-soft` fill, `--color-success-border` border, `--color-success` text.

### Forms (`.ds-field`, `globals.css:630-653`)

- **Border:** 1px `--color-border-strong` (a deliberately stronger default than the site's usual hairline).
- **Radius:** `--radius-sm` (10px).
- **Padding:** `0.75rem 1rem`.
- **Focus:** border → `--color-accent`, plus a `0 0 0 2px --color-accent-soft` ring (not a native browser outline).
- **Placeholder:** `--color-fg-subtle`.
- **Invalid state:** `.ds-field-invalid` → border becomes `--color-warn`.
- **Label:** not a dedicated class found in `ui.tsx`/`globals.css` for form labels specifically — likely composed from `.ds-meta` at each call site. **Inferred**, not confirmed as a named token.

### Links (`.ds-link`, `globals.css:382-393`)

- **Default:** `--color-fg`, weight 550, no underline, `inline-flex` (so an icon can sit inline with the label).
- **Hover:** color → `--color-accent`, 0.15s ease-out transition.
- **No distinct visited state** — **Not present**, consistent with a portfolio site having no need for one.
- **Underline behavior:** links generally do **not** underline by default; underline appears only on a few explicit call sites (e.g. the header "View all" text links use `hover:underline` as a Tailwind utility, not part of `.ds-link` itself).

### Section heading (`SectionHeading`, `ui.tsx:50-97`)

The recurring "how a section opens" pattern: `.ds-overline` label → heading (`.ds-h1`/`.ds-h2`/`.ds-h3` depending on `level`/`size` props) → optional `.ds-lede` description, wrapped in a `Reveal` for entrance animation. This is the single most-reused compositional pattern in the codebase.

### Brand mark & wordmark (`ui.tsx:313-374`)

- **Mark:** a single continuous SVG path forming a "WA" ligature (`M8 27 L11 12.5 14.6 20.5 20 8.5 25.4 20.5 29 12.5 32 27`), stroked at `2.5px`, round caps/joins, on a rounded (`10px`) vertical indigo-gradient tile with an inset white ring (`ring-1 ring-inset ring-white/15`) and a tinted accent shadow.
- **Wordmark:** full legal name "Wahab Ansari" (not a first name only) — the code's own comment states this is deliberate for entity consistency across the site, résumé, LinkedIn, and Person structured data.
- **This exact mark is reused, byte-for-byte, in:** the header logo, the favicon (`icon.tsx`), the Open Graph card (`opengraph-image.tsx`), and (implicitly) wherever `<Wordmark>` is rendered — one visual asset, four surfaces.

---

## 14. Icon System

**Exact**, `ui.tsx:99-311`. There is no external icon library (no `lucide-react`, `heroicons`, `react-icons`, etc. in `package.json`) — **every icon is a hand-authored inline SVG component.**

- **Style:** two families exist side by side:
  1. **Solid-fill glyphs** (`ArrowIcon`, `ExternalIcon`, `DownloadIcon`, `CheckIcon`, `MinusIcon`, `GithubIcon`, `LinkedinIcon`) — `fill="currentColor"`, no stroke.
  2. **Stroke-outline glyphs**, Feather-icon-like geometry (`SearchIcon`, `ChevronDownIcon`, `UserIcon`, `FileCheckIcon`, `GaugeIcon`, `CodeIcon`, `MailIcon`, `LayersIcon`, `LayoutIcon`, `RefreshIcon`, `SparklesIcon`, `ServerIcon`, `RocketIcon`, `BriefcaseIcon`, `UsersIcon`, `CompassIcon`) — `fill="none"`, `stroke="currentColor"`, `stroke-width="2"`, round caps/joins.
- **Size:** default `16×16` for most content icons; `15×15` (ExternalIcon), `17×17` (GithubIcon), `18×18` (SearchIcon, theme-toggle icons) — small, deliberate variation, not a strict single size.
- **Color:** always `currentColor` — icons inherit whatever text color their container sets, never a hardcoded fill.
- **Button integration:** icons sit inline with text via `inline-flex items-center gap-*` on the parent, or inside a circular `border-border` tile for icon-only buttons (search, theme toggle).
- **Stroke width:** exactly `2` for every stroke-based icon — no variation found.

**Do not introduce a new icon style.** If new icons are needed for LinkedIn assets, match this geometry: 16px, 2px stroke, round caps, `currentColor`.

---

## 15. Image / Visual-Proof Style

This is the most unusual and most important part of the system to carry over correctly: **the portfolio contains no photography of client products, and is honest about it.**

From `plate.tsx` (**Exact**, with its own governing comment):
> "These are deliberately schematic wireframes, not screenshots and not pretending to be. Rendering a fake screenshot of a real client's product would be a claim about what that product looks like, and I have no right to make one."

- **Aspect ratio:** `16:10` for project plates (`aspect-[16/10]`).
- **Treatment when a real screenshot exists:** `next/image`, `object-cover`, no border/radius override beyond the container's.
- **Treatment when no screenshot exists (the default):** a browser-chrome header (three dots + a domain-name pill showing the *real* domain — "the one factual thing on the plate") over a schematic wireframe whose shape (sidebar+table, hero+3-up, nav+stat-row, etc.) matches the actual product's layout archetype, built entirely from flat `--color-border`/`--color-surface`/`accent/70` rectangles — no icons, no fake UI chrome beyond the browser bar.
- **Insights "cover art"** (`insights.tsx`, `InsightCover`): for articles with no photography, two blurred (`blur-3xl`) circles in `--color-accent-soft`/`--color-coral-soft`, positioned by a deterministic hash of the article's slug over a `.ds-grid-lines` background — same article always renders the same cover, no photography required.
- **Corner radius:** inherits the container's radius (`--radius-card` when framed as a card, none when full-bleed).
- **Hover behavior:** a subtle `scale(1.01–1.02)` on the image/plate when its parent card is hovered — never a filter/color shift.

**For LinkedIn:** the one place this system needs an actual photograph is the profile picture (a person, not a product) — see `LINKEDIN-BRAND-GUIDELINES.md` §3 for how to keep that consistent with a system that otherwise uses zero photography.

---

## 16. Motion System

**Exact**, `motion.tsx` and `grid-overlay.tsx`. **There is no animation library** (no `framer-motion`/`motion` package in `package.json` — an earlier version of this codebase used one and it was deliberately removed; the comment in `motion.tsx` states this explicitly: "This replaced a `motion/react` implementation... shipping a general animation runtime to every page to express [a 14px rise and a fade] was the wrong trade for a site whose performance budget is part of the pitch.")

- **Entrance animation (`Reveal`):** `IntersectionObserver`-driven. Elements start at `opacity: 0, transform: translateY(14px)` and settle to `opacity: 1, translateY(0)` on scroll-into-view, once only (observer disconnects after firing). Transition: `opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)`.
- **Stagger:** manual, via a `delay` prop (seconds) applied as an inline `transitionDelay` — call sites commonly step delays by `0.04–0.05s` per list item.
- **Page transition:** a CSS keyframe fade only (no transform — a prior version's `translateY` rise on the page wrapper broke `position: fixed` header behavior across every route; documented in-code as a diagnosed, fixed bug), `0.36s ease-out`.
- **Header motion:** a Tailwind `translate-y`/background transition tied to a scroll-position boolean, `duration-300 ease-out` — not a mount animation.
- **Hover animation:** buttons scale `1.02` (primary) on hover, `0.98` on active; cards lift `translateY(-2px)` with a shadow transition, `0.2s ease`; images/plates scale `1.01–1.02` inside their hovered card, `0.5s ease-out`.
- **Cursor-follow glow (`GridOverlay`):** position written directly to a `transform` style on `mousemove`, with a CSS `transition: transform, opacity 0.5s ease-out` doing the trailing smoothness — no `requestAnimationFrame` loop, no React re-renders.
- **Background grid "breathing":** an 8s `ease-in-out infinite` opacity keyframe (`grid-breathe`, 100%→72%→100%) on the hero's grid-line background.
- **Reduced motion:** **fully supported**, at three separate levels — `globals.css:591-593` (grid breathing off), `globals.css:675-682`/`760-768` (a blanket rule collapsing all animation/transition durations to `0.01ms`), and `motion.tsx`'s reveal CSS (`globals.css:675-682`, pending elements forced fully visible with no transition). This is a genuinely thorough implementation, not a token gesture.

---

## 17. Responsive Design Behavior

| | Desktop (≥1280px) | Tablet (768–1279px) | Mobile (<768px) |
|---|---|---|---|
| **Container gutter** | 80px | 48px | 24px |
| **Section padding** | 120px | 120px | 80px |
| **Typography** | Top of each `clamp()` range | Mid-range (viewport-width-driven) | Bottom of each `clamp()` range |
| **Multi-column grids** | Full column count (e.g. 4-up offers, 3-up proof) | Usually halved (2-up) | Single column |
| **Navigation** | Full inline links + CTA + search + theme toggle | Same as desktop down to `md` | Collapses to hamburger + animated panel; CTA moves inside the panel |
| **Hero** | Two-column (text + terminal panel) | Two-column down to `lg`, then… | Single column, terminal panel drops below the text |
| **Cards/grids** | As designed | Usually 2-column | Always single column, full-width |

---

## 18. Visual Hierarchy

Derived from actual homepage composition order (`hero.tsx`, `proof.tsx`, `work.tsx`, `services.tsx`):

```
1. Availability badge (small, top of hero — a trust/status signal, not a headline)
2. Hero headline (.display, 780 weight — the single loudest element on the site)
3. Supporting statement (.body-large, muted)
4. Primary CTA ("Start a project") + secondary CTA ("View my work")
5. Terminal panel (visual proof of technical identity, sits beside the text on desktop)
6. Proof strip (verified metric + stack — quantitative trust signal)
7. Section heading pattern (.ds-overline → .ds-h2 → .ds-lede) — repeats for every section
8. Content grids (offers / proof panels / capabilities) — always non-card, non-list per this codebase's established convention (see the "Design Inconsistencies" note in §19 about when cards ARE still used)
9. Metadata (numerals, chips, timestamps) — present but always visually subordinate
```

---

## 19. Brand Voice ↔ Visual Connection

**Why the palette works:** a warm paper base (not the cooler grey most "tech portfolio" sites default to) reads as considered rather than templated, and gives the one indigo accent somewhere to actually stand out — on a cool-grey base, indigo would compete with the background's own undertone.

**Dominant visual tone:** editorial-technical. The numeral-led section openers and tabular-nums discipline borrow from data/engineering visual language; the generous whitespace, restrained single accent, and warm paper base borrow from editorial print design. Neither reads as "generic SaaS landing page."

**What creates premium perception:** real bordered-and-shadowed cards (not flat fills), a hand-cut brand mark instead of a generated/stock logo, disciplined restraint on the accent color (used enough to guide the eye, never enough to look promotional), and the explicit refusal to fabricate screenshots.

**What creates technical perception:** the terminal panel rendering real facts as system output, tabular-nums numerals throughout, the single-typeface-does-everything discipline (a genuinely engineering-minded constraint — most sites reach for a mono font here and this one deliberately didn't), and schematic wireframes that read as "diagrams," not marketing images.

**What creates hierarchy:** weight and size on one typeface (never a second font), one accent color used sparingly, and a strict background-elevation ladder (bg → surface → deep) that never lets two adjacent surfaces share a fill.

**What should remain consistent across LinkedIn:** the warm paper base, the single indigo accent (never introduce a second accent hue), Bricolage Grotesque as the only typeface, the numeral/weight-driven hierarchy instead of icon-heavy decoration, and the brand mark used exactly as drawn.

**What should be avoided:** any second display or "code" font (even for a LinkedIn post about code), multi-color gradients, drop-shadow-heavy card treatments, stock photography or generic icon packs that don't match the hand-drawn stroke geometry in §14, and any use of coral as a large fill or as body text.

---

## 20. Design Tokens (machine-readable)

```
COLORS (light theme values shown; see globals.css for dark-theme pairs)
--color-bg:             #faf8f4
--color-surface:        #ffffff
--color-surface-hover:  #f3efe7
--color-border:         #e8e2d6
--color-border-subtle:  #f0ebe1
--color-fg:             #1c1712
--color-fg-muted:       #5a5245
--color-fg-subtle:      #756c5d
--color-fg-softest:     #ded6c7
--color-accent:         #4f46e5
--color-accent-hover:   #4338ca
--color-accent-deep:    #3730a3
--color-accent-deep-hover: #312e81
--color-accent-soft:    rgba(79,70,229,0.1)
--color-accent-fg:      #ffffff
--color-accent-hairline: #c7c2f9
--color-coral:          #e8542e
--color-coral-soft:     rgba(232,84,46,0.1)
--color-success:        #15803d
--color-warn:           #b91c1c
--color-deep:           #211a6e
--color-deep-text:      #ffffff
--color-panel:          #14110d
--color-panel-text:     #f5f1e8

TYPOGRAPHY
--font-display: "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif
--font-body:    "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif
--font-ui:      "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif  (same family — no separate UI font exists)
--font-mono:    "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif  (intentionally not a real mono font)

SPACING (8px base)
--space-xs:  4px
--space-sm:  8px
--space-md:  16px
--space-lg:  24px
--space-xl:  32px
--space-2xl: 48px
--space-3xl: 64px
--spacing-section:        120px (desktop)
--spacing-section-mobile: 80px

RADIUS
--radius-sm:   10px
--radius-md:   12px
--radius-lg:   16px
--radius-card: 18px
--radius-pill: 999px  (literal value, not a named CSS var in source)

SHADOW
--shadow-card:       0 1px 2px rgba(28,23,18,.03), 0 2px 8px rgba(28,23,18,.04)
--shadow-card-hover: 0 1px 3px rgba(28,23,18,.04), 0 4px 12px rgba(28,23,18,.05)
```

---

## 21. Final Report

### Exact extracted values
Every color, typography, spacing, radius, shadow, container, and component style documented above with a file citation is taken directly from source — no invention. Source files: `src/app/globals.css`, `src/app/layout.tsx`, `src/app/icon.tsx`, `src/app/opengraph-image.tsx`, `src/components/ui.tsx`, `src/components/nav.tsx`, `src/components/hero.tsx`, `src/components/motion.tsx`, `src/components/grid-overlay.tsx`, `src/components/plate.tsx`, `src/components/theme-toggle.tsx`, `src/content/en/site.ts`, `package.json`.

### Inferred values
- The 12ch/measure-style "maximum line length" rules (no single named token, extrapolated from consistent `max-w-*` usage).
- The icon-button pattern (circular, `border-border`, no shared class name).
- Form label styling (likely `.ds-meta` at each call site — no dedicated class found).
- `--color-accent-line` vs `--color-accent-hairline` being functionally interchangeable (same values, kept as separate tokens in source).

### Missing / unavailable values
- No `info` state color token.
- No named "modal" radius/shadow (no modal component found in the reviewed files).
- No dedicated icon-button component class.
- No 12-column grid as a site-wide named system (only used ad hoc in two components).

### Existing design strengths
- A genuinely disciplined single-typeface, single-accent system enforced by explicit code comments, not just convention.
- Reduced-motion support implemented at three separate levels, not a token gesture.
- An honest, stated refusal to fabricate product screenshots — a real, defensible brand position, not just a technical shortcut.
- Accessibility contrast values are largely already documented in-code with the reasoning behind specific color choices (e.g. why `accent-deep` exists as a separate token from `accent`).
- The brand mark is one SVG asset reused identically across header, favicon, and OG image — no drift between surfaces.

### Design inconsistencies discovered
- **The Open Graph image (`opengraph-image.tsx`) uses Roboto, not Bricolage Grotesque** — the one place the "one typeface everywhere" rule doesn't hold. This is almost certainly a pragmatic constraint (Next's `ImageResponse`/Satori renderer needs a font's actual binary data supplied, and doing that reliably for a variable font with a custom optical-size axis is meaningfully harder than fetching a static Google Font at request time) rather than an intentional design choice — worth knowing about, not necessarily worth "fixing" unless OG-card font accuracy matters to you.
- `--color-accent-line` and `--color-accent-hairline` carry identical values in both themes and are used somewhat interchangeably — not a bug, but worth knowing they're the same color under two names if you're hand-authoring new components.

### Recommended LinkedIn adaptation
See `LINKEDIN-BRAND-GUIDELINES.md` in full. In short: warm paper background, the same indigo accent and brand mark, Bricolage Grotesque (or its closest available substitute — LinkedIn's own composer doesn't support custom fonts, so this applies to banner/carousel graphics, not native text posts), numeral-led hierarchy instead of icon-heavy slide decoration, and a headshot treated with the same restrained, high-contrast, single-accent discipline as the rest of the system.

### Recommended future brand rules
1. If a modal/dialog component is ever added, define its radius and shadow explicitly rather than reaching for `--radius-card`/`--shadow-card-hover` by convention — it may deserve its own step.
2. If an "info" (neutral-informational, distinct from success/warning) UI state is ever needed, define `--color-info`/`--color-info-soft` rather than reusing `--color-accent-soft`, which currently has a different job (interactive tint, not a status color).
3. Keep the OG-image font gap in mind if brand-font accuracy in social previews ever becomes a priority — solving it means shipping actual Bricolage Grotesque font-file bytes to the `ImageResponse` call, which is a real (if small) engineering task, not a config change.

### Files inspected
`package.json` · `src/app/globals.css` · `src/app/layout.tsx` · `src/app/icon.tsx` · `src/app/apple-icon.tsx` · `src/app/opengraph-image.tsx` · `src/components/ui.tsx` · `src/components/nav.tsx` · `src/components/hero.tsx` · `src/components/motion.tsx` · `src/components/grid-overlay.tsx` · `src/components/plate.tsx` · `src/components/theme-toggle.tsx` · `src/components/work.tsx` · `src/components/services.tsx` · `src/components/insights.tsx` · `src/content/en/site.ts`

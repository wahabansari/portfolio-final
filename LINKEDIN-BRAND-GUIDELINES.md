# LinkedIn Brand Guidelines — Muhammad Wahab Ansari

**This is an adaptation, not a new system.** Every value here is carried over from `PORTFOLIO-DESIGN-SYSTEM.md`, which is the source of truth. Where LinkedIn's own platform constraints (native text posts can't use custom fonts or colors; profile pictures must be real photos) force a deviation from the portfolio, that's called out explicitly rather than silently improvised.

**Relationship:** Portfolio (primary system) → LinkedIn (extension) → Banner / Profile photo / Posts / Carousels (applications of the same system).

---

## 0. LinkedIn Quick Reference

### Colors

| Purpose | Color |
|---|---|
| Background | `#faf8f4` (warm paper) |
| Primary Text | `#1c1712` |
| Secondary Text | `#5a5245` |
| Accent | `#4f46e5` (indigo) — button fills / emphasis use `#3730a3` |
| Surface (card-like elements within a graphic) | `#ffffff` |
| Border | `#e8e2d6` |

### Fonts

| Usage | Font | Weight |
|---|---|---|
| Main headline (banner, carousel cover) | Bricolage Grotesque | 750–780 |
| Section heading (carousel content slides) | Bricolage Grotesque | 650–700 |
| Body (carousel/post body text) | Bricolage Grotesque | 400 |
| UI-style labels / eyebrows | Bricolage Grotesque, uppercase, +0.1em tracking | 650 |
| Metadata (page numbers, footer) | Bricolage Grotesque | 550 |

**LinkedIn platform constraint:** native LinkedIn text posts render in LinkedIn's own system font — you cannot set a custom font for post *text* itself. Bricolage Grotesque applies to every *graphic* you upload (banner, carousel PNGs/PDF, image posts) — not to typed post captions.

### Rules

- One accent color only. Never introduce a second accent hue for LinkedIn "to stand out more" — the portfolio's own restraint is the point.
- Coral (`#e8542e`) may appear as a small data-point/highlight inside a graphic, exactly as it's used on the site — never as a large fill, never as body text color.
- No photography anywhere except the profile picture itself. Case-study visuals should use the same schematic/numeral-led treatment as the portfolio, not screenshots or stock imagery.
- Every graphic gets the brand mark (the "WA" tile) somewhere quiet — usually a bottom corner — for consistent attribution across a feed.

---

## 1. LinkedIn Primary Colors

| Token | HEX | Usage | Intensity |
|---|---|---|---|
| **Primary (Background)** | `#faf8f4` | The base of every graphic — banner, carousel slides, image-post backgrounds | 80–90% of any composition |
| **Surface** | `#ffffff` | Card-like blocks inside a graphic (a stat callout, a quote block) | Used sparingly, as a lift off the base |
| **Primary Text** | `#1c1712` | Headlines, names, primary statements | High-frequency — this is the main reading color |
| **Secondary Text** | `#5a5245` | Subtitles, supporting lines, captions | Moderate frequency |
| **Accent** | `#4f46e5` (fills: `#3730a3`) | One headline word, one line/rule, one button-shaped CTA, the brand-mark tile | 10–15% of a composition — enough to guide the eye, never enough to dominate |
| **Border** | `#e8e2d6` | Hairline dividers between sections of a carousel slide, card outlines | Structural, not decorative |

---

## 2. LinkedIn Banner System

### Canvas

**1584 × 396px** (LinkedIn's current banner spec). Design at **2× (3168 × 792px)** and export down, since LinkedIn compresses uploads — starting at native resolution and scaling down avoids visible artifacting on a graphic this wide and short.

### Safe zones

LinkedIn's profile photo sits as a circle overlapping the banner's bottom-left corner, and the exact overlap differs slightly between desktop and mobile. Treat these zones as fixed exclusion areas for anything text-critical:

- **Profile-picture overlap area:** roughly the bottom-left **300×300px** region (at 1584×396 scale) — assume nothing placed here survives visible, on either desktop or mobile.
- **Text-safe area:** keep all headline/subtitle text within the **center-right two-thirds** of the canvas, vertically centered — roughly `x: 420–1520, y: 60–340`.
- **Right-side safe area:** the far-right ~40px can clip slightly on some display densities — don't place a full word or the brand mark flush against the right edge.
- **Mobile crop risk:** LinkedIn's mobile app crops the banner's top and bottom more aggressively than desktop. Keep all text within the **vertical center 60%** of the canvas (roughly `y: 80–320`) so nothing critical gets cut off on a phone.

### Layout

```
LEFT (0–420px)
Reserved / breathing room — this is where the profile picture sits.
Do not place text here. A quiet decorative element (a faint grid-line
texture, matching .ds-grid-lines) can live here at very low opacity.

CENTER–RIGHT (420–1584px)
Headline (top-aligned within the text-safe zone)
        ↓
Subtitle / supporting line
        ↓
Optional: one small brand-mark tile, bottom-right corner, well clear
of the right-edge risk zone
```

- **Alignment:** left-aligned text block, starting at the text-safe zone's left edge (~x:420px) — mirrors the portfolio's own left-aligned hero convention (nothing on the site is center-aligned as a primary heading treatment except section openers, which use `align="center"` situationally, not by default).
- **Maximum text width:** keep the headline to roughly 60% of the available text-safe width so it doesn't crowd the right edge.
- **Decorative elements:** if you want the grid-cadence texture from the hero (`.ds-grid-lines`), apply it at the same very-low opacity the site uses (`rgba` grid lines at ~4–5% alpha) — never a bold decorative grid.
- **Image usage:** none. Consistent with the portfolio's zero-photography rule for anything that isn't a headshot.

### Typography

**Font:** Bricolage Grotesque (or your system's closest available substitute if the exact variable font file isn't accessible in your design tool — Inter or a similar geometric grotesque at a heavier weight is the nearest visual match, but Bricolage should be used whenever the tool supports custom font upload, e.g. Figma, Photoshop, Canva Pro).

**Headline:**
- Font: Bricolage Grotesque
- Weight: 750–780 (match `.display`/`.ds-h1`)
- Size: large enough to read at banner scale — roughly 64–80px at 2× canvas resolution
- Line-height: 1.0–1.05 (tight, matching the site's display type)
- Letter-spacing: −0.03em (tight tracking, matching `.display`)
- Color: `#1c1712`, with **one word or phrase in `#4f46e5`** as the single accent moment — mirrors how the site uses accent color for exactly one emphasized element per view

**Secondary text:**
- Font: Bricolage Grotesque
- Weight: 400–500
- Size: roughly 28–34px at 2× resolution
- Color: `#5a5245`

**Optional microcopy** (a small eyebrow label above the headline, e.g. "REACT & NEXT.JS PRODUCT ENGINEER"):
- Font: Bricolage Grotesque, uppercase
- Size: ~18–20px at 2×
- Letter-spacing: +0.1em (matching `.ds-overline`)
- Color: `#4f46e5` (matching `.ds-overline-accent`)

---

## 3. LinkedIn Profile Picture System

The portfolio uses **zero photography** anywhere else — the profile picture is the one deliberate, necessary exception, since LinkedIn requires a real photo of you. The goal is for the photo to feel like it belongs to this system, not like a separate "professional headshot" style pasted on top.

- **Background:** a solid or near-solid warm-neutral background — ideally matching or closely adjacent to `#faf8f4` (the site's own paper tone) or a clean neutral (light grey/white). Avoid busy backgrounds, outdoor scenes, or colors outside this palette (no blue studio backdrops, no branded-color walls in a different hue).
- **Lighting:** even, soft, natural-looking light — no hard directional shadows, no heavy color-graded filters. The brand's visual language is calm and high-contrast in *typography*, not in dramatic photo lighting.
- **Crop:** head-and-shoulders, centered, consistent with LinkedIn's circular crop — leave a little headroom so the circular mask doesn't clip the top of your head.
- **Border/frame:** none needed directly on the photo itself (LinkedIn applies its own circular mask) — do not add a colored ring or border to the source image; let LinkedIn's UI provide the frame.
- **Accent relationship:** no need to force indigo into the photo itself (skin tone and clothing shouldn't be color-graded to match a brand hue) — the accent color's job is done by the banner and surrounding graphics, not the photo.
- **Clothing guidance:** solid, neutral, or muted-tone clothing (navy, charcoal, warm neutrals) reads as consistent with the site's restrained palette — avoid busy patterns or a saturated color that would visually compete with the indigo accent used everywhere else in your LinkedIn presence.
- **Visual relationship with the banner:** the photo should feel like the "premium, technical, restrained" personality from §1 of the design system translated into a photograph — calm, confident, uncluttered — rather than a stylistically unrelated stock-photo headshot.

---

## 4. LinkedIn Post Design System

General rules for any graphic you post (not the banner/carousel, which have their own specs above):

| Post type | Background | Headline font | Body font | Accent use | Footer/branding |
|---|---|---|---|---|---|
| **Text-only post** | N/A — native LinkedIn composer, no custom font available | LinkedIn system font (unavoidable) | Same | None available in-composer | Your name/title in your profile, not the post itself |
| **Image post** (a single graphic) | `#faf8f4` | Bricolage, 700–780 | Bricolage, 400 | One accent line or word, 10–15% of the composition | Small brand-mark tile, bottom corner |
| **Technical diagram** | `#faf8f4` or `#ffffff` (surface) | Bricolage, 650–700 | Bricolage, 400, `tabular-nums` for any numbers/metrics | Accent for the one "answer" or key metric, coral only for a single data-point highlight if truly needed | Brand-mark tile, bottom corner |
| **Case-study post** | `#faf8f4` | Bricolage, 700 | Bricolage, 400 | Accent for the outcome/metric line | Project name + brand mark |
| **Announcement post** | `#faf8f4` or `--color-deep` (`#211a6e`) inverted band for a "big moment" | Bricolage, 750+ | Bricolage, 400–500 | Accent or white-on-deep, not both competing | Brand mark |
| **Educational post** | `#faf8f4` | Bricolage, 650–700 | Bricolage, 400 | Accent for the key term being taught | Brand mark |
| **Portfolio/project post** | `#faf8f4` | Bricolage, 700 | Bricolage, 400 | Accent for project name or one metric | Project name, brand mark |

**Margins:** treat every graphic like a scaled-down version of the site's `.ds-container` — generous edge padding (proportionally, ~6–8% of canvas width on each side), never text flush to the edge.

**Typography hierarchy inside a post graphic:** overline (small, uppercase, accent) → headline (large, heavy weight) → body (regular weight, muted color) → footer (smallest, brand mark + name) — this is the exact `SectionHeading` pattern from the portfolio, just applied to a static image instead of a webpage section.

**Logo/name placement:** bottom-right or bottom-left corner, small, consistent across every post — the brand-mark tile alone is usually enough; add the wordmark only on carousel cover/final slides where a first-time viewer needs the name spelled out.

---

## 5. LinkedIn Carousel System

### Canvas

**1080 × 1350px** (4:5, LinkedIn's current recommended carousel/PDF-post ratio — maximizes vertical space in the mobile feed). Design at 2× (2160×2700px) if your tool supports it.

### Cover slide

```
Small category label (Bricolage, uppercase, accent, +0.1em tracking)
        ↓
Large headline (Bricolage, 750–780 weight, tight line-height ~1.05,
   one word or phrase in accent color)
        ↓
Short supporting line (Bricolage, 400 weight, muted color)
        ↓
Brand identity: brand-mark tile + "Wahab Ansari" wordmark, bottom corner
```

### Content slides

- **Heading:** Bricolage, 650–700 weight, `#1c1712` — one heading per slide, never two competing ideas.
- **Body:** Bricolage, 400 weight, `#5a5245`, generous line-height (1.5–1.7, matching `.ds-lede`).
- **Visual:** if a diagram/chart is needed, use the numeral-led or hairline-divided treatment from the portfolio (§13/§15 of the main design system) — not icon-heavy decoration, not stock imagery.
- **Page number:** small, bottom corner, `tabular-nums`, `#756c5d` (matching `.ds-meta`) — e.g. "03 / 08".
- **Footer:** a thin `#e8e2d6` hairline near the bottom, with the page number and a small brand mark — consistent across every content slide.

### Final slide

```
Key takeaway (one sentence, Bricolage 700 weight)
        ↓
CTA (e.g. "Let's talk" / "View the full case study")
        ↓
Name: Wahab Ansari
Role: React & Next.js Product Engineer
Website: [your portfolio URL]
```

Use the same brand-mark + wordmark lockup as the cover slide, so the first and last things a viewer sees are visually identical bookends.

---

## 6. LinkedIn Case Study Template (8 slides)

Applies the carousel system above to a specific narrative structure — mirrors the actual case-study structure already used in the portfolio's `/work/[slug]` pages (context → problem → build → decisions → outcome → next), just compressed to 8 slides:

| Slide | Content | Notes |
|---|---|---|
| **1. Hook** | The problem stated as a single sharp sentence, cover-slide treatment | "A production marketplace had outgrown WordPress." |
| **2. Context** | Who/what this was, one supporting line | Company type, scale, your role |
| **3. Problem** | The specific, concrete problem — not vague ("slow") but specific ("Core Web Vitals had become a product problem") | Matches the site's own "problem before pitch" framing |
| **4. Approach** | What you decided to do, and why — one decision per slide if there are several | Numeral-led list if more than one point |
| **5. Implementation** | The actual work — technical specifics, kept honest (no invented detail) | This is where a schematic diagram (not a screenshot) fits well |
| **6. Result** | The verified outcome — only measured claims, exactly like the site's own "Outcome rule" (`site.ts`'s own comment: "every claim on this site must be provable") | Use accent color on the one headline metric |
| **7. Lesson** | What you'd do differently, or what you learned — the honesty section, mirroring the case-study pages' "next" field | Builds trust; avoid generic platitudes |
| **8. CTA** | Final-slide treatment from §5 above | Link to the full case study on your site |

---

## 7. LinkedIn Content Colors

```
80–90%   neutral/base colors (#faf8f4 background, #1c1712 / #5a5245 text)
10–20%   brand accent (#4f46e5, with #3730a3 for solid fills)
```

This ratio is not arbitrary — it's the same restraint documented in the main design system's own code comment, which caps `.ds-overline-accent` (the "designed" flag) to one label per viewport. The goal on LinkedIn is identical: **premium and restrained, recognizable at a glance without ever looking like a promotional template.** If a graphic starts to feel "busy" or "sales-y," the accent ratio has crept past 20% — pull it back rather than adding more color to "fix" it.

---

## 8. Brand Consistency Rules

### Always
- Use the approved palette exactly (`#faf8f4`, `#1c1712`, `#5a5245`, `#4f46e5`/`#3730a3`, `#e8542e` sparingly, `#e8e2d6`).
- Use Bricolage Grotesque for every graphic where a custom font is possible.
- Preserve the 8px-derived spacing rhythm — generous whitespace, not cramped compositions.
- Maintain the overline → headline → body → footer hierarchy on every graphic.
- Keep accent usage restrained — one emphasized element per composition.
- Use the exact brand mark (the "WA" single-stroke ligature) — never redraw or approximate it.
- Keep the "no fabricated proof" principle: diagrams and schematics over stock imagery or invented screenshots.

### Never
- Introduce a random or seasonal accent color "for variety."
- Mix in a second font family, even for a "technical" or "code" moment — lean on weight and `tabular-nums` instead, exactly as the site does.
- Use coral as a large fill or as body text — decorative/data-point use only.
- Use excessive gradients — if a gradient appears, it should be the single-hue indigo brand-tile gradient or a very low-opacity glow, never a multi-color background wash.
- Add heavy drop shadows — the system's whole shadow language is "restrained," not "floating card."
- Use a generic Canva-template layout, icon pack, or stock photo that doesn't match this document.
- Let the accent color exceed roughly 20% of any composition.
- Clutter a slide/graphic with more than one headline idea.

---

## Design tokens recap (for quick paste into any design tool)

```
COLORS
bg:          #faf8f4
surface:     #ffffff
text:        #1c1712
text-muted:  #5a5245
text-subtle: #756c5d
border:      #e8e2d6
accent:      #4f46e5
accent-fill: #3730a3
coral:       #e8542e   (sparing, data-point use only)

TYPOGRAPHY
font: Bricolage Grotesque (single family — headline, body, UI, labels all use it)
headline weight: 750–780
heading weight:  650–700
body weight:     400
label weight:    550–650 (uppercase, +0.1em tracking)

SPACING
Base unit: 8px — use generous multiples (24/32/48/64/96px) between elements, never cramped

RADIUS
card-like blocks: 18px
button-like elements: 12px
pill/tag shapes: 999px

BANNER
canvas: 1584×396px (design at 2×)
text-safe zone: x 420–1520, y 60–340
```

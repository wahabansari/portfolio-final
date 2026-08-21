# Muhammad Wahab Ansari — Portfolio

A portfolio that does two jobs at once: it's a CV for hiring managers **and** a services
page for clients. Built in Google's design language — Google Sans throughout, large light
display headings, pill buttons, `#F8F9FA` section bands, the four brand colours as accents,
no shadows anywhere. Light by default, with Google's own dark palette behind the toggle.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint (react-hooks compiler rules included)
```

---

## Editing content

**Everything you'd want to change lives in one file: [`src/content/site.ts`](src/content/site.ts).**
No copy is hardcoded in components. Edit there and the whole site updates — nav, JSON-LD,
OG image, sitemap and all.

| Export | Controls |
| --- | --- |
| `site` | Name, role, email, location, availability flag, résumé path |
| `socials` | GitHub / LinkedIn / email links (also feeds JSON-LD `sameAs`) |
| `summary`, `summaryShort` | SEO description and the hero paragraph |
| `stats` | The four hero stat cards (`numeric: true` animates the count) |
| `about` | Statement, body paragraphs, and the "At a glance" list |
| `experience` | Roles, bullets, per-role stack |
| `projects` | Project cards — links, blurb, tools; `plate` picks the brand-colour accent |
| `services` | The four offerings — title, blurb, and what each includes; `accent` picks the brand colour |
| `skills` | The skills cards |
| `education`, `certifications` | Background section |
| `sections` | Nav items — ids must match the `<section id>` values |
| `marquee` | The "tools I work with" pills in the hero (first 10 shown) |

### Things worth updating

- **`site.url`** is `https://wahabansari.dev`. Change it before deploying elsewhere —
  it's the base for canonical URLs, OG tags and the sitemap.
- **`socials`** currently guesses `github.com/wahabansari` and
  `linkedin.com/in/wahabansari` from the résumé's `/wahabansari` handles. Verify both.
- **Employment dates** aren't shown, because the source résumé doesn't contain them.
  Add a `period` to any `experience` entry and it's ready to display.
- **`public/Muhammad-Wahab-Ansari-Resume.pdf`** is a copy of the source résumé (3.4 MB).
  Worth compressing — it's served on every "Download résumé" click.

### Project images

Each project card shows a stylised browser-window placeholder, tinted by the `plate`
field. To use a real screenshot, drop the image in `public/work/` and set
`image: "/work/verdira.png"` on that project — the card swaps automatically.

---

## Design system

Defined once in [`src/app/globals.css`](src/app/globals.css), measured from **about.google**
rather than guessed.

| | Google's approach, adopted here |
| --- | --- |
| Type | **Google Sans** — the real font, now published on Google Fonts and self-hosted via `next/font` |
| Headings | **Weight 400.** Large and light, never bold — the single most identifying trait of Google's type |
| Buttons | Full pills (999px), `12px 24px`, 16px/500 |
| Elevation | **No shadows anywhere.** Depth comes from `#F8F9FA` band fills and `#DADCE0` hairlines |
| Cards | 16px radius, hairline border, or plain white on a grey band |
| Bands | Sections alternate white / `#F8F9FA` / `#E8F0FE` full-bleed |
| Container | 1296px, matching about.google |

The h1 reproduces Google's metrics exactly — verified against the live site:

```
about.google h1:  60px · 400 · -0.5px  · 72px line-height · #202124
this site h1:     60px · 400 · -0.498px · 72px line-height · #202124
```

### Colour

Google's four brand colours are used the way Google actually uses them outside the logo:
as **graphics**, not as small text. Each project card and skills group carries one as a dot
or artwork tint, while the label beside it stays neutral.

> **The one deliberate departure.** Google ships `#1A73E8` (Blue 600) as link and label text,
> but on white that is only **4.27:1** — below AA for normal text. Yellow `#FBBC04` as text is
> **1.71:1**, unusable. So `--color-primary` is Blue 700 `#1967D2` (5.37:1) for all blue *text*,
> while Blue 600 is kept for button *fills* (white on it is 4.51:1). Brand colours never carry
> text. This is the only place the design knowingly diverges from Google.

Dark mode uses Google's own dark palette — `#202124` surface, `#8AB4F8` blue, as in Search.

Every text role was measured against its real background in both themes, applying the WCAG
large-text allowance: **232 elements, zero failures** (light normal-text minimum 4.51:1,
dark 5.06:1).

### A note on the OG card

The page is set in Google Sans, but the social card is set in **Roboto**. Satori — the
rasteriser behind `next/og` — cannot parse Google Sans's OpenType tables and throws on
`GSUB lookupType 7`. Roboto is Google's other open face and renders cleanly. The fetch is
wrapped so a build without network still succeeds on the system sans.

## Dual purpose: CV and services

The page serves two audiences without splitting into two sites:

| For hiring managers | For clients |
| --- | --- |
| Experience, Background, résumé download | Services, project CTAs, "Start a project" |
| "View my work" | "Hire me for a project" |
| Work history with measured outcomes | The same work framed as offerings |

The hero speaks to both — the headline covers what gets built, the three CTAs split by
intent (hire → services, evaluate → work, screen → résumé), and the availability chip reads
"Open to roles and freelance projects".

**Every service maps to a capability already listed in `skills`** — nothing is offered that
isn't backed by the résumé. Frontend engineering, full-stack development, AI automation
(n8n, Gemini API, REST integrations) and Performance & SEO all come straight from it. If you
add a service, add the underlying skill too, or the claim isn't grounded.

The services also emit `makesOffer` entries in the `Person` JSON-LD, so search engines see
the freelance offering alongside the CV.

## Section rhythm

Bands alternate so no two adjacent sections share a fill:

```
Hero      white   (stats band grey)
About     white
Services  grey     ← cards go plain white, no border needed
Work      white    ← cards get the #DADCE0 hairline
Experience grey    ← cards plain white
Skills    white    ← cards bordered
Background grey    ← cards plain white
Contact   blue     #E8F0FE
```

**No card draws an outline** — that's Material 2 / Bootstrap, not Google. Separation comes
from the fill inverting against the band: on a **grey** band use `.g-card-plain` (raised
fill), on a **white** band use `.g-card-soft` (`#F8F9FA`). If a card looks weak, change the
fill, never add a border.

Dark mode flips the direction — Material raises surfaces by *lightening* them, so
`.g-card-plain` uses `--color-card-raised` (`#FFFFFF` light, `#35363A` dark) rather than the
page background. Reusing the page background there makes dark cards *darker* than their
band, which reads as an inset well instead of a card.

## Accessibility

- Skip link, visible focus rings, semantic landmarks.
- Heading outline: one `h1`, then exactly one `h2` per section, `h3` for cards.
- Mobile menu collapses via `grid-template-rows` and is marked `inert` when closed, so it
  never strands an invisible overlay or leaves hidden links in the tab order. Escape closes
  it and returns focus to the trigger.
- Tap targets meet the 24px minimum; buttons and links are 44px.
- Decorative card artwork is `aria-hidden`; each project link carries a descriptive label.

## SEO

`metadata` in `layout.tsx`, `Person` JSON-LD in `json-ld.tsx`, generated OG card
(`opengraph-image.tsx`), favicon (`icon.tsx`), `sitemap.ts` and `robots.ts`.

## Deploying

Push to a Git remote and import into Vercel — zero config. Set the production domain, then
update `site.url` to match.

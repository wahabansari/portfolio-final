# Muhammad Wahab Ansari — Portfolio

A personal site that does two jobs at once: a **CV** for hiring managers and a
**services page** for clients. Built in Google's design language — Google Sans
throughout, large light display headings, pill buttons, `#F8F9FA` section bands,
the four brand colours as accents, and no shadows anywhere.

Light by default, with Google's own dark palette behind the toggle.

**Live:** https://wahabansari-portfolio-final.vercel.app · **Stack:** Next.js 16 · React 19 · Tailwind CSS v4 · TypeScript

---

## Contents

- [Quick start](#quick-start)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Editing your content](#editing-your-content) ← **start here**
- [Dual purpose: CV and services](#dual-purpose-cv-and-services)
- [Design system](#design-system)
- [Section rhythm](#section-rhythm)
- [Accessibility](#accessibility)
- [SEO](#seo)
- [Deploying](#deploying)
- [Things to know](#things-to-know)

---

## Quick start

**Requirements:** Node.js 20 or newer, and npm.

```bash
git clone https://github.com/wahabansari/portfolio-final.git
```

```bash
cd portfolio-final && npm install
```

```bash
npm run dev
```

Open http://localhost:3000. The dev server hot-reloads, so edits to
`src/content/site.ts` appear immediately.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server on port 3000, with hot reload |
| `npm run build` | Production build — also type-checks and prerenders every route |
| `npm run start` | Serves the production build (run `build` first) |
| `npm run lint` | ESLint, including the React Compiler rules |

Type-check on its own: `npx tsc --noEmit`

## Project structure

Routes:

```
/                    every section in preview mode, linking to the full routes
/about  /work  /experience  /skills  /contact
/services  →  /services/[category]  →  /services/[category]/[service]
```

The home page runs each section with a `preview` prop — a trimmed version (one
paragraph, three projects, six skill groups, no bullet lists) with a link
through to the full route. That keeps the landing page complete without
republishing the detail pages word for word, which would leave the two
competing for the same search terms.

Every link is a real path — there are no `#` fragments except the skip link,
which targets `#main`. Each route owns exactly one `h1`, so pages rank for
their own terms instead of competing with one long scroller.

```
src/
├── app/
│   ├── globals.css          Design system: tokens, type scale, components
│   ├── layout.tsx           Fonts, metadata, theme script
│   ├── page.tsx             Section order
│   ├── icon.tsx             Generated favicon
│   ├── opengraph-image.tsx  Generated social card
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── ui.tsx               Section, SectionHeading, Field, Reveal, icons
│   ├── nav.tsx  hero.tsx  about.tsx  services.tsx  work.tsx
│   ├── experience.tsx  skills.tsx  credentials.tsx  contact.tsx  footer.tsx
│   ├── service-ui.tsx       PageHeader, breadcrumbs, JSON-LD for /services/*
│   ├── service-icons.tsx    One icon per service, used in the nav dropdown
│   └── theme-toggle.tsx     Light/dark switch + the no-flash script
├── content/
│   ├── site.ts               ★ CV content — about, work, experience, skills
│   └── services.ts           ★ Service catalogue — every /services page
├── hooks/use-media-query.ts
└── lib/cn.ts
```

---

## Editing your content

**Everything you'd want to change lives in one file:
[`src/content/site.ts`](src/content/site.ts).** No copy is hardcoded in
components. Edit there and the whole site updates — nav, JSON-LD, OG image,
sitemap and all.

| Export | Controls |
| --- | --- |
| `site` | Name, role, email, location, availability flag, résumé path |
| `socials` | GitHub / LinkedIn / email links (also feeds JSON-LD `sameAs`) |
| `summary`, `summaryShort` | SEO description and the hero paragraph |
| `stats` | The four hero stat figures (`numeric: true` animates the count) |
| `about` | Statement, body paragraphs, and the "At a glance" list |
| `services` | The four offerings shown on the home page; `href` links a card to its category page |
| `projects` | Project cards — links, blurb, tools; `plate` picks the brand-colour accent |
| `experience` | Roles, bullets, per-role stack |
| `skills` | The skills cards |
| `education`, `certifications` | Background section |
| `sections` | Nav items — ids must match the `<section id>` values |
| `marquee` | Technology names available to the hero strip |

### Adding a project

```ts
{
  slug: "my-project",
  title: "My Project",
  kind: "Web Application",
  href: "https://example.com/",
  domain: "example.com",
  blurb: "One sentence that appears on the card.",
  detail: "Longer description, kept for future use.",
  tools: ["Next.js", "Tailwind CSS"],
  plate: "app",     // app | commerce | marketplace | portal | listing
}
```

`plate` only picks which brand colour tints the card — it has no other effect.

`href` and `domain` are optional — omit both for client work with no public
URL (e.g. an internal platform). The card still renders, just without a link:
the domain label falls back to the project title, and the footer shows "Client
work — not publicly linkable" instead of a link.

### Project screenshots

Each card shows a generated browser-window placeholder tinted by `plate`. To use
a real screenshot, drop the image in `public/work/` and add `image` to that
project:

```ts
image: "/work/my-project.png",
```

The card swaps to the real image automatically.

### Adding a service

Add to `services` in the same file. **Keep every service backed by something in
`skills`** — the point of the section is that nothing is offered which isn't
already on the résumé. If you add a service, add the underlying skill too.

### Before you deploy

- **`site.url`** is `https://wahabansari-portfolio-final.vercel.app`. Change it
  if you move to a custom domain — it's the base for canonical URLs, OG tags
  and the sitemap.
- **`socials`** currently guesses `github.com/wahabansari` and
  `linkedin.com/in/wahabansari` from the résumé's `/wahabansari` handles.
  **Verify both.**
- **Employment dates** aren't shown, because the source résumé doesn't contain
  them. Add a `period` to any `experience` entry and it's ready to display.
- **`public/Muhammad-Wahab-Ansari-Resume.pdf`** is 3.4 MB. Worth compressing —
  it's served on every "Download résumé" click.

---

## Service pages

Beyond the home-page teaser there is a full `/services` tree, all statically
prerendered:

```
/services                                     index of every category
/services/frontend                            category overview
  /email-template-development
  /website-dashboard-redesign
  /ui-ux-design
/services/automation                          category overview
  /ai-chatbot-development
  /rag-chatbot-agent
  /dental-clinic-ai-assistant
  /n8n-workflow-automation
/services/wordpress                           category overview
  /custom-wordpress-theme-development
  /wordpress-plugin-development
  /wordpress-speed-optimization
  /wordpress-to-nextjs-migration
  /landing-page-development
```

**All of it comes from [`src/content/services.ts`](src/content/services.ts).**
Adding a service means adding one object to a category's `services` array — the
route, the category listing, the footer links, the sitemap and the structured
data all pick it up with no further wiring.

Each service object carries its own SEO fields (`metaTitle`, `metaDescription`,
`keywords`) plus the page body: `intro`, `problem`, `deliverables`, `process`,
`stack`, `idealFor`, `useCases` and `faqs`.

`useCases` is the field that does the most work. A reader recognises their own
situation faster than they parse a feature list, so each service carries three
concrete scenarios paired with what changed — not capabilities, situations.

### What each page emits for SEO

- A unique `<title>`, meta description and canonical URL
- Open Graph and Twitter card metadata
- `Service`, `BreadcrumbList` and `FAQPage` JSON-LD in one `@graph` (category
  pages emit `BreadcrumbList` + `CollectionPage` with an `ItemList` of services)
- A clean outline — one `h1`, one `h2` per block
- Internal links up to the category, sideways to sibling services, and back home

FAQs use native `<details>` rather than a JavaScript accordion: keyboard
accessible, findable by in-page search, and zero client bundle.

### Adding a category

Add a `ServiceCategory` to `serviceCategories`, then point the matching entry in
`services` (in `site.ts`) at it with `href: "/services/your-slug"` so the
home-page card becomes a link. Full-stack has no page yet, so its card stays
unlinked until it does.

**Accent colours must survive being used.** A category's `accent` drives artwork
across its pages. Brand colours are graphics only — never text — and anything
sitting *on* an accent needs care: white on Google red is 3.9:1, on green 3.1:1
and on yellow 1.7:1, all below AA. That's why the numbered process badges use an
18% tint of the accent with ink text rather than white on the solid colour.

## Dual purpose: CV and services

The page serves two audiences without splitting into two sites:

| For hiring managers | For clients |
| --- | --- |
| Experience, Background, résumé download | Services, project CTAs, "Start a project" |
| "View my work" | "Hire me for a project" |
| Work history with measured outcomes | The same work framed as offerings |

The hero speaks to both — the headline covers what gets built, the three CTAs
split by intent (hire → services, evaluate → work, screen → résumé), and the
availability chip reads "Open to roles and freelance projects".

The services also emit `makesOffer` entries in the `Person` JSON-LD, so search
engines see the freelance offering alongside the CV.

---

## Design system

Defined once in [`src/app/globals.css`](src/app/globals.css), **measured from
about.google** rather than guessed.

| | Google's approach, adopted here |
| --- | --- |
| Type | **Google Sans** — the real font, published on Google Fonts and self-hosted via `next/font` |
| Headings | Google ships **weight 400** — large and light, never bold. This site uses 500, one step up |
| Buttons | Full pills (999px), `12px 24px`, 16px/500 |
| Elevation | **No shadows anywhere.** Depth comes from band and card fills |
| Cards | 16px radius, always the raised fill, 1px hairline, no shadow |
| Bands | Sections alternate white / `#F8F9FA` / `#E8F0FE`, full bleed |
| Container | 1296px, matching about.google |

The h1 reproduces Google's metrics — verified against the live site:

```
about.google h1:  60px · 400 · -0.5px  · 72px line-height · #202124
this site h1:     60px · 500 · -0.498px · 72px line-height · #202124
```

### Colour

Google's four brand colours are used the way Google uses them outside the logo:
as **graphics, not text**. Each project card and skills group carries one as a
dot or artwork tint, while the label beside it stays neutral.

> **The one deliberate departure.** Google ships `#1A73E8` (Blue 600) as link and
> label text, but on white that is only **4.27:1** — below AA for normal text.
> Yellow `#FBBC04` as text is **1.71:1**, unusable. So `--color-primary` is
> Blue 700 `#1967D2` (5.37:1) for all blue *text*, while Blue 600 is kept for
> button *fills* (white on it is 4.51:1). Brand colours never carry text.

Dark mode uses Google's own dark palette — `#202124` surface, `#8AB4F8` blue.

### Cards

Cards always use the **raised** fill — `#FFFFFF` in light, `#35363A` in dark —
and never take the grey band colour. On a grey or blue band that reads as
elevation by itself; on a white band a 1px hairline
(`--color-border`) does the separating instead.

Because the fill is always lighter than every band in both themes, a card can't
come out the same colour as what it sits on. It used to be picked per component,
which broke exactly as you'd expect: re-toning the home page left five of seven
sections with cards the same colour as their band — invisible.

**Nothing on the page casts a shadow** — not cards, not the nav, not the mega
menu. Depth is fills and hairlines only. Hover firms a card's outline rather
than lifting it.

### Tailwind v4 tokens

Colours are declared in a plain `@theme` block, and the dark theme re-points the
same custom properties under `:root[data-theme="dark"]`.

> This is deliberate and worth preserving: **`@theme inline` bakes colour values
> into the compiled utilities**, so `text-ink-muted` would freeze at its light
> value and never respond to the theme. A plain `@theme` compiles utilities to
> `var(--color-*)`, which is what makes the toggle work. If you add a colour, add
> it to `@theme` and to the dark block — never to a `@theme inline`.

### Type rendering

Google Sans is loaded as the **variable** cut with the `opsz` and `GRAD` axes, so
`font-optical-sizing: auto` can adapt letterforms to their size rather than
scaling one drawing from 14px to 60px. `font-synthesis: none` prevents the
browser faking weights the variable font already has.

### Theme toggle

`<html data-theme>` is the single source of truth. An inline script in `<head>`
sets it before first paint so there's no flash, the toggle reads the live DOM
attribute (not a React snapshot, so rapid clicks can't desync), and the choice
persists in `localStorage`.

---

## Section rhythm

Bands alternate so no two adjacent sections share a fill:

```
Hero       white   (stats sub-band grey)
About      white
Services   grey     ← cards raised white
Work       white    ← cards #F8F9FA
Experience grey     ← cards raised white
Skills     white    ← cards #F8F9FA
Background grey     ← cards raised white
Contact    blue     #E8F0FE
```

---

## Accessibility

- Skip link, visible focus rings, semantic landmarks.
- Heading outline: one `h1`, then exactly one `h2` per section. Card and
  footer-column titles are `<p>`, not headings, so the outline stays clean.
- Mobile menu collapses via `grid-template-rows` and is marked `inert` when
  closed, so it never strands an invisible overlay or leaves hidden links in the
  tab order. Escape closes it and returns focus to the trigger.
- Tap targets meet the 24px minimum; buttons are 48px.
- Decorative card artwork is `aria-hidden`; each project link carries a
  descriptive label.
- All motion is gated behind `prefers-reduced-motion`.

**Measured, not assumed:** every text role was checked against its real
background in both themes, applying the WCAG large-text allowance — **265
elements, zero failures** (light normal-text minimum 4.51:1, dark 4.57:1).

## SEO

`metadata` in `layout.tsx`, `Person` + `makesOffer` JSON-LD in `json-ld.tsx`, a
generated OG card (`opengraph-image.tsx`), a generated favicon (`icon.tsx`),
plus `sitemap.ts` and `robots.ts`.

## Deploying

Push to GitHub and import the repo into [Vercel](https://vercel.com) — no
configuration needed. Then set your production domain and update `site.url` in
`src/content/site.ts` to match, so canonical URLs and OG tags point at the right
place.

Any host that runs a Next.js 16 build works too:

```bash
npm run build && npm run start
```

## Things to know

**The OG card is set in Roboto, not Google Sans.** Satori — the rasteriser behind
`next/og` — cannot parse Google Sans's OpenType tables and throws on
`GSUB lookupType 7`, which fails the whole build. Roboto is Google's other open
face and renders cleanly. The font fetch is wrapped so a build without network
access still succeeds on the system sans.

**`Failed to find font override values for Google Sans`** appears as a build
warning. It means Next can't compute fallback metrics for the fallback font, so
there may be a small layout shift while the font loads. Harmless — `display: swap`
means text is never invisible.

**The services dropdown in `nav.tsx` is `position: fixed`, not `absolute`.**
It's anchored to `top-16` (the header's own height) rather than to the trigger
button, so it spans the full viewport width regardless of where "Services"
sits in the nav. It stays a DOM descendant of the hover/click target above it,
so moving the pointer down into the panel never fires the trigger's
`mouseleave` — that's DOM containment, not visual containment, and it's what
makes hover-to-browse work at all with a full-bleed panel.

---

© Muhammad Wahab Ansari

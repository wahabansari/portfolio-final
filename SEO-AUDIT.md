# SEO / AEO / GEO / UX Audit

**Site**: Muhammad Wahab Ansari — React & Next.js Product Engineer
**URL audited**: `https://wahabansari-portfolio-final.vercel.app` (also the current canonical `site.url` — no custom domain is configured anywhere in the repo)
**Stack**: Next.js 16.3.1 (App Router, Turbopack), React 19.2, TypeScript, Tailwind v4, no Framer Motion (CSS-only animation)
**Audited**: 2026-09-16

## How to read this document

Every finding below is tagged:

- **Existing** — already implemented, verified in the repo. Not to be rebuilt.
- **Gap** — genuinely missing or weak, safe to implement without inventing facts.
- **Decision needed** — implementing it requires a call that isn't mine to make (a fact I don't have, or a strategic tradeoff with a real downside either way).

The single most important finding of this audit: **this is not a green-field site.** The content architecture (`src/content/en/*.ts`) already carries an explicit internal accuracy rule ("every claim must be provable"), an empty testimonials array with a comment explaining why it's empty rather than filled with invented quotes, a documented reason for consolidating a 16-page service catalogue into 7, and a case-study honesty rule (`AussieMotor` deliberately has *no* case-study page because it was team-delivered work, not solo — a card and an outbound link is the honest representation). Someone — a prior session, most likely — already did the "don't fabricate, don't keyword-stuff, don't cannibalize" work this brief asks for. My job here is to audit that work honestly, close the real gaps, and flag the couple of places where a generic SEO brief and this specific, already-considered codebase disagree.

---

## Technical SEO

| Item | Status | Notes |
|---|---|---|
| Crawlability / robots.ts | **Existing** | `allow: "/"`, sitemap referenced. Nothing important blocked. |
| Sitemap (`app/sitemap.ts`) | **Existing** | Dynamically generated from `serviceSlugs`, `caseStudySlugs`, `insights` — can't drift from the content. No redirects, no drafts, no duplicates in it. |
| Canonical URLs | **Existing** | One `pageMetadata()` builder (`src/lib/seo.ts`) derives canonical + OG URL from the same `path` on every route — they cannot disagree. Used on every page. |
| Redirects | **Existing** | Old `/skills`, `/experience`, and a full legacy `/services/{category}/{slug}` tree 308 to their current equivalents (`next.config.ts`). Sitemap correctly excludes the redirect sources. |
| Metadata uniqueness | **Existing** | Every route (`/`, `/services`, `/services/[slug]`, `/work`, `/work/[slug]`, `/insights`, `/insights/[slug]`, `/about`, `/contact`) has its own title/description via `pageMetadata()`. No duplicated homepage metadata anywhere. |
| Open Graph / Twitter cards | **Existing** | Generated per-page via the same builder; `opengraph-image.tsx` generates the fallback card. |
| Structured data | **Existing, extensive** | `Person`, `WebSite`, `SiteNavigationElement`, `ProfilePage`, `WebPage`, `Service` + `OfferCatalog`, `CollectionPage` + `ItemList` (services/work/insights hubs), `CreativeWork` (case studies — correctly *not* `Article`, since they're project write-ups with no publish date), `Article` (insights, with `citation` to sources and case studies), and `BreadcrumbList` on every page. No `LocalBusiness`, no fake reviews/ratings — correctly avoided since this is a person, not a business. |
| Internal linking | **Existing, deliberate** | Every service links to `proofSlugs`, every case study links to a related service via its own `cta`, every insight links to `relatedServiceSlug` and cites its `relatedCaseStudySlugs`. Service pages link to the *next* service so nobody dead-ends. |
| Image SEO | **Partial — Gap** | Only one `next/image` usage in the whole codebase (`plate.tsx`, the generated project-card graphic), with alt text `"{project.title} — {project.kind}"` (e.g. "Sunhub — Performance & platform"). Descriptive, not generic, but generic *across* projects — see Gaps. No real project screenshots exist in `/public` (only `Resume-FEE.pdf`) — all project art is a CSS/SVG "plate," which is itself an honest choice (no invented product screenshots) but worth knowing. |
| Semantic HTML | **Existing** | `header`, `nav`, `main`, `section`, `footer` all present and used correctly; one `<h1>` per page confirmed on every template read. |
| URL structure | **Existing** | Clean, no query params on canonical content: `/services/[slug]`, `/work/[slug]`, `/insights/[slug]`. |
| Duplicate content | **Existing — none found** | `src/content/*.ts` are re-export shims to `src/content/en/*.ts` (a leftover from a since-removed i18n setup) — not duplicate content, just an indirection layer. Not user-facing. |
| `robots.ts` minor tidiness | **Gap (trivial)** | `/api/contact` is not disallowed. Harmless (nothing to index on a POST-only route) but a one-line `disallow: "/api/"` is free tidiness. |
| Orphaned asset | **Gap (trivial)** | `src/app/fonts/ValleySans-Variable.ttf` is not referenced anywhere in the codebase (no `@font-face`, no `next/font` import). Dead file. |

## UX

| Item | Status | Notes |
|---|---|---|
| Homepage hierarchy | **Existing** | Hero → Proof strip → Selected work → Services → Process → Experience → Capabilities → About teaser → Contact CTA. Answer-first: who/what/value in the first screen. |
| Buyer segmentation ("Who I help") | **Gap — real, high-value, zero-risk** | `src/components/positioning.tsx` exports a fully built, on-brand `<Audiences />` component — SaaS & product teams / Businesses / Agencies, each with a routed link, "best fit" marked — that satisfies this brief's "Who I Help" ask almost exactly. **It is not imported anywhere in the app.** Dead code. This is the single highest-value, lowest-risk fix available: wire it into the homepage. |
| Service discoverability | **Existing** | Services mega-menu in nav, `/services` hub grouped by tier (`core` / `modernize` / `partnership`), homepage `ServicesOverview` ledger. |
| CTA clarity | **Existing** | Primary "Start a project" / secondary "View my work" / tertiary "View résumé" in the hero, consistent across service pages (each has its own `cta`). No competing CTA sprawl found. |
| Contact form | **Existing** | Concise field set already matches the brief's own recommended list (name, work email, company/product, project type, current site/Figma URL, timeline, budget, brief). |
| Mobile UX | **Not independently re-verified this session** | Verified earlier in this conversation via Lighthouse on a production build (100/100/100/96) *before* the most recent content/nav changes. Should be re-checked after any further changes — see Recommended later. |
| Content density | **Existing** | Service pages already follow short-block → card → bullets → proof → CTA rather than walls of text (confirmed by direct read of `/services/[slug]/page.tsx`). |

## AEO

| Item | Status | Notes |
|---|---|---|
| Answer-first structure | **Existing** | Every service page opens with a `Definition` block — one quotable sentence — before any sales copy. Every insight opens the same way. This is exactly the structure this brief asks for in §28–29. |
| FAQ content | **Existing, real** | Homepage FAQ (10 questions) and per-service FAQ (5–6 each) are all real buyer questions (existing backend? Figma? agencies? rebuilds? Lighthouse guarantees? WordPress SEO risk?) — not keyword-stuffed. |
| FAQ schema | **Existing — correctly absent** | No `FAQPage` JSON-LD anywhere, matching this brief's own instruction not to rely on FAQ schema for visibility. This was a deliberate omission, not an oversight (confirmed by the reasoning comment at the top of `json-ld.tsx`). |
| Definitions | **Existing** | Each service's `definition` field is exactly the "what is X" block this brief asks for in §29, already connected to Wahab's actual service. |
| No fake AI-SEO artifacts | **Existing** | `llms.txt` exists but is explicitly framed (in its own source comment) as *not* a ranking mechanism — a generated Markdown map with a "Verified claims" section that states only the 30% Sunhub figure, 5+ years, and 7 live projects, and explicitly says "no other performance, traffic, revenue or conversion figures are claimed anywhere on this site." This is the opposite of a fake AI-SEO hack — it's a machine-readable restatement of the same accuracy rule. |

## GEO

| Item | Status | Notes |
|---|---|---|
| Entity clarity | **Existing** | Single `Person` node (`personNode` in `json-ld.tsx`) referenced by `@id` from every other schema block — Website, ProfilePage, Service, CreativeWork, Article all point back to the same entity rather than restating it. |
| Author identity | **Existing** | Every `Article` (insight) and `CreativeWork` (case study) sets `author`/`creator` to the same Person `@id`. No conflicting bylines. |
| First-hand evidence | **Existing** | The 30% CWV figure traces to a real employer/client relationship (Oxiliry → Sunhub, Apr 2021–present) documented in `experience` in `content/en/site.ts`, with the *methodology* stated (bundle optimisation, lazy loading, tree-shaking, image compression, build-pipeline work) rather than a bare number. |
| External identity consistency | **Existing** | GitHub and LinkedIn URLs are consistent across `socials`, `personNode.sameAs`, and the footer/contact page. |
| Unsupported claims | **None found** | Deliberately empty `testimonials` array; no revenue/traffic/client-count claims anywhere in `content/en/*.ts`. |

## Performance

| Item | Status | Notes |
|---|---|---|
| Client components | **Not fully re-audited this session** | `"use client"` usage wasn't exhaustively swept in this pass; `Nav`, `PageTransition`, `ThemeToggle`, `Spotlight` are known client components from earlier work this session — all need interactivity (scroll state, theme, search), so they're justified, not gratuitous. |
| Fonts | **Existing** | Single variable font (Bricolage Grotesque) via `next/font/google`, self-hosted, `display: swap`. No external font requests. The orphaned `ValleySans-Variable.ttf` (see Technical SEO) is dead weight but not loaded, so it costs nothing at runtime — only repo hygiene. |
| Third-party scripts | **Existing, minimal** | Vercel Speed Insights + a GTM component (`Gtm`) + click tracking (`TrackClicks`). No heavier third-party embeds found. |
| Animation | **Existing** | CSS-only (no Framer Motion dependency) — confirmed in `package.json`. Lower runtime cost than a JS animation library by construction. |
| Measured baseline | **Existing (from earlier this session)** | Lighthouse on a production build: 100 Performance / 100 Accessibility / 100 Best Practices / 96 SEO (the 96 was an expected Speed Insights 404 on localhost, not a real gap). This predates the most recent scroll-behavior and nav fixes and should be re-run — see Recommended later. |

## Accessibility

| Item | Status | Notes |
|---|---|---|
| Semantic HTML / heading hierarchy | **Existing** | Confirmed via direct template reads. |
| Keyboard/focus | **Existing** | `:focus-visible` outline rule present in `globals.css`; nav and contact form both carry `aria-label`/`htmlFor`/`aria-expanded` attributes (grepped this session). |
| Reduced motion | **Existing** | `@media (prefers-reduced-motion: reduce)` block in `globals.css` collapses animation duration to near-zero. |
| Forms | **Existing** | Contact form has labelled fields; not independently re-tested for live error-state accessibility this session. |
| Lighthouse Accessibility | **Existing** | 100/100, measured earlier this session (pre-dates latest nav/scroll changes — recommend re-run). |

---

## Confirmed real gaps (safe to implement — no invented facts)

1. **`<Audiences />` ("Who I work with") is fully built and not rendered anywhere.** Wiring it into the homepage is a pure win: it's exactly the buyer-segmentation section this brief asks for (§9), it already exists, already matches the design system, and requires zero new copy.
2. **`ValleySans-Variable.ttf`** — orphaned, unreferenced font file. Safe to delete.
3. **`robots.ts`** could add `disallow: "/api/"` for tidiness. Cosmetic, not a real crawl-budget problem at this site's size.
4. **Generic-but-repeated image alt text** on project plates (`"{title} — {kind}"`) — could be made a little more descriptive per project without inventing anything, since the real project data (`blurb`, `problem`, `outcome`) already exists to draw from.

## Decisions needed (require your input — not mine to decide)

### 1. Service page architecture: 7 consolidated services vs. 9 fragmented ones

The brief (§13–16) asks for **separate** `/services/react-development` and `/services/nextjs-development` pages alongside `/services/frontend-product-engineering`. The existing codebase deliberately did the opposite: it consolidated what used to be a 16-page catalogue down to 7, and the top-of-file comment in `content/en/services.ts` explains why — splitting "React development" and "Next.js development" into their own pages when both would target near-identical intent ("production web apps with React, Next.js and TypeScript") is close to the keyword-cannibalization problem this same brief warns against in its own §23.

I don't think I should silently fragment an architecture that was already built to avoid exactly this problem, and I don't think I should silently ignore explicit instructions either. **I'm treating this as a decision for you**, not something to guess at.

### 2. Custom domain

`site.url` is `https://wahabansari-portfolio-final.vercel.app`. There is no custom domain anywhere in the repo, env config, or `next.config.ts`. Per the brief's own rule (§37), I will not invent one. If a custom domain exists or is planned, canonical URLs, the sitemap, OG tags and structured data all update automatically the moment `site.url` changes (everything derives from that one constant) — but I need the actual domain from you.

### 3. Scope and pace of new content (case studies, content clusters)

The brief asks for potentially ~20+ new insight articles across three clusters, plus a fourth case study (`/work/aussiemotor`). On the latter specifically: the existing codebase **deliberately does not** have an AussieMotor case study, because Wahab's role there was "part of a team" on a migration, not solo ownership — the honest treatment already implemented is a portfolio card linking to the live site, not a full first-person case-study narrative. Writing a full 12-section case study for it would either (a) overstate the role, or (b) require new factual detail about the engagement I don't have. I'd want your confirmation — and probably more detail about that engagement — before creating that page.

For the content clusters: I can write these, but at the volume requested they represent a large amount of new technical copy. I'd rather agree scope with you (which clusters, how many articles, over how many sessions) than generate a large batch of first-hand-voiced content in one shot without checkpoints.

---

## Not yet independently re-verified this session

- Mobile UX at 320/360/390/412/768px (last measured pre-dates recent changes).
- Full `"use client"` sweep for unnecessary client components.
- Live Lighthouse re-run after the fixes in this document land.

---

## Implementation log (this engagement)

Decisions confirmed by the site owner:
1. Keep the existing 7-page consolidated service catalogue — do not fragment into 9 pages.
2. No custom domain yet — canonical stays on the Vercel URL (`site.url`) until one exists.
3. Skip the AussieMotor case study for now (team-delivered role, not solo — no new page). Proceed with a small batch of new insight articles instead of all ~20+ from the brief.

**Implemented:**
- Wired the previously-dead `<Audiences />` "Who I work with" component into the homepage between "Selected work" and "Services," rebalancing section tones to preserve the alternating-band design rule.
- Removed the orphaned, unreferenced `ValleySans-Variable.ttf` font file.
- Added `disallow: "/api/"` to `robots.ts`.
- Added 4 new first-hand insight articles, filling the one clear content gap identified in the audit (zero SaaS-cluster content despite SaaS & MVP Development being a headline service, and Verdira being real, documented, first-hand proof for it):
  - `/insights/frontend-architecture-for-saas-products` (new "SaaS" cluster) — grounded in Verdira's feature-based reorganisation and the SaaS service's own scope.
  - `/insights/authentication-architecture-in-nextjs` (SaaS cluster) — grounded in Verdira's server-enforced route protection.
  - `/insights/nextjs-image-optimization-for-production-applications` (Performance cluster) — grounded in Sunhub's documented image-sizing work, distinct in angle from the two existing broader performance articles.
  - `/insights/how-i-structure-react-applications-for-long-term-maintainability` (Engineering cluster) — a prescriptive "how I build" piece, deliberately distinct in intent from the two existing evaluative "how I judge an inherited codebase" articles.
  - All four verified live: correct cluster grouping on `/insights`, correct rendering of definition/sections/FAQ/sources/related-work/CTA, all reference URLs (Next.js docs, React docs, OWASP, MDN) checked live and correct for the current doc structure, all four automatically present in `sitemap.xml` and `llms.txt` with zero component changes (confirming the content-as-source-of-truth architecture works as designed).

`tsc --noEmit`, `eslint --max-warnings=0`, and `npm run build` all pass after every change in this log.

**Still open, on hold per the owner's decisions above:**
- Service page architecture unchanged (7 pages, as decided).
- No AussieMotor case study (as decided).
- Remaining content clusters from the original brief (further Performance/Engineering/Migration articles) not yet started — this batch was scoped as a small first pass, not the full ~20+.
- Mobile UX and full Lighthouse re-run still outstanding (see above).

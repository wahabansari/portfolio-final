/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SERVICE CATALOGUE — seven sellable services, one route each.
 *
 * This replaced a sixteen-service catalogue split across three categories. The
 * problem with that structure was not the work — all of it is real — it was
 * that it presented every capability at equal visual weight, so a buyer had no
 * way to tell what the primary offering was. Capabilities that are genuine but
 * not commercially central (WordPress, PWAs, email templates, generic n8n
 * automation) now live inside service pages and `byRequest` on /about, rather
 * than each owning a thin page of its own.
 *
 * Every page follows one anatomy, in this order:
 *   breadcrumb → eyebrow + h1 + value proposition → answer-first definition →
 *   who it is / is not for → the problem → what gets delivered → how the
 *   engagement runs → technical depth → proof → scope boundaries → FAQ → CTA
 *
 * That order is deliberate: it front-loads the answer for anyone scanning (a
 * reader or a generative-search system), states fit before pitch, and shows
 * proof before it asks for anything.
 *
 * WordPress → Next.js migration is its own service rather than a subsection of
 * the redesign page. Search Console shows it is already the strongest query
 * cluster this site has — Google associates the site with that exact problem
 * before almost anything else — so it gets the dedicated page, full FAQ and
 * migration-specific proof that signal warrants, instead of being folded into
 * a broader redesign page it would otherwise dominate.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Commercial grouping, used by the services mega-menu and the homepage tier
 * display. It is not a ranking — it says what kind of engagement each service
 * is, so a buyer scanning seven options can discard most of them in one pass.
 */
export type ServiceTier = "core" | "modernize" | "partnership";

export const TIER_LABEL: Record<ServiceTier, string> = {
  core: "Build & extend",
  modernize: "Modernize & migrate",
  partnership: "Partnership & specialist",
};

export type Service = {
  slug: string;
  /** H1-adjacent name, used in nav, cards and breadcrumbs. */
  title: string;
  /** Short label for tight spaces. */
  shortTitle: string;
  /**
   * The label above the H1. It states buyer value — what the engagement is —
   * never internal strategy. Labels like "highest search demand" describe my
   * keyword research to a reader who came here to solve a problem, which is
   * both useless to them and slightly odd to publish.
   */
  eyebrow: string;
  tier: ServiceTier;

  /* ── SEO ─────────────────────────────────────────────────────────────── */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];

  /* ── Page body ───────────────────────────────────────────────────────── */
  h1: string;
  subhead: string;
  /** One line, used on the services hub and homepage cards. */
  summary: string;
  /**
   * The answer-first block. One sentence that defines the service plainly
   * enough to be quoted out of context and still be correct.
   */
  definition: string;
  intro: string[];

  idealFor: string[];
  notIdealFor: string[];

  problems: { title: string; detail: string }[];
  deliverables: { title: string; detail: string }[];
  engagement: { step: string; detail: string }[];

  technical: { summary: string; groups: { label: string; items: string[] }[] };
  /** Scope boundaries, stated up front so they are not a negotiation later. */
  scope: { includes: string[]; excludes: string[] };

  /** Slugs from content/work.ts. Every service links to at least one. */
  proofSlugs: string[];
  faqs: { q: string; a: string }[];

  cta: { heading: string; body: string; primaryLabel: string };
};

export const services: Service[] = [

  /* ══════════════════════════════════════════════════════════════════════
     1 · FRONTEND PRODUCT ENGINEERING — primary
     ══════════════════════════════════════════════════════════════════════ */

  {
    slug: "frontend-product-engineering",
    title: "Frontend Product Engineering",
    shortTitle: "Frontend engineering",
    eyebrow: "Core offering",
    tier: "core",
    metaTitle: "Frontend Product Engineering with React & Next.js",
    metaDescription:
      "Production React and Next.js frontend development for SaaS products, dashboards, customer portals and business-critical web applications.",
    keywords: [
      "React development services",
      "Next.js development",
      "React developer",
      "Next.js developer",
      "frontend product engineering",
      "hire React developer",
    ],
    h1: "React and Next.js development for production web products",
    subhead:
      "I build responsive, maintainable frontend systems for SaaS products, dashboards, customer portals and business-critical web applications.",
    summary:
      "Production React and Next.js interfaces, reusable components, API integration and responsive product delivery.",
    definition:
      "Frontend product engineering is the implementation layer that turns product requirements and interface designs into responsive, API-connected web experiences that can be maintained as the product grows.",
    intro: [
      "This is the core service everything else here supports. Not a landing page and not a mockup — the actual application: routing, state, data fetching, forms, auth-gated areas, and the hundred small decisions that determine whether the codebase is still pleasant to work in a year from now.",
      "Five years of it, in production. The stack is React and Next.js with TypeScript, and the choices that matter get made deliberately: what renders on the server, what ships to the client, and where state actually belongs.",
    ],
    idealFor: [
      "You have a working product, designs or clear requirements, and need someone to own the frontend",
      "A React or Next.js application that has outgrown its original structure",
      "A Figma file that needs to become production UI, not another prototype",
      "A team with backend capacity but no dedicated frontend engineer",
      "A product where performance and maintainability have become real constraints",
    ],
    notIdealFor: [
      "Tiny one-off HTML or CSS edits with no broader engineering scope",
      "Work that needs a designer to originate the visual direction from nothing",
      "Projects where the requirements have not been thought about at all yet",
    ],
    problems: [
      {
        title: "Most React projects do not fail at the start",
        detail:
          "They fail around month four. State that began as one useState is threaded through nine components, every page ships the whole bundle because nothing was ever split, and nobody is sure which components are still used. The app still works — it has just become slow to change, which is the expensive kind of broken.",
      },
      {
        title: "The design lost something on the way into the browser",
        detail:
          "Spacing drifts, states that were designed are missing, and the responsive behaviour was improvised. Usually this is a handoff problem, not a skill problem — and it is why I read a Figma file as a specification rather than a picture.",
      },
      {
        title: "The frontend stops at the API boundary",
        detail:
          "Loading, empty, error and partial states get treated as edge cases and built last, if at all. In a real product they are most of what a user actually sees.",
      },
    ],
    deliverables: [
      {
        title: "New React and Next.js product interfaces",
        detail:
          "Whole surfaces built from the routing down: page structure, data flow, component boundaries and deployment.",
      },
      {
        title: "Figma to production implementation",
        detail:
          "Designs implemented as real UI, with the states the design implied — hover, focus, loading, empty, error — not just the frames that were drawn.",
      },
      {
        title: "Reusable component systems",
        detail:
          "A typed component library with real props and real variants, so the tenth screen is faster to build than the first rather than slower.",
      },
      {
        title: "Complex forms and API-driven workflows",
        detail:
          "Multi-step forms, validation, optimistic updates and error recovery — wired to your existing REST or API layer.",
      },
      {
        title: "Authentication and role-aware interfaces",
        detail:
          "Sign-in flows, protected routes and interfaces that change with the user's role, enforced server-side rather than hidden in the UI.",
      },
      {
        title: "Performance and Core Web Vitals work",
        detail:
          "Diagnosis against a measured baseline, then bundle, asset and rendering changes — with a second measurement to prove the change did what it claimed.",
      },
      {
        title: "Refactors for products that outgrew their structure",
        detail:
          "Incremental restructuring of a working application, delivered in shippable slices rather than as a rewrite that blocks feature work for a quarter.",
      },
    ],
    engagement: [
      {
        step: "Scope call",
        detail: "You send the product, repo or designs. We establish what needs to exist, what already does, and what the real constraint is.",
      },
      {
        step: "Technical plan",
        detail: "A written approach: architecture, rendering strategy, component boundaries, integration points and delivery order.",
      },
      {
        step: "Build in slices",
        detail: "Work lands in reviewable increments against your branch and your process, not as one drop at the end.",
      },
      {
        step: "Ship and hand over",
        detail: "Responsive and cross-browser verification, performance check, deployment, and documentation of anything non-obvious.",
      },
    ],
    technical: {
      summary:
        "TypeScript throughout. Rendering strategy chosen per route rather than by default, server state kept out of client state, and component boundaries drawn where the data changes — not where the layout does.",
      groups: [
        { label: "Core", items: ["React", "Next.js (App Router)", "TypeScript", "JavaScript (ES6+)"] },
        { label: "Data", items: ["REST / API integration", "Server-state patterns", "React Query or equivalent", "Caching and revalidation"] },
        { label: "Interface", items: ["Component libraries", "Tailwind CSS", "Material UI", "Mantine", "Ant Design", "Responsive systems"] },
        { label: "Forms & auth", items: ["React Hook Form", "Schema validation", "OAuth 2.0", "JWT", "Role-based access"] },
        { label: "Performance", items: ["Core Web Vitals", "Code splitting", "Lazy loading", "Image optimisation", "Bundle analysis"] },
        { label: "Delivery", items: ["Git / Bitbucket", "Jira", "CI/CD", "Vercel", "Docker"] },
      ],
    },
    scope: {
      includes: [
        "Frontend architecture, implementation and code review",
        "Integration against your existing API or backend",
        "Responsive and cross-browser behaviour",
        "Accessibility fundamentals: semantics, keyboard, focus, contrast",
        "Deployment and handover documentation",
      ],
      excludes: [
        "Backend and database work beyond agreed integration support",
        "Brand and visual identity design from scratch",
        "Ongoing content updates after handover, unless retained separately",
      ],
    },
    proofSlugs: ["sunhub", "verdira", "cennetsol"],
    faqs: [
      {
        q: "Can you work from Figma?",
        a: "Yes, and it is the usual starting point. The deliverable is production-ready UI rather than a static mockup — which means implementing the states the design implies as well as the frames that were drawn.",
      },
      {
        q: "Can you work with an existing backend?",
        a: "Yes. Most engagements integrate against an API layer that already exists. I do not require a rewrite of your backend to do frontend work, and I am comfortable working around an API I cannot change.",
      },
      {
        q: "Do you only build from scratch?",
        a: "No. Rebuilds, refactors and incremental feature delivery on an existing codebase are a normal part of the service — often the majority of it.",
      },
      {
        q: "React or Next.js — which should we use?",
        a: "Next.js when the product needs routing, server rendering, SEO or a mix of static and dynamic pages, which covers most products with a public surface. Plain React when it is a fully authenticated application behind a login and server rendering buys nothing. The decision is made once, early, because reversing it later is expensive.",
      },
      {
        q: "How do you handle handover?",
        a: "Code in your repository, in your branching model, reviewed through your process. Anything non-obvious — architecture decisions, integration points, environment configuration — is documented in the repo rather than living only in my head.",
      },
    ],
    cta: {
      heading: "Discuss a frontend project",
      body: "Send the product, the repo or the Figma file. I will reply with what I would build first, the approach I would take, and what I need in order to estimate it.",
      primaryLabel: "Discuss a frontend project",
    },
  },
  /* ══════════════════════════════════════════════════════════════════════
     2 · WEBSITE REDESIGN & REBUILD
     ══════════════════════════════════════════════════════════════════════ */

  {
    slug: "website-redesign-rebuild",
    title: "Website Redesign & Rebuild",
    shortTitle: "Redesign & rebuild",
    eyebrow: "Modernization",
    tier: "modernize",
    metaTitle: "Website Redesign & Rebuild Services",
    metaDescription:
      "Modernize outdated websites with clearer UX, responsive implementation, faster pages and conversion-focused frontend work.",
    keywords: [
      "website redesign",
      "conversion-focused website",
      "website UX redesign",
      "frontend redesign",
      "website rebuild",
    ],
    h1: "Modernize an outdated website into a faster, clearer experience",
    subhead:
      "I redesign and rebuild websites where the problem is not more pages — it is clearer messaging, stronger UX, faster delivery and a better path from visitor to action.",
    summary:
      "Clearer UX, responsive rebuilds, faster pages and conversion-focused frontend implementation.",
    definition:
      "A conversion-focused redesign is a rebuild that changes the structure and clarity of a website — what it says first, how it is organised and how fast it loads — rather than only its appearance.",
    intro: [
      "Most sites that need a redesign do not need more content. They need fewer, clearer decisions: what the offer is, who it is for, and what the visitor is supposed to do next. That is an information architecture problem before it is a visual one.",
      "The build half matters just as much. A redesign that arrives slower than the site it replaced has not improved anything, so performance is part of the work rather than a phase after it.",
    ],
    idealFor: [
      "A site that looks dated or inconsistent against how the business now presents itself",
      "A business whose offer is not clear within the first screen",
      "A site that is slow, overloaded or weak on mobile",
      "A WordPress site that has become hard to extend or maintain",
      "A team that wants a rebuild without changing their existing backend or CMS",
    ],
    notIdealFor: [
      "A cosmetic refresh where the structure and messaging cannot be touched",
      "Sites where the underlying offer has not been decided yet",
      "Work that is really a brand identity project rather than a web project",
    ],
    problems: [
      {
        title: "Visitors cannot quickly understand the offer",
        detail:
          "The homepage explains the company rather than the value, and the reader has to assemble the point from three sections. This is the single most common cause of a site that gets traffic and no enquiries.",
      },
      {
        title: "Important actions are buried",
        detail:
          "The primary action competes with five secondary ones, or sits below three sections nobody scrolls past. One dominant action per page fixes more than a new colour palette will.",
      },
      {
        title: "The mobile experience is an afterthought",
        detail:
          "The desktop layout was designed, and mobile was made to fit. When most of the traffic is mobile, that ordering is backwards.",
      },
      {
        title: "The site is slow or overloaded",
        detail:
          "Uncompressed hero images, render-blocking third-party scripts and a page that shifts while it loads. Speed is not a technical nicety here — it is the first thing a visitor experiences.",
      },
      {
        title: "The current site is hard to extend",
        detail:
          "Every new page needs a developer and a new layout. That is a structural problem, and it is why redesigns tend to be needed again two years later.",
      },
    ],
    deliverables: [
      { title: "Diagnosis", detail: "A written read of what is actually wrong: structure, messaging, UX, performance and the paths a visitor can take." },
      { title: "Information architecture", detail: "The page set, the hierarchy, and what each page is for — decided before anything is designed." },
      { title: "UI redesign", detail: "A visual system with real type, spacing and component rules, applied consistently rather than page by page." },
      { title: "Responsive implementation", detail: "Built mobile-first in Next.js or your existing stack, with behaviour verified across the breakpoint range." },
      { title: "Performance pass", detail: "Image strategy, script discipline, layout-shift removal and Core Web Vitals measured before and after." },
      { title: "Measurement handoff", detail: "Analytics and conversion events wired so the next decision is made from data rather than opinion." },
      { title: "CMS migration where it is warranted", detail: "When WordPress itself is the constraint rather than the design, that is a dedicated migration engagement with its own redirect and SEO-preservation process — see WordPress to Next.js Migration." },
    ],
    engagement: [
      { step: "Diagnosis", detail: "Review the current site against its goal, its analytics if available, and its technical baseline." },
      { step: "Structure", detail: "Agree the page set, the message hierarchy and the primary action per page before any design work." },
      { step: "Design and build", detail: "UI system, then responsive implementation, delivered page group by page group." },
      { step: "Performance and launch", detail: "Optimisation pass, redirect map, analytics verification, then go live." },
    ],
    technical: {
      summary:
        "Usually Next.js, statically rendered where the content allows it, on Vercel. When the content team is committed to an existing CMS, the frontend can be rebuilt against it rather than replacing it.",
      groups: [
        { label: "Build", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
        { label: "Content", items: ["Headless CMS integration", "WordPress", "Structured content models", "Redirect mapping"] },
        { label: "Performance", items: ["Core Web Vitals", "Image optimisation", "Layout-shift removal", "Third-party script control"] },
        { label: "Search", items: ["Semantic HTML", "Canonical URLs", "Structured data", "Sitemaps and robots"] },
        { label: "Measurement", items: ["Analytics setup", "Conversion events", "Search Console"] },
      ],
    },
    scope: {
      includes: [
        "Structure, messaging hierarchy and UX decisions",
        "Visual design system and responsive implementation",
        "Performance optimisation with before and after measurement",
        "Technical SEO baseline: canonicals, sitemap, redirects, structured data",
      ],
      excludes: [
        "Copywriting for the whole site, unless agreed as part of scope",
        "Paid media, ad campaigns or ongoing SEO retainers",
        "Guaranteed ranking positions or guaranteed conversion uplift",
      ],
    },
    proofSlugs: ["cennetsol", "aussiemotor", "sunhub"],
    faqs: [
      {
        q: "Will this increase our conversion rate?",
        a: "I will not promise a percentage, because an honest number requires a measured baseline and a measured post-launch result — and anyone quoting one before the work starts is guessing. What I will do is build around clearer conversion paths: one dominant action per page, the offer stated before the detail, and faster pages. Where you have analytics in place, we measure the before and after and find out.",
      },
      {
        q: "Can you rebuild the frontend without changing our backend?",
        a: "Yes. A frontend rebuild against an existing API or CMS is a common engagement, and it is usually the lower-risk option. Replacing the backend as well is a separate decision that should be made on its own merits.",
      },
      {
        q: "Will we lose our search rankings?",
        a: "Not if the migration is done properly. That means a URL-by-URL redirect map for anything that moves, canonical URLs preserved, content parity on the pages that rank, and Search Console monitored after launch. Rankings are lost in redesigns that skip this, not in redesigns as such.",
      },
      {
        q: "When should a website actually be redesigned?",
        a: "When the structure is the constraint — the offer is unclear, the important actions are buried, mobile is weak, the site is slow, or adding a page requires a developer every time. If those are all fine and it simply looks a few years old, a targeted refresh is usually a better use of the budget than a rebuild.",
      },
      {
        q: "Do you work with WordPress?",
        a: "Yes, in two ways: improving an existing WordPress site where the CMS is genuinely the right tool, and migrating off it to Next.js when it has become the thing holding the site back. If it's the second one, WordPress to Next.js Migration covers that process in full — redirect mapping, content parity and SEO preservation included. I will tell you which one I think applies before you commit to either.",
      },
    ],
    cta: {
      heading: "Request a redesign assessment",
      body: "Send the current site. I will reply with what I think is actually costing you conversions, what I would change first, and whether a redesign or a targeted fix is the better spend.",
      primaryLabel: "Request a redesign assessment",
    },
  },
  /* ══════════════════════════════════════════════════════════════════════
     3 · PERFORMANCE ENGINEERING
     ══════════════════════════════════════════════════════════════════════ */

  {
    slug: "performance-engineering",
    title: "Performance Engineering",
    shortTitle: "Performance",
    eyebrow: "Measured, not promised",
    tier: "modernize",
    metaTitle: "React & Next.js Performance Engineering",
    metaDescription:
      "Diagnose and fix slow React and Next.js applications — Core Web Vitals, bundle size, rendering strategy and asset delivery, measured before and after.",
    keywords: [
      "React performance optimization",
      "Next.js performance",
      "Core Web Vitals optimization",
      "frontend performance engineering",
      "improve LCP",
      "reduce bundle size",
    ],
    h1: "Diagnose and fix slow React and Next.js experiences",
    subhead:
      "I find what is actually making your frontend slow, fix it in isolated changes, and measure the result against the baseline it started from.",
    summary:
      "Core Web Vitals diagnosis and repair on production React and Next.js applications, measured before and after.",
    definition:
      "Performance engineering is diagnosing why a specific application is slow — measuring a real baseline, identifying the causes in order of impact, fixing them in isolated changes and re-measuring — rather than applying a generic list of optimisations and hoping.",
    intro: [
      "Almost every slow frontend is slow for its own reasons. A generic optimisation checklist applied without a diagnosis fixes whichever items happen to overlap with the real causes and leaves the rest, which is why performance work so often produces a lot of activity and very little measured change.",
      "This is the service behind the one measured figure on this site: a 30% Core Web Vitals improvement on Sunhub, a production React marketplace. The process below is the one that produced it, and the case study documents what actually changed.",
    ],
    idealFor: [
      "A production React or Next.js application that has become measurably slow",
      "Core Web Vitals failing in the field, or a Search Console warning that started it",
      "A bundle that has grown quietly across years of feature delivery",
      "An interface that feels fast on a developer laptop and slow on real devices",
      "A team that needs the improvement attributable, not just asserted",
    ],
    notIdealFor: [
      "Sites where the real constraint is backend or database response time",
      "A brand-new build with no users and no measured problem yet",
      "Work where a specific score is required as a contractual guarantee",
    ],
    problems: [
      {
        title: "Optimising without a baseline",
        detail:
          "If nobody recorded where the application started, nobody can say whether the work helped — and the improvement becomes a matter of opinion. Measurement first is not process theatre; it is the only thing that makes the result checkable.",
      },
      {
        title: "The bottleneck is not where the team assumed",
        detail:
          "Most \"React is slow\" reports turn out to be network and asset problems rather than render problems. Reaching for memoisation before opening the network panel is how a week disappears into micro-optimisation that changes nothing a user can feel.",
      },
      {
        title: "Five fixes shipped at once",
        detail:
          "Batching changes tells you the total and hides which one mattered — and if one of them regressed something else, it cannot be isolated or reversed without unpicking all five.",
      },
    ],
    deliverables: [
      {
        title: "A measured baseline",
        detail:
          "Lab and, where traffic allows, field data captured before any change — so every claim afterwards has something to be measured against.",
      },
      {
        title: "A ranked diagnosis",
        detail:
          "What is actually causing the slowness, ordered by impact rather than by how easy it is to fix. You get this in writing whether or not the work continues.",
      },
      {
        title: "Bundle and dependency work",
        detail:
          "Dead code and unused assets removed, duplicate dependencies resolved, and import boundaries tightened so tree-shaking actually takes effect.",
      },
      {
        title: "Rendering strategy corrections",
        detail:
          "Server, static and client rendering applied per route according to what the route needs, rather than whatever the app defaulted into early on.",
      },
      {
        title: "Asset and font delivery",
        detail:
          "Images compressed and served at display size, loading boundaries drawn at the first meaningful render, and fonts that no longer block text from painting.",
      },
      {
        title: "Third-party script audit",
        detail:
          "What is actually loading on the page — including the tags nobody on the engineering team added — and an honest read on what each one costs.",
      },
      {
        title: "A second measurement",
        detail:
          "The same instrumentation, run again after the work, with the delta attributable to specific changes rather than to the engagement as a whole.",
      },
    ],
    engagement: [
      {
        step: "Measure",
        detail:
          "Capture the baseline: bundle composition, request waterfall, render profile, asset weights and field data where it exists.",
      },
      {
        step: "Diagnose",
        detail:
          "Turn the measurements into a ranked list of causes, with an estimate of what fixing each one is likely to be worth.",
      },
      {
        step: "Fix in isolation",
        detail:
          "Changes land one at a time where that is practical, so each one's effect is attributable and individually reversible.",
      },
      {
        step: "Re-measure",
        detail:
          "The same tests, run again, with the before and after recorded — including anything that did not move as expected.",
      },
      {
        step: "Protect the result",
        detail:
          "Where it is wanted, a performance budget enforced in CI so the next regression fails a build instead of being discovered in production.",
      },
    ],
    technical: {
      summary:
        "Diagnosis-led and framework-honest. Most of the work is removal rather than addition — the cheapest asset is the one that is not shipped — and the measurement either side of each change is what separates this from a list of tips.",
      groups: [
        { label: "Measurement", items: ["Core Web Vitals", "Lighthouse", "Chrome UX Report", "React Profiler", "Bundle analysis"] },
        { label: "Delivery", items: ["Code splitting", "Lazy loading", "Tree-shaking", "Caching strategy", "CDN behaviour"] },
        { label: "Rendering", items: ["Server components", "Static generation", "Streaming", "Hydration cost"] },
        { label: "Assets", items: ["Image optimisation", "Responsive images", "Font loading", "Third-party script control"] },
      ],
    },
    scope: {
      includes: [
        "Baseline measurement and a written, ranked diagnosis",
        "Frontend fixes across bundle, rendering, assets and third-party scripts",
        "A second measurement attributing the change",
        "Optional CI performance budget to prevent regression",
      ],
      excludes: [
        "Backend, database or infrastructure performance beyond frontend impact",
        "Guaranteed Lighthouse scores — a score depends on conditions neither of us controls",
        "Ongoing monitoring retainers, unless agreed separately",
      ],
    },
    proofSlugs: ["sunhub", "verdira", "cennetsol"],
    faqs: [
      {
        q: "Can you guarantee a specific Lighthouse score?",
        a: "No, and I would treat any such guarantee with suspicion. A score varies with the device, the network and the test conditions, and part of it depends on things outside the frontend entirely. What I will commit to is a measured baseline, a ranked diagnosis and a second measurement — so the change is attributable, whatever the number ends up being.",
      },
      {
        q: "What if the real problem turns out to be the backend?",
        a: "Then that is the finding, and you get it early rather than after a frontend engagement that could not have fixed it. Slow API responses put a floor under every frontend metric; I will say so plainly and tell you what is still worth doing on the frontend, which is sometimes less than you were expecting.",
      },
      {
        q: "How long before we see a result?",
        a: "The baseline and diagnosis are quick — usually the first thing delivered. How long the fixes take depends entirely on what the diagnosis finds: removing dead weight from a bundle is fast, while correcting a rendering strategy applied inconsistently across an entire app is a structural piece of work. The diagnosis is what makes that estimate real rather than a guess.",
      },
      {
        q: "Do you work on sites that are not React or Next.js?",
        a: "The measurement and diagnosis translate to any stack, but the implementation work here is React and Next.js. If the diagnosis points at something outside that, I will tell you what it found and hand it over rather than working outside what I do well.",
      },
      {
        q: "What is the 30% figure on Sunhub, precisely?",
        a: "An aggregate improvement measured before the optimisation work began and again after it shipped, on a production React marketplace. It is not a claim about one specific Core Web Vital, and I have deliberately not published per-metric numbers I cannot show the workings for. The case study lists exactly what changed.",
      },
    ],
    cta: {
      heading: "Request a performance assessment",
      body: "Send the site or app. I will tell you what I think is actually causing the slowness and what the measured baseline looks like, before proposing any work.",
      primaryLabel: "Request a performance assessment",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     4 · WORDPRESS → NEXT.JS MIGRATION — flagship SEO asset
     ══════════════════════════════════════════════════════════════════════ */

  {
    slug: "wordpress-to-nextjs-migration",
    title: "WordPress to Next.js Migration",
    shortTitle: "WP → Next.js migration",
    eyebrow: "SEO-safe migration",
    tier: "modernize",
    metaTitle: "WordPress to Next.js Migration Services",
    metaDescription:
      "Migrate WordPress websites to Next.js with SEO preservation, redirects, content migration and performance-focused implementation.",
    keywords: [
      "WordPress to Next.js migration",
      "WordPress to Next.js migration services",
      "migrate WordPress to Next.js",
      "WordPress to Next.js migration agency",
      "headless WordPress migration",
      "Next.js migration SEO",
    ],
    h1: "Migrate WordPress to Next.js without losing SEO or content",
    subhead:
      "I move WordPress sites onto Next.js with a URL-by-URL redirect map, content parity and indexation checks — so the rankings the site already has survive the move.",
    summary:
      "WordPress to Next.js migrations with SEO preservation as an explicit deliverable, not an afterthought.",
    definition:
      "A WordPress to Next.js migration is a rebuild of the frontend and content-delivery layer onto Next.js that preserves every URL, redirect, ranking signal and piece of indexed content the WordPress site already earned, while replacing the parts of WordPress that had become the constraint.",
    intro: [
      "Most migrations that lose rankings do not lose them to Next.js. They lose them to a redirect map nobody wrote, a canonical that pointed at the wrong host for three weeks, or structured data that quietly stopped rendering. The framework change is the easy part — protecting what the old site already earned is the actual engineering problem.",
      "I have done this migration as part of a team, on a large automotive marketplace moving off WordPress onto Next.js — not a theoretical process, a shipped one. The scope below is what that kind of move actually requires, in order.",
    ],
    idealFor: [
      "A WordPress site with real organic rankings you cannot afford to lose",
      "A site that has become slow, plugin-fragile or expensive to maintain on WordPress",
      "Content editors who need to keep publishing through the migration, not stop for months",
      "A marketing or content team staying on WordPress as a CMS, with Next.js taking over rendering",
      "A business that has outgrown what WordPress themes and page builders can reliably deliver",
    ],
    notIdealFor: [
      "A WordPress site that is working fine, with no performance, maintainability or scaling problem",
      "A migration wanted purely because Next.js is newer, with no underlying problem to solve",
      "Sites with no meaningful organic traffic to protect, where a simpler rebuild fits better",
    ],
    problems: [
      {
        title: "The redirect map is treated as a checkbox, not an inventory",
        detail:
          "Every indexed URL on the old site needs an explicit, tested destination — not a blanket wildcard rule that happens to catch most of them. \"Most\" is where rankings go to die; the pages that fall through a wildcard are exactly the ones nobody thought to check.",
      },
      {
        title: "Content and structured data quietly stop matching",
        detail:
          "A WordPress page templated by a theme or SEO plugin often carries schema, metadata and internal links the migration team never sees explicitly — it just exists. Rebuilding the template without auditing what it was actually emitting is how a site loses rich results it did not know it had.",
      },
      {
        title: "The cutover has no rollback plan",
        detail:
          "A migration that goes live in one uncontrolled jump makes a mistake expensive to notice — by the time a Search Console spike shows up, a week of crawl budget is already gone. A staged, monitored cutover is what keeps a mistake cheap instead of expensive.",
      },
    ],
    deliverables: [
      {
        title: "Full URL inventory and redirect map",
        detail:
          "Every indexed and internally linked URL from the WordPress site, mapped to its exact Next.js destination — not a generic pattern rule.",
      },
      {
        title: "Content and media migration",
        detail:
          "Posts, pages, custom post types and media moved into the new structure with their content, metadata and internal links intact.",
      },
      {
        title: "Structured data parity",
        detail:
          "Whatever schema the WordPress theme or SEO plugin was emitting — Article, Organization, breadcrumbs — reimplemented deliberately in the new templates, not dropped by omission.",
      },
      {
        title: "Canonical, sitemap and robots reconfiguration",
        detail:
          "One preferred host, self-canonical indexable pages, an accurate sitemap and a robots.txt that allows the crawling the migration depends on.",
      },
      {
        title: "Performance rebuild",
        detail:
          "Image optimisation, rendering strategy and script discipline — the reason to migrate in the first place, delivered alongside the SEO preservation work rather than after it.",
      },
      {
        title: "Staged, monitored cutover",
        detail:
          "DNS and redirect activation staged so status codes, canonicals and rendered content are checked before and after go-live, not discovered afterwards.",
      },
      {
        title: "Post-launch indexation monitoring",
        detail:
          "URL Inspection on priority pages, a check for crawl errors, and a defined response if anything needs a recrawl request.",
      },
    ],
    engagement: [
      {
        step: "Audit",
        detail:
          "Full crawl and export of the existing WordPress site: URLs, content, structured data, redirects already in place and current indexation status.",
      },
      {
        step: "Migration plan",
        detail:
          "The redirect map, the content model in Next.js, what stays on WordPress as a CMS if anything does, and the cutover sequence — written down before any code changes.",
      },
      {
        step: "Build in parallel",
        detail:
          "The Next.js site is built and content-migrated against the live WordPress site, so the current site's uptime and rankings are unaffected while the work happens.",
      },
      {
        step: "Staged cutover",
        detail:
          "DNS and redirects go live in a controlled sequence, with status codes, canonicals and rendered content verified at each stage rather than assumed.",
      },
      {
        step: "Monitor and stabilise",
        detail:
          "Search Console watched closely in the weeks after launch — indexation, crawl errors and ranking movement — with fast fixes if anything needs one.",
      },
    ],
    technical: {
      summary:
        "Next.js on Vercel is the default target. Where a content team needs to keep editing without a developer, WordPress can stay as a headless CMS behind the new frontend rather than being replaced outright — that decision gets made explicitly during the audit, not assumed.",
      groups: [
        { label: "Migration", items: ["URL inventory", "301 redirect mapping", "Content migration", "Media migration", "Structured data parity"] },
        { label: "Build", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
        { label: "CMS", items: ["Headless WordPress (optional)", "WP REST API / WPGraphQL", "Structured content models"] },
        { label: "Search", items: ["Canonical URLs", "XML sitemaps", "Robots.txt", "Search Console monitoring"] },
        { label: "Performance", items: ["Core Web Vitals", "Image optimisation", "Rendering strategy", "Third-party script control"] },
      ],
    },
    scope: {
      includes: [
        "Full URL inventory, redirect map and cutover plan",
        "Content, media and structured-data migration",
        "Canonical, sitemap and robots reconfiguration",
        "Performance rebuild alongside the migration",
        "Post-launch indexation monitoring for an agreed period",
      ],
      excludes: [
        "Copywriting or content strategy beyond migrating what already exists",
        "Guaranteed ranking positions after migration — no honest engineer offers one",
        "Ongoing WordPress plugin or theme maintenance after cutover, unless retained separately",
      ],
    },
    proofSlugs: ["aussiemotor", "cennetsol", "sunhub"],
    faqs: [
      {
        q: "Can WordPress be migrated to Next.js without losing SEO?",
        a: "Yes, if the migration treats SEO preservation as a deliverable rather than a hope. That means every indexed URL gets an explicit redirect, canonicals and structured data are rebuilt to match what the old templates emitted, and indexation is monitored after launch rather than assumed. Rankings are lost by migrations that skip these steps, not by the framework change itself.",
      },
      {
        q: "How are redirects handled?",
        a: "Every URL from the WordPress site is inventoried — from the sitemap, from Search Console, and from a crawl — and mapped to its exact destination on the new site with a 301. Wildcard or pattern-based redirects are used only where they genuinely apply; anything that needs a specific destination gets one.",
      },
      {
        q: "What actually gets migrated?",
        a: "Content, media, structured data, redirects, canonical relationships, metadata and internal linking. If the content team needs to keep publishing on WordPress after the move, it can stay in place as a headless CMS behind the Next.js frontend — that is a scope decision made during the audit, not assumed by default.",
      },
      {
        q: "How long does a migration take?",
        a: "It depends on the size of the site and how much content and structured data needs auditing before it can be mapped — a small brochure site and a large content archive are different engagements. The audit phase produces a real estimate once the actual scope is visible, rather than a number quoted before anyone has looked at the site.",
      },
      {
        q: "Do we lose the ability to edit content ourselves?",
        a: "Not if that matters to you. Keeping WordPress as a headless CMS behind the new frontend is a legitimate option for teams who need to keep publishing without a developer — it gets discussed at the audit stage rather than decided for you.",
      },
      {
        q: "What if something breaks after launch?",
        a: "The cutover is staged and monitored, not a single uncontrolled jump — status codes, canonicals and rendered content are checked at each stage. Search Console is watched closely for a defined period after go-live specifically so a problem is caught in days, not discovered a month later in a traffic report.",
      },
    ],
    cta: {
      heading: "Request a migration assessment",
      body: "Send the current WordPress site. I will come back with a real read of what the migration involves — the redirect map size, what structured data needs rebuilding, and a scoped estimate rather than a guess.",
      primaryLabel: "Request a migration assessment",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     5 · AGENCY / WHITE-LABEL FRONTEND
     ══════════════════════════════════════════════════════════════════════ */

  {
    slug: "agency-frontend-development",
    title: "Agency / White-Label Frontend",
    shortTitle: "Agency partnership",
    eyebrow: "Under your brand",
    tier: "partnership",
    metaTitle: "White-Label React & Next.js Development for Agencies",
    metaDescription:
      "Reliable white-label React and Next.js delivery for agencies that need extra frontend engineering capacity.",
    keywords: [
      "white label frontend developer",
      "agency frontend developer",
      "React development partner",
      "Next.js agency partner",
      "outsourced frontend development",
      "Figma to React",
    ],
    h1: "Extend your agency's frontend delivery without hiring",
    subhead:
      "I help agencies deliver React and Next.js projects when the client is already sold but internal engineering capacity is full, stretched or specialised elsewhere.",
    summary:
      "Reliable React and Next.js delivery for agencies that need extra engineering capacity.",
    definition:
      "White-label frontend development is delivery capacity an agency can sell as its own: the agency keeps the client relationship, the brand and the process, and an external engineer implements the work inside them.",
    intro: [
      "You sell the relationship. I provide the implementation. That is the whole arrangement, and it works because it does not ask either side to change how they operate.",
      "The practical value is not cheaper hours — it is not having to turn down work, or hire permanently against a pipeline that has not proven it is permanent.",
    ],
    idealFor: [
      "Design and branding agencies without in-house React capacity",
      "Development agencies whose team is committed and whose pipeline is not",
      "Agencies who need Figma implemented accurately, not approximately",
      "Teams that need a partner able to work under NDA and inside their process",
      "Agencies wanting extra capacity without a permanent hire",
    ],
    notIdealFor: [
      "Arrangements where I would need to hold the client relationship",
      "Work with no defined design direction or requirements at all",
      "Engagements that are really a full-time role in a different shape",
    ],
    problems: [
      {
        title: "The work is sold and the capacity is not there",
        detail:
          "The proposal is signed, the timeline is agreed, and the team is committed to two other builds. Turning it down costs the client relationship; hiring for it costs more than the project.",
      },
      {
        title: "The design does not survive implementation",
        detail:
          "The build comes back approximately right — spacing drifted, states missing, responsive behaviour improvised — and the design team spends a week in review getting it back to the file.",
      },
      {
        title: "A permanent hire against a temporary pipeline",
        detail:
          "Frontend demand arrives in waves. Hiring for the peak means carrying the cost through the trough, and hiring after the peak means missing it.",
      },
    ],
    deliverables: [
      { title: "Figma to React / Next.js", detail: "Accurate implementation of the design file, including the states and responsive behaviour it implies." },
      { title: "Existing product frontend work", detail: "Feature delivery and maintenance on a client codebase you already hold." },
      { title: "Responsive implementation", detail: "Verified across the breakpoint range, not just at the three widths in the design file." },
      { title: "Component systems", detail: "A reusable library your team can extend after I hand it over." },
      { title: "API integration", detail: "Wiring to your backend, the client's backend, or a headless CMS." },
      { title: "Performance and frontend cleanup", detail: "Rescue work on a build that shipped and is now slow or hard to change." },
      { title: "White-label delivery", detail: "Your brand, your repository, your process, your client. NDA-friendly by default." },
    ],
    engagement: [
      { step: "Fit call", detail: "Your process, your stack, your timelines. Establish whether this is a project engagement or ongoing capacity." },
      { step: "Project scope", detail: "Per-project scope and estimate, so you can price the client work with a known cost." },
      { step: "Delivery inside your process", detail: "Your repo, your branching model, your project management tool, your review cadence." },
      { step: "Handover", detail: "Documented and reviewable, so your team owns it afterwards rather than depending on me." },
    ],
    technical: {
      summary:
        "I work in your stack and your conventions rather than importing mine. Where there is no established convention, I will propose one and document it rather than leave the next developer guessing.",
      groups: [
        { label: "Core", items: ["React", "Next.js", "TypeScript", "JavaScript"] },
        { label: "Styling", items: ["Tailwind CSS", "SASS", "Material UI", "Mantine", "Ant Design", "Styled components"] },
        { label: "Integration", items: ["REST APIs", "Headless CMS", "WordPress", "Firebase", "Authentication"] },
        { label: "Process", items: ["Git / Bitbucket", "Jira", "Code review", "CI/CD", "NDA-friendly workflows"] },
      ],
    },
    scope: {
      includes: [
        "Implementation under your brand and inside your process",
        "Direct collaboration with your designers and project managers",
        "NDA and white-label delivery as the default arrangement",
        "Documented handover so your team can maintain the work",
      ],
      excludes: [
        "Holding the client relationship or client-facing account management",
        "Originating visual design direction, unless agreed separately",
        "Exclusivity, unless it is contracted as a retained arrangement",
      ],
    },
    proofSlugs: ["sunhub", "aussiemotor", "cennetsol"],
    faqs: [
      {
        q: "How does white-label frontend development work in practice?",
        a: "You keep the client relationship, the contract and the brand. I work inside your repository, your project management tool and your review process, and appear to the client as part of your team or not at all — whichever you prefer. Scope and estimates come to you, not to them.",
      },
      {
        q: "Can you work under our NDA?",
        a: "Yes, and it is the default assumption. Client work delivered this way does not appear in my portfolio unless you explicitly agree to it.",
      },
      {
        q: "What handoff do you need to start?",
        a: "The design file with the states you expect implemented, API documentation or endpoints, repository access with your branching conventions, and one named person who can answer questions. Missing that last one delays projects more than anything technical.",
      },
      {
        q: "Project work or ongoing capacity?",
        a: "Both. Project engagements are scoped and estimated individually. Ongoing capacity is a recurring allocation you can plan your pipeline against — which tends to suit agencies with steady frontend demand better than repeatedly scoping small builds.",
      },
      {
        q: "How do you price agency work?",
        a: "Per project where the scope is clear enough to fix, and on a retained allocation where it is not. Either way you get the number before you quote your client, so your margin is known rather than discovered.",
      },
    ],
    cta: {
      heading: "Discuss an agency partnership",
      body: "Tell me what is in your pipeline and where the capacity gap is. I will come back with how I would slot into your process and what it would cost you per project.",
      primaryLabel: "Discuss an agency partnership",
    },
  },
  /* ══════════════════════════════════════════════════════════════════════
     6 · SAAS & MVP PRODUCT DEVELOPMENT
     ══════════════════════════════════════════════════════════════════════ */

  {
    slug: "saas-product-development",
    title: "SaaS & MVP Product Development",
    shortTitle: "SaaS & MVP",
    eyebrow: "Idea to production",
    tier: "core",
    metaTitle: "SaaS & MVP Development with React & Next.js",
    metaDescription:
      "Build customer-facing SaaS products, dashboards and MVPs with React, Next.js and production-ready frontend architecture.",
    keywords: [
      "SaaS development",
      "SaaS MVP development",
      "React SaaS developer",
      "Next.js SaaS development",
      "MVP development",
      "product development",
    ],
    h1: "Build your SaaS product from idea to production",
    subhead:
      "I turn validated product requirements into usable web applications — from the first dashboard and auth flow to API-connected features and production deployment.",
    summary:
      "Customer-facing SaaS products, dashboards, authentication and end-to-end feature delivery.",
    definition:
      "An MVP is the smallest version of a product that lets a real user complete the one workflow the product exists for, built well enough that the next version extends it instead of replacing it.",
    intro: [
      "The failure mode in MVP work is not building too little. It is building a settings page, a billing tier, an admin panel and a notification system before anyone has confirmed that the core workflow is worth using.",
      "So the scope question comes first: what is the one thing a user must be able to do, and what is the shortest honest path to them doing it in production. Everything else is a later decision made with better information.",
    ],
    idealFor: [
      "A clearly defined workflow that needs to become a working product",
      "A founder or team with validated requirements and no frontend engineer",
      "An internal tool that has outgrown a spreadsheet or a no-code stack",
      "A product with a backend or API already in progress that needs its interface built",
      "A first paid version that has to be solid enough to charge for",
    ],
    notIdealFor: [
      "An idea that has not been narrowed to a specific workflow yet",
      "Products needing a large backend build with no backend team involved",
      "Anything where the expectation is a full platform in a fortnight",
    ],
    problems: [
      {
        title: "Scope expands faster than the product ships",
        detail:
          "Every conversation adds a feature, the launch date moves, and the thing that was supposed to test an assumption never reaches a user. The fix is a scope boundary agreed in writing before the build starts.",
      },
      {
        title: "The MVP is built as a throwaway",
        detail:
          "So when it works, there is nothing to build on and the second version is a rewrite. Minimal in scope does not have to mean disposable in architecture — and the difference costs very little at the start.",
      },
      {
        title: "The product UI is treated as decoration",
        detail:
          "In a SaaS product the interface is the product. Empty states, loading behaviour, error recovery and the first-run experience are what determine whether someone comes back, not the feature list.",
      },
    ],
    deliverables: [
      { title: "Product UI architecture", detail: "Routing, layout system, navigation model and the component boundaries the rest of the build fits into." },
      { title: "Next.js / React application build", detail: "The application itself, in TypeScript, structured by feature so it can grow past the MVP." },
      { title: "Authentication and role-based access", detail: "Sign-up, sign-in, session handling and permissions enforced on the server." },
      { title: "Dashboards, forms and workflows", detail: "The screens where the product actually gets used, including the states that are not the happy path." },
      { title: "API integration", detail: "Wiring to your backend, or coordination with your backend team on the contract between us." },
      { title: "Production deployment", detail: "Environments, CI/CD and a deployment you can ship from repeatedly, not once." },
      { title: "An iteration loop", detail: "Analytics on the core workflow, so the next build decision comes from usage rather than opinion." },
    ],
    engagement: [
      { step: "Define the workflow", detail: "Name the single workflow the MVP exists to prove, and write down what is explicitly out of scope." },
      { step: "Shape the build", detail: "Screens, data model touchpoints, auth requirements and the delivery order that gets something usable soonest." },
      { step: "Build to usable", detail: "Ship the core path end to end first — a working narrow product beats four half-built features." },
      { step: "Launch and learn", detail: "Deploy, instrument the core workflow, and decide version two from what the data says." },
    ],
    technical: {
      summary:
        "Next.js and TypeScript, structured by feature. Auth and access control enforced server-side. Where the backend is someone else's, the API contract gets agreed early and in writing, because that boundary is where MVP timelines usually go wrong.",
      groups: [
        { label: "Application", items: ["Next.js (App Router)", "React", "TypeScript", "Feature-based architecture"] },
        { label: "Auth", items: ["OAuth 2.0", "JWT", "Session handling", "Role-based access control", "Protected routing"] },
        { label: "Data", items: ["REST APIs", "Server-state patterns", "PostgreSQL", "MongoDB", "Prisma", "Drizzle"] },
        { label: "Interface", items: ["Dashboards", "Complex forms", "Tables and filtering", "Empty and error states"] },
        { label: "Operations", items: ["Vercel", "CI/CD", "Docker", "Environment management", "Analytics instrumentation"] },
      ],
    },
    scope: {
      includes: [
        "Frontend application build, end to end",
        "Authentication, protected areas and role-aware interfaces",
        "API integration, and coordination with your backend team",
        "Deployment pipeline and production launch",
      ],
      excludes: [
        "A full backend build without a backend engineer involved",
        "Payment provider compliance, contracts or legal setup",
        "Open-ended feature development outside the agreed MVP scope",
      ],
    },
    proofSlugs: ["verdira", "sunhub", "vape-planet"],
    faqs: [
      {
        q: "What actually belongs in an MVP?",
        a: "One workflow, done properly, with authentication if the product needs identity, and the states around that workflow — empty, loading, error, first run. What does not belong: settings pages nobody has asked for, admin panels before there are users to administer, and billing tiers before anyone has agreed to pay.",
      },
      {
        q: "Can you build any SaaS product?",
        a: "No, and I would be careful of anyone who says yes. What I build well is a focused MVP around a clearly defined workflow — the frontend, the auth, the dashboards and the integration. A product needing a large custom backend needs a backend engineer alongside me, and I will say so at the scope call rather than halfway through.",
      },
      {
        q: "How do you avoid overbuilding?",
        a: "By writing the out-of-scope list at the same time as the scope list, and treating additions as a decision with a cost rather than a small favour. The out-of-scope list is not a refusal — it is a record of what version two is for.",
      },
      {
        q: "We have a backend team. How does that work?",
        a: "Well, usually. We agree the API contract early — endpoints, shapes, error semantics — and I build against it, with mocked responses if the endpoints are not ready. The most common cause of MVP delay is that boundary being left vague, so it gets settled first.",
      },
      {
        q: "Will the MVP have to be rewritten later?",
        a: "It should not. Minimal scope and disposable architecture are different things, and the second one is a choice. Typed code, feature boundaries and server-enforced auth cost very little at the start and are what let version two extend the codebase rather than replace it.",
      },
    ],
    cta: {
      heading: "Discuss an MVP",
      body: "Tell me the workflow the product exists for and who it is for. I will reply with what I would put in version one, what I would leave out, and why.",
      primaryLabel: "Discuss an MVP",
    },
  },
  /* ══════════════════════════════════════════════════════════════════════
     7 · AI PRODUCT INTEGRATION
     ══════════════════════════════════════════════════════════════════════ */

  {
    slug: "ai-product-integration",
    title: "AI Product Integration",
    shortTitle: "AI integration",
    eyebrow: "Practical AI features",
    tier: "partnership",
    metaTitle: "AI Product Integration with React & Next.js",
    metaDescription:
      "Integrate useful AI capabilities into real web products with practical frontend and product engineering.",
    keywords: [
      "AI product development",
      "AI integration",
      "AI web application",
      "LLM integration",
      "retrieval augmented generation",
      "AI UX",
    ],
    h1: "Add useful AI capabilities to your existing product",
    subhead:
      "I integrate useful AI capabilities into web applications — from assistants and retrieval-based interfaces to structured workflows that connect model output to the product your users already have.",
    summary:
      "Practical AI features integrated into real web products — not AI for its own sake.",
    definition:
      "AI product integration is adding model-driven features to an existing web product — search, assistants, generation or classification — grounded in a defined source of truth, with fallbacks for when the model is wrong.",
    intro: [
      "The interesting engineering in an AI feature is rarely the model call. It is everything around it: where the grounding data comes from, what the interface does while it waits, what it shows when the answer is wrong, and where a human re-enters the loop.",
      "This is a supporting specialisation rather than the headline. I am a frontend product engineer who integrates AI into products — not an ML engineer, and I will tell you when a problem needs one.",
    ],
    idealFor: [
      "An existing product where a specific AI feature would remove real friction",
      "Documentation, catalogues or knowledge bases that need genuinely good search",
      "A defined support or onboarding use case suitable for an assistant",
      "Content or data workflows that would benefit from a first pass plus human review",
      "Teams who want AI in the product and want it grounded rather than improvised",
    ],
    notIdealFor: [
      "Adding AI because it should be there, with no defined use case",
      "Training or fine-tuning custom models — that needs an ML engineer",
      "Assistants expected to give authoritative advice in regulated domains",
    ],
    problems: [
      {
        title: "The feature is ungrounded, so it is untrustworthy",
        detail:
          "A model answering from general knowledge about your specific product will be confidently wrong often enough to cost you more support tickets than it saves. Grounding it in your actual content is the difference between a feature and a liability.",
      },
      {
        title: "The interface ignores that the model can be wrong",
        detail:
          "No citation, no confidence signal, no way to escalate to a person. Users trust it once, get burned, and never use it again — which is a worse outcome than not shipping it.",
      },
      {
        title: "Latency was not designed for",
        detail:
          "A spinner over a blank panel for eight seconds reads as broken. Streaming, progressive disclosure and honest progress states are part of the feature, not polish on top of it.",
      },
    ],
    deliverables: [
      { title: "AI-assisted search and knowledge experiences", detail: "Search over your own content that answers the question rather than returning ten links to it." },
      { title: "LLM and API integration inside existing products", detail: "Model calls wired into your application with the error handling, rate limiting and cost controls a production feature needs." },
      { title: "Customer-facing assistants", detail: "Where the use case is well defined and the knowledge base is real — scoped deliberately narrow." },
      { title: "Retrieval-based interfaces", detail: "Answers grounded in a client knowledge base, with sources shown so a user can verify them." },
      { title: "Content and data workflows with human review", detail: "The model does the first pass, a person approves it, and the approval is part of the system rather than a convention." },
      { title: "AI interface design", detail: "Streaming states, citations, confidence signals, graceful fallbacks and a clear handoff to a human." },
      { title: "Workflow automation", detail: "n8n and API integrations that connect the tools you already run, where a model is one step rather than the point." },
    ],
    engagement: [
      { step: "Define the use case", detail: "One specific job the feature does, and what a good answer looks like — stated concretely enough to test." },
      { step: "Establish the ground truth", detail: "What the feature is allowed to answer from, and how that source stays current." },
      { step: "Build the loop", detail: "Retrieval, model call, interface states and fallback path, built as one feature rather than three." },
      { step: "Evaluate honestly", detail: "Test against real questions including the ones it should refuse, then set the boundaries from what you find." },
    ],
    technical: {
      summary:
        "Integration-level work: API-driven models, retrieval over your own content, and the interface layer around both. Model training and fine-tuning are outside what I offer, and I will say so rather than take the work.",
      groups: [
        { label: "Integration", items: ["LLM / model APIs", "Gemini API", "Streaming responses", "Rate limiting and cost control"] },
        { label: "Retrieval", items: ["Retrieval-based interfaces", "Knowledge base structuring", "Source citation", "Content freshness"] },
        { label: "Interface", items: ["Streaming UI states", "Citations and sources", "Fallback and refusal states", "Human handoff"] },
        { label: "Workflow", items: ["n8n workflow automation", "REST integrations", "Human-review steps", "Scheduled pipelines"] },
      ],
    },
    scope: {
      includes: [
        "Feature scoping against a defined, testable use case",
        "Integration, retrieval and the full interface layer",
        "Fallback behaviour and human handoff paths",
        "Honest evaluation against real questions before launch",
      ],
      excludes: [
        "Model training, fine-tuning or ML research",
        "Regulated-domain advice systems where a wrong answer causes harm",
        "Guarantees about model accuracy — no honest engineer can give one",
      ],
    },
    proofSlugs: ["cennetsol", "verdira"],
    faqs: [
      {
        q: "What AI features are actually practical in a web product?",
        a: "Search and question-answering over your own content, assistants scoped to a defined support or onboarding job, first-pass content or data generation with human review, and classification or extraction inside a workflow. What is generally not practical is an open-ended assistant expected to answer anything about anything.",
      },
      {
        q: "How do you keep answers grounded?",
        a: "By retrieving from a defined source of truth and constraining the model to it, then showing the source in the interface so a user can check. If the retrieval finds nothing relevant, the correct behaviour is to say so and offer a human — not to generate something plausible.",
      },
      {
        q: "Do you train custom models?",
        a: "No. This is integration work: API-driven models, retrieval over your content, and the product layer around them. Training or fine-tuning needs an ML engineer, and I will tell you that rather than take the project.",
      },
      {
        q: "What does the interface do when the model is wrong?",
        a: "It has to be designed for, because it will happen. That means citations the user can verify, a visible way to escalate to a person, and refusal states that are honest rather than evasive. A feature designed only for the case where the model is right is not finished.",
      },
      {
        q: "Is this the same as building a chatbot?",
        a: "Sometimes, but a chatbot is one shape an AI feature can take and often not the best one. Search that returns a grounded answer, or a generation step inside a workflow, frequently does more for users than a chat window — and is easier to keep accurate.",
      },
    ],
    cta: {
      heading: "Discuss an AI feature",
      body: "Describe the job you want the feature to do and what it would answer from. I will tell you whether it is a good fit for this approach — including if I think it is not.",
      primaryLabel: "Discuss an AI feature",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);

/**
 * Services grouped by tier, in menu order. One source for the mega-menu
 * columns and the homepage tier display, so the two can never disagree about
 * which group a service belongs to.
 */
export const serviceGroups: { tier: ServiceTier; label: string; items: Service[] }[] = (
  ["core", "modernize", "partnership"] as const
).map((tier) => ({
  tier,
  label: TIER_LABEL[tier],
  items: services.filter((s) => s.tier === tier),
}));

/** Hub page copy. */
export const servicesHub = {
  metaTitle: "React & Next.js Development Services",
  metaDescription:
    "React and Next.js product engineering for production websites, SaaS products, redesigns, migrations and existing applications.",
  h1: "Production web engineering for real product constraints",
  intro:
    "I help SaaS teams, agencies and growing businesses design, rebuild and ship web products that need strong frontend execution.",
  note: "Seven services rather than a capability list. Pick the one that matches what you are trying to do — each page states who it is for, what it includes and where the scope ends.",
} as const;

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SERVICE CATALOGUE — four commercial services, one route each.
 *
 * The earlier catalogue sold seven overlapping offers. They were all real work,
 * but seven competing top-level services gave a buyer no way to see what the
 * studio actually does. They are now four, and nothing was dropped — each old
 * offer lives inside the service a buyer would look for it under:
 *
 *   React & Next.js Development        → 01 Custom Web Development
 *   Website Redesign & Rebuild         → 01 Custom Web Development
 *   SaaS & MVP Development             → 02 Business Dashboards (and 01)
 *   Web Performance & Core Web Vitals  → 03 Software Modernization
 *   WordPress to Next.js Migration     → 03 Software Modernization
 *   AI Integration for Web Products    → 04 AI Business Automation
 *   White-Label & Agency Development   → an engagement model (agency
 *                                         partnership), not a service
 *
 * The old URLs 308-redirect to the new ones (next.config.ts).
 *
 * Every page follows one anatomy: hero → what this solves → who it is for →
 * what we build and deliver → relevant work → how an engagement works →
 * technical approach → scope → FAQ → CTA. The structure repeats; the content
 * does not.
 *
 * Voice: "we" for the studio. Nothing here claims a team, a result or a
 * deployment the source material does not support.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Service = {
  slug: string;
  /** "01".."04": the services' own order. */
  index: string;
  /** Approved service name. Do not rename or re-case. */
  title: string;
  /** Short label for nav, cards and breadcrumbs. */
  shortTitle: string;
  /**
   * The label above the H1. States what the engagement is, never internal
   * strategy.
   */
  eyebrow: string;

  /* ── SEO: one primary intent per page ────────────────────────────────── */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];

  /* ── Page body ───────────────────────────────────────────────────────── */
  h1: string;
  subhead: string;
  /** One line, used on the services hub and homepage. */
  summary: string;
  /** The answer-first sentence: quotable out of context and still correct. */
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

  /** Slugs from content/work.ts. Empty where no relevant project is verified. */
  proofSlugs: string[];
  faqs: { q: string; a: string }[];

  cta: { heading: string; body: string; primaryLabel: string };
};

export const services: Service[] = [
  /* ══════════════════════════════════════════════════════════════════════
     01 · CUSTOM WEB DEVELOPMENT & DIGITAL EXPERIENCES
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "custom-web-development",
    index: "01",
    title: "Custom Web Development & Digital Experiences",
    shortTitle: "Custom Web Development",
    eyebrow: "Websites and web applications",
    metaTitle: "Custom Web Development & Web Applications",
    metaDescription:
      "Custom business websites, customer portals and web applications built with React and Next.js for small businesses and agencies. Redesigns and rebuilds too.",
    keywords: [
      "custom web development",
      "web application development",
      "custom website development",
      "React development",
      "Next.js development",
      "website redesign",
    ],
    h1: "Custom websites and web applications, built around how your business works",
    subhead:
      "We design and build business websites, customer portals and product interfaces that are fast, accessible and easy to maintain, from a new site to a full web application.",
    summary: "Business websites, customer portals and web applications built around how your business works.",
    definition:
      "Custom web development is building a website or web application around a specific business, its customers and its workflows, rather than adapting the business to a template.",
    intro: [
      "Most businesses that need a custom build are in one of two places: there is no site or product yet, or the one they have no longer fits what they do. Either way the useful question is the same: what should a visitor or customer be able to do, and what is the shortest honest path to it working in production.",
      "We build in React and Next.js with TypeScript. That is how the work is done, not what you are buying. What you get is a site or application your team can understand, extend and keep fast.",
    ],
    idealFor: [
      "A new business website or customer-facing web application",
      "A site that looks dated or no longer matches how the business presents itself",
      "A defined workflow that needs to become a working product, such as an MVP or a SaaS interface",
      "A Figma design that needs to become production UI",
      "A customer portal or protected client area",
    ],
    notIdealFor: [
      "Tiny one-off HTML or CSS edits with no broader scope",
      "Brand identity or logo design from scratch",
      "Projects where the offer or the workflow has not been thought about yet",
    ],
    problems: [
      {
        title: "Visitors cannot quickly see what the business offers",
        detail:
          "The homepage explains the company rather than the value, and the reader has to assemble the point from three sections. That is usually an information-architecture problem before it is a visual one.",
      },
      {
        title: "The design loses something on the way into the browser",
        detail:
          "Spacing drifts, states that were designed are missing and the responsive behavior is improvised. Usually a handoff problem, which is why we read a Figma file as a specification rather than a picture.",
      },
      {
        title: "The first version is built as a throwaway",
        detail:
          "So when it works, there is nothing to build on and the second version is a rewrite. Minimal in scope does not have to mean disposable in architecture, and the difference costs very little at the start.",
      },
      {
        title: "The site or app has become hard to extend",
        detail:
          "Every new page needs a developer and a new layout, or state has spread across nine components and nobody is sure what is still used. It still works. It has become slow to change, which is the expensive kind of broken.",
      },
    ],
    deliverables: [
      {
        title: "Business websites and landing pages",
        detail: "Structure, content hierarchy and responsive pages built around one dominant action per page.",
      },
      {
        title: "Web applications and customer portals",
        detail: "Whole surfaces built from the routing down: page structure, data flow, protected areas and deployment.",
      },
      {
        title: "Product and SaaS interfaces",
        detail:
          "The screens where a product is actually used, including empty, loading and error states, structured by feature so it can grow past the first release.",
      },
      {
        title: "Redesigns and rebuilds",
        detail:
          "A written diagnosis of what is wrong, the page set and hierarchy decided first, then a rebuilt site on your stack or ours.",
      },
      {
        title: "Figma to production",
        detail: "Designs implemented as real UI, with the hover, focus, loading and error states the design implied.",
      },
      {
        title: "A reusable component system",
        detail: "A typed component library with real variants, so the tenth screen is faster to build than the first.",
      },
      {
        title: "Performance and search fundamentals",
        detail: "Image and rendering strategy, canonical URLs, sitemap and structured data set up as part of the build.",
      },
    ],
    engagement: [
      {
        step: "Scope call",
        detail: "You send the idea, the current site or the designs. We establish what needs to exist and what the real constraint is.",
      },
      {
        step: "Plan",
        detail: "A written approach: pages and structure, rendering strategy, components, integrations and delivery order.",
      },
      {
        step: "Build in slices",
        detail: "Work lands in reviewable increments against your branch and your process, not as one drop at the end.",
      },
      {
        step: "Ship and hand over",
        detail: "Responsive and cross-browser checks, a performance pass, deployment and documentation of anything non-obvious.",
      },
    ],
    technical: {
      summary:
        "TypeScript throughout. Rendering strategy is chosen per page rather than by default, and components are bounded where the data changes, not where the layout does.",
      groups: [
        { label: "Build", items: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS"] },
        { label: "Interface", items: ["Component libraries", "Material UI", "Mantine", "Responsive systems", "Accessibility fundamentals"] },
        { label: "Content", items: ["Headless CMS integration", "WordPress", "Structured content models"] },
        { label: "Forms & access", items: ["React Hook Form", "Schema validation", "OAuth 2.0", "JWT", "Role-based access"] },
        { label: "Search & speed", items: ["Core Web Vitals", "Image optimisation", "Canonical URLs", "Sitemaps and structured data"] },
        { label: "Delivery", items: ["Git", "CI/CD", "Vercel"] },
      ],
    },
    scope: {
      includes: [
        "Structure, content hierarchy and UX decisions",
        "Design implementation and responsive build",
        "Integration with your existing API, CMS or backend",
        "Accessibility fundamentals, search basics and a performance pass",
        "Deployment and handover documentation",
      ],
      excludes: [
        "Copywriting for a whole site, unless agreed as part of scope",
        "Brand and visual identity design from scratch",
        "Backend or database build beyond agreed integration",
        "Guaranteed rankings or guaranteed conversion uplift",
      ],
    },
    proofSlugs: ["verdira", "cennetsol", "aussiemotor"],
    faqs: [
      {
        q: "Can you work from Figma?",
        a: "Yes, and it is the usual starting point. The deliverable is production UI rather than a static mockup, which means implementing the states the design implies as well as the frames that were drawn.",
      },
      {
        q: "Can you work with an existing backend or CMS?",
        a: "Yes. Most engagements connect to an API or CMS that already exists. We do not need your backend rewritten to build the frontend.",
      },
      {
        q: "Do you only build from scratch?",
        a: "No. Rebuilds, refactors and incremental feature delivery on an existing codebase are a normal part of the service, often the majority of it.",
      },
      {
        q: "Will a redesign increase our conversion rate?",
        a: "We will not promise a percentage, because an honest number needs a measured baseline and a measured result. What we do is build around clearer paths: one dominant action per page, the offer stated before the detail and faster pages. Where analytics exist, we measure before and after.",
      },
      {
        q: "React or Next.js: which should we use?",
        a: "Next.js when the product needs routing, server rendering, SEO or a mix of static and dynamic pages, which covers most products with a public surface. Plain React when it is a fully authenticated application behind a login. The decision is made once, early, because reversing it later is expensive.",
      },
    ],
    cta: {
      heading: "Have a website or web app in mind?",
      body: "Send the current site, the designs or a few lines about the idea. We will reply with what we would build first and what we need in order to estimate it.",
      primaryLabel: "Start a project",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     02 · BUSINESS DASHBOARDS & CUSTOM SOFTWARE SYSTEMS
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "business-dashboards",
    index: "02",
    title: "Business Dashboards & Custom Software Systems",
    shortTitle: "Business Dashboards",
    eyebrow: "Dashboards and internal tools",
    metaTitle: "Business Dashboards & Custom Software",
    metaDescription:
      "Custom dashboards, internal tools, admin systems and customer portals that replace spreadsheets and disconnected tools, built with React, Next.js and Node.js.",
    keywords: [
      "business dashboard development",
      "custom business software",
      "internal tools",
      "admin dashboard development",
      "customer portal development",
      "SaaS development",
    ],
    h1: "Dashboards and custom software that bring your business information into one place",
    subhead:
      "We build dashboards, internal tools, admin systems and portals for teams that run on spreadsheets, manual steps and tools that do not talk to each other.",
    summary: "Dashboards, internal tools, admin systems and portals that bring business information into one interface.",
    definition:
      "A custom business system is software built around how one business actually operates, with its data, roles and workflows in a single interface instead of a spreadsheet and five disconnected tools.",
    intro: [
      "Teams usually arrive here with a symptom, not a specification: the numbers live in three places, someone retypes data every week, nobody can see what is happening without asking. The software is not missing features. It is missing a single place where the work happens.",
      "We start from the workflow: who needs to see what, who is allowed to change what and where the data comes from. The interface comes after, built in React and Next.js, with Node.js and PostgreSQL where the system needs its own data layer.",
    ],
    idealFor: [
      "A team that runs on spreadsheets and has outgrown them",
      "Staff or customers who need one place to see or manage information",
      "An internal tool that is currently a no-code stack held together with workarounds",
      "A product with a backend or API in progress that needs its interface built",
      "A first paid version of a SaaS product that has to be solid enough to charge for",
    ],
    notIdealFor: [
      "An idea that has not been narrowed to a specific workflow yet",
      "A large platform build where nobody owns the data side",
      "Anything where the expectation is a full platform in a fortnight",
    ],
    problems: [
      {
        title: "Information lives in too many places",
        detail:
          "Orders in one tool, customers in another, reporting in a spreadsheet. Every answer needs someone to stitch the pieces together by hand.",
      },
      {
        title: "Repetitive manual work eats the week",
        detail:
          "The same data is copied between systems, checked by eye and corrected after the fact. It is slow, and it fails quietly.",
      },
      {
        title: "Nobody can see how the operation is doing",
        detail:
          "Without a shared view, decisions wait for whoever last built the report. A dashboard is only worth building if it answers the question people actually ask.",
      },
      {
        title: "Scope grows faster than the system ships",
        detail:
          "Every conversation adds a feature, the date moves and nothing reaches a user. The fix is a scope boundary agreed in writing before the build starts.",
      },
    ],
    deliverables: [
      {
        title: "Dashboards and reporting interfaces",
        detail: "The views people actually use: filters, tables, summaries and the empty, loading and error states around them.",
      },
      {
        title: "Internal tools and admin systems",
        detail: "Interfaces for the people who run the business, replacing the spreadsheet or the workaround.",
      },
      {
        title: "Customer and client portals",
        detail: "Protected areas where customers see their own information, with access enforced on the server.",
      },
      {
        title: "Role-based access",
        detail: "Sign-in, sessions and permissions, so each person sees and changes only what they should.",
      },
      {
        title: "API and data integration",
        detail: "Wiring to your existing systems and APIs, or a data layer built where one does not exist yet.",
      },
      {
        title: "Forms and workflows",
        detail: "Multi-step forms, validation and error recovery, built so a mistake is easy to fix rather than easy to lose.",
      },
      {
        title: "Deployment and an iteration loop",
        detail: "Environments and CI/CD you can ship from repeatedly, and analytics on the core workflow so version two comes from usage.",
      },
    ],
    engagement: [
      {
        step: "Map the workflow",
        detail: "Name the single workflow the system exists for, who uses it and where the data lives today. Write down what is out of scope.",
      },
      {
        step: "Shape the system",
        detail: "Screens, data touchpoints, access rules and the delivery order that gets something usable soonest.",
      },
      {
        step: "Build to usable",
        detail: "Ship the core path end to end first. A working narrow system beats four half-built features.",
      },
      {
        step: "Launch and learn",
        detail: "Deploy, instrument the core workflow and decide the next version from what the data says.",
      },
    ],
    technical: {
      summary:
        "Next.js and TypeScript, structured by feature, with access control enforced on the server. Where the backend belongs to someone else, the API contract is agreed early and in writing, because that boundary is where timelines usually go wrong.",
      groups: [
        { label: "Application", items: ["Next.js (App Router)", "React", "TypeScript", "Feature-based architecture"] },
        { label: "Data", items: ["Node.js", "Express.js", "REST APIs", "PostgreSQL", "Prisma", "MongoDB"] },
        { label: "Access", items: ["OAuth 2.0", "JWT", "Role-based access control", "Protected routing"] },
        { label: "Interface", items: ["Dashboards", "Complex forms", "Tables and filtering", "Empty and error states"] },
        { label: "Operations", items: ["Vercel", "CI/CD", "Docker", "Environment management"] },
      ],
    },
    scope: {
      includes: [
        "Application build, end to end",
        "Authentication, protected areas and role-aware interfaces",
        "API and database integration at the level agreed",
        "Deployment pipeline and production launch",
      ],
      excludes: [
        "A large backend or data platform with nobody owning the data",
        "Payment provider compliance, contracts or legal setup",
        "Open-ended feature development outside the agreed scope",
      ],
    },
    proofSlugs: ["aussiemotor", "verdira", "sunhub"],
    faqs: [
      {
        q: "What belongs in a first version?",
        a: "One workflow, done properly, with sign-in if the system needs identity, and the states around that workflow: empty, loading, error, first run. What does not belong: settings pages nobody has asked for, admin panels before there are users to administer and billing tiers before anyone has agreed to pay.",
      },
      {
        q: "How do you avoid overbuilding?",
        a: "By writing the out-of-scope list at the same time as the scope list, and treating additions as a decision with a cost rather than a small favour. The out-of-scope list is not a refusal. It is a record of what the next version is for.",
      },
      {
        q: "We have a backend team. How does that work?",
        a: "Well, usually. We agree the API contract early (endpoints, shapes, error behavior) and build against it, with mocked responses if the endpoints are not ready. The most common cause of delay is that boundary being left vague, so it is settled first.",
      },
      {
        q: "Will it have to be rewritten later?",
        a: "It should not. Minimal scope and disposable architecture are different things, and the second one is a choice. Typed code, feature boundaries and server-enforced access cost very little at the start and are what let the next version extend the codebase rather than replace it.",
      },
      {
        q: "Can it connect to the tools we already use?",
        a: "Where those tools expose an API, yes. Whether that is the right approach is decided during the workflow mapping, before anything is built.",
      },
    ],
    cta: {
      heading: "Need a system your team can actually use?",
      body: "Tell us the workflow, who uses it and where the data lives today. We will reply with what we would put in the first version, what we would leave out and why.",
      primaryLabel: "Start a project",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     03 · SOFTWARE MODERNIZATION & APPLICATION DEVELOPMENT
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "software-modernization",
    index: "03",
    title: "Software Modernization & Application Development",
    shortTitle: "Software Modernization",
    eyebrow: "Modernize what you have",
    metaTitle: "Software & Application Modernization",
    metaDescription:
      "Improve, migrate or rebuild an existing website or application: WordPress to Next.js migration, performance work and staged modernization without losing SEO.",
    keywords: [
      "software modernization",
      "application modernization",
      "WordPress to Next.js migration",
      "Core Web Vitals optimization",
      "frontend modernization",
      "website rebuild",
    ],
    h1: "Modernize existing software without starting over",
    subhead:
      "We improve, migrate and rebuild websites and applications that have become slow, fragile or hard to change, in stages, keeping what works and protecting your search rankings.",
    summary: "Performance work, WordPress to Next.js migration, rebuilds and staged modernization of existing software.",
    definition:
      "Software modernization is improving an existing website or application by speeding it up, migrating it, restructuring it or rebuilding parts of it, while keeping what already works and what search engines already know about it.",
    intro: [
      "Most modernization projects do not need a rewrite. They need a diagnosis: what is actually slow, fragile or limiting, and what can stay. A full rebuild is sometimes the right answer, but it should be a conclusion, not a starting assumption.",
      "The work covers three common cases: a slow production application, a WordPress site that has become the constraint and a dated frontend that is hard to extend. Each one is measured before and after, and migrations treat search preservation as a deliverable rather than a hope. The one measured figure on this site is a 30% Core Web Vitals improvement on Sunhub, a production React marketplace; its project page documents what changed.",
    ],
    idealFor: [
      "A production React or Next.js application that has become measurably slow",
      "A WordPress site with real organic rankings that has become slow, fragile or expensive to maintain",
      "A dated frontend that is hard to extend or no longer works well on mobile",
      "A legacy interface that needs improving in stages without stopping feature work",
      "A team that needs the improvement attributable, not just asserted",
    ],
    notIdealFor: [
      "A site that is working fine, with no performance or maintenance problem",
      "A migration wanted only because the new framework is newer",
      "Slowness that comes from the backend or infrastructure rather than the frontend",
    ],
    problems: [
      {
        title: "Nobody recorded where the application started",
        detail:
          "If there is no baseline, nobody can say whether the work helped, and the improvement becomes a matter of opinion. Measurement first is not process theatre. It is the only thing that makes the result checkable.",
      },
      {
        title: "The redirect map is treated as a checkbox",
        detail:
          "Every indexed URL on the old site needs an explicit, tested destination, not a wildcard that happens to catch most of them. The pages that fall through are the ones nobody thought to check.",
      },
      {
        title: "The bottleneck is not where the team assumed",
        detail:
          "Most \"React is slow\" reports turn out to be network and asset problems rather than render problems. Reaching for memoisation before opening the network panel is how a week disappears into changes nobody can feel.",
      },
      {
        title: "A rebuild is proposed when a staged fix would do",
        detail:
          "A rewrite blocks feature work for a quarter. Restructuring a working application in shippable slices usually delivers the same result with less risk.",
      },
    ],
    deliverables: [
      {
        title: "A measured baseline and a ranked diagnosis",
        detail: "Lab data, and field data where traffic allows, captured before any change, and the causes ordered by impact in writing.",
      },
      {
        title: "Performance and Core Web Vitals fixes",
        detail: "Bundle and dependency work, rendering strategy, asset and font delivery and a third-party script audit, in isolated changes.",
      },
      {
        title: "WordPress to Next.js migration",
        detail: "Content, media and structured data moved across, with WordPress kept as a headless CMS where the content team needs it.",
      },
      {
        title: "Redirect map and search preservation",
        detail: "A URL-by-URL redirect map, canonicals, sitemap and robots rules reconfigured so the rankings the site earned survive the move.",
      },
      {
        title: "Staged frontend modernization",
        detail: "Refactors delivered in shippable slices, with a rebuild only where the diagnosis justifies one.",
      },
      {
        title: "A staged, monitored release",
        detail: "Cutover checked at each stage, then Search Console watched after launch with a defined response if anything needs a recrawl.",
      },
      {
        title: "A second measurement",
        detail: "The same instrumentation run again, with the change attributable to specific work rather than to the engagement as a whole.",
      },
    ],
    engagement: [
      {
        step: "Audit",
        detail: "Measure the baseline and crawl the current site: URLs, content, structured data, redirects already in place and indexation status.",
      },
      {
        step: "Plan",
        detail: "A written plan: what to improve in place, what to migrate, what to replace, and the redirect map and release sequence.",
      },
      {
        step: "Change in stages",
        detail: "Changes land one at a time where practical, built alongside the live site so its uptime and rankings are unaffected.",
      },
      {
        step: "Release carefully",
        detail: "A staged cutover with status codes, canonicals and rendered content verified at each step rather than assumed.",
      },
      {
        step: "Measure and monitor",
        detail: "The same tests run again, with the before and after recorded, and indexation watched in the weeks after launch.",
      },
    ],
    technical: {
      summary:
        "Diagnosis-led and framework-honest. Most of the work is removal rather than addition, because the cheapest asset is the one that is not shipped. Next.js on Vercel is the usual migration target, with WordPress staying as a headless CMS when editors need it.",
      groups: [
        { label: "Measurement", items: ["Core Web Vitals", "Lighthouse", "Chrome UX Report", "React Profiler", "Bundle analysis"] },
        { label: "Delivery", items: ["Code splitting", "Lazy loading", "Tree-shaking", "Caching strategy"] },
        { label: "Rendering", items: ["Server components", "Static generation", "Streaming"] },
        { label: "Migration", items: ["URL inventory", "301 redirect mapping", "Content and media migration", "Structured data parity"] },
        { label: "Search", items: ["Canonical URLs", "XML sitemaps", "robots.txt", "Search Console monitoring"] },
        { label: "Build", items: ["Next.js", "React", "TypeScript", "Headless WordPress (optional)"] },
      ],
    },
    scope: {
      includes: [
        "Baseline measurement and a written, ranked diagnosis",
        "Frontend fixes across bundle, rendering, assets and third-party scripts",
        "URL inventory, redirect map, content and structured-data migration",
        "A second measurement attributing the change",
        "Post-launch indexation monitoring for an agreed period",
      ],
      excludes: [
        "Backend, database or infrastructure performance beyond its frontend impact",
        "Guaranteed Lighthouse scores or guaranteed ranking positions",
        "Content strategy or copywriting beyond migrating what already exists",
        "Ongoing WordPress plugin or theme maintenance, unless agreed separately",
      ],
    },
    proofSlugs: ["sunhub", "aussiemotor", "verdira"],
    faqs: [
      {
        q: "Can WordPress be migrated to Next.js without losing SEO?",
        a: "Yes, if the migration treats search preservation as a deliverable rather than a hope. Every indexed URL gets an explicit redirect, canonicals and structured data are rebuilt to match what the old templates emitted, and indexation is monitored after launch. Rankings are lost by migrations that skip these steps, not by the framework change itself.",
      },
      {
        q: "How are redirects handled?",
        a: "Every URL from the old site is inventoried, from the sitemap, from Search Console and from a crawl, and mapped to its exact destination with a 301. Pattern rules are used only where they genuinely apply.",
      },
      {
        q: "Will our content team still be able to publish?",
        a: "Yes, if that matters. Keeping WordPress as a headless CMS behind the new frontend is a legitimate option, decided at the audit stage rather than assumed.",
      },
      {
        q: "When does a rebuild make sense, and when does it not?",
        a: "A rebuild makes sense when the structure itself is the constraint: the offer is unclear, mobile is weak, or adding a page needs a developer every time. If it simply looks a few years old, or is slow for fixable reasons, a staged fix is usually the better use of the budget.",
      },
      {
        q: "Can you guarantee a Lighthouse score?",
        a: "No, and any such guarantee deserves suspicion. A score varies with the device, the network and the test conditions. What we commit to is a measured baseline, a ranked diagnosis and a second measurement, so the change is attributable whatever the number ends up being.",
      },
      {
        q: "What is the 30% figure on Sunhub, precisely?",
        a: "An aggregate improvement measured before the optimization work began and again after it shipped, on a production React marketplace. It is not a claim about one specific Core Web Vital, and per-metric numbers are not published because the workings for them are not. The project page lists what changed.",
      },
    ],
    cta: {
      heading: "Is your current system holding you back?",
      body: "Send the current site or application. We will reply with what we think is slow, fragile or limiting, what can stay and what we would change first.",
      primaryLabel: "Start a project",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     04 · AI BUSINESS AUTOMATION & WORKFLOW INTEGRATION
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "ai-business-automation",
    index: "04",
    title: "AI Business Automation & Workflow Integration",
    shortTitle: "AI Business Automation",
    eyebrow: "Practical automation",
    metaTitle: "AI Business Automation & Workflows",
    metaDescription:
      "Use AI where it improves a real business workflow: lead qualification, support, document processing and reporting, with human review built in.",
    keywords: [
      "AI business automation",
      "workflow automation",
      "AI workflow integration",
      "AI lead qualification",
      "AI document processing",
      "business process automation",
    ],
    h1: "Automate repetitive work with AI that stays under human control",
    subhead:
      "We connect AI, business rules and your existing systems to take repetitive steps out of a workflow, with a person reviewing wherever the decision matters.",
    summary: "AI and workflow automation for repetitive business processes, built around your existing systems.",
    definition:
      "AI business automation is using models, rules and integrations to handle the repetitive steps of a defined workflow, with a person reviewing wherever the outcome matters, rather than adding AI to a product for its own sake.",
    intro: [
      "Most useful automation is not a chatbot. It is a repeatable process, such as qualifying an enquiry, reading a document, sorting an email or compiling a report, where some steps follow rules, some need a model and some need a person.",
      "We start by mapping the workflow as it runs today. AI is one step in it, grounded in your own content and wrapped in fallbacks for when it is wrong. We are a software studio that integrates AI into business workflows, not a machine-learning research team, and we will say so when a problem needs one.",
    ],
    idealFor: [
      "Repetitive work that follows a pattern, such as enquiries, emails, documents or reports",
      "A support or onboarding job suited to an assistant grounded in your own content",
      "Content or data work that benefits from a first pass plus human review",
      "A knowledge base or documentation that needs genuinely better search",
      "Teams that want AI in the workflow without losing control of the outcome",
    ],
    notIdealFor: [
      "Adding AI because it should be there, with no defined use case",
      "Training or fine-tuning custom models",
      "Assistants expected to give authoritative advice in regulated domains",
    ],
    problems: [
      {
        title: "Repetitive work takes skilled time",
        detail: "The same sorting, copying and first-pass reading, done by people who could be doing the part that needs judgment.",
      },
      {
        title: "The AI answers confidently and is wrong",
        detail:
          "A model answering from general knowledge about your specific business is wrong often enough to cost more than it saves. Grounding it in your actual content is the difference between a feature and a liability.",
      },
      {
        title: "Nobody designed for the model being wrong",
        detail:
          "No source shown, no way to hand over to a person, a blank panel while it thinks. Users trust it once, get burned and never use it again.",
      },
    ],
    deliverables: [
      {
        title: "AI lead qualification",
        detail: "Incoming enquiries classified and summarized so the right ones reach a person first, with the reasoning visible.",
      },
      {
        title: "AI customer support",
        detail: "An assistant scoped to a defined support job and grounded in your own content, with sources shown and a clear handoff to a person.",
      },
      {
        title: "AI document processing",
        detail: "Information extracted from documents into a structured form, with a person confirming what matters.",
      },
      {
        title: "AI reporting and insights",
        detail: "Reports and summaries compiled from your data, with the underlying figures one click away.",
      },
      {
        title: "AI email workflows",
        detail: "Incoming email sorted, drafted against and routed, with a person approving what is sent.",
      },
      {
        title: "CRM and workflow automation",
        detail: "Integrations that connect the tools you already run, where a model is one step in the flow rather than the point.",
      },
      {
        title: "Human review and fallbacks",
        detail: "Review steps, refusal states and escalation paths designed in from the start, not added afterwards.",
      },
    ],
    engagement: [
      {
        step: "Define the workflow",
        detail: "One specific job, how it runs today and what a good result looks like, stated concretely enough to test.",
      },
      {
        step: "Establish the source of truth",
        detail: "What the automation is allowed to answer from, and how that source stays current.",
      },
      {
        step: "Build the loop",
        detail: "Retrieval, model step, interface states and fallback path, built as one workflow rather than three.",
      },
      {
        step: "Evaluate honestly",
        detail: "Test against real cases, including the ones it should refuse, then set the boundaries from what we find.",
      },
    ],
    technical: {
      summary:
        "Integration-level work: API-driven models, retrieval over your own content, workflow tooling and the interface around them. Model training and fine-tuning are outside what we offer, and we will say so rather than take the work.",
      groups: [
        { label: "Integration", items: ["LLM and model APIs", "Gemini API", "Streaming responses", "Rate limiting and cost control"] },
        { label: "Retrieval", items: ["Retrieval-based interfaces", "Knowledge base structuring", "Source citation"] },
        { label: "Workflow", items: ["n8n workflow automation", "REST integrations", "Human-review steps", "Scheduled pipelines"] },
        { label: "Interface", items: ["Streaming UI states", "Fallback and refusal states", "Human handoff"] },
      ],
    },
    scope: {
      includes: [
        "Workflow scoping against a defined, testable use case",
        "Integration, retrieval and the interface layer",
        "Fallback behavior and human handoff paths",
        "Evaluation against real cases before launch",
      ],
      excludes: [
        "Model training, fine-tuning or machine-learning research",
        "Regulated-domain advice systems where a wrong answer causes harm",
        "Guarantees about model accuracy, savings or return on investment",
      ],
    },
    proofSlugs: [],
    faqs: [
      {
        q: "What can realistically be automated?",
        a: "Repeatable steps with a clear definition of done: sorting and summarizing enquiries, extracting fields from documents, drafting a first reply for review, compiling a recurring report. What is generally not realistic is an open-ended assistant expected to answer anything about anything.",
      },
      {
        q: "How do you keep answers grounded?",
        a: "By retrieving from a defined source of truth and constraining the model to it, then showing the source so a user can check. If nothing relevant is found, the correct behavior is to say so and hand over to a person, not to generate something plausible.",
      },
      {
        q: "Where does a person stay involved?",
        a: "Wherever the outcome matters: approving what is sent, confirming what was extracted, handling what the automation refuses. The review step is part of the system, not a convention.",
      },
      {
        q: "Do you train custom models?",
        a: "No. This is integration work: API-driven models, retrieval over your content and the product layer around them. Training or fine-tuning needs a machine-learning engineer, and we will tell you that rather than take the project.",
      },
      {
        q: "Which tools can it connect to?",
        a: "Anything that exposes an API or can be reached through workflow tooling. The right set is decided when the workflow is mapped, and we do not promise an integration before checking it can be done.",
      },
    ],
    cta: {
      heading: "Have a repetitive process in mind?",
      body: "Describe the workflow and what it needs to read, decide and update. We will tell you whether it is a good fit for automation, including if we think it is not.",
      primaryLabel: "Start a project",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);

/**
 * Where each retired service URL now lives. Used by next.config.ts so the old
 * indexed pages 308 straight to the page that now covers the same intent.
 */
export const retiredServiceTargets: Record<string, string> = {
  "frontend-product-engineering": "/services/custom-web-development",
  "website-redesign-rebuild": "/services/custom-web-development",
  "saas-product-development": "/services/business-dashboards",
  "performance-engineering": "/services/software-modernization",
  "wordpress-to-nextjs-migration": "/services/software-modernization",
  "ai-product-integration": "/services/ai-business-automation",
  /* Agency work is an engagement model, not a service: it lives on the hub. */
  "agency-frontend-development": "/services",
};

/** Services hub copy. */
export const servicesHub = {
  metaTitle: "Software Development Services",
  metaDescription:
    "Four software development services for small businesses and agencies: web development, business dashboards, modernization and AI automation.",
  h1: "Four services for building, improving and automating software",
  intro:
    "Craftwise is a founder-led software development studio. We help small businesses and agencies build new digital products and business systems, modernize existing software and automate practical workflows.",
  fit: {
    heading: "Which service fits your situation?",
    description: "Find the sentence that sounds like yours. If two fit, start with the first and we will sort the rest out together.",
    rows: [
      { situation: "We need a website, a customer portal or a web application.", slug: "custom-web-development" },
      { situation: "We need one place to see and manage business information.", slug: "business-dashboards" },
      { situation: "Our existing site or software is slow, dated or hard to change.", slug: "software-modernization" },
      { situation: "We have repetitive work that follows a pattern.", slug: "ai-business-automation" },
    ],
  },
  ways: {
    heading: "Two ways to work with us",
    items: [
      {
        title: "Project engagement",
        detail: "For a defined build, rebuild or modernization effort, with the scope agreed in writing before work starts.",
        cta: { label: "Start a project", href: "/contact" },
      },
      {
        title: "Agency partnership",
        detail: "For agencies that need engineering capacity behind client work. You keep the client relationship; we handle the build.",
        cta: { label: "Talk about a partnership", href: "/contact" },
      },
    ],
  },
} as const;

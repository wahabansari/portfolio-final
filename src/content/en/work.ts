/**
 * ─────────────────────────────────────────────────────────────────────────────
 * WORK — the portfolio, and the three case studies behind it.
 *
 * Only `sunhub`, `cennetsol` and `verdira` carry a `caseStudy`; those get their
 * own route under /work/[slug]. The rest render as cards on /work and link out
 * to the live site — a thin page per project would be worse than no page.
 *
 * Outcome rule: `metrics` may only carry numbers that were measured. The 30%
 * Core Web Vitals improvement on Sunhub is the one figure of that kind here,
 * and the case study explains the work behind it. Everything else is described
 * as scope or focus, not as a result.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type CaseStudy = {
  /** SEO + page head. */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  lede: string;

  role: string;
  period?: string;
  /** What the engagement covered, in one phrase. */
  scope: string;
  /** Where the work stands now. */
  status: string;
  stack: string[];

  /** Where the product sits and who it serves. */
  context: string;
  /** The problem, stated before any solution. */
  problem: string;
  /**
   * What could not be changed. A solution is only judgeable against the
   * constraints it was built under — "why not just rewrite it" has an answer,
   * and this is where it goes.
   */
  constraints: string[];
  /** What I was responsible for — the boundary matters. */
  responsibility: string[];
  /** The system or interface that came out of it. */
  build: { heading: string; body: string }[];
  /** Engineering choices worth defending, with the reason. */
  decisions: { title: string; detail: string }[];
  /** Verified outcomes or observable changes. No invented numbers. */
  outcome: { statement: string; verified: boolean }[];
  /** How a quoted figure was arrived at, and what it does not claim. Shown
      beside the outcomes so a number is never left to speak for itself. */
  measurement?: string;
  /** Honesty section — what I would change with more time. */
  next: string[];
  /** The service this case study should route a buyer into. */
  cta: { line: string; label: string; href: string };
};

export type Project = {
  slug: string;
  title: string;
  kind: string;
  year?: string;
  /** Omitted when there is no public URL — the card renders unlinked. */
  href?: string;
  domain?: string;
  /** Personal role. Stated on every card, including collaborative and
      outsourced work, so ownership is never implied by omission. */
  role: string;
  /** One line, used on cards. */
  blurb: string;
  /**
   * Card-level scanning triple: the problem in one line, what came of it in
   * one line, and the engagement's shape in a phrase.
   *
   * These are compressions of the case-study fields below, not new claims —
   * `outcome` never states anything the case study does not already
   * substantiate, and on projects with no measured figure it describes what
   * changed rather than dressing a scope note up as a result. They exist as
   * their own fields because the case-study versions are paragraphs, and a
   * card needs a line.
   */
  problem: string;
  outcome: string;
  scope: string;
  /** Paragraph, used on /work and the case-study intro. */
  detail: string;
  tools: string[];
  metrics?: { k: string; v: string; verified?: boolean }[];
  /** Real screenshot dropped into /public/work — falls back to a schematic plate. */
  image?: string;
  /** Drives the generated interface plate when no screenshot exists. */
  plate: "platform" | "marketing" | "app" | "commerce" | "marketplace" | "portal" | "listing";
  featured?: boolean;
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  /* ══════════════════════════════════════════════════════════════════════
     SUNHUB
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "sunhub",
    role: "Senior Frontend Engineer, via Oxiliry",
    title: "Sunhub",
    kind: "Performance & platform",
    href: "https://www.sunhub.com/",
    domain: "sunhub.com",
    featured: true,
    plate: "platform",
    blurb: "Frontend performance and platform work on a production React marketplace.",
    problem: "Years of feature delivery had left the platform slow to load and slow to change.",
    outcome: "A measured 30% Core Web Vitals improvement, with the workings documented.",
    scope: "Performance ownership + frontend delivery",
    detail:
      "Owned frontend delivery on a production React platform at Oxiliry. Removed unused assets, optimised the build pipeline and applied lazy loading, tree-shaking and image compression — a measured 30% Core Web Vitals improvement. Built responsive, cross-browser interfaces from Figma, integrated REST APIs and implemented form validation with React Hook Form.",
    tools: ["React.js", "REST APIs", "React Hook Form", "Figma", "Git"],
    metrics: [
      { k: "Core Web Vitals", v: "+30%", verified: true },
      { k: "Focus", v: "Performance & delivery" },
    ],
    caseStudy: {
      metaTitle: "Sunhub Frontend Performance Case Study",
      metaDescription:
        "How the Sunhub frontend was improved with React, build optimisation and performance work that delivered a 30% Core Web Vitals improvement.",
      keywords: [
        "React performance case study",
        "Core Web Vitals case study",
        "Next.js performance",
        "frontend performance optimisation",
      ],
      h1: "Sunhub frontend performance and platform work",
      lede: "A production React platform where performance had become a product problem — and the build-pipeline work that fixed it.",
      role: "Senior Frontend Engineer (via Oxiliry)",
      scope: "Performance work and ongoing frontend delivery",
      status: "Live and in production",
      stack: ["React.js", "REST APIs", "React Hook Form", "Figma", "Git", "Bitbucket", "Jira"],
      context:
        "Sunhub is a production solar equipment marketplace serving buyers and sellers across the United States. By the time I joined the frontend, the application had been through several years of feature delivery: the surface area was large, the asset pipeline had accumulated things nobody was using any more, and page weight had grown quietly with every release.",
      problem:
        "The platform worked, but it had become slow to load and slow to change — the expensive kind of slow. Core Web Vitals were the visible symptom; the underlying causes were an unpruned asset pipeline, no loading boundaries, and a build process that shipped far more to the browser than any single page needed.",
      constraints: [
        "A live marketplace with real buyers and sellers — no maintenance window, no rewrite",
        "Several years of accumulated feature work, much of it written before I joined",
        "Performance had to improve without changing what any existing page did",
        "Changes shipped into an active release cadence alongside other people's work",
      ],
      responsibility: [
        "Frontend delivery on the production React application, not a rewrite or a prototype",
        "Performance ownership: diagnosing the causes, implementing the fixes and re-measuring",
        "Implementing interfaces from Figma with cross-browser and responsive consistency",
        "REST API integration and form workflows, including validation and error states",
      ],
      build: [
        {
          heading: "An audit before any change",
          body: "Performance work without a baseline is guesswork. The first pass was measurement: what was actually in the bundle, which assets were still referenced, what was blocking first paint, and which images were being served far larger than they were displayed. That produced an ordered list of causes rather than a list of tactics.",
        },
        {
          heading: "Cutting what was never used",
          body: "The largest single win was removal, not optimisation. Unused assets and dead paths were stripped out of the pipeline, and tree-shaking was made effective by tightening how modules were imported — a barrel import that pulls a whole library into a page defeats it silently.",
        },
        {
          heading: "Loading boundaries where they earn their keep",
          body: "Lazy loading was applied deliberately rather than everywhere: below-the-fold sections and heavier interactive regions, so the critical path stayed small, while anything needed for the first meaningful render stayed eager. Images were compressed and served at sizes that matched their display dimensions.",
        },
        {
          heading: "The interface work around it",
          body: "Alongside the performance pass, the day-to-day work was building responsive interfaces from Figma, wiring them to REST endpoints, and implementing forms with React Hook Form — validation, error handling and recovery paths, not just the happy case.",
        },
      ],
      decisions: [
        {
          title: "Measure, change one thing, measure again",
          detail:
            "Shipping five optimisations at once tells you the total but not which one mattered, and leaves you unable to reverse the one that regressed something. Each change was isolated so its effect was attributable.",
        },
        {
          title: "Removal before optimisation",
          detail:
            "The cheapest asset to load is the one that is not there. Deleting unused code and assets is lower-risk and higher-yield than micro-tuning code that should not ship at all.",
        },
        {
          title: "Lazy loading as a decision, not a default",
          detail:
            "Deferring something above the fold trades one metric for another — it improves the bundle and damages the experience. The split was drawn at the first meaningful render, not at a component boundary.",
        },
        {
          title: "Validation at the form layer",
          detail:
            "React Hook Form keeps validation state out of the component tree and off the re-render path, which matters on forms long enough that per-keystroke re-renders become visible.",
        },
      ],
      outcome: [
        { statement: "30% performance improvement, measured before and after the optimisation work", verified: true },
        { statement: "Lighter build output, with unused assets removed from the pipeline", verified: false },
        { statement: "Responsive, cross-browser consistency across the interfaces delivered", verified: false },
      ],
      measurement:
        "To be precise about what this figure is: 30% is the aggregate improvement recorded across the performance work on this platform, taken before the optimisation pass began and again after it shipped. It is not a claim about one specific Core Web Vital, and it is not a synthetic score reproduced here — I have not published per-metric LCP, INP or CLS values because I am not going to quote numbers I cannot show you the workings for. The changes behind it are listed above and are the honest part of the claim.",
      next: [
        "Publish the per-metric before and after values — LCP, INP and CLS — so the headline figure can be checked rather than taken on trust.",
        "A performance budget enforced in CI, so a regression fails the build instead of being discovered in production a month later.",
        "Field data alongside lab data — synthetic scores and real-user metrics disagree, and the disagreement is usually the interesting part.",
        "Route-level code splitting extended further, now that the import boundaries are clean enough to make it predictable.",
      ],
      cta: {
        line: "Need frontend performance work on something already in production?",
        label: "Frontend Product Engineering",
        href: "/services/frontend-product-engineering",
      },
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     CENNETSOL
     ══════════════════════════════════════════════════════════════════════ */
  {
slug: "cennetsol",
    role: "Design + frontend engineering → Next.js",
    title: "CenNet Sol",
    kind: "B2B platform",
    href: "https://www.cennetsol.com/",
    domain: "cennetsol.com",
    plate: "marketing",
    blurb: "A scalable Next.js marketing site for an enterprise AI consultancy.",
    problem: "A growing service catalogue would have needed a new layout for every new capability area.",
    outcome: "New services and case studies extend the content model instead of needing new layouts.",
    scope: "Information architecture → build",
    detail:
      "A Next.js site for an AI and digital-transformation consultancy working with industrial, healthcare and logistics clients. Built around the sections that do the selling — capability areas, case studies, leadership profiles and an FAQ — with a content structure that absorbs new services without needing new layouts.",
    tools: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    metrics: [
      { k: "Scope", v: "Structure → build" },
      { k: "Focus", v: "Scalable content model" },
    ],
    caseStudy: {
      metaTitle: "Cennetsol Website Case Study",
      metaDescription:
        "A scalable Next.js marketing website for an enterprise AI consultancy, built around services, case studies and a maintainable content structure.",
      keywords: [
        "Next.js website case study",
        "AI consultancy website",
        "React website development",
        "scalable marketing site",
      ],
      h1: "Cennetsol: a scalable AI consultancy website",
      lede: "A marketing site that had to present a wide service catalogue without becoming impossible to extend six months later.",
      role: "Frontend / product implementation",
      scope: "Full site: information architecture through build",
      status: "Live",
      stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
      context:
        "Cennetsol is an AI and digital-transformation consultancy working with industrial, healthcare and logistics clients. Its buyers are enterprise: they arrive sceptical, they want to see comparable work before capability claims, and they have specific integration and ROI questions that decide whether a conversation happens at all.",
      problem:
        "The consultancy's offering spans automation, analytics, custom LLMs, MLOps and computer vision — and it keeps growing. A site built as a set of hand-made pages would have needed a new layout for every new capability area and every new case study. The real requirement was not a design; it was a structure that new content could drop into.",
      constraints: [
        "The service catalogue was still growing, so the structure had to absorb content that did not exist yet",
        "Enterprise buyers expect evidence before capability claims, which fixed the page order",
        "No CMS in the initial scope — the content model had to be maintainable in the repository",
        "A single implementer, so the component vocabulary had to stay small enough to hold in one head",
      ],
      responsibility: [
        "Information architecture: what the page types are, and what fields each one owns",
        "Frontend implementation of the full site in Next.js and Tailwind",
        "Component system covering capability areas, case studies, leadership profiles and FAQ",
        "Responsive behaviour and deployment on Vercel",
      ],
      build: [
        {
          heading: "Content model before components",
          body: "The first decision was what a capability area, a case study and a team member each are as data. Once those shapes were fixed, the components became renderers for them — and adding a sixth capability area became a data change rather than a design task.",
        },
        {
          heading: "Sections that do the selling, in order",
          body: "The page sequence follows how an enterprise buyer evaluates: capability areas so they can find themselves, case studies carrying real outcomes, testimonials and leadership profiles for credibility, then an FAQ answering the integration and ROI questions that otherwise become the first email.",
        },
        {
          heading: "One component vocabulary",
          body: "Section headers, cards, metric readouts and CTA blocks are shared across every page type. That is what keeps a site consistent as it grows — not a style guide document, but the fact that there is only one component that can draw a card.",
        },
      ],
      decisions: [
        {
          title: "Structure for the content that does not exist yet",
          detail:
            "The brief was explicitly about growth. Designing only for the eight capability areas that existed at launch would have guaranteed a rebuild at fifteen.",
        },
        {
          title: "Server-rendered marketing pages",
          detail:
            "Marketing content has no reason to be assembled in the browser. Rendering it on the server keeps the critical HTML complete for crawlers and cheap for visitors.",
        },
        {
          title: "Utility CSS with a component boundary",
          detail:
            "Tailwind at the leaf level, but every repeated pattern promoted into a component. Utilities without that boundary become copy-paste drift, which is the failure mode people blame the tool for.",
        },
      ],
      outcome: [
        { statement: "Full site delivered on Next.js, React, Tailwind and Vercel", verified: false },
        { statement: "New services and case studies extend the existing structure rather than needing new layouts", verified: false },
        { statement: "Responsive across the full breakpoint range, with content rendered server-side", verified: false },
      ],
      next: [
        "Move the content into a headless CMS so the client edits capability areas and case studies without a deploy.",
        "Add per-service structured data now that the content model makes each service a first-class entity.",
      ],
      cta: {
        line: "Need a marketing site that can grow without a rebuild?",
        label: "Website Redesign & Conversion",
        href: "/services/website-redesign-rebuild",
      },
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     VERDIRA
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "verdira",
    role: "Frontend / application development",
    title: "Verdira",
    kind: "Web application & auth",
    href: "https://verdira.com/",
    domain: "verdira.com",
    featured: true,
    plate: "app",
    blurb: "A static marketing site rebuilt as a web application with protected client areas.",
    problem: "A static site has no concept of a user, so private client material had nowhere to live.",
    outcome: "Authenticated client areas in production, with the public marketing surface still static.",
    scope: "Static site → authenticated application",
    detail:
      "Rebuilt a static marketing website into a scalable web application with a structured architecture. Implemented authentication and password-protected client areas, improved application performance and reorganised the codebase so it could carry future business requirements rather than being replaced again.",
    tools: ["Next.js", "Tailwind CSS", "Vercel", "Authentication"],
    metrics: [
      { k: "Scope", v: "Static → application" },
      { k: "Focus", v: "Auth & architecture" },
    ],
    caseStudy: {
      metaTitle: "Verdira Web Application Case Study",
      metaDescription:
        "A marketing site rebuilt as a scalable web application with authentication and password-protected client areas using Next.js.",
      keywords: [
        "Next.js web application",
        "authenticated web app",
        "client portal development",
        "static site to web app",
      ],
      h1: "Verdira: a marketing site rebuilt as a web application",
      lede: "The point where a website stops being a website — adding accounts, protected areas and an architecture that can carry both.",
      role: "Frontend / application development",
      scope: "Static site rebuilt as an authenticated application",
      status: "Live",
      stack: ["Next.js", "Tailwind CSS", "Authentication", "Vercel"],
      context:
        "Verdira had a static marketing presence that was doing its job as a brochure, and a business that had moved past what a brochure can do. Clients needed somewhere to sign in and reach material that was not for the public — which is a different kind of software from the one they had.",
      problem:
        "A static site has no concept of a user, so there is nowhere to put anything that depends on who is asking. The rebuild had to introduce identity, protected routes and the architecture underneath both, without discarding the public marketing surface that was already working.",
      constraints: [
        "The public marketing surface was working and had to keep working through the rebuild",
        "Introducing accounts could not make the indexable pages slower or less crawlable",
        "Client material behind the login is genuinely private, so protection had to be server-enforced",
        "The architecture had to carry features the business had not specified yet",
      ],
      responsibility: [
        "Rebuilding the site as a Next.js application with a structured, extensible architecture",
        "Implementing authentication and password-protected client areas",
        "Performance work across the rebuilt application",
        "Reorganising the codebase for maintainability and future feature work",
        "Working with stakeholders on scope and requirements through delivery",
      ],
      build: [
        {
          heading: "Two surfaces, one application",
          body: "The public marketing pages and the authenticated client areas have different requirements — one is indexed and cacheable, the other is per-user and must never be. Drawing that boundary explicitly, at the routing layer, is what keeps a protected page from leaking into a cache or a sitemap.",
        },
        {
          heading: "Authentication and protected areas",
          body: "Sign-in, session handling and password-protected client areas, with route protection enforced on the server rather than by hiding links in the interface. A client area that is only hidden is not protected.",
        },
        {
          heading: "An architecture for what comes next",
          body: "The codebase was reorganised around feature boundaries rather than file types, so a future addition lands in one place instead of five. That is the difference between a rebuild that lasts and one that gets rebuilt again.",
        },
      ],
      decisions: [
        {
          title: "Protect on the server, not in the UI",
          detail:
            "Conditional rendering hides a link; it does not stop a request. Route protection belongs where the request is answered.",
        },
        {
          title: "Keep the public surface static",
          detail:
            "Introducing accounts does not mean everything becomes dynamic. The marketing pages stayed statically rendered, so adding auth cost the public site nothing in speed or indexability.",
        },
        {
          title: "Reorganise by feature, not by file type",
          detail:
            "A folder of every component in the app is fine at twenty components and unworkable at two hundred. Feature boundaries were set during the rebuild, when doing so was free.",
        },
      ],
      outcome: [
        { statement: "Static marketing site rebuilt as a scalable Next.js application", verified: false },
        { statement: "Authentication and password-protected client areas in production", verified: false },
        { statement: "Codebase reorganised so new features extend the structure rather than working around it", verified: false },
      ],
      next: [
        "Role-based access, so the client area can distinguish between kinds of user rather than only between signed in and out.",
        "An audit trail on protected-area access, which becomes a requirement the moment the material is genuinely sensitive.",
      ],
      cta: {
        line: "Need a product frontend or a client portal?",
        label: "SaaS & MVP Product Development",
        href: "/services/saas-product-development",
      },
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     SUPPORTING WORK — cards on /work, no separate page.
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "vape-planet",
    role: "Sole frontend developer",
    title: "Vape Planet",
    kind: "E-commerce",
    href: "https://vapeplanet.co.uk/",
    domain: "vapeplanet.co.uk",
    plate: "commerce",
    blurb: "Production e-commerce frontend built solo, with integrated payment workflows.",
    problem: "A production storefront needed its entire frontend built and wired to payments by one developer.",
    outcome: "A live e-commerce frontend with integrated payment workflows and reusable components.",
    scope: "Sole frontend developer",
    detail:
      "Independently developed the frontend of a production e-commerce platform using Next.js, Material UI and Tailwind CSS. Built responsive interfaces from concept to implementation, integrated frontend payment workflows and focused on reusable components across desktop and mobile.",
    tools: ["Next.js", "React", "Tailwind CSS", "Material UI"],
    metrics: [
      { k: "Ownership", v: "Solo frontend" },
      { k: "Focus", v: "Payments & reuse" },
    ],
  },
  {
    slug: "aussiemotor",
    role: "Frontend developer, part of a team",
    title: "AussieMotor",
    kind: "Marketplace migration",
    href: "https://aussiemotor.com.au/",
    domain: "aussiemotor.com.au",
    plate: "marketplace",
    featured: true,
    blurb: "A large automotive marketplace migrated from WordPress onto Next.js.",
    problem: "A large marketplace had outgrown what WordPress could maintainably support.",
    outcome: "Migrated onto Next.js, with dashboard interfaces and a reusable component library.",
    scope: "Migration + frontend features, as part of a team",
    detail:
      "Contributed to migrating a large automotive marketplace from WordPress to a Next.js application, improving maintainability and performance. Developed responsive, reusable UI components with Mantine and Tailwind, working with the team on dashboard interfaces and frontend features.",
    tools: ["Next.js", "Tailwind CSS", "Mantine UI", "Firebase", "MongoDB"],
    metrics: [
      { k: "Migration", v: "WordPress → Next.js" },
      { k: "Focus", v: "Dashboards & components" },
    ],
  },
  {
    slug: "digestive-care",
    role: "Sole developer",
    title: "Digestive Care",
    kind: "Healthcare portal",
    href: "https://digestivecarepl.com/",
    domain: "digestivecarepl.com",
    plate: "portal",
    blurb: "A healthcare site with an integrated patient portal and appointment booking.",
    problem: "Patients needed to book and access their own records, not just read pages.",
    outcome: "A patient portal and appointment booking integrated into the practice's site.",
    scope: "Sole developer",
    detail:
      "Developed a healthcare website with an integrated patient portal by extensively customising WordPress themes and functionality to match the client's branding and workflow. Implemented responsive layouts, integrated appointment booking and connected the portal for patients and practitioners.",
    tools: ["WordPress", "HTML5", "CSS3", "JavaScript"],
    metrics: [
      { k: "Feature", v: "Patient portal" },
      { k: "Feature", v: "Appointment booking" },
    ],
  },
  {
    slug: "talha-estate",
    role: "Design and development",
    title: "Talha Estate",
    kind: "Real estate CMS",
    href: "https://talhaestate.com/",
    domain: "talhaestate.com",
    plate: "listing",
    blurb: "A real estate platform with a scalable CMS architecture for property listings.",
    problem: "Property listings had to be managed by the client, not by a developer each time.",
    outcome: "A CMS architecture the client manages listings and content through directly.",
    scope: "Design → build",
    detail:
      "Designed and developed a real estate platform with a CMS architecture for managing property listings and content. Built responsive interfaces, customised WordPress functionality through custom plugins, and structured the experience to simplify property management across devices.",
    tools: ["WordPress", "Custom Plugins", "HTML5", "CSS3", "JavaScript"],
    metrics: [
      { k: "Architecture", v: "Scalable CMS" },
      { k: "Scope", v: "Design → build" },
    ],
  },
];

export type CaseStudyProject = Project & { caseStudy: CaseStudy };

/* Featured = the curated proof wall on the homepage and /work: Sunhub,
   AussieMotor, Verdira. Two of the three carry case studies; AussieMotor
   is an external, team-delivered project that points at the live site. */
export const featuredProjects = projects.filter((p) => p.featured);

export const caseStudies = projects.filter(
  (p): p is CaseStudyProject => p.caseStudy !== undefined,
);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getCaseStudy(slug: string) {
  const project = projects.find((p) => p.slug === slug && p.caseStudy);
  if (!project?.caseStudy) return undefined;
  return { project, study: project.caseStudy };
}

export const caseStudySlugs = projects.filter((p) => p.caseStudy).map((p) => p.slug);

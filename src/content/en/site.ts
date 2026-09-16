/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITE CONTENT — single source of truth.
 *
 * Accuracy rule: every claim on this site must be provable. The only measured
 * number here is the 30% Core Web Vitals improvement on Sunhub, and the case
 * study explains how it was reached. No invented client names, testimonials,
 * traffic figures, revenue lifts or conversion uplifts. Before adding any
 * future metric, record the baseline, the measurement method and the result.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Muhammad Wahab Ansari",
  shortName: "Wahab Ansari",
  initials: "WA",
  role: "React & Next.js Product Engineer",
  location: "Lahore, Pakistan",
  locationShort: "Lahore, PK",
  timezone: "Asia/Karachi (UTC+5)",
  email: "wahabansari.dev@gmail.com",
  url: "https://wahabansari-portfolio-final.vercel.app",
  available: true,
  availabilityNote: "Open to remote roles and selected projects",
  resumeHref: "/Resume-FEE.pdf",
} as const;

/**
 * The positioning sentence. Used verbatim on the homepage, /about, the résumé
 * and the LinkedIn bio — entity consistency is the whole point, so it does not
 * get reworded per surface.
 */
export const positioning =
  "I am a Frontend Product Engineer specializing in React and Next.js, with 5+ years of production experience building web products, customer-facing interfaces and performance-focused frontend systems.";

/**
 * The commercial promise — the one sentence a buyer could repeat to a
 * colleague without reopening the site. It names the audiences before the
 * technology on purpose: a reader is looking for themselves in the sentence,
 * not for a stack list.
 */
export const promise =
  "I help startups, SaaS teams, businesses and agencies build, modernize and improve production web products with React and Next.js.";

/** For direct clients. */
export const commercialSentence =
  "I help product teams and growing businesses redesign, build and improve web products that need better frontend execution.";

/** For agency outreach. */
export const agencySentence =
  "I help agencies ship React and Next.js projects when their client pipeline is ahead of their internal frontend capacity.";

/** Homepage <meta description>. Kept under 160 characters so it isn't truncated. */
export const metaDescription =
  "Independent React & Next.js developer for hire — building and improving production web products for SaaS teams, businesses and agencies.";

export const socials = [
  { label: "GitHub", handle: "github.com/wahabansari", href: "https://github.com/wahabansari" },
  { label: "LinkedIn", handle: "linkedin.com/in/wahabansari", href: "https://linkedin.com/in/wahabansari" },
  { label: "Email", handle: site.email, href: `mailto:${site.email}` },
] as const;

/* ── Hero ──────────────────────────────────────────────────────────────── */

export const hero = {
  /* The role, plain. "Senior Frontend Engineer" gives a recruiter the
     box to tick and a founder the rank to measure against immediately. */
  eyebrow: "Senior Frontend Engineer · React & Next.js",
  headline: "I build fast, scalable web products with React & Next.js.",
  support:
    "5+ years building production web experiences — with a focus on performance, architecture and polished UI.",
  primaryCta: { label: "Start a project", href: "/contact" },
  secondaryCta: { label: "View my work", href: "/work" },
  /* The résumé is a first-class proof document, so it gets a third action in
     the hero — a quiet ghost button that does not compete with the two that
     are actually selling. */
  resumeCta: { label: "View résumé", href: site.resumeHref },
  /* Availability is stated commercially rather than as job-seeking. Remote
     employment is real and stays visible — on /about and the résumé, which is
     where someone hiring for a role actually looks — but it does not compete
     with the commercial message in the first screen. */
  availability: "Available for selected projects and agency partnerships",
} as const;

/* ── Problem selector ──────────────────────────────────────────────────────
   "What are you trying to solve?" — the homepage's routing layer.

   A services list asks a buyer to translate their problem into my vocabulary
   before they can act. This asks the question in theirs, and routes each
   answer to exactly one service page — no two entries share a destination, or
   the selector would be decoration rather than navigation.

   Six entries against seven services: SaaS & MVP work is reached through the
   first card rather than given its own, because "we need to build a new
   product" is the sentence a founder actually says, and splitting it into two
   near-identical cards would make the reader choose between synonyms. */

export const problemPaths = [
  {
    problem: "We need to build a new product",
    detail:
      "A validated workflow that has to become a working, chargeable product — auth, dashboards, the real thing.",
    href: "/services/frontend-product-engineering",
    label: "Frontend product engineering",
  },
  {
    problem: "Our website is outdated",
    detail:
      "The offer is not clear, the pages are slow, and mobile was an afterthought. Usually structure before styling.",
    href: "/services/website-redesign-rebuild",
    label: "Website redesign & rebuild",
  },
  {
    problem: "We need to move off WordPress",
    detail:
      "A migration where the rankings, redirects, content and structured data all have to survive the move.",
    href: "/services/wordpress-to-nextjs-migration",
    label: "WordPress to Next.js migration",
  },
  {
    problem: "Our frontend is too slow",
    detail:
      "Poor Core Web Vitals, a heavy bundle or an interface that stopped feeling fast as the product grew.",
    href: "/services/performance-engineering",
    label: "Performance engineering",
  },
  {
    problem: "Our agency needs delivery capacity",
    detail:
      "White-label React and Next.js delivery behind your brand, inside your process and under your NDA.",
    href: "/services/agency-frontend-development",
    label: "Agency / white-label frontend",
  },
  {
    problem: "We want to add AI to our product",
    detail:
      "A specific job for the feature to do, grounded in your own content, with the interface built for the model being wrong.",
    href: "/services/ai-product-integration",
    label: "AI product integration",
  },
] as const;

/* ── Who I work with ───────────────────────────────────────────────────────
   Three audiences, named explicitly, each with a route out. A visitor should
   be able to find their own situation here and act on it in the same glance —
   naming the audience without giving it somewhere to go just moves the
   decision further down the page.

   `primary` marks the best-fit buyer. It is emphasised rather than listed
   first-among-equals, because a site that presents three audiences at
   identical weight is telling a buyer nothing about where the depth is. */

export const audiences = [
  {
    who: "SaaS & product teams",
    detail:
      "Frontend delivery for products with an existing backend, design system or evolving roadmap — where the constraint is implementation capacity, not direction.",
    href: "/services/frontend-product-engineering",
    label: "Frontend product engineering",
    primary: true,
  },
  {
    who: "Businesses",
    detail:
      "Website redesigns, conversion improvements and customer-facing web applications, where the current site is the thing getting in the way.",
    href: "/services/website-redesign-rebuild",
    label: "Redesign & rebuilds",
  },
  {
    who: "Agencies",
    detail:
      "White-label React and Next.js delivery capacity behind your brand, inside your process and under your NDA. You keep the client relationship.",
    href: "/services/agency-frontend-development",
    label: "White-label delivery",
  },
] as const;

/* ── Why work with me ──────────────────────────────────────────────────────
   Four principles, each tied to something demonstrable rather than to an
   adjective. These repeat on every service page, so the argument is the same
   wherever a buyer enters the site.

   The headings state the buyer's outcome, not my capability. "Production
   ownership" describes what I have; "your product is maintained after launch"
   describes what you get — and the second one is the version a buyer is
   actually evaluating. The evidence for each claim stays in the detail line
   underneath, so the outcome is never asserted without its basis. */

export const principles = [
  {
    title: "Your product is maintained, not abandoned at handover",
    detail:
      "Five years on a live product rather than a sequence of handovers. I have maintained what I shipped, which is what teaches you where regressions come from and what a change actually costs.",
  },
  {
    title: "Your design ships as drawn — including the states it implies",
    detail:
      "I built and maintained a design system before I wrote production React full-time, so I read a Figma file as a specification rather than a picture — including the hover, loading, empty and error states it implies but does not draw.",
  },
  {
    title: "Speed is measured before and after, never just promised",
    detail:
      "Performance is treated as a feature with a baseline and a second measurement, not a polish step at the end. On Sunhub that discipline produced a measured 30% performance improvement.",
  },
  {
    title: "Your team can extend the code without me",
    detail:
      "Typed code, feature boundaries and documented decisions in your repository. The test is whether your team can keep building after I leave, and that is the state I aim to hand over in.",
  },
] as const;

/**
 * Proof strip.
 *
 * `display` is the literal string rendered — there is no count-up animation
 * and no numeric interpolation. A counter that starts at zero exposes a false
 * value to anyone who reads the first frame, and to any crawler that renders
 * the page before the animation settles. These are claims about verifiable
 * facts, so they are static text in the server HTML and correct with
 * JavaScript disabled.
 */
export type ProofItem = {
  /** The literal string rendered. Never a number to be animated. */
  display: string;
  label: string;
  note: string;
  /** Marks a measured result, which is styled and linked differently. */
  verified?: boolean;
  /** Where the claim is substantiated. */
  href?: string;
  /** Set on the stack readout, which is words rather than a figure. */
  wide?: boolean;
  /** When present, the display string is replaced by a chip row — the
      stack and the delivery focus read better as tags than as a headline
      that wraps to two lines in a quarter-width column. */
  chips?: string[];
};

export const proof: ProofItem[] = [
  {
    display: "5+",
    label: "Years of experience",
    note: "Production React & Next.js since 2020",
  },
  {
    display: "30%",
    label: "Core Web Vitals improvement",
    note: "Measured on Sunhub",
    verified: true,
    href: "/work/sunhub",
  },
  {
    display: "Primary stack",
    label: "What I build with",
    note: "TypeScript, shipped to production",
    chips: ["React", "Next.js", "TypeScript"],
  },
  {
    display: "Production",
    label: "Delivery focus",
    note: "From plan to production, measured not assumed",
    chips: ["Scalable", "Maintainable", "Measurable"],
  },
];

/* ── Process ───────────────────────────────────────────────────────────── */

export const process = [
  {
    step: "Understand",
    detail:
      "Requirements, users, constraints and success criteria — before anything is designed.",
    benefit: "The right problem gets defined before anything is built.",
  },
  {
    step: "Shape",
    detail:
      "Architecture, UX alignment and the key product and system decisions, in writing.",
    benefit: "A plan you can approve before a line of code exists.",
  },
  {
    step: "Build",
    detail:
      "Implementation, integrations and responsive behavior, in reviewable slices.",
    benefit: "Working software you can see progress on, not one big drop at the end.",
  },
  {
    step: "Refine",
    detail:
      "QA, accessibility, performance and cross-browser checks before launch.",
    benefit: "What you ship has been checked on real devices, not only on my screen.",
  },
  {
    step: "Ship",
    detail:
      "Handoff, deployment, documentation and the next round of work.",
    benefit: "What goes live is stable, documented and passable to anyone.",
  },
] as const;

/* ── Engagement ────────────────────────────────────────────────────────── */

export const engagements = [
  {
    title: "Full-time / remote product role",
    detail:
      "A frontend or product engineering seat on a team building something long-lived. Five years on a production platform is the experience I bring to it.",
    cta: { label: "View résumé", href: site.resumeHref },
  },
  {
    title: "Project or contract engagement",
    detail:
      "A defined build with a defined scope — a redesign, a product frontend, an MVP, or a performance pass on something already live.",
    cta: { label: "Discuss your project", href: "/contact" },
  },
  {
    title: "Agency frontend partnership",
    detail:
      "Ongoing white-label React and Next.js delivery behind your brand, under your process and your NDA. You keep the client relationship.",
    cta: { label: "Discuss a partnership", href: "/services/agency-frontend-development" },
  },
] as const;

/* ── What happens next ─────────────────────────────────────────────────────
   The enquiry sequence, stated before anyone fills anything in.

   The friction in a contact form is rarely the fields — it is not knowing
   what the reply will be, or whether a form submission commits you to a sales
   call. Naming the three steps removes both. Deliberately no response-time
   promise: a commitment I cannot verify on the site owner's behalf is exactly
   the kind of claim the accuracy rule at the top of this file exists to
   prevent. */

export const contactSteps = [
  {
    step: "You send the project context",
    detail:
      "The current site, a Figma file, a repository, API notes, or a few lines describing the problem. It does not need to be a finished brief — whatever exists is enough to start from.",
  },
  {
    step: "I review the problem, constraints and likely scope",
    detail:
      "A real read of what is actually in the way, what it would take to fix, and whether it is smaller than you were expecting. No call needed to get this far.",
  },
  {
    step: "I reply with the recommended next step",
    detail:
      "What I would tackle first, and what I would need in order to estimate it properly. If I am the wrong person for it, I will say so and point you somewhere more useful.",
  },
] as const;

/* Risk reduction, stated plainly. Every one of these is a question a cautious
   buyer asks internally before enquiring, and leaving them unanswered is what
   makes an enquiry feel like a commitment rather than a conversation. */

export const assurances = [
  {
    title: "You work directly with me",
    detail:
      "No account manager, no rotating team, no work quietly passed to someone you have not spoken to. The person who scopes it is the person who writes it.",
  },
  {
    title: "Scope is agreed before code exists",
    detail:
      "What is included and what is not, written down before the build starts rather than negotiated halfway through it.",
  },
  {
    title: "Performance is measured before and after",
    detail:
      "A baseline, then the change, then a second measurement. That is the only way either of us can know whether the work did what it claimed.",
  },
  {
    title: "I leave code your team can extend",
    detail:
      "Typed code, feature boundaries and documented decisions in your repository — so the handover is a handover, not a dependency.",
  },
] as const;

/* ── Testimonials ──────────────────────────────────────────────────────────
   Deliberately empty.

   The trust system calls for three to five real testimonials with a name,
   role and company. There are none yet, and the accuracy rule at the top of
   this file is not suspended because a section would look better filled: an
   invented quote is the single fastest way to lose the credibility every
   other page here is built to earn.

   The component that reads this renders nothing while the array is empty, so
   the section appears the moment real quotes exist and never before. Preferred
   structure when collecting: problem → what working together was like →
   result. */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Set once the person has explicitly agreed to be named publicly. */
  permissionGranted: boolean;
};

export const testimonials: Testimonial[] = [];

/* ── Homepage FAQ ──────────────────────────────────────────────────────────
   Objection handling and search intent, in the order buyers actually ask. */

export const homeFaqs = [
  {
    q: "What does a frontend product engineer actually do?",
    a: "Frontend product engineering is the implementation layer that turns product requirements and interface designs into responsive, API-connected web experiences that can be maintained as the product grows. In practice that means owning the interface end to end: architecture, components, state, data fetching, forms, auth-gated areas, performance and deployment — not just styling screens.",
  },
  {
    q: "Can you work with our existing backend and design files?",
    a: "Yes, and that is the usual case. I integrate against an existing REST or API layer rather than requiring a rewrite, and I work from Figma directly — the deliverable is production-ready UI, not a static mockup.",
  },
  {
    q: "Do you take on rebuilds, or only new builds?",
    a: "Both. A large share of the work is rebuilds and refactors: a product that has outgrown its structure, a marketing site that needs to become an application, or a codebase where shipping has become slow. Incremental feature delivery on an existing codebase is a normal engagement.",
  },
  {
    q: "How do you work with agencies?",
    a: "White-label. You sell and own the client relationship; I provide the React and Next.js implementation behind your brand, inside your process and under NDA where required. It adds delivery capacity without a permanent hire.",
  },
  {
    q: "Are you available for full-time roles as well as project work?",
    a: "Yes. I am open to remote product roles, and separately to contract, project and agency engagements. Which one makes sense usually becomes obvious in the first conversation.",
  },
  {
    q: "How do you approach performance?",
    a: "As a feature with a baseline, not a final polish step. On the Sunhub platform that meant removing unused assets, optimising the build pipeline, and applying lazy loading, tree-shaking and image compression — a measured 30% Core Web Vitals improvement. I do not quote performance numbers I have not measured.",
  },
  {
    q: "Will a rebuild or migration cost us our search rankings?",
    a: "Not if SEO preservation is a named deliverable rather than an assumption. That means a URL-by-URL redirect map built from a crawl, the sitemap and Search Console's own indexed-pages report; canonicals and structured data rebuilt to match what the old templates emitted; and indexation monitored for weeks after launch rather than checked once on the day. Rankings are lost by migrations that skip those steps, not by the framework change itself.",
  },
  {
    q: "Can you move us off WordPress but keep our content team publishing?",
    a: "Yes — that is what headless WordPress is for. Content and editing stay in WordPress, Next.js takes over rendering and performance, and nobody has to learn a new publishing workflow. Whether that or a full replacement is right gets decided during the migration audit rather than assumed up front.",
  },
  {
    q: "Do you handle the technical SEO side of a build?",
    a: "Yes, as part of the build rather than as an add-on: canonical URLs, sitemap, robots rules, semantic headings, structured data that matches what is visibly on the page, descriptive internal links and image alt text. What I do not do is ongoing SEO retainers, content marketing or link building — that is a different discipline and I will say so rather than take it on.",
  },
  {
    q: "Where are you based, and does timezone matter?",
    a: "Lahore, Pakistan (UTC+5). I work remotely with teams in Europe, the UK, Australia and North America, with a real overlap window for European and UK mornings and Australian afternoons.",
  },
] as const;

/* ── About ─────────────────────────────────────────────────────────────── */

export const about = {
  h1: "Frontend engineering shaped by real product work",
  intro:
    "I am Muhammad Wahab Ansari, a frontend product engineer based in Lahore, Pakistan. Since 2020 I have worked on production web products across frontend engineering, interface design, performance and client-facing applications.",
  statement: "Design sensibility. Engineering discipline.",
  teaser:
    "I work at the seam between product design and frontend engineering — turning product requirements and Figma designs into interfaces that are maintainable, responsive and ready for real users. My experience spans production React platforms, design systems, performance work and client-facing web applications.",
  narrative: [
    {
      heading: "How the work developed",
      body: "I started from interface and frontend work, then expanded into product engineering: API-connected experiences, reusable component systems, performance optimisation, authentication flows and production delivery. Working on a long-lived product taught me to think beyond individual screens — how a change affects performance, maintainability, users and the features that come after it.",
    },
    {
      heading: "Why a long run on one product is an asset",
      body: "A long-running production platform creates a specific kind of engineering experience: maintaining real systems, shipping incremental change, dealing with regression risk, improving performance over time, and understanding how frontend decisions compound into product quality. My portfolio also includes externally delivered projects that show breadth across different environments and constraints.",
    },
    {
      heading: "Where I am extending",
      body: "Backwards into the stack — Node, Express, Prisma, Postgres — so the frontend I own does not stop at the API boundary. And sideways into practical AI integration: LLM and API-driven features inside real products, with grounded sources, sensible fallbacks and a human in the loop where the workflow needs one.",
    },
  ],
  /* Ordered by buyer relevance, not by biography. A visitor deciding whether
     I can solve their problem needs the production proof and the stack before
     they need to know which city I am in — geography matters to the decision,
     but it is not the first question. The hero card shows all six; the
     homepage teaser shows the first four, which is why those four are the
     ones that have to earn their position. */
  facts: [
    { k: "Experience", v: "5+ years in production" },
    { k: "Title", v: site.role },
    { k: "Core stack", v: "React · Next.js · TypeScript" },
    { k: "Backend capability", v: "Node.js · Express · Prisma · Postgres" },
    { k: "Available for", v: "Projects, product work, agency partnerships" },
    { k: "Based in", v: "Lahore, Pakistan (UTC+5)" },
  ],
} as const;

/* ── Experience ────────────────────────────────────────────────────────── */

export type Experience = {
  company: string;
  role: string;
  client?: string;
  period?: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Oxiliry",
    role: "Senior Frontend Engineer",
    client: "Sunhub",
    period: "Apr 2021 — Present",
    summary:
      "Frontend delivery on a production React platform, with performance treated as a feature rather than an afterthought.",
    highlights: [
      "Improved Core Web Vitals by 30% across production React and Next.js applications through bundle optimisation, lazy loading, tree-shaking, image compression and build-pipeline improvements.",
      "Developed and maintained responsive, production-grade web applications with React, Next.js, TypeScript, reusable components and modern frontend architecture.",
      "Redesigned and enhanced a production chat interface, resolving UX issues while preserving existing functionality, integrations and business logic.",
      "Integrated RESTful APIs and delivered accessible, cross-browser interfaces from Figma, following responsive design, performance, SEO and Agile/Scrum practices.",
    ],
    stack: ["React.js", "REST APIs", "React Hook Form", "Figma", "Git", "Bitbucket", "Jira"],
  },
  {
    company: "Elite International Group",
    role: "User Interface Designer",
    client: "EHS Group",
    period: "Nov 2020 — Mar 2021",
    summary:
      "Led the end-to-end redesign of an LMS platform and built the design system it runs on.",
    highlights: [
      "Led the end-to-end UI redesign of an LMS platform — student dashboards, portals and administrative interfaces — using a component-based approach.",
      "Built and maintained a reusable design system covering components, design tokens, typography, spacing and icon libraries.",
      "Migrated the design workflow from Adobe XD to Figma, improving collaboration, feedback and developer handoff.",
      "Conducted structured design handoffs with developers, ensuring pixel-accurate, responsive and consistent implementation across the product.",
    ],
    stack: ["Figma", "Adobe XD", "Design Systems", "Design Tokens", "Component Libraries"],
  },
];

/* ── Capabilities ──────────────────────────────────────────────────────────
   Depth before breadth. `lead` items are the ones a buyer or recruiter should
   see first; `support` is the rest of the inventory, kept but de-emphasised —
   it is not a 46-item wall any more. */

export type CapabilityGroup = {
  title: string;
  summary: string;
  lead: string[];
  support: string[];
};

export const capabilities: CapabilityGroup[] = [
  {
    title: "Frontend",
    summary: "The core build surface — typed React in production, not prototypes.",
    lead: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"],
    support: ["Tailwind CSS", "Material UI", "Ant Design", "Mantine UI", "SASS", "PostCSS", "Bootstrap"],
  },
  {
    title: "Product engineering",
    summary: "What turns a set of screens into an application people can use.",
    lead: ["API integration", "Responsive systems", "Complex forms", "Authentication flows", "Component libraries"],
    support: ["Redux Toolkit", "Zustand", "Context API", "React Hook Form", "Role-based access"],
  },
  {
    title: "Backend capability",
    summary: "Enough of the stack that the frontend I own does not stop at the API boundary.",
    lead: ["Node.js", "Express.js", "REST APIs"],
    support: ["PostgreSQL", "MongoDB", "Prisma", "Drizzle", "OAuth 2.0", "JWT"],
  },
  {
    title: "Performance",
    summary: "Measured against a baseline, then measured again after the change.",
    lead: ["Core Web Vitals", "Lazy loading", "SSR / SSG", "Image optimisation", "Bundle analysis"],
    support: ["Tree-shaking", "Build pipeline tuning", "Caching strategy", "Technical SEO"],
  },
  {
    title: "Delivery",
    summary: "The unglamorous half of shipping — process, review, deployment.",
    lead: ["Git", "Bitbucket", "Jira", "Vercel", "CI/CD", "Docker"],
    support: ["Agile / Scrum", "Code review", "Figma handoff", "Documentation"],
  },
  {
    title: "AI integration",
    summary: "Practical features inside real products — grounded, with fallbacks.",
    lead: ["LLM / API integration", "Retrieval-based UI patterns", "n8n workflow automation"],
    support: ["Streaming UI states", "Citations and sources", "Human-review workflows"],
  },
];

/* Also available, but not sold as headline services — kept honest and visible
   without letting it define the positioning. */
export const byRequest = [
  "WordPress theme and plugin development",
  "WordPress speed and technical SEO",
  "Email template development",
  "Progressive Web Apps",
  "Landing page development",
];

/** Flat list for the capability marquee. */
export const marquee = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Figma",
  "Core Web Vitals",
  "REST APIs",
  "Vercel",
  "Design Systems",
  "Docker",
  "MongoDB",
];

export const education = [
  { title: "Bachelors", org: "University of Punjab", period: "Aug 2020 — Present", note: "In progress" },
  { title: "Intermediate", org: "Government College Township, Lahore", period: "May 2018", note: "Completed" },
];

export const certifications = [
  {
    title: "Certified Web Designer & Developer",
    org: "PSDF Pakistan",
    period: "March 2020",
    note: "Certified",
  },
];

/* ── Navigation ────────────────────────────────────────────────────────────
   Five entries. Work leads, because proof comes before pitch, and Insights is
   promoted to the top level: it is the authority layer the search strategy
   depends on, and burying it in the footer meant the one section built to be
   found was the hardest to reach. */

export type NavSection = { id: string; label: string; href: string };

export const sections: NavSection[] = [
  { id: "work", label: "Work", href: "/work" },
  { id: "services", label: "Services", href: "/services" },
  { id: "insights", label: "Insights", href: "/insights" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

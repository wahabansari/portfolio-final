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
  role: "Frontend Product Engineer",
  location: "Lahore, Pakistan",
  locationShort: "Lahore, PK",
  timezone: "Asia/Karachi (UTC+5)",
  email: "wahabansari.dev@gmail.com",
  url: "https://wahabansari-portfolio-final.vercel.app",
  available: true,
  availabilityNote: "Open to remote roles and selected projects",
  resumeHref: "/Muhammad-Wahab-Ansari-Resume.pdf",
} as const;

/**
 * The positioning sentence. Used verbatim on the homepage, /about, the résumé
 * and the LinkedIn bio — entity consistency is the whole point, so it does not
 * get reworded per surface.
 */
export const positioning =
  "I am a Frontend Product Engineer specialising in React and Next.js, with 5+ years of production experience building web products, customer-facing interfaces and performance-focused frontend systems.";

/** For direct clients. */
export const commercialSentence =
  "I help product teams and growing businesses redesign, build and improve web products that need better frontend execution.";

/** For agency outreach. */
export const agencySentence =
  "I help agencies ship React and Next.js projects when their client pipeline is ahead of their internal frontend capacity.";

/** Homepage <meta description>. Kept under 160 characters so it isn't truncated. */
export const metaDescription =
  "Frontend Product Engineer building production React and Next.js applications, SaaS products, conversion-focused websites and AI-enabled product experiences.";

export const socials = [
  { label: "GitHub", handle: "github.com/wahabansari", href: "https://github.com/wahabansari" },
  { label: "LinkedIn", handle: "linkedin.com/in/wahabansari", href: "https://linkedin.com/in/wahabansari" },
  { label: "Email", handle: site.email, href: `mailto:${site.email}` },
] as const;

/* ── Hero ──────────────────────────────────────────────────────────────── */

export const hero = {
  eyebrow: "Open to remote roles + selected projects",
  headline: "I build production-grade web products that are fast, clear and built to ship.",
  support:
    "Frontend Product Engineer with 5+ years of production experience building React and Next.js applications, product interfaces and customer-facing web experiences. I work with product teams, agencies and businesses that need reliable frontend execution.",
  primaryCta: { label: "Start a project", href: "/contact" },
  secondaryCta: { label: "View selected work", href: "/work" },
} as const;

/**
 * Proof strip. `numeric` values count up from zero; the rest render as-is.
 * Every entry has to be verifiable from the case studies or the CV.
 */
export const proof = [
  { value: 5, suffix: "+", numeric: true, label: "Years production experience", note: "Shipping since 2020" },
  { value: 7, suffix: "", numeric: true, label: "Live projects", note: "All publicly linked" },
  { value: 30, suffix: "%", numeric: true, label: "Core Web Vitals improvement", note: "Measured on Sunhub", verified: true },
  { value: 0, suffix: "", numeric: false, display: "React · Next.js · TS", label: "Core stack", note: "Typed, in production" },
] as const;

/* ── Process ───────────────────────────────────────────────────────────── */

export const process = [
  {
    step: "Understand",
    detail: "Clarify the user, the business goal and the constraints before anything is designed or written.",
  },
  {
    step: "Structure",
    detail: "Define the UX, the technical approach and the delivery scope, so what gets built is what was agreed.",
  },
  {
    step: "Build",
    detail: "Implement the interface with reusable components and clean integration points against your API.",
  },
  {
    step: "Ship",
    detail: "Test responsive behaviour, performance and production readiness, then deploy.",
  },
  {
    step: "Improve",
    detail: "Iterate from real usage, feedback and measurable issues rather than assumptions.",
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
    cta: { label: "Start a project", href: "/contact" },
  },
  {
    title: "Agency frontend partnership",
    detail:
      "Ongoing white-label React and Next.js delivery behind your brand, under your process and your NDA. You keep the client relationship.",
    cta: { label: "Discuss a partnership", href: "/services/agency-frontend-development" },
  },
] as const;

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
  facts: [
    { k: "Based in", v: "Lahore, Pakistan" },
    { k: "Working since", v: "2020" },
    { k: "Title", v: "Frontend Product Engineer" },
    { k: "Core stack", v: "React · Next.js · TypeScript" },
    { k: "Backend capability", v: "Node.js · Express · Prisma · Postgres" },
    { k: "Available for", v: "Remote roles, projects, agency partnerships" },
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
    role: "Frontend Developer",
    client: "Sunhub",
    summary:
      "Owned frontend delivery on a production React platform, with performance treated as a feature rather than an afterthought.",
    highlights: [
      "Delivered a 30% performance improvement by eliminating unused assets, optimising the build pipeline and implementing front-end performance strategies — improving Core Web Vitals and user retention.",
      "Reached that result through lazy loading, tree-shaking, removal of unused assets, image compression and a streamlined build process.",
      "Built responsive, high-performance React interfaces with cross-browser consistency across devices.",
      "Worked from Figma with UI/UX designers, translating wireframes and high-fidelity mockups into accessible production interfaces.",
      "Integrated REST APIs and built form validation with React Hook Form, covering data handling, error states and recovery.",
      "Worked in Agile/Scrum — stand-ups, sprint planning, retrospectives — with version control across Git and Bitbucket.",
    ],
    stack: ["React.js", "REST APIs", "React Hook Form", "Figma", "Git", "Bitbucket", "Jira"],
  },
  {
    company: "Elite International Group",
    role: "User Interface Designer",
    client: "EHS Group",
    summary:
      "Led the end-to-end redesign of an LMS platform and built the design system the product still runs on.",
    highlights: [
      "Led the redesign of a full LMS platform, migrating the design workflow from Adobe XD to Figma and cutting design-to-development handoff time.",
      "Reimagined dashboards, student portals and admin panels using a component-based approach built for long-term consistency.",
      "Built and maintained a design system — reusable components, tokens, typography, spacing rules and icon libraries — across the product.",
      "Ran structured handoff sessions with developers, removing ambiguity between design intent and shipped output.",
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
  "WordPress to Next.js migration",
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
   Four entries. Work leads, because proof comes before pitch. */

export type NavSection = { id: string; label: string; href: string };

export const sections: NavSection[] = [
  { id: "work", label: "Work", href: "/work" },
  { id: "services", label: "Services", href: "/services" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

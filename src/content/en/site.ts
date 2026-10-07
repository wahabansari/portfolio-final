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
  /** The studio. The founder is a separate fact (`founder`, below). */
  name: "Craftwise",
  shortName: "Craftwise",
  initials: "CW",
  role: "Software Development Studio",
  location: "Lahore, Pakistan",
  locationShort: "Lahore, PK",
  timezone: "Asia/Karachi (UTC+5)",
  email: "wahabansari.dev@gmail.com",
  url: "https://wahabansari-portfolio-final.vercel.app",
  available: true,
  availabilityNote: "Available for selected projects and agency partnerships",
  /** The résumé file stays in /public for direct requests; the site does not promote it. */
  resumeHref: "/Resume-FEE-Extended.pdf",
} as const;

/** The person behind the studio. Used for the Person entity and the About page. */
export const founder = {
  name: "Muhammad Wahab Ansari",
  shortName: "Wahab Ansari",
  role: "Founder, Craftwise",
  experience: "5+ years in production",
} as const;

/**
 * The positioning sentence. Used verbatim on the homepage, /about, the résumé
 * and the LinkedIn bio — entity consistency is the whole point, so it does not
 * get reworded per surface.
 */
export const positioning =
  "Craftwise is a founder-led software development studio that helps small businesses and agencies build, improve, modernize and automate their software and digital systems.";

/**
 * The commercial promise — the one sentence a buyer could repeat to a
 * colleague without reopening the site. It names the audiences before the
 * technology on purpose: a reader is looking for themselves in the sentence,
 * not for a stack list.
 */
export const promise =
  "We help small businesses and agencies build new digital products and business systems, modernize existing software and automate practical workflows.";

/** For direct clients. */
export const commercialSentence =
  "We help small businesses build websites, web applications and business systems that fit how they work.";

/** For agency outreach. */
export const agencySentence =
  "We help agencies deliver web and software projects when client demand is ahead of their engineering capacity.";

/** Homepage <meta description>. Kept under 160 characters so it isn't truncated. */
export const metaDescription =
  "Founder-led software development studio for small businesses and agencies: custom web apps, business dashboards, modernization and AI automation.";

export const socials = [
  { label: "GitHub", handle: "github.com/wahabansari", href: "https://github.com/wahabansari" },
  { label: "LinkedIn", handle: "linkedin.com/in/wahabansari", href: "https://linkedin.com/in/wahabansari" },
  { label: "Email", handle: site.email, href: `mailto:${site.email}` },
] as const;

/* ── Hero ──────────────────────────────────────────────────────────────── */

export const hero = {
  eyebrow: "Software development studio",
  headline: "Digital products and business systems, built to work.",
  support:
    "We help small businesses and agencies build, improve, modernize and automate their software and digital systems.",
  primaryCta: { label: "Start a project", href: "/contact" },
  secondaryCta: { label: "View our work", href: "/work" },
  availability: "Available for selected projects and agency partnerships",
} as const;

/* ── Problem selector ──────────────────────────────────────────────────────
   "What are you trying to solve?" — the homepage's routing layer.

   Exactly four entries, one per service, each phrased the way a buyer says it
   rather than in the studio's vocabulary. No two entries share a destination,
   or the selector would be decoration rather than navigation. */

export const problemPaths = [
  {
    problem: "We need to build something new",
    href: "/services/custom-web-development",
    label: "Custom Web Development",
  },
  {
    problem: "We need a business system or dashboard",
    href: "/services/business-dashboards",
    label: "Business Dashboards & Custom Software",
  },
  {
    problem: "Our existing software needs an upgrade",
    href: "/services/software-modernization",
    label: "Software Modernization",
  },
  {
    problem: "We want to automate repetitive work",
    href: "/services/ai-business-automation",
    label: "AI Business Automation",
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
    label: "Production experience",
    note: "React and Next.js in production since 2020",
  },
  {
    display: "30%",
    label: "Measured Core Web Vitals improvement",
    note: "On Sunhub, a production React marketplace",
    verified: true,
    href: "/work/sunhub",
  },
  {
    display: "React, Next.js, TypeScript",
    chips: ["React", "Next.js", "TypeScript"],
    label: "Core engineering stack",
    note: "Shipped to production",
  },
  {
    display: "Founder-led",
    label: "Direct engineering ownership",
    note: "The person who scopes the work builds it",
  },
];

/* ── Process ───────────────────────────────────────────────────────────── */

export const process = [
  {
    step: "Understand",
    detail: "Requirements, users, goals and constraints.",
    benefit: "The right problem is defined before anything is built.",
  },
  {
    step: "Shape",
    detail: "Scope, UX and technical direction.",
    benefit: "A plan you can approve before a line of code exists.",
  },
  {
    step: "Build",
    detail: "Reviewable production work.",
    benefit: "Working software you can see progress on, not one big drop at the end.",
  },
  {
    step: "Refine",
    detail: "QA, accessibility, responsiveness and performance.",
    benefit: "What ships has been checked on real devices.",
  },
  {
    step: "Ship",
    detail: "Deployment, documentation and handover.",
    benefit: "What goes live is stable, documented and ready to hand over.",
  },
] as const;

/* ── Engagement ────────────────────────────────────────────────────────── */

export const engagements = [
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
      "The current site, a Figma file, a repository, API notes, or a few lines describing the problem. It does not need to be a finished brief: whatever exists is enough to start from.",
  },
  {
    step: "We review the problem, constraints and likely scope",
    detail:
      "A real read of what is actually in the way, what it would take to fix, and whether it is smaller than you were expecting. No call needed to get this far.",
  },
  {
    step: "We reply with the recommended next step",
    detail:
      "What we would tackle first, and what we would need in order to estimate it properly. If we are the wrong fit, we will say so and point you somewhere more useful.",
  },
] as const;

/* Why Craftwise: three reasons, each tied to something demonstrable rather
   than to an adjective. Capability, then the benefit, then the basis. */

export const assurances = [
  {
    title: "Direct ownership",
    detail:
      "The person who scopes the work is the person who builds it, so nothing is lost between the conversation and the code.",
  },
  {
    title: "Clear communication",
    detail:
      "Scope is agreed in writing before the build starts, and progress is visible in reviewable slices rather than one drop at the end.",
  },
  {
    title: "Quality beyond launch",
    detail:
      "Performance is measured before and after, and the code is typed and documented so your team can keep extending it without us.",
  },
] as const;

/* ── Testimonials ──────────────────────────────────────────────────────────
   Two real reviews from completed Upwork contracts, lightly edited for
   flow and length — not for substance. Nothing here claims anything the
   original review didn't already say; the accuracy rule at the top of this
   file still applies to a light rephrase the same way it applies to
   anything else on the site.

   The trust system calls for three to five; two is a start, not the target
   — add the next one here as soon as it exists rather than holding these
   back waiting for a round number. */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Set once the person has explicitly agreed to be named publicly. */
  permissionGranted: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "He asked the right questions before and throughout the project, delivered on time, and the result exceeded what I expected. Professional and easy to work with — I'd hire him again.",
    name: "Dee Philipp",
    role: "Client",
    company: "Upwork",
    permissionGranted: true,
  },
  {
    quote:
      "Quick to implement our Next.js setup in GitHub and Vercel — just be clear on what you need, and he delivers fast.",
    name: "Marcus Wendt",
    role: "Client",
    company: "Upwork",
    permissionGranted: true,
  },
];

/* ── Homepage FAQ ──────────────────────────────────────────────────────────
   Objection handling and search intent, in the order buyers actually ask. */

export const homeFaqs = [
  {
    q: "What type of projects do you take on?",
    a: "Business websites and web applications, dashboards and internal tools, improvements to existing software, and workflow automation. We work with small businesses and with digital, creative and web agencies.",
  },
  {
    q: "Can you work with an existing application?",
    a: "Yes. Improving, migrating and extending existing software is a large part of the work. The first step is understanding what is already there and what can stay.",
  },
  {
    q: "Can you work with our existing backend?",
    a: "Yes. Most projects connect to an API or backend that already exists. We do not need it rewritten to build the interface in front of it.",
  },
  {
    q: "Can you work from Figma?",
    a: "Yes, and it is the usual starting point. The deliverable is production-ready UI rather than a static mockup. If there is no design yet, we can help shape one.",
  },
  {
    q: "How does a project start?",
    a: "You send a message describing what you want to build, improve or fix. We read it and reply with a clear next step, asking for more detail if something is unclear. If it looks like a good fit, the next step is a conversation about scope and approach. Nothing is agreed until both sides confirm it.",
  },
  {
    q: "Can you work with agencies?",
    a: "Yes. Digital, creative and web agencies can work with us on the build side of a client project. You keep the client relationship; we work inside your process and, where needed, under your NDA.",
  },
] as const;

/* ── About ─────────────────────────────────────────────────────────────── */

export const about = {
  h1: "Who is behind Craftwise?",
  intro:
    "Craftwise is a founder-led software development studio, run by me, Muhammad Wahab Ansari, from Lahore, Pakistan. I scope the work, build it and stay accountable for it. There is no layer of account managers between the conversation and the code.",
  statement: "Design sensibility. Engineering discipline.",
  teaser:
    "I started in interface design and moved into production frontend engineering, so I think about how something looks, how it behaves and how it will be maintained at the same time.",
  narrative: [
    {
      heading: "How the work developed",
      body: "I started from interface design: at Elite International Group I led a redesign of an LMS platform and built the design system it runs on. Since 2020 I have worked in production engineering, and at Oxiliry I have spent several years on one long-lived React platform. That means API-connected experiences, component systems, performance work and authentication flows, shipped into a product that real people use every day.",
    },
    {
      heading: "Why a long run on one product matters",
      body: "Maintaining a real system for years teaches things a new build does not: shipping incremental change safely, living with regression risk, and seeing how early decisions compound into product quality. That is the experience the studio brings to a new project, and to a rescue of an existing one.",
    },
    {
      heading: "Where the studio is extending",
      body: "Backwards into the stack (Node, Express, Prisma, Postgres) so the interface does not stop at the API boundary. And sideways into practical automation: workflow and API-driven features with sensible fallbacks and a human in the loop where the work needs one.",
    },
  ],
  facts: [
    { k: "Studio", v: "Craftwise, founder-led" },
    { k: "Experience", v: "5+ years in production" },
    { k: "Core stack", v: "React · Next.js · TypeScript" },
    { k: "Backend capability", v: "Node.js · Express · Prisma · Postgres" },
    { k: "Available for", v: "Selected projects and agency partnerships" },
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
    summary: "Enough of the stack that the frontend we build does not stop at the API boundary.",
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
    title: "Workflow automation",
    summary: "Practical automation inside real workflows, with fallbacks and human review.",
    lead: ["API integration", "n8n workflow automation", "LLM / API integration"],
    support: ["Streaming UI states", "Citations and sources", "Human-review workflows"],
  },
];

/* Also available on request, but not sold as headline services — kept honest and visible
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

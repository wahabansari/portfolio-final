/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITE CONTENT — single source of truth.
 * Every word on the site comes from this file. Edit here, nowhere else.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Muhammad Wahab Ansari",
  shortName: "Wahab Ansari",
  initials: "MWA",
  role: "Frontend Engineer",
  roleLong: "Frontend Engineer specializing in React.js & Next.js",
  tagline: "Expanding full-stack expertise with Node.js",
  location: "Lahore, Pakistan",
  locationShort: "LHR, PK",
  timezone: "Asia/Karachi",
  coordinates: "31.5204° N, 74.3587° E",
  email: "wahabansari.dev@gmail.com",
  url: "https://wahabansari.dev",
  available: true,
  availabilityNote: "Open to roles and freelance projects",
  resumeHref: "/Muhammad-Wahab-Ansari-Resume.pdf",
} as const;

export const socials = [
  { label: "GitHub", handle: "/wahabansari", href: "https://github.com/wahabansari" },
  { label: "LinkedIn", handle: "/wahabansari", href: "https://linkedin.com/in/wahabansari" },
  { label: "Email", handle: site.email, href: `mailto:${site.email}` },
] as const;

export const summary =
  "Results-driven frontend developer with 5 years of experience building scalable, high-performance web applications from concept to deployment. Proven track record of delivering measurable impact, including a 30% Core Web Vitals improvement. Specialized in React.js and Next.js with strong command of SEO, responsive design, and pixel-perfect UI implementation.";

export const summaryShort =
  "Five years building production React and Next.js applications, extending into Node.js and AI automation. Available to hire full-time, or to take on your project.";

/** Hero readouts. `value` is animated up from zero when `numeric` is set. */
export const stats = [
  { value: 5, suffix: "+", numeric: true, label: "Years shipping", sub: "since 2020" },
  { value: 30, suffix: "%", numeric: true, label: "Core Web Vitals lift", sub: "measured, not guessed" },
  { value: 5, suffix: "", numeric: true, label: "Production platforms", sub: "live & serving users" },
  { value: 1, suffix: "", numeric: false, display: "∞", label: "Design systems built", sub: "tokens to components" },
] as const;

export const about = {
  statement:
    "I sit in the seam between design and engineering — the place where a Figma file becomes something a browser can render in under a second.",
  paragraphs: [
    "Five years in, most of my work has been the unglamorous kind that actually moves numbers: stripping unused assets out of a bundle, rewriting a build pipeline, arguing for a lazy-loading boundary. On one platform that discipline returned a 30% Core Web Vitals improvement — and with it, better retention.",
    "Before I wrote production React full-time, I was the person building the design system. I migrated an entire LMS design workflow from Adobe XD to Figma, then defined the tokens, typography, spacing rules and component library the whole product ran on. That background is why my implementations tend to land pixel-perfect the first time — I already know what the designer meant.",
    "These days I'm extending in two directions: backwards into the stack — Node, Express, Prisma, Postgres — so the frontend I own doesn't stop at the API boundary, and sideways into AI automation, wiring tools together with n8n and the Gemini API so the repetitive work runs itself.",
  ],
  facts: [
    { k: "Based in", v: "Lahore, Pakistan" },
    { k: "Working since", v: "2020" },
    { k: "Core stack", v: "React · Next.js · TypeScript" },
    { k: "Backend", v: "Node.js · Express · Prisma" },
    { k: "Currently learning", v: "AI automation · LLMs · n8n workflows" },
    { k: "Available for", v: "Roles & freelance projects" },
  ],
} as const;

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
      "Delivered a 30% performance boost by eliminating unused assets, optimising the build pipeline, and implementing advanced front-end performance strategies — directly improving Core Web Vitals and user retention.",
      "Achieved that improvement through lazy loading, tree-shaking, removal of unused assets, image compression, and a fully streamlined build-process optimisation pipeline.",
      "Designed and developed responsive, high-performance React apps, ensuring cross-browser compatibility and a seamless experience across all devices.",
      "Collaborated closely with UI/UX designers in Figma to translate wireframes and high-fidelity mock-ups into pixel-perfect, accessible frontend interfaces.",
      "Integrated RESTful APIs and built robust form validation with React Hook Form, ensuring reliable data handling, error management, and smooth user interactions.",
      "Participated in Agile/Scrum ceremonies — daily stand-ups, sprint planning, retrospectives — maintaining clean, version-controlled code across Git and Bitbucket.",
    ],
    stack: ["React.js", "REST APIs", "React Hook Form", "Figma", "Git", "Bitbucket", "Jira"],
  },
  {
    company: "Elite International Group",
    role: "User Interface Designer",
    client: "EHS Group",
    summary:
      "Led the end-to-end redesign of a full LMS platform and built the design system the product still runs on.",
    highlights: [
      "Led the end-to-end redesign of a full LMS platform — migrating the entire design workflow from Adobe XD to Figma, enabling real-time collaboration and cutting design-to-development handoff time significantly.",
      "Executed a full redesign of the LMS — reimagining dashboards, student portals, and admin panels using a component-based approach built for long-term consistency and maintainability.",
      "Built and maintained a comprehensive design system — defining reusable UI components, tokens, typography, spacing rules, and icon libraries to ensure visual consistency across the entire product.",
      "Collaborated directly with developers through structured handoff sessions, ensuring pixel-perfect implementation and eliminating ambiguity between design intent and final output.",
    ],
    stack: ["Figma", "Adobe XD", "Design Systems", "Design Tokens", "Component Libraries"],
  },
];

export type Project = {
  slug: string;
  title: string;
  year?: string;
  kind: string;
  href: string;
  domain: string;
  blurb: string;
  detail: string;
  tools: string[];
  metrics?: { k: string; v: string }[];
  /** Optional real screenshot dropped into /public/work — falls back to a generated plate. */
  image?: string;
  /** Drives the generated preview plate when no image exists. */
  plate: "app" | "commerce" | "marketplace" | "portal" | "listing";
};

export const projects: Project[] = [
  {
    slug: "verdira",
    title: "Verdira",
    kind: "Web Application",
    href: "https://verdira.com/",
    domain: "verdira.com",
    blurb:
      "A static marketing site rebuilt as a scalable web application with authentication and password-protected client areas.",
    detail:
      "Rebuilt a static marketing website into a scalable web application with a structured architecture focused on long-term growth. Implemented authentication and password-protected client areas, improved application performance, and reorganized the codebase to make it easier to maintain and extend. Collaborated with stakeholders to deliver a secure, responsive, and user-friendly platform capable of supporting future business requirements.",
    tools: ["Next.js", "Tailwind CSS", "Vercel", "Authentication"],
    metrics: [
      { k: "Scope", v: "Static → App" },
      { k: "Focus", v: "Auth & architecture" },
    ],
    plate: "app",
  },
  {
    slug: "vape-planet",
    title: "Vape Planet",
    kind: "E-Commerce",
    href: "https://vapeplanet.co.uk/",
    domain: "vapeplanet.co.uk",
    blurb:
      "Production e-commerce frontend built solo — responsive, pixel-perfect, with integrated payment workflows.",
    detail:
      "Independently developed the frontend of a production e-commerce platform using Next.js, Material UI, and Tailwind CSS. Built responsive, pixel-perfect user interfaces from concept to implementation, integrated frontend payment workflows, and optimized the application for performance and scalability. Focused on creating reusable components and delivering a modern shopping experience across desktop and mobile.",
    tools: ["Next.js", "React", "Tailwind CSS", "Material UI"],
    metrics: [
      { k: "Ownership", v: "Solo frontend" },
      { k: "Focus", v: "Payments & reuse" },
    ],
    plate: "commerce",
  },
  {
    slug: "aussiemotor",
    title: "AussieMotor",
    kind: "Marketplace",
    href: "https://aussiemotor.com.au/",
    domain: "aussiemotor.com.au",
    blurb:
      "Large automotive marketplace migrated off WordPress onto Next.js, with reusable dashboard interfaces.",
    detail:
      "Contributed to migrating a large automotive marketplace from WordPress to a scalable Next.js application, improving maintainability and overall performance. Developed responsive, reusable UI components with Mantine UI and Tailwind CSS while collaborating with the team on dashboard interfaces and frontend features that delivered a faster, more consistent experience across devices.",
    tools: ["Next.js", "Tailwind CSS", "Mantine UI", "Firebase", "MongoDB"],
    metrics: [
      { k: "Migration", v: "WordPress → Next.js" },
      { k: "Focus", v: "Dashboards & components" },
    ],
    plate: "marketplace",
  },
  {
    slug: "digestive-care",
    title: "Digestive Care",
    kind: "Healthcare Portal",
    href: "https://digestivecarepl.com/",
    domain: "digestivecarepl.com",
    blurb:
      "Healthcare site with an integrated patient portal, appointment booking, and heavily customized WordPress internals.",
    detail:
      "Developed a healthcare website with an integrated patient portal by extensively customizing WordPress themes and functionality to match the client's branding and workflow requirements. Implemented responsive layouts, integrated appointment booking, and connected the patient portal to provide a seamless experience for both patients and healthcare professionals.",
    tools: ["WordPress", "HTML5", "CSS3", "JavaScript"],
    metrics: [
      { k: "Feature", v: "Patient portal" },
      { k: "Feature", v: "Appointment booking" },
    ],
    plate: "portal",
  },
  {
    slug: "talha-estate",
    title: "Talha Estate",
    kind: "Real Estate CMS",
    href: "https://talhaestate.com/",
    domain: "talhaestate.com",
    blurb:
      "Full real estate platform with a scalable CMS architecture for managing property listings and content.",
    detail:
      "Designed and developed a complete real estate platform with a scalable CMS architecture for managing property listings and content efficiently. Built responsive interfaces using HTML, CSS, and JavaScript, customized WordPress functionality through custom plugins, and created a structured user experience that simplified property management while improving usability across all devices.",
    tools: ["WordPress", "Custom Plugins", "HTML5", "CSS3", "JavaScript"],
    metrics: [
      { k: "Architecture", v: "Scalable CMS" },
      { k: "Scope", v: "Design → build" },
    ],
    plate: "listing",
  },
];

export type SkillGroup = { title: string; code: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    title: "Frontend Development",
    code: "FE",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"],
  },
  {
    title: "UI Frameworks & Styling",
    code: "UI",
    items: ["Tailwind CSS", "Material UI", "Mantine UI", "Ant Design", "Bootstrap", "SASS", "PostCSS"],
  },
  {
    title: "State Management",
    code: "ST",
    items: ["Redux Toolkit", "Zustand", "Context API"],
  },
  {
    title: "Backend & APIs",
    code: "BE",
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Databases & ORM",
    code: "DB",
    items: ["PostgreSQL", "MongoDB", "Prisma", "Drizzle"],
  },
  {
    title: "Authentication",
    code: "AU",
    items: ["OAuth 2.0", "JWT", "Role-Based Access Control"],
  },
  {
    title: "Performance & SEO",
    code: "PF",
    items: ["Core Web Vitals", "Lazy Loading", "SSR", "SSG", "SEO Optimisation"],
  },
  {
    title: "DevOps & Deployment",
    code: "OP",
    items: ["Git", "Bitbucket", "Jira", "Docker", "Vercel", "CI/CD Pipelines"],
  },
  {
    title: "Mobile & Cross-Platform",
    code: "MB",
    items: ["NativeScript", "Progressive Web Apps", "Responsive Design"],
  },
  {
    title: "AI & Automation",
    code: "AI",
    items: ["n8n Workflow Automation", "Gemini API", "REST API Integration"],
  },
  {
    title: "CMS & Others",
    code: "CM",
    items: ["WordPress", "Email Template Design", "Landing Page Development"],
  },
];

/** Flat marquee list. */
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
  "Redux Toolkit",
  "Zustand",
  "Docker",
  "Vercel",
  "Design Systems",
  "REST APIs",
  "MongoDB",
];

export const education = [
  {
    title: "Bachelors",
    org: "University of Punjab",
    period: "Aug 2020 — Present",
    note: "In progress",
  },
  {
    title: "Intermediate",
    org: "Government College Township, Lahore",
    period: "May 2018",
    note: "Completed",
  },
];

export const certifications = [
  {
    title: "Certified Web Designer & Developer",
    org: "PSDF Pakistan",
    period: "March 2020",
    note: "Certified",
  },
];

export type Service = {
  slug: string;
  title: string;
  accent: "blue" | "red" | "yellow" | "green";
  blurb: string;
  includes: string[];
  /** Set once a category page exists under /services. */
  href?: string;
};

/** Offered services. Each maps to a capability already listed in `skills`. */
export const services: Service[] = [
  {
    slug: "frontend",
    title: "Frontend engineering",
    accent: "blue",
    href: "/services/frontend",
    blurb:
      "Production React and Next.js interfaces, built from your designs and shipped pixel-perfect on every device.",
    includes: [
      "React.js & Next.js applications",
      "Figma handoff to pixel-perfect UI",
      "Responsive, cross-browser builds",
      "Reusable component libraries",
    ],
  },
  {
    slug: "fullstack",
    title: "Full-stack development",
    accent: "green",
    blurb:
      "The interface plus everything behind it — APIs, databases and auth — so one person owns the whole feature end to end.",
    includes: [
      "Node.js & Express REST APIs",
      "PostgreSQL & MongoDB via Prisma or Drizzle",
      "OAuth 2.0, JWT & role-based access",
      "Vercel deployment with CI/CD",
    ],
  },
  {
    slug: "ai-automation",
    title: "AI automation",
    accent: "red",
    href: "/services/automation",
    blurb:
      "Workflows that remove the manual steps — connecting your tools to each other, and to models that handle the repetitive thinking.",
    includes: [
      "n8n workflow automation",
      "Gemini API & LLM integrations",
      "REST integrations between existing tools",
      "Automated content & data pipelines",
    ],
  },
  {
    slug: "performance",
    title: "Performance & SEO",
    accent: "yellow",
    blurb:
      "Audits and fixes that actually move Core Web Vitals — the same work that returned a 30% improvement on a live platform.",
    includes: [
      "Core Web Vitals audit & remediation",
      "Bundle, asset & image optimisation",
      "SSR / SSG rendering strategy",
      "Technical SEO implementation",
    ],
  },
];

/** Nav entries. `href` overrides the default `/#id` anchor. */
export type NavSection = { id: string; label: string; href?: string };

export const sections: NavSection[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services", href: "/services" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "background", label: "Background" },
  { id: "contact", label: "Contact" },
];

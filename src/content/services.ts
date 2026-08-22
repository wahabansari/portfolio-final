/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SERVICE CATALOGUE — single source of truth for every /services route.
 *
 * Two levels:
 *   ServiceCategory  → /services/[category]        e.g. /services/frontend
 *   ServiceDetail    → /services/[category]/[slug] e.g. .../email-templates
 *
 * Everything the detail pages render — copy, SEO metadata, FAQs, schema — comes
 * from here. Adding a service means adding one object; the routes, sitemap,
 * category listing and structured data all pick it up automatically.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Accent = "blue" | "red" | "yellow" | "green";

export type ServiceDetail = {
  slug: string;
  /** H1 and card title. */
  title: string;
  /** Sits under the title on the detail page. */
  tagline: string;
  /** One sentence, used on category and index cards. */
  summary: string;

  /* ── SEO ────────────────────────────────────────────────────────────── */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];

  /* ── Page body ──────────────────────────────────────────────────────── */
  /** Opening paragraphs. */
  intro: string[];
  /** The pain this service addresses. */
  problem: { heading: string; body: string };
  /** Concrete deliverables. */
  deliverables: { title: string; detail: string }[];
  /** How the engagement runs. */
  process: { step: string; detail: string }[];
  /** Tools and technologies used. */
  stack: string[];
  /** Who this is a good fit for. */
  idealFor: string[];
  /** Also powers FAQPage structured data. */
  faqs: { q: string; a: string }[];
};

export type ServiceCategory = {
  slug: string;
  title: string;
  /** Nav and breadcrumb label. */
  shortTitle: string;
  accent: Accent;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string[];
  services: ServiceDetail[];
};

export const serviceCategories: ServiceCategory[] = [
  /* ══════════════════════════════════════════════════════════════════════
     FRONTEND
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "frontend",
    title: "Frontend & interface services",
    shortTitle: "Frontend",
    accent: "blue",
    tagline: "Interfaces designed and built by the same person",
    metaTitle: "Frontend Development Services — React, Next.js & UI Design",
    metaDescription:
      "Frontend services from a developer who also designs: email templates, website and dashboard redesigns, and UI/UX work in Figma. React, Next.js and TypeScript.",
    keywords: [
      "frontend development services",
      "react developer for hire",
      "next.js development services",
      "ui ux design services",
      "dashboard redesign",
      "email template development",
    ],
    intro: [
      "Most frontend problems are really handoff problems — a design that never quite survives the trip into code, or a codebase that has drifted so far from the design that nobody trusts it any more.",
      "I work on both sides of that line. Five years of production React and Next.js, and before that a role building design systems in Figma. That means fewer rounds of back-and-forth, and interfaces that look in the browser the way they looked in the file.",
    ],
    services: [
      /* ── Email templates ─────────────────────────────────────────────── */
      {
        slug: "email-template-development",
        title: "Email template development",
        tagline: "Responsive HTML email that survives Outlook",
        summary:
          "Hand-coded, responsive HTML email templates that render correctly across Gmail, Outlook, Apple Mail and mobile clients.",
        metaTitle: "Email Template Development — Responsive HTML Email",
        metaDescription:
          "Hand-coded responsive HTML email templates tested across Gmail, Outlook, Apple Mail and mobile. Ready to drop into Mailchimp, Klaviyo, HubSpot or any ESP.",
        keywords: [
          "email template development",
          "responsive html email",
          "custom email template",
          "mailchimp email template",
          "klaviyo email template",
          "outlook compatible email template",
          "html email developer",
        ],
        intro: [
          "Email is the one place on the web where modern CSS mostly does not apply. Outlook on Windows still renders through Microsoft Word. Gmail clips messages over 102KB. Dark mode inverts colours you never asked it to touch.",
          "So email templates get hand-coded, not exported from a page builder. I build them the way they actually have to be built — tables, inline styles, and a tested fallback for every client that needs one.",
        ],
        problem: {
          heading: "Why exported templates break",
          body: "Drag-and-drop builders and design-tool exports produce markup that assumes a modern rendering engine. It looks right in the preview pane and then collapses in Outlook, stretches on Android, or gets clipped halfway down in Gmail. By the time you find out, the campaign has already gone.",
        },
        deliverables: [
          {
            title: "Hand-coded responsive HTML",
            detail:
              "Table-based structure with inline CSS, built to degrade gracefully rather than depend on support that isn't there.",
          },
          {
            title: "Tested across major clients",
            detail:
              "Checked in Gmail (web, iOS, Android), Outlook on Windows, Apple Mail and common mobile clients before handoff.",
          },
          {
            title: "Dark mode handling",
            detail:
              "Colours and logos that stay legible when a client inverts the palette, instead of turning into dark text on a dark background.",
          },
          {
            title: "Modular sections",
            detail:
              "Reusable blocks — hero, feature row, product grid, footer — so your team can assemble future campaigns without going back to a developer.",
          },
          {
            title: "ESP-ready delivery",
            detail:
              "Uploaded and configured in Mailchimp, Klaviyo, HubSpot or your own platform, with merge tags wired up.",
          },
        ],
        process: [
          {
            step: "Brief and design",
            detail:
              "You send a design, a rough sketch, or an existing email you want rebuilt. If there's no design yet, I can produce one first.",
          },
          {
            step: "Build",
            detail: "Hand-coded to your brand, with the modular blocks agreed up front.",
          },
          {
            step: "Test",
            detail:
              "Rendered across the major clients and fixed until it holds, including dark mode and mobile widths.",
          },
          {
            step: "Handoff",
            detail:
              "Delivered as source files and loaded into your ESP, with a short guide on editing the blocks safely.",
          },
        ],
        stack: ["HTML5", "Inline CSS", "Mailchimp", "Klaviyo", "HubSpot", "Responsive design"],
        idealFor: [
          "Teams whose campaigns break in Outlook",
          "Brands moving off a drag-and-drop builder",
          "Agencies needing a reliable template partner",
          "Product teams sending transactional email",
        ],
        faqs: [
          {
            q: "Which email clients do you test in?",
            a: "Gmail on web, iOS and Android; Outlook on Windows (the Word rendering engine, which is usually where problems appear); Apple Mail on macOS and iOS; and common Android clients. If your audience skews toward a client outside that list, tell me and it goes into the test matrix.",
          },
          {
            q: "Can you work from a Figma design?",
            a: "Yes — a Figma file is the ideal starting point. I come from a design-systems background, so I read spacing, type and colour straight off the file rather than guessing. A PDF, a screenshot or an existing email works too.",
          },
          {
            q: "Do you handle dark mode?",
            a: "Yes. Dark mode is handled per client, because they behave differently — some invert everything, some respect your colours, some only change the background. Logos and text get treated so they stay legible either way.",
          },
          {
            q: "Will my team be able to edit it afterwards?",
            a: "That's the point of building it in modular blocks. Your team can reorder, duplicate and swap content in sections without touching the structural markup, which is where things usually break.",
          },
          {
            q: "How long does a template take?",
            a: "A single template with an existing design is typically a few days. A set of modular blocks that covers a whole campaign programme takes longer — I'll give you a firm timeline once I've seen the scope.",
          },
        ],
      },

      /* ── Redesign ────────────────────────────────────────────────────── */
      {
        slug: "website-dashboard-redesign",
        title: "Website & dashboard redesign",
        tagline: "Rebuild what you already have, without starting over",
        summary:
          "Redesign and rebuild of existing sites, dashboards and admin panels — modernised, made responsive, and organised for future work.",
        metaTitle: "Website & Dashboard Redesign Services",
        metaDescription:
          "Redesign and rebuild of existing websites, dashboards and admin panels. Modern responsive interfaces, component-based architecture, faster load times.",
        keywords: [
          "website redesign services",
          "dashboard redesign",
          "admin panel redesign",
          "web app redesign",
          "wordpress to nextjs migration",
          "legacy website modernization",
        ],
        intro: [
          "A redesign is rarely about taste. It's usually that the product has grown past its original structure — new features bolted onto screens that were never designed to hold them, and a codebase where every change risks breaking something else.",
          "I've done this work end to end: a full LMS redesign covering dashboards, student portals and admin panels, and a large automotive marketplace moved off WordPress onto Next.js. Both cases were less about new colours and more about giving the product a structure it could keep growing into.",
        ],
        problem: {
          heading: "The real cost of an aging interface",
          body: "Old interfaces get expensive quietly. Every new feature takes longer because there's no component to reuse. Support load rises because screens are confusing. Mobile traffic bounces because layouts never adapted. And performance degrades as assets accumulate — the kind of drag that shows up directly in Core Web Vitals and, from there, in search rankings.",
        },
        deliverables: [
          {
            title: "Audit before anything changes",
            detail:
              "A pass over the current interface, codebase and performance numbers, so the redesign targets the actual problems rather than assumed ones.",
          },
          {
            title: "Redesigned screens",
            detail:
              "Dashboards, portals and admin panels reworked in Figma with a component-based approach, so patterns repeat instead of multiplying.",
          },
          {
            title: "Production build",
            detail:
              "Implemented in React or Next.js, responsive across devices, with reusable components your team can extend.",
          },
          {
            title: "Performance work included",
            detail:
              "Lazy loading, asset and image optimisation, and a cleaned-up build pipeline. On one platform this approach returned a 30% Core Web Vitals improvement.",
          },
          {
            title: "Migration path",
            detail:
              "If you're moving off WordPress or another legacy stack, the move happens in stages so the live site keeps working throughout.",
          },
        ],
        process: [
          {
            step: "Audit",
            detail:
              "Review the existing interface, code and metrics. You get a written summary of what's worth fixing and what isn't.",
          },
          {
            step: "Design",
            detail:
              "Screens reworked in Figma, starting with the highest-traffic flows so you see value early.",
          },
          {
            step: "Build",
            detail:
              "Implemented component by component, reviewable as it goes rather than in one large reveal at the end.",
          },
          {
            step: "Measure",
            detail:
              "Performance re-measured against the audit baseline, so the improvement is a number rather than an impression.",
          },
        ],
        stack: [
          "React.js",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Material UI",
          "Mantine UI",
          "Figma",
        ],
        idealFor: [
          "Products that have outgrown their original design",
          "Teams migrating off WordPress or a legacy stack",
          "Dashboards and admin panels that confuse users",
          "Sites losing mobile traffic to poor responsiveness",
        ],
        faqs: [
          {
            q: "Do we have to rebuild everything at once?",
            a: "No, and usually you shouldn't. The work is staged — highest-value screens first, with the existing site running the whole time. That keeps risk low and means you see improvement before the project ends.",
          },
          {
            q: "Can you redesign without touching our backend?",
            a: "Yes. A frontend-only redesign against your existing APIs is a common shape for this work. If the API is the constraint, I can work on that side too — Node.js, Express and REST are part of my stack.",
          },
          {
            q: "What if we don't have designs?",
            a: "Then design is part of the engagement. I came into engineering from interface design, so I can produce the Figma work and then build it, rather than you having to hire twice.",
          },
          {
            q: "How do you handle our existing content and SEO?",
            a: "Content and URL structure get mapped before the migration, with redirects in place so existing rankings carry over. Technical SEO — rendering strategy, metadata, structured data — is handled as part of the build rather than bolted on afterwards.",
          },
          {
            q: "Will the redesign actually be faster?",
            a: "That's measured, not assumed. Performance is baselined during the audit and re-measured at the end. The techniques are the unglamorous ones that work: removing unused assets, tree-shaking, lazy loading, image compression and a streamlined build.",
          },
        ],
      },

      /* ── UI/UX ───────────────────────────────────────────────────────── */
      {
        slug: "ui-ux-design",
        title: "UI/UX design & design systems",
        tagline: "Design that arrives ready to build",
        summary:
          "Interface design in Figma, plus the design system — tokens, components, typography and spacing — that keeps a product consistent as it grows.",
        metaTitle: "UI/UX Design & Design System Services — Figma",
        metaDescription:
          "UI/UX design in Figma for web apps, dashboards and marketing sites, plus design systems with tokens and reusable components. Designed by someone who also builds.",
        keywords: [
          "ui ux design services",
          "figma designer for hire",
          "design system services",
          "dashboard ui design",
          "saas ui design",
          "web app design",
          "design to development handoff",
        ],
        intro: [
          "Design that can't be built is just a picture. The value in hiring someone who does both is that every screen you get has already been checked against what the browser can actually do — and against what it'll cost your developers to build it.",
          "I spent a role as a user interface designer before moving into full-time engineering: leading an LMS redesign, migrating an entire design workflow from Adobe XD to Figma, and building the design system that product ran on — tokens, typography, spacing rules, icon library and component set.",
        ],
        problem: {
          heading: "Why products drift out of consistency",
          body: "Without a system, every new screen is a fresh set of decisions. Three shades of grey become nine. Button padding varies by a few pixels per page. Developers rebuild the same card four times because there's no canonical version. The interface doesn't fail all at once — it just slowly stops feeling like one product.",
        },
        deliverables: [
          {
            title: "Interface design in Figma",
            detail:
              "Screens designed to a real grid with real content, at the breakpoints your users actually browse at — not just a desktop mockup.",
          },
          {
            title: "A design system, not just screens",
            detail:
              "Colour and spacing tokens, a type scale, and a component library with states defined, so future screens assemble instead of being invented.",
          },
          {
            title: "Accessibility built in",
            detail:
              "Contrast checked against WCAG AA at design time rather than discovered in a later audit, with focus and keyboard states specified.",
          },
          {
            title: "Developer-ready handoff",
            detail:
              "Structured handoff sessions and annotated files, so there's no ambiguity between design intent and what gets built.",
          },
          {
            title: "Optional implementation",
            detail:
              "I can build what I design in React or Next.js, which removes the handoff gap entirely.",
          },
        ],
        process: [
          {
            step: "Understand",
            detail:
              "What the product does, who uses it, and where the current interface gets in their way.",
          },
          {
            step: "Structure",
            detail:
              "Flows and layout before visual design, so the arrangement is settled before the styling starts.",
          },
          {
            step: "Design",
            detail:
              "Screens built from a component set from the first file, so the system emerges with the design rather than after it.",
          },
          {
            step: "Hand off",
            detail:
              "Walkthrough with your developers, plus documentation for the tokens and components.",
          },
        ],
        stack: [
          "Figma",
          "Design systems",
          "Design tokens",
          "Component libraries",
          "Adobe XD",
          "WCAG AA",
        ],
        idealFor: [
          "SaaS products with an inconsistent interface",
          "Teams with no design system in place",
          "Dashboards that need structure before styling",
          "Founders who need design and build from one person",
        ],
        faqs: [
          {
            q: "Do you design and build, or only design?",
            a: "Either. Plenty of clients want the Figma work alone, to hand to their own team. Others want the same person to carry it through to production React — which removes handoff loss entirely and is usually faster overall.",
          },
          {
            q: "What is a design system and do we need one?",
            a: "It's the shared vocabulary of your interface — colour and spacing tokens, a type scale, and a component library with defined states. You need one once more than one person is producing screens, or once you've noticed the same component existing in several slightly different versions.",
          },
          {
            q: "Can you work with our existing brand?",
            a: "Yes. Most engagements start from an existing brand and extend it into an interface system, which is a different job from branding. If the brand itself needs work, I'll tell you plainly rather than quietly redesigning it.",
          },
          {
            q: "How do you handle accessibility?",
            a: "Contrast gets checked against WCAG AA while designing, not in a later audit — retrofitting accessible colour into a finished palette is far more disruptive. Focus states, keyboard order and target sizes are specified as part of the component definitions.",
          },
          {
            q: "What do we actually receive?",
            a: "A Figma file with the screens and the component library, tokens documented, and a handoff session with your developers. If I'm building it too, you also get the implemented components.",
          },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════════════
     AUTOMATION
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "automation",
    title: "AI & automation services",
    shortTitle: "AI & Automation",
    accent: "red",
    tagline: "Workflows and assistants that handle the repetitive work",
    metaTitle: "AI Automation Services — Chatbots, RAG Agents & n8n Workflows",
    metaDescription:
      "AI automation built on n8n and modern language models: website chatbots, RAG agents that answer from your own documents, industry assistants and workflow automation.",
    keywords: [
      "ai automation services",
      "n8n automation expert",
      "ai chatbot development",
      "rag chatbot development",
      "workflow automation services",
      "business process automation",
    ],
    intro: [
      "Most businesses have a short list of tasks that eat hours every week and require almost no judgement: answering the same questions, copying data between tools, chasing appointments, formatting reports.",
      "That's what this work targets. Not replacing people — removing the parts of their week that never needed a person in the first place. Built on n8n for the workflow layer and language models where the task genuinely needs comprehension.",
    ],
    services: [
      /* ── AI chatbot ──────────────────────────────────────────────────── */
      {
        slug: "ai-chatbot-development",
        title: "AI chatbot development",
        tagline: "A chatbot that knows your business, not a generic bot",
        summary:
          "Custom AI chatbots for websites and apps — trained on your content, connected to your tools, and able to hand off to a human when it should.",
        metaTitle: "AI Chatbot Development — Custom Website Chatbots",
        metaDescription:
          "Custom AI chatbot development for websites and apps. Trained on your own content, integrated with your tools, with human handoff built in. Powered by n8n and LLMs.",
        keywords: [
          "ai chatbot development",
          "custom chatbot for website",
          "llm chatbot development",
          "customer support chatbot",
          "gemini api chatbot",
          "chatbot integration services",
        ],
        intro: [
          "The chatbots people dislike are the ones built on decision trees — rigid menus that force you down a path and dead-end when your question doesn't fit the script.",
          "A language model changes the shape of that. It understands a question asked in the customer's own words, answers from your actual content, and knows when it should stop guessing and pass the conversation to a person.",
        ],
        problem: {
          heading: "Where support time actually goes",
          body: "For most businesses, a large share of incoming messages are the same handful of questions: opening hours, pricing, delivery times, where an order is, how to reset something. Each one is quick, but together they consume the hours your team needed for the questions that genuinely require them.",
        },
        deliverables: [
          {
            title: "A bot grounded in your content",
            detail:
              "Answers drawn from your site, documents and FAQs, so responses reflect your business rather than the model's general knowledge.",
          },
          {
            title: "Tool integrations",
            detail:
              "Connected to the systems the answer lives in — order status, bookings, CRM records — through n8n workflows and REST APIs.",
          },
          {
            title: "Human handoff",
            detail:
              "Clear escalation rules, so an uncertain or sensitive conversation routes to a person instead of being guessed at.",
          },
          {
            title: "Guardrails",
            detail:
              "Scoped to what it should discuss, with a defined response when a question falls outside that scope.",
          },
          {
            title: "Embedded and styled",
            detail:
              "A chat widget that matches your site's design, responsive and accessible, rather than an obvious third-party box.",
          },
        ],
        process: [
          {
            step: "Scope",
            detail:
              "Work out which questions the bot should own and which must always reach a person.",
          },
          {
            step: "Ground",
            detail: "Collect and structure the content the bot answers from.",
          },
          {
            step: "Build",
            detail:
              "Conversation flow, integrations and escalation wired up in n8n, with the model handling comprehension.",
          },
          {
            step: "Test and tune",
            detail:
              "Run real questions through it, fix the wrong answers, and tighten the scope before it goes live.",
          },
        ],
        stack: ["n8n", "Gemini API", "REST APIs", "Next.js", "Node.js", "Webhooks"],
        idealFor: [
          "Businesses answering the same questions daily",
          "E-commerce stores with order-status enquiries",
          "Service businesses handling booking questions",
          "Teams whose support inbox never empties",
        ],
        faqs: [
          {
            q: "How is this different from an off-the-shelf chatbot?",
            a: "Off-the-shelf widgets answer from a script or a generic model. This one is grounded in your content and connected to your systems, so it can answer questions that require knowing something specific about your business — like whether a particular order has shipped.",
          },
          {
            q: "What stops it inventing answers?",
            a: "Two things: it answers from a defined body of your content rather than open-ended generation, and it's scoped so out-of-range questions get a defined response and an escalation path instead of a confident guess. Testing before launch is where most of this gets tightened.",
          },
          {
            q: "Can it pass a conversation to a person?",
            a: "Yes, and it should. Escalation rules are part of the build — by topic, by detected uncertainty, or on explicit request from the customer.",
          },
          {
            q: "Which model does it use?",
            a: "Usually the Gemini API, which is what I work with most. The workflow layer is built in n8n, so the model is a component that can be swapped without rebuilding the automation around it.",
          },
          {
            q: "What does it cost to run?",
            a: "Two parts: hosting for the workflow layer and per-use model costs, which scale with conversation volume. Both are modest at typical small-business volumes, and I'll estimate them against your actual traffic before you commit.",
          },
        ],
      },

      /* ── RAG agent ───────────────────────────────────────────────────── */
      {
        slug: "rag-chatbot-agent",
        title: "RAG chatbot agent",
        tagline: "Answers from your own documents, with sources",
        summary:
          "Retrieval-augmented agents that answer from your internal documents, policies and knowledge base — and cite where each answer came from.",
        metaTitle: "RAG Chatbot Agent Development — Retrieval AI",
        metaDescription:
          "RAG chatbot agents that answer from your own documents and cite their sources. Ideal for internal knowledge bases, policy libraries and technical documentation.",
        keywords: [
          "rag chatbot development",
          "retrieval augmented generation",
          "document ai agent",
          "knowledge base chatbot",
          "internal documentation ai",
          "vector database chatbot",
        ],
        intro: [
          "RAG — retrieval-augmented generation — is the difference between a model that sounds authoritative and one that actually is. Instead of answering from training data, the agent first retrieves the relevant passages from your documents, then answers using only those.",
          "The practical consequence is that answers can be traced. Every response points at the document it came from, so a reader can verify it rather than trusting it.",
        ],
        problem: {
          heading: "Knowledge that exists but can't be found",
          body: "Most organisations already have the answers written down — in policy PDFs, onboarding docs, technical specs, support wikis, contracts. The problem is retrieval. Nobody remembers which document covers a given case, search returns forty results, and so people ask a colleague instead, which costs two people's time instead of one.",
        },
        deliverables: [
          {
            title: "Document ingestion",
            detail:
              "Your PDFs, docs and pages processed, chunked sensibly and indexed so retrieval returns the right passage rather than the right file.",
          },
          {
            title: "Cited answers",
            detail:
              "Every response links to the source passage, so answers can be checked instead of taken on faith.",
          },
          {
            title: "Access control",
            detail:
              "Retrieval scoped by role where needed, so people only get answers from documents they're allowed to read.",
          },
          {
            title: "Keeps up to date",
            detail:
              "An update path so revised documents re-index, rather than the agent slowly drifting out of date.",
          },
          {
            title: "Interface",
            detail:
              "A clean chat interface, embedded in your site or internal tool, matching your design.",
          },
        ],
        process: [
          {
            step: "Inventory",
            detail:
              "Identify which documents matter, what shape they're in, and who should be able to see what.",
          },
          {
            step: "Index",
            detail:
              "Ingest and chunk the corpus, then tune retrieval so queries return genuinely relevant passages.",
          },
          {
            step: "Build",
            detail:
              "Agent, citation handling and interface, orchestrated in n8n and connected to your document source.",
          },
          {
            step: "Evaluate",
            detail:
              "Run real questions against it and measure whether the retrieved passage was the right one — the step most RAG builds skip.",
          },
        ],
        stack: ["n8n", "Gemini API", "Vector search", "PostgreSQL", "REST APIs", "Next.js"],
        idealFor: [
          "Teams with large internal documentation",
          "Support teams answering from policy documents",
          "Onboarding-heavy organisations",
          "Anyone whose knowledge base is searched but rarely found",
        ],
        faqs: [
          {
            q: "What is RAG, in plain terms?",
            a: "The agent looks things up before it answers. It searches your documents for passages relevant to the question, then writes an answer using only those passages. That's what allows it to cite sources and to stay current when documents change.",
          },
          {
            q: "How is this different from a normal AI chatbot?",
            a: "A standard chatbot answers from a fixed set of prepared content or from the model's general knowledge. A RAG agent retrieves from a live document corpus, which suits bodies of material too large to prepare by hand and material that changes regularly.",
          },
          {
            q: "What file types can it handle?",
            a: "PDFs, Word documents, plain text, Markdown and web pages are the common cases. Scanned documents need OCR first, which can be part of the pipeline.",
          },
          {
            q: "Can it be kept private?",
            a: "Retrieval can be scoped by role, so responses only draw on documents a given user may read. Where confidentiality requirements are strict, we should talk about them at the scoping stage — they shape the architecture rather than being added later.",
          },
          {
            q: "How do you know the answers are good?",
            a: "By evaluating retrieval, not just reading the replies. The measurable question is whether the correct passage was retrieved for a given query — if retrieval is right, answer quality follows. That evaluation pass is part of the build.",
          },
        ],
      },

      /* ── Clinic assistant ────────────────────────────────────────────── */
      {
        slug: "dental-clinic-ai-assistant",
        title: "Dental clinic AI assistant",
        tagline: "Front-desk help that works after the front desk closes",
        summary:
          "An AI assistant for dental and medical clinics — handling appointment enquiries, patient questions and reminders around the clock.",
        metaTitle: "Dental Clinic AI Assistant — Appointment & Patient Automation",
        metaDescription:
          "AI assistant for dental and medical clinics: handles appointment enquiries, answers patient questions and sends reminders automatically, 24/7. Built with n8n.",
        keywords: [
          "dental clinic ai assistant",
          "dental practice automation",
          "ai receptionist for clinic",
          "appointment booking automation",
          "medical practice ai assistant",
          "patient communication automation",
        ],
        intro: [
          "A dental practice loses bookings in predictable ways: calls that come in while the team is with a patient, enquiries that arrive after closing, and appointments quietly forgotten because nobody had time to ring round with reminders.",
          "An assistant covers those gaps. It answers the routine enquiries, captures booking requests when the practice is closed, and sends reminders on schedule — while anything clinical goes straight to your team.",
        ],
        problem: {
          heading: "The bookings a clinic never sees",
          body: "Most missed revenue in a practice isn't a rejected quote — it's contact that never completed. A caller who reaches voicemail at 6pm rarely calls back the next morning; they call the next practice on the list. Meanwhile no-shows leave chairs empty at a cost no reminder system was in place to prevent.",
        },
        deliverables: [
          {
            title: "Round-the-clock enquiry handling",
            detail:
              "Answers common questions — opening hours, treatments offered, what a first visit involves, parking, insurance — at any hour.",
          },
          {
            title: "Appointment capture",
            detail:
              "Collects booking requests with the details your team needs, and can write into your scheduling system where it supports integration.",
          },
          {
            title: "Automated reminders",
            detail:
              "Scheduled reminders before appointments, with confirmation handling, to reduce no-shows.",
          },
          {
            title: "Clinical escalation",
            detail:
              "Anything symptomatic, urgent or clinical routes to a human immediately. The assistant does not give clinical advice.",
          },
          {
            title: "Adapts to other clinic types",
            detail:
              "The same structure fits physiotherapy, optometry, veterinary and general practice — the workflow is the same, the content differs.",
          },
        ],
        process: [
          {
            step: "Map the front desk",
            detail:
              "Work through what your team actually gets asked, and which of those should never be automated.",
          },
          {
            step: "Define boundaries",
            detail:
              "Set explicitly what the assistant may answer and what escalates — this is decided before anything is built.",
          },
          {
            step: "Build and integrate",
            detail:
              "Assistant, reminders and scheduling connection wired up in n8n, with your calendar or practice system.",
          },
          {
            step: "Pilot",
            detail:
              "Run it alongside your existing process first, review the transcripts together, then widen its scope.",
          },
        ],
        stack: ["n8n", "Gemini API", "Calendar integration", "REST APIs", "Webhooks", "Next.js"],
        idealFor: [
          "Practices missing calls during treatment hours",
          "Clinics with high no-show rates",
          "Single-site practices without a full-time receptionist",
          "Groups wanting consistent patient communication",
        ],
        faqs: [
          {
            q: "Does it give medical or dental advice?",
            a: "No, and it's explicitly built not to. Anything symptomatic, urgent or clinical escalates to your team. The assistant handles logistics — hours, services, appointments, reminders — which is where the repetitive volume actually is.",
          },
          {
            q: "Can it book directly into our calendar?",
            a: "Where your scheduling system offers an API, yes. Where it doesn't, the assistant captures the request with all the details your team needs and routes it to them, which still removes the back-and-forth.",
          },
          {
            q: "What about patient data and privacy?",
            a: "Handled deliberately: only the minimum information needed for the task, with a clear boundary on what is stored and where. If you have specific regulatory obligations, raise them at scoping — they shape the architecture, so they need to be known before the build rather than after.",
          },
          {
            q: "Will patients know they're talking to an assistant?",
            a: "Yes. It identifies itself, which is both the right thing to do and practically better — patients ask more direct questions and escalate sooner when they need a person.",
          },
          {
            q: "Does this only work for dentists?",
            a: "No. Dental practices are a natural fit because the enquiry mix is so repetitive, but the same structure serves physiotherapy, optometry, veterinary and general practice. Only the content changes.",
          },
        ],
      },

      /* ── n8n workflows ───────────────────────────────────────────────── */
      {
        slug: "n8n-workflow-automation",
        title: "n8n workflow automation",
        tagline: "Connect your tools and stop moving data by hand",
        summary:
          "Custom n8n workflows that connect the tools you already use, moving data between them automatically instead of by copy and paste.",
        metaTitle: "n8n Workflow Automation Services — Business Process Automation",
        metaDescription:
          "Custom n8n workflow automation connecting your existing tools. Automate data entry, reporting, lead routing and notifications without manual copy and paste.",
        keywords: [
          "n8n workflow automation",
          "n8n developer for hire",
          "business process automation",
          "api integration services",
          "workflow automation consultant",
          "zapier alternative automation",
        ],
        intro: [
          "Most teams run on a handful of tools that don't talk to each other. Someone exports a CSV from one, reformats it, and pastes it into another. It works, until the person doing it is on holiday, or makes one transcription error that nobody catches for a fortnight.",
          "n8n is the workflow layer that removes that step. It connects your systems over their APIs and moves data between them on a trigger or a schedule — and because it can be self-hosted, your data doesn't have to pass through someone else's platform.",
        ],
        problem: {
          heading: "Manual data entry is a reliability problem",
          body: "The cost isn't only the hours. Manual transfer between systems introduces errors that surface later as wrong reports and bad decisions, and it creates a single point of failure in whoever knows the routine. Automating it makes the process both faster and repeatable — it runs the same way every time, and it's documented by existing.",
        },
        deliverables: [
          {
            title: "Workflows built to your process",
            detail:
              "Automations shaped around how your team actually works, rather than forcing your process into a template.",
          },
          {
            title: "API integrations",
            detail:
              "Your CRM, spreadsheets, email, forms, databases and internal tools connected over REST — including systems without an off-the-shelf connector.",
          },
          {
            title: "Error handling that tells you",
            detail:
              "Retries and failure notifications, so a broken workflow surfaces immediately instead of failing silently for weeks.",
          },
          {
            title: "AI steps where they help",
            detail:
              "Language models dropped into a workflow for the steps that need comprehension — classifying enquiries, summarising, extracting fields from messy text.",
          },
          {
            title: "Documented and handed over",
            detail:
              "Workflows documented so your team can adjust them, rather than needing me back for every change.",
          },
        ],
        process: [
          {
            step: "Find the repetition",
            detail:
              "Walk through where time actually goes. The best candidates are usually tasks nobody thinks of as a process.",
          },
          {
            step: "Prioritise",
            detail:
              "Rank by hours saved against build effort, and start with the one that pays back fastest.",
          },
          {
            step: "Build",
            detail: "Workflows built, connected and tested against real data, not sample data.",
          },
          {
            step: "Hand over",
            detail:
              "Documentation and a walkthrough so your team owns it, plus monitoring so failures are visible.",
          },
        ],
        stack: ["n8n", "REST APIs", "Webhooks", "Gemini API", "PostgreSQL", "MongoDB", "Node.js"],
        idealFor: [
          "Teams copying data between systems by hand",
          "Businesses whose tools have no native integration",
          "Operations that depend on one person's routine",
          "Anyone rebuilding the same report every week",
        ],
        faqs: [
          {
            q: "Why n8n rather than Zapier or Make?",
            a: "Mainly control. n8n can be self-hosted, so your data stays on infrastructure you own, and its pricing doesn't scale per task — which matters once volume grows. It also handles branching logic and custom code more comfortably, so complex workflows don't hit a ceiling.",
          },
          {
            q: "What if our tool has no n8n integration?",
            a: "If it has an API, it can be connected — n8n makes HTTP requests to anything, and I build the integration against the API directly. That covers most internal and niche tools.",
          },
          {
            q: "What happens when a workflow breaks?",
            a: "It tells you. Error handling with retries and notifications is part of the build, because the real danger with automation isn't failure — it's silent failure that nobody notices until the data is already wrong.",
          },
          {
            q: "Can our team edit the workflows afterwards?",
            a: "Yes, and they should be able to. n8n's editor is visual, and everything is documented at handover so your team can make adjustments without calling me back for a field change.",
          },
          {
            q: "How do we know what's worth automating?",
            a: "Start with frequency times duration. A ten-minute task done daily costs more per year than a two-hour task done quarterly. We rank candidates against build effort and start where the payback is quickest.",
          },
        ],
      },
    ],
  },
];

/* ── Lookup helpers ────────────────────────────────────────────────────── */

export function getCategory(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.slug === slug);
}

export function getService(
  categorySlug: string,
  serviceSlug: string,
): { category: ServiceCategory; service: ServiceDetail } | undefined {
  const category = getCategory(categorySlug);
  const service = category?.services.find((s) => s.slug === serviceSlug);
  return category && service ? { category, service } : undefined;
}

/** Flat list of every category/service pair — used by the sitemap. */
export const allServicePaths = serviceCategories.flatMap((c) =>
  c.services.map((s) => ({ category: c.slug, service: s.slug })),
);

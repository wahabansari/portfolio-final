/**
 * ─────────────────────────────────────────────────────────────────────────────
 * INSIGHTS — first-hand, problem-led articles that back the service pages.
 *
 * This is the site's AEO/GEO layer: answer-first content built for a reader
 * skimming for a direct answer, and for a generative-search system extracting
 * one. Every article opens with a `definition` — one sentence that would still
 * be correct quoted out of context — before any explanation.
 *
 * Same accuracy rule as the rest of the site (see content/site.ts): every
 * claim has to be provable. Where an article cites a result, it is the 30%
 * Core Web Vitals figure on Sunhub or the real WordPress → Next.js migration
 * on AussieMotor — both already documented on /work — not a new number
 * invented for the article. Everything else is stated as approach and
 * reasoning, not as a metric nobody can check.
 *
 * `updatedAt` is a real freshness signal, not decoration: it only moves when
 * the guidance in the article actually changes, and it drives the article's
 * own structured data (`dateModified`) and its sitemap `lastModified`.
 *
 * All twelve articles from the original content plan are here now, in the
 * plan's own order — the migration cluster leads because Search Console
 * showed it as the strongest existing signal, and each article is scoped to
 * a distinct search intent so no two of them are competing for the same
 * query. Two migration pieces and two "evaluate a codebase" pieces sit close
 * together on purpose: one is the narrative, the other is the checklist; one
 * is "should I take this on," the other is "should I add this feature" — the
 * angle is different even where the topic overlaps, specifically so neither
 * cannibalises the other in search.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type InsightSection = {
  heading: string;
  body: string[];
};

export type Insight = {
  slug: string;
  /** Nav/card title. */
  title: string;
  /** SEO + page head. */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  /** One line, used on cards and the hub. */
  dek: string;
  /** Topic cluster, shown as a chip and used for related-article grouping. */
  cluster: string;
  /** Search intent, matched to the content plan. */
  intent: "Commercial investigation" | "Problem solving" | "Expertise / proof";
  /** ISO date. Both are real — this only changes when the guidance changes. */
  publishedAt: string;
  updatedAt: string;
  /** The answer-first sentence, quotable out of context. */
  definition: string;
  intro: string[];
  sections: InsightSection[];
  faqs?: { q: string; a: string }[];
  /** Where the article should route a reader who wants the work done. */
  relatedServiceSlug: string;
  relatedCaseStudySlugs: string[];
  cta: { heading: string; body: string; primaryLabel: string };
};

export const insights: Insight[] = [
  /* ══════════════════════════════════════════════════════════════════════
     1 · HOW TO MIGRATE WORDPRESS TO NEXT.JS WITHOUT LOSING SEO
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "how-to-migrate-wordpress-to-nextjs-without-losing-seo",
    title: "How to Migrate WordPress to Next.js Without Losing SEO",
    metaTitle: "How to Migrate WordPress to Next.js Without Losing SEO",
    metaDescription:
      "A WordPress to Next.js migration that protects your rankings, explained end to end — what to audit, what to build in parallel, and how to cut over safely.",
    keywords: [
      "migrate WordPress to Next.js",
      "WordPress to Next.js without losing SEO",
      "WordPress to Next.js migration guide",
      "headless WordPress SEO",
    ],
    h1: "How to migrate WordPress to Next.js without losing SEO",
    dek: "The shape of a migration that protects rankings, end to end — not a tactic list, the actual order of operations.",
    cluster: "Migration",
    intent: "Commercial investigation",
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-10",
    definition:
      "Migrating WordPress to Next.js without losing SEO means treating the migration as an SEO project that happens to involve a framework change, rather than a framework change with SEO patched on at the end — the order those two things happen in is what decides whether the rankings survive.",
    intro: [
      "I contributed to this exact migration on AussieMotor, a large automotive marketplace, moving off WordPress and onto Next.js as part of a team. What follows is the shape that migration actually took — not a theoretical best-practice list, the real sequence, with the reasoning behind each step. For the itemised version, see the migration checklist; this is the narrative it comes from.",
      "The single biggest predictor of whether a migration protects its rankings is whether SEO preservation was a named work item with an owner, or an assumption everyone made about someone else's job. Everything below follows from taking it seriously as the former.",
    ],
    sections: [
      {
        heading: "Start with what you are actually trying to fix",
        body: [
          "\"We should move to Next.js\" is not a reason, it is a conclusion looking for a problem. Before anything else, name the specific thing WordPress is failing to do: too slow, too plugin-fragile to safely change, or missing an interface WordPress was never built to deliver. That answer decides the scope of everything that follows — a performance-driven migration and a feature-driven one produce different information architectures.",
          "If the honest answer is \"nothing, really, we just like Next.js better,\" that is worth knowing before committing budget to a migration whose main output is risk with no corresponding fix.",
        ],
      },
      {
        heading: "Audit before you design or build anything",
        body: [
          "A full crawl of the live site, a pull of every indexed URL from Search Console, and an export of whatever analytics exist. In most sites, a relatively small share of pages account for most of the organic value — the audit is what tells you which pages those are, so they get the closest attention during migration rather than being treated identically to a page nobody has visited in a year.",
          "This is also where you find out what the old templates were actually emitting — structured data, canonical logic, metadata patterns — because a theme frequently does things nobody on the current team configured directly. You cannot preserve what you have not first identified.",
        ],
      },
      {
        heading: "Decide what actually needs to move",
        body: [
          "Not every migration is \"replace WordPress entirely.\" If an editorial team needs to keep publishing without a developer, headless WordPress — content and editing stay in WordPress, Next.js takes over rendering and performance — solves the technical problem without asking anyone to change how they work. That decision belongs here, made deliberately, not discovered as a compromise partway through the build.",
          "Where WordPress is being fully replaced, the content model gets defined next: what a post, a page, a product or a case study actually is as data, independent of how WordPress happened to store it. Getting this right is what makes the new site easy to extend instead of a second migration two years from now.",
        ],
      },
      {
        heading: "Build against the live site, not instead of it",
        body: [
          "The new site gets built and content-migrated while the WordPress site keeps running, unaffected. This is what makes the audit's findings actionable rather than theoretical — the URL inventory, the redirect map and the structured-data parity work all happen against a target that has not gone anywhere yet, so there is time to get it right before anything is at risk.",
          "This phase is also where the redirect map gets built and tested, not guessed at. Every URL from the audit gets an explicit destination; anything without one yet is a flagged decision, not a gap that gets papered over with a wildcard on launch day.",
        ],
      },
      {
        heading: "Cut over in a way you can undo",
        body: [
          "Deploy to a staging domain and verify status codes, canonical tags, structured data and rendered content against the audit before production DNS is touched. Where the infrastructure allows it, move a small slice of traffic first and watch it before committing the rest — a migration that can be partially rolled back is a fundamentally lower-risk migration than one that is all-or-nothing.",
          "Lower DNS TTL in advance of the cutover window, not on the day of it. It is a small thing that makes an unexpected rollback take minutes instead of most of a day.",
        ],
      },
      {
        heading: "The weeks after launch are part of the migration, not the aftermath",
        body: [
          "Google's own guidance is that changes can take anywhere from hours to months to fully process, so the absence of a visible problem on day two is not evidence the migration worked — it is evidence nothing has broken loudly yet. URL Inspection on the highest-value pages from the audit, a standing check on the Coverage and Pages reports for new errors, and a fast response if anything needs a recrawl request.",
          "Budget real attention here. The migration is not finished at cutover; it is finished when the pages that mattered before the move are confirmed indexed, ranking and serving correctly after it.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should I migrate everything at once, or in phases?",
        a: "It depends on the size of the site and how much confidence the audit gives you in the redirect map. A smaller site with a clean, fully tested map can go in one cutover. A large or complex one is often safer moved in sections — by content type or by traffic tier — so a mistake affects a slice of the site rather than all of it at once.",
      },
      {
        q: "What is the single biggest mistake you see in migrations that go wrong?",
        a: "Treating the redirect map as something that gets finished during the cutover instead of before it. By the time someone is building redirects live during a launch window, the audit that should have caught the edge cases never happened, and the pages that fall through are exactly the ones nobody thought to check.",
      },
      {
        q: "Does a migration hurt rankings even when it is done correctly?",
        a: "Often there is a brief adjustment period while Google reprocesses the site — that is normal and expected, not a sign something went wrong. What a correct migration avoids is a sustained loss: the dip is temporary because the signals (redirects, canonicals, structured data, content) were preserved, so the site settles back to where it was rather than starting over.",
      },
    ],
    relatedServiceSlug: "wordpress-to-nextjs-migration",
    relatedCaseStudySlugs: ["aussiemotor"],
    cta: {
      heading: "Considering the move?",
      body: "Send the WordPress site. I will tell you honestly what the audit would likely find, and what the real scope of a migration for your site looks like.",
      primaryLabel: "Request a migration assessment",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     2 · WORDPRESS VS NEXT.JS
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "wordpress-vs-nextjs",
    title: "WordPress vs Next.js for Modern Websites",
    metaTitle: "WordPress vs Next.js — Which One Actually Fits",
    metaDescription:
      "A practical comparison of WordPress and Next.js for modern websites — where each one wins, and how to tell which is the right fit before you rebuild.",
    keywords: [
      "WordPress vs Next.js",
      "Next.js vs WordPress performance",
      "when to migrate from WordPress",
      "headless WordPress Next.js",
    ],
    h1: "WordPress vs Next.js: which one actually fits your site",
    dek: "Not which is better — which is right for what your site actually needs to do.",
    cluster: "Migration",
    intent: "Commercial investigation",
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-10",
    definition:
      "WordPress fits a site whose main job is letting non-technical people publish content inside an existing theme, while Next.js fits a site whose main constraint is performance, custom interface behaviour or engineering control — and most sites that need to decide between them have outgrown WordPress on one of those second three, not stopped needing the first.",
    intro: [
      "This is not a framework-versus-CMS argument — Next.js can run on top of WordPress as a headless CMS, so the real question is rarely all-or-nothing. It is about which parts of the current setup are actually the constraint, and which parts are fine and would be a needless rebuild to touch.",
      "I have shipped both directions: built WordPress sites with custom plugins where WordPress was the right call, and migrated a marketplace off WordPress onto Next.js when it was not. The difference is what was actually slowing the team down.",
    ],
    sections: [
      {
        heading: "Where WordPress is still the right answer",
        body: [
          "If the team's main need is a non-technical editor publishing pages and posts inside a theme, without a developer in the loop for routine content, WordPress does that job well and has for two decades — that is not a weakness to route around, it is the product working as intended.",
          "It also has the plugin ecosystem for things a custom build would otherwise have to construct from scratch: forms, basic e-commerce, membership gating. If none of those are pushing the site toward a performance or maintainability wall, replacing WordPress is a solution without a problem.",
        ],
      },
      {
        heading: "Where WordPress becomes the constraint",
        body: [
          "Page weight and Core Web Vitals are the most common trigger — a theme plus a stack of plugins accumulates JavaScript and render-blocking requests that nobody chose deliberately, they just arrived one plugin at a time. At some point the site is measurably slow and no amount of caching plugin configuration fixes what is architecturally a client-rendered, plugin-heavy page.",
          "The second trigger is custom interface behaviour: dashboards, authenticated areas, complex interactive filtering — things a theme was never built to do, that get bolted on as increasingly fragile custom plugin code. That is usually the point where a purpose-built frontend, not a better theme, is the actual fix.",
        ],
      },
      {
        heading: "The option most comparisons skip: keep WordPress, replace the frontend",
        body: [
          "Headless WordPress — content and editing stay in WordPress, Next.js owns rendering and the public-facing performance — solves the performance and custom-interface problems without asking a content team to learn a new publishing workflow. It is a real middle option, not a compromise, and it is often the right one for a marketing site with an active editorial team.",
          "It only makes sense when the editorial workflow genuinely needs to stay in WordPress. If nobody is publishing through it regularly, keeping WordPress around as a CMS for its own sake adds an integration surface with nothing behind it.",
        ],
      },
      {
        heading: "How to actually decide",
        body: [
          "Look at what is generating the complaint, not the technology. \"The site is slow\" and \"we can't build the dashboard our users are asking for\" point toward Next.js. \"We keep needing a developer for a content update\" points toward WordPress being fine and the workflow being the problem. \"Our editorial team publishes daily and the site also needs to be fast\" points toward headless.",
          "A migration that starts from \"Next.js is better\" without naming the specific constraint tends to be expensive and directionless. One that starts from a named problem — page weight, a missing feature, an unmaintainable plugin stack — has a scope from day one.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is Next.js always faster than WordPress?",
        a: "A well-built Next.js site is usually faster than a WordPress site carrying a typical plugin stack, but that is a statement about typical configurations, not physics — a lean, well-cached WordPress site can outperform a badly built Next.js one. The framework sets a ceiling; the implementation decides how close you get to it.",
      },
      {
        q: "Can I use Next.js without giving up WordPress?",
        a: "Yes — that is what headless WordPress is. Content and editing stay in WordPress, Next.js handles rendering and the public site. It is a genuine option, not a stepping stone to a full migration, for teams that need to keep publishing through WordPress.",
      },
      {
        q: "What is the real cost of staying on WordPress too long?",
        a: "Not a single event — an accumulation. Each plugin added to solve one problem is another dependency, another maintenance surface and often another render-blocking script, until the page weight and the plugin conflicts become the actual bottleneck on every future change, not just the current one.",
      },
    ],
    relatedServiceSlug: "wordpress-to-nextjs-migration",
    relatedCaseStudySlugs: ["cennetsol"],
    cta: {
      heading: "Not sure which side of this you're on?",
      body: "Describe the actual problem — slow, hard to extend, or missing a feature WordPress can't do — and I will tell you honestly whether that points to a migration or a smaller fix.",
      primaryLabel: "Ask about your site",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     3 · WORDPRESS TO NEXT.JS MIGRATION CHECKLIST
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "wordpress-to-nextjs-migration-checklist",
    title: "WordPress to Next.js Migration Checklist",
    metaTitle: "WordPress to Next.js Migration Checklist",
    metaDescription:
      "A practical WordPress to Next.js migration checklist covering URL inventory, redirects, content parity, structured data and post-launch monitoring.",
    keywords: [
      "WordPress to Next.js migration checklist",
      "WordPress migration SEO checklist",
      "301 redirect map WordPress",
      "Next.js migration process",
    ],
    h1: "The WordPress to Next.js migration checklist I actually use",
    dek: "Every step that protects existing rankings during a WordPress to Next.js migration, in the order I run them.",
    cluster: "Migration",
    intent: "Problem solving",
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-10",
    definition:
      "A WordPress to Next.js migration checklist has five non-negotiable stages — URL inventory, redirect mapping, content and structured-data parity, a staged cutover, and post-launch indexation monitoring — and rankings are almost always lost by skipping one of these, not by the framework change itself.",
    intro: [
      "I put this list together from doing the migration, not from reading about it — specifically from contributing to moving AussieMotor, a large automotive marketplace, off WordPress and onto Next.js as part of a team. The failure modes below are the ones that actually show up, not the ones that sound dangerous in a blog post.",
      "None of this is specific to any one site. It is the same five stages whether the site is twenty pages or twenty thousand — what changes is how long the audit takes, not which steps exist.",
    ],
    sections: [
      {
        heading: "1. Inventory every URL before you touch a redirect",
        body: [
          "Pull URLs from three sources, not one: the current XML sitemap, a crawl of the live site (a sitemap misses orphaned pages that still rank), and Search Console's indexed-pages report, which will show you URLs that exist in Google's index but not in either of the other two.",
          "The output is a spreadsheet, not a mental model. Every row is a URL, its current status code, whether it is indexed, and what it should redirect to on the new site. If a row has no destination yet, that is a decision still owed, not a gap to paper over with a wildcard.",
        ],
      },
      {
        heading: "2. Map every redirect explicitly — resist the wildcard",
        body: [
          "A rule like /blog/* → /insights/* is fast to write and wrong often enough to matter: category pages, tag archives and author pages frequently do not have a clean one-to-one match on the new site, and a wildcard sends them somewhere that is technically live and semantically wrong.",
          "Explicit 301s for anything that is actually indexed and earning traffic. Pattern rules are fine for the long tail of URLs nobody is finding through search — the distinction is whether Search Console or analytics shows the URL doing anything, not how tedious the mapping is.",
        ],
      },
      {
        heading: "3. Rebuild what the WordPress theme was emitting silently",
        body: [
          "A WordPress theme or SEO plugin often generates structured data, canonical tags and Open Graph metadata without anyone on the team having configured it directly — it is just a default the theme shipped with. Before rebuilding a template in Next.js, check what the old page was actually outputting: view source, not the CMS admin screen, because those can disagree.",
          "The parity target is the rendered HTML, not the editorial content. Content migrating without its structured data is a page that keeps its words and loses a rich result it had earned.",
        ],
      },
      {
        heading: "4. Stage the cutover — do not flip DNS and hope",
        body: [
          "Deploy the Next.js site to a staging domain first and verify status codes, canonical tags and rendered content against the checklist before anything touches production DNS. Then move a small, low-risk slice of traffic if your infrastructure allows it, and watch it before committing the rest.",
          "The cost of staging this properly is a few extra hours. The cost of not staging it is discovering a broken canonical from a Search Console alert a week later, after Google has already recrawled and reindexed the mistake.",
        ],
      },
      {
        heading: "5. Monitor for weeks, not days, after launch",
        body: [
          "Google's own guidance is that changes can take anywhere from hours to months to fully process — so the absence of a problem on day three is not confirmation that the migration worked. Check URL Inspection on the highest-value pages, watch the Coverage and Pages reports for new errors, and request indexing on anything that seems stuck rather than waiting for it to resolve on its own.",
          "The pages worth checking first are the ones that were already ranking — a page with 40 impressions a month that drops out of the index is a much bigger loss than a thin page nobody was finding anyway.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the single most common cause of lost rankings in a migration?",
        a: "An incomplete redirect map — specifically, pages that existed in Google's index but were missed by the crawl or sitemap used to build the map. That is why the inventory step pulls from Search Console's own indexed-pages report as a third source, not just a crawl and a sitemap.",
      },
      {
        q: "Do I need to redirect every single WordPress URL?",
        a: "Every URL that is indexed or receiving traffic, yes. A staging or preview URL that was never indexed does not need one. The dividing line is whether Search Console or analytics shows the URL doing anything, not how many URLs exist in total.",
      },
      {
        q: "How do I know if structured data survived the migration?",
        a: "Run the migrated pages through a rich-results or schema validator and compare the output against what the old page emitted before migration — not against what you intended to build, against what was actually there. Discrepancies show up here before they show up anywhere else.",
      },
    ],
    relatedServiceSlug: "wordpress-to-nextjs-migration",
    relatedCaseStudySlugs: ["cennetsol", "sunhub"],
    cta: {
      heading: "Need this run on a real site, not a checklist?",
      body: "Send the WordPress site you're migrating. I will run the audit — the real URL inventory and structured-data check — and come back with a scoped plan rather than a generic estimate.",
      primaryLabel: "Request a migration assessment",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     4 · PRESERVING URLS AND REDIRECTS
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "preserving-urls-and-redirects-during-a-website-migration",
    title: "How to Preserve URLs and Redirects During a Website Migration",
    metaTitle: "Preserving URLs and Redirects During a Migration",
    metaDescription:
      "The mechanics of redirect strategy during a website migration — 301 vs 302, redirect chains, trailing slashes, deleted content and how to test the map.",
    keywords: [
      "301 redirects website migration",
      "redirect map SEO",
      "redirect chains SEO",
      "URL structure migration",
    ],
    h1: "How to preserve URLs and redirects during a website migration",
    dek: "The mechanics that actually decide whether a redirect passes value or quietly breaks it.",
    cluster: "Migration",
    intent: "Problem solving",
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-10",
    definition:
      "Preserving URLs and redirects during a migration means giving every URL that ever earned a ranking, a backlink or an indexed status a single, direct, permanent redirect to its true replacement — not a change of host and not a chain of redirects that eventually arrives there.",
    intro: [
      "The migration checklist covers redirects as one stage among five. This is the deeper technical pass on that one stage specifically — the mechanics that separate a redirect map that works from one that looks finished and quietly is not.",
      "Almost none of this is exotic. It is a set of small, specific decisions that are each easy to get right and, cumulatively, easy to get wrong by not thinking about at all.",
    ],
    sections: [
      {
        heading: "301, not 302 — and not a client-side redirect",
        body: [
          "A 301 tells a crawler the move is permanent and consolidates ranking signals toward the new URL. A 302 says temporary, and search engines treat it accordingly — signals are not expected to transfer the same way, which is the opposite of what a migration needs.",
          "A JavaScript-based redirect, or a meta-refresh, is worse than a 302: it depends on the page rendering fully before the redirect fires, adds latency, and gives you none of the explicit signalling a proper HTTP 301 does at the server level, before any JavaScript is involved.",
        ],
      },
      {
        heading: "One hop, not three",
        body: [
          "A redirect chain — old URL to an intermediate URL to the final destination — happens naturally when redirects get added incrementally over time without anyone auditing the existing map first. Each additional hop adds latency, and enough of them can cause a crawler to stop following the chain before reaching the destination at all.",
          "Every redirect in the map should point at the final URL directly. When a migration reveals an existing chain, the fix is to update it to a single hop, not to add another link.",
        ],
      },
      {
        heading: "Deleted content needs a real decision, not an automatic redirect to the homepage",
        body: [
          "Mass-redirecting everything without a clean match to the homepage is a common shortcut, and it is explicitly the kind of pattern Google's own guidance warns against — a redirect should go somewhere genuinely relevant to the old page, not to a default catch-all. Content that has a real, comparable replacement gets redirected there specifically.",
          "Content with no relevant replacement at all is a legitimate candidate for a 410 (Gone) rather than a redirect — it tells crawlers plainly that the page is intentionally removed, which is more honest than a redirect implying a replacement that does not exist.",
        ],
      },
      {
        heading: "Trailing slashes, casing and query strings are part of the URL",
        body: [
          "/services/migration and /services/migration/ are, strictly, different URLs, and an inconsistent policy between the old and new site creates duplicate-content ambiguity even when the content itself is identical. Pick one convention on the new site and make sure the redirect map and the canonical tags agree with each other.",
          "Query strings used for tracking or filtering on the old site need an explicit decision too: whether they carry across, get stripped, or get redirected to a canonical parameter-free version. Left undecided, they tend to produce a long tail of near-duplicate redirected URLs nobody intended to create.",
        ],
      },
      {
        heading: "Test the map before launch, and verify it again after",
        body: [
          "Before cutover, crawl the staging environment against the full URL inventory and confirm every mapped URL actually returns the expected status code and destination — not a sample, the full list, because the URL that was not checked is exactly the one likely to be wrong.",
          "After launch, spot-check the highest-value URLs with URL Inspection in Search Console and watch for a rise in 404s or soft-404s in the Coverage report. A redirect map that was correct in staging can still surface production-only issues — a case-sensitive server config, a proxy rewriting something unexpectedly — that only show up under real traffic.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do 301 redirects pass the full ranking value of the old page?",
        a: "Google has stated that a 301 is treated similarly to the original URL for ranking purposes, without promising an exact one-to-one transfer of every signal. In practice, a clean, direct 301 to a genuinely equivalent page is the strongest option available and is what a well-run migration should rely on.",
      },
      {
        q: "What about redirecting an entire old domain to a new one?",
        a: "The same URL-by-URL principle applies at domain scale — a blanket domain-level redirect to a single destination page is not a substitute for a real map. Each old URL still needs its own specific destination; the domain change just means the map spans two hostnames instead of one path structure.",
      },
      {
        q: "How long do redirects need to stay in place?",
        a: "Indefinitely, for anything that was meaningfully indexed or linked — old links and bookmarks do not expire on a schedule. Removing redirects prematurely is a common way sites lose value months after a migration that otherwise went well.",
      },
    ],
    relatedServiceSlug: "wordpress-to-nextjs-migration",
    relatedCaseStudySlugs: ["aussiemotor"],
    cta: {
      heading: "Building a redirect map for a real migration?",
      body: "Send the URL inventory, or the site itself if you have not built one yet. I will tell you what I think the map needs to cover before anything goes live.",
      primaryLabel: "Request a migration assessment",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     5 · REBUILD VS REDESIGN
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "rebuild-vs-redesign-when-to-choose-which",
    title: "When Should You Rebuild a Website Instead of Redesigning It?",
    metaTitle: "Rebuild vs Redesign: How to Actually Decide",
    metaDescription:
      "A practical framework for choosing between a website rebuild and a redesign — the signals that point to each, and the trap of rebuilding to avoid a content problem.",
    keywords: [
      "rebuild vs redesign website",
      "when to rebuild a website",
      "website redesign or rebuild",
      "website technical debt",
    ],
    h1: "When should you rebuild a website instead of redesigning it?",
    dek: "Redesign fixes clarity. Rebuild fixes structure. Most sites asking this question have already confused the two.",
    cluster: "Redesign",
    intent: "Commercial investigation",
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-10",
    definition:
      "A redesign changes what a site says and how it is organised without changing the underlying technology, while a rebuild changes the underlying technology because the current stack — not the messaging or the visual design — has become the actual constraint; choosing between them means diagnosing which one is genuinely broken.",
    intro: [
      "This question usually arrives already partly answered by the wrong evidence. \"The site looks dated\" gets treated as a rebuild signal when it is almost always a redesign one; \"we can't add the feature our users are asking for\" gets treated as a redesign problem when it is usually structural. Getting the diagnosis backwards is how a project doubles in scope and cost for no corresponding benefit.",
      "The framework below is the one I actually use to separate the two, drawn from doing both: redesign-and-rebuild work on sites that needed structural change, and pure UX and messaging work on sites that were structurally fine and just unclear.",
    ],
    sections: [
      {
        heading: "Redesign fixes clarity; rebuild fixes structure",
        body: [
          "A redesign is an information-architecture and visual-system problem: what the site says first, how it is organised, what the primary action is, whether the page loads fast because the assets are heavy rather than because the framework is wrong. None of that requires new technology underneath — it requires clearer decisions on top of what already exists.",
          "A rebuild is a structural problem: the CMS cannot support the content model the business now needs, every new page requires a developer because the templating is inflexible, or the page weight is architectural rather than a matter of unoptimised assets. These are technology-layer problems that a new coat of paint does not touch.",
        ],
      },
      {
        heading: "Signals that point to a redesign",
        body: [
          "The offer is not clear within the first screen, the primary action is buried under competing secondary ones, or the visual system feels inconsistent from page to page — while the underlying platform, whatever it is, is otherwise capable of doing what the business needs. These are content, hierarchy and design-system problems, and they are usually the faster, lower-risk fix.",
          "A redesign can also include a rebuilt frontend on the existing CMS or backend — 'redesign' does not mean 'leave the code untouched,' it means the technology decision was not the trigger. It is entirely normal for a redesign engagement to involve real engineering work.",
        ],
      },
      {
        heading: "Signals that point to a rebuild",
        body: [
          "The CMS or stack cannot represent the content model the business actually needs, a plugin-heavy WordPress install has become too fragile to change safely, or a specific feature the product needs — a dashboard, an authenticated area, complex interactive filtering — is architecturally impossible in the current setup rather than merely undesigned. These are constraints a visual refresh cannot touch, because the ceiling is the technology, not the layout on top of it.",
          "Page weight is worth separating out specifically: if it comes from unoptimised images and unnecessary third-party scripts, that is fixable within the current platform. If it comes from the platform's own architecture — a client-rendered plugin stack with no realistic path to server rendering — that is a rebuild-shaped problem wearing a performance costume.",
        ],
      },
      {
        heading: "The trap: rebuilding to avoid a hard conversation about content",
        body: [
          "A rebuild is sometimes proposed because it feels like decisive action, when the actual unresolved problem is that nobody has agreed what the site should say or who it is for. A new technology stack does not answer that question, and a team that rebuilds around unclear messaging tends to end up with a faster, better-engineered version of the same unclear site.",
          "If the honest diagnosis is \"we don't know what we're offering or to whom,\" that gets resolved before any code changes — on the current platform if it is capable, because answering it does not require new technology, only clearer thinking.",
        ],
      },
      {
        heading: "A rebuild can, and should, keep what is already working",
        body: [
          "Visual identity, brand assets, an existing design system, and content that is already ranking well are not automatically discarded in a rebuild — the trigger was the technology layer, so the parts that were never the problem do not need to be reinvented. Carrying over what works also reduces the risk surface of the project considerably.",
          "This is where a redirect strategy and content-parity plan become part of a rebuild's scope in exactly the way they would for a pure migration — the technology underneath is changing, but the site's earned position in search should not have to be rebuilt along with it.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I redesign now and rebuild later?",
        a: "Yes, and it is often the sequence that makes sense — resolve messaging and information architecture first, since that thinking carries over regardless of the technology underneath, then rebuild the platform once the structural constraint becomes the clear limiting factor rather than a hypothetical one.",
      },
      {
        q: "Is a rebuild always more expensive than a redesign?",
        a: "Usually, because it involves replacing the technology layer rather than working within it, but not always — a redesign that requires extensive custom plugin work to force a rigid CMS into a new shape can cost more than a clean rebuild on a platform suited to the actual requirement. The honest comparison is scope against scope, not label against label.",
      },
      {
        q: "What if I genuinely can't tell which one I need?",
        a: "That is a normal starting position, not a sign anything is wrong — the diagnosis is usually the first deliverable of a proper engagement, not a prerequisite for starting one. Describing the actual symptoms (what's slow, what's unclear, what can't be built) is enough to start from.",
      },
    ],
    relatedServiceSlug: "website-redesign-rebuild",
    relatedCaseStudySlugs: ["cennetsol", "verdira"],
    cta: {
      heading: "Not sure which one your site needs?",
      body: "Send the current site and describe what's actually wrong with it. I will tell you honestly whether that points to a redesign, a rebuild, or something smaller than either.",
      primaryLabel: "Request a redesign assessment",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     6 · CORE WEB VITALS APPROACH
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "core-web-vitals-in-react",
    title: "How I Approach Core Web Vitals in React Applications",
    metaTitle: "Core Web Vitals in React Applications: My Approach",
    metaDescription:
      "How I diagnose and fix Core Web Vitals problems in React applications — measurement first, removal before optimisation, and re-measuring every change.",
    keywords: [
      "Core Web Vitals React",
      "improve LCP React",
      "React performance optimisation",
      "Next.js Core Web Vitals",
    ],
    h1: "How I approach Core Web Vitals in React applications",
    dek: "Measure first, remove before you optimise, change one thing at a time, measure again.",
    cluster: "Performance",
    intent: "Expertise / proof",
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-10",
    definition:
      "Improving Core Web Vitals in a React application means measuring a real baseline, removing what is not being used before optimising what is, and re-measuring after every isolated change — in that order, because skipping the baseline or bundling changes together is what makes performance work unreliable.",
    intro: [
      "This is the process behind the 30% Core Web Vitals improvement on Sunhub, a production React marketplace — documented with what was actually changed. It is a process, not a one-off trick, because the causes of a slow page are specific to that page and the fix has to be diagnosed, not copied from a checklist.",
      "None of the four steps below are exotic. What matters is doing them in this order and not skipping the measurement either side of a change.",
    ],
    sections: [
      {
        heading: "1. Measure before changing anything",
        body: [
          "Performance work without a baseline is guesswork dressed up as engineering — you cannot know a change helped if you did not know where you started. The first pass on Sunhub was entirely measurement: what was actually in the bundle, which assets were still referenced anywhere in the codebase, what was blocking first paint, and which images were being served far larger than their display size.",
          "That produces an ordered list of causes, ranked by actual impact, rather than a list of generic performance tactics applied hopefully. Lab tools (Lighthouse, WebPageTest) and field data (Chrome UX Report, if the site has enough traffic) tell different parts of this story and are both worth having before you start.",
        ],
      },
      {
        heading: "2. Remove before you optimise",
        body: [
          "The cheapest asset to load is the one that is not shipped at all. On a codebase that has been through several years of feature delivery, dead code and unused assets accumulate quietly — nobody deletes something on purpose, it just stops being referenced and stays in the bundle anyway.",
          "Deleting unused code is lower-risk and higher-yield than micro-tuning code that should not ship in the first place. It is also where tree-shaking actually starts working: a barrel import that pulls a whole library into a page defeats tree-shaking silently, and tightening those imports is often the single biggest bundle-size win available.",
        ],
      },
      {
        heading: "3. Draw loading boundaries deliberately, not everywhere",
        body: [
          "Lazy loading is a decision, not a default. Deferring something above the fold trades one metric for another — it improves initial bundle size and damages perceived load, because now the user is staring at a spinner for content that should have been there immediately.",
          "The split belongs at the boundary of the first meaningful render: below-the-fold sections and heavier interactive regions are reasonable candidates for deferral, while anything the user needs to see or use in the first paint should stay eager. Images get compressed and served at the size they are actually displayed at — not the size they were uploaded at.",
        ],
      },
      {
        heading: "4. Change one thing, measure again",
        body: [
          "Shipping five optimisations in one release tells you the total effect but not which change mattered, and if one of them made something else worse, you cannot isolate and reverse it. Each change gets measured on its own where that is practical, so its effect is attributable rather than assumed.",
          "This is slower than batching everything into one deploy. It is also the only way to know, honestly, what actually caused the improvement — which matters if you are ever going to explain the number to someone, or repeat it on the next project.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the biggest single win in most React performance work?",
        a: "In my experience, removing unused code and assets — not adding a new optimisation technique. Most production codebases carry more dead weight than anyone realises, and deleting it is lower-risk than tuning code that should not have shipped at all.",
      },
      {
        q: "Should everything below the fold be lazy-loaded?",
        a: "Most of it, but not automatically. The actual line is the first meaningful render — content the user needs immediately should stay eager even if it is technically further down the page on some viewports. Lazy loading is a judgment call per section, not a blanket rule.",
      },
      {
        q: "Do you quote specific LCP, INP or CLS numbers?",
        a: "Only when I have published them. The 30% figure on Sunhub is an aggregate improvement measured before and after the work, and I have deliberately not reproduced per-metric numbers I have not shown the workings for — publishing those is on the improvement list for that case study, not something I'll fabricate here.",
      },
    ],
    relatedServiceSlug: "performance-engineering",
    relatedCaseStudySlugs: ["sunhub"],
    cta: {
      heading: "Have a React app that has gotten slow?",
      body: "Send the site. I will tell you honestly what I think is actually causing it before proposing any work — sometimes that is a smaller fix than a full performance engagement.",
      primaryLabel: "Discuss a frontend project",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     7 · WHAT I CHECK FIRST
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "react-performance-optimization-what-i-check-first",
    title: "React Performance Optimization: What I Check First",
    metaTitle: "React Performance Optimization: What I Check First",
    metaDescription:
      "A diagnostic order for React performance problems — the network tab, bundle composition, render count, assets and third-party scripts, before any code changes.",
    keywords: [
      "React performance checklist",
      "diagnose slow React app",
      "React render performance",
      "Next.js bundle analysis",
    ],
    h1: "React performance optimization: what I check first",
    dek: "A diagnostic order, not a list of fixes — most of the time the first thing you check tells you what actually matters.",
    cluster: "Performance",
    intent: "Problem solving",
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-10",
    definition:
      "Diagnosing a slow React application means checking the network request waterfall before the component profiler, bundle composition before render logic, and images and third-party scripts before either — because most React performance complaints trace back to what is being loaded, not how a component re-renders.",
    intro: [
      "This is the diagnostic sequence, not the fix list — the two are different documents on purpose. A fix applied before the cause is confirmed is a guess wearing a solution's clothes, and the fastest way to waste a day of performance work is to reach for useMemo before checking whether the bottleneck was ever in React's render cycle at all.",
      "The order below is deliberately front-loaded toward the things that are wrong far more often than people expect, and pushes the fashionable answer — component-level micro-optimisation — toward the back, where it actually belongs most of the time.",
    ],
    sections: [
      {
        heading: "1. The network tab before the profiler",
        body: [
          "Before opening React DevTools, open the browser's network panel and look at the actual waterfall: what loads first, what blocks what, how large the JavaScript and CSS payloads are, and whether requests are happening in parallel or needlessly serialised. A huge share of \"React is slow\" complaints are actually \"the browser is waiting on network requests\" complaints, and no amount of component optimisation touches that.",
          "This is also where render-blocking resources show up plainly — a synchronous script in the document head, a font that has to load before text can paint, a CSS file larger than it needs to be. These are frequently bigger levers than anything inside the component tree.",
        ],
      },
      {
        heading: "2. Bundle composition — what is actually shipping",
        body: [
          "Run a bundle analyzer before assuming you know what is in the JavaScript payload. Duplicate versions of the same dependency (often from mismatched package versions across a monorepo), a barrel import silently pulling in an entire library for one function, and a charting or animation library loaded on every page when only one page uses it are the three most common findings, in roughly that order of frequency.",
          "This step alone regularly finds more savings than every subsequent step combined, which is exactly why it comes early rather than being treated as a nice-to-have audit at the end.",
        ],
      },
      {
        heading: "3. Render count, not render time",
        body: [
          "Once the loading side is accounted for, use the React DevTools profiler to look at how often components render, not how long an individual render takes — a component re-rendering fifty times in a scroll handler is a bigger problem than one slow render that happens once. This is the point where useMemo, useCallback and React.memo actually become relevant, and applying them before this diagnosis is done is how a codebase ends up memoised everywhere with no measurable improvement to show for it.",
          "The most common cause of excess re-renders is a new object or function reference created on every parent render and passed down as a prop — memoisation fixes the symptom, but the real fix is often restructuring where that value is created in the first place.",
        ],
      },
      {
        heading: "4. Images and fonts, which are usually bigger than the JavaScript",
        body: [
          "It is common to spend hours on bundle size and ignore a hero image served at four times its display resolution, or a webfont blocking text render for a second because it was not preloaded. Check actual transferred image sizes against their rendered dimensions, and confirm fonts are using font-display: swap or an equivalent strategy rather than blocking paint.",
          "This is frequently the single highest-leverage, lowest-effort fix available, and it is skipped constantly because it feels too simple to be the answer.",
        ],
      },
      {
        heading: "5. Third-party scripts you did not write",
        body: [
          "Analytics tags, chat widgets, A/B testing scripts and embedded media players are common, unreviewed contributors to main-thread blocking and layout shift, precisely because nobody on the engineering team chose to add most of them directly to the codebase. An audit of what is actually loaded on the page — not what marketing thinks is loaded — regularly turns up scripts nobody remembers approving.",
          "The fix is rarely \"remove all of them.\" It is usually deferring what does not need to run immediately, and having an honest conversation about which of them are actually earning their cost in page weight.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is useMemo or useCallback the first thing you reach for?",
        a: "No — they are close to the last thing, applied only after the profiler shows a specific, confirmed re-render problem that memoisation actually addresses. Reaching for them first is a common instinct and a common way to add complexity without a measurable result.",
      },
      {
        q: "Do you set a performance budget?",
        a: "On an ongoing project, yes — a bundle-size or Core Web Vitals threshold enforced in CI so a regression fails the build instead of being discovered in production weeks later. On a one-off diagnostic pass, the immediate priority is finding and fixing the current problem; the budget is what prevents the next one.",
      },
      {
        q: "What tool do you actually open first?",
        a: "The browser's own network panel, before any third-party tool. It is free, it is already open, and it answers the single most important question — what is actually being loaded and in what order — faster than anything else available.",
      },
    ],
    relatedServiceSlug: "performance-engineering",
    relatedCaseStudySlugs: ["sunhub"],
    cta: {
      heading: "Want this diagnostic run on your actual app?",
      body: "Send the site. I will walk through this sequence against it and tell you honestly what I think is actually causing the slowness before proposing any fix.",
      primaryLabel: "Discuss a frontend project",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     8 · EVALUATING A CODEBASE BEFORE ADDING FEATURES
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "evaluating-a-nextjs-codebase-before-adding-features",
    title: "How to Evaluate an Existing Next.js Codebase Before Adding Features",
    metaTitle: "Evaluating a Next.js Codebase Before Adding Features",
    metaDescription:
      "What to check in an existing Next.js codebase before adding a new feature — rendering strategy fit, existing conventions, blast radius and regression protection.",
    keywords: [
      "Next.js codebase evaluation",
      "adding features to existing React app",
      "Next.js rendering strategy audit",
      "React codebase feature readiness",
    ],
    h1: "How to evaluate an existing Next.js codebase before adding features",
    dek: "Not whether the codebase is good — whether it is ready for the specific thing you're about to build.",
    cluster: "Engineering",
    intent: "Problem solving",
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-10",
    definition:
      "Evaluating a Next.js codebase before adding a feature means checking whether the feature fits the existing rendering strategy, whether it should follow or deliberately break existing conventions, what else in the app it touches, and what protects the rest of the app if it goes wrong — a narrower, more tactical read than a full codebase audit, scoped to one piece of work rather than the whole system.",
    intro: [
      "This is a different question from \"should I take this codebase over,\" which is a broader initial assessment. This one assumes you already own the codebase, or are about to be handed one specific feature inside it, and need to know what that feature is actually walking into before estimating it.",
      "Skipping this step is how a feature that looked like two days of work turns into two weeks — not because the feature was hard, but because the codebase's assumptions and the feature's requirements were quietly incompatible from the start.",
    ],
    sections: [
      {
        heading: "Does the feature fit the existing rendering strategy?",
        body: [
          "If the app is built as fully client-rendered and the new feature needs to be indexable or fast on first load, that is friction the feature inherits whether anyone planned for it or not. Check how the relevant route is currently rendered — server component, client component, static generation — before assuming the feature can simply be added where a similar-looking screen already lives.",
          "This is also where you find out whether the app's rendering choices were made deliberately per route, or defaulted into everywhere. The former means you can reason about where the new feature fits; the latter means the feature's rendering strategy is effectively an open question, not an inherited answer.",
        ],
      },
      {
        heading: "Follow the existing pattern, or break it on purpose",
        body: [
          "Every codebase has conventions, named or not — how forms are built, how data fetching is structured, how errors are surfaced. The choice is not whether to follow them; it is whether deviating is a deliberate decision with a stated reason, or an accident of whoever wrote the feature not knowing the convention existed.",
          "A feature that quietly introduces a second way of doing something the codebase already does one way is a small decision that compounds — the next person has two patterns to choose from, and the one after that has three.",
        ],
      },
      {
        heading: "What does this feature touch that other features also depend on?",
        body: [
          "Shared state, a global context, a utility function used in a dozen places — a change here has a blast radius wider than the feature itself. Before writing the feature, trace what it actually needs to read or modify that already has other consumers, and treat that list as the real risk surface, not the feature's own new code.",
          "This is where a feature that looks isolated in the design turns out not to be isolated in the codebase. Knowing that before starting changes how carefully that part gets built and tested.",
        ],
      },
      {
        heading: "What protects the rest of the app if this goes wrong?",
        body: [
          "Automated tests, a staging environment, a feature flag, or nothing at all — the answer determines how much manual verification the feature needs before it ships, and how quickly a problem can be caught and reversed if it does go wrong. \"Nothing\" is not disqualifying, but it changes the plan: smaller increments, more manual checking, a rollback plan stated before launch rather than improvised after.",
          "This is worth checking honestly rather than assuming. A codebase with an impressive-looking test suite that does not actually cover the area the feature touches offers less protection than it appears to.",
        ],
      },
      {
        heading: "Scope the feature smaller before you scope it bigger",
        body: [
          "The first version to ship into an unfamiliar codebase should be the narrowest one that proves the assumptions above were correct — not the full feature as originally specced. If the rendering strategy, the conventions and the blast radius all turn out to be exactly as expected, scaling up from there is straightforward. If any of them surprise you, better to find out on a small change than a large one.",
          "This is not about being timid. It is about treating the codebase's actual behaviour, not its documentation or its reputation, as the source of truth for how much can be trusted on the first attempt.",
        ],
      },
    ],
    faqs: [
      {
        q: "How is this different from a general codebase audit?",
        a: "A general audit asks whether the codebase as a whole is healthy enough to take on. This is scoped to one feature: does the codebase, as it actually is today, support this specific piece of work safely. You can do this evaluation in an afternoon even in a codebase you would not want to fully audit.",
      },
      {
        q: "What if the codebase's conventions are genuinely bad?",
        a: "That is a real finding, and it does not automatically mean you should break them for this feature. Introducing a better pattern in isolation, without a plan to migrate the rest of the codebase toward it, usually just adds a second, better convention that nothing else follows — which is its own kind of inconsistency.",
      },
      {
        q: "What if there is no time to do this evaluation properly?",
        a: "Then that time pressure is itself part of the risk assessment — a feature added without checking rendering fit, conventions or blast radius is a feature shipped on assumptions rather than evidence, and that should factor into how conservatively it gets scoped and how closely it gets watched after launch.",
      },
    ],
    relatedServiceSlug: "frontend-product-engineering",
    relatedCaseStudySlugs: ["verdira"],
    cta: {
      heading: "Adding a feature to a codebase you didn't build?",
      body: "Send the repo, or describe the situation if it's private. I will tell you honestly what I'd check first and what I think the real scope of the feature is.",
      primaryLabel: "Discuss a frontend project",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     9 · NEXT.JS WITH AN EXISTING BACKEND
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "can-a-nextjs-frontend-work-with-an-existing-backend",
    title: "Can a Next.js Frontend Work With an Existing Backend?",
    metaTitle: "Can a Next.js Frontend Work With an Existing Backend?",
    metaDescription:
      "Yes — how a Next.js frontend integrates with an existing REST or GraphQL backend, where the API boundary should live, and what auth actually requires.",
    keywords: [
      "Next.js existing backend integration",
      "Next.js REST API integration",
      "Next.js with legacy backend",
      "Next.js frontend backend agnostic",
    ],
    h1: "Can a Next.js frontend work with an existing backend?",
    dek: "Yes — Next.js does not require you to adopt its own backend conventions to use it as a frontend.",
    cluster: "Engineering",
    intent: "Commercial investigation",
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-10",
    definition:
      "A Next.js frontend can work with any existing REST or GraphQL backend, because Next.js's own server features — Route Handlers, Server Components — are optional conveniences, not requirements, and a Next.js app can call an external API directly from the client or through a thin server-side proxy exactly as any other frontend framework would.",
    intro: [
      "This question comes up most from teams with a backend already built — often in a different language entirely — worried that adopting Next.js means also adopting its backend layer, or rewriting an API that works fine. It does not, and I want to be specific about why, because the vague version of \"yes, it's fine\" is not useful when you are the one deciding.",
      "The honest caveats matter here too. Next.js integrating cleanly with an existing backend is the normal case, not the exception — but there are a small number of situations, covered below, where the backend itself, not the frontend framework, is the actual constraint.",
    ],
    sections: [
      {
        heading: "Next.js does not require you to adopt its backend conventions",
        body: [
          "Route Handlers, Server Actions and the rest of Next.js's server-side toolkit exist to make certain patterns easier — they are not a mandatory backend you have to migrate onto. A Next.js app is free to call your existing REST or GraphQL API directly, the same way a Create React App or a Vue application would, using fetch or whatever HTTP client you already use elsewhere.",
          "This distinction matters because it changes the actual scope of a frontend engagement against an existing backend: the work is building the interface and wiring it to endpoints that already exist, not designing a new API layer that did not need to exist in the first place.",
        ],
      },
      {
        heading: "Where the API boundary actually lives",
        body: [
          "Calling the backend directly from the client is the simplest option and works well when the API is already public-facing, has sensible CORS configuration, and does not need to hide credentials from the browser. This is the common case for a straightforward product frontend against a REST API designed for it.",
          "Routing requests through a thin server-side layer inside the Next.js app — a Route Handler acting as a proxy — becomes the better option when the backend needs a secret the client should never see, when CORS cannot be configured on the backend side, or when you want to reshape or combine several backend calls into one response the frontend consumes. This is an architectural decision made deliberately, not a default.",
        ],
      },
      {
        heading: "Auth is the part that actually takes thought",
        body: [
          "Session cookies, JWTs and server-side auth checks all work with an existing backend, but the specifics depend on how that backend already handles identity — whether it issues sessions, tokens, or something custom — and how much of the auth flow needs to happen server-side in Next.js versus being delegated entirely to the existing system.",
          "The part worth being deliberate about is where protected routes get enforced: on the server, checking the session before rendering anything sensitive, rather than only hiding a link in the UI. This is true regardless of what backend sits behind it, and it is the single most common shortcut that gets skipped under time pressure.",
        ],
      },
      {
        heading: "Legacy or unusual backends",
        body: [
          "SOAP APIs, backends with no CORS support, aggressive rate limits, or authentication schemes that assume a specific client are all real complications, and none of them are unique to Next.js — any frontend calling the same backend would face them. A server-side proxy inside the Next.js app is frequently the pragmatic answer: it lets the frontend talk to a clean, modern interface while the proxy layer absorbs whatever the legacy backend actually requires.",
          "This pattern also isolates change: if the legacy backend is eventually replaced, the frontend's contract with the proxy layer does not have to change, only the proxy's implementation does.",
        ],
      },
      {
        heading: "What this does not solve",
        body: [
          "If the backend genuinely cannot support a requirement — an endpoint that does not exist, data that is not tracked, a workflow the system was never built for — no frontend framework decision changes that. That is a backend or product-scope conversation, and it is worth having explicitly and early rather than discovering it mid-build when a screen has nothing real to connect to.",
          "The honest version of a scoping conversation names this possibility up front: most of the time an existing backend is perfectly workable, and occasionally the real finding is that backend work needs to happen alongside the frontend, not instead of it.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need to rewrite our API to use Next.js for the frontend?",
        a: "No. A Next.js frontend can call an existing REST or GraphQL API exactly as any other frontend framework would — the API does not need to change to accommodate the frontend technology choice.",
      },
      {
        q: "What if our backend doesn't support CORS?",
        a: "A thin server-side proxy inside the Next.js app — a Route Handler that forwards the request — sidesteps the CORS restriction entirely, because the request to the backend happens server-to-server rather than from the browser directly.",
      },
      {
        q: "Does this work with a backend written in a completely different language?",
        a: "Yes — the frontend only needs a well-defined API contract (REST, GraphQL, or another interface) to talk to; the language the backend is written in is invisible to the frontend as long as that contract is clear and stable.",
      },
    ],
    relatedServiceSlug: "frontend-product-engineering",
    relatedCaseStudySlugs: ["sunhub"],
    cta: {
      heading: "Have a backend already and need the frontend built?",
      body: "Send the API documentation or describe what exists. I will tell you honestly how it fits and what the integration actually involves.",
      primaryLabel: "Discuss a frontend project",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     10 · WHITE-LABEL FOR AGENCIES
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "how-white-label-react-development-works-for-agencies",
    title: "How White-Label React Development Works for Agencies",
    metaTitle: "How White-Label React Development Works for Agencies",
    metaDescription:
      "How a white-label React and Next.js engagement actually runs — who owns what, how estimates flow, what makes it fail, and what a good handoff looks like.",
    keywords: [
      "white label React development",
      "white label frontend developer agency",
      "outsourced React development agency",
      "agency frontend capacity",
    ],
    h1: "How white-label React development works for agencies",
    dek: "The mechanics of the arrangement, not the pitch — who owns what, and where it actually breaks.",
    cluster: "Agency",
    intent: "Commercial investigation",
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-10",
    definition:
      "White-label React development is an arrangement where an agency keeps the client relationship, the brand and the contract, while an external engineer delivers the implementation inside the agency's process — the agency's client typically never knows, or does not need to know, who actually wrote the code.",
    intro: [
      "This is the operating mechanics, not the sales pitch for it — the part that actually determines whether the arrangement works: who is accountable to whom, how money and estimates flow, and the specific things that make these engagements fail when they do.",
      "I deliver work this way regularly, including via an agency relationship on the Sunhub platform, so this is describing a real operating model, not a theoretical one.",
    ],
    sections: [
      {
        heading: "The relationship: who owns what",
        body: [
          "The agency owns the client relationship, the contract, the brand and the account management — that does not change. The external engineer owns the implementation: the code gets delivered into the agency's repository, under the agency's process, and the agency's client interacts with the agency, not directly with whoever wrote the frontend.",
          "This ownership split is what makes white-label different from simply subcontracting a job publicly — the agency is not disclosing that part of the work was delivered externally unless it chooses to, and the engineer is not building a portfolio entry or a client relationship out of the engagement unless that is separately agreed.",
        ],
      },
      {
        heading: "How scope and estimates actually flow",
        body: [
          "The agency scopes the client-facing proposal and price. The external engineer provides a technical estimate for the implementation piece, privately, to the agency — not to the client. The agency's margin sits in the gap between what the client is quoted and what the implementation actually costs, which is the agency's business decision, not something the engineer needs visibility into beyond their own number.",
          "This works cleanly when the agency treats the technical estimate as authoritative for the engineering scope, rather than quoting the client first and working backward to make the engineering fit a number that was set without technical input.",
        ],
      },
      {
        heading: "What makes a white-label engagement fail",
        body: [
          "The most common failure is a design handoff with no defined states — a Figma file with the happy path drawn and nothing else, leaving the engineer to guess at loading, empty and error states that the client will eventually notice are missing. The second most common is no single named point of contact on the agency side, so questions stall waiting for someone to notice them.",
          "A third, quieter failure mode: unclear terms on exclusivity, NDA and whether the work can appear in a portfolio. These should be settled before the engagement starts, not discovered as a disagreement partway through — vague terms here cost trust exactly when trust is the entire value of the relationship.",
        ],
      },
      {
        heading: "What a good handoff package actually looks like",
        body: [
          "A design file with the states it implies already specified — hover, focus, loading, empty, error — not just the frames someone drew. API documentation or working endpoints, not a promise they will exist by the time they are needed. Repository access with the agency's actual branching and review conventions. And one named person who can answer a question within the working day, not a shared inbox that several people might check.",
          "Missing that last one — a single accountable contact — causes more delay in practice than any technical gap, because a technical question has a technical answer; an unanswered question just sits.",
        ],
      },
      {
        heading: "Project-based versus retained capacity",
        body: [
          "A single project gets scoped and estimated on its own, priced once, delivered once — straightforward for an agency with occasional overflow work. Retained capacity is a recurring allocation of hours or delivery slots an agency can plan its own client pipeline around, which tends to suit agencies with steady, predictable frontend demand better than repeatedly re-scoping small individual projects.",
          "Neither is inherently better; the right one depends on whether the agency's frontend demand is lumpy and occasional or steady and forecastable. Most agencies find this out empirically after the first project or two, rather than deciding it up front.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does the client know the work is being delivered externally?",
        a: "That is the agency's call, and it varies by relationship — some agencies disclose it, most do not need to, and the engineer's job is to fit into whichever posture the agency has chosen, including appearing as part of the agency's team in any client-facing communication if that is what's asked.",
      },
      {
        q: "Who is responsible if something goes wrong with the delivered work?",
        a: "The agency is accountable to its client contractually; the engineer is accountable to the agency for the quality and timeliness of the implementation. That chain is exactly why a clear technical estimate and an honest scope conversation up front matter — it is what the agency's own accountability to its client is resting on.",
      },
      {
        q: "Can white-label work include ongoing maintenance, not just a project?",
        a: "Yes, that is usually what a retained-capacity arrangement is for — ongoing feature delivery and maintenance on a client codebase the agency already holds, allocated as a standing capacity rather than scoped project by project.",
      },
    ],
    relatedServiceSlug: "agency-frontend-development",
    relatedCaseStudySlugs: ["sunhub"],
    cta: {
      heading: "Have a pipeline gap you need capacity for?",
      body: "Tell me what's in the pipeline and where the gap is. I will come back with how I'd slot into your process and what it would cost per project.",
      primaryLabel: "Discuss an agency partnership",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     11 · ADDING AI FEATURES TO AN EXISTING APP
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "how-to-add-ai-features-to-an-existing-web-application",
    title: "How to Add AI Features to an Existing Web Application",
    metaTitle: "How to Add AI Features to an Existing Web Application",
    metaDescription:
      "A practical approach to adding AI features to an existing product — starting from the job to be done, grounding answers, designing for failure, and managing latency and cost.",
    keywords: [
      "add AI features to web app",
      "AI product integration",
      "LLM integration existing product",
      "grounded AI search",
    ],
    h1: "How to add AI features to an existing web application",
    dek: "Start from the job the feature does, not the model doing it — the model call is rarely the hard part.",
    cluster: "AI Integration",
    intent: "Problem solving",
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-10",
    definition:
      "Adding an AI feature to an existing web application means defining one specific, testable job it does, grounding its answers in a real source of truth rather than the model's general knowledge, and designing the interface for the case where the model is wrong — the model call itself is usually the easiest part of the work.",
    intro: [
      "Most AI features that disappoint users fail for the same reason: they were scoped around a technology rather than a job. \"Add AI to the product\" is not a feature; \"let a user find the right document without reading the whole knowledge base\" is — the second one can actually be built, tested and judged as working or not.",
      "This is the practical sequence I use, and it puts the interface and the grounding work ahead of the model choice on purpose, because that is where most AI features actually succeed or fail.",
    ],
    sections: [
      {
        heading: "Start from the job, not the model",
        body: [
          "Before choosing a model or an approach, write down the specific job in one sentence concrete enough to test: what question does the feature answer, for whom, and what does a good answer look like. \"An assistant that helps with support\" is not testable; \"a search that answers a billing question from our actual documentation, citing the source\" is.",
          "This step also surfaces whether AI is the right tool at all. Some problems that get proposed as an assistant are better solved as a well-designed search interface or a simple lookup — a chat window is one shape an AI feature can take, not the default one.",
        ],
      },
      {
        heading: "Ground it in something real",
        body: [
          "A model answering from its general training knowledge about your specific product, pricing or policies will be confidently wrong often enough to cost more in support tickets than it saves. Retrieval — searching your own content and constraining the model's answer to what was actually found — is what turns a plausible-sounding feature into a trustworthy one.",
          "The retrieval source needs an owner and a freshness plan. A knowledge base that goes stale produces confidently wrong answers just as reliably as no grounding at all, and the failure is harder to notice because the feature looks like it is working correctly.",
        ],
      },
      {
        heading: "Design for the model being wrong",
        body: [
          "It will be, eventually — the interface has to be built for that case as a first-class scenario, not an edge case discovered after launch. That means visible citations a user can check, an honest refusal when retrieval finds nothing relevant rather than a plausible-sounding guess, and a clear, easy path to a human when the feature cannot help.",
          "A feature evaluated only against the case where the model is right is not finished. The refusal and escalation paths are frequently what determines whether users trust the feature enough to keep using it after the first time it gets something wrong.",
        ],
      },
      {
        heading: "Latency is part of the user experience, not an implementation detail",
        body: [
          "A blank panel with a spinner for eight seconds reads as broken, regardless of what is happening technically behind it. Streaming the response as it generates, showing progressive states (searching, found sources, composing an answer) rather than one silent wait, and setting honest expectations about how long something will take are all part of the feature, not polish added afterward.",
          "This matters more for AI features than most other product work, because generation time is often genuinely variable in a way a normal API call is not — the interface needs to account for that variability rather than pretend it is a fixed, short wait.",
        ],
      },
      {
        heading: "Cost and rate limits are a product decision, not just an infrastructure one",
        body: [
          "Every model call has a cost and a latency profile, and an unconstrained feature can become expensive or slow in ways that only show up at real usage volume. Caching repeated queries, choosing a smaller or cheaper model for simpler parts of the job and reserving a larger one for the parts that need it, and setting sensible rate limits are decisions that belong in the initial design, not a fire drill after launch.",
          "This is also where the earlier scoping work pays off — a feature with a narrowly defined job is much easier to reason about the cost of than an open-ended assistant that could be asked anything.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you build custom or fine-tuned models?",
        a: "No — this is integration work: API-driven models, retrieval over your own content, and the interface layer around both. Training or fine-tuning a model is a different discipline that needs an ML engineer, and I will say so rather than take on work outside that scope.",
      },
      {
        q: "What is the most common mistake you see in AI features that get added to existing products?",
        a: "Scoping the feature around what the model can technically do, rather than around one specific, testable job a user actually has. That produces a feature that is impressive in a demo and vague in practice, because nobody can say clearly what it is supposed to succeed or fail at.",
      },
      {
        q: "How do you decide between a chatbot and a simpler AI-assisted search?",
        a: "By what the job actually is. If the job is finding the right answer in existing content, a well-designed search that returns a grounded answer with sources often serves users better and is easier to keep accurate than a chat window. A chat interface earns its place when the interaction genuinely benefits from back-and-forth, not by default.",
      },
    ],
    relatedServiceSlug: "ai-product-integration",
    relatedCaseStudySlugs: ["cennetsol", "verdira"],
    cta: {
      heading: "Have a specific job in mind for an AI feature?",
      body: "Describe the job you want it to do and what it would answer from. I will tell you honestly whether it is a good fit for this approach — including if I think it is not.",
      primaryLabel: "Discuss an AI feature",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════
     12 · EVALUATING A CODEBASE BEFORE TAKING IT OVER
     ══════════════════════════════════════════════════════════════════════ */
  {
    slug: "evaluating-a-frontend-codebase-before-taking-it-over",
    title: "What I Look For Before Taking Over a Frontend Codebase",
    metaTitle: "Evaluating a Frontend Codebase Before Taking It Over",
    metaDescription:
      "What I actually check before taking over an existing React or Next.js codebase — state management, rendering strategy, component boundaries and technical debt.",
    keywords: [
      "evaluate existing React codebase",
      "Next.js codebase audit",
      "taking over a frontend codebase",
      "React technical debt",
    ],
    h1: "What I look for before taking over a frontend codebase",
    dek: "A short, honest audit before any commitment — not a rewrite pitch in disguise.",
    cluster: "Engineering",
    intent: "Problem solving",
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-10",
    definition:
      "Evaluating a React or Next.js codebase before taking it over means checking, in order, how state actually flows, whether the rendering strategy was chosen deliberately, where the component boundaries sit, and what the loading, empty and error states currently do — because those four areas are where inherited codebases most often hide the real cost of the next feature.",
    intro: [
      "Most React projects do not fail at the start — they fail around month four, when state that began as one useState is threaded through nine components and nobody remembers why. Taking over a codebase means finding that out before committing to a timeline, not after.",
      "This is the read I actually do — on a repo, a Figma file that was implemented against, and a conversation with whoever has been maintaining it — before I say what a piece of work will take.",
    ],
    sections: [
      {
        heading: "1. How does state actually flow",
        body: [
          "The question is not which state library is in use, it is whether state lives where the data changes or has drifted to wherever was convenient at the time. Prop-drilled state five components deep, or global state holding something only one screen needs, are both signs the boundaries were never revisited as the app grew.",
          "This matters because it predicts the cost of the next feature. A codebase with clear state boundaries lets a new feature slot in cleanly; one without them means every addition risks touching state nothing about the feature should have needed to know existed.",
        ],
      },
      {
        heading: "2. Was the rendering strategy chosen, or defaulted into",
        body: [
          "In a Next.js codebase specifically: is server rendering, static generation and client rendering applied deliberately per route based on what that route actually needs, or is everything client-rendered because that was the path of least resistance early on?",
          "An app that is client-rendered by default usually still works — it is just carrying cost it did not have to: worse initial load, weaker SEO on pages that should have been indexable, and a bundle bigger than the route needs. This is often fixable incrementally, route by route, rather than requiring a rewrite.",
        ],
      },
      {
        heading: "3. Where are the component boundaries actually drawn",
        body: [
          "Boundaries drawn where the data changes age well. Boundaries drawn where the layout happens to break — a component per visual section rather than per responsibility — tend to calcify: every small requirement change touches three components because none of them own the thing that is actually changing.",
          "I look for how much of the component tree would need to move for a plausible near-term feature request. If the honest answer is \"most of it,\" that is useful information regardless of what happens next — it means the first work item is probably structural, not the feature itself.",
        ],
      },
      {
        heading: "4. What happens in the states that are not the happy path",
        body: [
          "Loading, empty, error and partial states are usually where a codebase's real maturity shows, because they are the ones built last and tested least. A screen that only really works when the API returns quickly and correctly is a screen that has not been finished, whatever the happy-path demo suggests.",
          "This is also the fastest way to spot how forms and data fetching were built — React Hook Form or an equivalent with proper validation and recovery paths is a very different starting point from ad hoc state and a try/catch that only logs to the console.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you always recommend a rewrite?",
        a: "No — a rewrite is rarely the right call and I will say so when it is not. Most of what I find in an audit is fixable incrementally: restructuring state, adjusting rendering strategy route by route, redrawing component boundaries as new work touches them. A full rewrite gets proposed only when the audit genuinely shows the existing structure cannot carry the next phase of work.",
      },
      {
        q: "How long does this kind of audit take?",
        a: "For a codebase of normal size, a few hours of reading is usually enough to answer the four questions above well enough to scope real work — it is a targeted read, not a full line-by-line review. A very large or unusually tangled codebase takes longer, and I will say so before quoting a timeline.",
      },
      {
        q: "What if the codebase is actually fine?",
        a: "Then that is the finding, and it is a useful one — it means the next feature is just the next feature, not preceded by restructuring work. I am not incentivised to find problems that are not there; an honest audit sometimes ends with \"start building.\"",
      },
    ],
    relatedServiceSlug: "frontend-product-engineering",
    relatedCaseStudySlugs: ["verdira", "sunhub"],
    cta: {
      heading: "Inheriting a codebase you need a real read on?",
      body: "Send the repo, or describe the situation if it's private. I will tell you honestly what I would check first and what I think the real scope of the work is.",
      primaryLabel: "Discuss a frontend project",
    },
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export const insightSlugs = insights.map((i) => i.slug);

/** Hub page copy. */
export const insightsHub = {
  metaTitle: "Insights — React, Next.js & Migration Notes",
  metaDescription:
    "First-hand notes on React and Next.js engineering, WordPress migrations, performance and AI integration — written from production work, not general advice.",
  h1: "Insights",
  intro:
    "Problem-led notes from production work — migrations, performance, engineering judgment calls and AI integration. Each one opens with a direct answer, then the reasoning.",
} as const;

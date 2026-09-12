import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ArrowIcon } from "@/components/ui";
import { services } from "@/content/services";
import { caseStudies } from "@/content/work";

/**
 * A real 404.
 *
 * Next returns HTTP 404 for this route, which is the point: redirecting every
 * unknown path to the homepage produces a soft 404 — a page that says "not
 * found" while answering 200 — and search engines treat that as a quality
 * signal against the whole site.
 *
 * The page is also useful rather than apologetic. Someone who mistyped a URL
 * or followed a stale link from the previous site structure lands here, so it
 * offers the routes that actually exist instead of a dead end. It is
 * noindexed, since a 404 has nothing to be found for.
 */
export const metadata = {
 title: "Page not found",
 robots: { index: false, follow: true },
};

export default function NotFound() {
 return (
 <>
 <Nav />
 <main id="main">
 <section className="relative overflow-hidden border-b border-border">
 <span aria-hidden className="ds-grid-field pointer-events-none absolute inset-0" />
 <div className="ds-container relative py-20 md:py-28">
 <span className="ds-overline">404</span>
 <h1 className="ds-h1 mt-5 max-w-[20ch]">
 That page does not exist — but these do.
 </h1>
 <p className="ds-lede mt-6">
 The link may be stale. The site was restructured recently and a number of old
 service URLs now redirect; if you followed one that did not, this is where you
 end up.
 </p>
 <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
 <Link href="/" className="ds-btn ds-btn-primary">
 Go to the homepage
 <ArrowIcon />
 </Link>
 <Link href="/work" className="ds-btn ds-btn-secondary">
 View my work
 </Link>
 </div>
 </div>
 </section>

 <section className="ds-section">
 <div className="ds-container grid gap-12 md:grid-cols-2 md:gap-16">
 <div>
 <p className="ds-meta">Services</p>
 <ul className="mt-5 border-t border-border">
 {services.map((service) => (
 <li key={service.slug} className="border-b border-border">
 <Link
 href={`/services/${service.slug}`}
 className="flex items-center justify-between gap-4 py-3.5 text-[0.9375rem] text-ink-muted transition-colors hover:text-accent"
 >
 {service.title}
 <ArrowIcon className="h-3.5 w-3.5 shrink-0" />
 </Link>
 </li>
 ))}
 </ul>
 </div>

 <div>
 <p className="ds-meta">Case studies</p>
 <ul className="mt-5 border-t border-border">
 {caseStudies.map((project) => (
 <li key={project.slug} className="border-b border-border">
 <Link
 href={`/work/${project.slug}`}
 className="flex items-center justify-between gap-4 py-3.5 text-[0.9375rem] text-ink-muted transition-colors hover:text-accent"
 >
 {project.title}
 <ArrowIcon className="h-3.5 w-3.5 shrink-0" />
 </Link>
 </li>
 ))}
 <li className="border-b border-border">
 <Link
 href="/contact"
 className="flex items-center justify-between gap-4 py-3.5 text-[0.9375rem] text-ink-muted transition-colors hover:text-accent"
 >
 Discuss your project
 <ArrowIcon className="h-3.5 w-3.5 shrink-0" />
 </Link>
 </li>
 </ul>
 </div>
 </div>
 </section>
 </main>
 <Footer />
 </>
 );
}

import Link from "next/link";
import { serviceCategories } from "@/content/services";
import { sections, site, socials } from "@/content/site";
import { ArrowIcon } from "./ui";

/** Muted by default, primary on hover — a wall of blue reads as noise. */
const linkClass =
  "inline-flex min-h-8 items-center py-1 text-[0.9375rem] text-ink-muted transition-colors hover:text-primary";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="g-container py-10 md:py-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-12">
          {/* Identity + the one action worth repeating down here */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="-mx-2 inline-flex min-h-11 items-center rounded-full px-2">
              <span className="text-[1.375rem] leading-none font-medium tracking-[-0.01em] text-ink">
                <span className="text-primary">W</span>ahab
                <span className="text-g-red-strong">.</span>
              </span>
            </Link>
            <p className="g-body-sm mt-4 max-w-xs">
              {site.role} · {site.location}
            </p>

            <Link href="/contact" className="g-link mt-4">
              Start a project
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>

          {/* Two columns keeps this three rows tall instead of six */}
          <nav aria-label="Footer" className="col-span-2 md:col-span-4">
            <p className="g-title-sm text-ink">Navigate</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6">
              {sections.map((s) => (
                <li key={s.id}>
                  <Link href={s.href} className={linkClass}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/*
            Categories only, not all twelve services. The full list made this
            column thirteen rows tall and dragged the whole footer with it —
            every service is still one click away from its category page and
            listed in the sitemap.
          */}
          <nav aria-label="Services" className="md:col-span-2">
            <p className="g-title-sm text-ink">Services</p>
            <ul className="mt-3">
              {serviceCategories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/services/${c.slug}`} className={linkClass}>
                    {c.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className={linkClass}>
                  All services
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="g-title-sm text-ink">Elsewhere</p>
            <ul className="mt-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={linkClass}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-1 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="g-body-sm">
            © {year} {site.name}
          </p>
          <p className="g-body-sm">Built with Next.js and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

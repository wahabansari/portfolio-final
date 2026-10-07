"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContent, useLocaleHref } from "./locale-provider";

/**
 * Footer — one compact band.
 *
 * Studio identity left, the page links and the four services center, contact
 * right. Quiet: the page made its pitch already, this just keeps a buyer moving
 * and gives every service page a link from every page.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const localeHref = useLocaleHref();
  const pathname = usePathname();
  const { site } = useContent();

  const links = [
    { label: "Work", href: localeHref("/work") },
    { label: "Services", href: localeHref("/services") },
    { label: "Insights", href: localeHref("/insights") },
    { label: "About", href: localeHref("/about") },
    { label: "Contact", href: localeHref("/contact") },
  ];

  const serviceLinks = [
    { label: "Custom Web Development", href: "/services/custom-web-development" },
    { label: "Business Dashboards", href: "/services/business-dashboards" },
    { label: "Software Modernization", href: "/services/software-modernization" },
    { label: "AI Business Automation", href: "/services/ai-business-automation" },
  ];

  return (
    <footer className="border-t border-border bg-surface">
      <div className="ds-container py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Link
              href={localeHref("/")}
              className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-fg"
            >
              {site.shortName}
            </Link>
            <p className="ds-meta mt-2">{site.role}</p>
          </div>

          <div className="flex flex-col gap-4">
            <nav className="flex flex-wrap gap-x-7 gap-y-2" aria-label="Footer">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  data-track="footer_link"
                  data-track-label={link.label.toLowerCase()}
                  className={cnFooter(link, pathname)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer services">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={localeHref(link.href)}
                  data-track="footer_link"
                  data-track-label={link.href.split("/").pop()}
                  className={cnFooter({ label: link.label, href: localeHref(link.href) }, pathname)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <a
              href={`mailto:${site.email}`}
              data-track="email_click"
              data-track-label="footer"
              className="text-[0.9375rem] font-medium text-fg transition-colors duration-150 hover:text-accent"
            >
              {site.email}
            </a>
            <span className="ds-meta">
              {site.location} · {site.timezone.split(" ")[0]} · Remote
            </span>
            <span className="ds-meta">© {year} {site.name}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function cnFooter(link: { label: string; href: string }, pathname: string) {
  const active =
    pathname === link.href || pathname.startsWith(`${link.href}/`);
  return [
    "text-[0.9375rem] transition-colors duration-150",
    active ? "font-medium text-fg" : "text-fg-muted hover:text-fg",
  ].join(" ");
}
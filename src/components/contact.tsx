"use client";

import { useState } from "react";
import { site, socials } from "@/content/site";
import { ArrowIcon, ExternalIcon, Reveal, Section } from "./ui";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the email button beside this still works */
    }
  };

  return (
    <Section id="contact" tone="blue">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <p className="g-overline">Contact</p>
          <h1 className="g-display mt-4 max-w-xl">Let&apos;s build something together</h1>
          <p className="g-body-lg mt-5 max-w-xl">
            Two ways to work with me: hire me full-time, or bring me a project. I take on
            frontend and full-stack builds, AI automation, and performance work. Email is
            the fastest way to reach me — tell me what you&apos;re building and I&apos;ll
            reply with an approach and a price.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href={`mailto:${site.email}`} className="g-btn g-btn-filled">
              Send an email
              <ArrowIcon />
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="g-btn g-btn-outlined !border-border-strong"
            >
              {copied ? "Copied" : "Copy address"}
            </button>
          </div>

          <a
            href={`mailto:${site.email}`}
            className="g-link mt-8 block !text-[1.0625rem] break-all"
          >
            {site.email}
          </a>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-5">
          <div className="g-card-plain p-7 md:p-8">
            <h3 className="g-title-sm">Elsewhere</h3>
            <ul className="mt-5">
              {socials
                .filter((s) => s.href.startsWith("http"))
                .map((s) => (
                  <li key={s.label} className="border-b border-border last:border-b-0">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-14 items-center justify-between gap-4 py-3"
                    >
                      <span>
                        <span className="block text-[0.9375rem] font-medium text-ink">
                          {s.label}
                        </span>
                        <span className="g-body-sm block">{s.handle}</span>
                      </span>
                      <ExternalIcon className="shrink-0 text-ink-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </li>
                ))}
            </ul>

            <div className="mt-6 border-t border-border pt-6">
              <p className="text-[0.9375rem] font-medium text-ink">{site.location}</p>
              <p className="g-body-sm mt-0.5">Open to remote</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

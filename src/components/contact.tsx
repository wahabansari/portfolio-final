"use client";

import { useState } from "react";
import { services } from "@/content/services";
import { site, socials } from "@/content/site";
import { ArrowIcon, ExternalIcon, Reveal, Section } from "./ui";

/* Routing options. The five services plus the two non-service paths the site
   has to serve — a hiring conversation and everything else. */
const INTENTS = [
  ...services.map((s) => s.title),
  "A full-time role",
  "Something else",
];

/**
 * The brief form.
 *
 * There is no backend behind this site, and rather than pretend otherwise the
 * form composes the brief and hands it to the visitor's mail client. That is
 * an honest mechanism: nothing is silently dropped, the sender keeps a copy in
 * their sent folder, and there is no third-party form service holding other
 * people's project details.
 *
 * Every path has a fallback. If the mail client does not open, the composed
 * brief can be copied to the clipboard; if the clipboard is blocked, the
 * address is on the page as plain selectable text.
 */
export function ContactForm() {
  const [intent, setIntent] = useState(INTENTS[0]);
  const [copied, setCopied] = useState(false);
  const [handedOff, setHandedOff] = useState(false);

  const compose = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const lines = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      get("company") && `Company / product: ${get("company")}`,
      `Needs help with: ${get("intent")}`,
      get("url") && `Current site / Figma / product: ${get("url")}`,
      "",
      "Brief:",
      get("brief"),
    ].filter(Boolean);

    return {
      subject: `Project enquiry — ${get("intent")}`,
      body: lines.join("\n"),
    };
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { subject, body } = compose(e.currentTarget);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setHandedOff(true);
  };

  const onCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form;
    if (!form) return;
    const { body } = compose(form);
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* clipboard blocked — the address below is selectable text */
    }
  };

  return (
    <form onSubmit={onSubmit} className="ds-card p-7 md:p-9">
      <p className="ds-meta">Project brief</p>
      <p className="ds-body-sm mt-2">
        Six fields. It opens in your mail client so nothing is stored anywhere but your inbox
        and mine.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-[0.8125rem] font-medium text-ink">
            Name <span className="text-accent">*</span>
          </span>
          <input name="name" required autoComplete="name" className="ds-field" placeholder="Your name" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[0.8125rem] font-medium text-ink">
            Work email <span className="text-accent">*</span>
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="ds-field"
            placeholder="you@company.com"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[0.8125rem] font-medium text-ink">Company / product</span>
          <input name="company" autoComplete="organization" className="ds-field" placeholder="Optional" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[0.8125rem] font-medium text-ink">
            What do you need help with? <span className="text-accent">*</span>
          </span>
          <select
            name="intent"
            required
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            className="ds-field appearance-none"
          >
            {INTENTS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-[0.8125rem] font-medium text-ink">
            Current site, Figma or product URL
          </span>
          <input
            name="url"
            type="url"
            className="ds-field"
            placeholder="https:// — optional, but it is the fastest context you can give me"
          />
        </label>

        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-[0.8125rem] font-medium text-ink">
            The brief <span className="text-accent">*</span>
          </span>
          <textarea
            name="brief"
            required
            rows={5}
            className="ds-field resize-y"
            placeholder="What you are building, what is in the way, and roughly when you need it. Budget and timeline only if you are comfortable sharing them."
          />
        </label>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="ds-btn ds-btn-primary">
          Send the brief
          <ArrowIcon />
        </button>
        <button type="button" onClick={onCopy} className="ds-btn ds-btn-secondary">
          {copied ? "Copied to clipboard" : "Copy it instead"}
        </button>
      </div>

      {handedOff && (
        <p className="ds-body-sm mt-5" role="status">
          Your mail client should have opened with the brief filled in. If it did not, use
          &ldquo;Copy it instead&rdquo; and send it to{" "}
          <a href={`mailto:${site.email}`} className="text-accent hover:underline">
            {site.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}

/**
 * The contact section. Form on the left, the direct paths on the right — a
 * form is the lowest-friction option for some people and the highest for
 * others, so the plain email address is never more than one glance away.
 */
export function Contact({
  tone = "plain",
  heading = "Tell me what you are building",
  body = "Share the current site, a Figma file, a product idea, or a short description of the problem. I will use that context to suggest the most practical next step — including telling you if I am not the right person for it.",
  level = "h2",
}: {
  tone?: "plain" | "soft" | "deep";
  heading?: string;
  body?: string;
  level?: "h1" | "h2";
}) {
  const Heading = level;

  return (
    <Section id="contact" tone={tone}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-7">
          <span className="ds-overline">Contact</span>
          <Heading className={level === "h1" ? "ds-h1 mt-5" : "ds-h2 mt-5"}>{heading}</Heading>
          <p className="ds-lede ds-measure mt-6">{body}</p>
          <div className="mt-9">
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="ds-card p-7 md:p-8">
              <p className="ds-meta">Direct</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 block font-display text-[1.0625rem] font-medium break-all text-accent hover:underline"
              >
                {site.email}
              </a>
              <p className="ds-body-sm mt-3">
                Prefer to skip the form? Email works just as well — the brief above is only a
                prompt for what is useful to include.
              </p>

              <ul className="mt-7 border-t border-border">
                {socials
                  .filter((s) => s.href.startsWith("http"))
                  .map((s) => (
                    <li key={s.label} className="border-b border-border">
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
                          <span className="ds-body-sm block">{s.handle}</span>
                        </span>
                        <ExternalIcon className="shrink-0 text-ink-soft transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </li>
                  ))}
              </ul>

              <dl className="mt-7 grid grid-cols-2 gap-6 border-t border-border pt-7">
                <div>
                  <dt className="ds-meta">Based in</dt>
                  <dd className="mt-1.5 text-[0.9375rem] font-medium text-ink">{site.location}</dd>
                </div>
                <div>
                  <dt className="ds-meta">Timezone</dt>
                  <dd className="mt-1.5 text-[0.9375rem] font-medium text-ink">{site.timezone}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

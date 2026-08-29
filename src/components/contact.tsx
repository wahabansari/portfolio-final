"use client";

import { useEffect, useId, useRef, useState } from "react";
import { services } from "@/content/services";
import { site, socials } from "@/content/site";
import { track } from "@/lib/analytics";
import { ArrowIcon, CheckIcon, ExternalIcon, Reveal, Section } from "./ui";
import { cn } from "@/lib/cn";

/* The five services plus the two paths that are not a service — a hiring
   conversation, and the honest "I do not know yet". Forcing a buyer to
   classify their own problem before they have described it loses leads. */
const PROJECT_TYPES = [
  ...services.map((s) => s.title),
  "A full-time role",
  "Not sure yet",
];

const TIMELINES = [
  "As soon as possible",
  "Within a month",
  "One to three months",
  "Later this year",
  "Still deciding",
];

const BUDGETS = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Not sure yet",
  "Prefer not to say",
];

type Fields = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  url: string;
  timeline: string;
  budget: string;
  brief: string;
};

const EMPTY: Fields = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  url: "",
  timeline: "",
  budget: "",
  brief: "",
};

/* Deliberately permissive. The job of this check is to catch a typo, not to
   adjudicate RFC 5322 — a validator that rejects a real address costs far
   more than one that lets a fake one through to a mail client. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Fields): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {};

  if (!values.name.trim()) errors.name = "Enter your name so I know who I am replying to.";

  if (!values.email.trim()) errors.email = "Enter an email address so I can reply.";
  else if (!EMAIL.test(values.email.trim()))
    errors.email = "That does not look like an email address — check for a typo.";

  if (!values.projectType) errors.projectType = "Pick the closest option, or “Not sure yet”.";

  if (!values.brief.trim()) errors.brief = "Tell me what you are building, even briefly.";
  else if (values.brief.trim().length < 20)
    errors.brief = "A little more detail will get you a much more useful reply.";

  return errors;
}

/* Defined at module scope, not inside the form.
 *
 * A component created during render is a new type on every render, so React
 * unmounts and remounts it each time — which, for a label wrapping an input,
 * means focus is lost on every keystroke. This is the bug the
 * react-hooks/static-components rule exists to catch. */
function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="text-[0.8125rem] font-medium text-ink">
      {children}
      {required && (
        <>
          {" "}
          <span className="text-accent" aria-hidden>
            *
          </span>
          <span className="sr-only">(required)</span>
        </>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-[0.8125rem] text-warn">
      {message}
    </p>
  );
}

/**
 * The project brief form.
 *
 * There is no backend behind this site, and rather than pretend otherwise the
 * form composes the brief and hands it to the visitor's own mail client. That
 * is an honest mechanism: nothing is silently dropped, the sender keeps a copy
 * in their sent folder, and no third-party form service ends up holding other
 * people's project details.
 *
 * The limits of that are worth stating plainly. Validation here is a usability
 * feature, not a security boundary — there is no server to validate on, and no
 * spam control beyond what a mail client imposes. If this ever moves to a real
 * endpoint, every rule in `validate` has to be repeated server-side.
 *
 * Every path has a fallback: if the mail client does not open, the composed
 * brief can be copied; if the clipboard is blocked, the address is on the page
 * as plain selectable text.
 */
export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  /* Errors appear on submit, then update live. Validating a field the moment
     it is focused and left empty scolds people for tabbing through. */
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const startedRef = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  /* Bumped on every failed submit, including a repeat one. Focus has to move
     again when someone submits a still-invalid form a second time, and the
     error list alone may be identical between the two attempts. */
  const [failedAt, setFailedAt] = useState(0);

  /* The summary does not exist in the DOM at the moment submit runs — it is
     rendered by the state update that submit triggers. Focusing it from the
     handler therefore hits a null ref and silently does nothing, which is
     exactly the failure this effect exists to avoid. */
  useEffect(() => {
    if (failedAt > 0) summaryRef.current?.focus();
  }, [failedAt]);

  const set = (field: keyof Fields) => (value: string) => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("contact_start");
    }
    setValues((v) => {
      const next = { ...v, [field]: value };
      if (submitted) setErrors(validate(next));
      return next;
    });
  };

  const compose = () => {
    const lines = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      values.company.trim() && `Company / product: ${values.company.trim()}`,
      `Project type: ${values.projectType}`,
      values.url.trim() && `Current site / Figma / product: ${values.url.trim()}`,
      values.timeline && `Timeline: ${values.timeline}`,
      values.budget && `Budget: ${values.budget}`,
      "",
      "Brief:",
      values.brief.trim(),
    ].filter(Boolean);

    return {
      subject: `Project brief — ${values.projectType}`,
      body: lines.join("\n"),
    };
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      /* Focus moves to the summary rather than the first bad field, so a
         screen reader user gets the count and the full list before being
         dropped into an input with no context. The effect above does the
         actual focusing, once the summary has rendered. */
      setFailedAt((n) => n + 1);
      return;
    }

    /* Duplicate guard. A second mailto: while the first is still opening does
       nothing useful and produces two draft windows. */
    if (sent) return;

    const { subject, body } = compose();
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    track("contact_submit", { project_type: values.projectType });
    setSent(true);
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(compose().body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* clipboard blocked — the address below is selectable text */
    }
  };

  const errorList = Object.entries(errors);
  const fieldProps = (field: keyof Fields, required = false) => ({
    id: `${id}-${field}`,
    name: field,
    value: values[field],
    required,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${id}-${field}-error` : undefined,
    className: cn("ds-field", errors[field] && "ds-field-invalid"),
  });

  return (
    <form onSubmit={onSubmit} noValidate className="ds-card p-7 md:p-9">
      <p className="ds-meta">Project brief</p>
      <p className="ds-body-sm mt-2">
        It opens in your own mail client, so nothing is stored anywhere but your sent folder
        and my inbox. No form service, no tracking, no third party in between.
      </p>

      {/* Error summary. Focusable so submit can move focus here, and announced
          because it appears after the user acts. */}
      {submitted && errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 rounded-[var(--radius-sm)] border border-warn/40 bg-warn/5 p-4"
        >
          <p className="text-[0.875rem] font-medium text-warn">
            {errorList.length === 1
              ? "One field needs attention"
              : `${errorList.length} fields need attention`}
          </p>
          <ul className="mt-2 space-y-1">
            {errorList.map(([field, message]) => (
              <li key={field}>
                <a href={`#${id}-${field}`} className="text-[0.8125rem] text-warn underline">
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <FieldLabel htmlFor={`${id}-name`} required>
            Name
          </FieldLabel>
          <input
            {...fieldProps("name", true)}
            autoComplete="name"
            placeholder="Your name"
            onChange={(e) => set("name")(e.target.value)}
          />
          <FieldError id={`${id}-name-error`} message={errors.name} />
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel htmlFor={`${id}-email`} required>
            Work email
          </FieldLabel>
          <input
            {...fieldProps("email", true)}
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            onChange={(e) => set("email")(e.target.value)}
          />
          <FieldError id={`${id}-email-error`} message={errors.email} />
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel htmlFor={`${id}-company`}>Company / product</FieldLabel>
          <input
            {...fieldProps("company")}
            autoComplete="organization"
            placeholder="Optional"
            onChange={(e) => set("company")(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel htmlFor={`${id}-projectType`} required>
            Project type
          </FieldLabel>
          <select
            {...fieldProps("projectType", true)}
            onChange={(e) => set("projectType")(e.target.value)}
          >
            <option value="">Choose the closest fit…</option>
            {PROJECT_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError id={`${id}-projectType-error`} message={errors.projectType} />
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <FieldLabel htmlFor={`${id}-url`}>Current site, Figma or product URL</FieldLabel>
          <input
            {...fieldProps("url")}
            type="url"
            inputMode="url"
            placeholder="https:// — optional, but the fastest context you can give me"
            onChange={(e) => set("url")(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel htmlFor={`${id}-timeline`}>Timeline</FieldLabel>
          <select {...fieldProps("timeline")} onChange={(e) => set("timeline")(e.target.value)}>
            <option value="">Optional</option>
            {TIMELINES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel htmlFor={`${id}-budget`}>Budget range</FieldLabel>
          <select {...fieldProps("budget")} onChange={(e) => set("budget")(e.target.value)}>
            <option value="">Optional</option>
            {BUDGETS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <FieldLabel htmlFor={`${id}-brief`} required>
            The brief
          </FieldLabel>
          <textarea
            {...fieldProps("brief", true)}
            rows={5}
            placeholder="What you are building, what is in the way, and roughly when you need it."
            onChange={(e) => set("brief")(e.target.value)}
            className={cn(fieldProps("brief").className, "resize-y")}
          />
          <FieldError id={`${id}-brief-error`} message={errors.brief} />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="ds-btn ds-btn-primary" disabled={sent}>
          {sent ? (
            <>
              <CheckIcon />
              Brief handed to your mail app
            </>
          ) : (
            <>
              Send project brief
              <ArrowIcon />
            </>
          )}
        </button>
        <button type="button" onClick={onCopy} className="ds-btn ds-btn-secondary">
          {copied ? "Copied to clipboard" : "Copy it instead"}
        </button>
      </div>

      {sent && (
        <div role="status" className="mt-6 rounded-[var(--radius-sm)] border border-border bg-surface p-5">
          <p className="text-[0.9375rem] font-medium text-ink">
            Your mail client should have opened with the brief filled in.
          </p>
          <p className="ds-body-sm mt-2">
            Nothing has been sent until you press send there. If it did not open, use{" "}
            <span className="font-medium text-ink">Copy it instead</span> and email{" "}
            <a href={`mailto:${site.email}`} className="text-accent hover:underline">
              {site.email}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="ds-link mt-4"
          >
            Edit the brief and try again
          </button>
        </div>
      )}
    </form>
  );
}

/**
 * The contact section. Form on the left, direct paths on the right — a form is
 * the lowest-friction option for some people and the highest for others, so
 * the plain email address is never more than one glance away.
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
                Prefer to skip the form? Email works just as well — the fields are only a
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

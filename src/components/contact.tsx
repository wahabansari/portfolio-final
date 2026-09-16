"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Form } from "radix-ui";
import { services } from "@/content/services";
import { contactSteps, site, socials } from "@/content/site";
import { track } from "@/lib/analytics";
import { ArrowIcon, CheckIcon, ExternalIcon, Reveal, Section } from "./ui";
import { cn } from "@/lib/cn";
import { SelectField } from "@/components/ds/select";

/* Every service plus the two paths that are not a service — a hiring
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

/** The project brief form.
 * The project brief form.
 *
 * Submissions POST to /api/contact, which delivers the brief and answers with
 * a real result — which is the point. A `mailto:` hand-off cannot tell anyone
 * whether a message was sent, only that a compose window was requested, and a
 * conversion metric built on that measures intention rather than delivery.
 *
 * Validation appears twice on purpose. The rules here are a usability feature:
 * they catch a typo before a round-trip and put the message next to the field.
 * The identical rules in the route handler are the ones that actually hold,
 * because anything can POST to an endpoint.
 *
 * Every path still ends somewhere useful. If delivery is not configured the
 * server says so and the brief goes to the visitor's mail client instead; if
 * the request fails outright the composed text can be copied; if the clipboard
 * is blocked the address is on the page as plain selectable text. The one
 * thing that never happens is a visitor believing a message was sent when it
 * was not.
 */
export function ContactForm() {
 const id = useId();
 const formRef = useRef<HTMLFormElement>(null);
 const [values, setValues] = useState<Fields>(EMPTY);
 const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
 /* Errors appear on submit, then update live. Validating a field the moment
 it is focused and left empty scolds people for tabbing through. */
 const [submitted, setSubmitted] = useState(false);
 /**
 * The four terminal states of a submission, kept apart because they are
 * genuinely different things to tell someone: delivered and confirmed;
 * handed to their mail client because the server has no delivery configured;
 * failed; or not yet attempted. A single boolean would have to claim one of
 * the first three was the others.
 */
 const [sent, setSent] = useState<"idle" | "sent" | "handed-off" | "failed">("idle");
 const [sending, setSending] = useState(false);
 const [copied, setCopied] = useState(false);
 /* Honeypot. Hidden from people, irresistible to bots, and never rendered
 visibly — see the field at the foot of the form. */
 const [honeypot, setHoneypot] = useState("");
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
 track("contact_form_start");
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

 /** Hands the composed brief to the visitor's mail client. */
 const openMailClient = () => {
 const { subject, body } = compose();
 window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
 subject,
 )}&body=${encodeURIComponent(body)}`;
 };

 const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

 /* Duplicate guard — a second submit while the first is in flight produces
 either two emails or two draft windows, and neither helps anyone. */
 if (sending || sent === "sent" || sent === "handed-off") return;

 setSending(true);
 track("contact_form_submit", { project_type: values.projectType });

 try {
 const response = await fetch("/api/contact", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ ...values, website: honeypot }),
 });

 if (response.ok) {
 /* The only path where delivery is actually confirmed, so the only
 path where the key event represents a real lead rather than an
 intention to send one. */
 track("generate_lead", { project_type: values.projectType });
 setSent("sent");
 return;
 }

 /* 501 means the server is fine but has no delivery configured. That is
 a deployment state, not a visitor's problem — hand the brief to their
 mail client instead of showing them an error they cannot act on. */
 if (response.status === 501) {
 openMailClient();
 setSent("handed-off");
 return;
 }

 const data = (await response.json().catch(() => null)) as
 | { errors?: Partial<Record<keyof Fields, string>> }
 | null;

 if (data?.errors) {
 setErrors(data.errors);
 setFailedAt((n) => n + 1);
 return;
 }

 setSent("failed");
 } catch {
 /* Offline, or the request never left the browser. The mail client is
 still reachable, so offer that rather than a dead end. */
 setSent("failed");
 } finally {
 setSending(false);
 }
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
 /* Radix wires the label → control association and the error description
 through its own generated ids, so the summary cannot anchor to a known
 id. Focusing by field name keeps the "jump to what needs attention"
 behaviour without depending on that internal id. */
 const fieldProps = (field: keyof Fields, required = false) => ({
 name: field,
 value: values[field],
 required,
 "aria-invalid": errors[field] ? true : undefined,
 className: cn("ds-field", errors[field] && "ds-field-invalid"),
 });
 const focusField = (field: string) => {
 formRef.current
 ?.querySelector<HTMLElement>(`[data-field="${field}"], [name="${field}"]`)
 ?.focus();
 };

 /* Field markup is the same shape for every input type: Radix Form.Label
 owns the accessible label and Form.Control the control itself, with the
 error surfaced through Form.Message gated by the errors state that the
 single validate() function above already produces. */
 const labelClass = "text-[0.8125rem] font-medium text-ink";
 const requiredMark = (
 <>
 <span className="text-accent" aria-hidden>
 *
 </span>
 <span className="sr-only">(required)</span>
 </>
 );
 const message = (field: keyof Fields) =>
 errors[field] && (
 <Form.Message className="text-[0.8125rem] text-warn">{errors[field]}</Form.Message>
 );

 return (
 <Form.Root noValidate ref={formRef} onSubmit={onSubmit} className="relative mt-9 md:mt-10">
 <p className="ds-meta">Project brief</p>
 <p className="ds-body-sm mt-2">
 This goes straight to my inbox. Only what you type here is sent — no account, no
 newsletter, and nothing shared with anyone else.
 </p>

 {/* Error summary. Focusable so submit can move focus here, and announced
 because it appears after the user acts. */}
 {submitted && errorList.length > 0 && (
 <div
 ref={summaryRef}
 tabIndex={-1}
 role="alert"
 className="mt-7 rounded-[var(--radius-sm)] border border-warn/40 bg-warn/5 p-4"
 >
 <p className="text-[0.875rem] font-medium text-warn">
 {errorList.length === 1
 ? "One field needs attention"
 : `${errorList.length} fields need attention`}
 </p>
 <ul className="mt-2 space-y-1">
 {errorList.map(([field, fieldError]) => (
 <li key={field}>
 <button
 type="button"
 onClick={() => focusField(field)}
 className="text-[0.8125rem] text-warn underline"
 >
 {fieldError}
 </button>
 </li>
 ))}
 </ul>
 </div>
 )}

 <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
 <Form.Field
 name="name"
 serverInvalid={Boolean(errors.name)}
 className="flex flex-col gap-2"
 >
 <Form.Label className={labelClass}>
 Name {requiredMark}
 </Form.Label>
 <Form.Control asChild>
 <input
 {...fieldProps("name", true)}
 autoComplete="name"
 placeholder="Your name"
 onChange={(e) => set("name")(e.target.value)}
 />
 </Form.Control>
 {message("name")}
 </Form.Field>

 <Form.Field
 name="email"
 serverInvalid={Boolean(errors.email)}
 className="flex flex-col gap-2"
 >
 <Form.Label className={labelClass}>
 Work email {requiredMark}
 </Form.Label>
 <Form.Control asChild>
 <input
 {...fieldProps("email", true)}
 type="email"
 autoComplete="email"
 placeholder="you@company.com"
 onChange={(e) => set("email")(e.target.value)}
 />
 </Form.Control>
 {message("email")}
 </Form.Field>

 <Form.Field
 name="company"
 serverInvalid={Boolean(errors.company)}
 className="flex flex-col gap-2"
 >
 <Form.Label className={labelClass}>Company / product</Form.Label>
 <Form.Control asChild>
 <input
 {...fieldProps("company")}
 autoComplete="organization"
 placeholder="Optional"
 onChange={(e) => set("company")(e.target.value)}
 />
 </Form.Control>
 </Form.Field>

 <Form.Field
 name="projectType"
 serverInvalid={Boolean(errors.projectType)}
 className="flex flex-col gap-2"
 >
 <label className={cn(labelClass)} htmlFor={`${id}-projectType`}>
 Project type {requiredMark}
 </label>
 <SelectField
 id={`${id}-projectType`}
 name="projectType"
 value={values.projectType}
 onValueChange={(v) => set("projectType")(v)}
 placeholder="Choose the closest fit…"
 options={PROJECT_TYPES.map((s) => ({ value: s, label: s }))}
 invalid={Boolean(errors.projectType)}
 />
 {message("projectType")}
 </Form.Field>

 <Form.Field
 name="url"
 serverInvalid={Boolean(errors.url)}
 className="flex flex-col gap-2 sm:col-span-2"
 >
 <Form.Label className={labelClass}>Current site, Figma or product URL</Form.Label>
 <Form.Control asChild>
 <input
 {...fieldProps("url")}
 type="url"
 inputMode="url"
 placeholder="https:// — optional, but the fastest context you can give me"
 onChange={(e) => set("url")(e.target.value)}
 />
 </Form.Control>
 </Form.Field>

 <Form.Field
 name="timeline"
 serverInvalid={Boolean(errors.timeline)}
 className="flex flex-col gap-2"
 >
 <label className={cn(labelClass)} htmlFor={`${id}-timeline`}>
 Timeline
 </label>
 <SelectField
 id={`${id}-timeline`}
 name="timeline"
 value={values.timeline}
 onValueChange={(v) => set("timeline")(v)}
 placeholder="Optional"
 options={TIMELINES.map((s) => ({ value: s, label: s }))}
 invalid={Boolean(errors.timeline)}
 />
 </Form.Field>

 <Form.Field
 name="budget"
 serverInvalid={Boolean(errors.budget)}
 className="flex flex-col gap-2"
 >
 <label className={cn(labelClass)} htmlFor={`${id}-budget`}>
 Budget range
 </label>
 <SelectField
 id={`${id}-budget`}
 name="budget"
 value={values.budget}
 onValueChange={(v) => set("budget")(v)}
 placeholder="Optional"
 options={BUDGETS.map((s) => ({ value: s, label: s }))}
 invalid={Boolean(errors.budget)}
 />
 </Form.Field>

 <Form.Field
 name="brief"
 serverInvalid={Boolean(errors.brief)}
 className="flex flex-col gap-2 sm:col-span-2"
 >
 <Form.Label className={labelClass}>
 The brief {requiredMark}
 </Form.Label>
 <Form.Control asChild>
 <textarea
 {...fieldProps("brief", true)}
 rows={5}
 placeholder="What you are building, what is in the way, and roughly when you need it."
 onChange={(e) => set("brief")(e.target.value)}
 className={cn(fieldProps("brief").className, "resize-y")}
 />
 </Form.Control>
 {message("brief")}
 </Form.Field>
 </div>

 {/* Honeypot. Hidden from people in every way that matters — off-screen,
 aria-hidden, and out of the tab order — but present in the DOM, which
 is all a form-filling bot inspects. Anything typed here is treated as
 automated and silently discarded server-side.

 Deliberately not `display: none`: some bots skip those. */}
 <div
 aria-hidden
 className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
 >
 <label htmlFor={`${id}-website`}>Website</label>
 <input
 id={`${id}-website`}
 name="website"
 type="text"
 tabIndex={-1}
 autoComplete="off"
 value={honeypot}
 onChange={(e) => setHoneypot(e.target.value)}
 />
 </div>

 <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
 <button
 type="submit"
 className="ds-btn ds-btn-primary"
 disabled={sending || sent === "sent" || sent === "handed-off"}
 >
 {sending ? (
 "Sending…"
 ) : sent === "sent" || sent === "handed-off" ? (
 <>
 <CheckIcon />
 Brief sent
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

 {/* One region for every terminal state, so a screen reader hears the
 outcome once rather than hearing three panels appear and disappear. */}
 {sent !== "idle" && (
 <div
 role="status"
 className={cn(
 "mt-7 rounded-[var(--radius-md)] border p-5",
 sent === "failed" ? "border-warn/40 bg-warn/5" : "border-border bg-surface",
 )}
 >
 {sent === "sent" && (
 <>
 <p className="text-[0.9375rem] font-semibold text-ink">
 Sent — it is in my inbox.
 </p>
 <p className="ds-body-sm mt-2">
 I will read the brief and reply with what I would tackle first and what I would
 need to estimate it. If anything was missing, just reply to that email.
 </p>
 </>
 )}

 {sent === "handed-off" && (
 <>
 <p className="text-[0.9375rem] font-semibold text-ink">
 Your mail client should have opened with the brief filled in.
 </p>
 <p className="ds-body-sm mt-2">
 Nothing is sent until you press send there. If it did not open, use{" "}
 <span className="font-medium text-ink">Copy it instead</span> and email{" "}
 <a href={`mailto:${site.email}`} className="text-accent hover:underline">
 {site.email}
 </a>
 .
 </p>
 </>
 )}

 {sent === "failed" && (
 <>
 <p className="text-[0.9375rem] font-semibold text-warn">
 That did not go through.
 </p>
 <p className="ds-body-sm mt-2">
 Something on my end failed rather than anything you did. Use{" "}
 <span className="font-medium text-ink">Copy it instead</span> and send it to{" "}
 <a href={`mailto:${site.email}`} className="text-accent hover:underline">
 {site.email}
 </a>{" "}
 — it reaches exactly the same place.
 </p>
 </>
 )}

 {sent !== "sent" && (
 <button type="button" onClick={() => setSent("idle")} className="ds-link mt-4">
 Edit the brief and try again
 </button>
 )}
 </div>
 )}
 </Form.Root>
 );
}

/**
 * The contact section. Form on the left, direct paths on the right — a form is
 * the lowest-friction option for some people and the highest for others, so
 * the plain email address is never more than one glance away.
 */
export function Contact({
 tone = "plain",
 heading = "Tell me what you're building, or what's getting in the way",
 body = "Send your current site, a Figma file, a repository, API notes or a short description of the problem. I'll review it and tell you what I would tackle first — including telling you if I am not the right person for it.",
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
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-4">
              <span className="ds-overline-accent">Contact</span>
              {site.available && (
                <span className="ds-chip ds-chip-success !py-1">
                  <span className="ds-dot" aria-hidden />
                  {site.availabilityNote}
                </span>
              )}
            </div>
            <Heading className={level === "h1" ? "ds-h1 mt-5" : "ds-h2 mt-5"}>{heading}</Heading>
            <p className="ds-body-lg mt-6">{body}</p>
          </div>
          <div className="mt-10 rounded-lg border border-border bg-surface p-6 md:p-8">
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-5">
          <div className="overflow-hidden rounded-lg border border-border bg-surface lg:sticky lg:top-28">
            {/* What happens next, before anyone fills anything in. The friction
               in a contact form is rarely the fields — it is not knowing what
               the reply will be, or whether sending one commits you to a
               sales call. */}
            <div className="p-6 md:p-8">
              <p className="ds-meta">What happens next</p>
              <ol className="mt-5 space-y-5">
                {contactSteps.map((item, i) => (
                  <li key={item.step} className="flex gap-4">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[0.8125rem] font-semibold tabular-nums text-accent"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-[0.9375rem] font-medium text-ink">
                        {item.step}
                      </span>
                      <span className="ds-body-sm mt-1 block">{item.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-border bg-surface-hover/50 p-6 md:p-8">
              <p className="ds-meta">Direct</p>
              <a
                href={`mailto:${site.email}`}
                data-track="email_click"
                data-track-label="contact-panel"
                className="mt-4 block font-display text-[1.125rem] font-semibold break-all text-accent hover:underline"
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
                          <span className="ds-body-sm block">{s.handle}</span>
                        </span>
                        <ExternalIcon className="shrink-0 text-ink-soft transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </li>
                  ))}
              </ul>

              <dl className="mt-7 grid grid-cols-2 gap-6 border-t border-border pt-6">
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

/**
 * ContactCTA — the homepage contact anchor.
 *
 * Rendered on the deep accent-tinted band: display statement, large
 * email link, availability chip. One conversion path, one color focus.
 *
 * The deep band is dark in both themes, but .ds-overline-accent/.display/
 * .body-large resolve to each theme's own ink colour — correct everywhere
 * else, wrong here, since light mode's ink is near-black. --color-deep-text
 * exists for exactly this (always white, in both themes); text-white/80
 * for the subhead keeps a hierarchy step under the fully-white heading
 * while staying well clear of AA at this size (contrast computed against
 * both themes' --color-deep, not assumed).
 */
export function ContactCTA({ tone = "deep" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="contact" tone={tone}>
      <div className="max-w-3xl">
          <span className="ds-overline mb-4 block text-deep-text">Contact</span>
          <h2 className="display text-deep-text">
            Have a product that needs a stronger frontend?
          </h2>
          <p className="body-large mt-8 max-w-xl text-white/80">
            Tell me what you&apos;re building, what needs to change, and where you
            need help.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <a href="/contact" className="ds-btn ds-btn-primary">
            Start a project
            <span aria-hidden>→</span>
          </a>
          <a
            href={`mailto:${site.email}`}
            data-track="email_click"
            data-track-label="home-contact"
            className="ds-btn inline-flex items-center justify-center rounded-[var(--radius-md)] bg-white px-7 py-3.5 text-[0.9375rem] font-semibold text-[#211a6e] transition-all duration-150 hover:scale-[1.02] hover:bg-white/90"
          >
            Email me
          </a>
        </div>

        {site.available && (
          <span className="ds-chip ds-chip-success mt-8 self-start">
            <span className="ds-dot" aria-hidden />
            {site.availabilityNote}
          </span>
        )}
    </Section>
  );
}

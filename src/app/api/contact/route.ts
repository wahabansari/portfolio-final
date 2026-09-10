import { site } from "@/content/site";

/**
 * Project brief submissions.
 *
 * A server-side endpoint rather than a `mailto:` hand-off, because the mail
 * client route cannot tell you whether anything was actually sent — it reports
 * that a draft window opened. That is a real gap when the conversion event on
 * this site is supposed to represent a lead: `generate_lead` firing on "a
 * compose window probably appeared" measures intent, not delivery.
 *
 * Delivery goes through Resend's REST API. No SDK: it is one authenticated
 * POST, and a dependency for that would be a dependency to keep patched
 * forever in exchange for nothing.
 *
 * When `RESEND_API_KEY` is absent — local development, previews, or before the
 * provider is set up — this returns 501 and the form falls back to the mail
 * client. That is a genuine degradation path rather than a stub: the visitor
 * can always reach the inbox, and the only thing lost is delivery
 * confirmation.
 *
 * Validation is repeated here in full. The client-side rules in
 * components/contact.tsx are a usability feature and nothing more; anything
 * can POST to this route, so this is where the rules actually have to hold.
 */

export const runtime = "nodejs";

const MAX = { name: 120, email: 200, company: 160, url: 500, brief: 5000 } as const;

/* Deliberately permissive. The job is catching a typo, not adjudicating
   RFC 5322 — a validator that rejects a real address costs far more than one
   that lets a fake one through to an inbox. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Body = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  projectType?: unknown;
  url?: unknown;
  timeline?: unknown;
  budget?: unknown;
  brief?: unknown;
  /* Honeypot. A real person never sees this field, so anything in it is a
     bot — answered with a 200 so the sender learns nothing from the
     difference between acceptance and rejection. */
  website?: unknown;
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  if (str(body.website, 100)) return Response.json({ ok: true }, { status: 200 });

  const name = str(body.name, MAX.name);
  const email = str(body.email, MAX.email);
  const company = str(body.company, MAX.company);
  const projectType = str(body.projectType, 120);
  const url = str(body.url, MAX.url);
  const timeline = str(body.timeline, 60);
  const budget = str(body.budget, 60);
  const brief = str(body.brief, MAX.brief);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Enter your name so I know who I am replying to.";
  if (!email) errors.email = "Enter an email address so I can reply.";
  else if (!EMAIL.test(email)) errors.email = "That does not look like an email address.";
  if (!projectType) errors.projectType = "Pick the closest option.";
  if (brief.length < 20) errors.brief = "Tell me a little more about what you are building.";

  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    /* 501, not 500: the request was fine, the server simply has no delivery
       configured. The client reads this specific status as "fall back to the
       mail client" rather than as a failure to report to the visitor. */
    return Response.json({ error: "Delivery is not configured." }, { status: 501 });
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company && `Company / product: ${company}`,
    `Project type: ${projectType}`,
    url && `Current site / Figma / product: ${url}`,
    timeline && `Timeline: ${timeline}`,
    budget && `Budget: ${budget}`,
    "",
    "Brief:",
    brief,
  ].filter(Boolean);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        /* Must be a domain verified in Resend. Falls back to Resend's shared
           onboarding sender so a correctly-keyed but not-yet-verified account
           still delivers. */
        from: process.env.CONTACT_FROM ?? "Project brief <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO ?? site.email],
        /* So a reply goes to the sender rather than to the sending domain. */
        reply_to: email,
        subject: `Project brief — ${projectType} — ${name}`,
        text: lines.join("\n"),
      }),
    });

    if (!response.ok) {
      /* Log the provider's reason server-side; never surface it to the
         visitor, since it can contain account and configuration detail. */
      console.error("Resend rejected the message:", response.status, await response.text());
      return Response.json({ error: "The message could not be sent." }, { status: 502 });
    }
  } catch (error) {
    console.error("Contact delivery failed:", error);
    return Response.json({ error: "The message could not be sent." }, { status: 502 });
  }

  return Response.json({ ok: true }, { status: 200 });
}

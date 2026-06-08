// Lead intake for landing-page forms (lp-law and future LPs).
// Same-origin endpoint → no CORS, and the Make.com webhook URL stays server-side
// (never exposed in page source). Validates + honeypots, then forwards one JSON
// payload to the Make webhook, which fans out to Google Sheets / WhatsApp / CRM.

type LeadBody = {
  name?: string
  phone?: string
  email?: string
  consent?: boolean
  source?: string
  // Campaign attribution captured from the landing-page URL (?ref=, ?utm_*=).
  tracking?: Record<string, unknown>
  // Honeypot — real users never see/fill this. Bots tend to fill every field.
  _gotcha?: string
}

const WEBHOOK_TIMEOUT_MS = 8000

// Make.com webhook. Overridable via env (Vercel); falls back to this URL so the
// live form works without any dashboard step.
const DEFAULT_MAKE_WEBHOOK = 'https://hook.us2.make.com/vkj4re1fk55h1maa8pxfl7rimpnel62m'

function clean(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

// Israeli phone: allow digits, spaces, dashes, parens, leading +. Require ≥9 digits.
function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 9 && digits.length <= 15
}

// Campaign attribution keys passed through to Make (string values only).
const TRACKING_KEYS = ['ref', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'] as const
function pickTracking(t: unknown): Record<string, string> {
  const out: Record<string, string> = {}
  if (t && typeof t === 'object') {
    for (const k of TRACKING_KEYS) {
      const v = (t as Record<string, unknown>)[k]
      if (typeof v === 'string' && v.trim()) out[k] = v.trim()
    }
  }
  return out
}

export async function POST(req: Request) {
  let body: LeadBody
  try {
    body = (await req.json()) as LeadBody
  } catch {
    return Response.json(
      { ok: false, error: 'bad_request', userMessage: 'בקשה לא תקינה. נסה שוב.' },
      { status: 400 },
    )
  }

  // Honeypot tripped → silently accept so the bot believes it succeeded,
  // but never forward the spam onward.
  if (clean(body._gotcha)) {
    return Response.json({ ok: true })
  }

  const name = clean(body.name)
  const phone = clean(body.phone)
  const email = clean(body.email)

  if (!name || !phone) {
    return Response.json(
      { ok: false, error: 'missing_fields', userMessage: 'נא למלא שם וטלפון.' },
      { status: 422 },
    )
  }
  if (!isValidPhone(phone)) {
    return Response.json(
      { ok: false, error: 'invalid_phone', userMessage: 'מספר הטלפון לא נראה תקין.' },
      { status: 422 },
    )
  }

  const webhookUrl = process.env.MAKE_LEAD_WEBHOOK_URL || DEFAULT_MAKE_WEBHOOK
  if (!webhookUrl) {
    // Not configured yet — tell the client so it can fall back (e.g. WhatsApp).
    console.error('Lead intake: MAKE_LEAD_WEBHOOK_URL is not set')
    return Response.json(
      { ok: false, error: 'not_configured', userMessage: 'בעיית חיבור זמנית. נסה שוב.' },
      { status: 503 },
    )
  }

  const payload = {
    createdAt: new Date().toISOString(),
    name,
    phone,
    email,
    consent: body.consent === true,
    source: clean(body.source) || 'lp-law',
    page: '/lp-law.html',
    ...pickTracking(body.tracking),
  }

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS)
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    clearTimeout(timer)

    if (!res.ok) {
      console.error('Lead intake: webhook returned', res.status)
      return Response.json(
        { ok: false, error: 'webhook_failed', userMessage: 'בעיית חיבור זמנית. נסה שוב.' },
        { status: 502 },
      )
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.error('Lead intake error:', err)
    return Response.json(
      { ok: false, error: 'server_error', userMessage: 'בעיית חיבור זמנית. נסה שוב.' },
      { status: 500 },
    )
  }
}

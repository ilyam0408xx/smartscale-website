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
  // Which landing page the form was on. Sent by the page itself so lp-law-v2
  // is not reported as lp-law (a Make router that branches on `page` would
  // otherwise file v2 leads in the wrong branch).
  page?: string
  // Campaign attribution captured from the landing-page URL (?ref=, ?utm_*=).
  tracking?: Record<string, unknown>
  // Honeypot — real users never see/fill this. Bots tend to fill every field.
  _gotcha?: string
}

const WEBHOOK_TIMEOUT_MS = 8000
const TELEGRAM_TIMEOUT_MS = 5000

// Make.com webhook. Overridable via env (Vercel); falls back to this URL so the
// live form works without any dashboard step.
const DEFAULT_MAKE_WEBHOOK = 'https://hook.us2.make.com/vkj4re1fk55h1maa8pxfl7rimpnel62m'

// Every submission is logged as ONE structured line so it is greppable in the
// Vercel runtime logs. Until 16.8.2026 a successful lead left no server-side
// trace at all, and three leads that Make delivered on 7-8.8 could not be
// reconstructed from this side. Never log silently again.
function logLead(event: string, fields: Record<string, unknown>): void {
  try {
    console.log(`[lead] ${event} ${JSON.stringify(fields)}`)
  } catch {
    console.log(`[lead] ${event} <unserializable>`)
  }
}

// Second, independent copy of the lead. Make is a single point of failure: it is
// the only place a lead exists once we forward it, and the CRM behind it lives on
// a local machine. Telegram is already the proven alert channel for the CRM, it
// keeps history forever, and it does not depend on Make or on that machine being
// awake. Failure here never changes what the visitor sees.
async function sendTelegramCopy(payload: Record<string, unknown>): Promise<'sent' | 'skipped' | 'failed'> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return 'skipped'

  const lines = [
    '🆕 ליד חדש מדף הנחיתה',
    `שם: ${payload.name}`,
    `טלפון: ${payload.phone}`,
    `אימייל: ${payload.email || 'לא נמסר'}`,
    `מקור: ${payload.source}`,
    `דף: ${payload.page}`,
  ]
  const campaign = ['ref', 'utm_source', 'utm_medium', 'utm_campaign', 'gclid']
    .filter((k) => payload[k])
    .map((k) => `${k}=${payload[k]}`)
  if (campaign.length) lines.push(`קמפיין: ${campaign.join(' · ')}`)

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS)
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join('\n'),
        disable_web_page_preview: true,
      }),
      signal: controller.signal,
    })
    clearTimeout(timer)
    return res.ok ? 'sent' : 'failed'
  } catch {
    return 'failed'
  }
}

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

  // Honeypot tripped → still answer ok so a bot never learns it was caught, but
  // tell the client NOT to continue to the thank-you page: that page fires the
  // conversion tag, so the old behaviour reported a conversion for a lead that was
  // never forwarded anywhere. Real visitors can trip this too (password managers
  // and mobile autofill do fill off-screen fields), so it is logged, never silent.
  if (clean(body._gotcha)) {
    logLead('honeypot-blocked', {
      at: new Date().toISOString(),
      name: clean(body.name),
      phone: clean(body.phone),
      email: clean(body.email),
      source: clean(body.source),
      trap: clean(body._gotcha).slice(0, 80),
    })
    return Response.json({ ok: true, redirect: false })
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

  const source = clean(body.source) || 'lp-law'
  const payload = {
    createdAt: new Date().toISOString(),
    name,
    phone,
    email,
    consent: body.consent === true,
    source,
    page: clean(body.page) || `/${source}.html`,
    ...pickTracking(body.tracking),
  }

  // Logged BEFORE anything downstream runs, so the lead survives in the runtime
  // logs even if both Make and Telegram fail.
  logLead('received', payload)

  async function callMake(): Promise<{ ok: boolean; detail: string }> {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS)
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      return res.ok ? { ok: true, detail: String(res.status) } : { ok: false, detail: `http_${res.status}` }
    } catch (err) {
      return { ok: false, detail: err instanceof Error ? err.name : 'error' }
    } finally {
      clearTimeout(timer)
    }
  }

  // Both must be awaited before responding: work left pending after the response
  // is returned can be cut off by the serverless runtime.
  const [makeResult, telegramResult] = await Promise.allSettled([callMake(), sendTelegramCopy(payload)])

  const make = makeResult.status === 'fulfilled' ? makeResult.value : { ok: false, detail: 'threw' }
  const telegram = telegramResult.status === 'fulfilled' ? telegramResult.value : 'failed'

  logLead('delivered', { phone, make: make.ok ? 'ok' : make.detail, telegram })

  if (!make.ok) {
    // The visitor is sent to the WhatsApp fallback, and deliberately NOT to the
    // thank-you page, so no conversion is counted for a lead Make never took.
    return Response.json(
      { ok: false, error: 'webhook_failed', userMessage: 'בעיית חיבור זמנית. נסה שוב.' },
      { status: 502 },
    )
  }

  return Response.json({ ok: true })
}

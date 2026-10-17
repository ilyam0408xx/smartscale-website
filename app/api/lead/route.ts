// Lead intake for landing-page forms (lp-law and future LPs).
// Same-origin endpoint → no CORS, and the CRM secret stays server-side (never in
// page source). Validates + honeypots, then forwards one JSON payload straight to
// the Smart Scale CRM, which saves the lead and sends the lead's WhatsApp.
//
// Until 5.10.2026 this went to a Make webhook. On 30.9.2026 that scenario failed on a
// Google Sheets step and Make switched it off, but the webhook kept answering 200, so
// this route kept reporting success while no lead reached the CRM (Anat Gvili, 2.10).
// Success now means the CRM answered ok:true, i.e. the lead is actually saved.

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

// The CRM's public lead endpoint (book. host, no Cloudflare Access). The secret is
// CRM_LEAD_SECRET on Vercel, the same value as secrets/make_ingest.json in the CRM.
const DEFAULT_CRM_LEAD_URL = 'https://book.ilyamaltsev.com/api/public/lead'

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

// Second, independent copy of the lead. If the CRM is unreachable the lead exists
// nowhere else. Telegram is already the proven alert channel for the CRM, it keeps
// history forever, and it does not depend on the CRM being up. Failure here never
// changes what the visitor sees.
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

// Campaign attribution keys passed through to the CRM (string values only).
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

  const crmUrl = process.env.CRM_LEAD_URL || DEFAULT_CRM_LEAD_URL
  const crmSecret = process.env.CRM_LEAD_SECRET || ''
  if (!crmSecret) {
    // Not configured — tell the client so it can fall back (e.g. WhatsApp).
    console.error('Lead intake: CRM_LEAD_SECRET is not set')
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
  // logs even if both the CRM and Telegram fail.
  logLead('received', payload)

  async function callCrm(): Promise<{ ok: boolean; detail: string }> {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS)
    try {
      const res = await fetch(crmUrl, {
        method: 'POST',
        // ⚠️ An explicit User-Agent is required, not cosmetic: the CRM treats any request
        // whose User-Agent contains "node" as a test and mutes its alerts and the lead's
        // WhatsApp (_TEST_UA_MARKS in start_crm.py), and fetch on Vercel sends "node".
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'smartscale-website/lead-form' },
        body: JSON.stringify({ ...payload, secret: crmSecret }),
        signal: controller.signal,
      })
      if (!res.ok) return { ok: false, detail: `http_${res.status}` }
      // A 2xx alone is not proof (that is how the Make outage stayed invisible):
      // the CRM answers ok:true only after the lead is written.
      const out = (await res.json().catch(() => null)) as { ok?: boolean; duplicate?: boolean } | null
      if (!out || out.ok !== true) return { ok: false, detail: 'crm_not_ok' }
      return { ok: true, detail: out.duplicate ? 'duplicate' : 'created' }
    } catch (err) {
      return { ok: false, detail: err instanceof Error ? err.name : 'error' }
    } finally {
      clearTimeout(timer)
    }
  }

  // Both must be awaited before responding: work left pending after the response
  // is returned can be cut off by the serverless runtime.
  const [crmResult, telegramResult] = await Promise.allSettled([callCrm(), sendTelegramCopy(payload)])

  const crm = crmResult.status === 'fulfilled' ? crmResult.value : { ok: false, detail: 'threw' }
  const telegram = telegramResult.status === 'fulfilled' ? telegramResult.value : 'failed'

  logLead('delivered', { phone, crm: crm.detail, telegram })

  if (!crm.ok) {
    // The visitor is sent to the WhatsApp fallback, and deliberately NOT to the
    // thank-you page, so no conversion is counted for a lead the CRM never took.
    return Response.json(
      { ok: false, error: 'webhook_failed', userMessage: 'בעיית חיבור זמנית. נסה שוב.' },
      { status: 502 },
    )
  }

  return Response.json({ ok: true })
}

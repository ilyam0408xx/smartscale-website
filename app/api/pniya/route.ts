// Editorial contact form ("מצאתם טעות? כתבו לנו") behind /pniyot.
// Exists for ad-platform policy (a real, working way to report errors or complain
// about a sponsored article). Low priority by design: no Make, no CRM. Every
// submission goes to Telegram only, and is logged as one line in Vercel logs so
// nothing is lost even if Telegram is down or its env vars are missing.

type PniyaBody = {
  subject?: string
  page?: string
  details?: string
  name?: string
  email?: string
  _gotcha?: string
}

const TELEGRAM_TIMEOUT_MS = 5000

const SUBJECTS = [
  'דיווח על טעות או מידע לא מדויק',
  'טעות לשון',
  'בקשה לתיקון או להסרת תוכן',
  'תלונה',
  'פנייה אחרת',
]

function clean(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

function log(event: string, fields: Record<string, unknown>): void {
  try {
    console.log(`[pniya] ${event} ${JSON.stringify(fields)}`)
  } catch {
    console.log(`[pniya] ${event} <unserializable>`)
  }
}

async function sendTelegram(text: string): Promise<'sent' | 'skipped' | 'failed'> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return 'skipped'
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS)
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
      signal: controller.signal,
    })
    clearTimeout(timer)
    return res.ok ? 'sent' : 'failed'
  } catch {
    return 'failed'
  }
}

export async function POST(req: Request) {
  let body: PniyaBody
  try {
    body = (await req.json()) as PniyaBody
  } catch {
    return Response.json({ ok: false, userMessage: 'בקשה לא תקינה. נסו שוב.' }, { status: 400 })
  }

  // Honeypot: answer ok so a bot learns nothing.
  if (clean(body._gotcha, 80)) {
    log('honeypot-blocked', { at: new Date().toISOString() })
    return Response.json({ ok: true })
  }

  const subject = SUBJECTS.includes(clean(body.subject, 80)) ? clean(body.subject, 80) : 'פנייה אחרת'
  const details = clean(body.details, 3000)
  const page = clean(body.page, 500)
  const name = clean(body.name, 120)
  const email = clean(body.email, 200)

  if (details.length < 3) {
    return Response.json({ ok: false, userMessage: 'נא לפרט את הפנייה.' }, { status: 422 })
  }
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ ok: false, userMessage: 'כתובת האימייל לא נראית תקינה.' }, { status: 422 })
  }

  const text = [
    '📨 פנייה למערכת (דף /pniyot)',
    `נושא: ${subject}`,
    `דף: ${page || 'לא צוין'}`,
    `שם: ${name || 'לא נמסר'}`,
    `אימייל: ${email || 'לא נמסר'}`,
    '',
    details,
  ].join('\n')

  const telegram = await sendTelegram(text)
  log('received', { at: new Date().toISOString(), subject, page, name, email, details, telegram })

  if (telegram !== 'sent') {
    return Response.json(
      { ok: false, telegram, userMessage: 'לא הצלחנו לשלוח כרגע. אפשר לכתוב לנו במייל ilya@smartscale.biz' },
      { status: 502 },
    )
  }
  return Response.json({ ok: true })
}

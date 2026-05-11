'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'

type Side = 'cust' | 'bot' | 'meta'

interface ScriptMsg {
  side: Side
  text: string
  /** how long the user/bot "types" before the bubble appears (ms) */
  typing: number
  /** pause after the bubble appears, before the next typing starts (ms) */
  hold: number
}

const WA_SCRIPT: ScriptMsg[] = [
  { side: 'cust', text: 'היי, רציתי לקבוע תור לטיפול ביום רביעי', typing: 1700, hold: 900 },
  {
    side: 'bot',
    text: 'היי דנה 👋 יש לי שני חלונות פנויים ברביעי:\n• 10:30\n• 16:00\nמה מתאים?',
    typing: 2100,
    hold: 1500,
  },
  { side: 'cust', text: '16:00 בבקשה', typing: 1100, hold: 900 },
  { side: 'bot', text: 'מעולה. אשמח רק לאשר — איזה טיפול בדיוק?', typing: 1500, hold: 1100 },
  { side: 'cust', text: 'טיפול פנים, כמו פעם שעברה', typing: 1300, hold: 900 },
  {
    side: 'bot',
    text:
      'מצוין. ראיתי שטיפול הפנים שלך בפעם הקודמת היה ב‑12/04. ממליצה להוסיף הפעם גם תוספת ניקוי עמוק (+15 דק׳). מעוניינת?',
    typing: 2400,
    hold: 1500,
  },
  { side: 'cust', text: 'כן, בואי נוסיף', typing: 1100, hold: 900 },
  {
    side: 'bot',
    text: 'נרשם ✓ שלחתי לך אישור בלוח השנה + קישור לתשלום מראש (אופציונלי).',
    typing: 1900,
    hold: 1400,
  },
  { side: 'cust', text: 'תודה! איפה הקליניקה?', typing: 1200, hold: 900 },
  {
    side: 'bot',
    text: 'שלחתי לך מיקום ב-Waze 📍 וגם הוראות חניה. אשלח תזכורת יום לפני 🙏',
    typing: 1900,
    hold: 1500,
  },
  { side: 'meta', text: 'תזכורת אוטומטית נשלחה • 23/05 • 18:00', typing: 600, hold: 1800 },
]

export default function WhatsAppSim() {
  const [step, setStep] = useState(0)
  const [typingSide, setTypingSide] = useState<Side | null>(null)
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3, once: false })
  const bodyRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!inView) return
    let alive = true
    const timers: ReturnType<typeof setTimeout>[] = []
    const wait = (ms: number) =>
      new Promise<void>((r) => {
        timers.push(setTimeout(r, ms))
      })

    const run = async () => {
      for (let i = 0; i < WA_SCRIPT.length; i++) {
        if (!alive) return
        const m = WA_SCRIPT[i]

        // show typing indicator on the correct side
        setTypingSide(m.side === 'meta' ? 'bot' : m.side)
        await wait(m.typing)
        if (!alive) return
        setTypingSide(null)

        // bubble appears
        setStep(i + 1)
        await wait(m.hold)
      }

      // long pause, then restart loop
      await wait(4000)
      if (!alive) return
      setStep(0)
    }

    run()

    return () => {
      alive = false
      timers.forEach(clearTimeout)
    }
    // intentionally restart loop when step resets to 0
  }, [inView, step === 0 ? 0 : -1])

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [step, typingSide])

  const visible = WA_SCRIPT.slice(0, step)

  return (
    <div ref={ref} className="wa-card" aria-label="הדגמת בוט WhatsApp">
      <div className="wa-head">
        <div className="wa-avatar">ס</div>
        <div className="wa-name">
          <div className="wa-title">Smart Scale Bot</div>
          <div className="wa-status">{typingSide ? 'מקליד…' : 'אונליין'}</div>
        </div>
        <div className="wa-icons" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
          </svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </div>
      </div>
      <div ref={bodyRef} className="wa-body">
        {visible.map((m, i) =>
          m.side === 'meta' ? (
            <div key={i} className="wa-meta">
              {m.text}
            </div>
          ) : (
            <div key={i} className={`wa-bubble wa-${m.side}`}>
              <span style={{ whiteSpace: 'pre-wrap' }}>{m.text}</span>
              <span className="wa-time">
                {i % 2 === 0 ? '14:32' : '14:33'}
                {m.side === 'bot' && <span className="wa-tick">✓✓</span>}
              </span>
            </div>
          )
        )}
        {typingSide && (
          <div className={`wa-bubble wa-${typingSide} wa-typing`}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
      </div>
      <div className="wa-input">
        <span>הודעה…</span>
        <div className="wa-send">↑</div>
      </div>
    </div>
  )
}

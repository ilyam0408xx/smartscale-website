'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'

type Side = 'cust' | 'bot' | 'meta'

interface ScriptMsg {
  side: Side
  text: string
  delay: number
  system?: boolean
}

const WA_SCRIPT: ScriptMsg[] = [
  { side: 'cust', text: 'היי, רציתי לקבוע תור לטיפול ביום רביעי', delay: 600 },
  {
    side: 'bot',
    text: 'היי דנה 👋 יש לי שני חלונות פנויים ברביעי:\n• 10:30\n• 16:00\nמה מתאים?',
    delay: 1100,
  },
  { side: 'cust', text: '16:00 בבקשה', delay: 800 },
  { side: 'bot', text: 'מעולה. אשמח רק לאשר — איזה טיפול בדיוק?', delay: 900 },
  { side: 'cust', text: 'טיפול פנים, כמו פעם שעברה', delay: 800 },
  {
    side: 'bot',
    text:
      'מצוין. ראיתי שטיפול הפנים שלך בפעם הקודמת היה ב‑12/04. ממליצה להוסיף הפעם גם תוספת ניקוי עמוק (+15 דק׳). מעוניינת?',
    delay: 1300,
  },
  { side: 'cust', text: 'כן, בואי נוסיף', delay: 700 },
  {
    side: 'bot',
    text: 'נרשם ✓ שלחתי לך אישור בלוח השנה + קישור לתשלום מראש (אופציונלי).',
    delay: 1000,
    system: true,
  },
  { side: 'cust', text: 'תודה! איפה הקליניקה?', delay: 800 },
  {
    side: 'bot',
    text: 'שלחתי לך מיקום ב-Waze 📍 וגם הוראות חניה. אשלח תזכורת יום לפני 🙏',
    delay: 1100,
  },
  { side: 'meta', text: 'תזכורת אוטומטית נשלחה • 23/05 • 18:00', delay: 1400 },
]

export default function WhatsAppSim() {
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState(false)
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3, once: false })
  const bodyRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!inView) return
    let alive = true
    const timers: ReturnType<typeof setTimeout>[] = []

    const run = async () => {
      for (let i = 0; i < WA_SCRIPT.length; i++) {
        if (!alive) return
        const m = WA_SCRIPT[i]
        if (m.side === 'bot' || m.side === 'meta') {
          setTyping(true)
          await new Promise((r) => timers.push(setTimeout(r, 700)))
          setTyping(false)
        }
        await new Promise((r) => timers.push(setTimeout(r, m.delay)))
        if (!alive) return
        setStep(i + 1)
      }
      await new Promise((r) => timers.push(setTimeout(r, 3500)))
      if (!alive) return
      setStep(0)
    }

    run()

    return () => {
      alive = false
      timers.forEach(clearTimeout)
    }
  }, [inView, step === 0 ? 0 : -1])

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [step, typing])

  const visible = WA_SCRIPT.slice(0, step)

  return (
    <div ref={ref} className="wa-card" aria-label="הדגמת בוט WhatsApp">
      <div className="wa-head">
        <div className="wa-avatar">ס</div>
        <div className="wa-name">
          <div className="wa-title">Smart Scale Bot</div>
          <div className="wa-status">{typing ? 'מקליד…' : 'אונליין'}</div>
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
        {typing && (
          <div className="wa-bubble wa-bot wa-typing">
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

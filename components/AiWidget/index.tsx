'use client'

import { useState, useRef, useEffect } from 'react'

interface Card {
  title: string
  problem: string
  result: string
  example?: string
}

interface AIResponse {
  greeting: string
  cards: Card[]
  cta: string
}

type State = 'closed' | 'open' | 'loading' | 'results' | 'capture' | 'thankyou'

const WA_BASE = 'https://wa.me/9720502611165?text='

export default function AiWidget() {
  const [state, setState] = useState<State>('closed')
  const [message, setMessage] = useState('')
  const [result, setResult] = useState<AIResponse | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Focus input when opened
  useEffect(() => {
    if (state === 'open' && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 350)
    }
  }, [state])

  async function handleSubmit() {
    if (!message.trim()) return
    setState('loading')
    setError('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })
      const data = await res.json()

      if (data.error || !data.cards) {
        setError('משהו השתבש. נסה שוב.')
        setState('open')
        return
      }

      setResult(data)
      setState('results')
    } catch {
      setError('בעיית חיבור. בדוק אינטרנט ונסה שוב.')
      setState('open')
    }
  }

  function handleLeadSubmit() {
    if (!name.trim() || !phone.trim()) return

    const waMessage = encodeURIComponent(
      `היי איליה! פניתי דרך האתר.\nשמי: ${name}\nטלפון: ${phone}\nשאלתי על: ${message}`
    )
    window.open(WA_BASE + waMessage, '_blank', 'noopener')
    setState('thankyou')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 92,
    insetInlineStart: 28,
    width: 340,
    maxWidth: 'calc(100vw - 40px)',
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
    zIndex: 200,
    fontFamily: 'inherit',
    overflow: 'hidden',
    animation: 'widgetSlideUp 0.3s ease',
  }

  return (
    <>
      <style>{`
        @keyframes widgetSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ai-widget-input:focus { outline: none; border-color: #0ea5e9 !important; }
        .ai-widget-btn:hover { opacity: 0.9; transform: scale(1.02); }
        .ai-widget-card { transition: box-shadow 0.2s; }
        .ai-widget-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
      `}</style>

      {/* Floating trigger button */}
      {state === 'closed' && (
        <button
          onClick={() => setState('open')}
          style={{
            position: 'fixed',
            bottom: 28,
            insetInlineStart: 28,
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 20px',
            background: '#0a0a0a',
            color: '#fff',
            borderRadius: 50,
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'inherit',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(0,0,0,0.3)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)'
          }}
        >
          <span style={{ fontSize: 18 }}>💬</span>
          מה המערכת שלי?
        </button>
      )}

      {/* Panel */}
      {state !== 'closed' && (
        <div style={panelStyle} role="dialog" aria-label="Smart Scale Advisor">

          {/* Header */}
          <div style={{ background: '#0a0a0a', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>💬</span>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Smart Scale Advisor</span>
            </div>
            <button
              onClick={() => { setState('closed'); setMessage(''); setResult(null); setName(''); setPhone('') }}
              style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: 20, lineHeight: 1, padding: '0 4px', fontFamily: 'inherit' }}
              aria-label="סגור"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '20px 18px', maxHeight: 420, overflowY: 'auto' }}>

            {/* OPEN STATE */}
            {(state === 'open' || state === 'loading') && (
              <>
                <p style={{ fontSize: 14, color: '#6b6b6b', marginBottom: 16, lineHeight: 1.6 }}>
                  כתוב כל דבר על העסק שלך —<br />סוג עסק, בעיה, מה מציק לך
                </p>
                <textarea
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder='למשל: "אני נגר ולידים נכנסים בלילה..." או "יש לי קליניקה ואנשים לא מגיעים לתורים"'
                  disabled={state === 'loading'}
                  className="ai-widget-input"
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1.5px solid #e5e5e5',
                    borderRadius: 8,
                    fontSize: 14,
                    lineHeight: 1.6,
                    resize: 'none',
                    fontFamily: 'inherit',
                    direction: 'rtl',
                    background: state === 'loading' ? '#f9f9f7' : '#fff',
                  }}
                />
                {error && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 8 }}>{error}</p>}
                <button
                  onClick={handleSubmit}
                  disabled={state === 'loading' || !message.trim()}
                  className="ai-widget-btn"
                  style={{
                    marginTop: 12,
                    width: '100%',
                    padding: '11px',
                    background: state === 'loading' || !message.trim() ? '#aaaaaa' : '#0ea5e9',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: state === 'loading' || !message.trim() ? 'default' : 'pointer',
                    fontFamily: 'inherit',
                    transition: 'opacity 0.2s, transform 0.2s',
                  }}
                >
                  {state === 'loading' ? '⏳ בודק מה מתאים לך...' : 'שלח ←'}
                </button>
              </>
            )}

            {/* RESULTS STATE */}
            {state === 'results' && result && (
              <>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#0a0a0a', marginBottom: 16, lineHeight: 1.5 }}>
                  {result.greeting}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                  {result.cards.map((card, i) => (
                    <div
                      key={i}
                      className="ai-widget-card"
                      style={{
                        background: '#f9f9f7',
                        borderRadius: 10,
                        padding: '14px',
                        border: '1px solid #e5e5e5',
                      }}
                    >
                      <p style={{ fontWeight: 700, fontSize: 14, color: '#0a0a0a', marginBottom: 6 }}>
                        💡 {card.title}
                      </p>
                      <p style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 6, lineHeight: 1.5 }}>
                        {card.problem}
                      </p>
                      <p style={{ fontSize: 13, color: '#166534', fontWeight: 600, marginBottom: card.example ? 6 : 0 }}>
                        ✅ {card.result}
                      </p>
                      {card.example && (
                        <p style={{ fontSize: 12, color: '#6b6b6b', fontStyle: 'italic', lineHeight: 1.4 }}>
                          {card.example}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setState('capture')}
                  className="ai-widget-btn"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: '#25D366',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'opacity 0.2s, transform 0.2s',
                  }}
                >
                  {result.cta} →
                </button>
              </>
            )}

            {/* CAPTURE STATE */}
            {state === 'capture' && (
              <>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a', marginBottom: 16, lineHeight: 1.5 }}>
                  השאר פרטים ואיליה יחזור אליך תוך שעה 👋
                </p>
                <input
                  type="text"
                  placeholder="שם מלא"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="ai-widget-input"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1.5px solid #e5e5e5',
                    borderRadius: 8,
                    fontSize: 14,
                    marginBottom: 10,
                    fontFamily: 'inherit',
                    direction: 'rtl',
                  }}
                />
                <input
                  type="tel"
                  placeholder="מספר טלפון"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  dir="ltr"
                  className="ai-widget-input"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1.5px solid #e5e5e5',
                    borderRadius: 8,
                    fontSize: 14,
                    marginBottom: 14,
                    fontFamily: 'inherit',
                  }}
                />
                <button
                  onClick={handleLeadSubmit}
                  disabled={!name.trim() || !phone.trim()}
                  className="ai-widget-btn"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: !name.trim() || !phone.trim() ? '#aaaaaa' : '#25D366',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: !name.trim() || !phone.trim() ? 'default' : 'pointer',
                    fontFamily: 'inherit',
                    transition: 'opacity 0.2s',
                  }}
                >
                  שלח פרטים ב-WhatsApp ←
                </button>
                <button
                  onClick={() => setState('results')}
                  style={{ background: 'none', border: 'none', color: '#aaa', fontSize: 13, cursor: 'pointer', marginTop: 8, width: '100%', fontFamily: 'inherit' }}
                >
                  ← חזור
                </button>
              </>
            )}

            {/* THANK YOU STATE */}
            {state === 'thankyou' && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <p style={{ fontSize: 32, marginBottom: 12 }}>🎉</p>
                <p style={{ fontWeight: 700, fontSize: 16, color: '#0a0a0a', marginBottom: 8 }}>
                  תודה! הפרטים נשלחו
                </p>
                <p style={{ fontSize: 14, color: '#6b6b6b', lineHeight: 1.6 }}>
                  איליה יחזור אליך תוך שעה בWhatsApp.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

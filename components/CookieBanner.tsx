'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
    // Trigger pixel load without full reload
    window.dispatchEvent(new Event('cookie-accepted'))
  }

  function decline() {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="הסכמה לעוגיות"
      style={{
        position: 'fixed',
        bottom: 0,
        insetInlineStart: 0,
        insetInlineEnd: 0,
        zIndex: 999,
        background: '#0a0a0a',
        color: '#fff',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        boxShadow: '0 -4px 24px rgba(0,0,0,0.3)',
        animation: 'slideUp 0.35s ease',
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, flex: '1 1 280px', color: '#e5e5e5' }}>
        האתר משתמש בעוגיות לשיפור חווית השימוש ולניתוח תנועה (Facebook Pixel).{' '}
        <a href="/privacy" style={{ color: '#0ea5e9', textDecoration: 'underline' }}>
          מדיניות פרטיות
        </a>
      </p>

      <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            padding: '8px 18px',
            border: '1px solid #6b6b6b',
            borderRadius: 6,
            background: 'transparent',
            color: '#aaaaaa',
            fontSize: 13,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          המשך ללא עוגיות
        </button>
        <button
          onClick={accept}
          style={{
            padding: '8px 20px',
            borderRadius: 6,
            background: '#0ea5e9',
            color: '#fff',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            border: 'none',
            fontFamily: 'inherit',
          }}
        >
          אישור
        </button>
      </div>
    </div>
  )
}

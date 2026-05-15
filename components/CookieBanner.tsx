'use client'

import { useEffect, useState } from 'react'

// GDPR-style granular consent. localStorage stores a JSON object with one
// boolean per category. Backward compat: legacy values "accepted"/"declined"
// are migrated on first read.

type ConsentState = {
  functional: true // always on
  preferences: boolean
  statistics: boolean
  marketing: boolean
}

const DEFAULT_DECLINED: ConsentState = {
  functional: true,
  preferences: false,
  statistics: false,
  marketing: false,
}

const DEFAULT_ACCEPTED: ConsentState = {
  functional: true,
  preferences: true,
  statistics: true,
  marketing: true,
}

function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem('cookie_consent')
  if (!raw) return null
  if (raw === 'accepted') return DEFAULT_ACCEPTED
  if (raw === 'declined') return DEFAULT_DECLINED
  try {
    const parsed = JSON.parse(raw)
    return {
      functional: true,
      preferences: !!parsed.preferences,
      statistics: !!parsed.statistics,
      marketing: !!parsed.marketing,
    }
  } catch {
    return null
  }
}

function writeConsent(state: ConsentState) {
  localStorage.setItem('cookie_consent', JSON.stringify(state))
  window.dispatchEvent(new CustomEvent('cookie-accepted', { detail: state }))
}

type SectionKey = 'functional' | 'preferences' | 'statistics' | 'marketing'

const SECTIONS: Array<{
  key: SectionKey
  title: string
  body: string
  alwaysActive?: boolean
}> = [
  {
    key: 'functional',
    title: 'Functional',
    alwaysActive: true,
    body:
      'The technical storage or access is strictly necessary for the legitimate purpose of enabling the use of a specific service explicitly requested by the subscriber or user, or for the sole purpose of carrying out the transmission of a communication over an electronic communications network.',
  },
  {
    key: 'preferences',
    title: 'Preferences',
    body:
      'The technical storage or access is necessary for the legitimate purpose of storing preferences that are not requested by the subscriber or user.',
  },
  {
    key: 'statistics',
    title: 'Statistics',
    body:
      'The technical storage or access that is used exclusively for anonymous statistical purposes. Without a subpoena, voluntary compliance on the part of your Internet Service Provider, or additional records from a third party, information stored or retrieved for this sole purpose cannot usually be used to identify you.',
  },
  {
    key: 'marketing',
    title: 'Marketing',
    body:
      'The technical storage or access is required to create user profiles to send advertising, or to track the user on a website or across several websites for similar marketing purposes.',
  },
]

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  // Default state: all toggles ON. User can opt OUT of categories before clicking מאשר.
  const [draft, setDraft] = useState<ConsentState>(DEFAULT_ACCEPTED)
  const [openSection, setOpenSection] = useState<SectionKey | null>(null)

  useEffect(() => {
    const existing = readConsent()
    if (!existing) setVisible(true)
  }, [])

  function close() {
    setVisible(false)
  }

  function acceptAll() {
    writeConsent(DEFAULT_ACCEPTED)
    setVisible(false)
  }

  function declineAll() {
    writeConsent(DEFAULT_DECLINED)
    setVisible(false)
  }

  function toggle(key: SectionKey) {
    if (key === 'functional') return
    setDraft((d) => ({ ...d, [key]: !d[key] }))
  }

  if (!visible) return null

  return (
    <div className="cookie-modal" role="dialog" aria-label="הגדרות עוגיות">
      <button
        type="button"
        className="cookie-modal__close"
        aria-label="סגור"
        onClick={close}
      >
        ✕
      </button>

      <p className="cookie-modal__intro">
        אנחנו משתמשים בעוגיות (Cookies) כדי להבטיח לך את החוויה הכי טובה באתר שלנו.
        אישור השימוש בטכנולוגיות אלו יאפשר לנו לנתח נתונים כמו הרגלי גלישה כדי
        להשתפר. שימו לב שאי-מתן הסכמה עלול להשפיע על חלק מהאפשרויות והתפקודים
        באתר.
      </p>

      <div className="cookie-modal__sections">
        {SECTIONS.map((s) => {
          const isOpen = openSection === s.key
          const isOn = s.alwaysActive ? true : draft[s.key]
          return (
            <div key={s.key} className="cookie-section">
              <button
                type="button"
                className="cookie-section__head"
                onClick={() => setOpenSection(isOpen ? null : s.key)}
                aria-expanded={isOpen}
              >
                <span
                  className={`cookie-section__chevron${isOpen ? ' is-open' : ''}`}
                  aria-hidden="true"
                >
                  ›
                </span>
                {s.alwaysActive ? (
                  <span className="cookie-section__always">Always active</span>
                ) : (
                  <span
                    role="switch"
                    aria-checked={isOn}
                    tabIndex={0}
                    className={`cookie-toggle${isOn ? ' is-on' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggle(s.key)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault()
                        e.stopPropagation()
                        toggle(s.key)
                      }
                    }}
                  >
                    <span className="cookie-toggle__dot" />
                  </span>
                )}
                <span className="cookie-section__title">{s.title}</span>
              </button>
              {isOpen && (
                <p className="cookie-section__body" dir="ltr">
                  {s.body}
                </p>
              )}
            </div>
          )
        })}
      </div>

      <div className="cookie-modal__actions">
        <a
          href="/privacy"
          target="_blank"
          rel="noopener"
          className="cookie-btn cookie-btn--ghost"
        >
          רוצה לקרוא
        </a>
        <button type="button" onClick={declineAll} className="cookie-btn cookie-btn--ghost">
          דוחה
        </button>
        <button
          type="button"
          onClick={() => {
            // Save whatever the user has in the draft (default is all-on; user may have toggled some off).
            writeConsent(draft)
            setVisible(false)
          }}
          className="cookie-btn cookie-btn--primary"
        >
          מאשר
        </button>
      </div>

      <div className="cookie-modal__links">
        <a href="/privacy" target="_blank" rel="noopener">
          Privacy Statement
        </a>
        <a href="/privacy" target="_blank" rel="noopener">
          Cookie Policy
        </a>
      </div>
    </div>
  )
}

// Public helper for other components (PixelLoader, OutbrainPixel, etc.)
// to check whether a given category was consented to.
export function getConsent(): ConsentState {
  return readConsent() ?? DEFAULT_DECLINED
}

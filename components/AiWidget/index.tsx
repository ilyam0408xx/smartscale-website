'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import MessageList from './MessageList'
import LeadForm from './LeadForm'
import ProgressDots from './ProgressDots'
import { useChat } from './useChat'
import type { WidgetState } from './types'

export default function AiWidget() {
  const [state, setState] = useState<WidgetState>('closed')
  const [draft, setDraft] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const pathname = usePathname() ?? '/'

  const { messages, hydrated, userTurns, chatLocked, startConversation, send, retry, reset } = useChat(pathname)

  // Auto-open the conversation when widget opens and there's no history yet
  useEffect(() => {
    if (state !== 'chatting') return
    if (!hydrated) return
    if (messages.length === 0) {
      void startConversation()
    }
  }, [state, hydrated, messages.length, startConversation])

  // Focus input when chat is active (and not locked)
  useEffect(() => {
    if (state === 'chatting' && !chatLocked) {
      const t = setTimeout(() => inputRef.current?.focus(), 300)
      return () => clearTimeout(t)
    }
  }, [state, chatLocked])

  const handleSend = useCallback(() => {
    const text = draft.trim()
    if (!text) return
    setDraft('')
    void send(text)
  }, [draft, send])

  const handleChipSelect = useCallback(
    (chip: string) => {
      void send(chip)
    },
    [send],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend],
  )

  const handleClose = useCallback(() => {
    setState('closed')
  }, [])

  const handleCta = useCallback(() => {
    setState('capture')
  }, [])

  // Promo (advertorial) pages should give value first and avoid distracting
  // sales widgets. Hide AiWidget entirely on /promo/* routes.
  if (pathname.startsWith('/promo/')) return null

  if (state === 'closed') {
    return (
      <button type="button" className="aiw-trigger" onClick={() => setState('chatting')}>
        <span aria-hidden style={{ fontSize: 18 }}>💬</span>
        מה המערכת שלי?
      </button>
    )
  }

  return (
    <div className="aiw-panel" role="dialog" aria-label="Smart Scale Advisor">
      <div className="aiw-header">
        <div className="aiw-header-title">
          <div className="aiw-avatar aiw-avatar-lg" aria-hidden>S</div>
          <span>Smart Scale Advisor</span>
        </div>
        <button type="button" className="aiw-header-close" onClick={handleClose} aria-label="סגור">
          ✕
        </button>
      </div>

      {state === 'chatting' && <ProgressDots userTurns={userTurns} />}

      {state === 'chatting' && (
        <>
          <MessageList
            messages={messages}
            onChipSelect={handleChipSelect}
            onRetry={retry}
            onCta={handleCta}
            chatLocked={chatLocked}
          />
          {!chatLocked && (
            <div className="aiw-footer">
              <div className="aiw-input-row">
                <textarea
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="כתוב תשובה משלך…"
                  className="aiw-input"
                  rows={1}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!draft.trim()}
                  className="aiw-send"
                  aria-label="שלח"
                >
                  ←
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {state === 'capture' && (
        <div style={{ padding: '18px 16px' }}>
          <LeadForm
            messages={messages}
            onBack={() => setState('chatting')}
            onDone={() => {
              setState('thankyou')
              reset()
            }}
          />
        </div>
      )}

      {state === 'thankyou' && (
        <div className="aiw-thankyou">
          <p className="aiw-thankyou-emoji">🎉</p>
          <p className="aiw-thankyou-title">תודה! הפרטים נשלחו</p>
          <p className="aiw-thankyou-text">איליה יחזור אליך תוך שעה ב-WhatsApp.</p>
        </div>
      )}
    </div>
  )
}

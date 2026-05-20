'use client'

import { useState } from 'react'
import type { ChatMessage } from './types'

const WA_BASE = 'https://wa.me/9720502611165?text='

function buildTranscript(messages: ChatMessage[]): string {
  const lines: string[] = []
  for (const m of messages) {
    if (m.role === 'user') {
      lines.push(`אני: ${m.content}`)
    } else if (m.role === 'assistant' && m.phase === 'reply') {
      let line = `Smart Scale: ${m.text}`
      if (m.cards && m.cards.length > 0) {
        const cardSummary = m.cards.map((c) => `• ${c.title}`).join('\n')
        line += `\n${cardSummary}`
      }
      lines.push(line)
    }
  }
  return lines.join('\n')
}

type Props = {
  messages: ChatMessage[]
  onBack: () => void
  onDone: () => void
}

export default function LeadForm({ messages, onBack, onDone }: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  function handleSubmit() {
    if (!name.trim() || !phone.trim()) return
    const transcript = buildTranscript(messages)
    const body = `היי איליה! פניתי דרך האתר.\nשמי: ${name}\nטלפון: ${phone}\n\n--- תמליל השיחה ---\n${transcript}`
    window.open(WA_BASE + encodeURIComponent(body), '_blank', 'noopener')
    onDone()
  }

  return (
    <div>
      <p className="aiw-form-title">השאר פרטים ואיליה יחזור אליך תוך שעה 👋</p>
      <input
        type="text"
        placeholder="שם מלא"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="aiw-form-input"
      />
      <input
        type="tel"
        placeholder="מספר טלפון"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="aiw-form-input ltr"
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!name.trim() || !phone.trim()}
        className="aiw-cta"
      >
        שלח פרטים ב-WhatsApp ←
      </button>
      <button type="button" onClick={onBack} className="aiw-form-back">
        ← חזור
      </button>
    </div>
  )
}

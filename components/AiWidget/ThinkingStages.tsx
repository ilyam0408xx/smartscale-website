'use client'

import { useEffect, useState } from 'react'

const STAGES = [
  { icon: '🧠', text: 'מנתח את התשובות שלך…' },
  { icon: '🔍', text: 'מתאים פתרונות לעסק שלך…' },
  { icon: '✨', text: 'מכין הצעה מותאמת…' },
] as const

export default function ThinkingStages() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (active >= STAGES.length - 1) return
    const t = setTimeout(() => setActive((s) => s + 1), 1100)
    return () => clearTimeout(t)
  }, [active])

  return (
    <div className="aiw-thinking" role="status" aria-live="polite">
      {STAGES.map((s, i) => {
        const cls =
          i < active ? 'is-done' : i === active ? 'is-active' : 'is-pending'
        return (
          <div key={i} className={`aiw-thinking-row ${cls}`}>
            <span aria-hidden>{i < active ? '✓' : s.icon}</span>
            <span>{s.text}</span>
          </div>
        )
      })}
    </div>
  )
}

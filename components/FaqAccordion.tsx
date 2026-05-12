'use client'

import { useState } from 'react'

interface FaqItem {
  q: string
  a: string
}

interface Props {
  items: FaqItem[]
  initialOpen?: number
}

export default function FaqAccordion({ items, initialOpen = -1 }: Props) {
  const [open, setOpen] = useState<number>(initialOpen)

  return (
    <div className="faq">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={i} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
            <button
              className="faq-q"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span>{it.q}</span>
              <span className="faq-plus" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div className="faq-a-wrap" style={{ maxHeight: isOpen ? 800 : 0 }}>
              <div className="faq-a">{it.a}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

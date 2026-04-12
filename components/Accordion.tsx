'use client'

import { useState } from 'react'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  background?: string
}

export default function Accordion({ items, background = '#fff' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            style={{
              border: '1px solid #e5e5e5',
              borderRadius: 12,
              overflow: 'hidden',
              background,
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                padding: '17px 20px',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                textAlign: 'right' as const,
                fontFamily: 'inherit',
                color: '#0a0a0a',
                lineHeight: 1.4,
              }}
            >
              <span style={{ flex: 1 }}>{item.question}</span>
              <span
                style={{
                  color: '#0ea5e9',
                  fontSize: 22,
                  fontWeight: 400,
                  flexShrink: 0,
                  marginInlineStart: 16,
                  display: 'inline-block',
                  transition: 'transform 0.3s ease',
                  transform: isOpen ? 'rotate(45deg)' : 'none',
                  lineHeight: 1,
                }}
              >
                +
              </span>
            </button>

            {/* Animated content */}
            <div
              style={{
                maxHeight: isOpen ? 400 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.35s ease',
              }}
            >
              <div
                style={{
                  padding: '4px 20px 18px',
                  fontSize: 15,
                  color: '#3a3a3a',
                  lineHeight: 1.75,
                  opacity: isOpen ? 1 : 0,
                  transition: 'opacity 0.25s ease 0.05s',
                }}
              >
                {item.answer}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { HOMEPAGE_FAQS } from './faqs'

export default function FAQSection() {
  const [open, setOpen] = useState<number>(0)

  return (
    <section className="faq-sec" id="faq" data-screen-label="08 FAQ">
      <div className="container faq-wrap">
        <div className="section-head">
          <h2 className="section-title">שאלות שכולם שואלים.</h2>
        </div>
        <div className="faq">
          {HOMEPAGE_FAQS.map((it, i) => {
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
                <div className="faq-a-wrap" style={{ maxHeight: isOpen ? 600 : 0 }}>
                  <div className="faq-a">{it.a}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

'use client'

// Finds all `pre > code.language-copyable` blocks in the rendered promo
// content and adds a "העתק" button to each. The fenced code block (```copyable
// ... ```) in MDX becomes a styled, scrollable box with copy-to-clipboard.
// Mounted once per /promo/* page from app/promo/[slug]/page.tsx.

import { useEffect } from 'react'

export default function CopyButtonEnhancer() {
  useEffect(() => {
    const blocks = document.querySelectorAll<HTMLElement>(
      'pre > code.language-copyable'
    )

    blocks.forEach((codeEl) => {
      const pre = codeEl.parentElement
      if (!pre || pre.dataset.copyableEnhanced === '1') return
      pre.dataset.copyableEnhanced = '1'

      const text = codeEl.textContent || ''

      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'copyable-btn'
      btn.textContent = 'העתק'
      btn.setAttribute('aria-label', 'העתק את הפרומפט')

      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(text)
          btn.textContent = 'הועתק ✓'
          setTimeout(() => {
            btn.textContent = 'העתק'
          }, 2000)
        } catch {
          btn.textContent = 'נכשל'
          setTimeout(() => {
            btn.textContent = 'העתק'
          }, 2000)
        }
      })

      const wrapper = document.createElement('div')
      wrapper.className = 'copyable-wrapper'
      pre.parentNode?.insertBefore(wrapper, pre)
      wrapper.appendChild(pre)
      wrapper.appendChild(btn)
    })
  }, [])

  return null
}

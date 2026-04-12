'use client'

import { useEffect } from 'react'

// When navigating from another page to /#section,
// Next.js App Router doesn't always scroll to the anchor.
// This component handles it.
export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    const id = hash.slice(1)

    // Try immediately
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      return
    }

    // Retry after a short delay (element might not be in DOM yet)
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return null
}

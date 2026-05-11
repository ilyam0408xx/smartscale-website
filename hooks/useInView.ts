'use client'

import { useEffect, useRef, useState } from 'react'

interface UseInViewOpts {
  threshold?: number
  once?: boolean
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  opts: UseInViewOpts = { threshold: 0.25, once: true }
) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
            if (opts.once) io.unobserve(el)
          } else if (!opts.once) {
            setInView(false)
          }
        })
      },
      { threshold: opts.threshold ?? 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [opts.once, opts.threshold])

  return [ref, inView] as const
}

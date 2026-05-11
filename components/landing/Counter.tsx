'use client'

import { useEffect, useState } from 'react'
import { useInView } from '@/hooks/useInView'

interface CounterProps {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
}

export default function Counter({ to, suffix = '', prefix = '', duration = 1400 }: CounterProps) {
  const [ref, inView] = useInView<HTMLSpanElement>()
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf: number
    let start: number | null = null
    const step = (t: number) => {
      if (start === null) start = t
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  return (
    <span ref={ref} className="mono">
      {prefix}
      {val}
      {suffix}
    </span>
  )
}

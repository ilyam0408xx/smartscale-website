'use client'

import { Fragment, useEffect, useState } from 'react'
import { useInView } from '@/hooks/useInView'
import FlowIcon, { type IconKind } from './FlowIcon'

const FLOW_NODES: { icon: IconKind; label: string; sub: string }[] = [
  { icon: 'lead', label: 'ליד חדש', sub: 'אתר / מודעה' },
  { icon: 'wa', label: 'בוט WhatsApp', sub: 'מענה מיידי' },
  { icon: 'crm', label: 'CRM', sub: 'נפתח כרטיס' },
  { icon: 'doc', label: 'הצעת מחיר', sub: 'מסמך אוטומטי' },
  { icon: 'bell', label: 'תזכורות', sub: 'יום לפני • שעה לפני' },
]

export default function AutomationFlow() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2, once: false })
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setPulse((p) => (p + 1) % FLOW_NODES.length), 1100)
    return () => clearInterval(id)
  }, [inView])

  return (
    <div ref={ref} className="flow" aria-label="תרשים אוטומציה">
      <div className="flow-track">
        {FLOW_NODES.map((n, i) => (
          <Fragment key={i}>
            <div className={`flow-node ${pulse === i ? 'is-on' : ''}`}>
              <div className="flow-icon">
                <FlowIcon kind={n.icon} />
              </div>
              <div className="flow-meta">
                <div className="flow-label">{n.label}</div>
                <div className="flow-sub">{n.sub}</div>
              </div>
            </div>
            {i < FLOW_NODES.length - 1 && (
              <div className={`flow-edge ${pulse > i ? 'is-on' : ''}`} aria-hidden="true">
                <span className="flow-dot" style={{ animationDelay: `${i * 0.1}s` }}></span>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

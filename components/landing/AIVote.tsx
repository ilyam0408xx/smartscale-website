'use client'

import { useState } from 'react'

export default function AIVote() {
  const [vote, setVote] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    try {
      return localStorage.getItem('ss_aivote') || null
    } catch {
      return null
    }
  })

  const cast = (val: 'yes' | 'no') => {
    if (vote) return
    setVote(val)
    try {
      localStorage.setItem('ss_aivote', val)
    } catch {
      // ignore
    }
  }

  return (
    <div className="aivote">
      <div className={`aivote-cap ${vote ? 'is-result' : ''}`}>
        {!vote ? (
          'כן, AI עשה את התמונה, נראה טוב?'
        ) : (
          <>
            <span>83% מהאנשים הגיבו &ldquo;כן&rdquo;</span> · <span>17% הגיבו &ldquo;לא&rdquo;</span>
          </>
        )}
      </div>
      <div className={`aivote-buttons ${vote ? 'is-hidden' : ''}`} aria-hidden={!!vote}>
        <button className="aivote-btn" onClick={() => cast('yes')} disabled={!!vote}>
          כן
        </button>
        <button className="aivote-btn" onClick={() => cast('no')} disabled={!!vote}>
          לא
        </button>
      </div>
      <div className={`aivote-bar ${vote ? 'is-on' : ''}`} aria-hidden={!vote}>
        <div className="aivote-bar-fill" style={{ width: vote ? '83%' : '0%' }}></div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

interface YouTubeEmbedProps {
  id: string
  title: string
}

export default function YouTubeEmbed({ id, title }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false)
  const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`

  if (playing) {
    return (
      <iframe
        className="yt-frame"
        src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <button
      className="yt-btn"
      onClick={() => setPlaying(true)}
      aria-label={`נגן עדות של ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="yt-thumb" src={thumb} alt="" loading="lazy" />
      <span className="yt-play" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  )
}

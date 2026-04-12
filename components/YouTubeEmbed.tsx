'use client'

import { useState } from 'react'
import Image from 'next/image'

interface YouTubeEmbedProps {
  videoId: string
  title: string
  portrait?: boolean // true for YouTube Shorts (9:16)
}

export default function YouTubeEmbed({ videoId, title, portrait = false }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false)

  const aspectRatio = portrait ? '9 / 16' : '16 / 9'
  const maxHeight = portrait ? 480 : 'none'

  if (playing) {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio,
          maxHeight,
          borderRadius: 12,
          overflow: 'hidden',
          background: '#000',
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>
    )
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      aria-label={`נגן סרטון: ${title}`}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        maxHeight,
        borderRadius: 12,
        overflow: 'hidden',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        display: 'block',
        background: '#000',
      }}
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 320px"
        style={{ objectFit: 'cover', transition: 'opacity 0.2s' }}
        loading="lazy"
      />

      {/* Dark overlay on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.25)',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.45)')
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.25)')
        }
      />

      {/* Play button */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
      >
        {/* YouTube-style triangle */}
        <svg viewBox="0 0 24 24" width={28} height={28} style={{ marginInlineStart: 3 }}>
          <path d="M8 5v14l11-7z" fill="#ff0000" />
        </svg>
      </div>
    </button>
  )
}

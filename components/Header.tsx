'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const NAV_LINKS: { id: string; label: string }[] = [
  { id: 'services', label: 'שירותים' },
  { id: 'demo', label: 'הדגמה חיה' },
  { id: 'testimonials', label: 'המלצות' },
  { id: 'story', label: 'עליי' },
  { id: 'faq', label: 'שאלות' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const onHomepage = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleAnchor(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    if (onHomepage) {
      // Let the layout's smooth-scroll IIFE handle it
      return
    }
    // From sub-page → navigate to homepage with hash
    e.preventDefault()
    router.push('/#' + id)
  }

  return (
    <nav className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link href="/" className="brand" aria-label="Smart Scale — דף הבית">
          <div className="brand-mark" aria-hidden="true">
            <Image
              src="/images/logo.png"
              alt="Smart Scale"
              width={40}
              height={40}
              className="brand-logo-img"
              priority
            />
          </div>
        </Link>

        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <a key={link.id} href={'#' + link.id} onClick={(e) => handleAnchor(e, link.id)}>
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={onHomepage ? '#contact' : '/#contact'}
          onClick={(e) => handleAnchor(e, 'contact')}
          className="btn btn-primary nav-cta"
        >
          <span>שיחת יעוץ חינם</span>
          <span className="btn-arrow" aria-hidden="true">
            ←
          </span>
        </a>
      </div>
    </nav>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { WA_LINK } from '@/lib/schema'

type NavLink =
  | { kind: 'anchor'; id: string; label: string }
  | { kind: 'page'; href: string; label: string }

const NAV_LINKS: NavLink[] = [
  { kind: 'anchor', id: 'services', label: 'שירותים' },
  { kind: 'anchor', id: 'demo', label: 'הדגמה חיה' },
  { kind: 'anchor', id: 'testimonials', label: 'המלצות' },
  { kind: 'page', href: '/about', label: 'עליי' },
  { kind: 'page', href: '/blog', label: 'בלוג' },
  { kind: 'anchor', id: 'faq', label: 'שאלות' },
]

const SERVICE_LINKS: { href: string; label: string }[] = [
  { href: '/crm', label: 'מערכת ניהול לקוחות' },
  { href: '/whatsapp-bot', label: 'בוט WhatsApp' },
  { href: '/automation', label: 'אוטומציה' },
  { href: '/lead-gen', label: 'מציאת לקוחות' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const onHomepage = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  function handleAnchor(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    if (onHomepage) return
    e.preventDefault()
    router.push('/#' + id)
  }

  function closeDrawer() {
    setMobileOpen(false)
  }

  return (
    <>
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
            <div className="brand-text">
              <div className="brand-name">Smart Scale</div>
            </div>
          </Link>

          <div className="nav-links">
            {NAV_LINKS.map((link) =>
              link.kind === 'anchor' ? (
                <a
                  key={link.id}
                  href={'#' + link.id}
                  onClick={(e) => handleAnchor(e, link.id)}
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              )
            )}
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

          <button
            type="button"
            className="nav-hamburger"
            aria-label="פתח תפריט"
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMobileOpen(true)}
          >
            <span className="hamburger-lines">
              <span></span>
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`drawer-overlay ${mobileOpen ? 'is-open' : ''}`}
        aria-hidden="true"
        onClick={closeDrawer}
      />

      <aside
        id="mobile-drawer"
        className={`drawer ${mobileOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="תפריט ראשי"
        aria-hidden={!mobileOpen}
      >
        <div className="drawer-head">
          <div className="drawer-eyebrow mono">תפריט</div>
          <button
            type="button"
            className="drawer-close"
            aria-label="סגור תפריט"
            onClick={closeDrawer}
          >
            ×
          </button>
        </div>

        <div className="drawer-section-h mono">דף הבית</div>
        <Link href="/#services" onClick={closeDrawer}>שירותים</Link>
        <Link href="/#demo" onClick={closeDrawer}>הדגמה חיה</Link>
        <Link href="/#testimonials" onClick={closeDrawer}>המלצות</Link>
        <Link href="/#faq" onClick={closeDrawer}>שאלות</Link>

        <div className="drawer-section-h mono">שירותים</div>
        {SERVICE_LINKS.map((s) => (
          <Link key={s.href} href={s.href} onClick={closeDrawer}>
            {s.label}
          </Link>
        ))}

        <div className="drawer-section-h mono">עוד</div>
        <Link href="/about" onClick={closeDrawer}>עליי</Link>
        <Link href="/blog" onClick={closeDrawer}>בלוג</Link>
        <Link href="/faq" onClick={closeDrawer}>שאלות של לקוחות</Link>

        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="drawer-cta"
        >
          <span>שיחת יעוץ חינם</span>
          <span aria-hidden="true">←</span>
        </a>
      </aside>
    </>
  )
}

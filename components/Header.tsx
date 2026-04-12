'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle anchor navigation: smooth scroll on homepage, navigate+scroll from other pages
  function handleAnchorClick(e: React.MouseEvent, sectionId: string) {
    e.preventDefault()
    setMenuOpen(false)

    if (pathname === '/') {
      // Already on homepage — just smooth scroll
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Navigate to homepage, then scroll once it loads
      router.push('/#' + sectionId)
    }
  }

  const navLinks: { href: string; label: string; anchor?: string }[] = [
    { href: '/', label: 'דף הבית' },
    { href: '#services', label: 'שירותים', anchor: 'services' },
    { href: '#testimonials', label: 'המלצות', anchor: 'testimonials' },
    { href: '/blog', label: 'בלוג' },
    { href: '#contact', label: 'דברו איתי', anchor: 'contact' },
  ]

  const linkStyle = {
    color: '#0a0a0a' as const,
    transition: 'color 0.2s',
    textDecoration: 'none' as const,
    cursor: 'pointer' as const,
  }

  function renderLink(link: (typeof navLinks)[0], mobile = false) {
    const style = mobile
      ? { fontSize: 16, fontWeight: 500, ...linkStyle }
      : linkStyle

    if (link.anchor) {
      return (
        <a
          key={link.href}
          href={'/#' + link.anchor}
          style={style}
          onClick={(e) => handleAnchorClick(e, link.anchor!)}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#0ea5e9')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#0a0a0a')}
        >
          {link.label}
        </a>
      )
    }

    return (
      <Link
        key={link.href}
        href={link.href}
        style={style}
        onClick={() => setMenuOpen(false)}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#0ea5e9')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#0a0a0a')}
      >
        {link.label}
      </Link>
    )
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        insetInline: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: 64,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        boxShadow: scrolled ? '0 1px 0 #e5e5e5' : 'none',
        transition: 'background 0.25s, box-shadow 0.25s',
      }}
    >
      <Link href="/" aria-label="Smart Scale — דף הבית">
        <Image
          src="/images/logo.png"
          alt="Smart Scale לוגו"
          width={120}
          height={40}
          style={{ objectFit: 'contain', height: 40, width: 'auto' }}
          priority
        />
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex gap-8" style={{ fontSize: 15, fontWeight: 500 }}>
        {navLinks.map((link) => renderLink(link))}
      </div>

      {/* Hamburger */}
      <button
        className="md:hidden flex flex-col justify-center gap-[5px] p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="תפריט"
        aria-expanded={menuOpen}
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span style={{ display: 'block', width: 24, height: 2, background: '#0a0a0a', transition: 'transform 0.2s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
        <span style={{ display: 'block', width: 24, height: 2, background: '#0a0a0a', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
        <span style={{ display: 'block', width: 24, height: 2, background: '#0a0a0a', transition: 'transform 0.2s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
      </button>

      {/* Mobile menu */}
      <div
        style={{
          position: 'absolute',
          top: 64,
          insetInlineStart: 0,
          insetInlineEnd: 0,
          background: '#fff',
          borderTop: menuOpen ? '1px solid #e5e5e5' : 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          boxShadow: menuOpen ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
          overflow: 'hidden',
          maxHeight: menuOpen ? 320 : 0,
          padding: menuOpen ? '20px 40px' : '0 40px',
          opacity: menuOpen ? 1 : 0,
          transition: 'max-height 0.35s ease, opacity 0.25s ease, padding 0.35s ease',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {navLinks.map((link) => renderLink(link, true))}
      </div>
    </nav>
  )
}

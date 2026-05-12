import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link href="/" className="brand" aria-label="Smart Scale — דף הבית">
            <div className="brand-mark" aria-hidden="true">
              <Image
                src="/images/logo.png"
                alt="Smart Scale"
                width={56}
                height={56}
                className="brand-logo-img"
              />
            </div>
            <div className="brand-text" style={{ display: 'block' }}>
              <div className="brand-name">Smart Scale</div>
              <div className="brand-sub">איליה מלצב • 2026</div>
            </div>
          </Link>
          <p className="footer-tag">מערכות חכמות לעסקים. עובדות 24/7 — בלי שתגע בהן.</p>
        </div>
        <div className="footer-cols">
          <div className="footer-col">
            <div className="footer-col-h mono">ניווט</div>
            <Link href="/#services">שירותים</Link>
            <Link href="/#demo">הדגמה</Link>
            <Link href="/#testimonials">המלצות</Link>
            <Link href="/#faq">שאלות</Link>
            <Link href="/about">עליי</Link>
            <Link href="/blog">בלוג</Link>
            <Link href="/faq">שאלות של לקוחות</Link>
          </div>
          <div className="footer-col">
            <div className="footer-col-h mono">שירותים</div>
            <Link href="/crm">מערכת ניהול לקוחות</Link>
            <Link href="/whatsapp-bot">בוט WhatsApp</Link>
            <Link href="/automation">אוטומציה</Link>
            <Link href="/lead-gen">מציאת לקוחות</Link>
          </div>
          <div className="footer-col">
            <div className="footer-col-h mono">יצירת קשר</div>
            <a href="https://wa.me/9720502611165" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a
              href="https://www.linkedin.com/in/ilya-maltsev-15238a19a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
          <div className="footer-col">
            <div className="footer-col-h mono">משפטי</div>
            <Link href="/privacy">מדיניות פרטיות</Link>
            <Link href="/terms">תנאי שימוש</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bot">
        <div className="mono">© 2026 Smart Scale. כל הזכויות שמורות.</div>
        <div className="mono">ilyamaltsev.com</div>
      </div>
    </footer>
  )
}

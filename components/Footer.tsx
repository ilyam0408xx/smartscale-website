export default function Footer() {
  return (
    <footer
      style={{
        background: '#0a0a0a',
        color: '#aaaaaa',
        textAlign: 'center',
        padding: '32px 40px',
        fontSize: 13,
      }}
    >
      <div className="wrap" style={{ maxWidth: 1000, margin: '0 auto' }}>
        <p>© 2025 Smart Scale. כל הזכויות שמורות.</p>
        <p style={{ marginTop: 8, fontSize: 12 }}>
          <a
            href="/privacy"
            style={{ color: '#aaaaaa', textDecoration: 'underline' }}
          >
            מדיניות פרטיות
          </a>
          &nbsp;|&nbsp;
          <a
            href="/terms"
            style={{ color: '#aaaaaa', textDecoration: 'underline' }}
          >
            תנאי שימוש
          </a>
        </p>
      </div>
    </footer>
  )
}

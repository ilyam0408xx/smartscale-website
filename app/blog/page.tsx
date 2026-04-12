import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'מדריכים לבעלי עסקים — חיסכון בזמן ואוטומציה',
  description:
    'מאמרים ומדריכים מעשיים לבעלי עסקים ישראליים על אוטומציה, ניהול לקוחות, בוטי WhatsApp, וחיסכון בזמן. כתוב על ידי איליה מלצב.',
  alternates: {
    canonical: 'https://ilyamaltsev.com/blog',
    languages: { he: 'https://ilyamaltsev.com/blog' },
  },
  openGraph: {
    title: 'בלוג Smart Scale — מדריכים לבעלי עסקים',
    description: 'מאמרים מעשיים על אוטומציה וניהול עסק חכם',
    url: 'https://ilyamaltsev.com/blog',
    locale: 'he_IL',
    type: 'website',
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'דף הבית', url: '/' },
          { name: 'בלוג', url: '/blog' },
        ])}
      />
      <Header />
      <main style={{ paddingTop: 100, paddingBottom: 80 }}>
        <div
          className="wrap"
          style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}
        >
          <p className="section-label">בלוג</p>
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 900,
              color: '#0a0a0a',
              marginBottom: 12,
            }}
          >
            מדריכים לבעלי עסקים
          </h1>
          <p className="direct-answer" style={{ marginBottom: 48 }}>
            מאמרים מעשיים על חיסכון בזמן, מניעת אובדן לידים, ואוטומציה
            לעסקים ישראליים. כל מאמר כתוב על בסיס ניסיון אמיתי עם עסקים
            ישראליים — לא תיאוריה.
          </p>

          {posts.length === 0 ? (
            <p style={{ color: '#6b6b6b', fontSize: 16 }}>
              מאמרים יתפרסמו בקרוב.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 24,
              }}
            >
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <article
                    className="blog-card"
                    style={{
                      border: '1px solid #e5e5e5',
                      borderRadius: 16,
                      padding: '24px',
                      height: '100%',
                    }}
                  >
                    <p
                      style={{
                        fontSize: 12,
                        color: '#aaaaaa',
                        marginBottom: 8,
                        fontWeight: 500,
                      }}
                    >
                      {post.date}
                    </p>
                    <h2
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: '#0a0a0a',
                        marginBottom: 10,
                        lineHeight: 1.4,
                      }}
                    >
                      {post.title}
                    </h2>
                    <p
                      style={{
                        fontSize: 14,
                        color: '#6b6b6b',
                        lineHeight: 1.6,
                      }}
                    >
                      {post.description}
                    </p>
                    <p
                      style={{
                        marginTop: 16,
                        fontSize: 14,
                        color: '#0ea5e9',
                        fontWeight: 600,
                      }}
                    >
                      קרא עוד ←
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

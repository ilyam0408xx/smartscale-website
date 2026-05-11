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
    'מאמרים ומדריכים מעשיים שאני כותב לבעלי עסקים ישראליים — על אוטומציה, ניהול לקוחות, בוטי WhatsApp, וחיסכון בזמן.',
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

// Placeholder categories shown on each card (rotated for variety).
const PLACEHOLDER_CATEGORIES = [
  'CRM · ניהול',
  'OCR · אוטומציה',
  'לידים · שיווק',
  'WhatsApp · בוטים',
]

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
      <main className="blog-index">
        <div className="blog-index-head">
          <div className="blog-index-eyebrow">בלוג</div>
          <h1 className="blog-index-title">מדריכים לבעלי עסקים</h1>
          <p className="blog-index-lead">
            מאמרים מעשיים על חיסכון בזמן, מניעת אובדן לידים, ואוטומציה לעסקים
            ישראליים. כל מאמר כתוב על בסיס ניסיון אמיתי עם עסקים ישראליים —
            לא תיאוריה.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="blog-index-head">
            <p className="blog-index-lead">מאמרים יתפרסמו בקרוב.</p>
          </div>
        ) : (
          <div className="related-grid blog-index-grid">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="related-card"
              >
                <div className="related-thumb">[ תמונה ]</div>
                <span className="related-cat">
                  {PLACEHOLDER_CATEGORIES[i % PLACEHOLDER_CATEGORIES.length]}
                </span>
                <div className="related-title">{post.title}</div>
                <div className="related-meta">
                  {post.readingTime} דק׳ קריאה
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

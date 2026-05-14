import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import JsonLd from '@/components/JsonLd'
import { articleSchema, breadcrumbSchema, personSchema, WA_LINK } from '@/lib/schema'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog'

const PLACEHOLDER_CATEGORIES = [
  'CRM · ניהול',
  'OCR · אוטומציה',
  'לידים · שיווק',
  'WhatsApp · בוטים',
]

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: {
      canonical: `https://ilyamaltsev.com/blog/${slug}`,
      languages: { he: `https://ilyamaltsev.com/blog/${slug}` },
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      url: `https://ilyamaltsev.com/blog/${slug}`,
      locale: 'he_IL',
      type: 'article',
      publishedTime: post.meta.datePublished,
      images: post.meta.cover
        ? [{
            url: `https://ilyamaltsev.com${post.meta.cover}`,
            alt: post.meta.coverAlt || post.meta.title,
          }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.description,
      images: post.meta.cover
        ? [`https://ilyamaltsev.com${post.meta.cover}`]
        : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const { meta, content } = post
  const relatedPosts = await getRelatedPosts(slug, 3)

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: meta.title,
          description: meta.description,
          url: `/blog/${slug}`,
          datePublished: meta.datePublished,
          dateModified: meta.datePublished,
          image: meta.cover,
        })}
      />
      <JsonLd data={personSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'דף הבית', url: '/' },
          { name: 'בלוג', url: '/blog' },
          { name: meta.title, url: `/blog/${slug}` },
        ])}
      />

      <Header />
      <main>
        <article className="blog-article">
          <nav className="crumb" aria-label="ניווט">
            <Link href="/">דף הבית</Link>
            <span className="sep">›</span>
            <Link href="/blog">בלוג</Link>
            <span className="sep">›</span>
            <span>{meta.title}</span>
          </nav>

          <div className="article-hero" aria-label="תמונה ראשית">
            {meta.cover ? (
              <img src={meta.cover} alt={meta.coverAlt || meta.title} />
            ) : (
              '[ תמונה תוטמע כאן ]'
            )}
          </div>

          <header className="article-header">
            <h1 className="article-title">{meta.title}</h1>
            <div className="byline">
              <strong>{meta.author}</strong>
              {' · '}
              {meta.date}
              {' · '}
              {meta.readingTime} דק׳ קריאה
            </div>
          </header>

          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="cta-block">
            <div className="cta-eyebrow">שיחת ייעוץ חינם</div>
            <div className="cta-line">בוא נראה איך זה יעבוד אצלך</div>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-wa"
            >
              <span>שיחה ב-WhatsApp</span>
              <span className="cta-wa-arrow" aria-hidden="true">←</span>
            </a>
          </div>

          <section className="related" aria-label="להמשך קריאה">
            <div className="related-head">
              <span className="related-eyebrow">להמשך קריאה</span>
              <Link href="/blog" className="related-all">כל הכתבות ←</Link>
            </div>
            <div className="related-grid">
              {relatedPosts.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="related-card"
                >
                  <div className="related-thumb">
                    {p.cover ? (
                      <img src={p.cover} alt={p.coverAlt || p.title} />
                    ) : (
                      '[ תמונה ]'
                    )}
                  </div>
                  <span className="related-cat">
                    {PLACEHOLDER_CATEGORIES[i % PLACEHOLDER_CATEGORIES.length]}
                  </span>
                  <div className="related-title">{p.title}</div>
                  <div className="related-meta">{p.readingTime} דק׳ קריאה</div>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

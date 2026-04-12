import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import JsonLd from '@/components/JsonLd'
import { articleSchema, breadcrumbSchema, personSchema, WA_LINK } from '@/lib/schema'
import { getAllPosts, getPostBySlug } from '@/lib/blog'

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
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const { meta, content } = post

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: meta.title,
          description: meta.description,
          url: `/blog/${slug}`,
          datePublished: meta.datePublished,
          dateModified: meta.datePublished,
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
      <main style={{ paddingTop: 100, paddingBottom: 80 }}>
        <article
          className="wrap"
          style={{ maxWidth: 720, margin: '0 auto', padding: '0 40px' }}
        >
          {/* Breadcrumb */}
          <nav
            style={{
              fontSize: 13,
              color: '#aaaaaa',
              marginBottom: 32,
              display: 'flex',
              gap: 8,
              alignItems: 'center',
            }}
            aria-label="ניווט"
          >
            <Link href="/" style={{ color: '#aaaaaa' }}>
              דף הבית
            </Link>
            <span>›</span>
            <Link href="/blog" style={{ color: '#aaaaaa' }}>
              בלוג
            </Link>
            <span>›</span>
            <span style={{ color: '#6b6b6b' }}>{meta.title}</span>
          </nav>

          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 900,
              color: '#0a0a0a',
              lineHeight: 1.2,
              marginBottom: 20,
            }}
          >
            {meta.title}
          </h1>

          {/* Author byline */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 40,
              paddingBottom: 24,
              borderBottom: '1px solid #e5e5e5',
            }}
          >
            <Image
              src="/images/ilya.jpg"
              alt="איליה מלצב"
              width={40}
              height={40}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <p style={{ fontWeight: 600, fontSize: 14, color: '#0a0a0a' }}>
                {meta.author}
              </p>
              <p style={{ fontSize: 13, color: '#aaaaaa' }}>
                {meta.date}
                {' · '}
                עודכן לאחרונה: {meta.date}
              </p>
            </div>
          </div>

          {/* Article content */}
          <div
            className="prose"
            style={{ fontSize: 17 }}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* CTA at end of article */}
          <div
            style={{
              marginTop: 60,
              padding: '32px',
              background: '#f0f9ff',
              borderRadius: 16,
              border: '1px solid #bae6fd',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                fontWeight: 800,
                fontSize: 20,
                color: '#0a0a0a',
                marginBottom: 8,
              }}
            >
              רוצה לראות איך זה עובד אצלך?
            </h3>
            <p
              style={{
                color: '#6b6b6b',
                marginBottom: 20,
                fontSize: 16,
              }}
            >
              שיחת ייעוץ חינם, בלי התחייבות. 15 דקות שיכולות לשנות את האופן
              שבו העסק שלך עובד.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 28px',
                background: '#25D366',
                color: '#fff',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
                textDecoration: 'none',
              }}
            >
              שיחת ייעוץ חינם ב-WhatsApp
            </a>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

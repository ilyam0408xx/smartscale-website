import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SponsoredBanner from '@/components/promo/SponsoredBanner'
import WhatsAppCTA from '@/components/promo/WhatsAppCTA'
import CopyButtonEnhancer from '@/components/promo/CopyButtonEnhancer'
import { getAllPromoSlugs, getPromoBySlug } from '@/lib/promo'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPromoSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const promo = await getPromoBySlug(slug)
  if (!promo) return { robots: { index: false, follow: true } }

  return {
    title: promo.meta.title,
    description: promo.meta.description,
    robots: {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    },
    openGraph: {
      title: promo.meta.title,
      description: promo.meta.description,
      url: `https://ilyamaltsev.com/promo/${slug}`,
      locale: 'he_IL',
      type: 'article',
    },
  }
}

export default async function PromoPage({ params }: Props) {
  const { slug } = await params
  const promo = await getPromoBySlug(slug)
  if (!promo) notFound()

  const { meta, sections } = promo

  return (
    <>
      <SponsoredBanner label={meta.sponsoredLabel} />

      <main className="promo-article">
        <article className="promo-body">
          <div className="promo-hero" aria-label="תמונה ראשית">
            {meta.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={meta.cover} alt={meta.coverAlt || meta.title} />
            ) : (
              '[ תמונה תוטמע כאן ]'
            )}
          </div>

          <header className="promo-header">
            <h1 className="promo-title">{meta.title}</h1>
            {meta.subhead && <p className="promo-subhead">{meta.subhead}</p>}
          </header>

          <div
            className="prose promo-prose"
            dangerouslySetInnerHTML={{ __html: sections.beforeAboveFold }}
          />

          <WhatsAppCTA position="above-fold" label={meta.ctaAboveFold} />

          <div
            className="prose promo-prose"
            dangerouslySetInnerHTML={{ __html: sections.betweenAboveFoldAndMid }}
          />

          <WhatsAppCTA position="mid" label={meta.ctaMid} />

          <div
            className="prose promo-prose"
            dangerouslySetInnerHTML={{ __html: sections.betweenMidAndEnd }}
          />

          <WhatsAppCTA position="end" label={meta.ctaEnd} primary />

          {sections.afterEnd.trim() && (
            <div
              className="prose promo-prose"
              dangerouslySetInnerHTML={{ __html: sections.afterEnd }}
            />
          )}
        </article>

        <footer className="promo-footer" role="contentinfo">
          <div className="promo-footer__brand">
            <strong>Smart Scale</strong>
            <span className="promo-footer__sep">·</span>
            <span>ilyamaltsev.com</span>
            <span className="promo-footer__sep">·</span>
            <a href="tel:0502611165">050-261-1165</a>
          </div>
          <div className="promo-footer__links">
            <a href="/privacy" target="_blank" rel="noopener">מדיניות פרטיות</a>
            <span className="promo-footer__sep">·</span>
            <a href="/terms" target="_blank" rel="noopener">תנאי שימוש</a>
            <span className="promo-footer__sep">·</span>
            <a href="mailto:im@ilyamaltsev.com">im@ilyamaltsev.com</a>
          </div>
          <div className="promo-disclosure">
            {meta.sponsoredLabel}
          </div>
        </footer>
      </main>

      <CopyButtonEnhancer />
    </>
  )
}

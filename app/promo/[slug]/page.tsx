import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SponsoredBanner from '@/components/promo/SponsoredBanner'
import WhatsAppCTA from '@/components/promo/WhatsAppCTA'
import StickyMobileCTA from '@/components/promo/StickyMobileCTA'
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

      <StickyMobileCTA label={meta.ctaEnd} slug={slug} />
    </>
  )
}

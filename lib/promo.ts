// Promo (Outbrain advertorial) content loader.
//
// Mirrors lib/blog.ts but for content/promo/<slug>.mdx. Differences:
// - No FAQ transform, no mid-figure injection, no readingTime
// - frontmatter includes `sponsored_label`, `campaign`, `tier` + 3 CTA labels
// - Splits content at <!--cta:above-fold-->, <!--cta:mid-->, <!--cta:end-->
//   markers so page.tsx can render React CTA components between segments

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export interface PromoMeta {
  slug: string
  title: string
  description: string
  date: string
  campaign: string
  tier: number
  sponsoredLabel: string
  ctaAboveFold: string
  ctaMid: string
  ctaEnd: string
}

export interface PromoSections {
  // HTML segments separated by CTA markers. Always has 4 entries
  // (some may be empty if writer omitted a marker).
  beforeAboveFold: string
  betweenAboveFoldAndMid: string
  betweenMidAndEnd: string
  afterEnd: string
}

const PROMO_DIR = path.join(process.cwd(), 'content', 'promo')

const MARKER_ABOVE_FOLD = '<!--cta:above-fold-->'
const MARKER_MID = '<!--cta:mid-->'
const MARKER_END = '<!--cta:end-->'

function buildMeta(slug: string, data: Record<string, unknown>): PromoMeta {
  return {
    slug,
    title: (data.title as string) || '',
    description: (data.description as string) || '',
    date: (data.date as string) || '',
    campaign: (data.campaign as string) || slug,
    tier: (data.tier as number) || 2,
    sponsoredLabel:
      (data.sponsored_label as string) || 'כתבה פרסומית מטעם Smart Scale',
    ctaAboveFold:
      (data.cta_above_fold as string) || 'בואו נראה איך זה עובד אצלכם',
    ctaMid: (data.cta_mid as string) || 'זה נשמע רלוונטי? בואו נדבר',
    ctaEnd: (data.cta_end as string) || 'שיחה בוואטסאפ',
  }
}

function splitAtMarker(html: string, marker: string): [string, string] {
  const idx = html.indexOf(marker)
  if (idx === -1) return [html, '']
  return [html.slice(0, idx), html.slice(idx + marker.length)]
}

export async function getAllPromoSlugs(): Promise<string[]> {
  if (!fs.existsSync(PROMO_DIR)) return []
  return fs
    .readdirSync(PROMO_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
}

export async function getPromoBySlug(
  slug: string
): Promise<{ meta: PromoMeta; sections: PromoSections } | null> {
  const filePath = path.join(PROMO_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const meta = buildMeta(slug, data)

  // Render markdown to HTML preserving HTML comment markers.
  // remark-html sanitize: false keeps the comments intact.
  const processed = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(content)
  const html = processed.toString()

  // Sequential split: first at above-fold, then split the tail at mid,
  // then split that tail at end.
  const [beforeAboveFold, afterAboveFold] = splitAtMarker(html, MARKER_ABOVE_FOLD)
  const [betweenAboveFoldAndMid, afterMid] = splitAtMarker(afterAboveFold, MARKER_MID)
  const [betweenMidAndEnd, afterEnd] = splitAtMarker(afterMid, MARKER_END)

  return {
    meta,
    sections: {
      beforeAboveFold,
      betweenAboveFoldAndMid,
      betweenMidAndEnd,
      afterEnd,
    },
  }
}

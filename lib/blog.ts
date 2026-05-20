import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  datePublished: string
  author: string
  tags: string[]
  readingTime: number
  cover?: string
  coverAlt?: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

function buildMeta(slug: string, data: Record<string, unknown>, content: string): PostMeta {
  return {
    slug,
    title: (data.title as string) || '',
    description: (data.description as string) || '',
    date: data.date
      ? new Date(data.date as string | Date).toLocaleDateString('he-IL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '',
    datePublished: (data.date as string) || '',
    author: (data.author as string) || 'איליה מלצב',
    tags: (data.tags as string[]) || [],
    readingTime: calcReadingTime(content),
    cover: (data.cover as string) || undefined,
    coverAlt: (data.coverAlt as string) || undefined,
  }
}

// A post is "published" (visible in blog index, related, sitemap) once it has
// a cover image. Posts without cover are placeholders — still reachable by
// direct URL but hidden from any listing.
export function isPublished(meta: PostMeta): boolean {
  return Boolean(meta.cover)
}

function readAllPostsRaw(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  return files.map((filename) => {
    const slug = filename.replace('.mdx', '')
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
    const { data, content } = matter(raw)
    return buildMeta(slug, data, content)
  })
}

export async function getAllPosts(): Promise<PostMeta[]> {
  return readAllPostsRaw()
    .filter(isPublished)
    .sort(
      (a, b) =>
        new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
    )
}

// Returns slugs for every MDX file, including unpublished placeholders.
// Used by generateStaticParams so direct URLs keep rendering.
export async function getAllPostSlugs(): Promise<string[]> {
  return readAllPostsRaw().map((p) => p.slug)
}

export async function getRelatedPosts(
  currentSlug: string,
  limit = 3
): Promise<PostMeta[]> {
  const all = await getAllPosts()
  return all.filter((p) => p.slug !== currentSlug).slice(0, limit)
}

const MID_FIGURE = `
<figure class="article-figure">
  <div class="article-image" aria-label="תמונה תוטמע כאן">
    [ תמונה תוטמע כאן ]
  </div>
  <figcaption class="article-caption">
    כיתוב לתמונה — אפשר להוסיף כאן הסבר קצר, מקור, או הקשר.
  </figcaption>
</figure>
`

function injectMidFigure(html: string): string {
  if (/<img\b/i.test(html) || /<figure\b/i.test(html)) return html
  // Split by closing </p> tags; inject the figure after the paragraph at ~50%.
  const parts = html.split(/<\/p>/i)
  if (parts.length < 4) return html // too short to bother
  const mid = Math.floor((parts.length - 1) / 2)
  parts[mid] = parts[mid] + '</p>' + MID_FIGURE
  // re-join the rest with </p>; the last element is the tail after the final </p>
  return parts
    .map((part, i) => {
      if (i === mid) return part
      if (i === parts.length - 1) return part
      return part + '</p>'
    })
    .join('')
}

// Turns the markdown FAQ (## שאלות נפוצות + **Q** / A pairs) into the
// two-column appendix layout. Idempotent — no-op if heading not found.
// Heading text may have a suffix (e.g. "שאלות נפוצות לקליניקות"); we keep it.
function transformFaqSection(html: string): string {
  const heading = html.match(/<h2>(שאלות נפוצות[^<]*)<\/h2>/)
  if (!heading) return html

  const headingText = heading[1]
  const headingIdx = heading.index!
  const before = html.slice(0, headingIdx)
  const after = html.slice(headingIdx + heading[0].length)

  // FAQ section ends at the next heading, the next <section>, or EOF.
  const endMatch = after.match(/<h[1-6]\b|<section\b/i)
  const sectionEnd = endMatch ? endMatch.index! : after.length
  const body = after.slice(0, sectionEnd)
  const tail = after.slice(sectionEnd)

  // Each Q/A is one <p><strong>Q</strong>...A</p>.
  const qaRe = /<p>\s*<strong>([\s\S]+?)<\/strong>\s*([\s\S]+?)<\/p>/g
  const items: { q: string; a: string }[] = []
  let m: RegExpExecArray | null
  while ((m = qaRe.exec(body)) !== null) {
    items.push({ q: m[1].trim(), a: m[2].trim() })
  }
  if (items.length === 0) return html

  const grid = items
    .map(
      ({ q, a }) =>
        `    <div class="faq__item">\n` +
        `      <p class="faq__q">${q}</p>\n` +
        `      <p class="faq__a">${a}</p>\n` +
        `    </div>`
    )
    .join('\n')

  const section =
    `<section class="faq" aria-labelledby="faq-heading">\n` +
    `  <p class="faq__kicker">FAQ</p>\n` +
    `  <h2 id="faq-heading" class="faq__heading">${headingText}</h2>\n` +
    `  <div class="faq__grid">\n${grid}\n  </div>\n` +
    `</section>\n`

  return before + section + tail
}

export async function getPostBySlug(
  slug: string
): Promise<{ meta: PostMeta; content: string } | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const meta = buildMeta(slug, data, content)

  const processed = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(content)

  const withFigure = injectMidFigure(processed.toString())
  const withFaq = transformFaqSection(withFigure)

  return { meta, content: withFaq }
}

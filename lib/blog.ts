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
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  const posts = files.map((filename) => {
    const slug = filename.replace('.mdx', '')
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
    const { data, content } = matter(raw)
    return buildMeta(slug, data, content)
  })

  return posts.sort(
    (a, b) =>
      new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  )
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

  const htmlWithFigure = injectMidFigure(processed.toString())

  return { meta, content: htmlWithFigure }
}

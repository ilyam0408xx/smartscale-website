import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  datePublished: string
  author: string
  tags: string[]
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  const posts = files.map((filename) => {
    const slug = filename.replace('.mdx', '')
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
    const { data } = matter(raw)

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date
        ? new Date(data.date).toLocaleDateString('he-IL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '',
      datePublished: data.date || '',
      author: data.author || 'איליה מלצב',
      tags: data.tags || [],
    }
  })

  return posts.sort(
    (a, b) =>
      new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  )
}

export async function getPostBySlug(
  slug: string
): Promise<{ meta: PostMeta; content: string } | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const meta: PostMeta = {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date
      ? new Date(data.date).toLocaleDateString('he-IL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '',
    datePublished: data.date || '',
    author: data.author || 'איליה מלצב',
    tags: data.tags || [],
  }

  return { meta, content }
}

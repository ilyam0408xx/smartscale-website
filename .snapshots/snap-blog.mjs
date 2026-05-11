import { chromium, devices } from 'playwright'
import { mkdir } from 'node:fs/promises'

const BASE = process.env.BASE || 'http://localhost:3000'
const ARTICLE_SLUG = process.env.SLUG || 'bot-whatsapp-letaskim'
const OUT = '.snapshots'
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()

async function snap(page, selector, file) {
  const el = await page.$(selector)
  if (!el) {
    console.log(`✗ ${file}.png — selector not found: ${selector}`)
    return
  }
  await el.scrollIntoViewIfNeeded()
  await page.waitForTimeout(400)
  await page
    .evaluate(async (sel) => {
      const root = document.querySelector(sel)
      if (!root) return
      const imgs = Array.from(root.querySelectorAll('img'))
      await Promise.all(
        imgs.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((r) => {
                img.addEventListener('load', r)
                img.addEventListener('error', r)
              })
        )
      )
    }, selector)
    .catch(() => {})
  await page.waitForTimeout(200)
  await el.screenshot({ path: `${OUT}/${file}.png` })
  console.log(`✓ ${file}.png`)
}

async function fullPage(page, file) {
  await page.screenshot({ path: `${OUT}/${file}.png`, fullPage: true })
  console.log(`✓ ${file}.png (full)`)
}

// ────────────────────────────────────────────────────────────────────────
// Desktop — blog index + article
// ────────────────────────────────────────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()

  await page.goto(`${BASE}/blog`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  await fullPage(page, 'blog-desktop-index-full')
  await snap(page, '.blog-index-head', 'blog-desktop-index-head')
  await snap(page, '.related-grid', 'blog-desktop-index-grid')

  await page.goto(`${BASE}/blog/${ARTICLE_SLUG}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  await fullPage(page, 'blog-desktop-article-full')
  await snap(page, '.crumb', 'blog-desktop-article-crumb')
  await snap(page, '.article-hero', 'blog-desktop-article-hero')
  await snap(page, '.article-header', 'blog-desktop-article-header')
  await snap(page, '.article-figure', 'blog-desktop-article-figure')
  await snap(page, '.cta-block', 'blog-desktop-article-cta')
  await snap(page, '.related', 'blog-desktop-article-related')

  await ctx.close()
}

// ────────────────────────────────────────────────────────────────────────
// Mobile (iPhone 13)
// ────────────────────────────────────────────────────────────────────────
{
  const ctx = await browser.newContext({ ...devices['iPhone 13'] })
  const page = await ctx.newPage()

  await page.goto(`${BASE}/blog`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  await fullPage(page, 'blog-mobile-index-full')

  await page.goto(`${BASE}/blog/${ARTICLE_SLUG}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  await fullPage(page, 'blog-mobile-article-full')
  await snap(page, '.article-hero', 'blog-mobile-article-hero')
  await snap(page, '.article-header', 'blog-mobile-article-header')
  await snap(page, '.article-figure', 'blog-mobile-article-figure')
  await snap(page, '.cta-block', 'blog-mobile-article-cta')
  await snap(page, '.related', 'blog-mobile-article-related')

  await ctx.close()
}

// ────────────────────────────────────────────────────────────────────────
// Tablet (iPad Mini)
// ────────────────────────────────────────────────────────────────────────
{
  const ctx = await browser.newContext({ ...devices['iPad Mini'] })
  const page = await ctx.newPage()

  await page.goto(`${BASE}/blog/${ARTICLE_SLUG}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  await fullPage(page, 'blog-tablet-article-full')

  await ctx.close()
}

await browser.close()
console.log('\nDone.')

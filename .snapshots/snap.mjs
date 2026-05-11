import { chromium, devices } from 'playwright'
import { mkdir } from 'node:fs/promises'

const URL = process.env.URL || 'http://localhost:3000/'
const OUT = '.snapshots'
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()

async function snap(page, selector, file, opts = {}) {
  const el = await page.$(selector)
  if (!el) return
  await el.scrollIntoViewIfNeeded()
  await page.waitForTimeout(opts.wait ?? 600)
  // wait for all images in this section to load
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

// Desktop
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })
  // Dismiss cookie banner if present
  await page.evaluate(() => {
    const banner = document.querySelector('[class*="cookie"], [class*="Cookie"]')
    if (banner) banner.remove()
  })
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${OUT}/desktop-full.png`, fullPage: true })
  console.log('✓ desktop-full.png')

  const sections = [
    { sel: 'header, main > section:first-of-type', label: 'hero' },
    { sel: '.pains', label: 'pains' },
    { sel: '.services', label: 'services' },
    { sel: '.stats', label: 'stats', wait: 1800 },
    { sel: '.demo', label: 'demo', wait: 4000 },
    { sel: '.testi', label: 'testimonials' },
    { sel: '.story', label: 'story', wait: 1500 },
    { sel: '.faq-sec', label: 'faq' },
    { sel: '.cta', label: 'cta' },
    { sel: '.footer', label: 'footer' },
  ]
  for (const s of sections) {
    await snap(page, s.sel, `desktop-${s.label}`, { wait: s.wait })
  }
  await ctx.close()
}

// Mobile (iPhone 13)
{
  const ctx = await browser.newContext({ ...devices['iPhone 13'] })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.evaluate(() => {
    const banner = document.querySelector('[class*="cookie"], [class*="Cookie"]')
    if (banner) banner.remove()
  })
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${OUT}/mobile-full.png`, fullPage: true })
  console.log('✓ mobile-full.png')

  const sections = [
    { sel: 'main > section:first-of-type', label: 'hero' },
    { sel: '.story', label: 'story', wait: 1500 },
    { sel: '.footer', label: 'footer' },
    { sel: '.demo', label: 'demo', wait: 4000 },
    { sel: '.testi', label: 'testi' },
    { sel: '.faq-sec', label: 'faqsec' },
    { sel: '.cta', label: 'cta' },
    { sel: '.stats', label: 'stats', wait: 1800 },
  ]
  for (const s of sections) {
    await snap(page, s.sel, `mobile-${s.label}`, { wait: s.wait })
  }
  await ctx.close()
}

// Tablet
{
  const ctx = await browser.newContext({ ...devices['iPad Mini'] })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.evaluate(() => {
    const banner = document.querySelector('[class*="cookie"], [class*="Cookie"]')
    if (banner) banner.remove()
  })
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${OUT}/tablet-full.png`, fullPage: true })
  console.log('✓ tablet-full.png')
  await snap(page, '.story', 'tablet-story', { wait: 1500 })
  await ctx.close()
}

await browser.close()
console.log('\nDone.')

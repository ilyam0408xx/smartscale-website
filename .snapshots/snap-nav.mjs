import { chromium, devices } from 'playwright'
import { mkdir } from 'node:fs/promises'

const BASE = process.env.BASE || 'http://localhost:3000'
const OUT = '.snapshots'
await mkdir(OUT, { recursive: true })

const PAGES = [
  { path: '/', name: 'home' },
  { path: '/blog', name: 'blog-index' },
  { path: '/blog/bot-whatsapp-letaskim', name: 'blog-article' },
  { path: '/crm', name: 'crm' },
  { path: '/whatsapp-bot', name: 'wa-bot' },
  { path: '/automation', name: 'automation' },
  { path: '/lead-gen', name: 'lead-gen' },
  { path: '/about', name: 'about' },
  { path: '/faq', name: 'faq' },
]

const browser = await chromium.launch()

async function snap(page, selector, file) {
  const el = await page.$(selector)
  if (!el) {
    console.log(`  ✗ ${file}.png — selector ${selector} not found`)
    return
  }
  await el.screenshot({ path: `${OUT}/${file}.png` })
  console.log(`  ✓ ${file}.png`)
}

async function topShot(page, file, viewport) {
  await page.screenshot({
    path: `${OUT}/${file}.png`,
    clip: { x: 0, y: 0, width: viewport.width, height: Math.min(900, viewport.height) },
  })
  console.log(`  ✓ ${file}.png (top)`)
}

async function footerShot(page, file) {
  const footer = await page.$('footer.footer')
  if (!footer) {
    console.log(`  ✗ ${file}.png — footer not found`)
    return
  }
  await footer.scrollIntoViewIfNeeded()
  await page.waitForTimeout(400)
  await footer.screenshot({ path: `${OUT}/${file}.png` })
  console.log(`  ✓ ${file}.png (footer)`)
}

// ─── Desktop 1440 ───────────────────────────────────────────────────────
{
  console.log('\n=== Desktop 1440 ===')
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  })
  const page = await ctx.newPage()

  for (const p of PAGES) {
    console.log(`\n[1440] ${p.path}`)
    await page.goto(`${BASE}${p.path}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(300)
    await topShot(page, `nav-d-${p.name}-top`, { width: 1440, height: 900 })
    await footerShot(page, `nav-d-${p.name}-footer`)
  }

  await ctx.close()
}

// ─── Mobile (iPhone 13, 390x844) ───────────────────────────────────────
{
  console.log('\n=== Mobile iPhone 13 ===')
  const ctx = await browser.newContext({ ...devices['iPhone 13'] })
  const page = await ctx.newPage()

  for (const p of PAGES) {
    console.log(`\n[mobile] ${p.path}`)
    await page.goto(`${BASE}${p.path}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(300)
    await topShot(page, `nav-m-${p.name}-top`, { width: 390, height: 700 })
    await footerShot(page, `nav-m-${p.name}-footer`)
  }

  // Mobile drawer open/close test on /
  console.log('\n[mobile drawer] testing open/close')
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  const ham = await page.$('.nav-hamburger')
  if (ham) {
    await ham.click()
    await page.waitForTimeout(400)
    await page.screenshot({ path: `${OUT}/nav-m-drawer-open.png` })
    console.log('  ✓ nav-m-drawer-open.png')
    const close = await page.$('.drawer-close')
    if (close) {
      await close.click()
      await page.waitForTimeout(400)
      await page.screenshot({ path: `${OUT}/nav-m-drawer-closed.png` })
      console.log('  ✓ nav-m-drawer-closed.png')
    }
  } else {
    console.log('  ✗ .nav-hamburger not found on mobile')
  }

  await ctx.close()
}

// ─── Tablet iPad Mini ───────────────────────────────────────────────────
{
  console.log('\n=== Tablet iPad Mini ===')
  const ctx = await browser.newContext({ ...devices['iPad Mini'] })
  const page = await ctx.newPage()

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  await topShot(page, 'nav-t-home-top', { width: 768, height: 900 })
  await footerShot(page, 'nav-t-home-footer')

  await page.goto(`${BASE}/blog/bot-whatsapp-letaskim`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  await topShot(page, 'nav-t-blog-article-top', { width: 768, height: 900 })

  await ctx.close()
}

await browser.close()
console.log('\nDone.')

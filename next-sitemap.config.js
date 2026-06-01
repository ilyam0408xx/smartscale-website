/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ilyamaltsev.com',
  generateRobotsTxt: false, // robots.txt is manual
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 1000,
  exclude: [
    '/404',
    '/promo/*',
    '/portfolio', // תיק עבודות טכני — noindex, קישור-בלבד

    // Placeholder blog posts — direct URL still works, but hidden from
    // sitemap. Combined with noindex meta in app/blog/[slug]/page.tsx.
    // Remove a slug from this list once its post gets a real cover image.
    '/blog/5-thalichim-leautmet',
    '/blog/bot-whatsapp-letaskim',
    '/blog/crm-klinika',
    '/blog/crm-letaskim-ktanim',
    '/blog/crm-nadlan',
    '/blog/ecommerce-automazia',
    '/blog/no-shows-klinika',
    '/blog/reacherful-100-lids',
    '/blog/soknuyot-20-shaot',
    '/blog/zihui-mismachim',
  ],
  additionalPaths: async () => [
    {
      loc: '/',
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/blog',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
  ],
}

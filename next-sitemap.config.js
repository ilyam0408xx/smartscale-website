/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ilyamaltsev.com',
  generateRobotsTxt: false, // robots.txt is manual
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 1000,
  exclude: ['/404'],
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

// Schema generation utilities for JSON-LD structured data

const BASE_URL = 'https://ilyamaltsev.com'

export const WA_LINK =
  'https://wa.me/9720502611165?text=%D7%94%D7%99%D7%99%20%D7%90%D7%99%D7%9C%D7%99%D7%94%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%99%D7%97%D7%AA%20%D7%99%D7%99%D7%A2%D7%95%D7%A5%20%D7%97%D7%99%D7%A0%D7%9D'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Smart Scale',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    founder: {
      '@type': 'Person',
      name: 'Ilya Maltsev',
      alternateName: 'איליה מלצב',
    },
    description:
      'Smart Scale בונה מערכות שחוסכות לעסקים ישראליים זמן ומונעות אבדן לידים — ניהול לקוחות, בוטי WhatsApp, ותזכורות אוטומטיות.',
    areaServed: { '@type': 'Country', name: 'IL' },
    inLanguage: 'he',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+972-50-261-1165',
      contactType: 'customer service',
      availableLanguage: 'Hebrew',
    },
    sameAs: [
      'https://www.instagram.com/ilyamaltsev.im',
      'https://www.linkedin.com/in/ilya-maltsev-15238a19a',
    ],
  }
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ilya Maltsev',
    alternateName: 'איליה מלצב',
    jobTitle: 'מייסד Smart Scale',
    url: BASE_URL,
    image: `${BASE_URL}/images/ilya.jpg`,
    description:
      'איליה מלצב הוא מייסד Smart Scale — חברה לבניית מערכות אוטומציה לעסקים ישראליים. מגיל 14 בונה מערכות, 7+ שנות ניסיון.',
    knowsAbout: [
      'מערכות ניהול לקוחות',
      'בוטי WhatsApp לעסקים',
      'אוטומציה עסקית',
      'גנרציית לידים',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Smart Scale',
    },
    sameAs: [
      'https://www.instagram.com/ilyamaltsev.im',
      'https://www.linkedin.com/in/ilya-maltsev-15238a19a',
    ],
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Smart Scale',
    url: BASE_URL,
    inLanguage: 'he',
    description: 'מערכות חכמות לעסקים ישראליים',
  }
}

interface FAQItem {
  question: string
  answer: string
}

export function faqSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

interface BreadcrumbItem {
  name: string
  url: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  }
}

interface ArticleSchemaProps {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  image?: string
}

export function articleSchema(props: ArticleSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.title,
    description: props.description,
    url: `${BASE_URL}${props.url}`,
    datePublished: props.datePublished,
    dateModified: props.dateModified || props.datePublished,
    image: props.image || `${BASE_URL}/og/homepage.webp`,
    author: {
      '@type': 'Person',
      name: 'Ilya Maltsev',
      alternateName: 'איליה מלצב',
      url: `${BASE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Smart Scale',
      url: BASE_URL,
    },
    inLanguage: 'he',
  }
}

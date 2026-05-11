import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import Hero from '@/components/landing/Hero'
import PainPoints from '@/components/landing/PainPoints'
import Services from '@/components/landing/Services'
import Stats from '@/components/landing/Stats'
import LiveDemo from '@/components/landing/LiveDemo'
import Testimonials from '@/components/landing/Testimonials'
import Story from '@/components/landing/Story'
import FAQSection from '@/components/landing/FAQSection'
import { HOMEPAGE_FAQS } from '@/components/landing/faqs'
import CTA from '@/components/landing/CTA'
import {
  organizationSchema,
  personSchema,
  webSiteSchema,
  faqSchema,
} from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Smart Scale — מערכות חכמות לעסקים',
  description:
    'מערכות אוטומטיות שעובדות בשביל העסק שלך — כל ליד מקבל מענה תוך 2 דקות, תזכורות יוצאות לבד, ניירת מסתדרת אוטומטית. 7+ שנות ניסיון, שוק ישראלי בלבד.',
  alternates: {
    canonical: 'https://ilyamaltsev.com',
    languages: { he: 'https://ilyamaltsev.com' },
  },
  openGraph: {
    title: 'Smart Scale — מערכות חכמות לעסקים',
    description:
      'מערכות אוטומטיות שעובדות בשביל העסק שלך — מענה, תזכורות, ניירת — בלי שתגע.',
    url: 'https://ilyamaltsev.com',
    locale: 'he_IL',
    type: 'website',
    images: [
      {
        url: 'https://ilyamaltsev.com/og/homepage.webp',
        width: 1200,
        height: 630,
        alt: 'Smart Scale — מערכות חכמות לעסקים ישראליים, איליה מלצב',
      },
    ],
  },
}

const faqsForSchema = HOMEPAGE_FAQS.map((f) => ({ question: f.q, answer: f.a }))

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={personSchema()} />
      <JsonLd data={webSiteSchema()} />
      <JsonLd data={faqSchema(faqsForSchema)} />

      <Header />
      <main>
        <Hero />
        <PainPoints />
        <Services />
        <Stats />
        <LiveDemo />
        <Testimonials />
        <Story />
        <FAQSection />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

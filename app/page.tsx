import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import Hero from '@/components/landing/Hero'
import PainPoints from '@/components/landing/PainPoints'
import Services from '@/components/landing/Services'
import Stats from '@/components/landing/Stats'
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

const homepageFAQs = [
  {
    question: 'מה זה Smart Scale?',
    answer:
      'אני איליה מלצב, ובניתי את Smart Scale כדי לבנות מערכות אוטומטיות לעסקים ישראליים קטנים ובינוניים. המערכות שאני בונה מחליפות עבודה ידנית חוזרת — כל ליד מקבל מענה תוך 2 דקות, תזכורות יוצאות לבד, ומסמכים מסתדרים אוטומטית. 7+ שנות ניסיון.',
  },
  {
    question: 'האם אני צריך לדעת טכנולוגיה?',
    answer:
      'לא. המערכת עובדת עם הכלים שכבר יש לך — WhatsApp, Google Drive, Gmail. לא צריך ללמוד שום תוכנה חדשה. אני מלווה אותך עד שהכל עובד, ומדריך אותך בפשטות.',
  },
  {
    question: 'מה קורה אם משהו לא עובד אחרי ההקמה?',
    answer:
      'כל מערכת כוללת 45 ימי תמיכה ותיקונים ללא עלות נוספת. אם יש בעיה — שולחים הודעה ב-WhatsApp ומקבלים מענה תוך שעות. לרוב תקלות מתוקנות תוך יום עסקים.',
  },
  {
    question: 'האם זה מתאים לעסק קטן?',
    answer:
      'כן — במיוחד לעסק קטן. עסק עם 1-10 עובדים מרוויח הכי הרבה מאוטומציה כי כל שעה שנחסכת שווה יותר. עסקים קטנים שבניתי להם מערכות חוסכים בממוצע 15 שעות עבודה בשבוע.',
  },
]

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={personSchema()} />
      <JsonLd data={webSiteSchema()} />
      <JsonLd data={faqSchema(homepageFAQs)} />

      <Header />
      <main>
        <Hero />
        <PainPoints />
        <Services />
        <Stats />

        {/* Phase 2 Part B placeholders — will be replaced by LiveDemo, Testimonials, Story, FAQSection */}
        <div id="demo" />
        <div id="testimonials" />
        <div id="story" />
        <div id="faq" />

        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

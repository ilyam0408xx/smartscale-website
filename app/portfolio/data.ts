// ════════════════════════════════════════════════════════════════════════
// PORTFOLIO DATA — מקור-האמת לרינדור של ilyamaltsev.com/portfolio
// ════════════════════════════════════════════════════════════════════════
// קהל טכני (סוכנויות). חריג מאושר לכללי השפה של האתר — מותר Make/Claude/
// ארכיטקטורה. ראה: שיווק/אתרים/תיק-עבודות/CLAUDE.md
//
// כדי לעדכן את התיק: עורכים את הקובץ הזה, מוסיפים סקרינשוטים ל-public/portfolio/,
// מריצים npm run build, ואז git push (Vercel בונה אוטומטית).
//
// placeholder: שדה null/undefined → הקומפוננטה מציגה placeholder נקי
// (כך הדף נבנה ועובד עוד לפני שכל הנכסים הגיעו).
// ════════════════════════════════════════════════════════════════════════

export interface Stat {
  num: string
  label: string
  sub: string
}

export interface CaseMetric {
  value: string
  label: string
}

export interface Testimonial {
  videoId: string | null
  name: string
  role: string
  portrait?: boolean
  context?: string // באיזה שלב בפרויקט / על מה (Grok: עדות צריכה הקשר)
}

export interface CaseStudy {
  eyebrow: string
  title: string
  clientLabel: string
  approved: boolean
  tags: string[]
  problem: string
  metrics: CaseMetric[]
  build: string[] // חבילת האוטומציות שנבנתה
  techBreakdown: string[] // לקהל הטכני
  image: string | null // סקרינשוט הסנריו של סוכן ה-AI המרכזי (/portfolio/<file>)
  imageCaption?: string
  testimonial: Testimonial | null
}

export interface Department {
  name: string
  agents: { name: string; role: string; badge?: 'telegram' | 'infra' | 'new' }[]
}

export interface Scenario {
  title: string
  client: string
  approved: boolean
  summary: string
  result: string
  image: string | null // /portfolio/<file>
  link: string | null // לינק תצוגה Make
  breakdown: string[] // modules / לוגיקה / edge case
}

export interface Product {
  name: string
  tag: string
  tagline: string
  desc: string
  points: string[]
  link: string | null
}

export interface ProofItem {
  title: string
  field: string
  desc: string
}

// ─── HERO ────────────────────────────────────────────────────────────────
export const hero = {
  eyebrow: 'תיק עבודות · איליה מלצב',
  title: 'מערכות שעובדות — והמכונה שבונה אותן',
  lead: 'אוטומציות Make, מערכות SaaS שנבנו מאפס, ו-CRM שמריץ קליניקות. וגם: חברה שלמה שמנוהלת ע״י צבא של סוכני AI. זה לא דף מכירה — זאת העבודה עצמה.',
}

export const stats: Stat[] = [
  { num: '7+', label: 'שנות ניסיון בעבודה עם בעלי עסקים', sub: '' },
  { num: '16', label: 'סוכני AI', sub: '4 מחלקות שמריצות את החברה' },
  { num: '100+', label: 'לידים ב-6 דקות', sub: 'Reacherful — נבנה מאפס' },
]

// ─── CASE STUDY מרכזי: אריק ──────────────────────────────────────────────
export const caseStudy: CaseStudy = {
  eyebrow: 'פרויקט נבחר',
  title: 'מערכת שמנהלת את כל הצד הדיגיטלי של העסק',
  clientLabel: 'אריק · קליניקה',
  approved: true,
  tags: [],
  problem:
    'ניהול קליניקה ידני — תיאום תורים, תזכורות, מעקב מטופלים והיסטוריית טיפולים, הכל בראש ובוואטסאפ. no-shows ואובדן מעקב אחרי טיפולים.',
  metrics: [
    { value: '35', label: 'אוטומציות שרצות בעסק' },
    { value: 'סוכן AI', label: 'מנהל את כל הזרימה' },
    { value: 'נוב׳ 2025', label: 'פעיל מאז' },
  ],
  build: [
    'סוכן AI מרכזי שמנהל את כל הזרימה מקצה לקצה',
    'תזכורות אוטומטיות לתורים',
    'אישורי הגעה',
    'היסטוריית טיפולים מרוכזת',
    'סנכרון יומן גוגל',
    'פולואפים אוטומטיים',
    'דיוור ללקוחות',
    'פעולות אוטומטיות לאחר טיפול',
  ],
  techBreakdown: [
    '35 אוטומציות שמנהלות את כל הצד הדיגיטלי של העסק — מהרגע שנכנס ליד ועד הפולואפ אחרי הטיפול.',
    'בלב המערכת: סוכן AI שמתזמר את כל הזרימה ומחליט מה קורה בכל שלב — לא תסריט קשיח אלא היגיון שמסתגל.',
    'CRM כמקור-אמת + שכבת אוטומציות ב-Make מעל יומן גוגל ו-WhatsApp, רצה מתוזמנת בלי מגע יד.',
  ],
  image: null, // ⚠️ סקרינשוט סנריו ה-Make של סוכן ה-AI המרכזי (/portfolio/erik-ai-agent.png — אחרי טשטוש PII)
  imageCaption: 'סנריו ה-Make של סוכן ה-AI המרכזי בעסק',
  testimonial: {
    videoId: 'GXDE6HlC8jw', // עדות אריק גרון (מתוך עמוד ההמלצות באתר)
    name: 'אריק גרון',
    role: 'בעל קליניקה',
    context: 'על המערכת והאוטומציות שנבנו לעסק שלו',
  },
}

// ─── צבא הסוכנים (עץ ארגוני) ─────────────────────────────────────────────
// מקור-אמת: _מטה/אייג'נטים.md (לעדכן את הספירה ב-stats אם משתנה)
export const departments: Department[] = [
  {
    name: 'שיווק',
    agents: [
      { name: 'יוצר מודעות', role: 'Hormozi · קופי · Meta Ads' },
      { name: 'יוצר תוכן סושיאל', role: 'פוסטים אורגניים · קבוצות FB' },
      { name: 'אתרים', role: 'בניית אתר · SEO · GEO' },
      { name: 'יוצר כתבות', role: 'כתבות SEO+GEO · DataForSEO' },
    ],
  },
  {
    name: 'מכירות',
    agents: [
      { name: 'מאמן שיחות', role: 'ניתוח ושיפור שיחות מכירה' },
      { name: 'הצעות מחיר', role: 'הצעה + איפיון-מערכת (זוג)' },
      { name: 'שאלון המשך', role: 'שאלון ללקוח כשחסר מידע' },
      { name: 'סקרייפ לידים', role: 'סקרייפר אינסטגרם' },
    ],
  },
  {
    name: 'תפעול',
    agents: [
      { name: 'CRM', role: 'crm.html · DATA.json · pipeline', badge: 'infra' },
      { name: 'עוזר אישי', role: 'בוט טלגרם · Claude Sonnet · יד ימין', badge: 'telegram' },
      { name: 'כספים', role: 'קבלות · חשבוניות · מיסים' },
      { name: 'ניהול לקוחות', role: 'תיקי לקוחות · דליברי' },
      { name: 'הכנה לפגישה', role: 'הודעת WhatsApp לפני הקמה' },
      { name: 'איפיון', role: 'מסמך איפיון · 4 דפוסים' },
      { name: 'Make', role: 'בנייה ותחזוקה · Reader/Writer per-client' },
    ],
  },
  {
    name: 'משפטי',
    agents: [{ name: 'יועץ חוזים', role: 'חוזים · טמפלייטים · בסיס ידע' }],
  },
]

export const governance = {
  workflow: [
    'איליה פותח תיקייה של אייג״נט → Claude טוען אוטומטית גם את הקשר החברה (CLAUDE.md העליון) → האייג״נט עובד עם הקשר כפול.',
    'משימה מורכבת → Claude מזהה אילו אייג״נטים נדרשים, מתזמר ביניהם, ומחזיר תוצאה.',
    'כל מסמך-לקוח מתכנס לכרטיס אחד ב-CRM — מקור האמת.',
  ],
  rules: [
    'אישור לפני שריפה — שום אייג״נט (כולל הבוט) לא מזמין אחר בלי אישור מפורש.',
    'human-in-the-loop — הבוט תמיד מסכם לפני פעולה ("עומד לעשות X — לאשר?") ומבצע רק אחרי OK.',
    'הבוט קורא ויוצר — לעולם לא מוחק ולא משנה מסמכים קיימים.',
    'רישום שינויים — כל שינוי מבני נרשם ב-CLAUDE.md הרלוונטי (versioning של ההתנהגות).',
  ],
}

// ─── אוטומציות Make ──────────────────────────────────────────────────────
export const scenarios: Scenario[] = [
  {
    title: 'קליטת מסמכים + OCR + תיוק',
    client: 'משרד עו״ד נזיקין',
    approved: false, // אנונימי עד אישור (תום גיצה)
    summary:
      'קולט מסמכים שמגיעים ב-WhatsApp, מריץ OCR, מסווג ל-7-9 קטגוריות (תלושים, מסמכים רפואיים, יפויי-כוח) ומתייק אוטומטית בדרייב.',
    result: 'תיוק אוטומטי במקום סיווג ידני של כל מסמך נכנס.',
    image: null, // ⚠️ /portfolio/ocr-tom.png (אחרי טשטוש PII)
    link: null, // ⚠️ לינק תצוגה Make
    breakdown: [
      'טריגר WhatsApp → זיהוי סוג מסמך → OCR → סיווג לקטגוריה → תיוק בתיקיית דרייב נכונה.',
      'טיפול בקצוות: מסמך לא מזוהה עובר לתיקיית "לבדיקה ידנית" במקום ליפול.',
    ],
  },
  {
    title: 'מנתח מסמכים — חילוץ שדות',
    client: 'חברת שירות',
    approved: false,
    summary: 'מנתח מסמכים נכנסים, מחלץ שדות מובְנים ומעדכן את המערכת בלי הקלדה ידנית.',
    result: 'הקלדה ידנית של נתונים מהמסמכים יורדת לאפס.',
    image: null,
    link: null,
    breakdown: ['חילוץ מובנה עם בדיקת תקינות לפני כתיבה למערכת.'],
  },
  {
    title: 'AI Daily Brief',
    client: 'Smart Scale (פנימי)',
    approved: true,
    summary: 'בריף יומי אוטומטי שמרכז את מה שצריך לדעת בבוקר — נבנה ורץ אצלי.',
    result: 'בריף מוכן כל בוקר בלי מגע יד.',
    image: null, // ⚠️ /portfolio/ai-daily-brief.png
    link: null,
    breakdown: ['בלופרינט קיים: _מטה/תיק-עבודות/AI Daily Brief/'],
  },
]

// ─── מוצרים שבניתי מאפס ──────────────────────────────────────────────────
export const products: Product[] = [
  {
    name: 'Reacherful',
    tag: 'SaaS · לידים',
    tagline: 'פלטפורמת לידים שנבנתה מאפס',
    desc: 'מגדירים נישה → מקבלים לידים מאומתים → הודעות מותאמות אישית. 100+ לידים מאומתים ב-6 דקות.',
    points: ['ארכיטקטורת SaaS מלאה', 'סקרייפינג + אימות', 'פרסונליזציה של פנייה'],
    link: null, // ⚠️ URL חי + סקרינשוטים מאיליה
  },
  {
    name: 'מערכת CRM',
    tag: 'תשתית',
    tagline: 'CRM שמריץ את כל המכירות',
    desc: 'crm.html + DATA.json + pipeline. מקור-אמת ללידים, עסקאות, משימות ופולואפים — עם יצירת תיקיות לקוח אוטומטית.',
    points: ['pipeline מלא', 'יצירת תיקי-לקוח אוטומטית', 'דשבורד הכנסות'],
    link: null,
  },
  {
    name: 'בוט טלגרם',
    tag: 'Claude · אוטומציה',
    tagline: 'יד ימין שרצה על Claude Sonnet',
    desc: 'קורא וכותב ל-CRM, יוצר מסמכים, מחפש בכל הארגון, מתמלל הודעות קוליות. בריף בוקר וערב אוטומטיים. עם פרוטוקול אישור מובנה.',
    points: ['Python · Claude Sonnet', 'זיכרון 7 ימים', 'human-in-the-loop'],
    link: null,
  },
  {
    name: 'האתר + ווידג׳ט AI',
    tag: 'Next.js · Claude',
    tagline: 'הדף שאתה קורא בו עכשיו',
    desc: 'Next.js 15, RTL, SEO+GEO מלא. ובתוכו ווידג׳ט AI מבוסס Claude שמחזיר תצוגה מותאמת אישית למבקר — נסה אותו.',
    points: ['Next.js 15 App Router', 'ווידג׳ט Claude Sonnet', 'SEO + GEO'],
    link: null,
  },
]

// ─── עוד עבודות (proof grid) ─────────────────────────────────────────────
export const proofItems: ProofItem[] = [
  { title: 'סקרייפר לידים', field: 'סקרייפינג', desc: 'איסוף וסינון לידים אוטומטי ללקוח.' },
  { title: 'מעבר GHL', field: 'הגירת מערכת', desc: 'פרויקט מעבר ובניית בוטים ב-GoHighLevel.' },
  { title: 'מנתח מסמכים', field: 'document AI', desc: 'מספר משרדים — חילוץ וסיווג מסמכים.' },
  { title: 'דשבורדים', field: 'BI / תפעול', desc: 'דשבורדים תפעוליים מותאמים ללקוחות.' },
]

// ─── המלצות (וידאו) — מתוך TestimonialsSection הקיים ──────────────────────
export const testimonials: Testimonial[] = [
  {
    videoId: '20zo_3tE58Q',
    name: 'אלון לוי',
    role: 'מנכ״ל קולמקס · לשעבר סמנכ״ל כספים בנק לאומי',
    portrait: false,
  },
  { videoId: '34CIG2UNFD0', name: 'אור חכים', role: 'מנכ״ל Videocast', portrait: true },
  {
    videoId: 'tZXjPQQiiAA',
    name: 'טום לידר',
    role: 'מנכ״ל growgen.ai',
    portrait: true,
  },
]

import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const SYSTEM_PROMPT = `אתה עוזר שיווקי של Smart Scale — חברה ישראלית שבונה מערכות שחוסכות לעסקים זמן ומונעות אובדן לידים.
קהל: בעלי עסקים ישראליים. שפה: עברית בלבד.

כללים מחמירים:
1. לעולם לא להשתמש: webhook, API, מודול, n8n, Make.com, JavaScript, node, אינטגרציה, סנכרון, automation flow
2. תמיד שפת תוצאות: "חוסך 15 שעות בשבוע", "לא מפספסים לידים", "מגיב תוך 2 דקות"
3. מספרים ספציפיים תמיד — לא "הרבה זמן" אלא "15 שעות בשבוע"
4. גוף שני — "אתה", "העסק שלך", "הלקוחות שלך"
5. אל תחנך — דבר עם מי שכבר מרגיש את הבעיה
6. תחזיר JSON בלבד — ללא שום טקסט נוסף לפני או אחרי

פורמט JSON נדרש:
{
  "greeting": "משפט פתיחה חמה ומותאמת למה שכתב (1 משפט קצר)",
  "cards": [
    {
      "title": "שם המערכת בעברית פשוטה (לא טכנית)",
      "problem": "מה הכאב הספציפי שהיא פותרת — 1 משפט",
      "result": "מה מרוויחים — חייב לכלול מספר ספציפי",
      "example": "דוגמה קצרה מלקוח אמיתי — או מחרוזת ריקה אם אין"
    }
  ],
  "cta": "משפט שמזמין אותם לראות איך זה עובד אצלם"
}

החזר 2-3 כרטיסיות רלוונטיות בלבד — לא כולן, רק מה שמתאים למה שכתב.

השירותים שאפשר להציע:
- מערכת שמגיבה לכל ליד תוך 2 דקות אוטומטית — גם בשבת, גם בחצות
- מערכת שמרכזת לידים מWhatsApp, אתר, ופייסבוק למקום אחד ועוקבת אחריהם
- מערכת שמזכירה ללקוחות על תורים ומורידה no-shows ב-40-60%
- מערכת שמנהלת ניירת ומסמכים ושומרת אותם אוטומטית במקום הנכון
- מערכת שמייצרת דוחות שבועיים לכל לקוחות הסוכנות אוטומטית כל שני בבוקר
- מערכת שעונה לשאלות נפוצות של לקוחות 24/7 בלי שתגע בה
- Reacherful: מציאת לקוחות חדשים — 100 לידים מאומתים עם פנייה אישית תוך 6 דקות

דוגמאות אמיתיות לשימוש:
- "אריק (עסק עם תורים) — 24 תהליכים אוטומטיים, חוסך 3 שעות ביום"
- "קליניקה שמורידה no-shows ב-50% עם תזכורות אוטומטיות"
- "סוכנות שיווק שחוסכת 20 שעות שבועיות על דוחות ללקוחות"`

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message?.trim()) {
      return Response.json({ error: 'empty' }, { status: 400 })
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: message }],
    })

    const text =
      response.content[0].type === 'text' ? response.content[0].text : ''

    // Extract JSON even if Claude added some text around it
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return Response.json({ error: 'no_json' }, { status: 500 })
    }

    const json = JSON.parse(jsonMatch[0])
    return Response.json(json)
  } catch (err) {
    console.error('AI Widget error:', err)
    return Response.json({ error: 'server_error' }, { status: 500 })
  }
}

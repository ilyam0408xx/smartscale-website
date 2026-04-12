export default function StorySection() {
  return (
    <section
      id="story"
      style={{ padding: '80px 0', background: '#f9f9f7' }}
    >
      <div
        className="wrap"
        style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}
      >
        <div style={{ maxWidth: 680 }}>
          <p className="section-label">הסיפור שלי</p>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 800,
              color: '#0a0a0a',
              marginBottom: 24,
            }}
          >
            בן 14 שרצה לעבוד
          </h2>
          <p
            className="direct-answer"
            style={{ marginBottom: 20 }}
          >
            איליה מלצב הוא מייסד Smart Scale — חברה לבניית מערכות אוטומציה
            לעסקים ישראליים. התחיל לעבוד בגיל 14, צבר 7+ שנות ניסיון, ובנה
            כלים שחוסכים לבעלי עסקים עשרות שעות עבודה בשבוע.
          </p>
          <p
            style={{
              fontSize: 16,
              color: '#3a3a3a',
              lineHeight: 1.8,
              marginBottom: 20,
            }}
          >
            התחלתי לעבוד בגיל 14. לא חיכיתי שמישהו ייתן לי הזדמנות — פתחתי
            עסק בעצמי. עיצוב, בניית אתרים, עריכת וידאו — עשיתי הכל, למדתי הכל
            מיוטיוב, ולא הפסקתי. 5 שנים של עבודה עם עסקים, יום ולילה.
          </p>
          <p
            style={{
              fontSize: 16,
              color: '#3a3a3a',
              lineHeight: 1.8,
              marginBottom: 20,
            }}
          >
            אחרי 5 שנים הבנתי דבר אחד: לכל בעל עסק יש אותן בעיות. הם מבזבזים
            שעות על דברים שמערכת יכולה לעשות בשבילם. מעקב לקוחות, תזכורות,
            פולואפים, חיפוש לקוחות חדשים — כל זה אפשר לעשות אוטומטית. ואני
            יודע לבנות את זה.
          </p>
          <p
            style={{
              fontSize: 16,
              color: '#3a3a3a',
              lineHeight: 1.8,
            }}
          >
            אז הקמתי את <strong>Smart Scale</strong>. אני בונה מערכות שעובדות
            בשביל בעלי עסקים — לא עוד כלי שצריך ללמוד, אלא משהו שפשוט רץ
            ברקע ועושה את העבודה. כל מערכת מותאמת לעסק ספציפי, ואני מלווה
            אותך עד שהכל עובד לבד.
          </p>
        </div>
      </div>
    </section>
  )
}

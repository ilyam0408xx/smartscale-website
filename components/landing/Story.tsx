import Image from 'next/image'
import AIVote from './AIVote'

export default function Story() {
  return (
    <section className="story" id="story" data-screen-label="07 Story">
      <div className="container story-grid">
        <div className="story-portrait-wrap">
          <div className="story-portrait">
            <Image
              src="/images/ilya-portrait.png"
              alt="איליה — Smart Scale"
              width={520}
              height={650}
              className="story-portrait-img"
            />
          </div>
          <AIVote />
        </div>
        <div className="story-right">
          <div className="story-header">
            <div className="section-eyebrow mono">הסיפור שלי</div>
            <h2 className="section-title">
              בן <em>14</em>
              <br />
              שרצה לעבוד.
            </h2>
          </div>
          <div className="story-paras">
            <p>
              אני איליה. התחלתי לעבוד עם עסקים בגיל 14, לא חיכיתי שמישהו ייתן לי הזדמנות, פתחתי
              עסק בעצמי. עיצוב, אתרים, וידאו, שיווק — עשיתי הכל, למדתי הכל מהטובים ביותר בישראל,
              ולא הפסקתי.
            </p>
            <p>
              10 שנים של עבודה עם עסקים, יום ולילה. אחרי 10 שנים הבנתי דבר אחד: לכל בעל עסק יש{' '}
              <em>אותן בעיות</em>. הם מבזבזים שעות על דברים שמערכת יכולה לעשות בשבילם.
            </p>
            <p>
              אז הקמתי את <strong>Smart Scale</strong>. אני לא מוכר עוד כלי שצריך ללמוד — אני בונה
              משהו שפשוט רץ ברקע ועושה את העבודה. כל מערכת מותאמת לעסק ספציפי, ואני מלווה עד שהכל
              עובד לבד.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

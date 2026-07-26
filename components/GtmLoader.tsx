import Script from 'next/script'

export const GTM_ID = 'GTM-P5F5S8R4'

// beforeInteractive puts both tags in the server-rendered <head>, so the
// container is present in the delivered HTML (Tag Assistant and crawlers see
// it) and GA4 / Google Ads tags fire before any interaction. Order matters:
// dataLayer is seeded first, then gtm.js loads.
export default function GtmLoader() {
  return (
    <>
      <Script
        id="gtm-datalayer"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`,
        }}
      />
      <Script
        id="gtm-loader"
        strategy="beforeInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
      />
    </>
  )
}

export function GtmNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        className="gtm-noscript-frame"
        title="Google Tag Manager"
      />
    </noscript>
  )
}

export const GTM_ID = 'GTM-P5F5S8R4'

// Deliberately NOT next/script. In the App Router, strategy="beforeInteractive"
// emits a <link rel="preload"> plus a push into Next's own __next_s queue, so
// the container only loads once the framework runtime runs. Tag Assistant and
// anything that reads the delivered HTML see no script tag at all.
// A raw inline snippet in <head> is byte-identical to public/lp-law.html and
// runs with zero dependency on the framework. Keep it that way.
const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`

// Must be rendered inside <head>, as early as possible.
export function GtmHeadScript() {
  return <script dangerouslySetInnerHTML={{ __html: GTM_SNIPPET }} />
}

// Must be rendered immediately after <body> opens.
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

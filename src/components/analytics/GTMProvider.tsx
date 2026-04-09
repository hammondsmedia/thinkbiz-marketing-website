'use client'

// GTMProvider — Client Component.
//
// Responsibilities:
//   1. Injects the GTM snippet (afterInteractive).
//   2. Renders the <noscript> iframe fallback at the top of <body>.
//
// GTM Consent Mode v2 default state (all denied) is initialised in the root
// layout via an inline synchronous <script> in <head> that runs BEFORE this
// component hydrates. CookieYes (also loaded in <head>) fires the consent
// update event that GTM listens to.

import Script from 'next/script'

interface GTMProviderProps {
  gtmId: string
}

export default function GTMProvider({ gtmId }: GTMProviderProps) {
  return (
    <>
      {/* noscript fallback — rendered at top of <body> */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      {/* GTM initialisation — runs after page is interactive */}
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
        }}
      />
    </>
  )
}

import type { Metadata } from 'next'
import Script from 'next/script'
import localFont from 'next/font/local'
import '@/styles/globals.css'

// ---------------------------------------------------------------------------
// Fonts — Geist is already bundled by create-next-app
// ---------------------------------------------------------------------------

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
})

// ---------------------------------------------------------------------------
// Site constants — replace PLACEHOLDER_* values in project-brief.md + .env.local
// ---------------------------------------------------------------------------

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
const COOKIEYES_ID = process.env.NEXT_PUBLIC_COOKIEYES_ID

// ---------------------------------------------------------------------------
// Base metadata — child pages override via generateMetadata()
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | ThinkBiz',
    default: 'ThinkBiz',
  },
  description: 'PLACEHOLDER_SHORT_DESCRIPTION',
  openGraph: {
    type: 'website',
    siteName: 'ThinkBiz',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PLACEHOLDER_TWITTER',
    creator: '@PLACEHOLDER_TWITTER',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// ---------------------------------------------------------------------------
// Organization schema — injected on every page via root layout
// Update sameAs, logo, contactPoint once project-brief.md is finalised.
// ---------------------------------------------------------------------------

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ThinkBiz',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/thinkbiz-horizontal-logo.svg`,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'PLACEHOLDER_EMAIL',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  // TODO: replace placeholders once project-brief.md is finalised
  sameAs: [
    'https://www.linkedin.com/company/PLACEHOLDER_LINKEDIN_SLUG',
    'https://twitter.com/PLACEHOLDER_TWITTER',
  ],
}

// ---------------------------------------------------------------------------
// Root layout
// ---------------------------------------------------------------------------

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/*
          CookieYes must load BEFORE GTM so GTM Consent Mode v2 picks up the
          consent state on the first pageview. beforeInteractive injects into
          <head> before any React hydration occurs.
        */}
        {COOKIEYES_ID && (
          <Script
            src={`https://cdn-cookieyes.com/client_data/${COOKIEYES_ID}/script.js`}
            strategy="beforeInteractive"
          />
        )}

        {/* Organization schema — present on every page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* GTM noscript fallback — must be immediately after <body> */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        {children}

        {/* GTM — afterInteractive; consent state already set by CookieYes above */}
        {GTM_ID && (
          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
      </body>
    </html>
  )
}

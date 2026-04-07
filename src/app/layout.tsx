import type { Metadata } from 'next'
import Script from 'next/script'
import localFont from 'next/font/local'
import GTMProvider from '@/components/analytics/GTMProvider'
import OrganizationSchema from '@/components/seo/OrganizationSchema'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import '@/styles/globals.css'

// ---------------------------------------------------------------------------
// Fonts — Geist Sans (heading + body) and Geist Mono (code blocks)
// Both are already bundled by create-next-app; swap for custom fonts in step 03
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
// Site constants
// ---------------------------------------------------------------------------

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
const COOKIEYES_ID = process.env.NEXT_PUBLIC_COOKIEYES_ID

// ---------------------------------------------------------------------------
// GTM Consent Mode v2 — default consent state.
// This MUST run synchronously in <head> before CookieYes and GTM load.
// All consent categories start denied; CookieYes fires the update event.
// ---------------------------------------------------------------------------

const consentDefaultsScript = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  'ad_storage':'denied',
  'ad_user_data':'denied',
  'ad_personalization':'denied',
  'analytics_storage':'denied',
  'functionality_storage':'denied',
  'personalization_storage':'denied',
  'security_storage':'granted',
  'wait_for_update':500
});
gtag('set','ads_data_redaction',true);
gtag('set','url_passthrough',true);
`.trim()

// ---------------------------------------------------------------------------
// Base metadata — child pages call generateMetadata() to override per-page
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
    // TODO: add /images/og-default.jpg when created
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PLACEHOLDER_TWITTER',
    creator: '@PLACEHOLDER_TWITTER',
  },
  alternates: {
    types: {
      'application/rss+xml': `${SITE_URL}/rss.xml`,
    },
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
// Root layout
// ---------------------------------------------------------------------------

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/*
          1. Consent defaults — synchronous inline script, runs first.
             Establishes denied-by-default state before any analytics load.
        */}
        <script dangerouslySetInnerHTML={{ __html: consentDefaultsScript }} />

        {/*
          2. CookieYes — beforeInteractive so it runs in <head> before GTM.
             Fires the CookieYes consent update event that GTM listens for.
        */}
        {COOKIEYES_ID && (
          <Script
            src={`https://cdn-cookieyes.com/client_data/${COOKIEYES_ID}/script.js`}
            strategy="beforeInteractive"
          />
        )}

        {/* RSS feed auto-discovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="ThinkBiz Blog RSS Feed"
          href={`${SITE_URL}/rss.xml`}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/*
          3. GTM — Client Component, loads afterInteractive.
             Consent state is already established by steps 1 + 2 above.
        */}
        {GTM_ID && <GTMProvider gtmId={GTM_ID} />}

        {/* Organization schema — Server Component, present on every page */}
        <OrganizationSchema />

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

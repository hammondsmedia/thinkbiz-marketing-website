import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import WebPageSchema from '@/components/seo/WebPageSchema'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const PAGE_TITLE = 'Privacy Policy | ThinkBiz'
const PAGE_DESCRIPTION =
  'Read the ThinkBiz Privacy Policy to understand how we collect, use, and protect your personal information.'

const POLICY_VERSION = '1.0'
const LAST_UPDATED = '2025-01-01'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    alternates: { canonical: `${SITE_URL}/privacy-policy` },
    // noindex per spec — legal page shouldn't appear in search results
    robots: { index: false, follow: true },
    openGraph: {
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/privacy-policy`,
      type: 'website',
    },
  }
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Privacy Policy', url: '/privacy-policy' }]} />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url="/privacy-policy"
      />

      <section className="py-16 sm:py-24">
        <Container padding="narrow">
          <div className="max-w-[var(--content-width)] mx-auto">

            {/* Header */}
            <div className="mb-10 pb-8 border-b border-gray-200">
              <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-3">
                Privacy Policy
              </h1>
              <p className="text-sm text-gray-400">
                Version {POLICY_VERSION} &mdash; Last updated:{' '}
                <time dateTime={LAST_UPDATED}>
                  {new Date(LAST_UPDATED).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </p>
            </div>

            {/* Content */}
            <div className="prose">

              {/* 1. Introduction */}
              <h2>Introduction</h2>
              <p>
                ThinkBiz (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed
                to protecting your privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit{' '}
                <strong>PLACEHOLDER_DOMAIN</strong> (the &ldquo;Site&rdquo;) or contact us
                through the Site.
              </p>
              <p>
                By using the Site, you agree to the collection and use of information in
                accordance with this policy. If you do not agree, please do not use the Site.
              </p>

              {/* 2. Data Collection */}
              <h2>Data Collection</h2>
              <p>We collect information in the following ways:</p>
              <h3>Information you provide directly</h3>
              <ul>
                <li>
                  <strong>Contact form submissions</strong> — your name, email address, phone
                  number (optional), and message when you use our contact form.
                </li>
              </ul>
              <h3>Information collected automatically</h3>
              <ul>
                <li>
                  <strong>Usage data</strong> — pages visited, time spent on pages, referring
                  URL, browser type, device type, and IP address (anonymised where possible).
                </li>
                <li>
                  <strong>Cookies and similar technologies</strong> — small files placed on
                  your device. We use strictly necessary cookies for site operation and, with
                  your consent, analytics cookies to understand how visitors use the Site.
                </li>
              </ul>
              <p>
                You can manage cookie preferences via the consent banner that appears on your
                first visit, or by clicking &ldquo;Cookie Settings&rdquo; at any time. Strictly
                necessary cookies cannot be disabled as they are essential for the Site to
                function.
              </p>

              {/* 3. Use of Your Data */}
              <h2>Use of Your Data</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your enquiries and provide the services you request.</li>
                <li>Improve the Site, its content, and user experience.</li>
                <li>
                  Analyse how visitors use the Site in aggregate (analytics), subject to your
                  consent.
                </li>
                <li>Protect the security and integrity of the Site (bot protection).</li>
                <li>Comply with applicable legal obligations.</li>
              </ul>
              <p>
                We will only process your personal data for the purposes set out above, or for
                a compatible purpose. We will not use your data for unsolicited direct marketing
                without your explicit consent.
              </p>

              {/* 4. Data Sharing */}
              <h2>Data Sharing</h2>
              <p>
                We do not sell, rent, or trade your personal data. We may share information
                with trusted third-party service providers who assist us in operating the Site
                and conducting our business, provided those parties agree to keep it
                confidential. These providers include:
              </p>
              <ul>
                <li><strong>Contentful</strong> — stores contact form submissions (CMS).</li>
                <li>
                  <strong>Google (Analytics 4, Tag Manager, reCAPTCHA v3)</strong> — analytics,
                  tag management, and bot protection.
                </li>
                <li><strong>Microsoft Clarity</strong> — session recording and heatmaps.</li>
                <li><strong>Mixpanel</strong> — product analytics.</li>
                <li><strong>CookieYes</strong> — cookie consent management.</li>
                <li><strong>Vercel</strong> — hosting and edge delivery.</li>
              </ul>
              <p>
                We may also disclose your information where required by law, or to protect our
                rights, property, or safety, or that of others.
              </p>

              {/* 5. Data Security */}
              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organisational security measures to
                protect your personal data against unauthorised access, alteration, disclosure,
                or destruction. All data transmitted between your browser and the Site is
                encrypted via HTTPS/TLS.
              </p>
              <p>
                Contact form submissions are protected by Google reCAPTCHA v3 to prevent
                automated abuse. However, no method of transmission over the internet or
                electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              <p>
                We retain contact form submissions for up to three years, after which they are
                deleted. Analytics data is retained in accordance with each provider&apos;s
                default retention settings.
              </p>

              {/* 6. Your Privacy Rights */}
              <h2>Your Privacy Rights</h2>
              <p>
                Depending on your location, you may have rights under applicable privacy law
                (including the UK GDPR and EU GDPR). These may include the right to:
              </p>
              <ul>
                <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
                <li><strong>Correction</strong> — request that inaccurate data be corrected.</li>
                <li><strong>Erasure</strong> — request deletion of your personal data (&ldquo;right to be forgotten&rdquo;).</li>
                <li><strong>Restriction</strong> — request that we restrict processing of your data.</li>
                <li><strong>Portability</strong> — receive your data in a structured, machine-readable format.</li>
                <li><strong>Objection</strong> — object to processing based on legitimate interests.</li>
                <li><strong>Withdraw consent</strong> — withdraw any consent you have given at any time.</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:PLACEHOLDER_EMAIL">PLACEHOLDER_EMAIL</a>. We will respond
                within 30 days. If you believe we have not handled your request appropriately,
                you have the right to lodge a complaint with the relevant supervisory authority
                (in the UK: the ICO at{' '}
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ico.org.uk
                </a>
                ).
              </p>

              {/* 7. Changes to This Policy */}
              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we do, we will
                revise the &ldquo;Last updated&rdquo; date and version number at the top of
                this page. We encourage you to review this page periodically to stay informed
                about how we protect your information. Continued use of the Site after any
                changes constitutes your acceptance of the updated policy.
              </p>

              {/* 8. Contact Us */}
              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, or wish to exercise your
                privacy rights, please contact us:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:PLACEHOLDER_EMAIL">PLACEHOLDER_EMAIL</a>
                </li>
                <li>
                  <strong>Post:</strong> ThinkBiz, PLACEHOLDER_ADDRESS
                </li>
              </ul>

            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

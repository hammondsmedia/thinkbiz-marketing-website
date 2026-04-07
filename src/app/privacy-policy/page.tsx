import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import WebPageSchema from '@/components/seo/WebPageSchema'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const PAGE_TITLE = 'Privacy Policy | ThinkBiz'
const PAGE_DESCRIPTION =
  'Read the ThinkBiz Privacy Policy to understand how we collect, use, and protect your personal information.'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    alternates: { canonical: `${SITE_URL}/privacy-policy` },
    robots: { index: true, follow: true },
    openGraph: {
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/privacy-policy`,
      type: 'website',
    },
  }
}

const LAST_UPDATED = '2025-01-01'

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
                Last updated:{' '}
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
              <p>
                This Privacy Policy explains how ThinkBiz (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
                &ldquo;our&rdquo;) collects, uses, and protects information you provide when
                visiting <strong>PLACEHOLDER_DOMAIN</strong> (the &ldquo;Site&rdquo;). By using the
                Site you agree to the practices described here.
              </p>

              <h2>1. Information we collect</h2>
              <p>We may collect the following types of information:</p>
              <ul>
                <li>
                  <strong>Contact form data</strong> — name, email address, phone number, and
                  message content when you submit our contact form.
                </li>
                <li>
                  <strong>Usage data</strong> — pages visited, time on page, referring URL,
                  browser type, and device type, collected automatically via analytics tools.
                </li>
                <li>
                  <strong>Cookies and similar technologies</strong> — see Section 5 for details.
                </li>
              </ul>

              <h2>2. How we use your information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your enquiries and provide the services you request.</li>
                <li>Improve the Site, its content, and user experience.</li>
                <li>Understand how visitors use the Site (analytics).</li>
                <li>Comply with applicable legal obligations.</li>
              </ul>
              <p>We do not sell, rent, or share your personal data with third parties for their
              own marketing purposes.</p>

              <h2>3. Legal basis for processing (UK &amp; EU residents)</h2>
              <p>
                Where the UK GDPR or EU GDPR applies, our legal bases for processing personal
                data are:
              </p>
              <ul>
                <li><strong>Contract</strong> — where processing is necessary to fulfil a service you requested.</li>
                <li><strong>Legitimate interests</strong> — for analytics and site improvement, balanced against your rights.</li>
                <li><strong>Consent</strong> — where we have obtained your explicit consent (e.g. optional marketing).</li>
                <li><strong>Legal obligation</strong> — where processing is required by law.</li>
              </ul>

              <h2>4. Data retention</h2>
              <p>
                Contact form submissions are retained for up to 3 years or until you request
                deletion. Analytics data is retained in accordance with the respective tool&apos;s
                default retention settings. You may request deletion of your personal data at
                any time by emailing <a href="mailto:PLACEHOLDER_EMAIL">PLACEHOLDER_EMAIL</a>.
              </p>

              <h2>5. Cookies</h2>
              <p>
                We use cookies and similar technologies for analytics and functionality. You
                can manage your cookie preferences via our cookie consent banner (powered by
                CookieYes) at any time. Strictly necessary cookies cannot be disabled as they
                are required for the Site to function correctly.
              </p>
              <p>Categories of cookies we may use:</p>
              <ul>
                <li><strong>Strictly necessary</strong> — essential for site operation.</li>
                <li><strong>Analytics</strong> — Google Analytics 4 and Microsoft Clarity to understand site usage (only set after consent).</li>
                <li><strong>Marketing</strong> — not currently used.</li>
              </ul>

              <h2>6. Third-party services</h2>
              <p>We use the following third-party services that may process data on our behalf:</p>
              <ul>
                <li><strong>Google Analytics 4 &amp; Google Tag Manager</strong> — analytics and tag management.</li>
                <li><strong>Microsoft Clarity</strong> — session recording and heatmaps.</li>
                <li><strong>Mixpanel</strong> — product analytics.</li>
                <li><strong>Google reCAPTCHA v3</strong> — bot protection on forms.</li>
                <li><strong>CookieYes</strong> — cookie consent management.</li>
                <li><strong>Contentful</strong> — headless CMS (form submission storage).</li>
                <li><strong>Vercel</strong> — hosting and edge network.</li>
              </ul>
              <p>
                Each provider operates under its own privacy policy and, where applicable,
                a data processing agreement with us.
              </p>

              <h2>7. Your rights</h2>
              <p>
                Depending on your location, you may have the right to access, correct, delete,
                or restrict the processing of your personal data. You may also have the right to
                data portability and to object to certain processing. To exercise any of these
                rights, contact us at <a href="mailto:PLACEHOLDER_EMAIL">PLACEHOLDER_EMAIL</a>.
              </p>

              <h2>8. Data transfers</h2>
              <p>
                Some of our third-party providers may transfer and process data outside the UK
                or European Economic Area. Where this occurs, we ensure appropriate safeguards
                are in place (e.g. Standard Contractual Clauses).
              </p>

              <h2>9. Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your
                data against unauthorised access, loss, or misuse. All data is transmitted
                over HTTPS/TLS. However, no transmission over the internet can be guaranteed
                to be 100% secure.
              </p>

              <h2>10. Children&apos;s privacy</h2>
              <p>
                Our Site is not directed at children under the age of 16. We do not knowingly
                collect personal data from children. If you believe a child has provided us
                with personal data, please contact us and we will delete it.
              </p>

              <h2>11. Changes to this policy</h2>
              <p>
                We may update this Privacy Policy periodically. When we do, we will update the
                &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to
                review this page from time to time.
              </p>

              <h2>12. Contact us</h2>
              <p>
                If you have questions about this Privacy Policy or how we handle your data,
                please contact us:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:PLACEHOLDER_EMAIL">PLACEHOLDER_EMAIL</a>
                </li>
                <li><strong>Post:</strong> PLACEHOLDER_ADDRESS</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

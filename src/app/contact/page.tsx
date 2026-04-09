import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import WebPageSchema from '@/components/seo/WebPageSchema'
import ContactForm from '@/components/ui/ContactForm'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const PAGE_TITLE = 'Contact ThinkBiz | Book a Discovery Call'
const PAGE_DESCRIPTION =
  'Get in touch with ThinkBiz. Book a free 30-minute discovery call, ask a question, or start a conversation about how we can help your business grow.'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    alternates: { canonical: `${SITE_URL}/contact` },
    openGraph: {
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/contact`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
    },
  }
}

// ---------------------------------------------------------------------------
// Contact info items
// ---------------------------------------------------------------------------

const CONTACT_ITEMS = [
  {
    id: 'email',
    label: 'Email',
    value: 'PLACEHOLDER_EMAIL',
    href: 'mailto:PLACEHOLDER_EMAIL',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    id: 'phone',
    label: 'Phone',
    value: 'PLACEHOLDER_PHONE',
    href: 'tel:PLACEHOLDER_PHONE',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    id: 'address',
    label: 'Office',
    value: 'PLACEHOLDER_ADDRESS',
    href: undefined,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Contact', url: '/contact' }]} />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url="/contact"
      />

      <section className="py-16 sm:py-24">
        <Container>
          {/* Header */}
          <div className="max-w-2xl mb-12 sm:mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-4">
              Get in touch
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight text-balance mb-4">
              Let&apos;s start a conversation
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed text-pretty">
              Whether you&apos;re ready to kick off a project or just want to explore
              how ThinkBiz could help, we&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-20">
            {/* Form — takes 3 of 5 columns */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Send us a message</h2>
                <ContactForm />
              </div>
            </div>

            {/* Contact details + trust — takes 2 of 5 columns */}
            <aside className="lg:col-span-2">
              {/* Contact info */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact details</h2>
                <ul className="space-y-4" role="list">
                  {CONTACT_ITEMS.map((item) => (
                    <li key={item.id} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 text-primary">{item.icon}</span>
                      <div>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm text-gray-700 hover:text-primary transition-colors duration-200"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-700">{item.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Response time */}
              <div className="rounded-xl bg-primary-50 border border-primary/10 p-5 mb-8">
                <div className="flex items-center gap-2 mb-1">
                  <svg
                    className="h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-primary">Quick response</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We typically reply within one business day. For urgent matters, call us directly.
                </p>
              </div>

              {/* Trust signals */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Why businesses choose ThinkBiz
                </p>
                <ul className="space-y-2">
                  {[
                    'Free 30-min discovery call — no obligation',
                    'Clear proposal within 5 business days',
                    'Fixed-scope engagements, no scope creep',
                    'Dedicated consultant for your account',
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2 text-xs text-gray-600">
                      <svg
                        className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-secondary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}

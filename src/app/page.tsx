import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ThinkBiz | Business Growth Consultancy',
    description:
      'ThinkBiz helps ambitious businesses grow faster with strategic consulting, leadership development, and data-driven marketing. Start your growth journey today.',
    alternates: { canonical: SITE_URL },
    openGraph: {
      title: 'ThinkBiz | Business Growth Consultancy',
      description:
        'Strategic consulting, leadership development, and data-driven marketing for ambitious businesses.',
      url: SITE_URL,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ThinkBiz | Business Growth Consultancy',
      description:
        'Strategic consulting, leadership development, and data-driven marketing for ambitious businesses.',
    },
  }
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const SERVICES = [
  {
    id: 'strategy',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Growth Strategy',
    description:
      'We identify your highest-leverage opportunities, build a clear roadmap, and guide execution so your team moves with confidence.',
  },
  {
    id: 'leadership',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: 'Leadership Development',
    description:
      'We coach founders and senior leaders to communicate vision, build high-trust teams, and scale their impact across the organisation.',
  },
  {
    id: 'marketing',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
      </svg>
    ),
    title: 'Data-Driven Marketing',
    description:
      'From SEO and content to paid acquisition and retention, we build marketing engines that compound value over time.',
  },
]

const STATS = [
  { value: '200+', label: 'Businesses advised' },
  { value: '94%', label: 'Client retention rate' },
  { value: '3×', label: 'Average revenue growth' },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Subtle gradient orb */}
        <div
          className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full opacity-10"
          style={{ background: 'var(--gradient-brand)' }}
          aria-hidden="true"
        />

        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Copy */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-4">
                Business Growth Consultancy
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight text-balance mb-6">
                Turn big ideas into{' '}
                <span className="text-primary">measurable growth</span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed text-pretty mb-8 max-w-xl">
                ThinkBiz partners with ambitious founders and leadership teams to build
                clear strategies, develop stronger leaders, and create marketing
                systems that compound over time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/contact" size="lg">
                  Get started
                </Button>
                <Button href="/about" variant="outline" size="lg">
                  Our approach
                </Button>
              </div>
            </div>

            {/* Illustration */}
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/business-flying.svg"
                alt="A business professional flying upward — representing ambitious growth"
                width={520}
                height={420}
                priority
                className="h-auto w-full max-w-md lg:max-w-none"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* STATS                                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-primary py-12" aria-label="Key metrics">
        <Container>
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3" role="list">
            {STATS.map((stat) => (
              <li key={stat.value} className="text-center">
                <p className="text-4xl font-extrabold text-white">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-primary-light">{stat.label}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SERVICES                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            heading="Everything you need to grow with confidence"
            subheading="We combine strategic consulting, executive coaching, and performance marketing into one integrated programme — so nothing falls through the cracks."
          />

          <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {SERVICES.map((service) => (
              <li
                key={service.id}
                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm
                           transition-shadow duration-200 hover:shadow-md"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary-50 p-3 text-primary">
                  {service.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{service.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* ABOUT TEASER                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 sm:py-28 bg-gray-50" aria-labelledby="about-teaser-heading">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="flex justify-center">
              <Image
                src="/images/follow-the-leader-illustration.svg"
                alt="A leader guiding their team forward"
                width={480}
                height={400}
                className="h-auto w-full max-w-sm lg:max-w-none"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-4">
                Our approach
              </p>
              <h2
                id="about-teaser-heading"
                className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight text-balance mb-6"
              >
                We don&apos;t just advise — we build alongside you
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Great strategy is worthless without great execution. ThinkBiz embeds
                experienced practitioners into your business to make sure plans
                become results — not just slide decks.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Deep diagnostic before any recommendations',
                  'Practical playbooks your team can actually use',
                  'Weekly accountability and progress reviews',
                  'Measurable milestones agreed upfront',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-gray-600">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
              <Button href="/about" variant="outline">
                Meet the team
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA BANNER                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 sm:py-28" aria-labelledby="cta-heading">
        <Container>
          <div
            className="rounded-3xl px-8 py-16 sm:px-16 text-center"
            style={{ background: 'var(--gradient-brand-h)' }}
          >
            <h2
              id="cta-heading"
              className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance"
            >
              Ready to accelerate your growth?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Book a free 30-minute discovery call and find out exactly how ThinkBiz
              can help your business reach its next milestone.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="accent" size="lg">
                Book a discovery call
              </Button>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-base
                           font-semibold text-white border-2 border-white/40 hover:border-white
                           transition-colors duration-200 focus-visible:outline-none
                           focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                Read our insights
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

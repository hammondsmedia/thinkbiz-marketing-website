import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import BlogCard from '@/components/blog/BlogCard'
import WebPageSchema from '@/components/seo/WebPageSchema'
import { getAllBlogPosts } from '@/lib/contentful'

// ISR — revalidate every hour; Contentful webhook triggers on-demand revalidation
export const revalidate = 3600

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const PAGE_TITLE = 'ThinkBiz | Business Growth Consultancy'
const PAGE_DESCRIPTION =
  'ThinkBiz helps ambitious businesses grow faster with strategic consulting, leadership development, and data-driven marketing. Start your growth journey today.'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    alternates: { canonical: SITE_URL },
    openGraph: {
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: SITE_URL,
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

const TESTIMONIALS = [
  {
    id: 't1',
    quote:
      'ThinkBiz helped us double our pipeline in six months by cutting through the noise and focusing on what actually moves the needle. Best investment we made this year.',
    name: 'Sarah Okonkwo',
    role: 'CEO, Meridian Ventures',
    initials: 'SO',
  },
  {
    id: 't2',
    quote:
      'The leadership coaching transformed how our executive team communicates. We went from constant misalignment to a shared vision everyone actually believes in.',
    name: 'James Hartley',
    role: 'Founder, Hartley Digital',
    initials: 'JH',
  },
  {
    id: 't3',
    quote:
      "Their marketing strategy delivered a 4x return on our content investment within a quarter. I'd recommend ThinkBiz to any founder who's serious about growth.",
    name: 'Priya Nair',
    role: 'COO, Clearpath Analytics',
    initials: 'PN',
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function HomePage() {
  // Fetch latest 3 posts — returns [] if Contentful isn't configured yet
  const allPosts = await getAllBlogPosts()
  const latestPosts = allPosts.slice(0, 3)

  return (
    <>
      <WebPageSchema name={PAGE_TITLE} description={PAGE_DESCRIPTION} url="/" />

      {/* ------------------------------------------------------------------ */}
      {/* HERO — primary CTA above the fold                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Decorative gradient orb */}
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
              {/* Primary CTA above fold */}
              <div className="flex flex-wrap gap-4">
                <Button href="/contact" size="lg">
                  Book a free discovery call
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
      {/* STATS — immediate social proof after hero                           */}
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
      {/* SERVICES — value propositions                                       */}
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
      {/* ABOUT TEASER — differentiator / approach                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 sm:py-28 bg-gray-50">
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
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight text-balance mb-6">
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
      {/* TESTIMONIALS — social proof near mid-page CTA decision point        */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <SectionHeading
            eyebrow="Client stories"
            heading="What our clients say"
            subheading="We measure success by the results our clients achieve — here's what they have to say."
            align="center"
          />

          <ul className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3" role="list">
            {TESTIMONIALS.map((t) => (
              <li
                key={t.id}
                className="flex flex-col rounded-2xl border border-gray-100 bg-gray-50 p-8"
              >
                {/* Quote marks */}
                <svg
                  className="mb-4 h-8 w-8 text-secondary/40"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064
                           3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576
                           0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512
                           0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064
                           3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576
                           0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>

                <blockquote className="flex-1 text-sm text-gray-600 leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3">
                  {/* Avatar initials */}
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full
                               bg-primary text-white text-xs font-bold"
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* BLOG POSTS — latest 3 from Contentful; builds authority (E-E-A-T)  */}
      {/* ------------------------------------------------------------------ */}
      {latestPosts.length > 0 && (
        <section className="py-20 sm:py-28 bg-gray-50">
          <Container>
            <div className="flex items-end justify-between mb-12">
              <SectionHeading
                eyebrow="From the blog"
                heading="Latest insights"
                align="left"
              />
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold
                           text-primary hover:text-primary-dark transition-colors duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                View all posts
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" role="list">
              {latestPosts.map((post) => (
                <li key={post.sys.id}>
                  <BlogCard post={post} />
                </li>
              ))}
            </ul>

            <div className="mt-10 text-center sm:hidden">
              <Button href="/blog" variant="outline">
                View all posts
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* CTA BANNER — final conversion point with trust signal nearby        */}
      {/* ------------------------------------------------------------------ */}
      <section className={`py-20 sm:py-28 ${latestPosts.length > 0 ? 'bg-white' : 'bg-gray-50'}`}>
        <Container>
          <div
            className="rounded-3xl px-8 py-16 sm:px-16 text-center"
            style={{ background: 'var(--gradient-brand-h)' }}
          >
            {/* Trust signal above CTA */}
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3">
              Free, no-obligation
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
              Ready to accelerate your growth?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Book a free 30-minute discovery call. We&apos;ll listen, ask the right questions,
              and show you exactly where we can help.
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

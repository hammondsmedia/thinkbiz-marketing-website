import type { Metadata } from 'next'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import WebPageSchema from '@/components/seo/WebPageSchema'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const PAGE_TITLE = 'About ThinkBiz | Our Story & Approach'
const PAGE_DESCRIPTION =
  'Learn how ThinkBiz helps ambitious businesses grow through strategic consulting, leadership development, and data-driven marketing. Meet the team.'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    alternates: { canonical: `${SITE_URL}/about` },
    openGraph: {
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/about`,
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

const VALUES = [
  {
    id: 'clarity',
    title: 'Clarity over complexity',
    description:
      'We strip away noise and give leaders the clear focus they need to make better decisions, faster.',
  },
  {
    id: 'execution',
    title: 'Results over reports',
    description:
      'Strategy only matters when it moves the needle. We stay accountable to outcomes, not outputs.',
  },
  {
    id: 'partnership',
    title: 'Partnership over prescription',
    description:
      'We build alongside you — listening deeply, adapting quickly, and celebrating wins as one team.',
  },
  {
    id: 'courage',
    title: 'Courage to challenge',
    description:
      'Great consultants ask uncomfortable questions. We respectfully challenge assumptions so blind spots become breakthroughs.',
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'About', url: '/about' }]} />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url="/about"
      />

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-4">
                About ThinkBiz
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight text-balance mb-6">
                We help businesses <span className="text-primary">think bigger</span> and grow faster
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed text-pretty mb-8">
                ThinkBiz was founded on a simple belief: most businesses have everything they
                need to reach the next level — they just need the right thinking partner to
                help them see the path clearly and execute with conviction.
              </p>
              <Button href="/contact" size="lg">
                Work with us
              </Button>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/team-work-illustration.svg"
                alt="A team collaborating and working together"
                width={480}
                height={400}
                priority
                className="h-auto w-full max-w-sm lg:max-w-none"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* MISSION                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-4">
                Our mission
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight text-balance mb-6">
                To make great business thinking accessible to every ambitious team
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>
                  For too long, the best strategic advice has been locked behind the doors of
                  large consultancies — expensive, slow, and disconnected from the day-to-day
                  reality of running a business.
                </p>
                <p>
                  ThinkBiz exists to change that. We bring the rigour of world-class
                  strategy consulting with the agility and commercial instinct of a startup,
                  so that growing businesses get the partnership they deserve.
                </p>
                <p>
                  Whether you&apos;re a founder preparing to scale, a leadership team navigating
                  a market shift, or a marketing function that needs to perform — we have the
                  playbooks, the people, and the passion to help you win.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/leadership-growth.svg"
                alt="A chart showing leadership and business growth"
                width={440}
                height={380}
                className="h-auto w-full max-w-sm"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* VALUES                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <SectionHeading
            eyebrow="What we believe"
            heading="The values that guide every engagement"
            subheading="These aren't words on a wall — they're the commitments we make to every client, every day."
          />

          <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2" role="list">
            {VALUES.map((value) => (
              <li
                key={value.id}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-8"
              >
                <div className="mb-2 h-1 w-12 rounded-full bg-secondary" aria-hidden="true" />
                <h3 className="mb-3 text-lg font-semibold text-gray-900">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* TEAM PLACEHOLDER                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <Container>
          <SectionHeading
            eyebrow="The team"
            heading="Experienced operators, not just advisors"
            subheading="Every ThinkBiz consultant has run teams, launched products, and grown revenue — not just advised on how to do it."
            align="center"
          />

          <div className="mt-16 rounded-3xl border-2 border-dashed border-gray-200 px-8 py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
              <svg
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">
              Team profiles coming soon — add author entries in Contentful to populate this section.
            </p>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight text-balance mb-4">
              Let&apos;s build something great together
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              Book a free discovery call and let&apos;s talk about where your business is
              headed and how we can help you get there faster.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/contact" size="lg">
                Get in touch
              </Button>
              <Button href="/blog" variant="ghost" size="lg">
                Read our insights
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import BlogCard from '@/components/blog/BlogCard'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { getAllBlogPosts } from '@/lib/contentful'

export const revalidate = 3600

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const POSTS_PER_PAGE = 12

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clampPage(raw: string | undefined, total: number): number {
  const n = parseInt(raw ?? '1', 10)
  if (!Number.isFinite(n) || n < 1) return 1
  if (total > 0 && n > total) return total
  return n
}

/** Returns an array of page numbers and 'ellipsis' sentinels for the pagination UI. */
function getPaginationItems(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const items: (number | 'ellipsis')[] = [1]

  if (current > 3) items.push('ellipsis')

  const rangeStart = Math.max(2, current - 1)
  const rangeEnd = Math.min(total - 1, current + 1)
  for (let i = rangeStart; i <= rangeEnd; i++) items.push(i)

  if (current < total - 2) items.push('ellipsis')

  items.push(total)
  return items
}

function pageUrl(page: number): string {
  return page === 1 ? '/blog' : `/blog?page=${page}`
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

type PageProps = { searchParams: { page?: string } }

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const allPosts = await getAllBlogPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE) || 1
  const page = clampPage(searchParams.page, totalPages)

  const title =
    page === 1
      ? 'ThinkBiz Blog | Business Growth Insights'
      : `ThinkBiz Blog — Page ${page} | Business Growth Insights`
  const description =
    'Practical articles on growth strategy, leadership development, and data-driven marketing — written by the ThinkBiz team.'

  // Canonical for page 1 omits the query string
  const canonical = page === 1 ? `${SITE_URL}/blog` : `${SITE_URL}/blog?page=${page}`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPage({ searchParams }: PageProps) {
  const allPosts = await getAllBlogPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE) || 1
  const page = clampPage(searchParams.page, totalPages)

  const posts = allPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
  const paginationItems = getPaginationItems(page, totalPages)
  const hasPagination = totalPages > 1

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Blog', url: '/blog' }]} />

      {/* ------------------------------------------------------------------ */}
      {/* Page header                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-gray-200 bg-white py-14 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-3">
              Insights &amp; advice
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight text-balance mb-4">
              ThinkBiz Blog
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed text-pretty">
              Practical thinking on growth strategy, leadership, and marketing — written by
              practitioners who&apos;ve been in the room.
            </p>

            {allPosts.length > 0 && (
              <p className="mt-4 text-sm text-gray-400">
                {allPosts.length} article{allPosts.length !== 1 ? 's' : ''}
                {hasPagination && ` — page ${page} of ${totalPages}`}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Post grid                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <Container>
          {posts.length > 0 ? (
            <>
              <ul
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                role="list"
                aria-label="Blog posts"
              >
                {posts.map((post) => (
                  <li key={post.sys.id}>
                    <BlogCard post={post} />
                  </li>
                ))}
              </ul>

              {/* ---------------------------------------------------------- */}
              {/* Pagination                                                   */}
              {/* ---------------------------------------------------------- */}
              {hasPagination && (
                <nav
                  aria-label="Blog pagination"
                  className="mt-16 flex flex-wrap items-center justify-center gap-2"
                >
                  {/* Previous */}
                  {page > 1 ? (
                    <Link
                      href={pageUrl(page - 1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm
                                 font-medium text-gray-700 border border-gray-300 bg-white
                                 hover:bg-gray-50 transition-colors duration-200
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      rel="prev"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                      Previous
                    </Link>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm
                                 font-medium text-gray-300 border border-gray-200 bg-white
                                 cursor-not-allowed select-none"
                      aria-disabled="true"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                      Previous
                    </span>
                  )}

                  {/* Page numbers */}
                  {paginationItems.map((item, idx) =>
                    item === 'ellipsis' ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-2 text-gray-400 select-none"
                        aria-hidden="true"
                      >
                        &hellip;
                      </span>
                    ) : item === page ? (
                      <span
                        key={item}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg
                                   text-sm font-semibold bg-primary text-white"
                        aria-current="page"
                        aria-label={`Page ${item}, current`}
                      >
                        {item}
                      </span>
                    ) : (
                      <Link
                        key={item}
                        href={pageUrl(item)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg
                                   text-sm font-medium text-gray-700 border border-gray-300 bg-white
                                   hover:bg-gray-50 transition-colors duration-200
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label={`Page ${item}`}
                      >
                        {item}
                      </Link>
                    ),
                  )}

                  {/* Next */}
                  {page < totalPages ? (
                    <Link
                      href={pageUrl(page + 1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm
                                 font-medium text-gray-700 border border-gray-300 bg-white
                                 hover:bg-gray-50 transition-colors duration-200
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      rel="next"
                    >
                      Next
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm
                                 font-medium text-gray-300 border border-gray-200 bg-white
                                 cursor-not-allowed select-none"
                      aria-disabled="true"
                    >
                      Next
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  )}
                </nav>
              )}
            </>
          ) : (
            /* ── Empty state ─────────────────────────────────────────── */
            <div className="mx-auto max-w-md text-center py-16">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center
                              rounded-full bg-primary-50">
                <svg className="h-8 w-8 text-primary/40" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504
                       1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25
                       2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3
                       4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No posts published yet
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Blog posts are managed in Contentful. Add your first post there and it will
                appear here automatically.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}

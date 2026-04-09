import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { getBlogPostBySlug, getAllBlogPosts, getRelatedPosts } from '@/lib/contentful'
import { richTextOptions } from '@/lib/richTextOptions'
import { formatDate, calculateReadTime } from '@/lib/utils'

import ArticleSchema from '@/components/seo/ArticleSchema'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import Container from '@/components/ui/Container'

import ScrollIndicator from '@/components/blog/ScrollIndicator'
import PageViewCounter from '@/components/blog/PageViewCounter'
import TableOfContents from '@/components/blog/TableOfContents'
import ShareButtons from '@/components/blog/ShareButtons'
import AuthorBox from '@/components/blog/AuthorBox'
import RelatedArticles from '@/components/blog/RelatedArticles'
import CommentSection from '@/components/blog/CommentSection'

export const revalidate = 3600

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const LOGO_URL = `${SITE_URL}/images/thinkbiz-horizontal-logo.svg`

// ---------------------------------------------------------------------------
// Static params — pre-generate pages for all published slugs
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((p) => ({ slug: p.fields.slug }))
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

type PageProps = { params: { slug: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  if (!post) return {}

  const { title, metaDescription, featuredImage, publishDate, updatedDate } = post.fields
  const authorName = post.fields.author?.fields?.name
  const canonical = `${SITE_URL}/blog/${post.fields.slug}`

  // dateModified >= datePublished per CLAUDE.md
  const modifiedTime = updatedDate && updatedDate > publishDate ? updatedDate : publishDate

  const ogImage = featuredImage?.fields?.file?.url
    ? `https:${featuredImage.fields.file.url}?fm=webp&w=1200&q=80`
    : undefined

  return {
    title,
    description: metaDescription,
    alternates: { canonical },
    openGraph: {
      title,
      description: metaDescription,
      url: canonical,
      type: 'article',
      publishedTime: publishDate,
      modifiedTime,
      ...(authorName ? { authors: [authorName] } : {}),
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: metaDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getBlogPostBySlug(params.slug)
  if (!post) notFound()

  const {
    title,
    slug,
    featuredImage,
    author,
    publishDate,
    updatedDate,
    body,
    category,
    tags,
    relatedPosts: manualRelated,
  } = post.fields

  // Date display per CLAUDE.md: show "Updated" when updatedDate is newer
  const isUpdated = Boolean(updatedDate && updatedDate > publishDate)
  const displayDate = isUpdated ? updatedDate! : publishDate
  const dateLabel = isUpdated ? 'Updated' : 'Published'

  const readTime = body ? calculateReadTime(body) : null
  const postUrl = `${SITE_URL}/blog/${slug}`

  const authorName = author?.fields?.name ?? 'ThinkBiz'
  const authorSlug = author?.fields?.slug ?? ''
  const authorHeadshotUrl = author?.fields?.headshot?.fields?.file?.url
    ? `https:${author.fields.headshot.fields.file.url}?fm=webp&w=80&q=80`
    : null

  const featuredImageUrl = featuredImage?.fields?.file?.url
    ? `https:${featuredImage.fields.file.url}?fm=webp&w=1440&q=80`
    : null
  const featuredImageWidth = featuredImage?.fields?.file?.details?.image?.width ?? 1440
  const featuredImageHeight = featuredImage?.fields?.file?.details?.image?.height ?? 600

  // Fetch related posts (manual overrides first, then tag matches)
  const manualRelatedIds = (manualRelated ?? []).map((p) => p.sys.id)
  const relatedPosts = await getRelatedPosts(slug, tags ?? [], manualRelatedIds)

  return (
    <>
      {/* ── Schemas ──────────────────────────────────────────────────── */}
      <ArticleSchema
        post={post}
        authorName={authorName}
        authorSlug={authorSlug}
        siteUrl={SITE_URL}
        logoUrl={LOGO_URL}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Blog', url: '/blog' },
          { name: title, url: `/blog/${slug}` },
        ]}
      />

      {/* ── Scroll progress bar ──────────────────────────────────────── */}
      <ScrollIndicator />

      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section className="bg-white">
        {/* Featured image */}
        {featuredImageUrl && (
          <div className="relative overflow-hidden" style={{ maxHeight: 520 }}>
            <Image
              src={featuredImageUrl}
              alt={featuredImage?.fields?.title ?? title}
              width={featuredImageWidth}
              height={featuredImageHeight}
              priority
              className="w-full object-cover"
              style={{ maxHeight: 520 }}
            />
            {/* Gradient overlay for text readability */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
              aria-hidden="true"
            />
          </div>
        )}

        <Container>
          <div className="max-w-3xl mx-auto py-10 sm:py-14">
            {/* Category badge */}
            {category && (
              <span
                className="mb-4 inline-block rounded-full bg-secondary/10 px-3 py-1
                           text-xs font-semibold text-secondary uppercase tracking-wide"
              >
                {category}
              </span>
            )}

            {/* Post title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900
                           leading-tight text-balance mb-6">
              {title}
            </h1>

            {/* Author row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {/* Author avatar + name */}
              <Link
                href={`/blog/author/${authorSlug}`}
                className="flex items-center gap-2 group focus-visible:outline-none
                           focus-visible:ring-2 focus-visible:ring-primary rounded-full"
              >
                {authorHeadshotUrl ? (
                  <Image
                    src={authorHeadshotUrl}
                    alt={authorName}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full
                               bg-primary text-white text-sm font-bold"
                    aria-hidden="true"
                  >
                    {authorName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-semibold text-gray-900
                                 group-hover:text-primary transition-colors duration-200">
                  {authorName}
                </span>
              </Link>

              <span className="text-gray-300 select-none" aria-hidden="true">·</span>

              <time dateTime={displayDate} className="text-sm text-gray-500">
                {dateLabel} {formatDate(displayDate)}
              </time>

              {readTime && (
                <>
                  <span className="text-gray-300 select-none" aria-hidden="true">·</span>
                  <span className="text-sm text-gray-500">{readTime}</span>
                </>
              )}

              <PageViewCounter slug={slug} />
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* ARTICLE BODY + SIDEBAR                                           */}
      {/* ================================================================ */}
      <div className="bg-gray-50 py-12 sm:py-16">
        <Container>
          {/*
            Desktop: [sidebar 280px] [article flex-1]
            Mobile:  single column, sidebar above article (collapsible)
          */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16
                          items-start">

            {/* ── Sidebar ─────────────────────────────────────────────── */}
            <aside className="lg:sticky lg:top-24">
              {/* Mobile collapsible TOC via <details> — no JS required */}
              <details className="lg:hidden mb-6 rounded-xl border border-gray-200 bg-white">
                <summary
                  className="flex items-center justify-between px-5 py-3 cursor-pointer
                             text-sm font-semibold text-gray-700 list-none
                             [&::-webkit-details-marker]:hidden"
                >
                  Table of contents
                  <svg className="h-4 w-4 transition-transform details-open:rotate-180"
                       fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 pt-2">
                  <TableOfContents contentId="article-body" />
                </div>
              </details>

              {/* Desktop sidebar — always visible, sticky */}
              <div className="hidden lg:flex flex-col gap-8">
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <TableOfContents contentId="article-body" />
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <ShareButtons url={postUrl} title={title} />
                </div>
              </div>
            </aside>

            {/* ── Main column ─────────────────────────────────────────── */}
            <main>
              {/* Rich text article body */}
              <article
                id="article-body"
                className="prose bg-white rounded-2xl border border-gray-100
                           shadow-sm px-6 py-8 sm:px-10 sm:py-10"
              >
                {body ? documentToReactComponents(body, richTextOptions) : null}
              </article>

              {/* Mobile share buttons below article */}
              <div className="lg:hidden mt-6 rounded-xl border border-gray-200 bg-white p-5">
                <ShareButtons url={postUrl} title={title} />
              </div>

              {/* Author box */}
              {author && <AuthorBox author={author} />}

              {/* Comments */}
              <CommentSection slug={slug} />
            </main>
          </div>
        </Container>
      </div>

      {/* ================================================================ */}
      {/* RELATED ARTICLES (hidden when empty)                             */}
      {/* ================================================================ */}
      <RelatedArticles posts={relatedPosts} />
    </>
  )
}

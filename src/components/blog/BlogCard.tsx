import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/lib/types'
import { formatDate, calculateReadTime } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const { title, slug, excerpt, featuredImage, author, publishDate, updatedDate, category, body } =
    post.fields

  // CLAUDE.md: "If updatedDate exists and is newer than publishDate, display 'Updated [date]'"
  const isUpdated = updatedDate && updatedDate > publishDate
  const displayDate = isUpdated ? updatedDate! : publishDate
  const dateLabel = isUpdated ? 'Updated' : 'Published'

  const imageUrl = featuredImage?.fields?.file?.url
    ? `https:${featuredImage.fields.file.url}?fm=webp&w=600&q=80`
    : null

  const readTime = body ? calculateReadTime(body) : null

  return (
    <article
      className="group flex flex-col rounded-2xl border border-gray-100 bg-white
                 overflow-hidden shadow-sm transition-all duration-200
                 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* ── Featured image ──────────────────────────────────────────────── */}
      {imageUrl ? (
        <Link href={`/blog/${slug}`} tabIndex={-1} aria-hidden="true"
              className="block overflow-hidden aspect-video shrink-0">
          <Image
            src={imageUrl}
            alt={featuredImage?.fields?.title ?? title}
            width={600}
            height={338}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      ) : (
        <div
          className="aspect-video shrink-0 flex items-center justify-center
                     bg-gradient-to-br from-primary-50 to-secondary/10"
          aria-hidden="true"
        >
          <svg className="h-10 w-10 text-primary/20" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5
                 l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0
                 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0
                 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0
                 .375.375 0 01.75 0z" />
          </svg>
        </div>
      )}

      {/* ── Card body ───────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category badge */}
        {category && (
          <span
            className="mb-3 self-start rounded-full bg-secondary/10 px-3 py-1
                       text-xs font-semibold text-secondary uppercase tracking-wide"
          >
            {category}
          </span>
        )}

        {/* Title — the primary link for this card */}
        <h3
          className="mb-2 text-lg font-semibold text-gray-900 leading-snug
                     group-hover:text-primary transition-colors duration-200 line-clamp-2"
        >
          <Link
            href={`/blog/${slug}`}
            className="focus-visible:outline-none focus-visible:ring-2
                       focus-visible:ring-primary rounded"
          >
            {title}
          </Link>
        </h3>

        {/* Excerpt — truncated via line-clamp */}
        {excerpt && (
          <p className="mb-4 text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
            {excerpt}
          </p>
        )}

        {/* ── Meta row ───────────────────────────────────────────────────── */}
        <div className="mt-auto flex items-center justify-between gap-3
                        pt-4 border-t border-gray-100">
          {/* Author */}
          <div className="flex items-center gap-2 min-w-0">
            {author?.fields?.headshot?.fields?.file?.url && (
              <Image
                src={`https:${author.fields.headshot.fields.file.url}?fm=webp&w=56&q=80`}
                alt={author.fields.name}
                width={28}
                height={28}
                className="rounded-full object-cover shrink-0"
              />
            )}
            {author?.fields?.name && (
              <span className="text-xs font-medium text-gray-600 truncate">
                {author.fields.name}
              </span>
            )}
          </div>

          {/* Date + read time */}
          <div className="flex items-center gap-2 shrink-0 text-xs text-gray-400">
            {readTime && (
              <>
                <span>{readTime}</span>
                <span aria-hidden="true">&middot;</span>
              </>
            )}
            <time dateTime={displayDate} title={dateLabel}>
              {formatDate(displayDate)}
            </time>
          </div>
        </div>
      </div>
    </article>
  )
}

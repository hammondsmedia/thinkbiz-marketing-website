import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/lib/types'
import { formatDate } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const { title, slug, excerpt, featuredImage, author, publishDate, updatedDate, category } =
    post.fields

  const displayDate = updatedDate ?? publishDate
  const imageUrl = featuredImage?.fields?.file?.url
    ? `https:${featuredImage.fields.file.url}?fm=webp&w=640&q=80`
    : null

  return (
    <article className="group flex flex-col rounded-2xl border border-gray-100 bg-white
                        overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Featured image */}
      {imageUrl ? (
        <Link href={`/blog/${slug}`} className="block overflow-hidden aspect-video shrink-0">
          <Image
            src={imageUrl}
            alt={featuredImage?.fields?.title ?? title}
            width={640}
            height={360}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      ) : (
        /* Placeholder when no featured image */
        <div className="aspect-video shrink-0 bg-gradient-to-br from-primary-50 to-secondary/10
                        flex items-center justify-center">
          <svg
            className="h-12 w-12 text-primary/20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25
                 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5
                 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375
                 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
      )}

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category badge */}
        {category && (
          <span className="mb-3 inline-block self-start rounded-full bg-secondary/10
                           px-3 py-1 text-xs font-semibold text-secondary uppercase tracking-wide">
            {category}
          </span>
        )}

        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold text-gray-900 leading-snug
                       group-hover:text-primary transition-colors duration-200 line-clamp-2">
          <Link href={`/blog/${slug}`} className="focus-visible:outline-none focus-visible:ring-2
                                                  focus-visible:ring-primary rounded">
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="mb-4 text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
            {excerpt}
          </p>
        )}

        {/* Meta row */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {author?.fields?.headshot?.fields?.file?.url && (
              <Image
                src={`https:${author.fields.headshot.fields.file.url}?fm=webp&w=64&q=80`}
                alt={author.fields.name}
                width={28}
                height={28}
                className="rounded-full object-cover"
              />
            )}
            {author?.fields?.name && (
              <span className="text-xs font-medium text-gray-600">{author.fields.name}</span>
            )}
          </div>
          <time
            dateTime={displayDate}
            className="text-xs text-gray-400"
          >
            {formatDate(displayDate)}
          </time>
        </div>
      </div>
    </article>
  )
}

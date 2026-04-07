// Server Component — renders Article LD-JSON for blog post pages.
// Used in src/app/blog/[slug]/page.tsx

import type { BlogPost } from '@/lib/types'
import { getWordCount } from '@/lib/utils'

interface ArticleSchemaProps {
  post: BlogPost
  authorName: string
  authorSlug: string
  siteUrl: string
  /** Absolute URL to the publisher logo image */
  logoUrl: string
}

export default function ArticleSchema({
  post,
  authorName,
  authorSlug,
  siteUrl,
  logoUrl,
}: ArticleSchemaProps) {
  const { title, slug, metaDescription, featuredImage, publishDate, updatedDate, body, category } =
    post.fields

  const postUrl = `${siteUrl}/blog/${slug}`
  const authorUrl = `${siteUrl}/blog/author/${authorSlug}`

  const imageUrl = featuredImage?.fields?.file?.url
    ? `https:${featuredImage.fields.file.url}?fm=webp&w=1200&q=80`
    : undefined

  // dateModified must be >= datePublished per CLAUDE.md
  const dateModified = updatedDate && updatedDate > publishDate ? updatedDate : publishDate

  const wordCount = body ? getWordCount(body) : undefined

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    headline: title,
    description: metaDescription,
    ...(imageUrl ? { image: imageUrl } : {}),
    datePublished: publishDate,
    dateModified,
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ThinkBiz',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: logoUrl,
      },
    },
    ...(wordCount !== undefined ? { wordCount } : {}),
    ...(category ? { articleSection: category } : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

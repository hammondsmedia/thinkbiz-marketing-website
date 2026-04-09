import { createClient } from 'contentful'
import type { BlogPostSkeleton, AuthorSkeleton, BlogPost, Author } from './types'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT ?? 'master',
})

const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
  host: 'preview.contentful.com',
  environment: process.env.CONTENTFUL_ENVIRONMENT ?? 'master',
})

export { client, previewClient }

// ---------------------------------------------------------------------------
// Blog posts
// ---------------------------------------------------------------------------

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await client.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      order: ['-fields.publishDate' as any],
      limit: 1000,
    })
    return response.items as unknown as BlogPost[]
  } catch {
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await client.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'fields.slug': slug as any,
      include: 2,
      limit: 1,
    })
    return (response.items[0] as unknown as BlogPost) ?? null
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Authors
// ---------------------------------------------------------------------------

export async function getAllAuthors(): Promise<Author[]> {
  try {
    const response = await client.getEntries<AuthorSkeleton>({
      content_type: 'author',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      order: ['fields.name' as any],
      limit: 1000,
    })
    return response.items as unknown as Author[]
  } catch {
    return []
  }
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const response = await client.getEntries<AuthorSkeleton>({
      content_type: 'author',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'fields.slug': slug as any,
      limit: 1,
    })
    return (response.items[0] as unknown as Author) ?? null
  } catch {
    return null
  }
}

export async function getPostsByAuthor(authorId: string): Promise<BlogPost[]> {
  try {
    const response = await client.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'fields.author.sys.id': authorId as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      order: ['-fields.publishDate' as any],
      limit: 1000,
    })
    return response.items as unknown as BlogPost[]
  } catch {
    return []
  }
}

// ---------------------------------------------------------------------------
// Related posts
// Priority: manual overrides → tag matches → empty. Max 3. Excludes current.
// ---------------------------------------------------------------------------

export async function getRelatedPosts(
  currentSlug: string,
  tags: string[] = [],
  manualRelatedIds: string[] = [],
): Promise<BlogPost[]> {
  const result: BlogPost[] = []

  // 1. Manual overrides by entry ID
  if (manualRelatedIds.length > 0) {
    try {
      const manual = await client.getEntries<BlogPostSkeleton>({
        content_type: 'blogPost',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        'sys.id[in]': manualRelatedIds.join(',') as any,
        limit: 3,
      })
      const filtered = (manual.items as unknown as BlogPost[]).filter(
        (p) => p.fields.slug !== currentSlug,
      )
      result.push(...filtered)
    } catch {
      // continue to tag fallback
    }
  }

  // 2. Tag matches to fill remaining slots
  if (result.length < 3 && tags.length > 0) {
    try {
      const tagMatches = await client.getEntries<BlogPostSkeleton>({
        content_type: 'blogPost',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        'fields.tags[in]': tags.join(',') as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        'fields.slug[ne]': currentSlug as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        order: ['-fields.publishDate' as any],
        limit: 3,
      })
      const existingIds = new Set(result.map((p) => p.sys.id))
      const newPosts = (tagMatches.items as unknown as BlogPost[]).filter(
        (p) => !existingIds.has(p.sys.id),
      )
      result.push(...newPosts)
    } catch {
      // return what we have
    }
  }

  return result.slice(0, 3)
}

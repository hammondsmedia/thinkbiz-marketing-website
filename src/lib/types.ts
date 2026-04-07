import type { Document } from '@contentful/rich-text-types'
import type { EntrySkeletonType, EntryFieldTypes } from 'contentful'

// Re-exported for use throughout the app
export type { Document as RichTextDocument }

// ---------------------------------------------------------------------------
// Contentful skeleton types (used for SDK query generics only)
// ---------------------------------------------------------------------------

export interface AuthorSkeleton extends EntrySkeletonType {
  contentTypeId: 'author'
  fields: {
    name: EntryFieldTypes.Symbol
    slug: EntryFieldTypes.Symbol
    headshot: EntryFieldTypes.AssetLink
    shortBio: EntryFieldTypes.Text
    fullBio: EntryFieldTypes.RichText
    linkedInUrl: EntryFieldTypes.Symbol
    role: EntryFieldTypes.Symbol
  }
}

export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'blogPost'
  fields: {
    title: EntryFieldTypes.Symbol
    slug: EntryFieldTypes.Symbol
    metaDescription: EntryFieldTypes.Text
    featuredImage: EntryFieldTypes.AssetLink
    author: EntryFieldTypes.EntryLink<AuthorSkeleton>
    publishDate: EntryFieldTypes.Date
    updatedDate: EntryFieldTypes.Date
    body: EntryFieldTypes.RichText
    excerpt: EntryFieldTypes.Text
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
    category: EntryFieldTypes.Symbol
    relatedPosts: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<BlogPostSkeleton>>
  }
}

export interface FormSubmissionSkeleton extends EntrySkeletonType {
  contentTypeId: 'formSubmission'
  fields: {
    name: EntryFieldTypes.Symbol
    email: EntryFieldTypes.Symbol
    phone: EntryFieldTypes.Symbol
    message: EntryFieldTypes.Text
    source: EntryFieldTypes.Symbol
    submittedAt: EntryFieldTypes.Date
  }
}

// ---------------------------------------------------------------------------
// Domain types (used throughout app components and pages)
// Plain interfaces decoupled from the SDK generics for ease of use.
// ---------------------------------------------------------------------------

export interface ContentfulImageFile {
  url: string
  contentType: string
  details: {
    size: number
    image?: { width: number; height: number }
  }
}

export interface ContentfulAsset {
  sys: { id: string }
  fields: {
    title: string
    description: string
    file: ContentfulImageFile
  }
}

export interface Author {
  sys: { id: string; createdAt: string; updatedAt: string }
  fields: {
    name: string
    slug: string
    headshot: ContentfulAsset
    shortBio: string
    fullBio: Document
    linkedInUrl?: string
    role: string
  }
}

export interface BlogPost {
  sys: { id: string; createdAt: string; updatedAt: string }
  fields: {
    title: string
    slug: string
    metaDescription: string
    featuredImage: ContentfulAsset
    author: Author
    publishDate: string
    updatedDate?: string
    body: Document
    excerpt: string
    tags?: string[]
    category?: string
    relatedPosts?: BlogPost[]
  }
}

export interface FormSubmissionData {
  name: string
  email: string
  phone?: string
  message: string
  source: string
}

import type { Document, Block, Inline, Text } from '@contentful/rich-text-types'

// ---------------------------------------------------------------------------
// Date formatting
// ---------------------------------------------------------------------------

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ---------------------------------------------------------------------------
// Rich text word count + read time
// ---------------------------------------------------------------------------

function extractText(nodes: (Block | Inline | Text)[]): string {
  return nodes
    .map((node) => {
      if (node.nodeType === 'text') return (node as Text).value
      if ('content' in node) return extractText(node.content as (Block | Inline | Text)[])
      return ''
    })
    .join(' ')
}

export function getWordCount(richTextBody: Document): number {
  const text = extractText(richTextBody.content as (Block | Inline | Text)[])
  return text.split(/\s+/).filter(Boolean).length
}

export function calculateReadTime(richTextBody: Document): string {
  const words = getWordCount(richTextBody)
  const minutes = Math.max(1, Math.ceil(words / 238))
  return `${minutes} min read`
}

// ---------------------------------------------------------------------------
// Slugify
// ---------------------------------------------------------------------------

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

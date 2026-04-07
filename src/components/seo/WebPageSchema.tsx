// Server Component — renders WebPage LD-JSON.
// Used on static pages (About, Contact, Privacy Policy, etc.).
// Blog posts use Article schema instead (added in step 07).

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

interface WebPageSchemaProps {
  name: string
  description: string
  /** Relative path (e.g. '/about') or absolute URL */
  url: string
}

export default function WebPageSchema({ name, description, url }: WebPageSchemaProps) {
  const absoluteUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: absoluteUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'ThinkBiz',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ThinkBiz',
      url: SITE_URL,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

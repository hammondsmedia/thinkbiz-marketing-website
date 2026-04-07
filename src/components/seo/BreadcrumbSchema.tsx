// Server Component — renders BreadcrumbList LD-JSON.
// Usage: <BreadcrumbSchema items={[{ name: 'Blog', url: '/blog' }]} />
// Home is always injected as position 1; passed items start at position 2.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

interface BreadcrumbItem {
  name: string
  /** Relative path (e.g. '/blog') or absolute URL */
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const allItems = [{ name: 'Home', url: '/' }, ...items]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Server Component — renders Organization LD-JSON on every page via root layout.
// Update all PLACEHOLDER_* values once project-brief.md is finalised.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ThinkBiz',
  url: SITE_URL,
  description: 'PLACEHOLDER_SHORT_DESCRIPTION',
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/thinkbiz-horizontal-logo.svg`,
    width: 400,
    height: 80,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'PLACEHOLDER_STREET_ADDRESS',
    addressLocality: 'PLACEHOLDER_CITY',
    addressRegion: 'PLACEHOLDER_STATE',
    postalCode: 'PLACEHOLDER_POSTCODE',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: 'PLACEHOLDER_PHONE',
    email: 'PLACEHOLDER_EMAIL',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://www.linkedin.com/company/PLACEHOLDER_LINKEDIN_SLUG',
    'https://twitter.com/PLACEHOLDER_TWITTER',
  ],
}

export default function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

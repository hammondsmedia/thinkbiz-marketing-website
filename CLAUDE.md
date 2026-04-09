# CLAUDE.md — Project Context

## Project Brief
Read `project-brief.md` in this repo root for all client-specific variables (name, domain, colors, fonts, API keys, contact info). Reference it for every task.

## Tech Stack
- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- CMS: Contentful (Delivery API for reads, Management API for form submissions)
- Key-Value Store: Upstash Redis (@upstash/redis) for page views + comments
- Hosting: Vercel | Version Control: GitHub | Domain: GoDaddy → Vercel DNS
- Analytics: GA4 + Mixpanel + Microsoft Clarity, all managed via GTM
- Cookie Consent: CookieYes (external script, GTM Consent Mode v2)
- Bot Protection: Google reCAPTCHA v3 (invisible) on all forms
- Node 18+ LTS

## Architecture Rules
- Default to Server Components. Use "use client" only when necessary (interactivity, hooks, browser APIs).
- All images use Next.js `<Image>` with explicit width, height, alt. Priority for above-fold, lazy for below.
- All internal links use Next.js `<Link>`.
- Fonts loaded via `next/font` (no layout shift).
- ISR with `revalidate: 3600` on blog pages. Contentful webhook triggers on-demand revalidation via `/api/revalidate`.
- Zero build errors, zero build warnings.
- Target Lighthouse: Performance 95+, SEO 100, Accessibility 95+, Best Practices 95+.

## SEO — Non-Negotiable
- Every page: unique `<title>` (<60 chars), unique `<meta description>` (<155 chars), canonical URL, OG tags, Twitter Card tags.
- Organization schema (LD-JSON) on every page via root layout.
- Article schema on blog posts. BreadcrumbList on every page except home. WebPage schema on static pages. ProfilePage + Person on author pages. FAQPage schema auto-injected by `<FAQAccordion>` component.
- All schema uses `<script type="application/ld+json">`, absolute URLs, ISO 8601 dates.
- `dateModified` >= `datePublished` always.
- Use `generateMetadata()` for all pages. Never hardcode meta in JSX.

## E-E-A-T Compliance
All content must demonstrate Experience, Expertise, Authoritativeness, Trustworthiness:
- **Experience:** Author boxes with photo/bio/credentials on every article. First-person perspective where appropriate.
- **Expertise:** Author bios highlight qualifications. Content shows depth, not surface-level rewrites. Data and citations strengthen claims.
- **Authoritativeness:** Organization schema everywhere. Internal linking builds topical clusters. External links to authoritative sources.
- **Trustworthiness:** Privacy policy, visible contact info, SSL, reCAPTCHA, CookieYes consent, professional design, error-free content.

## Behavioral Science Principles
Apply to CTA placement, layout, form design, and trust signals:
- Place highest-value CTA above fold; repeat at natural decision points.
- Social proof near conversion actions (testimonials, view counts, trust badges).
- Reduce cognitive load: limit choices per section, clear visual hierarchy, progressive disclosure.
- Forms: fewest possible fields, clear progress/success states.
- Trust signals (certs, awards, security badges) near commitment points (forms, CTAs).

## Design Tokens
All design tokens defined as CSS custom properties in `globals.css` under `:root`. Referenced in `tailwind.config.ts` via `extend`. Changing a variable updates the entire site. The `/style-guide` page displays all tokens visually (hidden from nav, noindexed, blocked in robots.txt).

## Content in Contentful
- **blogPost:** title, slug, metaDescription, featuredImage, author (ref), publishDate, updatedDate, body (rich text), excerpt, tags, category, relatedPosts (refs)
- **author:** name, slug, headshot, shortBio, fullBio (rich text), linkedInUrl, role
- **formSubmission:** name, email, phone, message, source, submittedAt
- If `updatedDate` exists and is newer than `publishDate`, display "Updated [date]". Otherwise display "Published [date]". Never show both. Schema always populates both `datePublished` and `dateModified`.

## Data Layer
- Page views: Upstash Redis key `pageviews:{slug}` → integer. INCR on server-side page load.
- Comments: Redis key `comments:{slug}` → JSON array of `{ id, authorName, body, createdAt, approved }`. Only `approved: true` shown publicly.
- Contact form: POST to `/api/contact` → verify reCAPTCHA v3 (reject score < 0.5) → create entry in Contentful via Management API.

## Existing Assets
SVG logos, icons, and illustrations are already in `/public/images/`. Before creating any new image assets, check what exists there first. Use existing assets in components.

# Project Brief — ThinkBiz

## Client
- **Name:** ThinkBiz
- **Tagline:** PLACEHOLDER_TAGLINE
- **Description:** PLACEHOLDER_SHORT_DESCRIPTION (1–2 sentences about what the business does)

## Domain & URLs
- **Production domain:** PLACEHOLDER_DOMAIN (e.g. thinkbiz.com)
- **Site base URL:** https://PLACEHOLDER_DOMAIN
- **Canonical base URL:** https://PLACEHOLDER_DOMAIN

## Contact Info
- **Business email:** PLACEHOLDER_EMAIL (e.g. hello@thinkbiz.com)
- **Phone:** PLACEHOLDER_PHONE
- **Address:** PLACEHOLDER_ADDRESS
- **LinkedIn:** https://linkedin.com/company/PLACEHOLDER_LINKEDIN_SLUG
- **Twitter / X handle:** @PLACEHOLDER_TWITTER

## Brand Colors
Extracted from SVG logo assets.

| Token name          | Hex       | Usage                        |
|---------------------|-----------|------------------------------|
| `--color-primary`   | `#086788` | Primary dark teal            |
| `--color-secondary` | `#21bdc8` | Secondary cyan / teal        |
| `--color-accent`    | `#f0c808` | Accent yellow / gold         |
| `--color-white`     | `#ffffff` | White                        |
| `--color-gray-50`   | `#f9fafb` | Near-white backgrounds       |
| `--color-gray-900`  | `#111827` | Body text / near-black       |

Gradient (used in logo): `linear-gradient(180deg, #21bdc8 0%, #086788 100%)`

## Typography
- **Heading font:** PLACEHOLDER_HEADING_FONT (suggested: Inter or Geist)
- **Body font:** PLACEHOLDER_BODY_FONT (suggested: Inter or Geist)
- **Monospace font:** PLACEHOLDER_MONO_FONT (suggested: Geist Mono — for code blocks only)
- Fonts are loaded via `next/font` — update `app/layout.tsx` when chosen.

## Analytics & Tag Management
- **Google Tag Manager container ID:** GTM-PLACEHOLDER
- **GA4 Measurement ID:** G-PLACEHOLDER
- **Mixpanel project token:** PLACEHOLDER_MIXPANEL_TOKEN
- **Microsoft Clarity project ID:** PLACEHOLDER_CLARITY_ID

## Bot Protection
- **reCAPTCHA v3 site key:** PLACEHOLDER_RECAPTCHA_SITE_KEY
- **reCAPTCHA v3 secret key:** PLACEHOLDER_RECAPTCHA_SECRET_KEY (server-side only — store in env)

## Cookie Consent
- **CookieYes script URL:** https://cdn-cookieyes.com/client_data/PLACEHOLDER_COOKIEYES_ID/script.js

## CMS — Contentful
- **Space ID:** PLACEHOLDER_CONTENTFUL_SPACE_ID
- **Delivery API token (public read):** PLACEHOLDER_CONTENTFUL_DELIVERY_TOKEN
- **Preview API token:** PLACEHOLDER_CONTENTFUL_PREVIEW_TOKEN
- **Management API token (server-side only):** PLACEHOLDER_CONTENTFUL_MANAGEMENT_TOKEN
- **Environment:** master
- **Webhook secret (for on-demand revalidation):** PLACEHOLDER_CONTENTFUL_WEBHOOK_SECRET

## Key-Value Store — Upstash Redis
- **Redis REST URL:** PLACEHOLDER_UPSTASH_REDIS_REST_URL
- **Redis REST token:** PLACEHOLDER_UPSTASH_REDIS_REST_TOKEN

## Environment Variables
All secrets must be set in Vercel project settings and in a local `.env.local` (gitignored).

```
# Site
NEXT_PUBLIC_SITE_URL=https://PLACEHOLDER_DOMAIN

# Contentful
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=PLACEHOLDER_CONTENTFUL_SPACE_ID
NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN=PLACEHOLDER_CONTENTFUL_DELIVERY_TOKEN
CONTENTFUL_PREVIEW_TOKEN=PLACEHOLDER_CONTENTFUL_PREVIEW_TOKEN
CONTENTFUL_MANAGEMENT_TOKEN=PLACEHOLDER_CONTENTFUL_MANAGEMENT_TOKEN
CONTENTFUL_WEBHOOK_SECRET=PLACEHOLDER_CONTENTFUL_WEBHOOK_SECRET

# Upstash Redis
UPSTASH_REDIS_REST_URL=PLACEHOLDER_UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN=PLACEHOLDER_UPSTASH_REDIS_REST_TOKEN

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=PLACEHOLDER_RECAPTCHA_SITE_KEY
RECAPTCHA_SECRET_KEY=PLACEHOLDER_RECAPTCHA_SECRET_KEY

# Analytics (GTM loads GA4 + Mixpanel + Clarity)
NEXT_PUBLIC_GTM_ID=GTM-PLACEHOLDER
```

## Vercel Project
- **Project name:** PLACEHOLDER_VERCEL_PROJECT_NAME
- **Team / org slug:** PLACEHOLDER_VERCEL_TEAM_SLUG
- **GitHub repo:** hammondsmedia/thinkbiz-marketing-website

## Assets
SVG logos and illustrations are in `/assets/` at the repo root. Before the Next.js project is scaffolded, copy or move them to `public/images/` so Next.js can serve them.

| File                                  | Description                          |
|---------------------------------------|--------------------------------------|
| `assets/logos/thinkbiz-horizontal-logo.svg`   | Full horizontal wordmark       |
| `assets/logos/thinkbiz-stacked-logo.svg`      | Stacked wordmark (light bg)    |
| `assets/logos/thinkbiz-stacked-logo-white.svg`| Stacked wordmark (dark bg)     |
| `assets/logos/thinkbiz-emblem-logo.svg`       | Icon / emblem only             |
| `assets/logos/thinkbiz-favicon.svg`           | Favicon source SVG             |
| `assets/illustrations/team-work-illustration.svg`       | Team working together   |
| `assets/illustrations/follow-the-leader-illustration.svg` | Leadership illustration |
| `assets/illustrations/excitement-illustration.svg`      | Excitement / energy scene |
| `assets/illustrations/business-flying.svg`              | Growth / ambition scene   |
| `assets/illustrations/leadership-growth.svg`            | Leadership growth chart   |

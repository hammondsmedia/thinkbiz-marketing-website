// Server Component — full author card at the bottom of a blog article.

import Image from 'next/image'
import Link from 'next/link'
import type { Author } from '@/lib/types'

interface AuthorBoxProps {
  author: Author
}

export default function AuthorBox({ author }: AuthorBoxProps) {
  const { name, slug, shortBio, headshot, linkedInUrl, role } = author.fields

  const headshotUrl = headshot?.fields?.file?.url
    ? `https:${headshot.fields.file.url}?fm=webp&w=160&q=80`
    : null

  return (
    <aside
      className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8"
      aria-label={`About the author: ${name}`}
    >
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Headshot */}
        {headshotUrl ? (
          <Image
            src={headshotUrl}
            alt={name}
            width={80}
            height={80}
            className="rounded-full object-cover shrink-0"
          />
        ) : (
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center
                       rounded-full bg-primary text-white text-xl font-bold"
            aria-hidden="true"
          >
            {name.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-1">
            Written by
          </p>
          <h2 className="text-xl font-bold text-gray-900 mb-0.5">{name}</h2>
          {role && <p className="text-sm text-gray-500 mb-3">{role}</p>}
          {shortBio && (
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{shortBio}</p>
          )}

          <div className="flex flex-wrap gap-3">
            {/* LinkedIn */}
            {linkedInUrl && (
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300
                           bg-white px-4 py-2 text-xs font-semibold text-gray-700
                           hover:bg-gray-50 hover:text-primary transition-colors duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`${name} on LinkedIn`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853
                           0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9
                           1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337
                           7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063
                           2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0
                           0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24
                           24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            )}

            {/* Full bio link */}
            <Link
              href={`/blog/author/${slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2
                         text-xs font-semibold text-white hover:bg-primary-dark
                         transition-colors duration-200
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Read full bio
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}

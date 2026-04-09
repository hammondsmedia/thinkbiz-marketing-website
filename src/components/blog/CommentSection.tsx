'use client'

import { useState, useEffect, FormEvent } from 'react'
import Script from 'next/script'
import { formatDate } from '@/lib/utils'

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

interface Comment {
  id: string
  authorName: string
  body: string
  createdAt: string
}

interface CommentSectionProps {
  slug: string
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''

export default function CommentSection({ slug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loadStatus, setLoadStatus] = useState<'loading' | 'done' | 'error'>('loading')
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Fetch approved comments on mount
  useEffect(() => {
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json() as Promise<{ comments?: Comment[] }>)
      .then((d) => {
        setComments(d.comments ?? [])
        setLoadStatus('done')
      })
      .catch(() => setLoadStatus('error'))
  }, [slug])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const authorName = (data.get('authorName') as string).trim()
    const body = (data.get('body') as string).trim()

    // Client-side validation
    if (!authorName) {
      setErrorMsg('Please enter your name.')
      setSubmitStatus('error')
      return
    }
    if (body.length < 3) {
      setErrorMsg('Please write a comment (at least 3 characters).')
      setSubmitStatus('error')
      return
    }

    setSubmitStatus('submitting')
    setErrorMsg('')

    try {
      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(SITE_KEY, { action: 'comment_submit' })
            .then(resolve)
            .catch(reject)
        })
      })

      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, authorName, body, recaptchaToken }),
      })

      if (!res.ok) {
        const d = (await res.json()) as { error?: string }
        throw new Error(d.error ?? 'Failed to submit comment')
      }

      setSubmitStatus('success')
      form.reset()
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to submit comment. Please try again.')
      setSubmitStatus('error')
    }
  }

  return (
    <section className="mt-12 pt-10 border-t border-gray-200">
      {SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}

      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        {comments.length > 0
          ? `${comments.length} Comment${comments.length !== 1 ? 's' : ''}`
          : 'Comments'}
      </h2>

      {/* ── Comments list ──────────────────────────────────────────────── */}
      {loadStatus === 'done' && comments.length > 0 && (
        <ol className="space-y-6 mb-10" aria-label="Reader comments">
          {comments.map((c) => (
            <li key={c.id} className="rounded-xl bg-gray-50 border border-gray-100 p-5">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full
                               bg-primary text-white text-xs font-bold"
                    aria-hidden="true"
                  >
                    {c.authorName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{c.authorName}</span>
                </div>
                <time
                  dateTime={c.createdAt}
                  className="text-xs text-gray-400 shrink-0"
                >
                  {formatDate(c.createdAt)}
                </time>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap pl-10">
                {c.body}
              </p>
            </li>
          ))}
        </ol>
      )}

      {loadStatus === 'done' && comments.length === 0 && (
        <p className="text-sm text-gray-500 italic mb-8">
          No comments yet — be the first to share your thoughts!
        </p>
      )}

      {/* ── Comment form ───────────────────────────────────────────────── */}
      {submitStatus === 'success' ? (
        <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-center">
          <svg className="mx-auto mb-3 h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-semibold text-gray-900 mb-1">Comment submitted for review</p>
          <p className="text-sm text-gray-600">
            Thank you! Your comment will appear once approved.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-5">
            Leave a comment
          </h3>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="cs-name" className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="cs-name"
                name="authorName"
                type="text"
                required
                autoComplete="name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                           text-gray-900 placeholder-gray-400 transition-colors duration-200
                           focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Your name"
              />
            </div>

            {/* Comment */}
            <div>
              <label htmlFor="cs-body" className="block text-sm font-medium text-gray-700 mb-1">
                Comment <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <textarea
                id="cs-body"
                name="body"
                required
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                           text-gray-900 placeholder-gray-400 resize-y transition-colors duration-200
                           focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Share your thoughts…"
              />
            </div>

            {/* Error */}
            {submitStatus === 'error' && (
              <p role="alert"
                 className="rounded-lg bg-red-50 border border-red-200 px-4 py-3
                            text-sm text-red-700">
                {errorMsg}
              </p>
            )}

            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={submitStatus === 'submitting'}
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white
                           transition-colors duration-200 hover:bg-primary-dark
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                           focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitStatus === 'submitting' ? 'Submitting…' : 'Post comment'}
              </button>

              <p className="text-xs text-gray-400">
                All comments are reviewed before publishing.
              </p>
            </div>

            <p className="text-xs text-gray-400">
              Protected by reCAPTCHA.{' '}
              <a href="https://policies.google.com/privacy" target="_blank"
                 rel="noopener noreferrer" className="underline hover:text-gray-600">Privacy</a>
              {' '}&amp;{' '}
              <a href="https://policies.google.com/terms" target="_blank"
                 rel="noopener noreferrer" className="underline hover:text-gray-600">Terms</a>.
            </p>
          </form>
        </div>
      )}
    </section>
  )
}

'use client'

import { useState, useRef, FormEvent } from 'react'
import Script from 'next/script'

// Minimal grecaptcha global declaration
declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

interface FormState {
  status: 'idle' | 'submitting' | 'success' | 'error'
  errorMessage: string
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''

export default function ContactForm() {
  const [state, setState] = useState<FormState>({ status: 'idle', errorMessage: '' })
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState({ status: 'submitting', errorMessage: '' })

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      // Get reCAPTCHA v3 token (invisible)
      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(SITE_KEY, { action: 'contact_submit' })
            .then(resolve)
            .catch(reject)
        })
      })

      const payload = {
        name: data.get('name') as string,
        email: data.get('email') as string,
        phone: data.get('phone') as string,
        message: data.get('message') as string,
        recaptchaToken,
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const body = (await res.json()) as { error?: string }
        throw new Error(body.error ?? 'Something went wrong')
      }

      setState({ status: 'success', errorMessage: '' })
      formRef.current?.reset()
    } catch (err) {
      setState({
        status: 'error',
        errorMessage: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      })
    }
  }

  return (
    <>
      {/* Load reCAPTCHA v3 — invisible, no badge shown to end user */}
      {SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}

      {state.status === 'success' ? (
        <div className="rounded-xl bg-success-light border border-success p-8 text-center">
          <svg
            className="mx-auto mb-4 h-12 w-12 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Message sent!</h3>
          <p className="text-gray-600">
            Thanks for reaching out. We&apos;ll be in touch within one business day.
          </p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full name <span className="text-error" aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900
                         placeholder-gray-400 transition-colors duration-200
                         focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Jane Smith"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Work email <span className="text-error" aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900
                         placeholder-gray-400 transition-colors duration-200
                         focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="jane@company.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900
                         placeholder-gray-400 transition-colors duration-200
                         focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              How can we help? <span className="text-error" aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900
                         placeholder-gray-400 transition-colors duration-200 resize-y
                         focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Tell us about your business goals or challenges…"
            />
          </div>

          {/* Error */}
          {state.status === 'error' && (
            <p role="alert" className="rounded-lg bg-error-light border border-error px-4 py-3 text-sm text-error">
              {state.errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={state.status === 'submitting'}
            className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white
                       transition-colors duration-200 hover:bg-primary-dark
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                       disabled:cursor-not-allowed disabled:opacity-60"
          >
            {state.status === 'submitting' ? 'Sending…' : 'Send message'}
          </button>

          <p className="text-xs text-gray-400 text-center">
            Protected by reCAPTCHA.{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
              Privacy
            </a>{' '}
            &amp;{' '}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
              Terms
            </a>
            .
          </p>
        </form>
      )}
    </>
  )
}

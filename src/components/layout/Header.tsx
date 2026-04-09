'use client'

// Header — Client Component so we can detect scroll position for the shadow.

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from './Navigation'
import MobileMenu from './MobileMenu'
import { NAV_ITEMS } from './Navigation'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4)
    // Set initial value in case the page loads mid-scroll
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200
                  transition-shadow duration-200
                  ${scrolled ? 'shadow-md' : 'shadow-none'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 focus-visible:outline-none
                       focus-visible:ring-2 focus-visible:ring-primary rounded"
            aria-label="ThinkBiz — home"
          >
            <Image
              src="/images/thinkbiz-horizontal-logo.svg"
              alt="ThinkBiz"
              width={162}
              height={45}
              priority
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop nav (hidden on mobile) */}
          <Navigation />

          {/* Right side: desktop CTA + mobile hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center
                         px-5 py-2 bg-primary text-white
                         text-sm font-semibold rounded-lg
                         hover:bg-primary-dark
                         transition-colors duration-200
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Get Started
            </Link>

            {/* MobileMenu renders the hamburger button + drawer */}
            <MobileMenu items={NAV_ITEMS} />
          </div>

        </div>
      </div>
    </header>
  )
}

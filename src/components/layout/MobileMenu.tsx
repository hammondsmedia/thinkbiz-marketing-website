'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { NavItem } from './Navigation'

interface MobileMenuProps {
  items: NavItem[]
}

// Selector for all keyboard-focusable elements
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const drawerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Close on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Escape key closes the menu
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen])

  // Focus trap — confine Tab / Shift+Tab to drawer elements
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return

    const drawer = drawerRef.current
    const focusableEls = Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE))
    const first = focusableEls[0]
    const last = focusableEls[focusableEls.length - 1]

    // Move focus into the drawer on open
    first?.focus()

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', trap)
    return () => document.removeEventListener('keydown', trap)
  }, [isOpen])

  return (
    <>
      {/* Hamburger / close toggle — visible on mobile only */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen((v) => !v)}
        className="md:hidden p-2 rounded-lg text-gray-600
                   hover:text-primary hover:bg-primary-50
                   transition-colors duration-200
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        aria-haspopup="dialog"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round"
               aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6"  y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round"
               aria-hidden="true">
            <line x1="3" y1="6"  x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Backdrop — closes menu on outside click */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/50 z-40 md:hidden
                    transition-opacity duration-300
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <div
        id="mobile-nav"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw]
                    bg-white shadow-xl z-50 md:hidden
                    flex flex-col
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-200 shrink-0">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image
              src="/images/thinkbiz-horizontal-logo.svg"
              alt="ThinkBiz"
              width={130}
              height={36}
              priority
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary-50
                       transition-colors focus-visible:outline-none focus-visible:ring-2
                       focus-visible:ring-primary"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round"
                 aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6"  y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Mobile navigation links">
          <ul className="space-y-1">
            {items.map((item) => {
              const isActive =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center px-4 py-3 rounded-lg text-base font-medium
                                transition-colors duration-200
                                ${
                                  isActive
                                    ? 'bg-primary-50 text-primary'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                                }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* CTA */}
        <div className="px-4 pb-8 pt-2 shrink-0 border-t border-gray-100">
          <Link
            href="/contact"
            className="flex items-center justify-center w-full
                       px-6 py-3 bg-primary text-white
                       text-base font-semibold rounded-lg
                       hover:bg-primary-dark transition-colors duration-200
                       focus-visible:outline-none focus-visible:ring-2
                       focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  )
}

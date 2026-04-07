'use client'

// Desktop navigation — Client Component so we can use usePathname() for active state.

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface NavItem {
  label: string
  href: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home',    href: '/' },
  { label: 'About',   href: '/about' },
  { label: 'Blog',    href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav aria-label="Main navigation">
      <ul className="hidden md:flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          // Home only matches exact '/'; all others match on prefix so /blog/post highlights Blog.
          const isActive =
            item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`px-4 py-2 text-sm font-medium rounded-lg
                            transition-colors duration-200
                            ${
                              isActive
                                ? 'text-primary bg-primary-50'
                                : 'text-gray-600 hover:text-primary hover:bg-primary-50'
                            }`}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

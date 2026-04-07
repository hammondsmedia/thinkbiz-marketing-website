// Desktop navigation links — Server Component.
// Shared between Header and any future nav contexts.

import Link from 'next/link'

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
  return (
    <nav aria-label="Main navigation">
      <ul className="hidden md:flex items-center gap-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg
                         hover:text-primary hover:bg-primary-50
                         transition-colors duration-200"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

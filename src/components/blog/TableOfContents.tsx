'use client'

import { useState, useEffect, useRef } from 'react'

interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

interface TableOfContentsProps {
  /** ID of the element containing the article body (h2/h3 headings are queried inside it) */
  contentId: string
}

/**
 * Auto-generates a table of contents from h2/h3 headings inside `contentId`.
 * Uses IntersectionObserver to highlight the currently visible heading.
 * Smooth-scrolls to the target on click.
 */
export default function TableOfContents({ contentId }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const container = document.getElementById(contentId)
    if (!container) return

    // Collect headings that have IDs (set by richTextOptions)
    const headingEls = Array.from(container.querySelectorAll<HTMLElement>('h2[id], h3[id]'))
    const tocItems: TocItem[] = headingEls.map((el) => ({
      id: el.id,
      text: el.textContent ?? '',
      level: el.tagName === 'H2' ? 2 : 3,
    }))
    setItems(tocItems)
    if (tocItems.length === 0) return

    // Activate the first heading by default
    setActiveId(tocItems[0].id)

    // IntersectionObserver: marks the topmost heading entering the viewport as active.
    // rootMargin -80px top accounts for the sticky header; -55% bottom means we highlight
    // the heading once it's scrolled into the upper ~45% of the viewport.
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting entry
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id)
        }
      },
      { rootMargin: '-80px 0% -55% 0%', threshold: 0 },
    )

    headingEls.forEach((el) => observerRef.current?.observe(el))

    return () => {
      observerRef.current?.disconnect()
    }
  }, [contentId])

  if (items.length < 2) return null

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Update active immediately so there's no lag on click
      setActiveId(id)
    }
  }

  return (
    <nav aria-label="Table of contents">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
        On this page
      </p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToHeading(item.id)}
              className={`block w-full text-left leading-snug py-1 text-sm transition-colors duration-150
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded
                          ${item.level === 3 ? 'pl-3 text-xs' : ''}
                          ${
                            activeId === item.id
                              ? 'text-primary font-semibold'
                              : 'text-gray-500 hover:text-gray-900'
                          }`}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

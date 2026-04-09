'use client'

import { useState, useEffect } from 'react'

/**
 * Fixed 3px progress bar at the very top of the viewport.
 * Fills left-to-right tracking how far the user has scrolled.
 * Uses the brand accent colour.
 */
export default function ScrollIndicator() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY ?? document.documentElement.scrollTop
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setProgress(maxScroll > 0 ? Math.min(100, (scrollTop / maxScroll) * 100) : 0)
    }

    window.addEventListener('scroll', update, { passive: true })
    // Set initial value for pages that load mid-scroll
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      aria-hidden="true"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 z-[60] h-[3px] bg-accent will-change-[width]"
      style={{ width: `${progress}%`, transition: 'none' }}
    />
  )
}

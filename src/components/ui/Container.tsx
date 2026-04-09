import type { ComponentPropsWithoutRef, ElementType } from 'react'

interface ContainerProps<T extends ElementType = 'div'> {
  /** HTML element to render. Defaults to 'div'. */
  as?: T
  /** Horizontal padding preset. Defaults to 'default'. */
  padding?: 'none' | 'default' | 'narrow'
  className?: string
  children: React.ReactNode
}

/**
 * Max-width centred container.
 * Uses --max-width (1280px) via `max-w-[var(--max-width)]`.
 *
 * Usage:
 *   <Container>…</Container>
 *   <Container as="section" padding="narrow">…</Container>
 */
export default function Container<T extends ElementType = 'div'>({
  as,
  padding = 'default',
  className = '',
  children,
  ...rest
}: ContainerProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
  const Tag = as ?? 'div'

  const paddingClass =
    padding === 'none'
      ? ''
      : padding === 'narrow'
      ? 'px-4 sm:px-6'
      : 'px-4 sm:px-6 lg:px-8'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TagAny = Tag as any
  return (
    <TagAny
      className={[
        'mx-auto w-full max-w-[var(--max-width)]',
        paddingClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </TagAny>
  )
}

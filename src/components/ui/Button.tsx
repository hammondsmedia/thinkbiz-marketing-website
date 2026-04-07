import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

// ---------------------------------------------------------------------------
// Variants + sizes
// ---------------------------------------------------------------------------

const variantClasses = {
  primary:
    'bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary',
  secondary:
    'bg-secondary text-white hover:bg-secondary-dark focus-visible:ring-secondary',
  accent:
    'bg-accent text-gray-900 hover:bg-accent-dark focus-visible:ring-accent',
  outline:
    'border-2 border-primary text-primary hover:bg-primary-50 focus-visible:ring-primary',
  ghost:
    'text-primary hover:bg-primary-50 focus-visible:ring-primary',
} as const

const sizeClasses = {
  sm:  'px-3 py-1.5 text-xs font-semibold rounded',
  md:  'px-5 py-2.5 text-sm font-semibold rounded-lg',
  lg:  'px-8 py-3.5 text-base font-semibold rounded-lg',
} as const

const baseClasses =
  'inline-flex items-center justify-center gap-2 transition-colors duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed'

export type ButtonVariant = keyof typeof variantClasses
export type ButtonSize    = keyof typeof sizeClasses

// ---------------------------------------------------------------------------
// Prop types — renders as <button>, <a>, or Next.js <Link>
// ---------------------------------------------------------------------------

type BaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
}

type ButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof BaseProps> & {
    href?: undefined
  }

type AnchorProps = BaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof BaseProps> & {
    href: string
    /** Use next/link for internal routes (default when href doesn't start with http) */
    external?: boolean
  }

type Props = ButtonProps | AnchorProps

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: Props) {
  const classes = [baseClasses, variantClasses[variant], sizeClasses[size], className]
    .filter(Boolean)
    .join(' ')

  if ('href' in rest && rest.href !== undefined) {
    const { href, external, ...anchorRest } = rest as AnchorProps
    const isExternal = external ?? href.startsWith('http')

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...anchorRest}
        >
          {children}
        </a>
      )
    }

    return (
      <Link href={href} className={classes} {...(anchorRest as object)}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<'button'>)}>
      {children}
    </button>
  )
}

// SectionHeading — consistent section title + optional eyebrow + subheading.
// Server Component.

interface SectionHeadingProps {
  /** Small label above the heading (e.g. "Our Services") */
  eyebrow?: string
  /** Main heading text */
  heading: string
  /** Optional supporting paragraph */
  subheading?: string
  /** Alignment. Defaults to 'center'. */
  align?: 'left' | 'center'
  /** HTML heading level. Defaults to 'h2'. */
  level?: 'h1' | 'h2' | 'h3'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  heading,
  subheading,
  align = 'center',
  level: Tag = 'h2',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && (
        <p
          className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3"
        >
          {eyebrow}
        </p>
      )}

      <Tag
        className="text-3xl sm:text-4xl font-bold text-gray-900
                   leading-tight text-balance"
      >
        {heading}
      </Tag>

      {subheading && (
        <p className="mt-4 text-lg text-gray-500 leading-relaxed text-pretty">
          {subheading}
        </p>
      )}
    </div>
  )
}

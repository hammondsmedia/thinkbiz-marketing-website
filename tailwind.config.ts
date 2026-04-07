import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // -----------------------------------------------------------------------
      // COLORS — every token maps to a CSS custom property in globals.css.
      // Usage: text-primary, bg-secondary, border-accent, etc.
      // -----------------------------------------------------------------------
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark:    'var(--color-primary-dark)',
          light:   'var(--color-primary-light)',
          50:      'var(--color-primary-50)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          dark:    'var(--color-secondary-dark)',
          light:   'var(--color-secondary-light)',
          50:      'var(--color-secondary-50)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          dark:    'var(--color-accent-dark)',
          light:   'var(--color-accent-light)',
          50:      'var(--color-accent-50)',
        },
        // Neutrals
        gray: {
          50:  'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
        },
        // Semantic
        success: {
          DEFAULT: 'var(--color-success)',
          light:   'var(--color-success-light)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          light:   'var(--color-warning-light)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          light:   'var(--color-error-light)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          light:   'var(--color-info-light)',
        },
        // Surface aliases
        bg:      'var(--color-bg)',
        surface: 'var(--color-bg-subtle)',
        muted:   'var(--color-bg-muted)',
        border:  'var(--color-border)',
      },

      // -----------------------------------------------------------------------
      // TYPOGRAPHY
      // -----------------------------------------------------------------------
      fontFamily: {
        sans:    ['var(--font-sans)'],
        mono:    ['var(--font-mono)'],
        heading: ['var(--font-heading)'],
      },
      fontSize: {
        xs:   ['var(--text-xs)',   { lineHeight: 'var(--leading-normal)' }],
        sm:   ['var(--text-sm)',   { lineHeight: 'var(--leading-normal)' }],
        base: ['var(--text-base)', { lineHeight: 'var(--leading-normal)' }],
        lg:   ['var(--text-lg)',   { lineHeight: 'var(--leading-relaxed)' }],
        xl:   ['var(--text-xl)',   { lineHeight: 'var(--leading-snug)' }],
        '2xl':['var(--text-2xl)', { lineHeight: 'var(--leading-snug)' }],
        '3xl':['var(--text-3xl)', { lineHeight: 'var(--leading-tight)' }],
        '4xl':['var(--text-4xl)', { lineHeight: 'var(--leading-tight)' }],
        '5xl':['var(--text-5xl)', { lineHeight: 'var(--leading-none)' }],
        '6xl':['var(--text-6xl)', { lineHeight: 'var(--leading-none)' }],
      },
      fontWeight: {
        normal:    'var(--weight-normal)',
        medium:    'var(--weight-medium)',
        semibold:  'var(--weight-semibold)',
        bold:      'var(--weight-bold)',
        extrabold: 'var(--weight-extrabold)',
      },
      lineHeight: {
        none:    'var(--leading-none)',
        tight:   'var(--leading-tight)',
        snug:    'var(--leading-snug)',
        normal:  'var(--leading-normal)',
        relaxed: 'var(--leading-relaxed)',
        loose:   'var(--leading-loose)',
      },

      // -----------------------------------------------------------------------
      // SPACING — extends Tailwind's default scale with named tokens
      // -----------------------------------------------------------------------
      spacing: {
        px: '1px',
        0: '0',
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        10: 'var(--space-10)',
        12: 'var(--space-12)',
        16: 'var(--space-16)',
        20: 'var(--space-20)',
        24: 'var(--space-24)',
        32: 'var(--space-32)',
      },

      // -----------------------------------------------------------------------
      // BORDER RADIUS
      // -----------------------------------------------------------------------
      borderRadius: {
        none: '0',
        sm:   'var(--radius-sm)',
        DEFAULT:'var(--radius-md)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        '2xl':'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },

      // -----------------------------------------------------------------------
      // SHADOWS
      // -----------------------------------------------------------------------
      boxShadow: {
        sm:    'var(--shadow-sm)',
        DEFAULT:'var(--shadow-md)',
        md:    'var(--shadow-md)',
        lg:    'var(--shadow-lg)',
        xl:    'var(--shadow-xl)',
        brand: 'var(--shadow-brand)',
        none:  '0 0 #0000',
      },

      // -----------------------------------------------------------------------
      // TRANSITIONS
      // -----------------------------------------------------------------------
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },

      // -----------------------------------------------------------------------
      // CONTAINER / MAX-WIDTH
      // -----------------------------------------------------------------------
      maxWidth: {
        prose: 'var(--container-prose)',
        sm:    'var(--container-sm)',
        md:    'var(--container-md)',
        lg:    'var(--container-lg)',
        xl:    'var(--container-xl)',
        '2xl': 'var(--container-2xl)',
      },
    },
  },
  plugins: [],
}

export default config

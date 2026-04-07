import type { Metadata } from 'next'

// Hidden from nav. Blocked in robots.txt (step 11). Noindexed here.
export const metadata: Metadata = {
  title: 'Style Guide',
  robots: { index: false, follow: false },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono text-gray-500 mt-2 truncate">{children}</p>
  )
}

// ---------------------------------------------------------------------------
// Color swatch
// ---------------------------------------------------------------------------

function Swatch({
  bg,
  label,
  light = false,
}: {
  bg: string
  label: string
  light?: boolean
}) {
  return (
    <div className="flex flex-col">
      <div
        className="h-16 w-full rounded-lg border border-gray-200"
        style={{ background: bg }}
      />
      <Label>{label}</Label>
      <p className={`text-xs ${light ? 'text-gray-400' : 'text-gray-700'}`}>{bg}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function StyleGuidePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-16">
        <p className="text-sm font-mono text-primary mb-2">Internal reference — not indexed</p>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">ThinkBiz Style Guide</h1>
        <p className="text-lg text-gray-500">
          All design tokens, typography scales, components, and usage patterns.
          Tokens live in <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">src/styles/globals.css</code>{' '}
          and are wired into Tailwind via{' '}
          <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">tailwind.config.ts</code>.
        </p>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* COLORS                                                               */}
      {/* ------------------------------------------------------------------ */}

      <Section title="Brand Colors">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Swatch bg="#086788" label="--color-primary" />
          <Swatch bg="#065572" label="--color-primary-dark" />
          <Swatch bg="#0a7ea6" label="--color-primary-light" />
          <Swatch bg="#e6f3f8" label="--color-primary-50" light />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <Swatch bg="#21bdc8" label="--color-secondary" />
          <Swatch bg="#1a9aa4" label="--color-secondary-dark" />
          <Swatch bg="#4dcdd6" label="--color-secondary-light" />
          <Swatch bg="#e8f9fa" label="--color-secondary-50" light />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <Swatch bg="#f0c808" label="--color-accent" />
          <Swatch bg="#c8a600" label="--color-accent-dark" />
          <Swatch bg="#f5d64a" label="--color-accent-light" />
          <Swatch bg="#fef9e1" label="--color-accent-50" light />
        </div>
      </Section>

      <Section title="Gradients">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div
              className="h-20 rounded-lg"
              style={{ background: 'linear-gradient(180deg, #21bdc8 0%, #086788 100%)' }}
            />
            <Label>--gradient-brand (vertical)</Label>
          </div>
          <div>
            <div
              className="h-20 rounded-lg"
              style={{ background: 'linear-gradient(90deg, #086788 0%, #21bdc8 100%)' }}
            />
            <Label>--gradient-brand-h (horizontal)</Label>
          </div>
        </div>
      </Section>

      <Section title="Neutral Scale">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {[
            ['#f9fafb', '50'],
            ['#f3f4f6', '100'],
            ['#e5e7eb', '200'],
            ['#d1d5db', '300'],
            ['#9ca3af', '400'],
            ['#6b7280', '500'],
            ['#4b5563', '600'],
            ['#374151', '700'],
            ['#1f2937', '800'],
            ['#111827', '900'],
          ].map(([hex, step]) => (
            <Swatch key={step} bg={hex} label={`gray-${step}`} light={Number(step) < 400} />
          ))}
        </div>
      </Section>

      <Section title="Semantic Colors">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Swatch bg="#16a34a" label="success" />
          <Swatch bg="#ca8a04" label="warning" />
          <Swatch bg="#dc2626" label="error" />
          <Swatch bg="#2563eb" label="info" />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* TYPOGRAPHY                                                           */}
      {/* ------------------------------------------------------------------ */}

      <Section title="Typography Scale">
        <div className="space-y-4">
          {[
            ['text-6xl', '3.75rem / 60px', 'The quick brown fox'],
            ['text-5xl', '3rem / 48px',    'The quick brown fox'],
            ['text-4xl', '2.25rem / 36px', 'The quick brown fox'],
            ['text-3xl', '1.875rem / 30px','The quick brown fox'],
            ['text-2xl', '1.5rem / 24px',  'The quick brown fox jumps'],
            ['text-xl',  '1.25rem / 20px', 'The quick brown fox jumps over'],
            ['text-lg',  '1.125rem / 18px','The quick brown fox jumps over the lazy dog'],
            ['text-base','1rem / 16px',     'The quick brown fox jumps over the lazy dog — body copy'],
            ['text-sm',  '0.875rem / 14px','The quick brown fox jumps over the lazy dog — small / captions'],
            ['text-xs',  '0.75rem / 12px', 'The quick brown fox — labels / meta / badges'],
          ].map(([cls, size, sample]) => (
            <div key={cls} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b border-gray-100 pb-4">
              <div className="w-28 shrink-0">
                <code className="text-xs text-primary bg-primary-50 px-2 py-0.5 rounded">{cls}</code>
                <p className="text-xs text-gray-400 mt-0.5">{size}</p>
              </div>
              <p className={`${cls} font-heading font-bold text-gray-900 leading-tight`}>{sample}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Font Weights">
        <div className="space-y-3">
          {[
            ['font-normal',    '400', 'The quick brown fox jumps over the lazy dog'],
            ['font-medium',    '500', 'The quick brown fox jumps over the lazy dog'],
            ['font-semibold',  '600', 'The quick brown fox jumps over the lazy dog'],
            ['font-bold',      '700', 'The quick brown fox jumps over the lazy dog'],
            ['font-extrabold', '800', 'The quick brown fox jumps over the lazy dog'],
          ].map(([cls, weight, sample]) => (
            <div key={cls} className="flex items-center gap-4">
              <code className="text-xs text-gray-500 font-mono w-36 shrink-0">{cls} ({weight})</code>
              <p className={`text-base text-gray-800 ${cls}`}>{sample}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SPACING                                                              */}
      {/* ------------------------------------------------------------------ */}

      <Section title="Spacing Scale">
        <div className="space-y-2">
          {[
            ['1',  '4px'],  ['2',  '8px'],  ['3',  '12px'], ['4',  '16px'],
            ['5',  '20px'], ['6',  '24px'], ['8',  '32px'], ['10', '40px'],
            ['12', '48px'], ['16', '64px'], ['20', '80px'], ['24', '96px'],
          ].map(([step, px]) => (
            <div key={step} className="flex items-center gap-4">
              <code className="text-xs text-gray-500 font-mono w-24 shrink-0">space-{step} ({px})</code>
              <div
                className="h-4 bg-primary rounded"
                style={{ width: px }}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* BORDER RADIUS                                                        */}
      {/* ------------------------------------------------------------------ */}

      <Section title="Border Radius">
        <div className="flex flex-wrap gap-6 items-end">
          {[
            ['rounded-sm',   '4px',    'rounded-sm'],
            ['rounded',      '8px',    'rounded'],
            ['rounded-lg',   '12px',   'rounded-lg'],
            ['rounded-xl',   '16px',   'rounded-xl'],
            ['rounded-2xl',  '24px',   'rounded-2xl'],
            ['rounded-full', '9999px', 'rounded-full'],
          ].map(([cls, px]) => (
            <div key={cls} className="flex flex-col items-center gap-2">
              <div className={`w-16 h-16 bg-primary-50 border-2 border-primary ${cls}`} />
              <code className="text-xs text-gray-500">{px}</code>
              <Label>{cls}</Label>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SHADOWS                                                              */}
      {/* ------------------------------------------------------------------ */}

      <Section title="Shadows">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {[
            ['shadow-sm',    'shadow-sm'],
            ['shadow',       'shadow (md)'],
            ['shadow-lg',    'shadow-lg'],
            ['shadow-xl',    'shadow-xl'],
            ['shadow-brand', 'shadow-brand'],
          ].map(([cls, label]) => (
            <div key={cls} className="flex flex-col items-center gap-3">
              <div className={`w-full h-16 bg-white rounded-lg ${cls}`} />
              <Label>{label}</Label>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* BUTTONS                                                              */}
      {/* ------------------------------------------------------------------ */}

      <Section title="Button Patterns">
        <p className="text-sm text-gray-500 mb-6">
          Reference patterns — full Button component built in step 04.
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          {/* Primary */}
          <button className="px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-200 text-sm">
            Primary CTA
          </button>
          {/* Secondary */}
          <button className="px-5 py-2.5 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-colors duration-200 text-sm">
            Secondary
          </button>
          {/* Accent */}
          <button className="px-5 py-2.5 bg-accent text-gray-900 font-semibold rounded-lg hover:bg-accent-dark transition-colors duration-200 text-sm">
            Accent
          </button>
          {/* Outline */}
          <button className="px-5 py-2.5 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary-50 transition-colors duration-200 text-sm">
            Outline
          </button>
          {/* Ghost */}
          <button className="px-5 py-2.5 text-primary font-semibold rounded-lg hover:bg-primary-50 transition-colors duration-200 text-sm">
            Ghost
          </button>
          {/* Disabled */}
          <button disabled className="px-5 py-2.5 bg-gray-200 text-gray-400 font-semibold rounded-lg cursor-not-allowed text-sm">
            Disabled
          </button>
        </div>

        {/* Sizes */}
        <div className="flex flex-wrap gap-4 items-center mt-6">
          <button className="px-3 py-1.5 bg-primary text-white font-semibold rounded text-xs">Small</button>
          <button className="px-5 py-2.5 bg-primary text-white font-semibold rounded-lg text-sm">Medium</button>
          <button className="px-8 py-3.5 bg-primary text-white font-semibold rounded-lg text-base">Large</button>
          <button className="px-10 py-4 bg-primary text-white font-bold rounded-xl text-lg">X-Large CTA</button>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* BADGES                                                               */}
      {/* ------------------------------------------------------------------ */}

      <Section title="Badges & Tags">
        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1 bg-primary-50 text-primary text-xs font-semibold rounded-full">Primary</span>
          <span className="px-3 py-1 bg-secondary-50 text-secondary-dark text-xs font-semibold rounded-full">Secondary</span>
          <span className="px-3 py-1 bg-accent-50 text-accent-dark text-xs font-semibold rounded-full">Accent</span>
          <span className="px-3 py-1 bg-success-light text-success text-xs font-semibold rounded-full">Success</span>
          <span className="px-3 py-1 bg-warning-light text-warning text-xs font-semibold rounded-full">Warning</span>
          <span className="px-3 py-1 bg-error-light text-error text-xs font-semibold rounded-full">Error</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">Neutral</span>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* PROSE PREVIEW                                                        */}
      {/* ------------------------------------------------------------------ */}

      <Section title="Prose / Rich Text">
        <div className="prose">
          <h2>H2 Heading — Article Section Title</h2>
          <h3>H3 Sub-heading — Supporting Detail</h3>
          <p>
            Body copy at 1rem / 16px with relaxed line-height. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. <a href="#">This is an inline link</a> that opens in a new tab.
            <strong> Bold text for emphasis.</strong>
          </p>
          <ul>
            <li>Unordered list item one</li>
            <li>Unordered list item two with more copy to test wrapping behaviour</li>
            <li>Unordered list item three</li>
          </ul>
          <blockquote>
            A blockquote sits here with a left border using the brand primary colour.
          </blockquote>
          <p>
            Inline <code>code snippet</code> and a standalone code block below.
          </p>
          <pre><code>npm install @contentful/rich-text-react-renderer</code></pre>
        </div>
      </Section>

      <footer className="mt-16 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-400 font-mono">
          ThinkBiz Style Guide — internal only — {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  )
}

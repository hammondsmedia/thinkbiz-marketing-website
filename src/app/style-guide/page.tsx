import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'

// Hidden from nav. Blocked in robots.txt (step 11). Noindexed here.
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Style Guide',
    robots: { index: false, follow: false },
  }
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
  return <p className="text-xs font-mono text-gray-500 mt-2 truncate">{children}</p>
}

function Swatch({ bg, label, light = false }: { bg: string; label: string; light?: boolean }) {
  return (
    <div className="flex flex-col">
      <div className="h-16 w-full rounded-lg border border-gray-200" style={{ background: bg }} />
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
    <Container className="py-16">
      <header className="mb-16">
        <p className="text-sm font-mono text-primary mb-2">Internal reference — not indexed</p>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">ThinkBiz Style Guide</h1>
        <p className="text-lg text-gray-500">
          All design tokens, typography scales, components, and usage patterns.
          Tokens live in{' '}
          <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">src/styles/globals.css</code>{' '}
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
            <div className="h-20 rounded-lg"
              style={{ background: 'linear-gradient(180deg,#21bdc8 0%,#086788 100%)' }} />
            <Label>--gradient-brand (vertical)</Label>
          </div>
          <div>
            <div className="h-20 rounded-lg"
              style={{ background: 'linear-gradient(90deg,#086788 0%,#21bdc8 100%)' }} />
            <Label>--gradient-brand-h (horizontal)</Label>
          </div>
        </div>
      </Section>

      <Section title="Neutral Scale">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {(['50','100','200','300','400','500','600','700','800','900'] as const).map((step) => {
            const hexMap: Record<string, string> = {
              '50':'#f9fafb','100':'#f3f4f6','200':'#e5e7eb','300':'#d1d5db',
              '400':'#9ca3af','500':'#6b7280','600':'#4b5563','700':'#374151',
              '800':'#1f2937','900':'#111827',
            }
            return (
              <Swatch key={step} bg={hexMap[step]} label={`gray-${step}`}
                      light={Number(step) < 400} />
            )
          })}
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
            ['text-6xl','3.75rem / 60px','Display heading'],
            ['text-5xl','3rem / 48px',   'Hero heading'],
            ['text-4xl','2.25rem / 36px','Page title'],
            ['text-3xl','1.875rem / 30px','Section heading'],
            ['text-2xl','1.5rem / 24px', 'Subsection heading'],
            ['text-xl', '1.25rem / 20px','Card heading'],
            ['text-lg', '1.125rem / 18px','Large body'],
            ['text-base','1rem / 16px',  'Body copy'],
            ['text-sm', '0.875rem / 14px','Small / captions'],
            ['text-xs', '0.75rem / 12px','Labels / meta / badges'],
          ].map(([cls, size, label]) => (
            <div key={cls}
              className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6
                         border-b border-gray-100 pb-4">
              <div className="w-32 shrink-0">
                <code className="text-xs text-primary bg-primary-50 px-2 py-0.5 rounded">{cls}</code>
                <p className="text-xs text-gray-400 mt-0.5">{size}</p>
              </div>
              <div>
                <p className={`${cls} font-bold text-gray-900 leading-tight`}>{label}</p>
                <p className={`${cls} text-gray-500`}>The quick brown fox jumps over the lazy dog</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Font Weights">
        <div className="space-y-3">
          {[
            ['font-normal',    '400'],
            ['font-medium',    '500'],
            ['font-semibold',  '600'],
            ['font-bold',      '700'],
            ['font-extrabold', '800'],
          ].map(([cls, weight]) => (
            <div key={cls} className="flex items-center gap-4">
              <code className="text-xs text-gray-500 font-mono w-36 shrink-0">{cls} ({weight})</code>
              <p className={`text-base text-gray-800 ${cls}`}>
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SPACING                                                              */}
      {/* ------------------------------------------------------------------ */}

      <Section title="Spacing Scale">
        <div className="space-y-2">
          {[['1','4px'],['2','8px'],['3','12px'],['4','16px'],['5','20px'],
            ['6','24px'],['8','32px'],['10','40px'],['12','48px'],['16','64px'],
            ['20','80px'],['24','96px']].map(([step, px]) => (
            <div key={step} className="flex items-center gap-4">
              <code className="text-xs text-gray-500 font-mono w-24 shrink-0">
                space-{step} ({px})
              </code>
              <div className="h-4 bg-primary rounded" style={{ width: px }} />
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* BORDER RADIUS + SHADOWS                                              */}
      {/* ------------------------------------------------------------------ */}

      <Section title="Border Radius">
        <div className="flex flex-wrap gap-6 items-end">
          {[['rounded-sm','4px'],['rounded','8px'],['rounded-lg','12px'],
            ['rounded-xl','16px'],['rounded-2xl','24px'],['rounded-full','9999px']
          ].map(([cls, px]) => (
            <div key={cls} className="flex flex-col items-center gap-2">
              <div className={`w-16 h-16 bg-primary-50 border-2 border-primary ${cls}`} />
              <code className="text-xs text-gray-500">{px}</code>
              <Label>{cls}</Label>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Shadows">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {[['shadow-sm','shadow-sm'],['shadow','shadow (md)'],['shadow-lg','shadow-lg'],
            ['shadow-xl','shadow-xl'],['shadow-brand','shadow-brand']
          ].map(([cls, label]) => (
            <div key={cls} className="flex flex-col items-center gap-3">
              <div className={`w-full h-16 bg-white rounded-lg ${cls}`} />
              <Label>{label}</Label>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* BUTTON COMPONENT                                                     */}
      {/* ------------------------------------------------------------------ */}

      <Section title="Button Component">
        <p className="text-sm text-gray-500 mb-6">
          <code className="bg-gray-100 px-1.5 py-0.5 rounded">src/components/ui/Button.tsx</code>
          {' '}— variants × sizes. Renders as{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded">&lt;button&gt;</code>,{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded">&lt;a&gt;</code>, or{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded">&lt;Link&gt;</code> based on{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded">href</code>.
        </p>

        {/* Variants */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Variants</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Sizes</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* As link */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              As Link (href prop)
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Button href="/contact">Internal Link</Button>
              <Button href="https://example.com" variant="outline">External Link ↗</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION HEADING COMPONENT                                            */}
      {/* ------------------------------------------------------------------ */}

      <Section title="SectionHeading Component">
        <p className="text-sm text-gray-500 mb-8">
          <code className="bg-gray-100 px-1.5 py-0.5 rounded">src/components/ui/SectionHeading.tsx</code>
        </p>
        <div className="space-y-12">
          <div className="p-8 bg-gray-50 rounded-xl">
            <SectionHeading
              eyebrow="Our Services"
              heading="Centered with eyebrow and subheading"
              subheading="This is the optional supporting paragraph that adds context below the main heading."
            />
          </div>
          <div className="p-8 bg-gray-50 rounded-xl">
            <SectionHeading
              heading="Left-aligned, no eyebrow"
              subheading="Left-aligned variant used inside content sections or two-column layouts."
              align="left"
            />
          </div>
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
      {/* CARDS                                                                */}
      {/* ------------------------------------------------------------------ */}

      <Section title="Cards">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Default card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <span className="text-xs font-semibold text-primary bg-primary-50 px-2 py-0.5 rounded-full">Category</span>
            <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">Default Card</h3>
            <p className="text-sm text-gray-500">Border + shadow-sm. Used for blog post cards and content listings.</p>
          </div>
          {/* Elevated card */}
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <span className="text-xs font-semibold text-secondary-dark bg-secondary-50 px-2 py-0.5 rounded-full">Featured</span>
            <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">Elevated Card</h3>
            <p className="text-sm text-gray-500">Shadow-lg, no border. Used for featured/highlighted content.</p>
          </div>
          {/* Brand card */}
          <div className="rounded-xl bg-primary p-6 text-white shadow-brand">
            <span className="text-xs font-semibold text-primary-50 bg-white/20 px-2 py-0.5 rounded-full">CTA</span>
            <h3 className="text-lg font-bold mt-3 mb-2">Brand Card</h3>
            <p className="text-sm text-primary-50">Primary background with brand shadow. Used for CTAs.</p>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* ALERTS                                                               */}
      {/* ------------------------------------------------------------------ */}

      <Section title="Alerts">
        <div className="space-y-3">
          {[
            ['Success', 'bg-success-light border-success text-success', 'Your changes have been saved successfully.'],
            ['Warning', 'bg-warning-light border-warning text-warning', 'Your account will expire in 3 days.'],
            ['Error',   'bg-error-light border-error text-error',       'There was a problem processing your request.'],
            ['Info',    'bg-info-light border-info text-info',          'A new version of the application is available.'],
          ].map(([label, classes, msg]) => (
            <div key={label} className={`flex gap-3 p-4 rounded-lg border-l-4 ${classes}`}>
              <span className="font-semibold text-sm">{label}:</span>
              <span className="text-sm">{msg}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* FORM ELEMENTS                                                        */}
      {/* ------------------------------------------------------------------ */}

      <Section title="Form Elements">
        <div className="max-w-lg space-y-5">
          {/* Text input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Text Input — default
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm
                         text-gray-900 placeholder-gray-400 bg-white
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         transition-colors duration-200"
            />
          </div>

          {/* Input — error state */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Text Input — error state
            </label>
            <input
              type="email"
              defaultValue="not-an-email"
              className="w-full px-4 py-2.5 rounded-lg border border-error text-sm
                         text-gray-900 bg-white
                         focus:outline-none focus:ring-2 focus:ring-error focus:border-transparent"
            />
            <p className="mt-1.5 text-xs text-error">Please enter a valid email address.</p>
          </div>

          {/* Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Textarea
            </label>
            <textarea
              placeholder="Enter your message…"
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm
                         text-gray-900 placeholder-gray-400 bg-white resize-y
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         transition-colors duration-200"
            />
          </div>

          {/* Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Select
            </label>
            <select
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm
                         text-gray-900 bg-white
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         transition-colors duration-200"
            >
              <option value="">Choose an option…</option>
              <option>Option One</option>
              <option>Option Two</option>
              <option>Option Three</option>
            </select>
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="sg-checkbox"
              defaultChecked
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary
                         focus:ring-primary focus:ring-offset-0"
            />
            <label htmlFor="sg-checkbox" className="text-sm text-gray-700">
              I agree to the{' '}
              <a href="/privacy-policy" className="text-primary underline">Privacy Policy</a>
            </label>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* PROSE / RICH TEXT                                                    */}
      {/* ------------------------------------------------------------------ */}

      <Section title="Prose / Rich Text">
        <div className="prose">
          <h2>H2 Heading — Article Section Title</h2>
          <h3>H3 Sub-heading — Supporting Detail</h3>
          <p>
            Body copy at 1rem / 16px with relaxed line-height. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.{' '}
            <a href="#">This is an inline link</a> that opens in a new tab.
            <strong> Bold for emphasis.</strong>
          </p>
          <ul>
            <li>Unordered list item one</li>
            <li>Unordered list item two with more copy to test wrapping</li>
            <li>Unordered list item three</li>
          </ul>
          <blockquote>
            A blockquote with the brand primary left border.
          </blockquote>
          <p>Inline <code>code snippet</code> and a block below.</p>
          <pre><code>npm install @contentful/rich-text-react-renderer</code></pre>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* BREAKPOINTS                                                          */}
      {/* ------------------------------------------------------------------ */}

      <Section title="Breakpoints">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 pr-6 font-semibold text-gray-700">Prefix</th>
                <th className="py-3 pr-6 font-semibold text-gray-700">Min width</th>
                <th className="py-3 font-semibold text-gray-700">Tailwind default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ['(none)',  '0px',    'All screen sizes'],
                ['sm',     '640px',  'Small devices and up'],
                ['md',     '768px',  'Tablets and up'],
                ['lg',     '1024px', 'Desktops and up'],
                ['xl',     '1280px', 'Wide desktops and up (--max-width)'],
                ['2xl',    '1536px', 'Extra wide screens'],
              ].map(([prefix, px, note]) => (
                <tr key={prefix}>
                  <td className="py-3 pr-6">
                    <code className="text-xs bg-primary-50 text-primary px-2 py-0.5 rounded">
                      {prefix}:
                    </code>
                  </td>
                  <td className="py-3 pr-6 font-mono text-gray-600">{px}</td>
                  <td className="py-3 text-gray-500">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <footer className="mt-16 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-400 font-mono">
          ThinkBiz Style Guide — internal only — {new Date().getFullYear()}
        </p>
      </footer>
    </Container>
  )
}

// Footer — Server Component.

import Image from 'next/image'
import Link from 'next/link'

const footerNav = {
  company: [
    { label: 'Home',           href: '/' },
    { label: 'About',          href: '/about' },
    { label: 'Blog',           href: '/blog' },
    { label: 'Contact',        href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ],
}

// Social link SVG icons — inline to avoid extra requests
function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853
               0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9
               1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337
               7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063
               2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0
               0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24
               24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401
               6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161
               17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" aria-label="ThinkBiz — home">
              <Image
                src="/images/thinkbiz-stacked-logo-white.svg"
                alt="ThinkBiz"
                width={120}
                height={120}
                className="h-16 w-auto mb-5"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              PLACEHOLDER_SHORT_DESCRIPTION
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/PLACEHOLDER_LINKEDIN_SLUG"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors duration-200"
                aria-label="ThinkBiz on LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://twitter.com/PLACEHOLDER_TWITTER"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors duration-200"
                aria-label="ThinkBiz on X (Twitter)"
              >
                <TwitterIcon />
              </a>
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Contact
            </h3>
            <address className="not-italic space-y-3 text-sm text-gray-400">
              <p>PLACEHOLDER_STREET_ADDRESS<br />
                PLACEHOLDER_CITY, PLACEHOLDER_STATE PLACEHOLDER_POSTCODE
              </p>
              <p>
                <a
                  href="tel:PLACEHOLDER_PHONE"
                  className="hover:text-white transition-colors duration-200"
                >
                  PLACEHOLDER_PHONE
                </a>
              </p>
              <p>
                <a
                  href="mailto:PLACEHOLDER_EMAIL"
                  className="hover:text-white transition-colors duration-200"
                >
                  PLACEHOLDER_EMAIL
                </a>
              </p>
            </address>

            {/* CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center mt-8
                         px-5 py-2.5 bg-accent text-gray-900
                         text-sm font-semibold rounded-lg
                         hover:bg-accent-dark transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6
                        flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {year} ThinkBiz. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            {footerNav.legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </footer>
  )
}

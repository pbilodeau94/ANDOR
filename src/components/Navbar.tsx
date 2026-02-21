'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

const publicLinks = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/clinical-trials', label: 'Clinical Trials' },
  { href: '/team', label: 'Team' },
  { href: '/support', label: 'Support' },
  { href: '/contact', label: 'Contact' },
]

const portalLinks = [
  { href: '/portal', label: 'Portal' },
]

export default function Navbar() {
  const pathname = usePathname()
  const isPortal = pathname.startsWith('/portal')
  const links = isPortal ? portalLinks : publicLinks
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[var(--color-rule)] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href={isPortal ? '/portal' : '/'} className="flex items-center gap-2 text-primary">
            <Logo className="h-7" />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-ink-secondary)] hover:text-[var(--color-primary)]'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-[var(--color-primary)]" />
                )}
              </Link>
            ))}
            <Link
              href={isPortal ? '/' : '/portal'}
              className="ml-4 rounded px-4 py-1.5 text-sm font-medium border border-[var(--color-rule)] text-[var(--color-ink-secondary)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              {isPortal ? 'Public Site' : 'Investigator Portal'}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden rounded-lg p-2 text-[var(--color-ink-secondary)] hover:bg-[var(--color-surface-alt)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[var(--color-rule)] bg-white md:hidden">
          <div className="space-y-1 px-4 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 text-sm font-medium ${
                  pathname === link.href
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-ink-secondary)] hover:text-[var(--color-primary)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={isPortal ? '/' : '/portal'}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-[var(--color-accent)]"
            >
              {isPortal ? 'Public Site' : 'Investigator Portal'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

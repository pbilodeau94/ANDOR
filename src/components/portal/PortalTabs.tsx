'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/portal', label: 'Dashboard' },
  { href: '/portal/grants', label: 'Grants' },
  { href: '/portal/projects', label: 'Projects' },
  { href: '/portal/trials', label: 'Clinical Trials' },
  { href: '/portal/tasks', label: 'Tasks' },
  { href: '/portal/agreements', label: 'Agreements' },
  { href: '/portal/meetings', label: 'Meetings' },
  { href: '/portal/documents', label: 'Documents' },
]

export default function PortalTabs() {
  const pathname = usePathname()

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Portal tabs">
          {tabs.map((tab) => {
            const isActive =
              pathname === '/portal'
                ? pathname === tab.href
                : pathname.startsWith(tab.href) && tab.href !== '/portal'
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

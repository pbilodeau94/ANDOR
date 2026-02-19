import Link from 'next/link'
import SectionWrapper from '@/components/SectionWrapper'
import DeadlineCard from '@/components/DeadlineCard'
import { grants, grantStatusLabels } from '@/data/grants'
import type { GrantStatus } from '@/data/grants'
import { projects } from '@/data/projects'
import { agreements } from '@/data/agreements'
import { documents } from '@/data/documents'

function getUpcomingDeadlines() {
  const now = new Date()
  const ninetyDays = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)
  return grants
    .filter((g) => g.deadline && new Date(g.deadline) >= now && new Date(g.deadline) <= ninetyDays)
    .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
}

function getStatusCounts() {
  const counts: Record<GrantStatus, number> = {
    not_started: 0,
    in_progress: 0,
    submitted: 0,
    funded: 0,
    completed: 0,
  }
  grants.forEach((g) => counts[g.status]++)
  return counts
}

function getTotalFunding() {
  return grants.reduce((sum, g) => sum + (g.amount || 0), 0)
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function PortalDashboard() {
  const upcoming = getUpcomingDeadlines()
  const statusCounts = getStatusCounts()
  const totalFunding = getTotalFunding()

  return (
    <>
      {/* Portal Header */}
      <div className="border-b border-gray-200 bg-[var(--color-surface-alt)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">Investigator Portal</h1>
          <p className="mt-2 text-gray-600">
            Track grants, research projects, agreements, and documents across ANDOR.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <SectionWrapper>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="text-sm text-gray-500">Total Grants</div>
            <div className="mt-1 text-3xl font-bold text-[var(--color-primary)]">{grants.length}</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="text-sm text-gray-500">Pipeline Value</div>
            <div className="mt-1 text-3xl font-bold text-[var(--color-primary)]">
              {formatCurrency(totalFunding)}
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="text-sm text-gray-500">Submitted</div>
            <div className="mt-1 text-3xl font-bold text-amber-600">{statusCounts.submitted}</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="text-sm text-gray-500">Funded</div>
            <div className="mt-1 text-3xl font-bold text-emerald-600">{statusCounts.funded}</div>
          </div>
        </div>
      </SectionWrapper>

      {/* Upcoming Deadlines */}
      <SectionWrapper alt>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--color-primary)]">Upcoming Deadlines</h2>
          <Link
            href="/portal/grants"
            className="text-sm font-medium text-[var(--color-accent)] hover:underline"
          >
            View all grants &rarr;
          </Link>
        </div>
        {upcoming.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((grant) => (
              <DeadlineCard key={grant.id} grant={grant} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-gray-500 italic">
            No deadlines in the next 90 days.
          </p>
        )}
      </SectionWrapper>

      {/* Status Breakdown */}
      <SectionWrapper>
        <h2 className="text-xl font-bold text-[var(--color-primary)]">Grant Pipeline by Status</h2>
        <div className="mt-6 space-y-3">
          {(Object.entries(statusCounts) as [GrantStatus, number][]).map(([status, count]) => (
            <div key={status} className="flex items-center gap-4">
              <div className="w-28 text-sm text-gray-600">{grantStatusLabels[status]}</div>
              <div className="flex-1">
                <div className="h-6 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-[var(--color-primary)] transition-all"
                    style={{ width: `${grants.length > 0 ? (count / grants.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div className="w-8 text-right text-sm font-semibold text-gray-700">{count}</div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Quick Links */}
      <SectionWrapper alt>
        <h2 className="text-xl font-bold text-[var(--color-primary)]">Quick Links</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              href: '/portal/grants',
              title: 'Grants Tracker',
              description: 'Full grant pipeline with Table and Board views',
              count: `${grants.length} grants`,
            },
            {
              href: '/portal/projects',
              title: 'Projects Tracker',
              description: 'Research projects with Table and Board views',
              count: `${projects.length} projects`,
            },
            {
              href: '/portal/agreements',
              title: 'Agreements Tracker',
              description: 'DUA and MTA status with partner institutions',
              count: `${agreements.length} agreements`,
            },
            {
              href: '/portal/documents',
              title: 'Documents',
              description: 'Biosketches, budgets, and support documents',
              count: `${documents.length} documents`,
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-[var(--color-primary)]">
                {link.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{link.description}</p>
              <p className="mt-2 text-xs font-medium text-[var(--color-accent)]">{link.count}</p>
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}

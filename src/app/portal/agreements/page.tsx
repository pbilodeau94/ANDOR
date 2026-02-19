'use client'

import { useState, useMemo } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import {
  agreements,
  agreementStatusLabels,
  agreementStatusColors,
  directionLabels,
} from '@/data/agreements'
import type { AgreementStatus } from '@/data/agreements'

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function AgreementsPage() {
  const [statusFilter, setStatusFilter] = useState<AgreementStatus | 'all'>('all')

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return agreements
    return agreements.filter((a) => a.status === statusFilter)
  }, [statusFilter])

  return (
    <>
      <div className="border-b border-gray-200 bg-[var(--color-surface-alt)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">DUA / MTA Tracker</h1>
          <p className="mt-2 text-gray-600">
            {agreements.length} data use and material transfer agreements
          </p>
        </div>
      </div>

      <SectionWrapper>
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as AgreementStatus | 'all')}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">All Statuses</option>
            {Object.entries(agreementStatusLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          {statusFilter !== 'all' && (
            <button
              onClick={() => setStatusFilter('all')}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[700px]">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Agreement
                </th>
                <th className="whitespace-nowrap py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Partner
                </th>
                <th className="whitespace-nowrap py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Type
                </th>
                <th className="whitespace-nowrap py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Direction
                </th>
                <th className="whitespace-nowrap py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Diseases
                </th>
                <th className="whitespace-nowrap py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Expiration
                </th>
                <th className="whitespace-nowrap py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((agreement) => (
                <tr key={agreement.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 pr-4">
                    <div className="max-w-xs text-sm font-medium text-gray-900 line-clamp-2">
                      {agreement.title}
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">
                    {agreement.partner}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">
                    {agreement.type}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-4">
                    <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                      {directionLabels[agreement.direction]}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap gap-1">
                      {agreement.diseases.map((d) => (
                        <span key={d} className="text-xs text-gray-500">
                          {d}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">
                    {formatDate(agreement.expirationDate)}
                  </td>
                  <td className="whitespace-nowrap py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${agreementStatusColors[agreement.status]}`}
                    >
                      {agreementStatusLabels[agreement.status]}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-sm text-gray-400 italic">
                    No agreements match the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-gray-400">
          Showing {filtered.length} of {agreements.length} agreements
        </p>
      </SectionWrapper>
    </>
  )
}

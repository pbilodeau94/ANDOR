'use client'

import { useState, useMemo } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import GrantRow from '@/components/GrantRow'
import { grants, grantStatusLabels } from '@/data/grants'
import type { GrantStatus } from '@/data/grants'

type SortKey = 'title' | 'pi' | 'agency' | 'amount' | 'deadline' | 'status'
type SortDir = 'asc' | 'desc'

export default function GrantsPage() {
  const [statusFilter, setStatusFilter] = useState<GrantStatus | 'all'>('all')
  const [piFilter, setPiFilter] = useState<string>('all')
  const [agencyFilter, setAgencyFilter] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('deadline')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const pis = useMemo(
    () => [...new Set(grants.map((g) => g.pi).filter(Boolean))].sort(),
    []
  )
  const agencies = useMemo(
    () => [...new Set(grants.map((g) => g.agency).filter(Boolean))].sort(),
    []
  )

  const filtered = useMemo(() => {
    let result = [...grants]
    if (statusFilter !== 'all') result = result.filter((g) => g.status === statusFilter)
    if (piFilter !== 'all') result = result.filter((g) => g.pi === piFilter)
    if (agencyFilter !== 'all') result = result.filter((g) => g.agency === agencyFilter)

    result.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'title':
          cmp = a.title.localeCompare(b.title)
          break
        case 'pi':
          cmp = (a.pi || '').localeCompare(b.pi || '')
          break
        case 'agency':
          cmp = a.agency.localeCompare(b.agency)
          break
        case 'amount':
          cmp = (a.amount || 0) - (b.amount || 0)
          break
        case 'deadline':
          if (!a.deadline && !b.deadline) cmp = 0
          else if (!a.deadline) cmp = 1
          else if (!b.deadline) cmp = -1
          else cmp = new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          break
        case 'status':
          cmp = a.status.localeCompare(b.status)
          break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })

    return result
  }, [statusFilter, piFilter, agencyFilter, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  function SortHeader({ label, field }: { label: string; field: SortKey }) {
    return (
      <th
        className="cursor-pointer whitespace-nowrap py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-700"
        onClick={() => toggleSort(field)}
      >
        {label}
        {sortKey === field && (
          <span className="ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
        )}
      </th>
    )
  }

  return (
    <>
      <div className="border-b border-gray-200 bg-[var(--color-surface-alt)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">Grants Tracker</h1>
          <p className="mt-2 text-gray-600">
            {grants.length} grants in the pipeline
          </p>
        </div>
      </div>

      <SectionWrapper>
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as GrantStatus | 'all')}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">All Statuses</option>
            {Object.entries(grantStatusLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={piFilter}
            onChange={(e) => setPiFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">All PIs</option>
            {pis.map((pi) => (
              <option key={pi} value={pi}>
                {pi}
              </option>
            ))}
          </select>

          <select
            value={agencyFilter}
            onChange={(e) => setAgencyFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">All Agencies</option>
            {agencies.map((agency) => (
              <option key={agency} value={agency}>
                {agency}
              </option>
            ))}
          </select>

          {(statusFilter !== 'all' || piFilter !== 'all' || agencyFilter !== 'all') && (
            <button
              onClick={() => {
                setStatusFilter('all')
                setPiFilter('all')
                setAgencyFilter('all')
              }}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[800px]">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <SortHeader label="Grant" field="title" />
                <SortHeader label="PI" field="pi" />
                <SortHeader label="Agency" field="agency" />
                <th className="whitespace-nowrap py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Mechanism
                </th>
                <SortHeader label="Amount" field="amount" />
                <SortHeader label="Deadline" field="deadline" />
                <SortHeader label="Status" field="status" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((grant) => (
                <GrantRow key={grant.id} grant={grant} />
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-sm text-gray-400 italic">
                    No grants match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-gray-400">
          Showing {filtered.length} of {grants.length} grants
        </p>
      </SectionWrapper>
    </>
  )
}

'use client'

import { useState, useMemo } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import ViewToggle, { type ViewMode } from '@/components/portal/ViewToggle'
import BoardView, { type BoardColumn } from '@/components/portal/BoardView'
import GrantCard from '@/components/portal/GrantCard'
import { grants, grantStatusLabels, grantStatusColors } from '@/data/grants'
import type { GrantStatus, Grant } from '@/data/grants'

type SortKey = 'title' | 'pi' | 'agency' | 'amount' | 'deadline' | 'status'
type SortDir = 'asc' | 'desc'

const boardColumns: BoardColumn<GrantStatus>[] = [
  { key: 'not_started', label: 'Not Started', color: 'bg-gray-100 text-gray-700' },
  { key: 'in_progress', label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
  { key: 'submitted', label: 'Submitted', color: 'bg-amber-100 text-amber-700' },
  { key: 'funded', label: 'Funded', color: 'bg-emerald-100 text-emerald-700' },
  { key: 'completed', label: 'Completed', color: 'bg-purple-100 text-purple-700' },
]

function formatCurrency(amount: number | null): string {
  if (!amount) return '\u2014'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '\u2014'
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function ExpandedGrantRow({ grant }: { grant: Grant }) {
  return (
    <tr>
      <td colSpan={8} className="bg-gray-50 px-4 py-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {grant.duration && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Duration</span>
              <p className="text-sm text-gray-700">{grant.duration}</p>
            </div>
          )}
          {grant.startDate && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Start Date</span>
              <p className="text-sm text-gray-700">{formatDate(grant.startDate)}</p>
            </div>
          )}
          {grant.keyPersonnel.length > 0 && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Key Personnel</span>
              <p className="text-sm text-gray-700">{grant.keyPersonnel.join(', ')}</p>
            </div>
          )}
          {grant.diseases.length > 0 && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Disease Areas</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {grant.diseases.map((d) => (
                  <span key={d} className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-600">{d}</span>
                ))}
              </div>
            </div>
          )}
          {grant.rfaUrl && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">RFA Link</span>
              <p>
                <a href={grant.rfaUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-accent)] hover:underline">
                  View RFA
                </a>
              </p>
            </div>
          )}
          {grant.documents.length > 0 && (
            <div className="sm:col-span-2 lg:col-span-3">
              <span className="text-xs font-semibold uppercase text-gray-400">Documents</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {grant.documents.map((doc, i) => (
                  <a
                    key={i}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  >
                    {doc.name}
                  </a>
                ))}
              </div>
            </div>
          )}
          {grant.notes && (
            <div className="sm:col-span-2 lg:col-span-3">
              <span className="text-xs font-semibold uppercase text-gray-400">Notes</span>
              <p className="text-sm text-gray-700">{grant.notes}</p>
            </div>
          )}
        </div>
      </td>
    </tr>
  )
}

export default function GrantsPage() {
  const [view, setView] = useState<ViewMode>('table')
  const [statusFilter, setStatusFilter] = useState<GrantStatus | 'all'>('all')
  const [piFilter, setPiFilter] = useState<string>('all')
  const [personnelFilter, setPersonnelFilter] = useState<string>('all')
  const [agencyFilter, setAgencyFilter] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('deadline')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const pis = useMemo(
    () => [...new Set(grants.map((g) => g.pi).filter(Boolean))].sort(),
    []
  )
  const allPersonnel = useMemo(
    () => [...new Set(grants.flatMap((g) => g.keyPersonnel).filter(Boolean))].sort(),
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
    if (personnelFilter !== 'all') result = result.filter((g) => g.keyPersonnel.includes(personnelFilter))
    if (agencyFilter !== 'all') result = result.filter((g) => g.agency === agencyFilter)

    result.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'title': cmp = a.title.localeCompare(b.title); break
        case 'pi': cmp = (a.pi || '').localeCompare(b.pi || ''); break
        case 'agency': cmp = a.agency.localeCompare(b.agency); break
        case 'amount': cmp = (a.amount || 0) - (b.amount || 0); break
        case 'deadline':
          if (!a.deadline && !b.deadline) cmp = 0
          else if (!a.deadline) cmp = 1
          else if (!b.deadline) cmp = -1
          else cmp = new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          break
        case 'status': cmp = a.status.localeCompare(b.status); break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })

    return result
  }, [statusFilter, piFilter, personnelFilter, agencyFilter, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const hasFilters = statusFilter !== 'all' || piFilter !== 'all' || personnelFilter !== 'all' || agencyFilter !== 'all'

  function clearFilters() {
    setStatusFilter('all')
    setPiFilter('all')
    setPersonnelFilter('all')
    setAgencyFilter('all')
  }

  function SortHeader({ label, field }: { label: string; field: SortKey }) {
    return (
      <th
        className="cursor-pointer whitespace-nowrap py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-700"
        onClick={() => toggleSort(field)}
      >
        {label}
        {sortKey === field && (
          <span className="ml-1">{sortDir === 'asc' ? '\u2191' : '\u2193'}</span>
        )}
      </th>
    )
  }

  return (
    <>
      <div className="border-b border-gray-200 bg-[var(--color-surface-alt)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[var(--color-primary)]">Grants Tracker</h1>
              <p className="mt-2 text-gray-600">
                {grants.length} grants in the pipeline
              </p>
            </div>
            <ViewToggle view={view} onChange={setView} />
          </div>
        </div>
      </div>

      <SectionWrapper>
        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as GrantStatus | 'all')}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">All Statuses</option>
            {Object.entries(grantStatusLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          <select
            value={piFilter}
            onChange={(e) => setPiFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">All PIs</option>
            {pis.map((pi) => (
              <option key={pi} value={pi}>{pi}</option>
            ))}
          </select>

          <select
            value={personnelFilter}
            onChange={(e) => setPersonnelFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">All Key Personnel</option>
            {allPersonnel.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>

          <select
            value={agencyFilter}
            onChange={(e) => setAgencyFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">All Agencies</option>
            {agencies.map((agency) => (
              <option key={agency} value={agency}>{agency}</option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Active filter chips */}
        {hasFilters && (
          <div className="mb-4 flex flex-wrap gap-2">
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
                Status: {grantStatusLabels[statusFilter]}
                <button onClick={() => setStatusFilter('all')} className="ml-1 hover:text-red-500">&times;</button>
              </span>
            )}
            {piFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
                PI: {piFilter}
                <button onClick={() => setPiFilter('all')} className="ml-1 hover:text-red-500">&times;</button>
              </span>
            )}
            {personnelFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
                Personnel: {personnelFilter}
                <button onClick={() => setPersonnelFilter('all')} className="ml-1 hover:text-red-500">&times;</button>
              </span>
            )}
            {agencyFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
                Agency: {agencyFilter}
                <button onClick={() => setAgencyFilter('all')} className="ml-1 hover:text-red-500">&times;</button>
              </span>
            )}
          </div>
        )}

        {view === 'table' ? (
          <>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[900px]">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="w-8 py-3 pl-4 pr-2"></th>
                    <SortHeader label="Grant" field="title" />
                    <SortHeader label="PI" field="pi" />
                    <th className="whitespace-nowrap py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Key Personnel
                    </th>
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
                    <>
                      <tr
                        key={grant.id}
                        className="cursor-pointer border-b border-gray-100 hover:bg-gray-50"
                        onClick={() => setExpandedId(expandedId === grant.id ? null : grant.id)}
                      >
                        <td className="py-3 pl-4 pr-2">
                          <svg
                            className={`h-4 w-4 text-gray-400 transition-transform ${expandedId === grant.id ? 'rotate-90' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="max-w-xs text-sm font-medium text-gray-900 line-clamp-2">{grant.title}</div>
                          {grant.diseases.length > 0 && (
                            <div className="mt-0.5 flex flex-wrap gap-1">
                              {grant.diseases.map((d) => (
                                <span key={d} className="text-xs text-gray-400">{d}</span>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">{grant.pi || '\u2014'}</td>
                        <td className="py-3 pr-4">
                          <div className="flex flex-wrap gap-1">
                            {grant.keyPersonnel.length > 0 ? grant.keyPersonnel.map((p) => (
                              <span key={p} className="text-xs text-gray-500">{p}</span>
                            )) : <span className="text-xs text-gray-400">{'\u2014'}</span>}
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">{grant.agency}</td>
                        <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">{grant.mechanism || '\u2014'}</td>
                        <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">{formatCurrency(grant.amount)}</td>
                        <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">{formatDate(grant.deadline)}</td>
                        <td className="whitespace-nowrap py-3">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${grantStatusColors[grant.status]}`}>
                            {grantStatusLabels[grant.status]}
                          </span>
                        </td>
                      </tr>
                      {expandedId === grant.id && (
                        <ExpandedGrantRow key={`${grant.id}-expanded`} grant={grant} />
                      )}
                    </>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-sm text-gray-400 italic">
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
          </>
        ) : (
          <BoardView columns={boardColumns}>
            {(status) => {
              const statusGrants = filtered.filter((g) => g.status === status)
              return (
                <>
                  <div className="mb-1 text-xs text-gray-400">{statusGrants.length} grants</div>
                  {statusGrants.map((grant) => (
                    <GrantCard key={grant.id} grant={grant} />
                  ))}
                  {statusGrants.length === 0 && (
                    <p className="py-4 text-center text-xs text-gray-300 italic">None</p>
                  )}
                </>
              )
            }}
          </BoardView>
        )}
      </SectionWrapper>
    </>
  )
}

'use client'

import { useState, useMemo } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import DiseaseTabs from '@/components/DiseaseTabs'
import { grantStatusLabels, grantStatusColors } from '@/data/grants'
import { filterByDisease } from '@/data/disease-utils'
import { useGrantsStore } from '@/data/use-grants-store'
import {
  calculateMilestones,
  getNextMilestone,
  getUrgency,
  urgencyColors,
  urgencyLabels,
} from '@/data/deadline-calculator'
import type { GrantStatus, Grant } from '@/data/grants'
import type { Milestone } from '@/data/deadline-calculator'

type SortKey = 'title' | 'pi' | 'agency' | 'amount' | 'deadline' | 'status'
type SortDir = 'asc' | 'desc'

const activeStatuses = new Set<GrantStatus>(['not_started', 'in_progress'])

function formatCurrency(amount: number | null): string {
  if (!amount) return '\u2014'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '\u2014'
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatShortDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/** Get a specific milestone date for a grant */
function getMilestoneDate(deadline: string | null, key: string): string | null {
  if (!deadline) return null
  const milestones = calculateMilestones(deadline)
  const m = milestones.find((ms) => ms.key === key)
  return m?.dateStr ?? null
}

function MilestoneDateCell({ deadline, milestoneKey }: { deadline: string | null; milestoneKey: string }) {
  const dateStr = getMilestoneDate(deadline, milestoneKey)
  if (!dateStr) return <td className="whitespace-nowrap py-3 pr-3 text-xs text-gray-400">{'\u2014'}</td>

  const urgency = getUrgency(dateStr)

  return (
    <td className="whitespace-nowrap py-3 pr-3">
      <div className={`inline-flex rounded px-1.5 py-0.5 text-xs font-medium ${
        urgency === 'overdue' || urgency === 'urgent' ? urgencyColors[urgency] :
        urgency === 'soon' ? 'text-amber-700' : 'text-gray-600'
      }`}>
        {formatShortDate(dateStr)}
      </div>
    </td>
  )
}

function MilestoneTimeline({ milestones }: { milestones: Milestone[] }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div className="sm:col-span-2 lg:col-span-3">
      <span className="text-xs font-semibold uppercase text-gray-400">MGB Proposal Timeline</span>
      <div className="mt-2 space-y-1">
        {milestones.map((m) => {
          const urgency = getUrgency(m.dateStr)
          const isPast = m.date < today
          return (
            <div
              key={m.key}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${
                isPast ? 'border-gray-100 bg-gray-50 opacity-60' : urgencyColors[urgency]
              }`}
            >
              <div className="w-20 shrink-0 text-xs font-semibold">
                {formatShortDate(m.dateStr)}
              </div>
              <div className={`h-2 w-2 shrink-0 rounded-full ${
                isPast ? 'bg-gray-300'
                  : urgency === 'overdue' ? 'bg-red-500'
                  : urgency === 'urgent' ? 'bg-orange-500'
                  : urgency === 'soon' ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`} />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-medium">{m.label}</span>
                <span className="ml-2 text-xs opacity-70">
                  ({m.owner === 'pi' ? 'PI' : m.owner === 'admin' ? 'Admin' : 'PI + Admin'})
                </span>
              </div>
              {!isPast && urgency !== 'future' && urgency !== 'ok' && (
                <span className="shrink-0 text-xs font-semibold">{urgencyLabels[urgency]}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ExpandedGrantRow({ grant, onUpdate }: { grant: Grant; onUpdate: (updates: Partial<Grant>) => void }) {
  const showTimeline = grant.deadline && activeStatuses.has(grant.status)
  const milestones = showTimeline ? calculateMilestones(grant.deadline!) : []
  const [editingPersonnel, setEditingPersonnel] = useState(false)
  const [personnelText, setPersonnelText] = useState(grant.keyPersonnel.join(', '))

  function savePersonnel() {
    const names = personnelText.split(',').map((n) => n.trim()).filter(Boolean)
    onUpdate({ keyPersonnel: names })
    setEditingPersonnel(false)
  }

  return (
    <tr>
      <td colSpan={12} className="bg-gray-50 px-4 py-4">
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
          <div>
            <span className="text-xs font-semibold uppercase text-gray-400">Key Personnel</span>
            {editingPersonnel ? (
              <div className="mt-1 flex gap-2">
                <input
                  value={personnelText}
                  onChange={(e) => setPersonnelText(e.target.value)}
                  className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
                  placeholder="Name 1, Name 2, ..."
                  onKeyDown={(e) => e.key === 'Enter' && savePersonnel()}
                />
                <button onClick={savePersonnel} className="rounded bg-[var(--color-primary)] px-2 py-1 text-xs text-white">Save</button>
                <button onClick={() => setEditingPersonnel(false)} className="text-xs text-gray-500">Cancel</button>
              </div>
            ) : (
              <p className="mt-1 text-sm text-gray-700">
                {grant.keyPersonnel.length > 0 ? grant.keyPersonnel.join(', ') : <span className="italic text-gray-400">None</span>}
                <button onClick={() => { setPersonnelText(grant.keyPersonnel.join(', ')); setEditingPersonnel(true) }} className="ml-2 text-xs text-[var(--color-accent)] hover:underline">Edit</button>
              </p>
            )}
          </div>
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
          {(grant.rfaUrl || grant.rfaPdfUrl) && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">RFA</span>
              <div className="mt-1 flex gap-3">
                {grant.rfaUrl && (
                  <a href={grant.rfaUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-accent)] hover:underline">
                    View RFA
                  </a>
                )}
                {grant.rfaPdfUrl && (
                  <a href={grant.rfaPdfUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-accent)] hover:underline">
                    PDF
                  </a>
                )}
              </div>
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
          {showTimeline && <MilestoneTimeline milestones={milestones} />}
        </div>
      </td>
    </tr>
  )
}

function DeadlineAlerts({ grantList }: { grantList: Grant[] }) {
  const alerts = grantList
    .filter((g) => g.deadline && activeStatuses.has(g.status))
    .map((g) => {
      const next = getNextMilestone(g.deadline!)
      if (!next) return null
      const urgency = getUrgency(next.dateStr)
      if (urgency === 'ok' || urgency === 'future') return null
      return { grant: g, milestone: next, urgency }
    })
    .filter(Boolean) as { grant: Grant; milestone: Milestone; urgency: 'overdue' | 'urgent' | 'soon' }[]

  if (alerts.length === 0) return null

  const order = { overdue: 0, urgent: 1, soon: 2 }
  alerts.sort((a, b) => order[a.urgency] - order[b.urgency])

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-800">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          Upcoming Deadlines ({alerts.length})
        </h3>
        <div className="mt-3 space-y-2">
          {alerts.map(({ grant, milestone, urgency }) => (
            <div
              key={`${grant.id}-${milestone.key}`}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-xs ${urgencyColors[urgency]}`}
            >
              <span className="w-20 shrink-0 font-semibold">{formatShortDate(milestone.dateStr)}</span>
              <span className="font-semibold">{urgencyLabels[urgency]}</span>
              <span className="min-w-0 flex-1 truncate">
                {milestone.shortLabel} &mdash; {grant.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function GrantsPage() {
  const { grants: allGrants, updateGrant, deleteGrant } = useGrantsStore()
  const [diseaseTab, setDiseaseTab] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<GrantStatus | 'all'>('all')
  const [piFilter, setPiFilter] = useState<string>('all')
  const [agencyFilter, setAgencyFilter] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('deadline')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const diseaseFiltered = useMemo(
    () => filterByDisease(allGrants, diseaseTab),
    [allGrants, diseaseTab]
  )

  const pis = useMemo(
    () => [...new Set(diseaseFiltered.map((g) => g.pi).filter(Boolean))].sort(),
    [diseaseFiltered]
  )
  const agencies = useMemo(
    () => [...new Set(diseaseFiltered.map((g) => g.agency).filter(Boolean))].sort(),
    [diseaseFiltered]
  )

  const filtered = useMemo(() => {
    let result = [...diseaseFiltered]
    if (statusFilter !== 'all') result = result.filter((g) => g.status === statusFilter)
    if (piFilter !== 'all') result = result.filter((g) => g.pi === piFilter)
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
  }, [diseaseFiltered, statusFilter, piFilter, agencyFilter, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const hasFilters = statusFilter !== 'all' || piFilter !== 'all' || agencyFilter !== 'all'

  function clearFilters() {
    setStatusFilter('all')
    setPiFilter('all')
    setAgencyFilter('all')
  }

  function SortHeader({ label, field, className: cls }: { label: string; field: SortKey; className?: string }) {
    return (
      <th
        className={`cursor-pointer whitespace-nowrap py-3 pr-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-700 ${cls ?? ''}`}
        onClick={() => toggleSort(field)}
      >
        {label}
        {sortKey === field && (
          <span className="ml-1">{sortDir === 'asc' ? '\u2191' : '\u2193'}</span>
        )}
      </th>
    )
  }

  function handleDelete(id: string) {
    deleteGrant(id)
    setConfirmDeleteId(null)
    if (expandedId === id) setExpandedId(null)
  }

  return (
    <>
      <div className="border-b border-gray-200 bg-[var(--color-surface-alt)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">Grants Tracker</h1>
          <p className="mt-2 text-gray-600">
            {allGrants.length} grants in the pipeline
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DiseaseTabs activeTab={diseaseTab} onChange={setDiseaseTab} />
      </div>

      <DeadlineAlerts grantList={filtered} />

      <SectionWrapper>
        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as GrantStatus | 'all')} className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700">
            <option value="all">All Statuses</option>
            {Object.entries(grantStatusLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <select value={piFilter} onChange={(e) => setPiFilter(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700">
            <option value="all">All PIs</option>
            {pis.map((pi) => <option key={pi} value={pi}>{pi}</option>)}
          </select>
          <select value={agencyFilter} onChange={(e) => setAgencyFilter(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700">
            <option value="all">All Agencies</option>
            {agencies.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          {hasFilters && (
            <button onClick={clearFilters} className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50">
              Clear filters
            </button>
          )}
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[1100px]">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="w-8 py-3 pl-4 pr-2"></th>
                <SortHeader label="Grant" field="title" />
                <SortHeader label="PI" field="pi" />
                <SortHeader label="Agency" field="agency" />
                <SortHeader label="Amount" field="amount" />
                <th className="whitespace-nowrap py-3 pr-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Budget</th>
                <th className="whitespace-nowrap py-3 pr-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Admin</th>
                <th className="whitespace-nowrap py-3 pr-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Science</th>
                <SortHeader label="Sponsor" field="deadline" />
                <SortHeader label="Status" field="status" />
                <th className="w-16 py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"></th>
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
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </td>
                    <td className="py-3 pr-3">
                      <div className="max-w-xs text-sm font-medium text-gray-900 line-clamp-2">{grant.title}</div>
                      {grant.mechanism && <div className="mt-0.5 text-xs text-gray-400">{grant.mechanism}</div>}
                    </td>
                    <td className="whitespace-nowrap py-3 pr-3 text-sm text-gray-600">
                      <div>{grant.pi || '\u2014'}</div>
                      {grant.keyPersonnel.length > 0 && (
                        <div className="mt-0.5 max-w-[140px] truncate text-xs text-gray-400">{grant.keyPersonnel.join(', ')}</div>
                      )}
                    </td>
                    <td className="whitespace-nowrap py-3 pr-3 text-sm">
                      {grant.rfaUrl ? (
                        <a
                          href={grant.rfaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--color-accent)] hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {grant.agency}
                        </a>
                      ) : (
                        <span className="text-gray-600">{grant.agency}</span>
                      )}
                      {grant.rfaPdfUrl && (
                        <a
                          href={grant.rfaPdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-1.5 inline-flex text-xs text-gray-400 hover:text-[var(--color-accent)]"
                          onClick={(e) => e.stopPropagation()}
                          title="RFA PDF"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </a>
                      )}
                    </td>
                    <td className="whitespace-nowrap py-3 pr-3 text-sm text-gray-600">{formatCurrency(grant.amount)}</td>
                    <MilestoneDateCell deadline={grant.deadline} milestoneKey="finalize_budget" />
                    <MilestoneDateCell deadline={grant.deadline} milestoneKey="admin_component" />
                    <MilestoneDateCell deadline={grant.deadline} milestoneKey="science_component" />
                    <td className="whitespace-nowrap py-3 pr-3 text-sm text-gray-600">{formatDate(grant.deadline)}</td>
                    <td className="whitespace-nowrap py-3 pr-3" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={grant.status}
                        onChange={(e) => updateGrant(grant.id, { status: e.target.value as GrantStatus })}
                        className={`rounded-full border-0 px-2.5 py-0.5 text-xs font-medium ${grantStatusColors[grant.status]}`}
                      >
                        {Object.entries(grantStatusLabels).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="whitespace-nowrap py-3 pr-4" onClick={(e) => e.stopPropagation()}>
                      {confirmDeleteId === grant.id ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleDelete(grant.id)}
                            className="rounded bg-red-500 px-2 py-0.5 text-xs text-white hover:bg-red-600"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="text-xs text-gray-500"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(grant.id)}
                          className="text-gray-400 hover:text-red-500"
                          title="Delete grant"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </td>
                  </tr>
                  {expandedId === grant.id && (
                    <ExpandedGrantRow
                      key={`${grant.id}-expanded`}
                      grant={grant}
                      onUpdate={(updates) => updateGrant(grant.id, updates)}
                    />
                  )}
                </>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-sm text-gray-400 italic">
                    No grants match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-gray-400">
          Showing {filtered.length} of {allGrants.length} grants &middot; Edits saved to browser
        </p>
      </SectionWrapper>
    </>
  )
}

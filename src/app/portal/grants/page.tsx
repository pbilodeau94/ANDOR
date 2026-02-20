'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import DiseaseChips from '@/components/portal/DiseaseChips'
import LinkedTasks from '@/components/portal/LinkedTasks'
import TeamMemberChips from '@/components/portal/TeamMemberChips'
import CheckboxFilterDropdown from '@/components/portal/CheckboxFilterDropdown'
import { grantStatusLabels, grantStatusColors, grantTypeLabels, grantTypeColors, computeIdc, computeTotal, idcCategoryLabels, knownDiseases } from '@/data/grants'
import { useGrantsStore } from '@/data/use-grants-store'
import { useTasksStore } from '@/data/use-tasks-store'
import {
  getNextMilestone,
  getUrgency,
  urgencyColors,
  urgencyLabels,
} from '@/data/deadline-calculator'
import { team } from '@/data/team'
import type { GrantStatus, Grant, IdcCategory, GrantType } from '@/data/grants'
import type { Milestone } from '@/data/deadline-calculator'

type SortKey = 'title' | 'pi' | 'agency' | 'type' | 'total' | 'deadline' | 'notificationDate' | 'startDate' | 'status'
type SortDir = 'asc' | 'desc'

const activeStatuses = new Set<GrantStatus>(['not_started', 'in_progress'])

const pencilIcon = (
  <svg className="h-3 w-3 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
)

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

// --- Grant Type Tabs ---

function GrantTypeTabs({ activeTab, onChange }: { activeTab: GrantType | null; onChange: (tab: GrantType | null) => void }) {
  const tabs: { key: GrantType | null; label: string }[] = [
    { key: null, label: 'All' },
    { key: 'federal', label: 'Federal' },
    { key: 'foundation', label: 'Foundation' },
    { key: 'industry', label: 'Industry' },
  ]

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Grant type filters">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.label}
              onClick={() => onChange(tab.key)}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

// --- Editable Date Cell (pencil to edit) ---

function EditableDateCell({
  value,
  fieldKey,
  onUpdate,
}: {
  value: string | null
  fieldKey: string
  onUpdate: (updates: Partial<Grant>) => void
}) {
  const [editing, setEditing] = useState(false)
  const [inputVal, setInputVal] = useState(value ?? '')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus()
  }, [editing])

  function save() {
    const newVal = inputVal || null
    if (newVal !== value) onUpdate({ [fieldKey]: newVal })
    setEditing(false)
  }

  function cancel() {
    setInputVal(value ?? '')
    setEditing(false)
  }

  if (editing) {
    return (
      <td className="whitespace-nowrap py-3 pr-3" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          type="date"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
            if (e.key === 'Escape') cancel()
          }}
          className="w-36 rounded border border-gray-300 px-2 py-1 text-sm"
        />
      </td>
    )
  }

  return (
    <td className="whitespace-nowrap py-3 pr-3 text-sm">
      <span className="text-gray-600">{formatDate(value)}</span>
      <button
        onClick={(e) => { e.stopPropagation(); setInputVal(value ?? ''); setEditing(true) }}
        className="ml-1.5 inline-flex opacity-0 transition-opacity group-hover/row:opacity-100"
        title="Edit"
      >
        {pencilIcon}
      </button>
    </td>
  )
}

// --- Editable Title Cell (pencil to edit) ---

function EditableTitleCell({
  title,
  mechanism,
  onUpdate,
}: {
  title: string
  mechanism: string
  onUpdate: (title: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [inputVal, setInputVal] = useState(title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus()
  }, [editing])

  function save() {
    const trimmed = inputVal.trim()
    if (trimmed && trimmed !== title) onUpdate(trimmed)
    setEditing(false)
  }

  function cancel() {
    setInputVal(title)
    setEditing(false)
  }

  if (editing) {
    return (
      <td className="py-3 pr-3" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
            if (e.key === 'Escape') cancel()
          }}
          className="w-full rounded border border-gray-300 px-2 py-1 text-sm font-medium"
        />
        {mechanism && <div className="mt-0.5 text-xs text-gray-400">{mechanism}</div>}
      </td>
    )
  }

  return (
    <td className="py-3 pr-3">
      <div className="flex items-start gap-1">
        <div className="min-w-0">
          <div className="max-w-xs text-sm font-medium text-gray-900 line-clamp-2">{title}</div>
          {mechanism && <div className="mt-0.5 text-xs text-gray-400">{mechanism}</div>}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setInputVal(title); setEditing(true) }}
          className="mt-0.5 shrink-0 opacity-0 transition-opacity group-hover/row:opacity-100"
          title="Edit title"
        >
          {pencilIcon}
        </button>
      </div>
    </td>
  )
}

// --- Team Member Picker (select only from team list) ---

// --- Add Grant Form ---

function AddGrantForm({
  onAdd,
  onCancel,
}: {
  onAdd: (grant: Omit<Grant, 'id'>) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState('')
  const [pi, setPi] = useState<string[]>([])
  const [agency, setAgency] = useState('')
  const [mechanism, setMechanism] = useState('')
  const [grantType, setGrantType] = useState<GrantType>('federal')
  const [directCosts, setDirectCosts] = useState('')
  const [deadline, setDeadline] = useState('')
  const [diseases, setDiseases] = useState<string[]>([])
  const [status, setStatus] = useState<GrantStatus>('not_started')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({
      title: title.trim(),
      pi,
      lead: pi[0] ?? '',
      agency: agency.trim(),
      mechanism: mechanism.trim(),
      grantType,
      directCosts: directCosts ? Number(directCosts) : null,
      idcCategory: 'none',
      idcRate: 0,
      duration: null,
      deadline: deadline || null,
      adminDeadline: null,
      scienceDeadline: null,
      notificationDate: null,
      startDate: null,
      status,
      diseases,
      keyPersonnel: [],
      rfaUrl: null,
      rfaPdfUrl: null,
      documents: [],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      <h3 className="text-sm font-semibold text-gray-700">Add New Grant</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <label className="text-[10px] font-medium text-gray-500">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-[10px] font-medium text-gray-500">Agency</label>
          <input
            type="text"
            value={agency}
            onChange={(e) => setAgency(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
            placeholder="e.g. NIH, NMSS"
          />
        </div>
        <div>
          <label className="text-[10px] font-medium text-gray-500">Mechanism</label>
          <input
            type="text"
            value={mechanism}
            onChange={(e) => setMechanism(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
            placeholder="e.g. R01, K08"
          />
        </div>
        <div>
          <label className="text-[10px] font-medium text-gray-500">Type</label>
          <select
            value={grantType}
            onChange={(e) => setGrantType(e.target.value as GrantType)}
            className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
          >
            {Object.entries(grantTypeLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-medium text-gray-500">Direct Costs</label>
          <input
            type="number"
            value={directCosts}
            onChange={(e) => setDirectCosts(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
            placeholder="$"
          />
        </div>
        <div>
          <label className="text-[10px] font-medium text-gray-500">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="text-[10px] font-medium text-gray-500">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as GrantStatus)}
            className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
          >
            {Object.entries(grantStatusLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="text-[10px] font-medium text-gray-500">PI(s)</label>
          <div className="mt-0.5">
            <TeamMemberChips members={pi} onUpdate={setPi} addLabel="+ Add PI" />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="text-[10px] font-medium text-gray-500">Diseases</label>
          <div className="mt-0.5">
            <DiseaseChips diseases={diseases} onUpdate={setDiseases} />
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-light)]"
        >
          Add Grant
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

// --- Expanded Grant Row ---

function ExpandedGrantRow({
  grant,
  onUpdate,
}: {
  grant: Grant
  onUpdate: (updates: Partial<Grant>) => void
}) {
  const idcAmount = computeIdc(grant)
  const totalAmount = computeTotal(grant)

  return (
    <tr>
      <td colSpan={11} className="bg-gray-50 px-4 py-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <TeamMemberChips members={grant.pi} onUpdate={(newPis) => onUpdate({ pi: newPis })} addLabel="+ Add PI" />

          {/* Funding Breakdown */}
          <div className="sm:col-span-2 lg:col-span-3">
            <span className="text-xs font-semibold uppercase text-gray-400">Funding</span>
            <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <div>
                <label className="text-[10px] font-medium text-gray-500">Direct Costs</label>
                <input
                  type="number"
                  value={grant.directCosts ?? ''}
                  onChange={(e) => onUpdate({ directCosts: e.target.value ? Number(e.target.value) : null })}
                  className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-sm"
                  placeholder="—"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div>
                <label className="text-[10px] font-medium text-gray-500">IDC Category</label>
                <select
                  value={grant.idcCategory}
                  onChange={(e) => onUpdate({ idcCategory: e.target.value as IdcCategory })}
                  className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  {Object.entries(idcCategoryLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-medium text-gray-500">IDC Rate (%)</label>
                <input
                  type="number"
                  value={grant.idcRate}
                  onChange={(e) => onUpdate({ idcRate: Number(e.target.value) || 0 })}
                  className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-sm"
                  placeholder="0"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div>
                <label className="text-[10px] font-medium text-gray-500">IDC Amount</label>
                <p className="mt-1 text-sm text-gray-600">{formatCurrency(idcAmount || null)}</p>
              </div>
              <div>
                <label className="text-[10px] font-medium text-gray-500">Total</label>
                <p className="mt-1 text-sm font-bold text-gray-900">{formatCurrency(totalAmount || null)}</p>
              </div>
            </div>
          </div>

          {grant.duration && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Duration</span>
              <p className="text-sm text-gray-700">{grant.duration}</p>
            </div>
          )}

          <TeamMemberChips
            members={grant.keyPersonnel}
            onUpdate={(newKp) => onUpdate({ keyPersonnel: newKp })}
            label="Key Personnel"
          />

          <DiseaseChips
            diseases={grant.diseases}
            onUpdate={(newDiseases) => onUpdate({ diseases: newDiseases })}
          />

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
          <div className="sm:col-span-2 lg:col-span-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-gray-400">Tasks</span>
              <a href="/portal/tasks" className="text-[10px] font-medium text-[var(--color-accent)] hover:underline">
                All tasks &rarr;
              </a>
            </div>
            <div className="mt-2 space-y-1">
              <LinkedTasks grantId={grant.id} />
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}

// --- Deadline Alerts Banner ---

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
    <div className="mx-auto max-w-[1400px] px-4 pt-6 sm:px-6 lg:px-8">
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

// --- Date sort helper ---

function compareDates(a: string | null, b: string | null): number {
  if (!a && !b) return 0
  if (!a) return 1
  if (!b) return -1
  return new Date(a).getTime() - new Date(b).getTime()
}

// --- Main Page ---

export default function GrantsPage() {
  const { grants: allGrants, addGrant, updateGrant, deleteGrant } = useGrantsStore()
  const { syncMilestoneTasks } = useTasksStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [typeTab, setTypeTab] = useState<GrantType | null>(null)
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [personFilter, setPersonFilter] = useState<string[]>([])
  const [diseaseFilter, setDiseaseFilter] = useState<string[]>([])
  const [agencyFilter, setAgencyFilter] = useState<string[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('deadline')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const syncedRef = useRef(false)

  // Sync milestone tasks from grants on load
  useEffect(() => {
    if (syncedRef.current || !allGrants.length) return
    syncedRef.current = true
    syncMilestoneTasks(allGrants)
  }, [allGrants, syncMilestoneTasks])

  // Filter by grant type tab first
  const typeFiltered = useMemo(
    () => typeTab ? allGrants.filter((g) => g.grantType === typeTab) : allGrants,
    [allGrants, typeTab]
  )

  // Collect unique values for filter dropdowns
  const allPeople = useMemo(() => {
    const names = new Set<string>()
    typeFiltered.forEach((g) => {
      g.pi.forEach((n) => names.add(n))
      g.keyPersonnel.forEach((n) => names.add(n))
    })
    return [...names].sort()
  }, [typeFiltered])

  const allDiseases = useMemo(() => {
    const diseases = new Set<string>()
    typeFiltered.forEach((g) => {
      g.diseases.forEach((d) => diseases.add(d))
    })
    return [...diseases].sort()
  }, [typeFiltered])

  const allAgencies = useMemo(
    () => [...new Set(typeFiltered.map((g) => g.agency).filter(Boolean))].sort(),
    [typeFiltered]
  )

  const allStatuses = useMemo(
    () => [...new Set(typeFiltered.map((g) => g.status))].sort(),
    [typeFiltered]
  )

  const filtered = useMemo(() => {
    let result = [...typeFiltered]
    // Hide not_funded unless explicitly selected in status filter
    if (statusFilter.length > 0) result = result.filter((g) => statusFilter.includes(g.status))
    else result = result.filter((g) => g.status !== 'not_funded')
    if (personFilter.length > 0) {
      result = result.filter((g) =>
        personFilter.some((name) => g.pi.includes(name) || g.keyPersonnel.includes(name))
      )
    }
    if (diseaseFilter.length > 0) {
      result = result.filter((g) =>
        diseaseFilter.some((d) => g.diseases.includes(d))
      )
    }
    if (agencyFilter.length > 0) result = result.filter((g) => agencyFilter.includes(g.agency))

    result.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'title': cmp = a.title.localeCompare(b.title); break
        case 'pi': cmp = (a.pi[0] || '').localeCompare(b.pi[0] || ''); break
        case 'agency': cmp = a.agency.localeCompare(b.agency); break
        case 'type': cmp = a.grantType.localeCompare(b.grantType); break
        case 'total': cmp = computeTotal(a) - computeTotal(b); break
        case 'deadline': cmp = compareDates(a.deadline, b.deadline); break
        case 'notificationDate': cmp = compareDates(a.notificationDate, b.notificationDate); break
        case 'startDate': cmp = compareDates(a.startDate, b.startDate); break
        case 'status': cmp = a.status.localeCompare(b.status); break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })

    return result
  }, [typeFiltered, statusFilter, personFilter, diseaseFilter, agencyFilter, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const hasFilters = statusFilter.length > 0 || personFilter.length > 0 || diseaseFilter.length > 0 || agencyFilter.length > 0

  function clearFilters() {
    setStatusFilter([])
    setPersonFilter([])
    setDiseaseFilter([])
    setAgencyFilter([])
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
        <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">Grants Tracker</h1>
          <p className="mt-2 text-gray-600">
            {allGrants.length} grants in the pipeline
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <GrantTypeTabs activeTab={typeTab} onChange={setTypeTab} />
      </div>

      <DeadlineAlerts grantList={filtered} />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Add Grant */}
        {showAddForm ? (
          <div className="mb-6">
            <AddGrantForm
              onAdd={(grant) => {
                addGrant(grant)
                setShowAddForm(false)
              }}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        ) : (
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-light)]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Grant
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <CheckboxFilterDropdown
            allItems={allStatuses}
            selected={statusFilter}
            onChange={setStatusFilter}
            label="All Statuses"
            labelMap={grantStatusLabels}
          />
          <CheckboxFilterDropdown
            allItems={allPeople}
            selected={personFilter}
            onChange={setPersonFilter}
            label="All People"
          />
          <CheckboxFilterDropdown
            allItems={allDiseases}
            selected={diseaseFilter}
            onChange={setDiseaseFilter}
            label="All Diseases"
          />
          <CheckboxFilterDropdown
            allItems={allAgencies}
            selected={agencyFilter}
            onChange={setAgencyFilter}
            label="All Agencies"
          />
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
                <SortHeader label="PI(s)" field="pi" />
                <SortHeader label="Agency" field="agency" />
                <SortHeader label="Type" field="type" />
                <SortHeader label="Total" field="total" />
                <SortHeader label="Sponsor Deadline" field="deadline" />
                <SortHeader label="Notification" field="notificationDate" />
                <SortHeader label="Start Date" field="startDate" />
                <SortHeader label="Status" field="status" />
                <th className="w-16 py-3 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((grant) => (
                <>
                  <tr
                    key={grant.id}
                    className="group/row cursor-pointer border-b border-gray-100 hover:bg-gray-50"
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
                    <EditableTitleCell
                      title={grant.title}
                      mechanism={grant.mechanism}
                      onUpdate={(title) => updateGrant(grant.id, { title })}
                    />
                    <td className="whitespace-nowrap py-3 pr-3">
                      {grant.pi.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {grant.pi.map((name) => (
                            <span key={name} className="inline-flex rounded-full bg-[var(--color-primary)]/10 px-2 py-0.5 text-xs font-medium text-[var(--color-primary)]">
                              {name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">{'\u2014'}</span>
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
                    </td>
                    <td className="whitespace-nowrap py-3 pr-3" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={grant.grantType}
                        onChange={(e) => updateGrant(grant.id, { grantType: e.target.value as GrantType })}
                        className={`rounded-full border-0 px-2.5 py-0.5 text-xs font-medium ${grantTypeColors[grant.grantType]}`}
                      >
                        {Object.entries(grantTypeLabels).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="whitespace-nowrap py-3 pr-3 text-sm font-medium text-gray-700">
                      {formatCurrency(computeTotal(grant) || null)}
                    </td>
                    <EditableDateCell value={grant.deadline} fieldKey="deadline" onUpdate={(updates) => updateGrant(grant.id, updates)} />
                    <EditableDateCell value={grant.notificationDate} fieldKey="notificationDate" onUpdate={(updates) => updateGrant(grant.id, updates)} />
                    <EditableDateCell value={grant.startDate} fieldKey="startDate" onUpdate={(updates) => updateGrant(grant.id, updates)} />
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
        </div>
      </section>
    </>
  )
}

'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import DiseaseTabs from '@/components/DiseaseTabs'
import DiseaseChips from '@/components/portal/DiseaseChips'
import { grantStatusLabels, grantStatusColors, grantTypeLabels, grantTypeColors, computeIdc, computeTotal, idcCategoryLabels } from '@/data/grants'
import { filterByDisease } from '@/data/disease-utils'
import { useGrantsStore } from '@/data/use-grants-store'
import {
  calculateMilestones,
  getNextMilestone,
  getUrgency,
  urgencyColors,
  urgencyLabels,
} from '@/data/deadline-calculator'
import { team } from '@/data/team'
import type { GrantStatus, Grant, IdcCategory, GrantType } from '@/data/grants'
import type { Milestone } from '@/data/deadline-calculator'

type SortKey = 'title' | 'pi' | 'agency' | 'type' | 'total' | 'deadline' | 'status'
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

// --- Editable Deadline Cell (table column) ---

function EditableDeadlineCell({ grant, onUpdate }: { grant: Grant; onUpdate: (updates: Partial<Grant>) => void }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(grant.deadline ?? '')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus()
  }, [editing])

  function save() {
    const newDeadline = value || null
    if (newDeadline !== grant.deadline) onUpdate({ deadline: newDeadline })
    setEditing(false)
  }

  function cancel() {
    setValue(grant.deadline ?? '')
    setEditing(false)
  }

  if (editing) {
    return (
      <td className="whitespace-nowrap py-3 pr-3" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
    <td
      className="group/deadline cursor-pointer whitespace-nowrap py-3 pr-3 text-sm text-gray-600"
      onClick={(e) => { e.stopPropagation(); setEditing(true) }}
      title="Click to edit deadline"
    >
      {formatDate(grant.deadline)}
      <svg className="ml-1 inline h-3 w-3 text-gray-300 opacity-0 transition-opacity group-hover/deadline:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    </td>
  )
}

// --- Editable Date Field (inline, for use inside divs) ---

function EditableDateField({
  label,
  value,
  hintValue,
  hintLabel,
  onSave,
}: {
  label: string
  value: string | null
  hintValue?: string | null
  hintLabel?: string
  onSave: (newValue: string | null) => void
}) {
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value ?? '')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus()
  }, [editing])

  function save() {
    const newVal = inputValue || null
    if (newVal !== value) onSave(newVal)
    setEditing(false)
  }

  return (
    <div>
      <span className="text-xs font-semibold uppercase text-gray-400">{label}</span>
      {editing ? (
        <div className="mt-1">
          <input
            ref={inputRef}
            type="date"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save()
              if (e.key === 'Escape') { setInputValue(value ?? ''); setEditing(false) }
            }}
            className="w-40 rounded border border-gray-300 px-2 py-1 text-sm"
          />
        </div>
      ) : (
        <p
          className="group/datefield mt-1 cursor-pointer text-sm text-gray-700"
          onClick={() => { setInputValue(value ?? ''); setEditing(true) }}
          title="Click to edit"
        >
          {value ? formatDate(value) : <span className="italic text-gray-400">Not set</span>}
          <svg className="ml-1 inline h-3 w-3 text-gray-300 opacity-0 transition-opacity group-hover/datefield:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          {!value && hintValue && (
            <span className="ml-1 text-xs text-gray-400">({hintLabel}: {formatDate(hintValue)})</span>
          )}
        </p>
      )}
    </div>
  )
}

// --- Multi-Person Filter Dropdown ---

function PersonFilterDropdown({
  allPeople,
  selected,
  onChange,
}: {
  allPeople: string[]
  selected: string[]
  onChange: (next: string[]) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function toggle(name: string) {
    if (selected.includes(name)) onChange(selected.filter((n) => n !== name))
    else onChange([...selected, name])
  }

  const label = selected.length === 0 ? 'All People' : selected.length === 1 ? selected[0] : `${selected.length} selected`

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        {label}
        <svg className={`h-4 w-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 z-20 mt-1 max-h-64 w-56 overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {allPeople.map((name) => (
            <label key={name} className="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
              <input
                type="checkbox"
                checked={selected.includes(name)}
                onChange={() => toggle(name)}
                className="rounded border-gray-300 text-[var(--color-primary)]"
              />
              {name}
            </label>
          ))}
          {allPeople.length === 0 && (
            <p className="px-3 py-2 text-xs italic text-gray-400">No people found</p>
          )}
        </div>
      )}
    </div>
  )
}

// --- PI Chips (editable in expanded row) ---

function PiChips({
  pis,
  onUpdate,
  label = 'Principal Investigator(s)',
  placeholder = 'Add PI...',
}: {
  pis: string[]
  onUpdate: (newPis: string[]) => void
  label?: string
  placeholder?: string
}) {
  const [adding, setAdding] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const teamNames = useMemo(() => team.map((m) => m.name), [])

  useEffect(() => {
    if (adding && inputRef.current) inputRef.current.focus()
  }, [adding])

  function handleInput(val: string) {
    setInputValue(val)
    if (val.trim()) {
      const lower = val.toLowerCase()
      setSuggestions(teamNames.filter((n) => n.toLowerCase().includes(lower) && !pis.includes(n)))
    } else {
      setSuggestions([])
    }
  }

  function addPi(name: string) {
    if (!pis.includes(name)) onUpdate([...pis, name])
    setInputValue('')
    setSuggestions([])
    setAdding(false)
  }

  function removePi(name: string) {
    onUpdate(pis.filter((n) => n !== name))
  }

  return (
    <div>
      <span className="text-xs font-semibold uppercase text-gray-400">{label}</span>
      <div className="mt-1 flex flex-wrap items-center gap-1.5">
        {pis.map((name) => (
          <span key={name} className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-primary)]">
            {name}
            <button onClick={() => removePi(name)} className="ml-0.5 text-[var(--color-primary)]/60 hover:text-[var(--color-primary)]">&times;</button>
          </span>
        ))}
        {adding ? (
          <div className="relative">
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => handleInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputValue.trim()) addPi(inputValue.trim())
                if (e.key === 'Escape') { setAdding(false); setInputValue(''); setSuggestions([]) }
              }}
              onBlur={() => { setTimeout(() => { setAdding(false); setInputValue(''); setSuggestions([]) }, 150) }}
              className="w-40 rounded border border-gray-300 px-2 py-0.5 text-xs"
              placeholder={placeholder}
            />
            {suggestions.length > 0 && (
              <div className="absolute left-0 z-10 mt-1 w-48 rounded border border-gray-200 bg-white py-1 shadow-lg">
                {suggestions.map((s) => (
                  <button key={s} onMouseDown={() => addPi(s)} className="block w-full px-3 py-1 text-left text-xs text-gray-700 hover:bg-gray-50">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setAdding(true)} className="text-xs text-[var(--color-accent)] hover:underline">+ Add PI</button>
        )}
      </div>
    </div>
  )
}

// --- Milestone Task List ---

function MilestoneTaskList({
  milestones,
  grantId,
  completions,
  onToggle,
}: {
  milestones: Milestone[]
  grantId: string
  completions: Record<string, boolean>
  onToggle: (milestoneKey: string) => void
}) {
  return (
    <div className="sm:col-span-2 lg:col-span-3">
      <span className="text-xs font-semibold uppercase text-gray-400">MGB Proposal Timeline</span>
      <div className="mt-2 space-y-1">
        {milestones.map((m) => {
          const done = completions[m.key] ?? false
          const urgency = getUrgency(m.dateStr)
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          const isPast = m.date < today

          return (
            <label
              key={m.key}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 ${
                done ? 'border-gray-100 bg-gray-50 opacity-60' : isPast ? 'border-gray-100 bg-gray-50 opacity-60' : urgencyColors[urgency]
              }`}
            >
              <input
                type="checkbox"
                checked={done}
                onChange={() => onToggle(m.key)}
                className="rounded border-gray-300 text-[var(--color-primary)]"
              />
              <div className="w-20 shrink-0 text-xs font-semibold">
                {formatShortDate(m.dateStr)}
              </div>
              <div className="min-w-0 flex-1">
                <span className={`text-xs font-medium ${done ? 'line-through' : ''}`}>{m.label}</span>
                <span className={`ml-2 inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                  m.owner === 'pi' ? 'bg-blue-100 text-blue-700' : m.owner === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-teal-100 text-teal-700'
                }`}>
                  {m.owner === 'pi' ? 'PI' : m.owner === 'admin' ? 'Admin' : 'Both'}
                </span>
              </div>
              {!done && !isPast && urgency !== 'future' && urgency !== 'ok' && (
                <span className="shrink-0 text-xs font-semibold">{urgencyLabels[urgency]}</span>
              )}
            </label>
          )
        })}
      </div>
    </div>
  )
}

// --- Expanded Grant Row ---

function ExpandedGrantRow({
  grant,
  onUpdate,
  milestoneCompletions,
  onToggleMilestone,
}: {
  grant: Grant
  onUpdate: (updates: Partial<Grant>) => void
  milestoneCompletions: Record<string, boolean>
  onToggleMilestone: (milestoneKey: string) => void
}) {
  const showTimeline = grant.deadline && activeStatuses.has(grant.status)
  const milestones = showTimeline ? calculateMilestones(grant.deadline!) : []

  // Compute auto-calculated deadline hints from deadline-calculator
  const autoMilestones = grant.deadline ? calculateMilestones(grant.deadline) : []
  const autoAdmin = autoMilestones.find((m) => m.key === 'internal_admin_docs')
  const autoScience = autoMilestones.find((m) => m.key === 'internal_science_docs')

  const idcAmount = computeIdc(grant)
  const totalAmount = computeTotal(grant)

  return (
    <tr>
      <td colSpan={9} className="bg-gray-50 px-4 py-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PiChips pis={grant.pi} onUpdate={(newPis) => onUpdate({ pi: newPis })} />

          {/* Funding Breakdown */}
          <div className="sm:col-span-2 lg:col-span-3">
            <span className="text-xs font-semibold uppercase text-gray-400">Funding</span>
            <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {/* Direct Costs */}
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
              {/* IDC Category */}
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
              {/* IDC Rate */}
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
              {/* Computed IDC */}
              <div>
                <label className="text-[10px] font-medium text-gray-500">IDC Amount</label>
                <p className="mt-1 text-sm text-gray-600">{formatCurrency(idcAmount || null)}</p>
              </div>
              {/* Computed Total */}
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
          {grant.startDate && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Start Date</span>
              <p className="text-sm text-gray-700">{formatDate(grant.startDate)}</p>
            </div>
          )}

          {/* Admin & Science Deadlines */}
          <EditableDateField
            label="Admin Deadline"
            value={grant.adminDeadline}
            hintValue={autoAdmin?.dateStr ?? null}
            hintLabel="Auto"
            onSave={(v) => onUpdate({ adminDeadline: v })}
          />
          <EditableDateField
            label="Science Deadline"
            value={grant.scienceDeadline}
            hintValue={autoScience?.dateStr ?? null}
            hintLabel="Auto"
            onSave={(v) => onUpdate({ scienceDeadline: v })}
          />

          <PiChips
            pis={grant.keyPersonnel}
            onUpdate={(newKp) => onUpdate({ keyPersonnel: newKp })}
            label="Key Personnel"
            placeholder="Add person..."
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
          {showTimeline && (
            <MilestoneTaskList
              milestones={milestones}
              grantId={grant.id}
              completions={milestoneCompletions}
              onToggle={onToggleMilestone}
            />
          )}
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

// --- Main Page ---

export default function GrantsPage() {
  const { grants: allGrants, updateGrant, deleteGrant, toggleMilestone, milestoneCompletions } = useGrantsStore()
  const [diseaseTab, setDiseaseTab] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<GrantStatus | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<GrantType | 'all'>('all')
  const [personFilter, setPersonFilter] = useState<string[]>([])
  const [agencyFilter, setAgencyFilter] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('deadline')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const diseaseFiltered = useMemo(
    () => filterByDisease(allGrants, diseaseTab),
    [allGrants, diseaseTab]
  )

  // Collect all unique people from PI + key personnel across filtered grants
  const allPeople = useMemo(() => {
    const names = new Set<string>()
    diseaseFiltered.forEach((g) => {
      g.pi.forEach((n) => names.add(n))
      g.keyPersonnel.forEach((n) => names.add(n))
    })
    return [...names].sort()
  }, [diseaseFiltered])

  const agencies = useMemo(
    () => [...new Set(diseaseFiltered.map((g) => g.agency).filter(Boolean))].sort(),
    [diseaseFiltered]
  )

  const filtered = useMemo(() => {
    let result = [...diseaseFiltered]
    if (statusFilter !== 'all') result = result.filter((g) => g.status === statusFilter)
    if (typeFilter !== 'all') result = result.filter((g) => g.grantType === typeFilter)
    if (personFilter.length > 0) {
      result = result.filter((g) =>
        personFilter.some((name) => g.pi.includes(name) || g.keyPersonnel.includes(name))
      )
    }
    if (agencyFilter !== 'all') result = result.filter((g) => g.agency === agencyFilter)

    result.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'title': cmp = a.title.localeCompare(b.title); break
        case 'pi': cmp = (a.pi[0] || '').localeCompare(b.pi[0] || ''); break
        case 'agency': cmp = a.agency.localeCompare(b.agency); break
        case 'type': cmp = a.grantType.localeCompare(b.grantType); break
        case 'total': cmp = computeTotal(a) - computeTotal(b); break
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
  }, [diseaseFiltered, statusFilter, typeFilter, personFilter, agencyFilter, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const hasFilters = statusFilter !== 'all' || typeFilter !== 'all' || personFilter.length > 0 || agencyFilter !== 'all'

  function clearFilters() {
    setStatusFilter('all')
    setTypeFilter('all')
    setPersonFilter([])
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
          <PersonFilterDropdown
            allPeople={allPeople}
            selected={personFilter}
            onChange={setPersonFilter}
          />
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as GrantType | 'all')} className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700">
            <option value="all">All Types</option>
            {Object.entries(grantTypeLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
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
          <table className="w-full min-w-[1000px]">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="w-8 py-3 pl-4 pr-2"></th>
                <SortHeader label="Grant" field="title" />
                <SortHeader label="PI(s)" field="pi" />
                <SortHeader label="Agency" field="agency" />
                <SortHeader label="Type" field="type" />
                <SortHeader label="Total" field="total" />
                <SortHeader label="Deadline" field="deadline" />
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
                    <EditableDeadlineCell grant={grant} onUpdate={(updates) => updateGrant(grant.id, updates)} />
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
                      milestoneCompletions={milestoneCompletions[grant.id] ?? {}}
                      onToggleMilestone={(key) => toggleMilestone(grant.id, key)}
                    />
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
          Showing {filtered.length} of {allGrants.length} grants &middot; Edits saved to browser
        </p>
      </SectionWrapper>
    </>
  )
}

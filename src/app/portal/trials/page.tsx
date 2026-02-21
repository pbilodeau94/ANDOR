'use client'

import { useState } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import { trackedTrials as initialTrials, trialStatusLabels, trialStatusColors, type TrialStatus, type TrackedTrial } from '@/data/trials-tracker'

const statusOrder: TrialStatus[] = ['active', 'start_up', 'open_label', 'closing_out', 'closed']

export default function PortalTrialsPage() {
  const [filter, setFilter] = useState<TrialStatus | 'all'>('all')
  const [trials, setTrials] = useState<TrackedTrial[]>(initialTrials)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<TrackedTrial>>({})

  const filtered = filter === 'all'
    ? trials
    : trials.filter((t) => t.status === filter)

  const counts = statusOrder.reduce((acc, s) => {
    acc[s] = trials.filter((t) => t.status === s).length
    return acc
  }, {} as Record<TrialStatus, number>)

  const activeCount = counts.active + counts.start_up + counts.open_label

  function startEdit(trial: TrackedTrial) {
    setEditingId(trial.id)
    setEditForm({ ...trial })
  }

  function cancelEdit() {
    setEditingId(null)
    setEditForm({})
  }

  function saveEdit() {
    if (!editingId) return
    setTrials((prev) =>
      prev.map((t) => (t.id === editingId ? { ...t, ...editForm } : t))
    )
    setEditingId(null)
    setEditForm({})
  }

  return (
    <>
      {/* Header */}
      <div className="border-b border-gray-200 bg-[var(--color-surface-alt)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">Clinical Trials Tracker</h1>
          <p className="mt-2 text-gray-600">
            {trials.length} trials &middot; {activeCount} active/enrolling &middot; {counts.closed} closed
          </p>
        </div>
      </div>

      {/* Status Filter */}
      <SectionWrapper>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({trials.length})
          </button>
          {statusOrder.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                filter === s
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {trialStatusLabels[s]} ({counts[s]})
            </button>
          ))}
        </div>
      </SectionWrapper>

      {/* Trials Table */}
      <SectionWrapper alt>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="pb-3 pr-4 font-semibold text-gray-700">Trial</th>
                <th className="pb-3 pr-4 font-semibold text-gray-700">Disease</th>
                <th className="pb-3 pr-4 font-semibold text-gray-700">Status</th>
                <th className="pb-3 pr-4 font-semibold text-gray-700">Sponsor</th>
                <th className="pb-3 pr-4 font-semibold text-gray-700">PI</th>
                <th className="pb-3 pr-4 font-semibold text-gray-700">CRC</th>
                <th className="pb-3 pr-4 font-semibold text-gray-700 text-right">Enrolled</th>
                <th className="pb-3 pl-4 font-semibold text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((trial) => (
                editingId === trial.id ? (
                  <tr key={trial.id} className="border-b border-gray-100 bg-blue-50/50">
                    <td className="py-3 pr-4">
                      <input
                        type="text"
                        value={editForm.shortName || ''}
                        onChange={(e) => setEditForm({ ...editForm, shortName: e.target.value })}
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="py-3 pr-4">
                      <input
                        type="text"
                        value={editForm.disease || ''}
                        onChange={(e) => setEditForm({ ...editForm, disease: e.target.value })}
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="py-3 pr-4">
                      <select
                        value={editForm.status || ''}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value as TrialStatus })}
                        className="rounded border border-gray-300 px-2 py-1 text-sm"
                      >
                        {statusOrder.map((s) => (
                          <option key={s} value={s}>{trialStatusLabels[s]}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 pr-4">
                      <input
                        type="text"
                        value={editForm.sponsor || ''}
                        onChange={(e) => setEditForm({ ...editForm, sponsor: e.target.value })}
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="py-3 pr-4">
                      <input
                        type="text"
                        value={editForm.pi || ''}
                        onChange={(e) => setEditForm({ ...editForm, pi: e.target.value })}
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="py-3 pr-4">
                      <input
                        type="text"
                        value={editForm.primaryCRC || ''}
                        onChange={(e) => setEditForm({ ...editForm, primaryCRC: e.target.value })}
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <input
                        type="number"
                        value={editForm.currentlyEnrolled ?? ''}
                        onChange={(e) => setEditForm({ ...editForm, currentlyEnrolled: e.target.value ? Number(e.target.value) : undefined })}
                        className="w-16 rounded border border-gray-300 px-2 py-1 text-sm text-right"
                      />
                    </td>
                    <td className="py-3 pl-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={saveEdit}
                          className="rounded bg-[var(--color-accent)] px-3 py-1 text-xs font-medium text-white hover:opacity-90"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="rounded bg-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={trial.id} className="border-b border-gray-100 hover:bg-white">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        {trial.andorLed && (
                          <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-accent)]" title="ANDOR-led" />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">
                            {trial.studyUrl ? (
                              <a href={trial.studyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)]">
                                {trial.shortName}
                              </a>
                            ) : (
                              trial.shortName
                            )}
                          </div>
                          {trial.nctId && (
                            <div className="text-xs text-gray-400">{trial.nctId}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-gray-600">{trial.disease}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${trialStatusColors[trial.status]}`}>
                        {trialStatusLabels[trial.status]}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-gray-600">{trial.sponsor}</td>
                    <td className="py-3 pr-4 text-gray-600 max-w-[200px] truncate">{trial.pi}</td>
                    <td className="py-3 pr-4 text-gray-600">{trial.primaryCRC || '\u2014'}</td>
                    <td className="py-3 pr-4 text-right tabular-nums text-gray-600">
                      {trial.currentlyEnrolled != null ? (
                        <>
                          {trial.currentlyEnrolled}
                          {trial.targetEnrollment != null && (
                            <span className="text-gray-400"> / {trial.targetEnrollment}</span>
                          )}
                        </>
                      ) : (
                        '\u2014'
                      )}
                    </td>
                    <td className="py-3 pl-4 text-right">
                      <button
                        onClick={() => startEdit(trial)}
                        className="rounded px-3 py-1 text-xs font-medium text-[var(--color-accent)] hover:bg-[var(--color-surface-alt)]"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>

      {/* Legend */}
      <SectionWrapper>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            ANDOR-led trial
          </span>
          <span className="text-gray-300">&middot;</span>
          <span>Click Edit to modify trial details (changes are session-only)</span>
        </div>
      </SectionWrapper>
    </>
  )
}

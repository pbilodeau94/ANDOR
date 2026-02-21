'use client'

import { useState } from 'react'
import PortalSection from '@/components/portal/PortalSection'
import PortalPageHeader from '@/components/portal/PortalPageHeader'
import LinkedTasks from '@/components/portal/LinkedTasks'
import RelatedEntities from '@/components/portal/RelatedEntities'
import { trackedTrials as initialTrials, trialStatusLabels, trialStatusColors, irbStatusLabels, irbStatusColors, type TrialStatus, type IrbStatus, type TrackedTrial } from '@/data/trials-tracker'

const statusOrder: TrialStatus[] = ['active', 'start_up', 'open_label', 'closing_out', 'closed']

export default function PortalTrialsPage() {
  const [filter, setFilter] = useState<TrialStatus | 'all'>('all')
  const [trials, setTrials] = useState<TrackedTrial[]>(initialTrials)
  const [expandedId, setExpandedId] = useState<string | null>(null)
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

  function trialDiseases(trial: TrackedTrial): string[] {
    return trial.disease.split(',').map((d) => d.trim()).filter(Boolean)
  }

  return (
    <>
      <PortalPageHeader
        title="Clinical Trials Tracker"
        subtitle={`${trials.length} trials \u00b7 ${activeCount} active/enrolling \u00b7 ${counts.closed} closed`}
      />

      <PortalSection>
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
      </PortalSection>

      <PortalSection>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="w-8 py-3 pl-4 pr-2"></th>
                <th className="py-3 pr-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Trial</th>
                <th className="py-3 pr-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Disease</th>
                <th className="py-3 pr-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                <th className="py-3 pr-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Sponsor</th>
                <th className="py-3 pr-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">PI</th>
                <th className="py-3 pr-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">CRC</th>
                <th className="py-3 pr-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Enrolled</th>
                <th className="py-3 pr-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((trial) => (
                editingId === trial.id ? (
                  <tr key={trial.id} className="border-b border-gray-100 bg-blue-50/50">
                    <td className="py-3 pl-4 pr-2"></td>
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
                    <td className="py-3 pr-4 text-right">
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
                  <>
                    <tr
                      key={trial.id}
                      className="cursor-pointer border-b border-gray-100 hover:bg-gray-50"
                      onClick={() => setExpandedId(expandedId === trial.id ? null : trial.id)}
                    >
                      <td className="py-3 pl-4 pr-2">
                        <svg
                          className={`h-4 w-4 text-gray-400 transition-transform ${expandedId === trial.id ? 'rotate-90' : ''}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          {trial.andorLed && (
                            <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-accent)]" title="ANDOR-led" />
                          )}
                          <div>
                            <div className="font-medium text-gray-900">
                              {trial.studyUrl ? (
                                <a href={trial.studyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)]" onClick={(e) => e.stopPropagation()}>
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
                      <td className="py-3 pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => startEdit(trial)}
                          className="rounded px-3 py-1 text-xs font-medium text-[var(--color-accent)] hover:bg-gray-100"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                    {expandedId === trial.id && (
                      <tr key={`${trial.id}-expanded`}>
                        <td colSpan={9} className="bg-gray-50 px-4 py-4">
                          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div>
                              <span className="text-xs font-semibold uppercase text-gray-400">Description</span>
                              <p className="mt-1 text-sm text-gray-700">{trial.description}</p>
                            </div>
                            {trial.subInvestigator && (
                              <div>
                                <span className="text-xs font-semibold uppercase text-gray-400">Sub-Investigator</span>
                                <p className="mt-1 text-sm text-gray-700">{trial.subInvestigator}</p>
                              </div>
                            )}
                            {trial.backupCRC && (
                              <div>
                                <span className="text-xs font-semibold uppercase text-gray-400">Backup CRC</span>
                                <p className="mt-1 text-sm text-gray-700">{trial.backupCRC}</p>
                              </div>
                            )}
                            {trial.siteNumber && (
                              <div>
                                <span className="text-xs font-semibold uppercase text-gray-400">Site Number</span>
                                <p className="mt-1 text-sm text-gray-700">{trial.siteNumber}</p>
                              </div>
                            )}
                            {trial.protocolNumber && (
                              <div>
                                <span className="text-xs font-semibold uppercase text-gray-400">Protocol Number</span>
                                <p className="mt-1 text-sm text-gray-700">{trial.protocolNumber}</p>
                              </div>
                            )}
                            {trial.agreementNumber && (
                              <div>
                                <span className="text-xs font-semibold uppercase text-gray-400">Agreement Number</span>
                                <p className="mt-1 text-sm text-gray-700">{trial.agreementNumber}</p>
                              </div>
                            )}
                            {trial.fundNumber && (
                              <div>
                                <span className="text-xs font-semibold uppercase text-gray-400">Fund Number</span>
                                <p className="mt-1 text-sm text-gray-700">{trial.fundNumber}</p>
                              </div>
                            )}
                            {trial.irbStatus && (
                              <div>
                                <span className="text-xs font-semibold uppercase text-gray-400">IRB Status</span>
                                <p className="mt-1">
                                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${irbStatusColors[trial.irbStatus]}`}>
                                    {irbStatusLabels[trial.irbStatus]}
                                  </span>
                                </p>
                              </div>
                            )}
                            {trial.totalEnrolled != null && (
                              <div>
                                <span className="text-xs font-semibold uppercase text-gray-400">Total Enrolled (all time)</span>
                                <p className="mt-1 text-sm text-gray-700">{trial.totalEnrolled}</p>
                              </div>
                            )}
                            <RelatedEntities
                              diseases={trialDiseases(trial)}
                              excludeId={trial.id}
                              exclude={['trials']}
                            />
                            <div className="sm:col-span-2 lg:col-span-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase text-gray-400">Tasks</span>
                                <a href="/portal/tasks" className="text-[10px] font-medium text-[var(--color-accent)] hover:underline">
                                  All tasks &rarr;
                                </a>
                              </div>
                              <div className="mt-2 space-y-1">
                                <LinkedTasks trialId={trial.id} />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                )
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            ANDOR-led trial
          </span>
          <span className="text-gray-300">&middot;</span>
          <span>Click a row to expand &middot; Click Edit to modify (session-only)</span>
        </div>
      </PortalSection>
    </>
  )
}

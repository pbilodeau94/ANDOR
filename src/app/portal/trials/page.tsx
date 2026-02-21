'use client'

import { useState } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import { trackedTrials, trialStatusLabels, trialStatusColors, type TrialStatus } from '@/data/trials-tracker'

const statusOrder: TrialStatus[] = ['active', 'start_up', 'open_label', 'closing_out', 'closed']

export default function PortalTrialsPage() {
  const [filter, setFilter] = useState<TrialStatus | 'all'>('all')

  const filtered = filter === 'all'
    ? trackedTrials
    : trackedTrials.filter((t) => t.status === filter)

  const counts = statusOrder.reduce((acc, s) => {
    acc[s] = trackedTrials.filter((t) => t.status === s).length
    return acc
  }, {} as Record<TrialStatus, number>)

  const activeCount = counts.active + counts.start_up + counts.open_label

  return (
    <>
      {/* Header */}
      <div className="border-b border-gray-200 bg-[var(--color-surface-alt)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">Clinical Trials Tracker</h1>
          <p className="mt-2 text-gray-600">
            {trackedTrials.length} trials &middot; {activeCount} active/enrolling &middot; {counts.closed} closed
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
            All ({trackedTrials.length})
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
              </tr>
            </thead>
            <tbody>
              {filtered.map((trial) => (
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
                  <td className="py-3 pr-4 text-gray-600">{trial.primaryCRC || '—'}</td>
                  <td className="py-3 pr-4 text-right tabular-nums text-gray-600">
                    {trial.currentlyEnrolled != null ? (
                      <>
                        {trial.currentlyEnrolled}
                        {trial.targetEnrollment != null && (
                          <span className="text-gray-400"> / {trial.targetEnrollment}</span>
                        )}
                      </>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
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
        </div>
      </SectionWrapper>
    </>
  )
}

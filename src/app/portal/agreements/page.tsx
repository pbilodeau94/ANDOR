'use client'

import { useState, useMemo } from 'react'
import PortalSection from '@/components/portal/PortalSection'
import PortalPageHeader from '@/components/portal/PortalPageHeader'
import LinkedTasks from '@/components/portal/LinkedTasks'
import RelatedEntities from '@/components/portal/RelatedEntities'
import {
  agreements,
  agreementStatusLabels,
  agreementStatusColors,
  directionLabels,
} from '@/data/agreements'
import type { AgreementStatus, AgreementType, Agreement } from '@/data/agreements'

type TypeTab = 'all' | 'DUA' | 'MTA' | 'DUA + MTA'

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '\u2014'
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function matchesTypeTab(type: AgreementType, tab: TypeTab): boolean {
  if (tab === 'all') return true
  if (tab === 'DUA') return type === 'DUA' || type === 'Low risk DUA'
  if (tab === 'MTA') return type === 'MTA'
  if (tab === 'DUA + MTA') return type === 'DUA' || type === 'Low risk DUA' || type === 'MTA'
  return true
}

function ExpandedAgreementRow({
  agreement,
  onOpenPdf,
}: {
  agreement: Agreement
  onOpenPdf: (path: string) => void
}) {
  return (
    <tr>
      <td colSpan={8} className="bg-gray-50 px-4 py-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {agreement.dataShared && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Data Shared</span>
              <p className="mt-1 text-sm text-gray-700">{agreement.dataShared}</p>
            </div>
          )}
          {agreement.samplesShared && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Samples Shared</span>
              <p className="mt-1 text-sm text-gray-700">{agreement.samplesShared}</p>
            </div>
          )}
          {agreement.diseases.length > 0 && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Disease Areas</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {agreement.diseases.map((d) => (
                  <span key={d} className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-600">{d}</span>
                ))}
              </div>
            </div>
          )}
          {agreement.dropboxPath && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Document</span>
              <button
                onClick={() => onOpenPdf(agreement.dropboxPath!)}
                className="mt-1 flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:underline"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Open PDF
              </button>
            </div>
          )}
          <RelatedEntities
            diseases={agreement.diseases}
            excludeId={agreement.id}
            exclude={['agreements']}
          />
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-gray-400">Tasks</span>
              <a href="/portal/tasks" className="text-[10px] font-medium text-[var(--color-accent)] hover:underline">
                All tasks &rarr;
              </a>
            </div>
            <div className="mt-2 space-y-1">
              <LinkedTasks agreementId={agreement.id} />
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default function AgreementsPage() {
  const [typeTab, setTypeTab] = useState<TypeTab>('all')
  const [statusFilter, setStatusFilter] = useState<AgreementStatus | 'all'>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editStatus, setEditStatus] = useState<AgreementStatus>('in_review')

  const typeTabs: { key: TypeTab; label: string; count: number }[] = useMemo(() => {
    return [
      { key: 'all' as TypeTab, label: 'All', count: agreements.length },
      { key: 'DUA' as TypeTab, label: 'DUA', count: agreements.filter((a) => a.type === 'DUA' || a.type === 'Low risk DUA').length },
      { key: 'MTA' as TypeTab, label: 'MTA', count: agreements.filter((a) => a.type === 'MTA').length },
    ]
  }, [])

  const filtered = useMemo(() => {
    let result = agreements.filter((a) => matchesTypeTab(a.type, typeTab))
    if (statusFilter !== 'all') result = result.filter((a) => a.status === statusFilter)
    return result
  }, [typeTab, statusFilter])

  async function openDropboxFile(path: string) {
    const win = window.open('about:blank', '_blank')
    try {
      const res = await fetch(`/api/dropbox?action=link&path=${encodeURIComponent(path)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to get link')
      if (win) win.location.href = data.link
      else window.location.href = data.link
    } catch (err) {
      if (win) win.close()
      alert(err instanceof Error ? err.message : 'Failed to open file')
    }
  }

  function startEdit(agreement: Agreement) {
    setEditingId(agreement.id)
    setEditStatus(agreement.status)
  }

  function saveEdit(id: string) {
    // In a real app, this would persist. For now, update in-memory.
    const agreement = agreements.find((a) => a.id === id)
    if (agreement) {
      ;(agreement as { status: AgreementStatus }).status = editStatus
    }
    setEditingId(null)
  }

  return (
    <>
      <PortalPageHeader
        title="DUA / MTA Tracker"
        subtitle={`${agreements.length} data use and material transfer agreements`}
      />

      <PortalSection>
        {/* Type tabs */}
        <div className="mb-4 flex gap-1 border-b border-gray-200">
          {typeTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setTypeTab(tab.key); setExpandedId(null) }}
              className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
                typeTab === tab.key
                  ? 'text-[var(--color-accent)]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs text-gray-400">{tab.count}</span>
              {typeTab === tab.key && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[var(--color-accent)]" />
              )}
            </button>
          ))}
        </div>

        {/* Status filter */}
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

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full min-w-[750px]">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="w-8 py-3 pl-4 pr-2"></th>
                <th className="py-3 pr-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Agreement
                </th>
                <th className="whitespace-nowrap py-3 pr-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Partner
                </th>
                <th className="whitespace-nowrap py-3 pr-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Type
                </th>
                <th className="whitespace-nowrap py-3 pr-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Direction
                </th>
                <th className="whitespace-nowrap py-3 pr-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Expiration
                </th>
                <th className="whitespace-nowrap py-3 pr-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="whitespace-nowrap py-3 pr-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  PDF
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((agreement) => (
                <>
                  <tr
                    key={agreement.id}
                    className="cursor-pointer border-b border-gray-100 hover:bg-gray-50"
                    onClick={() => setExpandedId(expandedId === agreement.id ? null : agreement.id)}
                  >
                    <td className="py-3 pl-4 pr-2">
                      <svg
                        className={`h-4 w-4 text-gray-400 transition-transform ${expandedId === agreement.id ? 'rotate-90' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </td>
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
                    <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">
                      {formatDate(agreement.expirationDate)}
                    </td>
                    <td className="whitespace-nowrap py-3 pr-4" onClick={(e) => e.stopPropagation()}>
                      {editingId === agreement.id ? (
                        <div className="flex items-center gap-1">
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value as AgreementStatus)}
                            className="rounded border border-gray-300 px-1.5 py-0.5 text-xs"
                          >
                            {Object.entries(agreementStatusLabels).map(([key, label]) => (
                              <option key={key} value={key}>{label}</option>
                            ))}
                          </select>
                          <button
                            onClick={() => saveEdit(agreement.id)}
                            className="rounded bg-emerald-500 px-2 py-0.5 text-xs text-white hover:bg-emerald-600"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(agreement)}
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium hover:ring-1 hover:ring-gray-300 ${agreementStatusColors[agreement.status]}`}
                        >
                          {agreementStatusLabels[agreement.status]}
                        </button>
                      )}
                    </td>
                    <td className="whitespace-nowrap py-3 pr-4" onClick={(e) => e.stopPropagation()}>
                      {agreement.dropboxPath ? (
                        <button
                          onClick={() => openDropboxFile(agreement.dropboxPath!)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] hover:underline"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          PDF
                        </button>
                      ) : (
                        <span className="text-xs text-gray-300">&mdash;</span>
                      )}
                    </td>
                  </tr>
                  {expandedId === agreement.id && (
                    <ExpandedAgreementRow
                      key={`${agreement.id}-expanded`}
                      agreement={agreement}
                      onOpenPdf={openDropboxFile}
                    />
                  )}
                </>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-sm text-gray-400 italic">
                    No agreements match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-gray-400">
          Showing {filtered.length} of {agreements.length} agreements
        </p>
      </PortalSection>
    </>
  )
}

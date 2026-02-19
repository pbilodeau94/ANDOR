'use client'

import { useState, useMemo } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import { documents, documentTypeLabels, documentTypeColors } from '@/data/documents'
import type { DocumentType } from '@/data/documents'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function DocumentsPage() {
  const [typeFilter, setTypeFilter] = useState<DocumentType | 'all'>('all')
  const [investigatorFilter, setInvestigatorFilter] = useState<string>('all')

  const investigators = useMemo(
    () => [...new Set(documents.map((d) => d.investigator).filter(Boolean))].sort(),
    []
  )

  const filtered = useMemo(() => {
    let result = [...documents]
    if (typeFilter !== 'all') result = result.filter((d) => d.type === typeFilter)
    if (investigatorFilter !== 'all') result = result.filter((d) => d.investigator === investigatorFilter)
    return result.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
  }, [typeFilter, investigatorFilter])

  const hasFilters = typeFilter !== 'all' || investigatorFilter !== 'all'

  return (
    <>
      <div className="border-b border-gray-200 bg-[var(--color-surface-alt)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">Documents</h1>
          <p className="mt-2 text-gray-600">
            {documents.length} biosketches, budgets, and support documents
          </p>
        </div>
      </div>

      <SectionWrapper>
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as DocumentType | 'all')}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">All Types</option>
            {Object.entries(documentTypeLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          <select
            value={investigatorFilter}
            onChange={(e) => setInvestigatorFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">All Investigators</option>
            {investigators.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={() => {
                setTypeFilter('all')
                setInvestigatorFilter('all')
              }}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[600px]">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="py-3 pr-4 pl-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Document
                </th>
                <th className="whitespace-nowrap py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Type
                </th>
                <th className="whitespace-nowrap py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Investigator
                </th>
                <th className="whitespace-nowrap py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Last Updated
                </th>
                <th className="whitespace-nowrap py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc) => (
                <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 pr-4 pl-4">
                    <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                  </td>
                  <td className="whitespace-nowrap py-3 pr-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${documentTypeColors[doc.type]}`}>
                      {documentTypeLabels[doc.type]}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">
                    {doc.investigator}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">
                    {formatDate(doc.lastUpdated)}
                  </td>
                  <td className="whitespace-nowrap py-3">
                    {doc.url ? (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--color-accent)] hover:underline"
                      >
                        Open
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400 italic">No link</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-gray-400 italic">
                    No documents match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-gray-400">
          Showing {filtered.length} of {documents.length} documents
        </p>
      </SectionWrapper>
    </>
  )
}

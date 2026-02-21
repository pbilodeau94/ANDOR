'use client'

import { useState, useMemo } from 'react'
import PortalSection from '@/components/portal/PortalSection'
import PortalPageHeader from '@/components/portal/PortalPageHeader'
import { documents, documentTypeLabels, documentTypeColors } from '@/data/documents'
import type { DocumentType } from '@/data/documents'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const typeOrder: DocumentType[] = ['biosketch', 'letter_of_support', 'other']

export default function DocumentsPage() {
  const [investigatorFilter, setInvestigatorFilter] = useState<string>('all')
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set())

  const investigators = useMemo(
    () => [...new Set(documents.map((d) => d.investigator).filter(Boolean))].sort(),
    []
  )

  const filtered = useMemo(() => {
    let result = [...documents]
    if (investigatorFilter !== 'all') result = result.filter((d) => d.investigator === investigatorFilter)
    return result.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
  }, [investigatorFilter])

  // Group by type
  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {}
    for (const type of typeOrder) {
      const items = filtered.filter((d) => d.type === type)
      if (items.length > 0) groups[type] = items
    }
    return groups
  }, [filtered])

  function toggleSection(type: string) {
    setCollapsedSections((prev) => {
      const next = new Set(prev)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next
    })
  }

  async function openDropboxFile(path: string) {
    try {
      const res = await fetch(`/api/dropbox?action=link&path=${encodeURIComponent(path)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to get link')
      window.open(data.link, '_blank')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to open file')
    }
  }

  return (
    <>
      <PortalPageHeader
        title="Documents"
        subtitle={`${documents.length} biosketches and support documents`}
      />

      <PortalSection>
        {/* Filter */}
        <div className="mb-6 flex flex-wrap gap-3">
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

          {investigatorFilter !== 'all' && (
            <button
              onClick={() => setInvestigatorFilter('all')}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Grouped sections */}
        <div className="space-y-4">
          {Object.entries(grouped).map(([type, docs]) => {
            const isCollapsed = collapsedSections.has(type)
            return (
              <div key={type} className="overflow-hidden rounded-xl border border-gray-200">
                {/* Section header */}
                <button
                  onClick={() => toggleSection(type)}
                  className="flex w-full items-center justify-between bg-gray-50 px-4 py-3 text-left hover:bg-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className={`h-4 w-4 text-gray-400 transition-transform ${isCollapsed ? '' : 'rotate-90'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${documentTypeColors[type as DocumentType]}`}>
                      {documentTypeLabels[type as DocumentType]}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {docs.length} {docs.length === 1 ? 'document' : 'documents'}
                    </span>
                  </div>
                </button>

                {/* Section content */}
                {!isCollapsed && (
                  <table className="w-full">
                    <tbody>
                      {docs.map((doc) => (
                        <tr key={doc.id} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="py-3 pl-11 pr-4">
                            <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                          </td>
                          <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">
                            {doc.investigator}
                          </td>
                          <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-500">
                            {formatDate(doc.lastUpdated)}
                          </td>
                          <td className="whitespace-nowrap py-3 pr-4">
                            {doc.dropboxPath ? (
                              <button
                                onClick={() => openDropboxFile(doc.dropboxPath!)}
                                className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:underline"
                              >
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Open
                              </button>
                            ) : doc.url ? (
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
                    </tbody>
                  </table>
                )}
              </div>
            )
          })}

          {Object.keys(grouped).length === 0 && (
            <p className="py-8 text-center text-sm text-gray-400 italic">
              No documents match the selected filter.
            </p>
          )}
        </div>

        <p className="mt-4 text-xs text-gray-400">
          Showing {filtered.length} of {documents.length} documents
        </p>
      </PortalSection>
    </>
  )
}

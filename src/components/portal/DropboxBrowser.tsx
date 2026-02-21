'use client'

import { useState, useEffect, useCallback } from 'react'

type DropboxEntry = {
  name: string
  type: 'folder' | 'file'
  path: string
  size: number
  modified: string | null
}

function formatSize(bytes: number): string {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function DropboxBrowser({ basePath = '/' }: { basePath?: string }) {
  const [currentPath, setCurrentPath] = useState(basePath)
  const [entries, setEntries] = useState<DropboxEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchFolder = useCallback(async (path: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/dropbox?action=list&path=${encodeURIComponent(path)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load folder')
      // Sort: folders first, then files alphabetically
      const sorted = (data.entries as DropboxEntry[]).sort((a, b) => {
        if (a.type !== b.type) return a.type === 'folder' ? -1 : 1
        return a.name.localeCompare(b.name)
      })
      setEntries(sorted)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
      setEntries([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFolder(currentPath)
  }, [currentPath, fetchFolder])

  async function openFile(path: string) {
    // Open window synchronously during click to avoid popup blocker
    const win = window.open('about:blank', '_blank')
    try {
      const res = await fetch(`/api/dropbox?action=link&path=${encodeURIComponent(path)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to get link')
      if (win) win.location.href = data.link
      else window.location.href = data.link
    } catch (err) {
      if (win) win.close()
      setError(err instanceof Error ? err.message : 'Failed to open file')
    }
  }

  function navigateUp() {
    const parts = currentPath.split('/').filter(Boolean)
    parts.pop()
    setCurrentPath(parts.length > 0 ? '/' + parts.join('/') : '/')
  }

  const pathParts = currentPath.split('/').filter(Boolean)

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 border-b border-gray-100 px-3 py-2 text-xs">
        <button
          onClick={() => setCurrentPath(basePath)}
          className="text-[var(--color-accent)] hover:underline"
        >
          Dropbox
        </button>
        {pathParts.map((part, i) => (
          <span key={i} className="flex items-center gap-1">
            <span className="text-gray-300">/</span>
            <button
              onClick={() => setCurrentPath('/' + pathParts.slice(0, i + 1).join('/'))}
              className="text-[var(--color-accent)] hover:underline"
            >
              {part}
            </button>
          </span>
        ))}
        {loading && (
          <span className="ml-2 text-gray-400">Loading...</span>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="border-b border-gray-100 bg-red-50 px-3 py-2 text-xs text-red-600">
          {error}
          <button onClick={() => fetchFolder(currentPath)} className="ml-2 font-medium underline">
            Retry
          </button>
        </div>
      )}

      {/* Entries */}
      <div className="max-h-80 overflow-y-auto">
        {currentPath !== basePath && (
          <button
            onClick={navigateUp}
            className="flex w-full items-center gap-2 border-b border-gray-50 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            ..
          </button>
        )}
        {entries.map((entry) => (
          <button
            key={entry.path}
            onClick={() => {
              if (entry.type === 'folder') {
                setCurrentPath(entry.path)
              } else {
                openFile(entry.path)
              }
            }}
            className="flex w-full items-center gap-2 border-b border-gray-50 px-3 py-2 text-left text-sm hover:bg-gray-50"
          >
            {entry.type === 'folder' ? (
              <svg className="h-4 w-4 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            ) : (
              <svg className="h-4 w-4 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )}
            <span className="min-w-0 flex-1 truncate text-gray-900">{entry.name}</span>
            {entry.type === 'file' && entry.size > 0 && (
              <span className="shrink-0 text-[10px] text-gray-400">{formatSize(entry.size)}</span>
            )}
            {entry.modified && (
              <span className="shrink-0 text-[10px] text-gray-400">{formatDate(entry.modified)}</span>
            )}
          </button>
        ))}
        {!loading && entries.length === 0 && !error && (
          <div className="px-3 py-6 text-center text-xs text-gray-400">
            Empty folder
          </div>
        )}
      </div>
    </div>
  )
}

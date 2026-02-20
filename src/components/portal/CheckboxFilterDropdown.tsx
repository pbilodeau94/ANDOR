'use client'

import { useState, useRef, useEffect } from 'react'

export default function CheckboxFilterDropdown({
  allItems,
  selected,
  onChange,
  label,
  labelMap,
}: {
  allItems: string[]
  selected: string[]
  onChange: (next: string[]) => void
  label: string
  labelMap?: Record<string, string>
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

  const getLabel = (key: string) => labelMap?.[key] ?? key

  const displayLabel = selected.length === 0
    ? label
    : selected.length === 1
      ? getLabel(selected[0])
      : `${selected.length} selected`

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        {displayLabel}
        <svg className={`h-4 w-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 z-20 mt-1 max-h-64 w-56 overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {allItems.map((name) => (
            <label key={name} className="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
              <input
                type="checkbox"
                checked={selected.includes(name)}
                onChange={() => toggle(name)}
                className="rounded border-gray-300 text-[var(--color-primary)]"
              />
              {getLabel(name)}
            </label>
          ))}
          {allItems.length === 0 && (
            <p className="px-3 py-2 text-xs italic text-gray-400">None available</p>
          )}
        </div>
      )}
    </div>
  )
}

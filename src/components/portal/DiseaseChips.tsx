'use client'

import { useState, useRef, useEffect } from 'react'

export default function DiseaseChips({
  diseases,
  onUpdate,
}: {
  diseases: string[]
  onUpdate: (newDiseases: string[]) => void
}) {
  const [adding, setAdding] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (adding && inputRef.current) inputRef.current.focus()
  }, [adding])

  function addDisease(name: string) {
    const trimmed = name.trim()
    if (trimmed && !diseases.includes(trimmed)) {
      onUpdate([...diseases, trimmed])
    }
    setInputValue('')
    setAdding(false)
  }

  function removeDisease(name: string) {
    onUpdate(diseases.filter((d) => d !== name))
  }

  return (
    <div>
      <span className="text-xs font-semibold uppercase text-gray-400">Disease Areas</span>
      <div className="mt-1 flex flex-wrap items-center gap-1.5">
        {diseases.map((d) => (
          <span
            key={d}
            className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-600"
          >
            {d}
            <button
              onClick={() => removeDisease(d)}
              className="ml-0.5 text-gray-400 hover:text-gray-700"
            >
              &times;
            </button>
          </span>
        ))}
        {adding ? (
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputValue.trim()) addDisease(inputValue)
              if (e.key === 'Escape') {
                setAdding(false)
                setInputValue('')
              }
            }}
            onBlur={() => {
              if (inputValue.trim()) addDisease(inputValue)
              else {
                setAdding(false)
                setInputValue('')
              }
            }}
            className="w-32 rounded border border-gray-300 px-2 py-0.5 text-xs"
            placeholder="Add disease..."
          />
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="text-xs text-[var(--color-accent)] hover:underline"
          >
            + Add
          </button>
        )}
      </div>
    </div>
  )
}

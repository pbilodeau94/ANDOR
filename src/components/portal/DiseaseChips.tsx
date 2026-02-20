'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { knownDiseases } from '@/data/grants'

export default function DiseaseChips({
  diseases,
  onUpdate,
}: {
  diseases: string[]
  onUpdate: (newDiseases: string[]) => void
}) {
  const [adding, setAdding] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (adding && inputRef.current) inputRef.current.focus()
  }, [adding])

  function handleInput(val: string) {
    setInputValue(val)
    if (val.trim()) {
      const lower = val.toLowerCase()
      setSuggestions(
        knownDiseases.filter(
          (d) => d.toLowerCase().includes(lower) && !diseases.includes(d)
        )
      )
    } else {
      setSuggestions([])
    }
  }

  function addDisease(name: string) {
    const trimmed = name.trim()
    if (trimmed && !diseases.includes(trimmed)) {
      onUpdate([...diseases, trimmed])
    }
    setInputValue('')
    setSuggestions([])
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
          <div className="relative">
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => handleInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputValue.trim()) addDisease(inputValue)
                if (e.key === 'Escape') {
                  setAdding(false)
                  setInputValue('')
                  setSuggestions([])
                }
              }}
              onBlur={() => {
                setTimeout(() => {
                  setAdding(false)
                  setInputValue('')
                  setSuggestions([])
                }, 150)
              }}
              className="w-40 rounded border border-gray-300 px-2 py-0.5 text-xs"
              placeholder="Add disease..."
            />
            {suggestions.length > 0 && (
              <div className="absolute left-0 z-10 mt-1 w-48 rounded border border-gray-200 bg-white py-1 shadow-lg">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onMouseDown={() => addDisease(s)}
                    className="block w-full px-3 py-1 text-left text-xs text-gray-700 hover:bg-gray-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
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

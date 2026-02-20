'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { team } from '@/data/team'

export default function TeamMemberChips({
  members,
  onUpdate,
  label = 'Principal Investigator(s)',
  addLabel = '+ Add',
}: {
  members: string[]
  onUpdate: (newMembers: string[]) => void
  label?: string
  addLabel?: string
}) {
  const [adding, setAdding] = useState(false)
  const [filter, setFilter] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const teamNames = useMemo(() => team.map((m) => m.name), [])
  const available = useMemo(
    () => teamNames.filter((n) => !members.includes(n) && (!filter || n.toLowerCase().includes(filter.toLowerCase()))),
    [teamNames, members, filter]
  )

  useEffect(() => {
    if (adding && inputRef.current) inputRef.current.focus()
  }, [adding])

  function addMember(name: string) {
    if (!members.includes(name)) onUpdate([...members, name])
    setFilter('')
    setAdding(false)
  }

  function removeMember(name: string) {
    onUpdate(members.filter((n) => n !== name))
  }

  return (
    <div>
      <span className="text-xs font-semibold uppercase text-gray-400">{label}</span>
      <div className="mt-1 flex flex-wrap items-center gap-1.5">
        {members.map((name) => (
          <span key={name} className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-primary)]">
            {name}
            <button onClick={() => removeMember(name)} className="ml-0.5 text-[var(--color-primary)]/60 hover:text-[var(--color-primary)]">&times;</button>
          </span>
        ))}
        {adding ? (
          <div className="relative">
            <input
              ref={inputRef}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && available.length > 0) addMember(available[0])
                if (e.key === 'Escape') { setAdding(false); setFilter('') }
              }}
              onBlur={() => { setTimeout(() => { setAdding(false); setFilter('') }, 150) }}
              className="w-40 rounded border border-gray-300 px-2 py-0.5 text-xs"
              placeholder="Search team..."
            />
            {available.length > 0 && (
              <div className="absolute left-0 z-10 mt-1 max-h-48 w-48 overflow-y-auto rounded border border-gray-200 bg-white py-1 shadow-lg">
                {available.map((s) => (
                  <button key={s} onMouseDown={() => addMember(s)} className="block w-full px-3 py-1 text-left text-xs text-gray-700 hover:bg-gray-50">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setAdding(true)} className="text-xs text-[var(--color-accent)] hover:underline">{addLabel}</button>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState, useCallback, useEffect } from 'react'
import { grants as initialGrants } from './grants'
import type { Grant, GrantStatus } from './grants'

const STORAGE_KEY = 'andor-grants-overrides'
const MILESTONE_STORAGE_KEY = 'andor-milestone-completions'

type GrantOverrides = {
  updates: Record<string, Partial<Grant>>
  deleted: string[]
  added: Grant[]
}

function loadOverrides(): GrantOverrides {
  if (typeof window === 'undefined') return { updates: {}, deleted: [], added: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { updates: {}, deleted: [], added: [] }
    return JSON.parse(raw)
  } catch {
    return { updates: {}, deleted: [], added: [] }
  }
}

function saveOverrides(overrides: GrantOverrides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
}

function loadMilestoneCompletions(): Record<string, Record<string, boolean>> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(MILESTONE_STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

function saveMilestoneCompletions(completions: Record<string, Record<string, boolean>>) {
  localStorage.setItem(MILESTONE_STORAGE_KEY, JSON.stringify(completions))
}

function mergeGrants(overrides: GrantOverrides): Grant[] {
  const deletedSet = new Set(overrides.deleted)
  const base = initialGrants
    .filter((g) => !deletedSet.has(g.id))
    .map((g) => {
      const updates = overrides.updates[g.id]
      if (!updates) return g
      const merged = { ...g, ...updates }
      // Migration: if pi was stored as a string (old format), convert to array
      if (typeof merged.pi === 'string') {
        merged.pi = merged.pi ? [merged.pi] : []
      }
      // Migration: if amount was stored (old format), convert to directCosts
      if ('amount' in merged && !('directCosts' in updates)) {
        const legacy = merged as Grant & { amount?: number | null }
        if (legacy.amount !== undefined) {
          merged.directCosts = legacy.amount ?? null
          delete legacy.amount
        }
      }
      return merged
    })

  // Include user-added grants (with any updates applied, excluding deleted)
  const added = (overrides.added ?? [])
    .filter((g) => !deletedSet.has(g.id))
    .map((g) => {
      const updates = overrides.updates[g.id]
      if (!updates) return g
      return { ...g, ...updates }
    })

  return [...base, ...added]
}

export function useGrantsStore() {
  const [overrides, setOverrides] = useState<GrantOverrides>({ updates: {}, deleted: [], added: [] })
  const [milestoneCompletions, setMilestoneCompletions] = useState<Record<string, Record<string, boolean>>>({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setOverrides(loadOverrides())
    setMilestoneCompletions(loadMilestoneCompletions())
    setLoaded(true)
  }, [])

  const allGrants = loaded ? mergeGrants(overrides) : initialGrants

  const updateGrant = useCallback((id: string, updates: Partial<Grant>) => {
    setOverrides((prev) => {
      const next = {
        ...prev,
        updates: {
          ...prev.updates,
          [id]: { ...prev.updates[id], ...updates },
        },
      }
      saveOverrides(next)
      return next
    })
  }, [])

  const addGrant = useCallback((grant: Omit<Grant, 'id'>) => {
    const id = `g-user-${Date.now()}`
    const newGrant: Grant = { ...grant, id } as Grant
    setOverrides((prev) => {
      const next = {
        ...prev,
        added: [...(prev.added ?? []), newGrant],
      }
      saveOverrides(next)
      return next
    })
    return id
  }, [])

  const deleteGrant = useCallback((id: string) => {
    setOverrides((prev) => {
      const next = {
        updates: { ...prev.updates },
        deleted: [...prev.deleted, id],
        added: (prev.added ?? []).filter((g) => g.id !== id),
      }
      delete next.updates[id]
      saveOverrides(next)
      return next
    })
  }, [])

  const toggleMilestone = useCallback((grantId: string, milestoneKey: string) => {
    setMilestoneCompletions((prev) => {
      const grantMilestones = prev[grantId] ?? {}
      const next = {
        ...prev,
        [grantId]: {
          ...grantMilestones,
          [milestoneKey]: !grantMilestones[milestoneKey],
        },
      }
      saveMilestoneCompletions(next)
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(MILESTONE_STORAGE_KEY)
    setOverrides({ updates: {}, deleted: [], added: [] })
    setMilestoneCompletions({})
  }, [])

  return { grants: allGrants, addGrant, updateGrant, deleteGrant, toggleMilestone, milestoneCompletions, resetAll }
}

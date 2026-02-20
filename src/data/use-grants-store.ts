'use client'

import { useState, useCallback, useEffect } from 'react'
import { grants as initialGrants } from './grants'
import type { Grant, GrantStatus } from './grants'

const STORAGE_KEY = 'andor-grants-overrides'

type GrantOverrides = {
  updates: Record<string, Partial<Grant>>
  deleted: string[]
}

function loadOverrides(): GrantOverrides {
  if (typeof window === 'undefined') return { updates: {}, deleted: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { updates: {}, deleted: [] }
    return JSON.parse(raw)
  } catch {
    return { updates: {}, deleted: [] }
  }
}

function saveOverrides(overrides: GrantOverrides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
}

function mergeGrants(overrides: GrantOverrides): Grant[] {
  const deletedSet = new Set(overrides.deleted)
  return initialGrants
    .filter((g) => !deletedSet.has(g.id))
    .map((g) => {
      const updates = overrides.updates[g.id]
      return updates ? { ...g, ...updates } : g
    })
}

export function useGrantsStore() {
  const [overrides, setOverrides] = useState<GrantOverrides>({ updates: {}, deleted: [] })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setOverrides(loadOverrides())
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

  const deleteGrant = useCallback((id: string) => {
    setOverrides((prev) => {
      const next = {
        updates: { ...prev.updates },
        deleted: [...prev.deleted, id],
      }
      delete next.updates[id]
      saveOverrides(next)
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setOverrides({ updates: {}, deleted: [] })
  }, [])

  return { grants: allGrants, updateGrant, deleteGrant, resetAll }
}

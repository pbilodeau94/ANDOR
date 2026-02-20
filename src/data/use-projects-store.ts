'use client'

import { useState, useCallback, useEffect } from 'react'
import { projects as initialProjects } from './projects'
import type { Project } from './projects'

const STORAGE_KEY = 'andor-projects-overrides'

type ProjectOverrides = {
  updates: Record<string, Partial<Project>>
  deleted: string[]
}

function loadOverrides(): ProjectOverrides {
  if (typeof window === 'undefined') return { updates: {}, deleted: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { updates: {}, deleted: [] }
    return JSON.parse(raw)
  } catch {
    return { updates: {}, deleted: [] }
  }
}

function saveOverrides(overrides: ProjectOverrides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
}

function mergeProjects(overrides: ProjectOverrides): Project[] {
  const deletedSet = new Set(overrides.deleted)
  return initialProjects
    .filter((p) => !deletedSet.has(p.id))
    .map((p) => {
      const updates = overrides.updates[p.id]
      if (!updates) return p
      return { ...p, ...updates }
    })
}

export function useProjectsStore() {
  const [overrides, setOverrides] = useState<ProjectOverrides>({ updates: {}, deleted: [] })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setOverrides(loadOverrides())
    setLoaded(true)
  }, [])

  const allProjects = loaded ? mergeProjects(overrides) : initialProjects

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
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

  const deleteProject = useCallback((id: string) => {
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

  return { projects: allProjects, updateProject, deleteProject, resetAll }
}

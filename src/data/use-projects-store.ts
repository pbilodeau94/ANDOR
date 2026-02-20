'use client'

import { useState, useCallback, useEffect } from 'react'
import { projects as initialProjects } from './projects'
import type { Project } from './projects'

const STORAGE_KEY = 'andor-projects-overrides'

type ProjectOverrides = {
  updates: Record<string, Partial<Project>>
  deleted: string[]
  added: Project[]
}

function loadOverrides(): ProjectOverrides {
  if (typeof window === 'undefined') return { updates: {}, deleted: [], added: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { updates: {}, deleted: [], added: [] }
    return JSON.parse(raw)
  } catch {
    return { updates: {}, deleted: [], added: [] }
  }
}

function saveOverrides(overrides: ProjectOverrides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
}

let addCounter = 0

function mergeProjects(overrides: ProjectOverrides): Project[] {
  const deletedSet = new Set(overrides.deleted)
  const base = initialProjects
    .filter((p) => !deletedSet.has(p.id))
    .map((p) => {
      const updates = overrides.updates[p.id]
      if (!updates) return p
      return { ...p, ...updates }
    })
  // Append user-added projects (also apply updates/deletes)
  const added = (overrides.added ?? [])
    .filter((p) => !deletedSet.has(p.id))
    .map((p) => {
      const updates = overrides.updates[p.id]
      if (!updates) return p
      return { ...p, ...updates }
    })
  return [...base, ...added]
}

export function useProjectsStore() {
  const [overrides, setOverrides] = useState<ProjectOverrides>({ updates: {}, deleted: [], added: [] })
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
        added: (prev.added ?? []).filter((p) => p.id !== id),
      }
      delete next.updates[id]
      saveOverrides(next)
      return next
    })
  }, [])

  const addProject = useCallback((project: Omit<Project, 'id'>) => {
    setOverrides((prev) => {
      addCounter++
      const newProject: Project = {
        ...project,
        id: `p-${Date.now()}-${addCounter}`,
      }
      const next = {
        ...prev,
        added: [...(prev.added ?? []), newProject],
      }
      saveOverrides(next)
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setOverrides({ updates: {}, deleted: [], added: [] })
  }, [])

  return { projects: allProjects, updateProject, deleteProject, addProject, resetAll }
}

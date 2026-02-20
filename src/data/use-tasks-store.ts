'use client'

import { useState, useCallback, useEffect } from 'react'
import { calculateMilestones, getUrgency } from './deadline-calculator'
import type { Task, TaskStatus, TaskPriority } from './tasks'
import type { Grant, GrantStatus } from './grants'

const STORAGE_KEY = 'andor-tasks'

const activeGrantStatuses = new Set<GrantStatus>(['not_started', 'in_progress'])

function loadTasks(): Task[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return (parsed as Record<string, unknown>[]).map((t) => ({
      ...t,
      projectId: t.projectId ?? null,
    })) as Task[]
  } catch {
    return []
  }
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

let nextIdCounter = 0

function generateId(): string {
  nextIdCounter++
  return `task-${Date.now()}-${nextIdCounter}`
}

export function useTasksStore() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTasks(loadTasks())
    setLoaded(true)
  }, [])

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt'>) => {
    setTasks((prev) => {
      const newTask: Task = {
        ...task,
        id: generateId(),
        createdAt: new Date().toISOString().slice(0, 10),
      }
      const next = [newTask, ...prev]
      saveTasks(next)
      return next
    })
  }, [])

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
      saveTasks(next)
      return next
    })
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => {
      const next = prev.filter((t) => t.id !== id)
      saveTasks(next)
      return next
    })
  }, [])

  /**
   * Sync milestone tasks from grants with future deadlines.
   * - Creates tasks for milestones that don't already exist
   * - Removes milestone tasks for grants that are no longer active or have past deadlines
   * - Assigns each milestone task to the grant's first PI
   * - Does NOT modify existing milestone tasks (preserves user edits)
   */
  const syncMilestoneTasks = useCallback((grants: Grant[]) => {
    setTasks((prev) => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const existingMilestoneIds = new Set(
        prev.filter((t) => t.milestoneKey).map((t) => t.id)
      )

      const newTasks: Task[] = []
      const validMilestoneIds = new Set<string>()

      for (const grant of grants) {
        if (!grant.deadline || !activeGrantStatuses.has(grant.status)) continue
        const deadlineDate = new Date(grant.deadline + 'T00:00:00')
        if (deadlineDate < today) continue

        const milestones = calculateMilestones(grant.deadline)

        for (const m of milestones) {
          const taskId = `ms-${grant.id}-${m.key}`
          validMilestoneIds.add(taskId)

          if (!existingMilestoneIds.has(taskId)) {
            const urgency = getUrgency(m.dateStr)
            const priority: TaskPriority =
              urgency === 'overdue' || urgency === 'urgent'
                ? 'high'
                : urgency === 'soon'
                  ? 'medium'
                  : 'low'

            newTasks.push({
              id: taskId,
              title: m.label,
              description: m.description,
              assignee: grant.pi[0] || undefined,
              grantId: grant.id,
              projectId: null,
              dueDate: m.dateStr,
              status: 'pending',
              priority,
              createdAt: new Date().toISOString().slice(0, 10),
              milestoneKey: m.key,
            })
          }
        }
      }

      // Remove milestone tasks for grants no longer active or with past deadlines
      const next = prev.filter((t) => {
        if (!t.milestoneKey) return true
        return validMilestoneIds.has(t.id)
      })

      if (newTasks.length === 0 && next.length === prev.length) return prev

      const result = [...next, ...newTasks]
      saveTasks(result)
      return result
    })
  }, [])

  return { tasks: loaded ? tasks : [], addTask, updateTask, deleteTask, syncMilestoneTasks }
}

'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Task, TaskStatus, TaskPriority } from './tasks'

const STORAGE_KEY = 'andor-tasks'

function loadTasks(): Task[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
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

  return { tasks: loaded ? tasks : [], addTask, updateTask, deleteTask }
}

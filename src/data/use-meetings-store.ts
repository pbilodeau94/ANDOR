'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Meeting } from './meetings'

const STORAGE_KEY = 'andor-meetings'

function loadMeetings(): Meeting[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Meeting[]
  } catch {
    return []
  }
}

function saveMeetings(meetings: Meeting[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings))
}

let nextIdCounter = 0

function generateId(): string {
  nextIdCounter++
  return `mtg-${Date.now()}-${nextIdCounter}`
}

export function useMeetingsStore() {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setMeetings(loadMeetings())
    setLoaded(true)
  }, [])

  const addMeeting = useCallback((meeting: Omit<Meeting, 'id'>) => {
    setMeetings((prev) => {
      const newMeeting: Meeting = { ...meeting, id: generateId() }
      const next = [newMeeting, ...prev]
      saveMeetings(next)
      return next
    })
  }, [])

  const updateMeeting = useCallback((id: string, updates: Partial<Meeting>) => {
    setMeetings((prev) => {
      const next = prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
      saveMeetings(next)
      return next
    })
  }, [])

  const deleteMeeting = useCallback((id: string) => {
    setMeetings((prev) => {
      const next = prev.filter((m) => m.id !== id)
      saveMeetings(next)
      return next
    })
  }, [])

  return { meetings: loaded ? meetings : [], addMeeting, updateMeeting, deleteMeeting }
}

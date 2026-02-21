'use client'

import { useState, useCallback, useEffect } from 'react'
import type { StaffMember } from './staff'

const STORAGE_KEY = 'andor-staff'

function loadStaff(): StaffMember[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as StaffMember[]
  } catch {
    return []
  }
}

function saveStaff(staff: StaffMember[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(staff))
}

let nextIdCounter = 0

function generateId(): string {
  nextIdCounter++
  return `staff-${Date.now()}-${nextIdCounter}`
}

export function useStaffStore() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setStaff(loadStaff())
    setLoaded(true)
  }, [])

  const addStaffMember = useCallback((member: Omit<StaffMember, 'id'>) => {
    setStaff((prev) => {
      const newMember: StaffMember = { ...member, id: generateId() }
      const next = [newMember, ...prev]
      saveStaff(next)
      return next
    })
  }, [])

  const updateStaffMember = useCallback((id: string, updates: Partial<StaffMember>) => {
    setStaff((prev) => {
      const next = prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
      saveStaff(next)
      return next
    })
  }, [])

  const deleteStaffMember = useCallback((id: string) => {
    setStaff((prev) => {
      const next = prev.filter((m) => m.id !== id)
      saveStaff(next)
      return next
    })
  }, [])

  return { staff: loaded ? staff : [], addStaffMember, updateStaffMember, deleteStaffMember }
}

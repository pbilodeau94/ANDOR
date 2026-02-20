'use client'

import Link from 'next/link'
import { useTasksStore } from '@/data/use-tasks-store'

function isOverdue(dueDate: string | null): boolean {
  if (!dueDate) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(dueDate + 'T00:00:00') < today
}

export default function TaskSummary() {
  const { tasks } = useTasksStore()

  if (tasks.length === 0) return null

  const pending = tasks.filter((t) => t.status === 'pending').length
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length
  const overdue = tasks.filter(
    (t) => t.status !== 'completed' && isOverdue(t.dueDate)
  ).length

  const activeTasks = tasks.filter((t) => t.status !== 'completed')

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">Open Tasks</div>
        <Link
          href="/portal/tasks"
          className="text-xs font-medium text-[var(--color-accent)] hover:underline"
        >
          View all &rarr;
        </Link>
      </div>
      <div className="mt-1 text-3xl font-bold text-[var(--color-primary)]">{activeTasks.length}</div>
      <div className="mt-2 flex gap-3 text-xs text-gray-500">
        <span>{pending} pending</span>
        <span>{inProgress} in progress</span>
        {overdue > 0 && (
          <span className="font-semibold text-red-600">{overdue} overdue</span>
        )}
      </div>
    </div>
  )
}

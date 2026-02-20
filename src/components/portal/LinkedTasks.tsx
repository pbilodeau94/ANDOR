'use client'

import { useMemo } from 'react'
import { useTasksStore } from '@/data/use-tasks-store'
import {
  taskStatusLabels,
  taskStatusColors,
  taskPriorityLabels,
  taskPriorityColors,
} from '@/data/tasks'
import type { TaskStatus } from '@/data/tasks'

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function isOverdue(dueDate: string | null): boolean {
  if (!dueDate) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(dueDate + 'T00:00:00') < today
}

function TaskItems({ grantId, projectId }: { grantId?: string; projectId?: string }) {
  const { tasks, updateTask } = useTasksStore()

  const linkedTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (grantId) return t.grantId === grantId
      if (projectId) return t.projectId === projectId
      return false
    })
  }, [tasks, grantId, projectId])

  if (linkedTasks.length === 0) return null

  const active = linkedTasks.filter((t) => t.status !== 'completed')
  const completed = linkedTasks.filter((t) => t.status === 'completed')

  return (
    <>
      {active.map((task) => {
        const overdue = isOverdue(task.dueDate)
        return (
          <div
            key={task.id}
            className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${
              overdue ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'
            }`}
          >
            <button
              onClick={() =>
                updateTask(task.id, {
                  status: task.status === 'completed' ? 'pending' : 'completed',
                })
              }
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 border-gray-300 hover:border-gray-400"
            />
            <span className="min-w-0 flex-1 text-xs font-medium text-gray-900 truncate">
              {task.title}
            </span>
            <span className="text-[10px] text-gray-500">{task.assignee}</span>
            {task.dueDate && (
              <span className={`text-[10px] ${overdue ? 'font-semibold text-red-600' : 'text-gray-400'}`}>
                {formatDate(task.dueDate)}
              </span>
            )}
            <span className={`inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-medium ${taskPriorityColors[task.priority]}`}>
              {taskPriorityLabels[task.priority]}
            </span>
            <select
              value={task.status}
              onChange={(e) => updateTask(task.id, { status: e.target.value as TaskStatus })}
              className={`rounded-full border-0 px-1.5 py-0.5 text-[10px] font-medium ${taskStatusColors[task.status]}`}
              onClick={(e) => e.stopPropagation()}
            >
              {Object.entries(taskStatusLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        )
      })}
      {completed.length > 0 && (
        <div className="text-[10px] text-gray-400">
          {completed.length} completed task{completed.length !== 1 ? 's' : ''}
        </div>
      )}
    </>
  )
}

export default function LinkedTasks({
  grantId,
  projectId,
}: {
  grantId?: string
  projectId?: string
}) {
  return <TaskItems grantId={grantId} projectId={projectId} />
}

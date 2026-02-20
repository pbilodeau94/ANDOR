'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useTasksStore } from '@/data/use-tasks-store'
import {
  taskStatusLabels,
  taskStatusColors,
  taskPriorityLabels,
  taskPriorityColors,
} from '@/data/tasks'
import type { TaskStatus, TaskPriority } from '@/data/tasks'
import { team } from '@/data/team'

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

function InlineAddTask({
  grantId,
  projectId,
  onAdd,
}: {
  grantId?: string
  projectId?: string
  onAdd: (task: {
    title: string
    description: string
    assignee?: string
    grantId: string | null
    projectId: string | null
    dueDate: string | null
    status: TaskStatus
    priority: TaskPriority
  }) => void
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [assignee, setAssignee] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({
      title: title.trim(),
      description: '',
      assignee: assignee || undefined,
      grantId: grantId ?? null,
      projectId: projectId ?? null,
      dueDate: dueDate || null,
      status: 'pending',
      priority,
    })
    setTitle('')
    setAssignee('')
    setDueDate('')
    setPriority('medium')
    setOpen(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] hover:underline"
      >
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add task
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-gray-200 bg-white p-3">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="min-w-0 flex-1 rounded border border-gray-300 px-2 py-1 text-xs"
          placeholder="Task title..."
          required
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className="rounded border border-gray-300 px-1 py-1 text-xs"
        >
          {Object.entries(taskPriorityLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>
      <div className="mt-2 flex gap-2">
        <select
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="min-w-0 flex-1 rounded border border-gray-300 px-2 py-1 text-xs"
        >
          <option value="">Unassigned</option>
          {team.map((m) => (
            <option key={m.id} value={m.name}>{m.name}</option>
          ))}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded border border-gray-300 px-2 py-1 text-xs"
        />
      </div>
      <div className="mt-2 flex gap-2">
        <button
          type="submit"
          className="rounded bg-[var(--color-primary)] px-3 py-1 text-xs font-medium text-white hover:bg-[var(--color-primary-light)]"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

function TaskItems({ grantId, projectId }: { grantId?: string; projectId?: string }) {
  const { tasks, addTask, updateTask } = useTasksStore()

  const linkedTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (grantId) return t.grantId === grantId
      if (projectId) return t.projectId === projectId
      return false
    })
  }, [tasks, grantId, projectId])

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
            {task.assignee && (
              <span className="text-[10px] text-gray-400">{task.assignee.split(' ').pop()}</span>
            )}
            {task.dueDate && (
              <span className={`text-[10px] ${overdue ? 'font-semibold text-red-600' : 'text-gray-400'}`}>
                {formatDate(task.dueDate)}
                {overdue && ' !'}
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
      <InlineAddTask grantId={grantId} projectId={projectId} onAdd={addTask} />
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

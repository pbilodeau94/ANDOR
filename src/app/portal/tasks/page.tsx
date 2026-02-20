'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import { useTasksStore } from '@/data/use-tasks-store'
import { useGrantsStore } from '@/data/use-grants-store'
import { team } from '@/data/team'
import {
  taskStatusLabels,
  taskStatusColors,
  taskPriorityLabels,
  taskPriorityColors,
} from '@/data/tasks'
import type { TaskStatus, TaskPriority } from '@/data/tasks'

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '\u2014'
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// --- Add Task Form ---

function AddTaskForm({
  onAdd,
  grantOptions,
}: {
  onAdd: (task: {
    title: string
    description: string
    assignee: string
    grantId: string | null
    dueDate: string | null
    status: TaskStatus
    priority: TaskPriority
  }) => void
  grantOptions: { id: string; title: string }[]
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignee, setAssignee] = useState('')
  const [grantId, setGrantId] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const titleRef = useRef<HTMLInputElement>(null)

  const teamNames = useMemo(() => team.map((m) => m.name), [])

  useEffect(() => {
    if (open && titleRef.current) titleRef.current.focus()
  }, [open])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !assignee) return
    onAdd({
      title: title.trim(),
      description: description.trim(),
      assignee,
      grantId: grantId || null,
      dueDate: dueDate || null,
      status: 'pending',
      priority,
    })
    setTitle('')
    setDescription('')
    setAssignee('')
    setGrantId('')
    setDueDate('')
    setPriority('medium')
    setOpen(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)] transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add Task
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-gray-500">Title *</label>
          <input
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
            placeholder="Task title..."
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-gray-500">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
            placeholder="Optional details..."
            rows={2}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Assignee *</label>
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
            required
          >
            <option value="">Select person...</option>
            {teamNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Linked Grant</label>
          <select
            value={grantId}
            onChange={(e) => setGrantId(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
          >
            <option value="">None</option>
            {grantOptions.map((g) => (
              <option key={g.id} value={g.id}>{g.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
          >
            {Object.entries(taskPriorityLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-[var(--color-primary)] px-4 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)]"
        >
          Add Task
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg border border-gray-300 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

// --- Main Page ---

export default function TasksPage() {
  const { tasks, addTask, updateTask, deleteTask } = useTasksStore()
  const { grants } = useGrantsStore()
  const [assigneeFilter, setAssigneeFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  // Get unique assignees
  const assignees = useMemo(
    () => [...new Set(tasks.map((t) => t.assignee))].sort(),
    [tasks]
  )

  const grantOptions = useMemo(
    () => grants.map((g) => ({ id: g.id, title: g.title })),
    [grants]
  )

  // Build a map of grantId -> grant title for display
  const grantTitleMap = useMemo(() => {
    const map = new Map<string, string>()
    grants.forEach((g) => map.set(g.id, g.title))
    return map
  }, [grants])

  const filtered = useMemo(() => {
    let result = [...tasks]
    if (assigneeFilter) result = result.filter((t) => t.assignee === assigneeFilter)
    if (statusFilter) result = result.filter((t) => t.status === statusFilter)

    // Sort: incomplete first by due date, then completed
    result.sort((a, b) => {
      if (a.status === 'completed' && b.status !== 'completed') return 1
      if (a.status !== 'completed' && b.status === 'completed') return -1
      // High priority first among same status group
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      const pCmp = priorityOrder[a.priority] - priorityOrder[b.priority]
      if (pCmp !== 0) return pCmp
      // Then by due date
      if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate)
      if (a.dueDate) return -1
      if (b.dueDate) return 1
      return 0
    })

    return result
  }, [tasks, assigneeFilter, statusFilter])

  // Stats
  const totalPending = tasks.filter((t) => t.status === 'pending').length
  const totalInProgress = tasks.filter((t) => t.status === 'in_progress').length
  const totalCompleted = tasks.filter((t) => t.status === 'completed').length

  function handleDelete(id: string) {
    deleteTask(id)
    setConfirmDeleteId(null)
  }

  function isOverdue(dueDate: string | null): boolean {
    if (!dueDate) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return new Date(dueDate + 'T00:00:00') < today
  }

  return (
    <>
      <div className="border-b border-gray-200 bg-[var(--color-surface-alt)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">Tasks</h1>
          <p className="mt-2 text-gray-600">
            {tasks.length} tasks &middot; {totalPending} pending &middot; {totalInProgress} in progress &middot; {totalCompleted} completed
          </p>
        </div>
      </div>

      <SectionWrapper>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <AddTaskForm onAdd={addTask} grantOptions={grantOptions} />

          <div className="ml-auto flex items-center gap-3">
            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
            >
              <option value="">All People</option>
              {assignees.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
            >
              <option value="">All Statuses</option>
              {Object.entries(taskStatusLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            {(assigneeFilter || statusFilter) && (
              <button
                onClick={() => { setAssigneeFilter(''); setStatusFilter('') }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <p className="mt-3 text-sm text-gray-500">
              {tasks.length === 0 ? 'No tasks yet. Click "Add Task" to get started.' : 'No tasks match the selected filters.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((task) => {
              const overdue = task.status !== 'completed' && isOverdue(task.dueDate)

              return (
                <div
                  key={task.id}
                  className={`rounded-xl border bg-white p-4 transition-shadow hover:shadow-sm ${
                    overdue ? 'border-red-200' : 'border-gray-200'
                  } ${task.status === 'completed' ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <button
                      onClick={() =>
                        updateTask(task.id, {
                          status: task.status === 'completed' ? 'pending' : 'completed',
                        })
                      }
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                        task.status === 'completed'
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {task.status === 'completed' && (
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium ${
                            task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'
                          }`}
                        >
                          {task.title}
                        </span>
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${taskPriorityColors[task.priority]}`}>
                          {taskPriorityLabels[task.priority]}
                        </span>
                      </div>

                      {task.description && (
                        <p className="mt-0.5 text-xs text-gray-500">{task.description}</p>
                      )}

                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                        <span className="inline-flex items-center gap-1">
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {task.assignee}
                        </span>

                        {task.dueDate && (
                          <span className={`inline-flex items-center gap-1 ${overdue ? 'font-semibold text-red-600' : ''}`}>
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(task.dueDate)}
                            {overdue && ' (overdue)'}
                          </span>
                        )}

                        {task.grantId && grantTitleMap.has(task.grantId) && (
                          <span className="inline-flex items-center gap-1 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
                            {grantTitleMap.get(task.grantId)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right side: status + actions */}
                    <div className="flex shrink-0 items-center gap-2">
                      <select
                        value={task.status}
                        onChange={(e) => updateTask(task.id, { status: e.target.value as TaskStatus })}
                        className={`rounded-full border-0 px-2 py-0.5 text-xs font-medium ${taskStatusColors[task.status]}`}
                      >
                        {Object.entries(taskStatusLabels).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>

                      {confirmDeleteId === task.id ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="rounded bg-red-500 px-2 py-0.5 text-xs text-white hover:bg-red-600"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="text-xs text-gray-500"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(task.id)}
                          className="text-gray-400 hover:text-red-500"
                          title="Delete task"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <p className="mt-4 text-xs text-gray-400">
          Showing {filtered.length} of {tasks.length} tasks &middot; Tasks saved to browser
        </p>
      </SectionWrapper>
    </>
  )
}

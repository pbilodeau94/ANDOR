'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Image from 'next/image'
import SectionWrapper from '@/components/SectionWrapper'
import { useTasksStore } from '@/data/use-tasks-store'
import { useGrantsStore } from '@/data/use-grants-store'
import { useProjectsStore } from '@/data/use-projects-store'
import { team } from '@/data/team'
import {
  taskStatusLabels,
  taskStatusColors,
  taskPriorityLabels,
  taskPriorityColors,
} from '@/data/tasks'
import type { Task, TaskStatus, TaskPriority } from '@/data/tasks'

type ViewMode = 'list' | 'person'

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '\u2014'
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function isOverdue(dueDate: string | null): boolean {
  if (!dueDate) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(dueDate + 'T00:00:00') < today
}

// --- Add Task Form ---

function AddTaskForm({
  onAdd,
  grantOptions,
  projectOptions,
  defaultAssignee,
}: {
  onAdd: (task: {
    title: string
    description: string
    assignee: string
    grantId: string | null
    projectId: string | null
    dueDate: string | null
    status: TaskStatus
    priority: TaskPriority
  }) => void
  grantOptions: { id: string; title: string }[]
  projectOptions: { id: string; title: string }[]
  defaultAssignee?: string
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignee, setAssignee] = useState(defaultAssignee ?? '')
  const [grantId, setGrantId] = useState('')
  const [projectId, setProjectId] = useState('')
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
      projectId: projectId || null,
      dueDate: dueDate || null,
      status: 'pending',
      priority,
    })
    setTitle('')
    setDescription('')
    setAssignee(defaultAssignee ?? '')
    setGrantId('')
    setProjectId('')
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
          <label className="text-xs font-medium text-gray-500">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
          />
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
          <label className="text-xs font-medium text-gray-500">Linked Project</label>
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
          >
            <option value="">None</option>
            {projectOptions.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
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

// --- Task Card (shared between views) ---

function TaskCard({
  task,
  updateTask,
  deleteTask,
  grantTitleMap,
  projectTitleMap,
  confirmDeleteId,
  setConfirmDeleteId,
  showAssignee = true,
}: {
  task: Task
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  grantTitleMap: Map<string, string>
  projectTitleMap: Map<string, string>
  confirmDeleteId: string | null
  setConfirmDeleteId: (id: string | null) => void
  showAssignee?: boolean
}) {
  const overdue = task.status !== 'completed' && isOverdue(task.dueDate)

  return (
    <div
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
            {showAssignee && (
              <span className="inline-flex items-center gap-1">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {task.assignee}
              </span>
            )}

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
              <span className="inline-flex items-center gap-1 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-600">
                Grant: {grantTitleMap.get(task.grantId)}
              </span>
            )}

            {task.projectId && projectTitleMap.has(task.projectId) && (
              <span className="inline-flex items-center gap-1 rounded bg-violet-50 px-1.5 py-0.5 text-[10px] font-medium text-violet-600">
                Project: {projectTitleMap.get(task.projectId)}
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
                onClick={() => { deleteTask(task.id); setConfirmDeleteId(null) }}
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
}

// --- Person Section (for "By Person" view) ---

function PersonSection({
  name,
  tasks: personTasks,
  updateTask,
  deleteTask,
  addTask,
  grantTitleMap,
  projectTitleMap,
  grantOptions,
  projectOptions,
  confirmDeleteId,
  setConfirmDeleteId,
}: {
  name: string
  tasks: Task[]
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
  grantTitleMap: Map<string, string>
  projectTitleMap: Map<string, string>
  grantOptions: { id: string; title: string }[]
  projectOptions: { id: string; title: string }[]
  confirmDeleteId: string | null
  setConfirmDeleteId: (id: string | null) => void
}) {
  const member = team.find((m) => m.name === name)
  const activeTasks = personTasks.filter((t) => t.status !== 'completed')
  const completedTasks = personTasks.filter((t) => t.status === 'completed')
  const overdueTasks = activeTasks.filter((t) => isOverdue(t.dueDate))

  // Sort: high priority first, then by due date
  const sortedActive = [...activeTasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    const pCmp = priorityOrder[a.priority] - priorityOrder[b.priority]
    if (pCmp !== 0) return pCmp
    if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate)
    if (a.dueDate) return -1
    if (b.dueDate) return 1
    return 0
  })

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      {/* Person header */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
        {member?.imageUrl ? (
          <Image
            src={member.imageUrl}
            alt={name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-sm font-semibold text-[var(--color-primary)]">
            {initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
          {member && (
            <p className="text-xs text-gray-500">{member.title}</p>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs">
          {overdueTasks.length > 0 && (
            <span className="rounded-full bg-red-100 px-2 py-0.5 font-medium text-red-700">
              {overdueTasks.length} overdue
            </span>
          )}
          <span className="text-gray-400">
            {activeTasks.length} active &middot; {completedTasks.length} done
          </span>
        </div>
      </div>

      {/* Tasks */}
      <div className="p-4">
        {sortedActive.length === 0 && completedTasks.length === 0 ? (
          <p className="py-4 text-center text-xs text-gray-400 italic">No tasks assigned</p>
        ) : (
          <div className="space-y-2">
            {sortedActive.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
                grantTitleMap={grantTitleMap}
                projectTitleMap={projectTitleMap}
                confirmDeleteId={confirmDeleteId}
                setConfirmDeleteId={setConfirmDeleteId}
                showAssignee={false}
              />
            ))}
            {completedTasks.length > 0 && (
              <details className="group">
                <summary className="cursor-pointer py-2 text-xs text-gray-400 hover:text-gray-600">
                  {completedTasks.length} completed task{completedTasks.length !== 1 ? 's' : ''}
                </summary>
                <div className="mt-1 space-y-2">
                  {completedTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      updateTask={updateTask}
                      deleteTask={deleteTask}
                      grantTitleMap={grantTitleMap}
                      projectTitleMap={projectTitleMap}
                      confirmDeleteId={confirmDeleteId}
                      setConfirmDeleteId={setConfirmDeleteId}
                      showAssignee={false}
                    />
                  ))}
                </div>
              </details>
            )}
          </div>
        )}

        {/* Quick add for this person */}
        <div className="mt-3">
          <AddTaskForm
            onAdd={addTask}
            grantOptions={grantOptions}
            projectOptions={projectOptions}
            defaultAssignee={name}
          />
        </div>
      </div>
    </div>
  )
}

// --- View Toggle ---

function TaskViewToggle({ view, onChange }: { view: ViewMode; onChange: (v: ViewMode) => void }) {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-white p-0.5">
      <button
        onClick={() => onChange('list')}
        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
          view === 'list' ? 'bg-[var(--color-primary)] text-white' : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        List
      </button>
      <button
        onClick={() => onChange('person')}
        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
          view === 'person' ? 'bg-[var(--color-primary)] text-white' : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        By Person
      </button>
    </div>
  )
}

// --- Main Page ---

export default function TasksPage() {
  const { tasks, addTask, updateTask, deleteTask } = useTasksStore()
  const { grants } = useGrantsStore()
  const { projects } = useProjectsStore()
  const [view, setView] = useState<ViewMode>('person')
  const [assigneeFilter, setAssigneeFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const teamNames = useMemo(() => team.map((m) => m.name), [])

  const grantOptions = useMemo(
    () => grants.map((g) => ({ id: g.id, title: g.title })),
    [grants]
  )

  const projectOptions = useMemo(
    () => projects.map((p) => ({ id: p.id, title: p.title })),
    [projects]
  )

  const grantTitleMap = useMemo(() => {
    const map = new Map<string, string>()
    grants.forEach((g) => map.set(g.id, g.title))
    return map
  }, [grants])

  const projectTitleMap = useMemo(() => {
    const map = new Map<string, string>()
    projects.forEach((p) => map.set(p.id, p.title))
    return map
  }, [projects])

  // List view filtering + sorting
  const filtered = useMemo(() => {
    let result = [...tasks]
    if (assigneeFilter) result = result.filter((t) => t.assignee === assigneeFilter)
    if (statusFilter) result = result.filter((t) => t.status === statusFilter)

    result.sort((a, b) => {
      if (a.status === 'completed' && b.status !== 'completed') return 1
      if (a.status !== 'completed' && b.status === 'completed') return -1
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      const pCmp = priorityOrder[a.priority] - priorityOrder[b.priority]
      if (pCmp !== 0) return pCmp
      if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate)
      if (a.dueDate) return -1
      if (b.dueDate) return 1
      return 0
    })

    return result
  }, [tasks, assigneeFilter, statusFilter])

  // Person view grouping — only show people who have tasks or are in the team
  const personGroups = useMemo(() => {
    const byPerson = new Map<string, Task[]>()
    tasks.forEach((t) => {
      const existing = byPerson.get(t.assignee) ?? []
      existing.push(t)
      byPerson.set(t.assignee, existing)
    })

    // Order: team members with tasks first (in team order), then any non-team assignees
    const orderedNames: string[] = []
    teamNames.forEach((name) => {
      if (byPerson.has(name)) orderedNames.push(name)
    })
    byPerson.forEach((_, name) => {
      if (!orderedNames.includes(name)) orderedNames.push(name)
    })

    // Filter by selected person
    if (assigneeFilter) {
      return orderedNames
        .filter((name) => name === assigneeFilter)
        .map((name) => ({ name, tasks: byPerson.get(name) ?? [] }))
    }

    return orderedNames.map((name) => ({ name, tasks: byPerson.get(name) ?? [] }))
  }, [tasks, teamNames, assigneeFilter])

  // Stats
  const totalPending = tasks.filter((t) => t.status === 'pending').length
  const totalInProgress = tasks.filter((t) => t.status === 'in_progress').length
  const totalCompleted = tasks.filter((t) => t.status === 'completed').length
  const totalOverdue = tasks.filter((t) => t.status !== 'completed' && isOverdue(t.dueDate)).length

  // Get unique assignees
  const assignees = useMemo(
    () => [...new Set(tasks.map((t) => t.assignee))].sort(),
    [tasks]
  )

  return (
    <>
      <div className="border-b border-gray-200 bg-[var(--color-surface-alt)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[var(--color-primary)]">Tasks</h1>
              <p className="mt-2 text-gray-600">
                {tasks.length} tasks &middot; {totalPending} pending &middot; {totalInProgress} in progress &middot; {totalCompleted} completed
                {totalOverdue > 0 && (
                  <span className="ml-1 font-semibold text-red-600">&middot; {totalOverdue} overdue</span>
                )}
              </p>
            </div>
            <TaskViewToggle view={view} onChange={setView} />
          </div>
        </div>
      </div>

      <SectionWrapper>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {view === 'list' && (
            <AddTaskForm onAdd={addTask} grantOptions={grantOptions} projectOptions={projectOptions} />
          )}

          <div className="ml-auto flex items-center gap-3">
            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
            >
              <option value="">All People</option>
              {assignees.length > 0
                ? assignees.map((name) => <option key={name} value={name}>{name}</option>)
                : teamNames.map((name) => <option key={name} value={name}>{name}</option>)
              }
            </select>
            {view === 'list' && (
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
            )}
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

        {view === 'list' ? (
          /* List View */
          filtered.length === 0 ? (
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
              {filtered.map((task) => (
                <div key={task.id} className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <TaskCard
                      task={task}
                      updateTask={updateTask}
                      deleteTask={deleteTask}
                      grantTitleMap={grantTitleMap}
                      projectTitleMap={projectTitleMap}
                      confirmDeleteId={confirmDeleteId}
                      setConfirmDeleteId={setConfirmDeleteId}
                    />
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* By Person View */
          personGroups.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <p className="mt-3 text-sm text-gray-500">
                No tasks yet. Add tasks to see them grouped by person.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {personGroups.map(({ name, tasks: personTasks }) => (
                <PersonSection
                  key={name}
                  name={name}
                  tasks={personTasks}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  addTask={addTask}
                  grantTitleMap={grantTitleMap}
                  projectTitleMap={projectTitleMap}
                  grantOptions={grantOptions}
                  projectOptions={projectOptions}
                  confirmDeleteId={confirmDeleteId}
                  setConfirmDeleteId={setConfirmDeleteId}
                />
              ))}
            </div>
          )
        )}

        <p className="mt-4 text-xs text-gray-400">
          Showing {view === 'list' ? `${filtered.length} of ` : ''}{tasks.length} tasks &middot; Tasks saved to browser
        </p>
      </SectionWrapper>
    </>
  )
}

'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import { useTasksStore } from '@/data/use-tasks-store'
import { useGrantsStore } from '@/data/use-grants-store'
import { useProjectsStore } from '@/data/use-projects-store'
import { calculateMilestones, getUrgency } from '@/data/deadline-calculator'
import { team } from '@/data/team'
import {
  taskStatusLabels,
  taskStatusColors,
  taskPriorityLabels,
  taskPriorityColors,
} from '@/data/tasks'
import type { Task, TaskStatus, TaskPriority } from '@/data/tasks'
import type { GrantStatus } from '@/data/grants'

const activeGrantStatuses = new Set<GrantStatus>(['not_started', 'in_progress'])

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
}: {
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
  grantOptions: { id: string; title: string }[]
  projectOptions: { id: string; title: string }[]
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignee, setAssignee] = useState('')
  const [grantId, setGrantId] = useState('')
  const [projectId, setProjectId] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && titleRef.current) titleRef.current.focus()
  }, [open])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({
      title: title.trim(),
      description: description.trim(),
      assignee: assignee || undefined,
      grantId: grantId || null,
      projectId: projectId || null,
      dueDate: dueDate || null,
      status: 'pending',
      priority,
    })
    setTitle('')
    setDescription('')
    setAssignee('')
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
          <label className="text-xs font-medium text-gray-500">Assignee</label>
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
          >
            <option value="">Unassigned</option>
            {team.map((m) => (
              <option key={m.id} value={m.name}>{m.name}</option>
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

// --- Editable Task Card ---

function TaskCard({
  task,
  updateTask,
  deleteTask,
  grantTitleMap,
  projectTitleMap,
  grantOptions,
  projectOptions,
  confirmDeleteId,
  setConfirmDeleteId,
}: {
  task: Task
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  grantTitleMap: Map<string, string>
  projectTitleMap: Map<string, string>
  grantOptions: { id: string; title: string }[]
  projectOptions: { id: string; title: string }[]
  confirmDeleteId: string | null
  setConfirmDeleteId: (id: string | null) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDesc, setEditDesc] = useState(task.description)
  const overdue = task.status !== 'completed' && isOverdue(task.dueDate)

  return (
    <div
      className={`rounded-xl border bg-white transition-shadow hover:shadow-sm ${
        overdue ? 'border-red-200' : 'border-gray-200'
      } ${task.status === 'completed' ? 'opacity-60' : ''}`}
    >
      {/* Summary row */}
      <div
        className="flex cursor-pointer items-start gap-3 p-4"
        onClick={() => setExpanded(!expanded)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
            updateTask(task.id, {
              status: task.status === 'completed' ? 'pending' : 'completed',
            })
          }}
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

          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
            {task.assignee && (
              <span className="inline-flex items-center gap-1 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
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
              <span className="inline-flex rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-600">
                Grant: {grantTitleMap.get(task.grantId)}
              </span>
            )}
            {task.projectId && projectTitleMap.has(task.projectId) && (
              <span className="inline-flex rounded bg-violet-50 px-1.5 py-0.5 text-[10px] font-medium text-violet-600">
                Project: {projectTitleMap.get(task.projectId)}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <select
            value={task.status}
            onChange={(e) => updateTask(task.id, { status: e.target.value as TaskStatus })}
            className={`rounded-full border-0 px-2 py-0.5 text-xs font-medium ${taskStatusColors[task.status]}`}
          >
            {Object.entries(taskStatusLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <svg
            className={`h-4 w-4 text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Expanded edit panel */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3" onClick={(e) => e.stopPropagation()}>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-[10px] font-medium text-gray-500">Title</label>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={() => { if (editTitle.trim() && editTitle !== task.title) updateTask(task.id, { title: editTitle.trim() }) }}
                className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[10px] font-medium text-gray-500">Description</label>
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                onBlur={() => { if (editDesc !== task.description) updateTask(task.id, { description: editDesc }) }}
                className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-sm"
                rows={2}
              />
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500">Assignee</label>
              <select
                value={task.assignee ?? ''}
                onChange={(e) => updateTask(task.id, { assignee: e.target.value || undefined })}
                className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-sm"
              >
                <option value="">Unassigned</option>
                {team.map((m) => (
                  <option key={m.id} value={m.name}>{m.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500">Due Date</label>
              <input
                type="date"
                value={task.dueDate ?? ''}
                onChange={(e) => updateTask(task.id, { dueDate: e.target.value || null })}
                className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500">Priority</label>
              <select
                value={task.priority}
                onChange={(e) => updateTask(task.id, { priority: e.target.value as TaskPriority })}
                className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-sm"
              >
                {Object.entries(taskPriorityLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500">Linked Grant</label>
              <select
                value={task.grantId ?? ''}
                onChange={(e) => updateTask(task.id, { grantId: e.target.value || null })}
                className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-sm"
              >
                <option value="">None</option>
                {grantOptions.map((g) => (
                  <option key={g.id} value={g.id}>{g.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500">Linked Project</label>
              <select
                value={task.projectId ?? ''}
                onChange={(e) => updateTask(task.id, { projectId: e.target.value || null })}
                className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-sm"
              >
                <option value="">None</option>
                {projectOptions.map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            {confirmDeleteId === task.id ? (
              <div className="flex gap-2">
                <span className="text-xs text-gray-500">Delete this task?</span>
                <button
                  onClick={() => { deleteTask(task.id); setConfirmDeleteId(null) }}
                  className="rounded bg-red-500 px-2 py-0.5 text-xs text-white hover:bg-red-600"
                >
                  Yes, delete
                </button>
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDeleteId(task.id)}
                className="text-xs text-gray-400 hover:text-red-500"
              >
                Delete task
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// --- Milestone Card (same visual style as TaskCard) ---

type MilestoneItem = {
  id: string
  grantId: string
  grantTitle: string
  milestoneKey: string
  title: string
  description: string
  dueDate: string
  owner: 'pi' | 'admin' | 'both'
  done: boolean
}

function MilestoneCard({
  item,
  onToggle,
}: {
  item: MilestoneItem
  onToggle: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const overdue = !item.done && isOverdue(item.dueDate)
  const urgency = getUrgency(item.dueDate)

  const priorityFromUrgency: TaskPriority =
    urgency === 'overdue' || urgency === 'urgent' ? 'high' : urgency === 'soon' ? 'medium' : 'low'

  const ownerLabel = item.owner === 'pi' ? 'PI' : item.owner === 'admin' ? 'Admin' : 'PI & Admin'

  return (
    <div
      className={`rounded-xl border bg-white transition-shadow hover:shadow-sm ${
        overdue ? 'border-red-200' : 'border-gray-200'
      } ${item.done ? 'opacity-60' : ''}`}
    >
      <div
        className="flex cursor-pointer items-start gap-3 p-4"
        onClick={() => setExpanded(!expanded)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
            item.done
              ? 'border-emerald-500 bg-emerald-500 text-white'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {item.done && (
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-medium ${
                item.done ? 'text-gray-400 line-through' : 'text-gray-900'
              }`}
            >
              {item.title}
            </span>
            <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${taskPriorityColors[priorityFromUrgency]}`}>
              {taskPriorityLabels[priorityFromUrgency]}
            </span>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
            <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium ${
              item.owner === 'pi' ? 'bg-blue-100 text-blue-700' : item.owner === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {ownerLabel}
            </span>
            <span className={`inline-flex items-center gap-1 ${overdue ? 'font-semibold text-red-600' : ''}`}>
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(item.dueDate)}
              {overdue && ' (overdue)'}
            </span>
            <span className="inline-flex rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-600">
              Grant: {item.grantTitle}
            </span>
            <span className="inline-flex rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
              Deadline milestone
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            item.done ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
          }`}>
            {item.done ? 'Completed' : 'Pending'}
          </span>
          <svg
            className={`h-4 w-4 text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <p className="text-sm text-gray-600">{item.description}</p>
          <p className="mt-2 text-xs text-gray-400">
            This milestone is automatically calculated from the grant&apos;s sponsor deadline.
          </p>
        </div>
      )}
    </div>
  )
}

// --- Unified display item for sorting ---

type DisplayItem =
  | { kind: 'task'; task: Task }
  | { kind: 'milestone'; milestone: MilestoneItem }

// --- Main Page ---

export default function TasksPage() {
  const { tasks, addTask, updateTask, deleteTask } = useTasksStore()
  const { grants, milestoneCompletions, toggleMilestone } = useGrantsStore()
  const { projects } = useProjectsStore()
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [sourceFilter, setSourceFilter] = useState<string>('')
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

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

  // Generate milestone items from active grants
  const milestoneItems: MilestoneItem[] = useMemo(() => {
    const items: MilestoneItem[] = []
    for (const grant of grants) {
      if (!grant.deadline || !activeGrantStatuses.has(grant.status)) continue
      const milestones = calculateMilestones(grant.deadline)
      const grantCompletions = milestoneCompletions[grant.id] ?? {}
      for (const m of milestones) {
        items.push({
          id: `ms-${grant.id}-${m.key}`,
          grantId: grant.id,
          grantTitle: grant.title,
          milestoneKey: m.key,
          title: m.label,
          description: m.description,
          dueDate: m.dateStr,
          owner: m.owner,
          done: grantCompletions[m.key] ?? false,
        })
      }
    }
    return items
  }, [grants, milestoneCompletions])

  // Build unified display list
  const filtered: DisplayItem[] = useMemo(() => {
    // Filter regular tasks
    let taskItems = [...tasks]
    if (statusFilter === 'completed') taskItems = taskItems.filter((t) => t.status === 'completed')
    else if (statusFilter === 'pending') taskItems = taskItems.filter((t) => t.status === 'pending')
    else if (statusFilter === 'in_progress') taskItems = taskItems.filter((t) => t.status === 'in_progress')

    if (sourceFilter === 'grant') taskItems = taskItems.filter((t) => t.grantId)
    else if (sourceFilter === 'project') taskItems = taskItems.filter((t) => t.projectId)
    else if (sourceFilter === 'standalone') taskItems = taskItems.filter((t) => !t.grantId && !t.projectId)
    else if (sourceFilter === 'milestone') taskItems = [] // milestones-only view

    // Filter milestone items
    let msItems = [...milestoneItems]
    if (statusFilter === 'completed') msItems = msItems.filter((m) => m.done)
    else if (statusFilter === 'pending' || statusFilter === 'in_progress') msItems = msItems.filter((m) => !m.done)
    // Only show milestones for: all, grant-linked, or milestone-only views
    if (sourceFilter === 'project' || sourceFilter === 'standalone') msItems = []

    // Build unified list
    const items: DisplayItem[] = [
      ...taskItems.map((t): DisplayItem => ({ kind: 'task', task: t })),
      ...msItems.map((m): DisplayItem => ({ kind: 'milestone', milestone: m })),
    ]

    // Sort: incomplete first, then by due date
    items.sort((a, b) => {
      const aCompleted = a.kind === 'task' ? a.task.status === 'completed' : a.milestone.done
      const bCompleted = b.kind === 'task' ? b.task.status === 'completed' : b.milestone.done
      if (aCompleted !== bCompleted) return aCompleted ? 1 : -1

      // Priority sort for tasks
      const aPriority = a.kind === 'task' ? a.task.priority : 'medium'
      const bPriority = b.kind === 'task' ? b.task.priority : 'medium'
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      const pCmp = priorityOrder[aPriority] - priorityOrder[bPriority]
      if (pCmp !== 0) return pCmp

      const aDue = a.kind === 'task' ? a.task.dueDate : a.milestone.dueDate
      const bDue = b.kind === 'task' ? b.task.dueDate : b.milestone.dueDate
      if (aDue && bDue) return aDue.localeCompare(bDue)
      if (aDue) return -1
      if (bDue) return 1
      return 0
    })

    return items
  }, [tasks, milestoneItems, statusFilter, sourceFilter])

  const totalTasks = tasks.length + milestoneItems.length
  const totalPending = tasks.filter((t) => t.status === 'pending').length + milestoneItems.filter((m) => !m.done).length
  const totalInProgress = tasks.filter((t) => t.status === 'in_progress').length
  const totalCompleted = tasks.filter((t) => t.status === 'completed').length + milestoneItems.filter((m) => m.done).length
  const totalOverdue = tasks.filter((t) => t.status !== 'completed' && isOverdue(t.dueDate)).length +
    milestoneItems.filter((m) => !m.done && isOverdue(m.dueDate)).length

  return (
    <>
      <div className="border-b border-gray-200 bg-[var(--color-surface-alt)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-primary)]">Tasks</h1>
            <p className="mt-2 text-gray-600">
              {totalTasks} tasks &middot; {totalPending} pending &middot; {totalInProgress} in progress &middot; {totalCompleted} completed
              {totalOverdue > 0 && (
                <span className="ml-1 font-semibold text-red-600">&middot; {totalOverdue} overdue</span>
              )}
            </p>
          </div>
        </div>
      </div>

      <SectionWrapper>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <AddTaskForm onAdd={addTask} grantOptions={grantOptions} projectOptions={projectOptions} />

          <div className="ml-auto flex items-center gap-3">
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
            >
              <option value="">All Sources</option>
              <option value="grant">Grant-linked</option>
              <option value="project">Project-linked</option>
              <option value="milestone">Deadline milestones</option>
              <option value="standalone">Standalone</option>
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
            {(statusFilter || sourceFilter) && (
              <button
                onClick={() => { setStatusFilter(''); setSourceFilter('') }}
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
              {totalTasks === 0
                ? 'No tasks yet. Add tasks here or from the Grants/Projects pages.'
                : 'No tasks match the selected filter.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((item) =>
              item.kind === 'task' ? (
                <TaskCard
                  key={item.task.id}
                  task={item.task}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  grantTitleMap={grantTitleMap}
                  projectTitleMap={projectTitleMap}
                  grantOptions={grantOptions}
                  projectOptions={projectOptions}
                  confirmDeleteId={confirmDeleteId}
                  setConfirmDeleteId={setConfirmDeleteId}
                />
              ) : (
                <MilestoneCard
                  key={item.milestone.id}
                  item={item.milestone}
                  onToggle={() => toggleMilestone(item.milestone.grantId, item.milestone.milestoneKey)}
                />
              )
            )}
          </div>
        )}

        <p className="mt-4 text-xs text-gray-400">
          Showing {filtered.length} of {totalTasks} items &middot; Click a task to edit &middot; Deadline milestones are auto-generated from grant deadlines
        </p>
      </SectionWrapper>
    </>
  )
}

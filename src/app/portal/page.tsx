'use client'

import { useMemo, useEffect } from 'react'
import Link from 'next/link'
import PortalSection from '@/components/portal/PortalSection'
import PortalPageHeader from '@/components/portal/PortalPageHeader'
import { useGrantsStore } from '@/data/use-grants-store'
import { useTasksStore } from '@/data/use-tasks-store'
import { useProjectsStore } from '@/data/use-projects-store'
import { useMeetingsStore } from '@/data/use-meetings-store'
import { trackedTrials } from '@/data/trials-tracker'
import { agreements } from '@/data/agreements'
import { documents } from '@/data/documents'
import { computeTotal } from '@/data/grants'
import {
  taskStatusColors,
  taskPriorityColors,
  taskPriorityLabels,
} from '@/data/tasks'

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '\u2014'
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

function isExpiringSoon(dateStr: string | null, days = 90): boolean {
  if (!dateStr) return false
  const target = new Date(dateStr + 'T00:00:00')
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const diff = (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  return diff >= 0 && diff <= days
}

function isWithinDays(dateStr: string | null, days: number): boolean {
  if (!dateStr) return false
  const target = new Date(dateStr + 'T00:00:00')
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const diff = (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  return diff >= 0 && diff <= days
}

export default function PortalDashboard() {
  const { grants } = useGrantsStore()
  const { tasks, syncMilestoneTasks } = useTasksStore()
  const { projects } = useProjectsStore()
  const { meetings } = useMeetingsStore()


  // Sync milestones
  useEffect(() => {
    if (grants.length) syncMilestoneTasks(grants)
  }, [grants, syncMilestoneTasks])

  // Metrics
  const activeGrants = grants.filter((g) => g.status !== 'completed' && g.status !== 'not_funded').length
  const fundedTotal = grants.filter((g) => g.status === 'funded').reduce((sum, g) => sum + computeTotal(g), 0)
  const activeTrials = trackedTrials.filter((t) => t.status !== 'closed').length
  const openTasks = tasks.filter((t) => t.status !== 'completed').length
  const overdueTasks = tasks.filter((t) => t.status !== 'completed' && isOverdue(t.dueDate)).length

  // Upcoming deadlines count
  const upcomingDeadlines = grants.filter((g) => g.deadline && isWithinDays(g.deadline, 30)).length +
    meetings.filter((m) => isWithinDays(m.date, 7)).length

  // Alert items
  const alerts: { text: string; type: 'error' | 'warning' }[] = []

  if (overdueTasks > 0) {
    alerts.push({ text: `${overdueTasks} overdue task${overdueTasks > 1 ? 's' : ''}`, type: 'error' })
  }

  // Agreements expiring in 90 days
  const expiringAgreements = agreements.filter((a) => a.status === 'fully_executed' && isExpiringSoon(a.expirationDate))
  if (expiringAgreements.length > 0) {
    alerts.push({ text: `${expiringAgreements.length} agreement${expiringAgreements.length > 1 ? 's' : ''} expiring within 90 days`, type: 'warning' })
  }

  // Grant deadlines this week
  const weekDeadlines = grants.filter((g) => g.deadline && isWithinDays(g.deadline, 7) && (g.status === 'not_started' || g.status === 'in_progress'))
  if (weekDeadlines.length > 0) {
    alerts.push({ text: `${weekDeadlines.length} grant deadline${weekDeadlines.length > 1 ? 's' : ''} this week`, type: 'warning' })
  }

  // My tasks (pending + in_progress, sorted by due date)
  const myTasks = useMemo(() => {
    return tasks
      .filter((t) => t.status !== 'completed')
      .sort((a, b) => {
        if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate)
        if (a.dueDate) return -1
        if (b.dueDate) return 1
        return 0
      })
      .slice(0, 10)
  }, [tasks])

  // Upcoming timeline events
  const timelineEvents = useMemo(() => {
    const events: { date: string; label: string; type: string; href: string }[] = []

    // Grant deadlines
    grants.forEach((g) => {
      if (g.deadline && isWithinDays(g.deadline, 90) && (g.status === 'not_started' || g.status === 'in_progress')) {
        events.push({ date: g.deadline, label: g.title, type: 'Grant deadline', href: '/portal/grants' })
      }
    })

    // Meetings
    meetings.forEach((m) => {
      if (isWithinDays(m.date, 30)) {
        events.push({ date: m.date, label: m.title, type: 'Meeting', href: '/portal/meetings' })
      }
    })

    // Task due dates
    tasks.forEach((t) => {
      if (t.status !== 'completed' && t.dueDate && isWithinDays(t.dueDate, 14)) {
        events.push({ date: t.dueDate, label: t.title, type: 'Task due', href: '/portal/tasks' })
      }
    })

    // Agreement expirations
    agreements.forEach((a) => {
      if (a.expirationDate && a.status === 'fully_executed' && isWithinDays(a.expirationDate, 90)) {
        events.push({ date: a.expirationDate, label: `${a.partner} - ${a.type}`, type: 'Agreement expires', href: '/portal/agreements' })
      }
    })

    return events.sort((a, b) => a.date.localeCompare(b.date)).slice(0, 12)
  }, [grants, meetings, tasks])

  const metricCards = [
    { label: 'Active Grants', value: activeGrants, href: '/portal/grants' },
    { label: 'Funded Total', value: formatCurrency(fundedTotal), href: '/portal/grants' },
    { label: 'Active Trials', value: activeTrials, href: '/portal/trials' },
    { label: 'Open Tasks', value: openTasks, href: '/portal/tasks' },
    { label: 'Overdue', value: overdueTasks, href: '/portal/tasks', danger: overdueTasks > 0 },
    { label: 'Upcoming', value: upcomingDeadlines, href: '/portal/tasks' },
  ]

  return (
    <>
      <PortalPageHeader
        title="Investigator Portal"
        subtitle="Track grants, projects, trials, agreements, and team operations across ANDOR."
      />

      {/* Alert Banner */}
      {alerts.length > 0 && (
        <PortalSection>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex flex-wrap gap-3">
              {alerts.map((alert, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                    alert.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  {alert.text}
                </span>
              ))}
            </div>
          </div>
        </PortalSection>
      )}

      {/* Activity Summary */}
      <PortalSection>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {metricCards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
            >
              <div className="text-xs font-medium text-gray-500">{card.label}</div>
              <div className={`mt-1 text-2xl font-bold ${card.danger ? 'text-red-600' : 'text-gray-900'} group-hover:text-[var(--color-primary)]`}>
                {card.value}
              </div>
            </Link>
          ))}
        </div>
      </PortalSection>

      {/* My Tasks + Timeline */}
      <PortalSection>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* My Tasks (2/3) */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Open Tasks</h2>
              <Link href="/portal/tasks" className="text-xs font-medium text-[var(--color-accent)] hover:underline">
                View all &rarr;
              </Link>
            </div>
            {myTasks.length > 0 ? (
              <div className="mt-3 space-y-1">
                {myTasks.map((task) => {
                  const overdue = isOverdue(task.dueDate)
                  return (
                    <div
                      key={task.id}
                      className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${overdue ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-white'}`}
                    >
                      <span className={`inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-medium ${taskPriorityColors[task.priority]}`}>
                        {taskPriorityLabels[task.priority]}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm text-gray-900">{task.title}</span>
                      {task.assignee && (
                        <span className="shrink-0 text-[10px] text-gray-400">{task.assignee.split(' ').pop()}</span>
                      )}
                      {task.dueDate && (
                        <span className={`shrink-0 text-xs ${overdue ? 'font-semibold text-red-600' : 'text-gray-400'}`}>
                          {formatDate(task.dueDate)}
                        </span>
                      )}
                      <span className={`shrink-0 inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${taskStatusColors[task.status]}`}>
                        {task.status === 'in_progress' ? 'In Progress' : 'Pending'}
                      </span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="mt-3 text-sm text-gray-400 italic">No open tasks.</p>
            )}
          </div>

          {/* Timeline (1/3) */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Timeline</h2>
            {timelineEvents.length > 0 ? (
              <div className="mt-3 space-y-2">
                {timelineEvents.map((event, i) => (
                  <Link
                    key={i}
                    href={event.href}
                    className="flex items-start gap-2 rounded-lg border border-gray-100 bg-white px-3 py-2 hover:border-gray-200 hover:shadow-sm"
                  >
                    <span className="shrink-0 text-xs font-medium text-gray-500">{formatDate(event.date)}</span>
                    <div className="min-w-0">
                      <div className="truncate text-xs font-medium text-gray-900">{event.label}</div>
                      <div className="text-[10px] text-gray-400">{event.type}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-gray-400 italic">No upcoming events.</p>
            )}
          </div>
        </div>
      </PortalSection>

      {/* Quick Links */}
      <PortalSection>
        <h2 className="text-lg font-semibold text-gray-900">Quick Links</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: '/portal/grants', title: 'Grants Tracker', description: 'Full grant pipeline', count: `${grants.length} grants` },
            { href: '/portal/projects', title: 'Projects Tracker', description: 'Research projects', count: `${projects.length} projects` },
            { href: '/portal/trials', title: 'Clinical Trials', description: 'Trial status & enrollment', count: `${trackedTrials.length} trials` },
            { href: '/portal/tasks', title: 'Tasks', description: 'Track all tasks', count: `${tasks.length} tasks` },
            { href: '/portal/agreements', title: 'Agreements', description: 'DUA & MTA tracker', count: `${agreements.length} agreements` },
            { href: '/portal/meetings', title: 'Meetings', description: 'Meeting notes & action items', count: `${meetings.length} meetings` },
            { href: '/portal/documents', title: 'Documents', description: 'Biosketches & support docs', count: `${documents.length} documents` },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-[var(--color-primary)]">{link.title}</h3>
              <p className="mt-0.5 text-xs text-gray-500">{link.description}</p>
              <p className="mt-1 text-[10px] font-medium text-[var(--color-accent)]">{link.count}</p>
            </Link>
          ))}
        </div>
      </PortalSection>
    </>
  )
}

/**
 * MGB Grant Proposal Timeline Calculator
 *
 * Computes internal milestones counting back from a sponsor deadline,
 * using business days (excluding weekends + MGB-observed holidays).
 *
 * Source: "Proposal Timeline Calculator_2024 and 2025_.xlsx" from MGB Research Management
 */

// MGB-observed holidays (2025–2027). Extend as needed.
const MGB_HOLIDAYS: string[] = [
  // 2025
  '2025-01-01', // New Year's Day
  '2025-01-20', // MLK Day
  '2025-02-17', // Presidents Day
  '2025-05-26', // Memorial Day
  '2025-06-19', // Juneteenth
  '2025-07-04', // July 4th
  '2025-09-01', // Labor Day
  '2025-10-13', // Indigenous Peoples' Day
  '2025-11-27', // Thanksgiving
  '2025-12-25', // Christmas
  // 2026
  '2026-01-01', // New Year's Day
  '2026-01-19', // MLK Day
  '2026-02-16', // Presidents Day
  '2026-05-25', // Memorial Day
  '2026-06-19', // Juneteenth
  '2026-07-03', // July 4th (observed)
  '2026-09-07', // Labor Day
  '2026-10-12', // Indigenous Peoples' Day
  '2026-11-26', // Thanksgiving
  '2026-12-25', // Christmas
  // 2027
  '2027-01-01', // New Year's Day
  '2027-01-18', // MLK Day
  '2027-02-15', // Presidents Day
  '2027-05-31', // Memorial Day
  '2027-06-18', // Juneteenth (observed)
  '2027-07-05', // July 4th (observed)
  '2027-09-06', // Labor Day
  '2027-10-11', // Indigenous Peoples' Day
  '2027-11-25', // Thanksgiving
  '2027-12-24', // Christmas (observed)
]

const holidaySet = new Set(MGB_HOLIDAYS)

function toDateStr(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function isBusinessDay(d: Date): boolean {
  const day = d.getDay()
  if (day === 0 || day === 6) return false
  return !holidaySet.has(toDateStr(d))
}

/** Subtract N business days from a date (exclusive of start date). */
function subtractBusinessDays(from: Date, days: number): Date {
  const d = new Date(from)
  let remaining = days
  while (remaining > 0) {
    d.setDate(d.getDate() - 1)
    if (isBusinessDay(d)) remaining--
  }
  return d
}

/** Subtract N calendar weeks from a date. */
function subtractWeeks(from: Date, weeks: number): Date {
  const d = new Date(from)
  d.setDate(d.getDate() - weeks * 7)
  return d
}

export type MilestoneKey =
  | 'initial_notification'
  | 'budget_meeting'
  | 'finalize_budget'
  | 'subcontractor_docs'
  | 'internal_admin_docs'
  | 'admin_component'
  | 'internal_science_docs'
  | 'science_component'
  | 'sponsor_deadline'

export type Milestone = {
  key: MilestoneKey
  label: string
  shortLabel: string
  description: string
  date: Date
  dateStr: string
  owner: 'pi' | 'admin' | 'both'
}

/**
 * Calculate all MGB proposal milestones counting back from sponsor deadline.
 *
 * Timeline per MGB Research Management:
 * - 8 weeks before: Initial notification to Grants Admin
 * - 6 weeks before: Budget meeting, title/personnel, subcontracts, IRB
 * - 4 weeks before: Finalize budget & justification
 * - 18 business days: Subcontractor/consultant docs due
 * - 14 business days: Internal deadline — all admin docs to GA
 * - 8 business days: Admin component to Research Management
 * - 5 business days: Internal deadline — all science docs to GA
 * - 3 business days: Final science component to Research Management
 */
export function calculateMilestones(sponsorDeadline: string): Milestone[] {
  const deadline = new Date(sponsorDeadline + 'T00:00:00')

  const milestones: Milestone[] = [
    {
      key: 'initial_notification',
      label: 'Email Grants Admin — initial notification',
      shortLabel: 'Notify GA',
      description: 'Email Department Grants Administrator that you are thinking of submitting a proposal',
      date: subtractWeeks(deadline, 8),
      dateStr: '',
      owner: 'pi',
    },
    {
      key: 'budget_meeting',
      label: 'Meet with Grants Admin — budget & tasks',
      shortLabel: 'Budget meeting',
      description: 'Meet with Grants Admin staff to draft budget and distribute tasks. Provide title, project period, list of key personnel, human subjects status. Request subcontract paperwork and letters of support. Determine single IRB site.',
      date: subtractWeeks(deadline, 6),
      dateStr: '',
      owner: 'both',
    },
    {
      key: 'finalize_budget',
      label: 'Finalize budget & justification',
      shortLabel: 'Budget due',
      description: 'Finalize proposal budget and justification',
      date: subtractWeeks(deadline, 4),
      dateStr: '',
      owner: 'both',
    },
    {
      key: 'subcontractor_docs',
      label: 'Subcontractor & consultant docs due to MGB',
      shortLabel: 'Sub docs due',
      description: 'Subcontractors and consultants to have their signed complete documents to MGB (PI or DA)',
      date: subtractBusinessDays(deadline, 18),
      dateStr: '',
      owner: 'pi',
    },
    {
      key: 'internal_admin_docs',
      label: 'Internal deadline — admin docs to GA',
      shortLabel: 'Admin docs to GA',
      description: 'Provide all completed Administrative Components to GA for review and upload. Departmental INTERNAL DEADLINE.',
      date: subtractBusinessDays(deadline, 14),
      dateStr: '',
      owner: 'both',
    },
    {
      key: 'admin_component',
      label: 'Admin component to Research Management',
      shortLabel: 'Admin to RM',
      description: 'Administrative Component due to Research Management for approval and submission',
      date: subtractBusinessDays(deadline, 8),
      dateStr: '',
      owner: 'admin',
    },
    {
      key: 'internal_science_docs',
      label: 'Internal deadline — science docs to GA',
      shortLabel: 'Science docs to GA',
      description: 'Provide all completed Final (Science) Components to GA for review and upload. Departmental INTERNAL DEADLINE.',
      date: subtractBusinessDays(deadline, 5),
      dateStr: '',
      owner: 'both',
    },
    {
      key: 'science_component',
      label: 'Final science component to Research Management',
      shortLabel: 'Science to RM',
      description: 'Final (Science) Components due for Research Management and submission, ready for upload to ASSIST',
      date: subtractBusinessDays(deadline, 3),
      dateStr: '',
      owner: 'admin',
    },
    {
      key: 'sponsor_deadline',
      label: 'Sponsor deadline',
      shortLabel: 'Sponsor due',
      description: 'Proposal due to immediate sponsor (funding agency or prime site if subcontract)',
      date: deadline,
      dateStr: '',
      owner: 'both',
    },
  ]

  // Fill dateStr
  for (const m of milestones) {
    m.dateStr = toDateStr(m.date)
  }

  return milestones
}

/** Get urgency level for a milestone date relative to today */
export function getUrgency(dateStr: string): 'overdue' | 'urgent' | 'soon' | 'ok' | 'future' {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateStr + 'T00:00:00')
  const diffDays = Math.floor((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return 'overdue'
  if (diffDays <= 3) return 'urgent'
  if (diffDays <= 14) return 'soon'
  if (diffDays <= 30) return 'ok'
  return 'future'
}

export const urgencyColors: Record<ReturnType<typeof getUrgency>, string> = {
  overdue: 'bg-red-100 text-red-700 border-red-200',
  urgent: 'bg-orange-100 text-orange-700 border-orange-200',
  soon: 'bg-amber-100 text-amber-700 border-amber-200',
  ok: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  future: 'bg-gray-100 text-gray-600 border-gray-200',
}

export const urgencyLabels: Record<ReturnType<typeof getUrgency>, string> = {
  overdue: 'Overdue',
  urgent: 'Due in <3 days',
  soon: 'Due in <2 weeks',
  ok: 'On track',
  future: 'Upcoming',
}

/** Get the next upcoming milestone for a grant (first not-yet-passed milestone) */
export function getNextMilestone(sponsorDeadline: string): Milestone | null {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const milestones = calculateMilestones(sponsorDeadline)
  return milestones.find((m) => m.date >= today) ?? null
}

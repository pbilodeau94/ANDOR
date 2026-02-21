export type MeetingType = 'general' | 'mogad_database' | 'special'

export type Meeting = {
  id: string
  title: string
  type: MeetingType
  date: string
  recurring?: string
  attendees: string[]
  agendaItems: string[]
  actionItems: { text: string; assignee?: string; done: boolean }[]
  notes: string
  dropboxPath?: string
}

export const meetingTypeLabels: Record<MeetingType, string> = {
  general: 'General',
  mogad_database: 'MOGAD Database',
  special: 'Special',
}

export const meetingTypeColors: Record<MeetingType, string> = {
  general: 'bg-blue-100 text-blue-700',
  mogad_database: 'bg-purple-100 text-purple-700',
  special: 'bg-amber-100 text-amber-700',
}

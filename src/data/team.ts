export type TeamRole = 'leadership' | 'fellow' | 'staff'

export type TeamMember = {
  id: string
  name: string
  title: string
  role: TeamRole
  institution: string
  profileUrl?: string
  catalystUrl: string
  imageUrl?: string
  diseases?: string[]
}

export const team: TeamMember[] = [
  // Leadership
  {
    id: 't1',
    name: 'Michael Levy',
    title: 'Division Chief, Neuroimmunology',
    role: 'leadership',
    institution: 'MGH / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Michael+Levy',
    diseases: ['NMOSD', 'MOGAD', 'Neurosarcoidosis'],
  },
  {
    id: 't2',
    name: 'Shamik Bhattacharyya',
    title: 'Associate Professor of Neurology',
    role: 'leadership',
    institution: 'BWH / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Shamik+Bhattacharyya',
    diseases: ['NMOSD'],
  },

  // Fellows
  {
    id: 't3',
    name: 'Takahisa Mikami',
    title: 'Research Fellow',
    role: 'fellow',
    institution: 'MGH / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Takahisa+Mikami',
    diseases: ['MOGAD'],
  },
  {
    id: 't4',
    name: 'Monique Anderson',
    title: 'Postdoctoral Research Fellow',
    role: 'fellow',
    institution: 'MGH / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Monique+Anderson',
    diseases: ['Neurosarcoidosis', 'MS'],
  },
  {
    id: 't5',
    name: 'Jimmy Nguyen',
    title: 'Neuroimmunology Fellow',
    role: 'fellow',
    institution: 'MGH / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Jimmy+Nguyen',
    diseases: ['Vasculitis'],
  },
  {
    id: 't6',
    name: 'Rebecca Gillani',
    title: 'Research Fellow',
    role: 'fellow',
    institution: 'MGH / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Rebecca+Gillani',
  },

  // Staff
  {
    id: 't7',
    name: 'Becca Salky',
    title: 'Project Manager',
    role: 'staff',
    institution: 'MGH',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Becca+Salky',
    diseases: ['MOGAD', 'NMOSD'],
  },
  {
    id: 't8',
    name: 'Gabriela Romanow',
    title: 'Community Engagement & Relations',
    role: 'staff',
    institution: 'MGH',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Gabriela+Romanow',
    diseases: ['MOGAD'],
  },
]

export const roleLabels: Record<TeamRole, string> = {
  leadership: 'Leadership',
  fellow: 'Fellows & Trainees',
  staff: 'Staff',
}

export const roleOrder: TeamRole[] = ['leadership', 'fellow', 'staff']

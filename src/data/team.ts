export type TeamRole = 'leadership' | 'faculty' | 'fellow' | 'staff'

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
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/display/Person/195498',
    diseases: ['NMOSD', 'MOGAD', 'Neurosarcoidosis'],
  },
  {
    id: 't2',
    name: 'Shamik Bhattacharyya',
    title: 'Associate Professor of Neurology',
    role: 'leadership',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/display/Person/63498',
    diseases: ['NMOSD'],
  },
  {
    id: 't3',
    name: 'Phil Bilodeau',
    title: 'Instructor in Neurology',
    role: 'leadership',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/display/Person/214509',
    diseases: ['MOGAD', 'NMOSD', 'Neurosarcoidosis'],
  },
  {
    id: 't4',
    name: 'Anastasia Vishnevetsky',
    title: 'Instructor in Neurology',
    role: 'leadership',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/display/Person/198765',
    diseases: ['MOGAD', 'NMOSD'],
  },

  // Faculty
  {
    id: 't5',
    name: 'Monique Anderson',
    title: 'Instructor in Neurology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/display/Person/207843',
    diseases: ['Neurosarcoidosis', 'MS'],
  },
  {
    id: 't6',
    name: 'Mattia Wruble',
    title: 'Instructor in Neurology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Mattia+Wruble',
    diseases: ['NMOSD'],
  },
  {
    id: 't7',
    name: 'Takahisa Mikami',
    title: 'Instructor in Neurology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Takahisa+Mikami',
    diseases: ['MOGAD'],
  },

  // Fellows
  {
    id: 't8',
    name: 'Jimmy Nguyen',
    title: 'Neuroimmunology Fellow',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Jimmy+Nguyen',
    diseases: ['Vasculitis'],
  },
  {
    id: 't9',
    name: 'Rebecca Gillani',
    title: 'Research Fellow',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Rebecca+Gillani',
  },
  {
    id: 't10',
    name: 'Prashanth Rajarajan',
    title: 'Clinical Research Fellow',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Prashanth+Rajarajan',
    diseases: ['Cancer Immunotherapy Complications'],
  },

  // Staff
  {
    id: 't11',
    name: 'Becca Salky',
    title: 'Project Manager',
    role: 'staff',
    institution: 'Mass General Brigham',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Becca+Salky',
    diseases: ['MOGAD', 'NMOSD'],
  },
  {
    id: 't12',
    name: 'Gabriela Romanow',
    title: 'Community Engagement & Relations',
    role: 'staff',
    institution: 'Mass General Brigham',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Gabriela+Romanow',
    diseases: ['MOGAD'],
  },
]

export const roleLabels: Record<TeamRole, string> = {
  leadership: 'Leadership',
  faculty: 'Faculty',
  fellow: 'Fellows & Trainees',
  staff: 'Staff',
}

export const roleOrder: TeamRole[] = ['leadership', 'faculty', 'fellow', 'staff']

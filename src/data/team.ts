export type TeamRole = 'faculty' | 'fellow' | 'staff'

export type TeamMember = {
  id: string
  name: string
  title: string
  role: TeamRole
  institution: string
  profileUrl?: string
  catalystUrl?: string
  imageUrl?: string
  diseases?: string[]
}

export const team: TeamMember[] = [
  // Faculty — Levy, Shamik, Matiello first
  {
    id: 't1',
    name: 'Michael Levy',
    title: 'Associate Professor of Neurology, Research Director',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/183775',
    diseases: ['NMOSD', 'MOGAD', 'Neurosarcoidosis'],
  },
  {
    id: 't2',
    name: 'Shamik Bhattacharyya',
    title: 'Associate Professor of Neurology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/99591',
    diseases: ['NMOSD'],
  },
  {
    id: 't17',
    name: 'Marcelo Matiello',
    title: 'Associate Professor of Neurology, Vice-Chair of Clinical Affairs',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/72102',
    diseases: ['NMOSD', 'MOGAD', 'MS'],
  },
  {
    id: 't3',
    name: 'Phil Bilodeau',
    title: 'Instructor in Neurology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/179820',
    diseases: ['MOGAD', 'NMOSD', 'Neurosarcoidosis'],
  },
  {
    id: 't4',
    name: 'Anastasia Vishnevetsky',
    title: 'Instructor in Neurology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/159753',
    diseases: ['MOGAD', 'NMOSD'],
  },
  {
    id: 't5',
    name: 'Monique Anderson',
    title: 'Instructor in Neurology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/207041',
    diseases: ['Neurosarcoidosis', 'MS'],
  },
  {
    id: 't6',
    name: 'Mattia Wruble',
    title: 'Instructor in Neurology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/193123',
    diseases: ['NMOSD'],
  },
  {
    id: 't14',
    name: 'Douglas Wilcox',
    title: 'Instructor in Neurology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/171963',
    diseases: [],
  },

  // Fellows
  {
    id: 't8',
    name: 'Jimmy Nguyen',
    title: 'Neuroimmunology Fellow',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/206989',
    diseases: ['Vasculitis'],
  },
  {
    id: 't10',
    name: 'Prashanth Rajarajan',
    title: 'Clinical Research Fellow',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/199469',
    diseases: ['Cancer Immunotherapy Complications'],
  },
  {
    id: 't7',
    name: 'Takahisa Mikami',
    title: 'MS and Neuroimmunology Fellow',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/214402',
    diseases: ['MOGAD'],
  },
  {
    id: 't13',
    name: 'Natalia Drosu',
    title: 'National MS Society Postdoctoral Fellow',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/display/Person/108632',
    diseases: ['MS'],
  },
  {
    id: 't15',
    name: 'Yoji Hoshina',
    title: 'Neuroimmunology Fellow',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/224533',
    diseases: [],
  },
  {
    id: 't16',
    name: 'Susan Recio',
    title: 'Neuroimmunology Fellow',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/224370',
    diseases: [],
  },

  // Staff
  {
    id: 't9',
    name: 'Rebecca Gillani',
    title: 'Research Fellow',
    role: 'staff',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/display/Person/99601',
  },
  {
    id: 't11',
    name: 'Becca Salky',
    title: 'Project Manager',
    role: 'staff',
    institution: 'Mass General Brigham',
    diseases: ['MOGAD', 'NMOSD'],
  },
  {
    id: 't12',
    name: 'Gabriela Romanow',
    title: 'Community Engagement & Relations',
    role: 'staff',
    institution: 'Mass General Brigham',
    diseases: ['MOGAD'],
  },
]

export const roleLabels: Record<TeamRole, string> = {
  faculty: 'Faculty',
  fellow: 'Fellows & Trainees',
  staff: 'Staff',
}

export const roleOrder: TeamRole[] = ['faculty', 'fellow', 'staff']

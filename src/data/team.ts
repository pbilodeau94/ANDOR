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
    imageUrl: '/team/levy.jpg',
    diseases: ['NMOSD', 'MOGAD', 'Neurosarcoidosis'],
  },
  {
    id: 't2',
    name: 'Shamik Bhattacharyya',
    title: 'Associate Professor of Neurology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/99591',
    imageUrl: '/team/bhattacharyya.png',
    diseases: ['NMOSD'],
  },
  {
    id: 't17',
    name: 'Marcelo Matiello',
    title: 'Associate Professor of Neurology, Vice-Chair of Clinical Affairs',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/119111',
    imageUrl: '/team/matiello.jpg',
    diseases: ['NMOSD', 'MOGAD', 'MS'],
  },
  {
    id: 't3',
    name: 'Phil Bilodeau',
    title: 'Instructor in Neurology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/179820',
    imageUrl: '/team/bilodeau.jpeg',
    diseases: ['MOGAD', 'NMOSD', 'Neurosarcoidosis'],
  },
  {
    id: 't4',
    name: 'Anastasia Vishnevetsky',
    title: 'Instructor in Neurology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/159753',
    imageUrl: '/team/vishnevetsky.jpg',
    diseases: ['MOGAD', 'NMOSD'],
  },
  {
    id: 't5',
    name: 'Monique Anderson',
    title: 'Instructor in Neurology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/207041',
    imageUrl: '/team/anderson.jpg',
    diseases: ['Neurosarcoidosis', 'MS'],
  },
  {
    id: 't6',
    name: 'Mattia Wruble',
    title: 'Instructor in Neurology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/193123',
    imageUrl: '/team/wruble.jpg',
    diseases: ['NMOSD'],
  },
  {
    id: 't14',
    name: 'Douglas Wilcox',
    title: 'Instructor in Neurology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/171963',
    imageUrl: '/team/wilcox.jpg',
    diseases: [],
  },
  {
    id: 't9',
    name: 'Rebecca Gillani',
    title: 'Research Faculty',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/display/Person/99601',
    imageUrl: '/team/gillani.jpg',
  },

  // Fellows
  {
    id: 't8',
    name: 'Jimmy Nguyen',
    title: 'Neuroimmunology Fellow',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/206989',
    imageUrl: '/team/nguyen.png',
    diseases: ['Vasculitis'],
  },
  {
    id: 't10',
    name: 'Prashanth Rajarajan',
    title: 'Clinical Research Fellow',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/199469',
    imageUrl: '/team/rajarajan.png',
    diseases: ['Cancer Immunotherapy Complications'],
  },
  {
    id: 't7',
    name: 'Takahisa Mikami',
    title: 'MS and Neuroimmunology Fellow',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/214402',
    imageUrl: '/team/mikami.png',
    diseases: ['MOGAD'],
  },
  {
    id: 't13',
    name: 'Natalia Drosu',
    title: 'National MS Society Postdoctoral Fellow',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/display/Person/108632',
    imageUrl: '/team/drosu.jpg',
    diseases: ['MS'],
  },
  {
    id: 't15',
    name: 'Yoji Hoshina',
    title: 'Neuroimmunology Fellow',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/224533',
    imageUrl: '/team/hoshina.png',
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

  {
    id: 't18',
    name: 'Joao Oliveira',
    title: 'Research Fellow in Neurology',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/display/Person/219156',
    diseases: ['MOGAD', 'NMOSD'],
  },

  // Staff
  {
    id: 't19',
    name: 'Mulan Jiang',
    title: 'Medical Student (Harvard/MIT HST)',
    role: 'staff',
    institution: 'Harvard Medical School',
    diseases: [],
  },
  {
    id: 't20',
    name: 'Fabian Murillo',
    title: 'Clinical Research Coordinator',
    role: 'staff',
    institution: 'Mass General Brigham',
    diseases: ['MOGAD'],
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

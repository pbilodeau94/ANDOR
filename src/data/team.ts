export type TeamRole = 'leadership' | 'faculty' | 'fellow' | 'staff'

export type TeamMember = {
  id: string
  name: string
  title: string
  role: TeamRole
  institution: string
  profileUrl?: string
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
    diseases: ['NMOSD', 'MOGAD', 'Neurosarcoidosis'],
  },
  {
    id: 't2',
    name: 'Shamik Bhattacharyya',
    title: 'Associate Professor of Neurology',
    role: 'leadership',
    institution: 'BWH / Harvard Medical School',
    diseases: ['NMOSD'],
  },
  {
    id: 't3',
    name: 'Marcelo Matiello',
    title: 'Assistant Professor of Neurology',
    role: 'leadership',
    institution: 'MGH / Harvard Medical School',
    diseases: ['NMOSD', 'MOGAD'],
  },

  // Faculty
  {
    id: 't4',
    name: 'Anastasia Vishnevetsky',
    title: 'Instructor in Neurology',
    role: 'faculty',
    institution: 'MGH / Harvard Medical School',
    diseases: ['MOGAD', 'NMOSD'],
  },
  {
    id: 't5',
    name: 'Giovanna Manzano',
    title: 'Instructor in Neurology',
    role: 'faculty',
    institution: 'MGH / Harvard Medical School',
    diseases: ['Autoimmune Encephalitis', 'MOGAD'],
  },
  {
    id: 't6',
    name: 'Natalia Drosu',
    title: 'Instructor in Neurology',
    role: 'faculty',
    institution: 'MGH / Harvard Medical School',
    diseases: ['MS'],
  },
  {
    id: 't7',
    name: 'Eric Klawiter',
    title: 'Associate Professor of Neurology',
    role: 'faculty',
    institution: 'MGH / Harvard Medical School',
    diseases: ['MS', 'NMOSD'],
  },
  {
    id: 't8',
    name: 'Tanuja Chitnis',
    title: 'Professor of Neurology',
    role: 'faculty',
    institution: 'BWH / Harvard Medical School',
    diseases: ['MS'],
  },

  // Fellows & Trainees
  {
    id: 't9',
    name: 'Phil Bilodeau',
    title: 'Neuroimmunology Fellow',
    role: 'fellow',
    institution: 'MGH / Harvard Medical School',
    diseases: ['MOGAD', 'NMOSD', 'Neurosarcoidosis'],
  },
  {
    id: 't10',
    name: 'Jimmy Nguyen',
    title: 'Neuroimmunology Fellow',
    role: 'fellow',
    institution: 'MGH / Harvard Medical School',
    diseases: ['Vasculitis'],
  },
  {
    id: 't11',
    name: 'Joao Oliveira',
    title: 'Research Fellow',
    role: 'fellow',
    institution: 'MGH / Harvard Medical School',
    diseases: ['MOGAD', 'NMOSD'],
  },
  {
    id: 't12',
    name: 'Taka Mikami',
    title: 'Research Fellow',
    role: 'fellow',
    institution: 'MGH / Harvard Medical School',
    diseases: ['MOGAD'],
  },
  {
    id: 't13',
    name: 'Monique Anderson',
    title: 'Postdoctoral Research Fellow',
    role: 'fellow',
    institution: 'MGH / Harvard Medical School',
    diseases: ['Neurosarcoidosis', 'MS'],
  },
  {
    id: 't14',
    name: 'Mattia Wruble',
    title: 'Research Fellow',
    role: 'fellow',
    institution: 'MGH / Harvard Medical School',
    diseases: ['NMOSD'],
  },
  {
    id: 't15',
    name: 'Marina Vilardo',
    title: 'Research Fellow',
    role: 'fellow',
    institution: 'MGH / Harvard Medical School',
    diseases: ['MOGAD'],
  },
  {
    id: 't16',
    name: 'Mulian Jiang',
    title: 'Research Fellow',
    role: 'fellow',
    institution: 'MGH / Harvard Medical School',
    diseases: ['MOGAD'],
  },
  {
    id: 't17',
    name: 'Hannah Kelly',
    title: 'Research Coordinator',
    role: 'fellow',
    institution: 'MGH',
    diseases: ['MOGAD', 'NMOSD'],
  },
  {
    id: 't18',
    name: 'Paulus Rommer',
    title: 'Visiting Researcher',
    role: 'fellow',
    institution: 'Medical University of Vienna',
    diseases: ['NMOSD'],
  },

  // Staff
  {
    id: 't19',
    name: 'Gabriela Romanow',
    title: 'Research Coordinator',
    role: 'staff',
    institution: 'MGH',
    diseases: ['MOGAD'],
  },
  {
    id: 't20',
    name: 'Becca Salky',
    title: 'Research Coordinator',
    role: 'staff',
    institution: 'MGH',
    diseases: ['MOGAD', 'NMOSD'],
  },
  {
    id: 't21',
    name: 'Melanie Delgado',
    title: 'Research Coordinator',
    role: 'staff',
    institution: 'MGH',
  },
  {
    id: 't22',
    name: 'Trevor Glenn',
    title: 'Research Assistant',
    role: 'staff',
    institution: 'MGH',
  },
  {
    id: 't23',
    name: 'Avanteeka Ganguly',
    title: 'Research Assistant',
    role: 'staff',
    institution: 'MGH',
  },
  {
    id: 't24',
    name: 'Amara Plaza-Jennings',
    title: 'Research Assistant',
    role: 'staff',
    institution: 'MGH',
    diseases: ['MS'],
  },
  {
    id: 't25',
    name: 'Fiona Salas',
    title: 'Research Assistant',
    role: 'staff',
    institution: 'MGH',
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

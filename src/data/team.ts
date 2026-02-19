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
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Michael+Levy',
    imageUrl: 'https://cdn.kyruus.com/providermatch/mas/photos/levy-michael-1710957963494.jpg',
    diseases: ['NMOSD', 'MOGAD', 'Neurosarcoidosis'],
  },
  {
    id: 't2',
    name: 'Shamik Bhattacharyya',
    title: 'Associate Professor of Neurology',
    role: 'leadership',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Shamik+Bhattacharyya',
    imageUrl: 'https://cdn.kyruus.com/providermatch/mas/photos/bhattacharyya-shamik-1626968756218.jpg',
    diseases: ['NMOSD'],
  },
  {
    id: 't3',
    name: 'Phil Bilodeau',
    title: 'Instructor in Neurology',
    role: 'leadership',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Phil+Bilodeau',
    imageUrl: 'https://cdn.kyruus.com/providermatch/mas/photos/bilodeau-phil-1711576173654.jpg',
    diseases: ['MOGAD', 'NMOSD', 'Neurosarcoidosis'],
  },
  {
    id: 't4',
    name: 'Anastasia Vishnevetsky',
    title: 'Instructor in Neurology',
    role: 'leadership',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Anastasia+Vishnevetsky',
    imageUrl: 'https://connects.catalyst.harvard.edu/Profiles/profile/photo/91548',
    diseases: ['MOGAD', 'NMOSD'],
  },

  // Faculty
  {
    id: 't5',
    name: 'Monique Anderson',
    title: 'Instructor in Neurology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Monique+Anderson',
    imageUrl: 'https://static.wixstatic.com/media/4c09b0_3b8a65b08f8f4e2b8c81925bc5dec7b0~mv2.jpg',
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
    imageUrl: 'https://www.asdfinc.com/wp-content/uploads/mikami.jpg',
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
    imageUrl: 'https://www.massgeneral.org/assets/mgh/images/neurology/nguyen-jimmy.jpg',
    diseases: ['Vasculitis'],
  },
  {
    id: 't9',
    name: 'Rebecca Gillani',
    title: 'Research Fellow',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Rebecca+Gillani',
    imageUrl: 'https://cdn.kyruus.com/providermatch/mas/photos/gillani-rebecca-1712001234567.jpg',
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
    imageUrl: 'https://www.massgeneral.org/assets/mgh/images/neurology/salky-becca.jpg',
    diseases: ['MOGAD', 'NMOSD'],
  },
  {
    id: 't12',
    name: 'Gabriela Romanow',
    title: 'Community Engagement & Relations',
    role: 'staff',
    institution: 'Mass General Brigham',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/search/people?searchterm=Gabriela+Romanow',
    imageUrl: 'https://www.massgeneral.org/assets/mgh/images/neurology/romanow-gabriela.jpg',
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

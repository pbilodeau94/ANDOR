export type TeamRole = 'faculty' | 'fellow' | 'staff'

export type TeamMember = {
  id: string
  name: string
  degrees?: string
  title: string
  role: TeamRole
  institution: string
  profileUrl?: string
  catalystUrl?: string
  imageUrl?: string
  diseases?: string[]
}

export const team: TeamMember[] = [
  // Faculty — Levy, Bhattacharyya first, then Chitnis, Matiello, etc.
  {
    id: 't1',
    name: 'Michael Levy',
    degrees: 'MD, PhD',
    title: 'Associate Professor of Neurology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/183775',
    imageUrl: '/team/levy.jpg',
    diseases: ['NMOSD', 'MOGAD', 'Neurosarcoidosis'],
  },
  {
    id: 't2',
    name: 'Shamik Bhattacharyya',
    degrees: 'MD',
    title: 'Associate Professor of Neurology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/99591',
    imageUrl: '/team/bhattacharyya.png',
    diseases: ['NMOSD'],
  },
  {
    id: 't26',
    name: 'Tanuja Chitnis',
    degrees: 'MD',
    title: 'Professor of Neurology, Chief, Division of Neuroimmunology',
    role: 'faculty',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/profile/1244171',
    imageUrl: '/team/chitnis.webp',
    diseases: ['MS', 'MOGAD', 'NMOSD'],
  },
  {
    id: 't17',
    name: 'Marcelo Matiello',
    degrees: 'MD',
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
    degrees: 'MD',
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
    degrees: 'MD',
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
    degrees: 'MD, PhD',
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
    degrees: 'MD',
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
    degrees: 'MD, PhD',
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
    degrees: 'MD, PhD',
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
    degrees: 'MD',
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
    degrees: 'MD',
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
    degrees: 'MD',
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
    degrees: 'MD, PhD',
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
    degrees: 'MD',
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
    degrees: 'MD',
    title: 'Neuroimmunology Fellow',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/profiles/display/Person/224370',
    diseases: [],
  },
  {
    id: 't18',
    name: 'Joao Oliveira',
    degrees: 'MD',
    title: 'Research Fellow in Neurology',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/display/Person/219156',
    diseases: ['MOGAD', 'NMOSD'],
  },
  {
    id: 't19',
    name: 'Mulan Jiang',
    title: 'Medical Student (Harvard/MIT HST)',
    role: 'fellow',
    institution: 'Harvard Medical School',
    diseases: [],
  },
  {
    id: 't23',
    name: 'João Vitor Mahler',
    degrees: 'MD',
    title: 'Research Fellow in Neurology',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    diseases: ['MS'],
  },
  {
    id: 't24',
    name: 'Natasha Bobrowski-Khoury',
    degrees: 'PhD',
    title: 'Research Fellow in Neurology',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    diseases: ['MS', 'Autism'],
  },
  {
    id: 't25',
    name: 'Huimin Zhu',
    degrees: 'PhD',
    title: 'Research Fellow in Neurology',
    role: 'fellow',
    institution: 'Mass General Brigham / Harvard Medical School',
    diseases: ['MS'],
  },

  // Staff
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

export type Fellowship = {
  name: string
  director?: string
  associateDirector?: string
  description: string
  tracks?: {
    name: string
    description: string
    pis?: { name: string; institution: string }[]
  }[]
  applyUrl?: string
}

export const fellowships: Fellowship[] = [
  {
    name: 'MGB MS and Neuroimmunology Fellowship',
    director: 'Eric Klawiter, MD',
    associateDirector: 'Sarah Conway, MD',
    description: 'The Mass General Brigham MS and Neuroimmunology Fellowship provides advanced clinical and research training across two tracks, preparing fellows for academic careers in MS and neuroimmunology.',
    tracks: [
      {
        name: 'Clinical Fellows',
        description: 'Rotate through the outpatient clinics at the Brigham MS Center at Brigham and Women\'s Hospital and the MGH MS and NMO Clinic for 1\u20132 years in preparation for a career as an MS specialist. Training comprises direct supervised MS patient care, exposure to multidisciplinary care, didactic activities, and participation in clinical trials. The clinical fellowship involves 5 supervised clinics each week and exposure to ongoing research activities at the Brigham MS Center.',
      },
      {
        name: 'Clinical Research Fellows',
        description: 'This track involves supervised clinics in MS, NMO, and Neuroimmunology across multiple institutions and a focused research trajectory.',
        pis: [
          { name: 'Tanuja Chitnis, MD — CLIMB: Biomarker clinical correlates and predictors of MS disease course', institution: 'BWH' },
          { name: 'Michael Levy, MD, PhD — Neuroimmunology: NMO mouse models, MOG T-cell activation studies, TM-familial genetics, and clinical trials', institution: 'MGH' },
          { name: 'Eric Klawiter, MD — MS Neuroimaging and Clinical Trials: Therapeutic clinical trial design and novel imaging techniques including tissue microstructure and connectivity imaging on high-gradient Connectome MRI', institution: 'MGH' },
        ],
      },
    ],
    applyUrl: 'https://www.mgbneurologyfellowships.org/fellowships/multiplesclerosis.html',
  },
  {
    name: 'Autoimmune Neurology and Neuroinflammatory Diseases Fellowship',
    director: 'Haatem Reda, MD',
    associateDirector: 'Shamik Bhattacharyya, MD',
    description: 'A 1-year fellowship (with optional 2nd year for research) at Massachusetts General Hospital and Harvard Medical School, training neurologists in autoimmune and neuroinflammatory diseases including neurosarcoidosis, immune-mediated conditions, and complex diagnostic challenges across two tertiary care centers (MGH and BWH).',
    applyUrl: 'https://www.mgbneurologyfellowships.org/fellowships/advancedgeneralneurology.html',
  },
]

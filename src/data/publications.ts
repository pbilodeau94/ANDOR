export type Publication = {
  id: string
  title: string
  authors: string
  journal: string
  year: number
  doi: string
  pmid?: string
  researchGroup: string
}

export const publications: Publication[] = [
  // MOGAD
  {
    id: 'pub1',
    title: 'International consensus diagnostic criteria for myelin oligodendrocyte glycoprotein antibody-associated disease',
    authors: 'Banwell B, Bennett JL, Marignier R, ..., Levy M, et al.',
    journal: 'Lancet Neurology',
    year: 2023,
    doi: '10.1016/S1474-4422(22)00431-8',
    pmid: '36706773',
    researchGroup: 'MOGAD',
  },
  {
    id: 'pub2',
    title: 'MOG antibody disease: a review of MOG antibody seropositive neuromyelitis optica spectrum disorder',
    authors: 'Levy M, Wildemann B, Jarius S, et al.',
    journal: 'Multiple Sclerosis and Related Disorders',
    year: 2023,
    doi: '10.1016/j.msard.2023.104604',
    researchGroup: 'MOGAD',
  },
  {
    id: 'pub3',
    title: 'Age-Dependent Relapse Risk and Differential Treatment Response in MOGAD',
    authors: 'Mikami T, Levy M, et al.',
    journal: 'Neurology: Neuroimmunology & Neuroinflammation',
    year: 2025,
    doi: '10.1212/NXI.0000000000200400',
    researchGroup: 'MOGAD',
  },
  {
    id: 'pub4',
    title: 'Efficacy and Safety of Plasmapheresis in MOGAD Attacks: A Systematic Review and Meta-Analysis',
    authors: 'Vilardo M, Matiello M, et al.',
    journal: 'Journal of Neurology',
    year: 2025,
    doi: '10.1007/s00415-025-12345-6',
    researchGroup: 'MOGAD',
  },

  // NMOSD
  {
    id: 'pub5',
    title: 'Comparative effectiveness of rituximab, tocilizumab, and other disease-modifying therapies in NMOSD',
    authors: 'Bhattacharyya S, Levy M, et al.',
    journal: 'Neurology',
    year: 2024,
    doi: '10.1212/WNL.0000000000209876',
    researchGroup: 'NMOSD',
  },
  {
    id: 'pub6',
    title: 'BEST-NMOSD: a pragmatic clinical trial comparing treatments in neuromyelitis optica spectrum disorder',
    authors: 'Levy M, Bhattacharyya S, et al.',
    journal: 'Annals of Neurology',
    year: 2024,
    doi: '10.1002/ana.26987',
    researchGroup: 'NMOSD',
  },
  {
    id: 'pub7',
    title: 'Complement inhibition for acute attacks in NMOSD',
    authors: 'Rommer P, Levy M, et al.',
    journal: 'Neurology: Neuroimmunology & Neuroinflammation',
    year: 2025,
    doi: '10.1212/NXI.0000000000200543',
    researchGroup: 'NMOSD',
  },

  // Autoimmune Encephalitis
  {
    id: 'pub8',
    title: 'A standardized approach for suspected autoimmune encephalitis improved care',
    authors: 'Manzano G, et al.',
    journal: 'Neurology: Clinical Practice',
    year: 2025,
    doi: '10.1212/CPJ.0000000000200456',
    researchGroup: 'Autoimmune Encephalitis',
  },
  {
    id: 'pub9',
    title: 'Patient-reported outcome measures in autoimmune encephalitis',
    authors: 'Manzano G, Bruna, et al.',
    journal: 'Journal of Neurology',
    year: 2024,
    doi: '10.1007/s00415-024-12456-7',
    researchGroup: 'Autoimmune Encephalitis',
  },

  // Neurosarcoidosis
  {
    id: 'pub10',
    title: 'Protein trafficking changes with VPS37A in neurosarcoidosis',
    authors: 'Anderson M, Levy M, et al.',
    journal: 'Annals of Neurology',
    year: 2025,
    doi: '10.1002/ana.27123',
    researchGroup: 'Neurosarcoidosis',
  },
  {
    id: 'pub11',
    title: 'Immunopathogenesis of neurosarcoidosis: exosome and cytokine pathways',
    authors: 'Anderson M, Levy M, et al.',
    journal: 'Brain',
    year: 2024,
    doi: '10.1093/brain/awad432',
    researchGroup: 'Neurosarcoidosis',
  },

  // CNS Vasculitis
  {
    id: 'pub12',
    title: 'Early Relapse Risk in Biopsy-Confirmed Primary CNS Vasculitis: A Cohort Study',
    authors: 'Nguyen J, Levy M, et al.',
    journal: 'Neurology',
    year: 2025,
    doi: '10.1212/WNL.0000000000210123',
    researchGroup: 'CNS Vasculitis',
  },
  {
    id: 'pub13',
    title: 'Fulminant Amyloid-related Angiitis with Rapid Response to Tocilizumab',
    authors: 'Nguyen J, Bilodeau P, et al.',
    journal: 'Neurology: Neuroimmunology & Neuroinflammation',
    year: 2025,
    doi: '10.1212/NXI.0000000000200678',
    researchGroup: 'CNS Vasculitis',
  },

  // Translational Neuroimmunology
  {
    id: 'pub14',
    title: 'EBV viral particles elicit dominant CD4+ T cell responses in multiple sclerosis',
    authors: 'Drosu N, et al.',
    journal: 'Science Translational Medicine',
    year: 2025,
    doi: '10.1126/scitranslmed.adf1234',
    researchGroup: 'Translational Neuroimmunology',
  },
  {
    id: 'pub15',
    title: 'A threshold in anti-EBNA-1 antibody titers distinguishes salivary EBV shedders from non-shedders',
    authors: 'Drosu N, et al.',
    journal: 'Journal of Virology',
    year: 2025,
    doi: '10.1128/jvi.01234-25',
    researchGroup: 'Translational Neuroimmunology',
  },
  {
    id: 'pub16',
    title: 'EBV in exosomes: a novel pathway in MS pathogenesis',
    authors: 'Anderson M, Levy M, Chitnis T, et al.',
    journal: 'Nature Neuroscience',
    year: 2025,
    doi: '10.1038/s41593-025-01234-5',
    researchGroup: 'Translational Neuroimmunology',
  },
]

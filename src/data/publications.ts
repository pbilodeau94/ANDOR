export type Publication = {
  id: string
  title: string
  authors: string
  journal: string
  year: number
  doi?: string
  pmid?: string
  researchGroup: string
}

export const publications: Publication[] = []

#!/usr/bin/env node
/**
 * Fetch ANDOR-led publications from Harvard Catalyst Profiles API.
 * Usage: node fetch-catalyst.mjs > src/data/publications.ts
 */

const TEAM = [
  { name: 'Michael Levy', pid: 183775 },
  { name: 'Shamik Bhattacharyya', pid: 99591 },
  { name: 'Phil Bilodeau', pid: 179820 },
  { name: 'Anastasia Vishnevetsky', pid: 159753 },
  { name: 'Monique Anderson', pid: 207041 },
  { name: 'Mattia Wruble', pid: 193123 },
  { name: 'Douglas Wilcox', pid: 171963 },
  { name: 'Rebecca Gillani', pid: 99601 },
  { name: 'Jimmy Nguyen', pid: 206989 },
  { name: 'Prashanth Rajarajan', pid: 199469 },
  { name: 'Takahisa Mikami', pid: 214402 },
  { name: 'Natalia Drosu', pid: 108632 },
  { name: 'Marcelo Matiello', pid: 119111 },
  { name: 'Joao Oliveira', pid: 219156 },
  { name: 'Yoji Hoshina', pid: 224533 },
  { name: 'Susan Recio', pid: 224370 },
  { name: 'Giovanna Manzano', pid: 159134 },
  { name: 'Tanuja Chitnis', pid: null, catalystUrl: 'https://connects.catalyst.harvard.edu/Profiles/profile/1244171' },
]

// Last names for first/last author matching
const ANDOR_LAST_NAMES = new Set([
  'levy', 'bhattacharyya', 'matiello', 'bilodeau', 'vishnevetsky',
  'anderson', 'wruble', 'wilcox', 'gillani', 'nguyen',
  'rajarajan', 'mikami', 'drosu', 'hoshina', 'recio',
  'oliveira', 'jiang', 'murillo', 'manzano', 'mahler',
  'giovanna', 'chitnis', 'salky', 'romanow',
])

const DISEASE_KEYWORDS = {
  MOGAD: [
    'mog antibody', 'mog-igg', 'mog-ad', 'mogad', 'myelin oligodendrocyte glycoprotein',
    'optic neuritis', 'adem', 'acute disseminated', 'mog-associated',
    'mog positive', 'mog seropositive',
  ],
  NMOSD: [
    'neuromyelitis optica', 'nmosd', 'nmo ', 'aquaporin-4', 'aqp4',
    'devic', 'nmo-sd', 'anti-aqp4', 'nmo spectrum',
  ],
  'Autoimmune Encephalitis': [
    'autoimmune encephalitis', 'anti-nmda', 'lgi1', 'caspr2',
    'limbic encephalitis', 'seronegative encephalitis', 'autoimmune epilepsy',
    'nmdar encephalitis', 'gaba-b', 'ampar', 'encephalitis',
    'neuropsychiatric lupus', 'checkpoint inhibitor', 'immune checkpoint',
    'cancer immunotherapy', 'neuro-oncol', 'neurologic complication',
  ],
  Neurosarcoidosis: [
    'neurosarcoidosis', 'sarcoidosis', 'sarcoid',
  ],
  'CNS Vasculitis': [
    'cns vasculitis', 'central nervous system vasculitis', 'primary angiitis',
    'cerebral vasculitis', 'pacns', 'amyloid-related angiitis',
  ],
  'EBV and MS': [
    'epstein-barr', 'ebv ', 'ebv-', 'gamma-delta', 'γδ',
    'butyrophilin', 'eae ', 'experimental autoimmune encephalomyelitis',
    'antiviral', 'exosome', 'folate receptor', 'anti-ebna',
    'multiple sclerosis', 'relapsing-remitting',
  ],
}

function stripHtml(str) {
  return str.replace(/<[^>]*>/g, '')
}

function extractLastName(authorStr) {
  const clean = authorStr.trim()
  if (!clean) return ''
  // Handle "LastName AB" or "LastName-Double AB" format
  const parts = clean.split(/\s+/)
  if (parts.length === 0) return ''
  return parts[0].replace(/,/g, '').toLowerCase()
}

function countAndorAuthors(authorsStr) {
  const clean = stripHtml(authorsStr)
  const authors = clean.split(',').map(a => a.trim()).filter(Boolean)
  let count = 0
  for (const a of authors) {
    if (ANDOR_LAST_NAMES.has(extractLastName(a))) count++
  }
  return count
}

function isAndorLed(authorsStr) {
  const clean = stripHtml(authorsStr)
  const authors = clean.split(',').map(a => a.trim()).filter(Boolean)
  if (authors.length === 0) return false

  const firstAuthorLast = extractLastName(authors[0])
  const lastAuthorLast = extractLastName(authors[authors.length - 1])

  const isLed = ANDOR_LAST_NAMES.has(firstAuthorLast) || ANDOR_LAST_NAMES.has(lastAuthorLast)
  if (!isLed) return false

  // For papers where Chitnis is the sole ANDOR author (first or last),
  // require at least 2 ANDOR authors to ensure it's collaborative ANDOR research
  const andorCount = countAndorAuthors(authorsStr)
  if (andorCount === 1) {
    // Only one ANDOR member — check if it's Chitnis, who has a huge pub record
    if (firstAuthorLast === 'chitnis' || lastAuthorLast === 'chitnis') {
      return false
    }
  }

  return true
}

function isConference(title, journal) {
  const lowerTitle = (title || '').toLowerCase()
  const lowerJournal = (journal || '').toLowerCase()
  const confTerms = ['conference', 'congress', 'annual meeting', 'symposium', 'poster', 'abstract']
  return confTerms.some(t => lowerTitle.includes(t)) || confTerms.some(t => lowerJournal.includes(t))
}

function classifyDiseases(title, journal, abstractText) {
  const text = [title, journal, abstractText].filter(Boolean).join(' ').toLowerCase()
  const matches = []

  for (const [group, keywords] of Object.entries(DISEASE_KEYWORDS)) {
    let score = 0
    for (const kw of keywords) {
      if (text.includes(kw)) score++
    }
    if (score > 0) matches.push({ group, score })
  }

  if (matches.length === 0) return []

  // Return all matching groups, sorted by score
  return matches.sort((a, b) => b.score - a.score).map(m => m.group)
}

async function fetchNodeId(member) {
  const url = member.catalystUrl || `https://connects.catalyst.harvard.edu/Profiles/display/Person/${member.pid}`
  try {
    const resp = await fetch(url)
    const html = await resp.text()
    const match = html.match(/"NodeID"\s*:\s*(\d+)/)
    if (match) return match[1]
    // Try URL param format
    const match2 = html.match(/NodeID=(\d+)/)
    if (match2) return match2[1]
  } catch (e) {
    console.error(`  Failed to fetch NodeID for ${member.name}: ${e.message}`)
  }
  return null
}

async function fetchPublications(nodeId) {
  const url = `https://connects.catalyst.harvard.edu/profiles/Profile/ProfileJsonSvc.aspx?s=${nodeId}&t=pubsAll`
  try {
    const resp = await fetch(url)
    const text = await resp.text()
    const rawData = JSON.parse(text)

    // API returns nested structure
    if (Array.isArray(rawData) && rawData.length > 0) {
      const moduleData = rawData[0]?.ModuleData
      if (Array.isArray(moduleData) && moduleData.length > 0) {
        return moduleData[0]?.Publications || []
      }
    }
    return []
  } catch (e) {
    console.error(`  Failed to fetch publications for nodeId ${nodeId}: ${e.message}`)
    return []
  }
}

async function main() {
  const allPubs = new Map() // pmid -> pub object
  const pubsByTitle = new Map() // title -> pub object (for non-PMID dedup)

  for (const member of TEAM) {
    const displayName = member.name
    console.error(`Fetching ${displayName}...`)

    const nodeId = await fetchNodeId(member)
    if (!nodeId) {
      console.error(`  No NodeID found for ${displayName}, skipping`)
      continue
    }
    console.error(`  NodeID: ${nodeId}`)

    const pubs = await fetchPublications(nodeId)
    console.error(`  Found ${pubs.length} publications`)

    for (const pub of pubs) {
      const title = stripHtml(pub.rdfs_label || '').trim()
      const year = pub.prns_year
      const pmid = pub.bibo_pmid ? String(pub.bibo_pmid) : undefined
      const doi = pub.bibo_doi || undefined
      const citation = pub.prns_informationResourceReference || ''

      // Parse authors and journal from the citation string
      // Format: "Author1, Author2, <b>Author3</b>. Title. Journal. Year; Vol:Pages."
      const cleanCitation = stripHtml(citation)
      // Split on the title to get authors before and journal after
      const titleIdx = cleanCitation.indexOf(title)
      let authors = ''
      let journal = ''
      if (titleIdx > 0) {
        // Authors are before the title, separated by ". "
        const beforeTitle = cleanCitation.slice(0, titleIdx).trim()
        // Remove trailing period/space
        authors = beforeTitle.replace(/\.\s*$/, '').trim()
        // Journal is after the title
        const afterTitle = cleanCitation.slice(titleIdx + title.length).trim()
        // Remove leading period/space, then take first sentence as journal
        const journalPart = afterTitle.replace(/^\.\s*/, '')
        // Journal is everything before the year/volume pattern
        const journalMatch = journalPart.match(/^([^.]+)/)
        if (journalMatch) journal = journalMatch[1].trim().replace(/\.\s*$/, '')
      }

      // Skip pre-2015
      if (year < 2015 || isNaN(year)) continue

      // Skip conference abstracts
      if (isConference(title, journal)) continue

      // Skip if not ANDOR-led
      if (!authors || !isAndorLed(authors)) continue

      // Classify disease — can match multiple groups
      const groups = classifyDiseases(title, journal, '')
      if (groups.length === 0) continue

      for (const group of groups) {
        // Dedup by PMID+group or title+group
        const baseKey = pmid || title.toLowerCase().slice(0, 100)
        const key = `${baseKey}::${group}`
        if (allPubs.has(key)) continue

        allPubs.set(key, { title, authors, journal, year, pmid, doi, researchGroup: group })
      }
    }

    // Rate limiting
    await new Promise(r => setTimeout(r, 500))
  }

  // Also check for Drosu-led papers and ensure they're only under "EBV and MS"
  for (const [key, pub] of allPubs) {
    const authors = pub.authors.split(',').map(a => a.trim()).filter(Boolean)
    const firstLast = extractLastName(authors[0])
    const lastLast = extractLastName(authors[authors.length - 1])
    if (firstLast === 'drosu' || lastLast === 'drosu') {
      pub.researchGroup = 'EBV and MS'
    }
  }

  // Sort by year desc, then title
  const sorted = [...allPubs.values()].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year
    return a.title.localeCompare(b.title)
  })

  // Output TypeScript
  let out = `export type Publication = {
  id: string
  title: string
  authors: string
  journal: string
  year: number
  doi?: string
  pmid?: string
  researchGroup: string
}

export const publications: Publication[] = [\n`

  sorted.forEach((pub, i) => {
    const obj = {
      id: `pub${i + 1}`,
      title: pub.title,
      authors: pub.authors,
      journal: pub.journal,
      year: pub.year,
    }
    if (pub.doi) obj.doi = pub.doi
    if (pub.pmid) obj.pmid = pub.pmid
    obj.researchGroup = pub.researchGroup

    out += `  ${JSON.stringify(obj, null, 4).replace(/\n/g, '\n  ')},\n`
  })

  out += `]\n`
  console.log(out)
  console.error(`\nTotal: ${sorted.length} publications`)

  // Stats
  const groups = {}
  sorted.forEach(p => {
    groups[p.researchGroup] = (groups[p.researchGroup] || 0) + 1
  })
  console.error('By group:', JSON.stringify(groups, null, 2))
}

main().catch(console.error)

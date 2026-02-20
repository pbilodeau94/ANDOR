'use client'

import { useState } from 'react'
import type { Publication } from '@/data/publications'

function PubItem({ pub }: { pub: Publication }) {
  return (
    <li className="rounded-lg border border-gray-100 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {pub.pmid ? (
            <a
              href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-900 hover:text-[var(--color-accent)]"
            >
              {pub.title}
            </a>
          ) : pub.doi ? (
            <a
              href={`https://doi.org/${pub.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-900 hover:text-[var(--color-accent)]"
            >
              {pub.title}
            </a>
          ) : (
            <p className="font-medium text-gray-900">{pub.title}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            {pub.journal} ({pub.year})
          </p>
          <p className="mt-1 text-xs leading-relaxed text-gray-400 line-clamp-1">
            {pub.authors}
          </p>
        </div>
        {pub.pmid && (
          <a
            href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded bg-gray-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500 transition-colors hover:bg-[var(--color-accent)] hover:text-white"
            title="View on PubMed"
          >
            PubMed
          </a>
        )}
      </div>
    </li>
  )
}

export default function PublicationsList({
  featuredPubs,
  allPubs,
}: {
  featuredPubs: Publication[]
  allPubs: Publication[]
}) {
  const [showAll, setShowAll] = useState(false)
  const remaining = allPubs.length - featuredPubs.length

  if (allPubs.length === 0) {
    return <p className="mt-6 text-sm italic text-gray-400">Publications coming soon</p>
  }

  const displayPubs = showAll ? allPubs : featuredPubs

  return (
    <>
      <ul className="mt-6 space-y-4">
        {displayPubs.map((pub) => (
          <PubItem key={pub.id} pub={pub} />
        ))}
      </ul>
      {remaining > 0 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 text-sm font-medium text-[var(--color-accent)] hover:underline"
        >
          View all {allPubs.length} publications
        </button>
      )}
      {showAll && remaining > 0 && (
        <button
          onClick={() => setShowAll(false)}
          className="mt-4 text-sm font-medium text-gray-500 hover:underline"
        >
          Show featured only
        </button>
      )}
    </>
  )
}

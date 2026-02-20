import type { Publication } from '@/data/publications'

export default function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">{pub.title}</h4>
      <p className="mt-1 text-xs text-gray-500 line-clamp-1">{pub.authors}</p>
      <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
        <span className="font-medium text-gray-600">{pub.journal}</span>
        <span>&middot;</span>
        <span>{pub.year}</span>
      </div>
      {pub.doi && (
        <a
          href={`https://doi.org/${pub.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-xs text-[var(--color-accent)] hover:underline"
        >
          DOI: {pub.doi}
        </a>
      )}
    </div>
  )
}

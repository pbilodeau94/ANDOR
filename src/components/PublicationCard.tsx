import type { Publication } from '@/data/publications'

export default function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <a
      href={`https://doi.org/${pub.doi}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-[var(--color-primary)]/30 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="shrink-0 rounded-full bg-[var(--color-primary)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-primary)]">
          {pub.journal}
        </span>
        <span className="text-xs font-semibold text-gray-400">{pub.year}</span>
      </div>
      <h3 className="mt-3 text-sm font-semibold leading-snug text-gray-900 group-hover:text-[var(--color-primary)]">
        {pub.title}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-gray-500 line-clamp-2">{pub.authors}</p>
      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[var(--color-accent)]">
        <span>DOI</span>
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </a>
  )
}

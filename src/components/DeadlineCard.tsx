import type { Grant } from '@/data/grants'

function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr)
  const now = new Date()
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function DeadlineCard({ grant }: { grant: Grant }) {
  if (!grant.deadline) return null
  const daysLeft = getDaysUntil(grant.deadline)
  const isUrgent = daysLeft <= 14
  const isPast = daysLeft < 0

  return (
    <div
      className={`rounded-xl border p-4 transition-shadow hover:shadow-md ${
        isPast
          ? 'border-gray-300 bg-gray-50'
          : isUrgent
            ? 'border-red-200 bg-red-50'
            : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">{grant.title}</h4>
          <p className="mt-1 text-xs text-gray-500">
            {grant.agency} {grant.mechanism && `\u00B7 ${grant.mechanism}`}
          </p>
          {grant.pi.length > 0 && <p className="mt-0.5 text-xs text-gray-400">PI: {grant.pi.join(', ')}</p>}
        </div>
        <div className="shrink-0 text-right">
          <div
            className={`text-lg font-bold ${
              isPast ? 'text-gray-400' : isUrgent ? 'text-red-600' : 'text-[var(--color-primary)]'
            }`}
          >
            {isPast ? 'Past' : `${daysLeft}d`}
          </div>
          <div className="text-xs text-gray-400">{formatDate(grant.deadline)}</div>
        </div>
      </div>
    </div>
  )
}

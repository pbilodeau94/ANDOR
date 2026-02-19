import type { Grant } from '@/data/grants'

function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr)
  const now = new Date()
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

function formatCurrency(amount: number | null): string {
  if (!amount) return ''
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
}

export default function GrantCard({ grant }: { grant: Grant }) {
  const daysLeft = grant.deadline ? getDaysUntil(grant.deadline) : null
  const isUrgent = daysLeft !== null && daysLeft >= 0 && daysLeft <= 30

  return (
    <div className={`rounded-lg border bg-white p-3 transition-shadow hover:shadow-md ${isUrgent ? 'border-red-200' : 'border-gray-200'}`}>
      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{grant.title}</h4>
      <p className="mt-1 text-xs text-gray-500">
        {grant.pi || 'TBD'} · {grant.agency}
      </p>
      {grant.amount && (
        <p className="mt-1 text-xs font-medium text-[var(--color-primary)]">
          {formatCurrency(grant.amount)}
        </p>
      )}
      {grant.deadline && daysLeft !== null && (
        <div className={`mt-2 text-xs font-medium ${daysLeft < 0 ? 'text-gray-400' : isUrgent ? 'text-red-600' : 'text-gray-500'}`}>
          {daysLeft < 0 ? 'Past deadline' : `${daysLeft}d until deadline`}
        </div>
      )}
      {grant.diseases.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {grant.diseases.map((d) => (
            <span key={d} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">
              {d}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

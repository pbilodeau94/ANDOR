import type { Grant } from '@/data/grants'
import { grantStatusLabels, grantStatusColors } from '@/data/grants'

function formatCurrency(amount: number | null): string {
  if (!amount) return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function GrantRow({ grant }: { grant: Grant }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-3 pr-4">
        <div className="text-sm font-medium text-gray-900">{grant.title}</div>
        {grant.diseases.length > 0 && (
          <div className="mt-0.5 flex flex-wrap gap-1">
            {grant.diseases.map((d) => (
              <span key={d} className="text-xs text-gray-400">
                {d}
              </span>
            ))}
          </div>
        )}
      </td>
      <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">{grant.pi || '—'}</td>
      <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">{grant.agency}</td>
      <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">{grant.mechanism || '—'}</td>
      <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">{formatCurrency(grant.amount)}</td>
      <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">{formatDate(grant.deadline)}</td>
      <td className="whitespace-nowrap py-3">
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${grantStatusColors[grant.status]}`}
        >
          {grantStatusLabels[grant.status]}
        </span>
      </td>
    </tr>
  )
}

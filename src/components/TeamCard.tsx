import type { TeamMember } from '@/data/team'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function CardContent({ member }: { member: TeamMember }) {
  return (
    <>
      <div className="flex items-center gap-4">
        {member.imageUrl ? (
          <img
            src={member.imageUrl}
            alt={member.name}
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-lg font-bold text-[var(--color-primary)]">
            {getInitials(member.name)}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 group-hover:text-[var(--color-primary)]">
            {member.name}
          </h3>
          <p className="text-sm text-gray-500">{member.title}</p>
          <p className="text-xs text-gray-400">{member.institution}</p>
        </div>
      </div>
      {member.catalystUrl && (
        <div className="mt-2 flex items-center gap-1 text-xs text-[var(--color-accent)] opacity-0 transition-opacity group-hover:opacity-100">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Harvard Catalyst Profile
        </div>
      )}
    </>
  )
}

export default function TeamCard({ member }: { member: TeamMember }) {
  if (member.catalystUrl) {
    return (
      <a
        href={member.catalystUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
      >
        <CardContent member={member} />
      </a>
    )
  }

  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-6">
      <CardContent member={member} />
    </div>
  )
}

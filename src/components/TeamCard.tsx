import type { TeamMember } from '@/data/team'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function TeamCard({ member }: { member: TeamMember }) {
  const Card = member.profileUrl ? 'a' : 'div'
  const linkProps = member.profileUrl
    ? { href: member.profileUrl, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Card
      {...linkProps}
      className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
    >
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
    </Card>
  )
}

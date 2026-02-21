import Image from 'next/image'
import PageHero from '@/components/PageHero'
import EditorialSection from '@/components/EditorialSection'
import { team, roleLabels, fellowships, type TeamMember } from '@/data/team'

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

function displayName(member: TeamMember) {
  return member.degrees ? `${member.name}, ${member.degrees}` : member.name
}

function FacultyMember({ member }: { member: TeamMember }) {
  const content = (
    <div className="flex items-center gap-5">
      {member.imageUrl ? (
        <Image
          src={member.imageUrl}
          alt={member.name}
          width={120}
          height={120}
          className="h-[120px] w-[120px] rounded-full object-cover object-top shrink-0"
        />
      ) : (
        <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[var(--color-surface-alt)] text-2xl font-bold text-[var(--color-primary)] shrink-0">
          {getInitials(member.name)}
        </div>
      )}
      <div className="min-w-0">
        <h3 className="text-lg font-semibold text-[#1a1614] group-hover:text-[var(--color-accent)]">
          {displayName(member)}
        </h3>
        <p className="mt-1 text-sm text-[var(--color-ink-secondary)]">{member.title}</p>
        <p className="mt-0.5 text-xs text-[var(--color-ink-tertiary)]">{member.institution}</p>
        {member.catalystUrl && (
          <span className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--color-accent)] opacity-0 transition-opacity group-hover:opacity-100">
            Harvard Catalyst Profile
          </span>
        )}
      </div>
    </div>
  )

  if (member.catalystUrl) {
    return (
      <a
        href={member.catalystUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        {content}
      </a>
    )
  }

  return <div className="group">{content}</div>
}

function SmallMember({ member }: { member: TeamMember }) {
  const content = (
    <div className="flex items-center gap-3">
      {member.imageUrl ? (
        <Image
          src={member.imageUrl}
          alt={member.name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover object-top shrink-0"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-surface-alt)] text-sm font-semibold text-[var(--color-primary)] shrink-0">
          {getInitials(member.name)}
        </div>
      )}
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-[#1a1614] group-hover:text-[var(--color-accent)]">
          {displayName(member)}
        </h3>
        <p className="text-xs text-[var(--color-ink-tertiary)]">{member.title}</p>
      </div>
    </div>
  )

  if (member.catalystUrl) {
    return (
      <a
        href={member.catalystUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        {content}
      </a>
    )
  }

  return <div className="group">{content}</div>
}

export default function TeamPage() {
  const faculty = team.filter((m) => m.role === 'faculty')
  const fellows = team.filter((m) => m.role === 'fellow')
  const staff = team.filter((m) => m.role === 'staff')

  return (
    <>
      <PageHero
        variant="light"
        overline="Our Team"
        title="Investigators & Staff"
        description="A multidisciplinary group of neurologists, immunologists, and research staff from across Mass General Brigham, united by a commitment to advancing autoimmune neurology."
      />

      {/* Faculty */}
      <EditorialSection rule={false}>
        <p className="overline">{roleLabels.faculty}</p>
        <h2 className="mt-3 font-display text-[clamp(28px,4vw,36px)]">
          {faculty.length} faculty members
        </h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          {faculty.map((member) => (
            <FacultyMember key={member.id} member={member} />
          ))}
        </div>
      </EditorialSection>

      {/* Fellowship Programs */}
      <EditorialSection>
        <p className="overline">Training Programs</p>
        <h2 className="mt-3 font-display text-[clamp(28px,4vw,36px)]">
          Fellowship Programs
        </h2>
        <div className="mt-8 space-y-6">
          {fellowships.map((f) => (
            <div key={f.name} className="border-b border-[var(--color-rule)] pb-6">
              <h3 className="font-semibold text-[#1a1614]">{f.name}</h3>
              {f.director && (
                <p className="mt-1 text-sm text-[var(--color-ink-tertiary)]">
                  Director: {f.director}
                </p>
              )}
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-secondary)]">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </EditorialSection>

      {/* Fellows */}
      <EditorialSection>
        <p className="overline">{roleLabels.fellow}</p>
        <h2 className="mt-3 font-display text-[clamp(28px,4vw,36px)]">
          {fellows.length} fellows &amp; trainees
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fellows.map((member) => (
            <SmallMember key={member.id} member={member} />
          ))}
        </div>
      </EditorialSection>

      {/* Staff */}
      <EditorialSection>
        <p className="overline">{roleLabels.staff}</p>
        <h2 className="mt-3 font-display text-[clamp(28px,4vw,36px)]">
          {staff.length} staff
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((member) => (
            <SmallMember key={member.id} member={member} />
          ))}
        </div>
      </EditorialSection>
    </>
  )
}

import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import TeamCard from '@/components/TeamCard'
import { team, roleOrder, roleLabels } from '@/data/team'

export default function TeamPage() {
  return (
    <>
      <Hero
        subtitle="Our Team"
        title="Investigators & Staff"
        description="ANDOR brings together clinicians, scientists, fellows, and research staff from across Mass General Brigham, united by a commitment to advancing autoimmune neurology."
      />

      {roleOrder.map((role, i) => {
        const members = team.filter((m) => m.role === role)
        if (members.length === 0) return null

        return (
          <SectionWrapper key={role} alt={i % 2 === 1}>
            <h2 className="mb-8 text-2xl font-bold text-[var(--color-primary)]">{roleLabels[role]}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </SectionWrapper>
        )
      })}
    </>
  )
}

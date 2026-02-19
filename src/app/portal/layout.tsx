import PortalTabs from '@/components/portal/PortalTabs'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PortalTabs />
      {children}
    </>
  )
}

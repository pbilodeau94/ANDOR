'use client'

import { diseaseGroups, diseaseGroupIcons } from '@/data/disease-utils'

type DiseaseTabsProps = {
  activeTab: string | null
  onChange: (tab: string | null) => void
}

export default function DiseaseTabs({ activeTab, onChange }: DiseaseTabsProps) {
  const tabs: { key: string | null; label: string; icon?: string }[] = [
    { key: null, label: 'All' },
    ...diseaseGroups.map((name) => ({
      key: name,
      label: name,
      icon: diseaseGroupIcons[name],
    })),
  ]

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Disease filters">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.label}
              onClick={() => onChange(tab.key)}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab.icon && <span className="mr-1.5 hidden sm:inline">{tab.icon}</span>}
              {tab.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

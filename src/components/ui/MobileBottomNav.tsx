'use client'
import { Search, BarChart2, Sliders, Download } from 'lucide-react'

const tabs = [
  { id: 'new-query', icon: Search, label: 'Query' },
  { id: 'results', icon: BarChart2, label: 'Results' },
  { id: 'variables', icon: Sliders, label: 'Variables' },
  { id: 'download', icon: Download, label: 'Download' },
]

export function MobileBottomNav({
  currentSection,
  setSection,
}: {
  currentSection: string
  setSection: (s: any) => void
}) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="flex justify-around py-2">
        {tabs.map((t) => {
          const Icon = t.icon
          const active = currentSection === t.id
          return (
            <button
              key={t.id}
              onClick={() => setSection(t.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 ${
                active ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs">{t.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
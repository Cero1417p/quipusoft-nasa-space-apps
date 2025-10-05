'use client'
import { Cloud, Plus, Sliders, Download, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const menu = [
  { id: 'new-query', label: 'New Query', icon: Plus },
  { id: 'variables', label: 'Select Variables', icon: Sliders },
  { id: 'download', label: 'Download Data', icon: Download },
]

export function Sidebar({
  currentSection,
  setSection,
}: {
  currentSection: string
  setSection: (s: any) => void
}) {
  return (
    <aside className="bg-white shadow-md w-64 p-4 hidden md:flex flex-col">
      <div className="flex items-center space-x-2 mb-8">
        <Cloud className="text-blue-500" />
        <span className="font-bold text-lg">Will it Rain ?s</span>
      </div>
      <nav className="flex-1 space-y-2">
        {menu.map((m) => {
          const Icon = m.icon
          return (
            <button
              key={m.id}
              onClick={() => setSection(m.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium ${
                currentSection === m.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span>{m.label}</span>
            </button>
          )
        })}
      </nav>
      <Link href="/" className="flex items-center space-x-2 text-sm text-gray-500">
        <ArrowLeft size={16} />
        <span>Back to home</span>
      </Link>
    </aside>
  )
}
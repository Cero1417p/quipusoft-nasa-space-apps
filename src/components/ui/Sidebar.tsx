'use client'

import Link from 'next/link'
import { Cloud, Calendar, MapPin, Droplets, Sun } from 'lucide-react'

const menu = [
  { id: 'new-query', label: 'Check Weather', icon: Droplets },
  { id: 'variables', label: 'Select Variables', icon: Calendar },
  { id: 'download', label: 'Download Data', icon: MapPin },
]

export function Sidebar({
  currentSection,
  setSection,
}: {
  currentSection: string
  setSection: (s: any) => void
}) {
  return (
    <aside className="relative w-64 hidden md:flex flex-col bg-gradient-to-b from-slate-800 to-slate-900 text-white border-r border-slate-700">

      {/* Header */}
      <div className="flex items-center space-x-3 mb-8 px-6 py-6 border-b border-slate-700">
        <Sun className="w-6 h-6 text-sky-400" />
        <span className="font-semibold text-lg tracking-wide">Cajamarca Weather</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menu.map((m) => {
          const Icon = m.icon
          const isActive = currentSection === m.id

          return (
            <button
              key={m.id}
              onClick={() => setSection(m.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'hover:bg-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <Icon
                size={20}
                className={`${isActive ? 'text-white' : 'text-slate-400'}`}
              />
              <span>{m.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Back to home */}
      <Link
        href="/"
        className="flex items-center space-x-2 px-6 py-4 text-sm text-slate-400 hover:text-white transition-colors border-t border-slate-700"
      >
        ← Back to home
      </Link>
    </aside>
  )
}
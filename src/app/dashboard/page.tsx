'use client'
import { useState } from 'react'
import { Sidebar } from '@/components/ui/Sidebar'
import { Navbar } from '@/components/ui/Navbar'
import { MobileBottomNav } from '@/components/ui/MobileBottomNav'
import { NewQuerySection } from '@/components/sections/NewQuerySection'
import { ResultsSection } from '@/components/sections/ResultsSection'
import { VariablesSection } from '@/components/sections/VariablesSection'
import { DownloadSection } from '@/components/sections/DownloadSection'

export type Section = 'new-query' | 'results' | 'variables' | 'download'

export default function Dashboard() {
  const [section, setSection] = useState<Section>('new-query')

  const SectionComponent = {
    'new-query': NewQuerySection,
    results: ResultsSection,
    variables: VariablesSection,
    download: DownloadSection,
  }[section]

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar currentSection={section} setSection={setSection} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 pb-24 md:pb-6">
          <SectionComponent />
        </main>
      </div>
      <MobileBottomNav currentSection={section} setSection={setSection} />
    </div>
  )
}
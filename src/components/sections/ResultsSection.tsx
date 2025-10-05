'use client'
import { ArrowLeft, Sun, CloudRain, Wind } from 'lucide-react'
import Link from 'next/link'
import { MockChart } from '@/components/ui/MockChart'

export function ResultsSection() {
  return (
    <section className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Query Results</h2>
        <Link
          href="/dashboard?section=new-query"
          className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>New Query</span>
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card icon={<Sun />} title="Heat Wave" prob="65%" color="orange" />
        <Card icon={<CloudRain />} title="Heavy Rain" prob="40%" color="blue" />
        <Card icon={<Wind />} title="Strong Winds" prob="28%" color="purple" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MockChart title="Temperature Probability" />
        <MockChart title="Historical Trends" />
      </div>

      {/* Text summary */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-medium text-lg mb-3">Summary</h3>
        <p className="text-gray-700">
          In July, this location has a 65 % probability of extreme heat (&gt;32 °C), which is
          significantly above the historical average. The chance of heavy rainfall (&gt;50 mm) is 40 %,
          showing an increasing trend of +12 % over the last decade. Strong winds (&gt;30 km/h) are less
          likely at 28 %, below the historical average.
        </p>
      </div>
    </section>
  )
}

/* ---------- sub-componente Card ---------- */
function Card({
  icon,
  title,
  prob,
  color,
}: {
  icon: React.ReactNode
  title: string
  prob: string
  color: 'orange' | 'blue' | 'purple'
}) {
  const colors = {
    orange: 'border-orange-400 bg-orange-50 text-orange-500',
    blue: 'border-blue-400 bg-blue-50 text-blue-500',
    purple: 'border-purple-400 bg-purple-50 text-purple-500',
  }
  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${colors[color]}`}>
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full ${colors[color]}`}>{icon}</div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">Probability &gt; threshold</p>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold">{prob}</p>
        <p className="text-xs text-gray-500 mt-1">vs historical average</p>
      </div>
    </div>
  )
}
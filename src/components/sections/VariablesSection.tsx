'use client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const VARS = [
  { name: 'Temperature', desc: 'Min, max, and average temperatures' },
  { name: 'Precipitation', desc: 'Rainfall amounts and probability' },
  { name: 'Wind', desc: 'Speed, direction, and gusts' },
  { name: 'Humidity', desc: 'Relative and absolute humidity' },
  { name: 'Snow', desc: 'Snowfall and accumulation' },
  { name: 'Dust/Particulates', desc: 'Air-quality metrics' },
]

export function VariablesSection() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Select Variables</h2>
        <Link
          href="/dashboard?section=new-query"
          className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-medium text-lg mb-3">Available Weather Variables</h3>
        <p className="text-gray-600 mb-4">Select which weather variables you want to include in your analysis.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VARS.map((v) => (
            <label
              key={v.name}
              className="border rounded-lg p-4 hover:border-blue-400 transition cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1 rounded text-blue-500" />
                <div>
                  <h4 className="font-medium">{v.name}</h4>
                  <p className="text-sm text-gray-500">{v.desc}</p>
                </div>
              </div>
            </label>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition">
            Save Preferences
          </button>
        </div>
      </div>
    </section>
  )
}
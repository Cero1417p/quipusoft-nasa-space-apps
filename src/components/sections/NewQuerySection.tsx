'use client'
import { useState, useRef, useEffect } from 'react'
import { Sliders, Download, Plus } from 'lucide-react'

const VARIABLES = ['temperature', 'rain', 'wind', 'humidity', 'snow', 'dust']

export function NewQuerySection() {
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return
    mapRef.current.innerHTML = `
      <div class="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-gray-600">Interactive Map</p>
          <p className="text-xs text-gray-400">Click to select location</p>
        </div>
      </div>
    `
  }, [])

  const toggleVar = (v: string) =>
    setSelected((prev) =>
      prev.includes(v) ? prev.filter((i) => i !== v) : [...prev, v]
    )

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Plan Your Weather Query</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-lg mb-3">Select Location</h3>
          <div ref={mapRef} className="h-96 rounded-lg overflow-hidden" />
        </div>

        {/* Form */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-lg mb-3">Query Parameters</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location or coordinates"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weather Variables</label>
              <div className="grid grid-cols-2 gap-2">
                {VARIABLES.map((v) => (
                  <label key={v} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(v)}
                      onChange={() => toggleVar(v)}
                      className="rounded text-blue-500"
                    />
                    <span className="capitalize">{v}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition">
              Run Query
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
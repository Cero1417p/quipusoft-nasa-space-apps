'use client'
import { useState } from 'react'
import { ArrowLeft, CheckCircle2, Thermometer, Droplets, Wind, Gauge, Snowflake, AlertCircle } from 'lucide-react'
import Link from 'next/link'

const VARS = [
  { 
    name: 'Temperature', 
    desc: 'Min, max, and average temperatures',
    icon: Thermometer,
    color: 'red',
    gradient: 'from-red-50 to-orange-50',
    border: 'border-red-300',
    hover: 'hover:border-red-500',
    bg: 'bg-red-500'
  },
  { 
    name: 'Precipitation', 
    desc: 'Rainfall amounts and probability',
    icon: Droplets,
    color: 'blue',
    gradient: 'from-blue-50 to-cyan-50',
    border: 'border-blue-300',
    hover: 'hover:border-blue-500',
    bg: 'bg-blue-500'
  },
  { 
    name: 'Wind', 
    desc: 'Speed, direction, and gusts',
    icon: Wind,
    color: 'teal',
    gradient: 'from-teal-50 to-emerald-50',
    border: 'border-teal-300',
    hover: 'hover:border-teal-500',
    bg: 'bg-teal-500'
  },
  { 
    name: 'Humidity', 
    desc: 'Relative and absolute humidity',
    icon: Gauge,
    color: 'purple',
    gradient: 'from-purple-50 to-violet-50',
    border: 'border-purple-300',
    hover: 'hover:border-purple-500',
    bg: 'bg-purple-500'
  },
  { 
    name: 'Snow', 
    desc: 'Snowfall and accumulation',
    icon: Snowflake,
    color: 'sky',
    gradient: 'from-sky-50 to-blue-50',
    border: 'border-sky-300',
    hover: 'hover:border-sky-500',
    bg: 'bg-sky-500'
  },
  { 
    name: 'Dust/Particulates', 
    desc: 'Air-quality metrics',
    icon: AlertCircle,
    color: 'amber',
    gradient: 'from-amber-50 to-yellow-50',
    border: 'border-amber-300',
    hover: 'hover:border-amber-500',
    bg: 'bg-amber-500'
  },
]

export function VariablesSection() {
  const [selected, setSelected] = useState<string[]>(['Precipitation'])
  const [saved, setSaved] = useState(false)

  const toggleVariable = (name: string) => {
    setSelected(prev => 
      prev.includes(name) 
        ? prev.filter(v => v !== name) 
        : [...prev, name]
    )
    setSaved(false)
  }

  const handleSave = () => {
    if (selected.length === 0) {
      alert('Please select at least one variable')
      return
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Weather Variables</h2>
          <p className="text-sm text-gray-500 mt-1">
            {selected.length} variable{selected.length !== 1 ? 's' : ''} selected
          </p>
        </div>
        <Link
          href="/dashboard?section=new-query"
          className="flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors px-4 py-2 rounded-lg hover:bg-sky-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Query</span>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-gray-100">
        <div className="mb-6">
          <h3 className="font-bold text-base text-gray-700 mb-2">
            Available Weather Variables
          </h3>
          <p className="text-sm text-gray-600">
            Select the weather variables to include in your analysis. Data is sourced from NASA POWER.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VARS.map((v) => {
            const Icon = v.icon
            const isSelected = selected.includes(v.name)
            
            return (
              <label
                key={v.name}
                className={`group relative bg-gradient-to-br ${v.gradient} border-2 rounded-xl p-5 cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? `${v.border} shadow-lg scale-105` 
                    : `border-gray-200 ${v.hover} hover:shadow-md`
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleVariable(v.name)}
                      className="sr-only"
                    />
                    <div className={`w-12 h-12 rounded-xl ${isSelected ? v.bg : 'bg-gray-300'} flex items-center justify-center transition-all duration-200 group-hover:scale-110`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 mb-1 group-hover:text-gray-900">
                      {v.name}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </label>
            )
          })}
        </div>

        {/* Selected Variables Summary */}
        {selected.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl">
            <p className="text-sm font-bold text-green-700 mb-2">
              ✅ Selected Variables:
            </p>
            <div className="flex flex-wrap gap-2">
              {selected.map(name => (
                <span
                  key={name}
                  className="px-3 py-1 bg-white text-green-700 font-medium text-xs rounded-full border-2 border-green-300 shadow-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={() => setSelected([])}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all duration-200"
          >
            Clear All
          </button>
          <button
            onClick={handleSave}
            disabled={selected.length === 0}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
              saved
                ? 'bg-green-500 text-white'
                : selected.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-yellow-400 hover:bg-yellow-500 text-black shadow-md hover:shadow-lg transform hover:scale-105'
            }`}
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Preferences</span>
            )}
          </button>
        </div>

        {/* Info Footer */}
        <div className="mt-6 pt-4 border-t-2 border-gray-200">
          <p className="text-xs text-gray-500 flex items-center gap-2">
            <span>💡</span>
            <span>
              <strong>Tip:</strong> Select multiple variables for comprehensive weather analysis
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { Download, FileText, Calendar, CheckSquare, Eye } from 'lucide-react'

export function DownloadSection() {
  const [format, setFormat] = useState<'csv' | 'json'>('csv')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedVars, setSelectedVars] = useState<string[]>(['Precipitation'])
  const [isDownloading, setIsDownloading] = useState(false)

  const variables = [
    'Temperature',
    'Precipitation',
    'Wind Speed',
    'Humidity',
    'Snow',
    'Dust/Particulates',
  ]

  const toggleVariable = (variable: string) => {
    setSelectedVars((prev) =>
      prev.includes(variable)
        ? prev.filter((v) => v !== variable)
        : [...prev, variable]
    )
  }

  const handlePreview = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates')
      return
    }
    if (selectedVars.length === 0) {
      alert('Please select at least one variable')
      return
    }
    alert(`Preview:\nFormat: ${format.toUpperCase()}\nDates: ${startDate} to ${endDate}\nVariables: ${selectedVars.join(', ')}`)
  }

  const handleDownload = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates')
      return
    }
    if (selectedVars.length === 0) {
      alert('Please select at least one variable')
      return
    }

    setIsDownloading(true)
    
    // Simulación de descarga
    setTimeout(() => {
      alert(`Downloading ${format.toUpperCase()} file...\nDates: ${startDate} to ${endDate}\nVariables: ${selectedVars.join(', ')}`)
      setIsDownloading(false)
    }, 1500)
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center space-x-3">
        <Download className="w-6 h-6 text-sky-500" />
        <h2 className="text-xl font-bold text-gray-800">Download Weather Data</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-sky-100">
        <p className="text-gray-600 mb-6 text-sm">
          Export historical weather data for your selected location, date range, and variables.
        </p>

        <div className="space-y-5">
          {/* Format Selection */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <FileText className="w-5 h-5 text-purple-600" />
              <label className="text-sm font-bold text-purple-700">Data Format</label>
            </div>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={format === 'csv'}
                  onChange={(e) => setFormat(e.target.value as 'csv')}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">CSV (Spreadsheet)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="json"
                  checked={format === 'json'}
                  onChange={(e) => setFormat(e.target.value as 'json')}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">JSON (Structured Data)</span>
              </label>
            </div>
          </div>

          {/* Date Range */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-5 h-5 text-orange-600" />
              <label className="text-sm font-bold text-orange-700">Date Range</label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Variables Selection */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <CheckSquare className="w-5 h-5 text-blue-600" />
              <label className="text-sm font-bold text-blue-700">Variables to Include</label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {variables.map((variable) => (
                <label
                  key={variable}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer transition-all border-2 ${
                    selectedVars.includes(variable)
                      ? 'bg-blue-100 border-blue-400 shadow-sm'
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedVars.includes(variable)}
                    onChange={() => toggleVariable(variable)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">{variable}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-blue-600 mt-2">
              {selectedVars.length} variable{selectedVars.length !== 1 ? 's' : ''} selected
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={handlePreview}
            className="flex items-center justify-center space-x-2 border-2 border-sky-400 text-sky-600 hover:bg-sky-50 px-6 py-3 rounded-lg font-bold transition-all duration-200"
          >
            <Eye className="w-5 h-5" />
            <span>Preview Data</span>
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
              isDownloading
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-yellow-400 hover:bg-yellow-500 text-black shadow-md hover:shadow-lg'
            }`}
          >
            <Download className="w-5 h-5" />
            <span>{isDownloading ? 'Downloading...' : 'Download Data'}</span>
          </button>
        </div>

        {/* Info Footer */}
        <div className="mt-6 pt-4 border-t-2 border-gray-200">
          <p className="text-xs text-gray-500">
            📊 Data source: <span className="font-semibold">NASA POWER API</span> • Historical climate records
          </p>
        </div>
      </div>
    </section>
  )
}

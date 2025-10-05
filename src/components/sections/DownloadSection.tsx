'use client'

export function DownloadSection() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Download Data</h2>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-medium text-lg mb-3">Export Options</h3>
        <p className="text-gray-600 mb-4">Select the format and data range you want to download.</p>

        <div className="space-y-4">
          {/* Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data Format</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input type="radio" name="format" value="csv" defaultChecked className="text-blue-500" />
                <span>CSV (Spreadsheet)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="format" value="json" className="text-blue-500" />
                <span>JSON (Structured Data)</span>
              </label>
            </div>
          </div>

          {/* Date range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="date" className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="date" className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {/* Variables */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Variables to Include</label>
            <select multiple className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32">
              {['Temperature', 'Precipitation', 'Wind', 'Humidity', 'Snow', 'Dust/Particulates'].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium transition">
            Preview Data
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition">
            Download
          </button>
        </div>
      </div>
    </section>
  )
}
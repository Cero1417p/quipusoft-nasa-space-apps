'use client'
import { Search, Bell, User } from 'lucide-react'

export function Navbar() {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search location..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        {/* ✅ A11y fixed */}
        <button
          aria-label="Notifications"
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Bell size={20} />
        </button>
        <button
          aria-label="User profile"
          className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white"
        >
          <User size={16} />
        </button>
      </div>
    </header>
  )
}
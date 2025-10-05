'use client'
import { Cloud } from 'lucide-react'
import Link from 'next/link'

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Cloud className="text-blue-500" />
          <span className="font-bold text-lg">¿Lloverá en mi desfile?</span>
        </div>
        <Link
          href="/dashboard"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Iniciemos
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Planea tus actividades your activities y no postergues esa ocasión espacial
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Make informed decisions by analyzing historical weather patterns and
            probabilities for any location and date.
          </p>
          <Link
            href="/dashboard"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium shadow-lg"
          >
            Start Planning
          </Link>
        </div>
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm">
        Powered by NASA historical climate data
      </footer>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { Cloud, Droplets } from 'lucide-react'
import Link from 'next/link'

const carnivalImages = [
  'https://images.unsplash.com/photo-1553651986-ef4c22c25bed?q=80&w=1137&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1611594823722-fdcd9c1cf79c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1678365857979-b3455d142733?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]

export function LandingPage() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const intervalId = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carnivalImages.length)
    }, 6000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Animated background slider */}
      <div className="absolute inset-0 -z-10">
        {carnivalImages.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              i === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        {/* Animated gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-blue-900/50 to-pink-900/60 animate-gradient-shift" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <header className={`relative z-10 px-6 md:px-12 py-6 transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <Cloud className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
              <Droplets className="w-4 h-4 text-blue-300 absolute -bottom-1 -right-1 animate-pulse" />
            </div>
            <span className="font-extrabold text-xl md:text-2xl text-white drop-shadow-lg">
              Will it rain at my parade?
            </span>
          </div>
          <Link
            href="/dashboard"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-6 py-3 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-yellow-500/50"
          >
            Let's Start
          </Link>
        </div>
      </header>

      <main className={`relative z-10 flex-1 flex flex-col justify-center items-center px-6 text-center transition-all duration-1000 delay-300 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="max-w-5xl space-y-8">
          <div className="inline-block animate-bounce-slow">
            <span className="text-6xl md:text-8xl">🎭</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight drop-shadow-2xl">
            Plan your activities and don't postpone that
            <span className="block mt-2 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 text-transparent bg-clip-text animate-gradient-x">
              special occasion
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-light">
            Make informed decisions by analyzing historical weather patterns and probabilities for any location and date.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
            <Link
              href="/dashboard"
              className="group relative bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black font-bold px-10 py-4 rounded-full text-lg shadow-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-yellow-500/60 overflow-hidden"
            >
              <span className="relative z-10">Start Planning</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </div>
      </main>

      <footer className={`relative z-10 py-8 text-center transition-all duration-1000 delay-500 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <p className="text-yellow-300 text-sm font-medium drop-shadow-lg">
          Powered by NASA historical climate data
        </p>
      </footer>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

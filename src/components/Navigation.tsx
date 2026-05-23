'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface NavigationProps {
  isScrolled: boolean
}

export function Navigation({ isScrolled }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold gradient-text">
          PRISM AI
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
          <a href="#demo" className="text-gray-300 hover:text-white transition">Demo</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
          <button className="glass px-6 py-2 rounded-lg hover:bg-white/10 font-semibold">
            Sign In
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1"
        >
          <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden glass border-t border-white/10 p-4"
        >
          <div className="space-y-4">
            <a href="#features" className="block text-gray-300 hover:text-white transition">Features</a>
            <a href="#demo" className="block text-gray-300 hover:text-white transition">Demo</a>
            <a href="#pricing" className="block text-gray-300 hover:text-white transition">Pricing</a>
            <button className="w-full glass px-6 py-2 rounded-lg hover:bg-white/10 font-semibold">
              Sign In
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

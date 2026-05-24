'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface User {
  login: string
  name: string
  avatar_url: string
}

interface NavigationProps {
  isScrolled?: boolean
}

export function Navigation({ isScrolled = false }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is authenticated
    const userCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('user_info='))
    
    if (userCookie) {
      try {
        const userInfo = JSON.parse(decodeURIComponent(userCookie.split('=')[1]))
        setUser(userInfo)
      } catch (error) {
        console.error('Failed to parse user info:', error)
      }
    }
  }, [])

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
        <Link href="/" className="text-2xl font-bold gradient-text cursor-pointer hover:opacity-80 transition">
          CodingFox
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/repositories" className="text-gray-300 hover:text-white transition">Repositories</Link>
          <Link href="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img 
                  src={user.avatar_url} 
                  alt={user.login}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-300">{user.login}</span>
              </div>
              <a 
                href="/api/auth/logout" 
                className="px-4 py-2 rounded-lg border border-gray-400 hover:border-white text-gray-300 hover:text-white font-semibold transition-all duration-300"
              >
                Logout
              </a>
            </div>
          ) : (
            <a 
              href="/api/auth/github" 
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-purple-500/20"
            >
              Sign in with GitHub
            </a>
          )}
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
            <Link href="/repositories" className="block text-gray-300 hover:text-white transition">Repositories</Link>
            <Link href="/dashboard" className="block text-gray-300 hover:text-white transition">Dashboard</Link>
            
            {user ? (
              <>
                <div className="flex items-center gap-2 py-2">
                  <img 
                    src={user.avatar_url} 
                    alt={user.login}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-gray-300">{user.login}</span>
                </div>
                <a 
                  href="/api/auth/logout"
                  className="block w-full px-6 py-2 rounded-lg border border-gray-400 text-white font-semibold text-center transition-all duration-300"
                >
                  Logout
                </a>
              </>
            ) : (
              <a 
                href="/api/auth/github"
                className="block w-full px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold text-center transition-all duration-300"
              >
                Sign in with GitHub
              </a>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

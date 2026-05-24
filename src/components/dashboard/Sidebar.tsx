'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface SidebarProps {
  open: boolean
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ open, activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'pull-requests', label: 'Pull Requests', icon: '🔀' },
    { id: 'ai-findings', label: 'AI Findings', icon: '🤖' },
    { id: 'security', label: 'Security Alerts', icon: '🛡️' },
    { id: 'team', label: 'Team Insights', icon: '👥' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
  ]

  return (
    <motion.div
      animate={{ width: open ? 280 : 0 }}
      transition={{ duration: 0.3 }}
      className="hidden md:block border-r border-white/10 overflow-hidden"
    >
      <div className="w-280 h-full p-6 flex flex-col">
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold gradient-text">PRISM AI</h1>
          <p className="text-xs text-gray-400 mt-1">Engineering Intelligence</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                activeTab === item.id
                  ? 'glass bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-400'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="glass rounded-lg p-4 border-t border-white/10 pt-4 mt-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-500" />
            <div>
              <p className="text-sm font-semibold">Dev Team</p>
              <p className="text-xs text-gray-400">Premium Plan</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

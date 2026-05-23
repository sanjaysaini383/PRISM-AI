'use client'

import { motion } from 'framer-motion'

interface TopBarProps {
  onMenuClick: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass border-b border-white/10 px-4 md:px-8 py-4 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
        >
          ☰
        </button>
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="glass px-4 py-2 rounded-lg hover:bg-white/10 text-sm">
          🔔
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 cursor-pointer hover:opacity-80 transition" />
      </div>
    </motion.div>
  )
}

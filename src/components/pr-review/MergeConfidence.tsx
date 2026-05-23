'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface MergeConfidenceProps {
  score: number
}

export function MergeConfidence({ score }: MergeConfidenceProps) {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += score / 50
      if (current >= score) {
        setDisplayScore(score)
        clearInterval(interval)
      } else {
        setDisplayScore(Math.round(current))
      }
    }, 20)
    return () => clearInterval(interval)
  }, [score])

  const getColor = (s: number) => {
    if (s >= 90) return 'from-emerald-500 to-green-500'
    if (s >= 70) return 'from-blue-500 to-cyan-500'
    if (s >= 50) return 'from-amber-500 to-orange-500'
    return 'from-red-500 to-red-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-xl p-6"
    >
      <h3 className="text-lg font-semibold mb-6">Merge Confidence</h3>

      {/* Circular Progress */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
            
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeDasharray={`${(displayScore / 100) * 314} 314`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.5s ease' }}
            />
            
            {/* Gradient */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d9ff" />
                <stop offset="100%" stopColor="#0099cc" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-prism-accent">{displayScore}%</div>
              <div className="text-xs text-gray-400">Ready to Merge</div>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Code Quality</span>
            <span className="text-prism-accent font-semibold">92%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[92%] bg-gradient-to-r from-cyan-500 to-blue-500" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Security</span>
            <span className="text-prism-accent font-semibold">85%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[85%] bg-gradient-to-r from-green-500 to-emerald-500" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Performance</span>
            <span className="text-prism-accent font-semibold">80%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[80%] bg-gradient-to-r from-purple-500 to-blue-500" />
          </div>
        </div>
      </div>

      <button className="w-full mt-6 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-prism-accent font-semibold transition">
        ✓ Approve & Merge
      </button>
    </motion.div>
  )
}

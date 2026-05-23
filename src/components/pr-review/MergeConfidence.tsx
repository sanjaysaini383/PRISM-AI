'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const ANIMATION_DURATION = 20

interface MergeConfidenceProps {
  score: number
}

interface MetricItem {
  label: string
  value: number
  color: string
}

const metrics: MetricItem[] = [
  { label: 'Code Quality', value: 92, color: 'from-purple-500 to-violet-500' },
  { label: 'Security', value: 85, color: 'from-green-500 to-emerald-500' },
  { label: 'Performance', value: 80, color: 'from-orange-500 to-amber-500' },
]

const getScoreColor = (score: number): string => {
  if (score >= 90) return '#10b981'
  if (score >= 70) return '#a855f7'
  if (score >= 50) return '#f97316'
  return '#ef4444'
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
    }, ANIMATION_DURATION)
    return () => clearInterval(interval)
  }, [score])

  const circumference = 314
  const progress = (displayScore / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass p-6"
    >
      <h3 className="text-lg font-semibold mb-8">Merge Confidence</h3>

      {/* Circular Progress */}
      <div className="flex justify-center mb-8">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="3"
            />

            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={getScoreColor(displayScore)}
              strokeWidth="3"
              strokeDasharray={`${progress} ${circumference}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.3s ease, stroke 0.3s ease' }}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                key={displayScore}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-4xl font-bold"
                style={{ color: getScoreColor(displayScore) }}
              >
                {displayScore}%
              </motion.div>
              <div className="text-xs text-gray-500 mt-2">Ready to Merge</div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Breakdown */}
      <div className="space-y-4">
        {metrics.map((metric) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">{metric.label}</span>
              <span className="text-sm font-semibold text-purple-400">{metric.value}%</span>
            </div>
            <div className="h-2 bg-white/8 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metric.value}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-8 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-purple-500/20"
      >
        ✓ Approve & Merge
      </motion.button>
    </motion.div>
  )
}

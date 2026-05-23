'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface AIAnalysisPanelProps {
  isAnalyzing: boolean
  setIsAnalyzing: (analyzing: boolean) => void
}

export function AIAnalysisPanel({ isAnalyzing, setIsAnalyzing }: AIAnalysisPanelProps) {
  const [completedAgents, setCompletedAgents] = useState<string[]>([])

  useEffect(() => {
    if (!isAnalyzing) return

    const agents = [
      { name: 'security', label: 'Security Agent', delay: 500 },
      { name: 'performance', label: 'Performance Agent', delay: 1500 },
      { name: 'architecture', label: 'Architecture Agent', delay: 2500 },
      { name: 'quality', label: 'Code Quality Agent', delay: 3500 },
      { name: 'testing', label: 'Testing Agent', delay: 4500 },
    ]

    const timers = agents.map(agent =>
      setTimeout(() => {
        setCompletedAgents(prev => [...prev, agent.name])
      }, agent.delay)
    )

    setTimeout(() => {
      setIsAnalyzing(false)
    }, 5500)

    return () => timers.forEach(t => clearTimeout(t))
  }, [isAnalyzing, setIsAnalyzing])

  const agents = [
    { name: 'security', label: '🛡️ Security', icon: '🛡️' },
    { name: 'performance', label: '⚡ Performance', icon: '⚡' },
    { name: 'architecture', label: '🏗️ Architecture', icon: '🏗️' },
    { name: 'quality', label: '✨ Quality', icon: '✨' },
    { name: 'testing', label: '🧪 Testing', icon: '🧪' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-xl p-6"
    >
      <h3 className="text-lg font-semibold mb-4">AI Multi-Agent Analysis</h3>

      {/* Agent Status */}
      <div className="space-y-3 mb-6">
        {agents.map((agent) => {
          const isCompleted = completedAgents.includes(agent.name)
          const isActive = isAnalyzing && !isCompleted

          return (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
            >
              <div className="text-lg">{agent.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{agent.label}</p>
              </div>
              {isCompleted ? (
                <span className="text-green-400">✓</span>
              ) : isActive ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-4 h-4 border-2 border-transparent border-t-prism-accent rounded-full"
                />
              ) : (
                <span className="text-gray-500">○</span>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Insights */}
      <div className="border-t border-white/10 pt-4 mb-4">
        <h4 className="text-sm font-semibold mb-3">Key Findings</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>✓ 0 critical security issues</li>
          <li>✓ Architecture follows best practices</li>
          <li>⚠️ 2 performance optimization opportunities</li>
          <li>✓ 95% test coverage</li>
        </ul>
      </div>

      {/* Action Button */}
      <motion.button
        onClick={() => setIsAnalyzing(true)}
        disabled={isAnalyzing}
        whileHover={{ scale: isAnalyzing ? 1 : 1.02 }}
        whileTap={{ scale: isAnalyzing ? 1 : 0.98 }}
        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold transition-all duration-300 disabled:opacity-50 shadow-lg shadow-purple-500/20"
      >
        {isAnalyzing ? 'Analyzing...' : 'Run Full Analysis'}
      </motion.button>
    </motion.div>
  )
}

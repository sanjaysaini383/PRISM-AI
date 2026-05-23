'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function MetricsSection() {
  const [counts, setCounts] = useState({
    faster: 0,
    bugs: 0,
    productivity: 0,
  })

  useEffect(() => {
    const timers = [
      setTimeout(() => setCounts(prev => ({ ...prev, faster: 70 })), 100),
      setTimeout(() => setCounts(prev => ({ ...prev, bugs: 40 })), 300),
      setTimeout(() => setCounts(prev => ({ ...prev, productivity: 300 })), 500),
    ]
    return () => timers.forEach(t => clearTimeout(t))
  }, [])

  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Faster Reviews */}
          <div className="glass rounded-xl p-8 text-center">
            <div className="text-5xl md:text-6xl font-bold mb-2">
              <span className="gradient-text">{counts.faster}%</span>
            </div>
            <p className="text-gray-300 mb-4">Faster PR Reviews</p>
            <p className="text-sm text-gray-400">With AI-powered analysis and automated detection</p>
          </div>

          {/* Fewer Bugs */}
          <div className="glass rounded-xl p-8 text-center">
            <div className="text-5xl md:text-6xl font-bold mb-2">
              <span className="gradient-text">{counts.bugs}%</span>
            </div>
            <p className="text-gray-300 mb-4">Fewer Bugs in Production</p>
            <p className="text-sm text-gray-400">Advanced vulnerability detection and prevention</p>
          </div>

          {/* Productivity */}
          <div className="glass rounded-xl p-8 text-center">
            <div className="text-5xl md:text-6xl font-bold mb-2">
              <span className="gradient-text">{(counts.productivity / 100).toFixed(1)}x</span>
            </div>
            <p className="text-gray-300 mb-4">Developer Productivity</p>
            <p className="text-sm text-gray-400">Automate code reviews and focus on innovation</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

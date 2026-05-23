'use client'

import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 py-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-block"
        >
          <div className="glass px-4 py-2 rounded-full">
            <span className="text-sm font-semibold text-prism-accent">✨ AI-Powered Engineering Intelligence</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="gradient-text">PRISM AI</span>
          <br />
          <span className="text-white">Engineering Intelligence</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          AI-Powered Engineering Intelligence Platform. Review, analyze, and improve code with advanced AI agents.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 justify-center mb-12"
        >
          <button className="glass px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 font-semibold text-lg">
            Start Free Trial
          </button>
          <button className="glass px-8 py-4 rounded-lg hover:bg-white/10 font-semibold text-lg">
            Watch Demo
          </button>
        </motion.div>

        {/* Terminal Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="glass rounded-xl p-6 max-w-2xl mx-auto mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          
          <div className="space-y-2 text-left font-mono text-sm">
            <div className="text-green-400">$ prism review PR-1234</div>
            <div className="text-gray-400">Analyzing pull request...</div>
            <div className="text-gray-400 flex items-center gap-2">
              <span className="animate-pulse">▋</span>
              <span>Scanning security vulnerabilities...</span>
            </div>
            <div className="text-gray-400 mt-2">✓ 15 issues detected</div>
            <div className="text-gray-400">✓ Architecture risks analyzed</div>
            <div className="text-prism-accent">✓ Merge confidence: 87%</div>
          </div>
        </motion.div>

        {/* Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          <div className="glass px-4 py-3 rounded-lg">
            <div className="text-2xl font-bold text-prism-accent">70%</div>
            <div className="text-xs text-gray-400">Faster Reviews</div>
          </div>
          <div className="glass px-4 py-3 rounded-lg">
            <div className="text-2xl font-bold text-prism-accent">40%</div>
            <div className="text-xs text-gray-400">Fewer Bugs</div>
          </div>
          <div className="glass px-4 py-3 rounded-lg">
            <div className="text-2xl font-bold text-prism-accent">3x</div>
            <div className="text-xs text-gray-400">Productivity</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

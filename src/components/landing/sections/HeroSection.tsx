'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const analysisSteps = [
  { label: 'Parsing pull request...', delay: 0 },
  { label: 'Analyzing architecture...', delay: 500 },
  { label: 'Checking vulnerabilities...', delay: 1000 },
  { label: 'Detecting anti-patterns...', delay: 1500 },
  { label: 'Generating fixes...', delay: 2000 },
  { label: 'Computing merge confidence...', delay: 2500 },
]

export function HeroSection() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % analysisSteps.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 py-20 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-block"
        >
          <div className="glass px-4 py-2 rounded-full">
            <span className="text-sm font-semibold text-purple-400">⚡ Real-Time AI Engineering Review</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="gradient-text">Ship Cleaner Code</span>
          <br />
          <span className="text-white">With AI-Powered PR Intelligence</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          PRISM AI reviews pull requests, detects vulnerabilities, analyzes architecture risks, and generates fixes in real time. Get actionable insights instantly.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 justify-center mb-16"
        >
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-lg transition-all duration-300 shadow-lg shadow-purple-500/25"
            >
              Open Dashboard
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="glass px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
          >
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Live Analysis Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="glass rounded-lg p-8 max-w-2xl mx-auto mb-12"
        >
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
            <div className="text-sm font-semibold text-purple-400">AI ANALYSIS IN ACTION</div>
            <div className="ml-auto">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="space-y-3 font-mono text-sm text-left">
            {analysisSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: activeStep >= idx ? 1 : 0.5 }}
                className={`flex items-center gap-3 ${activeStep === idx ? 'text-purple-400' : 'text-gray-500'}`}
              >
                <span className="w-1.5 h-1.5 bg-current rounded-full" />
                {step.label}
                {activeStep === idx && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    |
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <div className="text-gray-400 mb-1">Issues Found</div>
                <div className="text-purple-400 font-semibold text-lg">15</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Security</div>
                <div className="text-green-400 font-semibold text-lg">✓ Safe</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Merge Ready</div>
                <div className="text-purple-400 font-semibold text-lg">87%</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="glass p-6 rounded-lg">
            <div className="text-3xl font-bold text-purple-400 mb-2">70%</div>
            <div className="text-gray-400">Faster Code Reviews</div>
          </div>
          <div className="glass p-6 rounded-lg">
            <div className="text-3xl font-bold text-purple-400 mb-2">40%</div>
            <div className="text-gray-400">Fewer Production Bugs</div>
          </div>
          <div className="glass p-6 rounded-lg">
            <div className="text-3xl font-bold text-purple-400 mb-2">3x</div>
            <div className="text-gray-400">Better Code Quality</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

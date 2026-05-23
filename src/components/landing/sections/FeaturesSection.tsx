'use client'

import { motion } from 'framer-motion'

const features = [
  {
    title: 'AI Security Analysis',
    description: 'Advanced vulnerability detection and security risk assessment across your codebase.',
    icon: '🛡️',
    gradient: 'from-red-500/20 to-pink-500/20',
  },
  {
    title: 'Architecture Risk Detection',
    description: 'Intelligent analysis of architectural patterns and design-level improvements.',
    icon: '🏗️',
    gradient: 'from-purple-500/20 to-blue-500/20',
  },
  {
    title: 'Merge Confidence Score',
    description: 'AI-powered scoring system to determine PR readiness and quality metrics.',
    icon: '📊',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'AI Patch Generation',
    description: 'Automated code fixes and suggestions with before/after comparisons.',
    icon: '🔧',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    title: 'Intelligent PR Summaries',
    description: 'Comprehensive PR analysis with automated release notes and changelogs.',
    icon: '📝',
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    title: 'Multi-Agent Review',
    description: 'Distributed AI agents analyzing security, performance, and code quality.',
    icon: '🤖',
    gradient: 'from-violet-500/20 to-purple-500/20',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Everything you need to revolutionize your development workflow
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`glass glass-hover rounded-xl p-6 h-full bg-gradient-to-br ${feature.gradient}`}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

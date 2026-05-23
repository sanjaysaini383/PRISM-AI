'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function DemoSection() {
  const [activeTab, setActiveTab] = useState('security')

  const demos = {
    security: {
      title: 'Security Analysis',
      code: `// ⚠️ Security Vulnerability Detected
function getUserData(userId) {
  const query = "SELECT * FROM users WHERE id = " + userId
  return db.query(query) // ❌ SQL Injection Risk
}

// ✅ PRISM AI Suggested Fix
function getUserData(userId) {
  const query = "SELECT * FROM users WHERE id = ?"
  return db.query(query, [userId]) // Parameterized query
}`,
      issues: [
        { severity: 'critical', text: 'SQL Injection vulnerability detected' },
        { severity: 'warning', text: 'Missing input validation' },
      ]
    },
    performance: {
      title: 'Performance Analysis',
      code: `// ⚠️ N+1 Query Problem
const users = await db.users.findAll()
for (const user of users) {
  user.posts = await db.posts.find({ userId: user.id })
}

// ✅ PRISM AI Suggested Fix
const users = await db.users.findAll({
  include: [{ relation: 'posts' }]
})`,
      issues: [
        { severity: 'high', text: 'N+1 query pattern detected' },
        { severity: 'warning', text: 'Performance degradation expected' },
      ]
    },
    architecture: {
      title: 'Architecture Analysis',
      code: `// ⚠️ Circular Dependency
// moduleA.ts imports moduleB
// moduleB.ts imports moduleA

// ✅ PRISM AI Suggested Fix
// Extract shared logic into moduleC
// moduleA → moduleC ← moduleB`,
      issues: [
        { severity: 'high', text: 'Circular dependency detected' },
        { severity: 'warning', text: 'Consider dependency extraction' },
      ]
    }
  }

  const current = demos[activeTab as keyof typeof demos]

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
            <span className="gradient-text">See PRISM AI in Action</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Multi-agent AI analysis across security, performance, and architecture
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-8"
        >
          {Object.keys(demos).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === key
                  ? 'glass bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-prism-accent'
                  : 'glass text-gray-300 hover:text-white'
              }`}
            >
              {demos[key as keyof typeof demos].title}
            </button>
          ))}
        </motion.div>

        {/* Demo Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Code */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{current.title}</h3>
              <pre className="bg-black/40 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-gray-300">{current.code}</code>
              </pre>
            </div>

            {/* Issues */}
            <div>
              <h3 className="text-lg font-semibold mb-4">AI Findings</h3>
              <div className="space-y-3">
                {current.issues.map((issue, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <div className={`w-2 h-2 mt-2 rounded-full ${
                      issue.severity === 'critical' ? 'bg-red-500' :
                      issue.severity === 'high' ? 'bg-orange-500' :
                      'bg-amber-500'
                    }`} />
                    <div>
                      <div className={`font-semibold text-sm ${
                        issue.severity === 'critical' ? 'text-red-400' :
                        issue.severity === 'high' ? 'text-orange-400' :
                        'text-amber-400'
                      }`}>
                        {issue.severity.toUpperCase()}
                      </div>
                      <p className="text-gray-300 text-sm">{issue.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

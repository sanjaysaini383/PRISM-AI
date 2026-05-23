'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function PullRequestsTab() {
  const [selectedPR, setSelectedPR] = useState<string | null>(null)

  const prs = [
    {
      id: 'PR-1234',
      title: 'Implement user authentication',
      author: 'alex-dev',
      repo: 'main-app',
      status: 'merged',
      confidence: 92,
      securityIssues: 0,
      performanceIssues: 2,
      time: '2h ago'
    },
    {
      id: 'PR-1233',
      title: 'Refactor database queries',
      author: 'jane-chen',
      repo: 'backend',
      status: 'in-review',
      confidence: 78,
      securityIssues: 1,
      performanceIssues: 3,
      time: '4h ago'
    },
    {
      id: 'PR-1232',
      title: 'Fix SQL injection in login',
      author: 'security-team',
      repo: 'main-app',
      status: 'merged',
      confidence: 95,
      securityIssues: 0,
      performanceIssues: 0,
      time: '1d ago'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-xl p-4 flex gap-4 flex-wrap"
      >
        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-prism-accent text-sm font-semibold">
          All Status
        </button>
        <button className="px-4 py-2 rounded-lg hover:bg-white/5 text-gray-300 text-sm">
          Merged
        </button>
        <button className="px-4 py-2 rounded-lg hover:bg-white/5 text-gray-300 text-sm">
          In Review
        </button>
        <button className="px-4 py-2 rounded-lg hover:bg-white/5 text-gray-300 text-sm">
          Needs Work
        </button>
      </motion.div>

      {/* PR List */}
      <div className="space-y-4">
        {prs.map((pr, index) => (
          <motion.div
            key={pr.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setSelectedPR(pr.id)}
            className={`glass rounded-xl p-6 cursor-pointer transition-all duration-300 ${
              selectedPR === pr.id ? 'ring-2 ring-prism-accent' : 'hover:bg-white/[0.08]'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">{pr.title}</h3>
                <p className="text-sm text-gray-400">{pr.id} in {pr.repo}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                pr.status === 'merged' ? 'bg-green-500/20 text-green-400' :
                pr.status === 'in-review' ? 'bg-blue-500/20 text-blue-400' :
                'bg-amber-500/20 text-amber-400'
              }`}>
                {pr.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <p className="text-gray-400">Author</p>
                <p className="font-semibold">{pr.author}</p>
              </div>
              <div>
                <p className="text-gray-400">Merge Confidence</p>
                <p className="font-semibold text-prism-accent">{pr.confidence}%</p>
              </div>
              <div>
                <p className="text-gray-400">Security Issues</p>
                <p className={`font-semibold ${pr.securityIssues > 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {pr.securityIssues}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Performance Issues</p>
                <p className={`font-semibold ${pr.performanceIssues > 0 ? 'text-amber-400' : 'text-green-400'}`}>
                  {pr.performanceIssues}
                </p>
              </div>
              <div className="ml-auto">
                <p className="text-gray-400">{pr.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'

export function OverviewTab() {
  const stats = [
    { label: 'Total PRs Reviewed', value: '1,247', trend: '+12%', icon: '🔀' },
    { label: 'Avg. Merge Confidence', value: '87%', trend: '+5%', icon: '📊' },
    { label: 'Security Issues Found', value: '34', trend: '-8%', icon: '🛡️' },
    { label: 'Dev Productivity Gain', value: '3.2x', trend: '+18%', icon: '⚡' },
  ]

  const recentPRs = [
    { id: 'PR-1234', title: 'Add authentication system', status: 'merged', confidence: 92, time: '2h ago' },
    { id: 'PR-1233', title: 'Refactor database layer', status: 'in-review', confidence: 78, time: '4h ago' },
    { id: 'PR-1232', title: 'Fix security vulnerability', status: 'merged', confidence: 95, time: '1d ago' },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <span className="text-sm text-prism-accent font-semibold">{stat.trend}</span>
            </div>
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass rounded-xl p-6"
      >
        <h3 className="text-xl font-bold mb-6">Recent Pull Requests</h3>
        <div className="space-y-4">
          {recentPRs.map((pr) => (
            <div key={pr.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition">
              <div>
                <p className="font-semibold">{pr.title}</p>
                <p className="text-sm text-gray-400">{pr.id} • {pr.time}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-semibold text-prism-accent">{pr.confidence}%</p>
                  <p className="text-xs text-gray-400">Confidence</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  pr.status === 'merged' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {pr.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

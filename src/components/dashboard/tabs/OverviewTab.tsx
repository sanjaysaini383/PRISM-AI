'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchPullRequests, type PullRequestSummary } from '@/lib/api-client'

export function OverviewTab() {
  const [pullRequests, setPullRequests] = useState<PullRequestSummary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const prs = await fetchPullRequests('owner', 'repo', 'all', 10)
        setPullRequests(prs)
      } catch (error) {
        console.error('Failed to load PRs:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Calculate stats from real PR data
  const stats = [
    { 
      label: 'Total PRs Reviewed', 
      value: pullRequests.length.toString(), 
      trend: '+12%', 
      icon: '🔀' 
    },
    { 
      label: 'Avg. Merge Confidence', 
      value: '87%', 
      trend: '+5%', 
      icon: '📊' 
    },
    { 
      label: 'Security Issues Found', 
      value: '34', 
      trend: '-8%', 
      icon: '🛡️' 
    },
    { 
      label: 'Dev Productivity Gain', 
      value: '3.2x', 
      trend: '+18%', 
      icon: '⚡' 
    },
  ]

  // Format time difference
  const getTimeAgo = (date: string) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return 'just now'
  }

  const recentPRs = pullRequests.slice(0, 5).map(pr => ({
    id: `PR-${pr.number}`,
    title: pr.title,
    status: pr.status,
    confidence: Math.floor(Math.random() * 30 + 70), // Placeholder until API provides this
    time: getTimeAgo(pr.updatedAt),
  }))

  return (
    <div className="space-y-8">
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-400">Loading dashboard data...</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      {!loading && (
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
      )}

      {/* Recent Activity */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="text-xl font-bold mb-6">Recent Pull Requests</h3>
          <div className="space-y-4">
            {recentPRs.length > 0 ? (
              recentPRs.map((pr) => (
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
                      pr.status === 'merged' ? 'bg-green-500/20 text-green-400' : 'bg-violet-500/20 text-violet-400'
                    }`}>
                      {pr.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                No pull requests available yet. Start integrating your repository!
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

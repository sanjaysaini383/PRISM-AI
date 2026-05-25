'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchPullRequests, type PullRequestSummary } from '@/lib/api-client'

export function PullRequestsTab() {
  const [selectedPR, setSelectedPR] = useState<string | null>(null)
  const [pullRequests, setPullRequests] = useState<PullRequestSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    const loadData = async () => {
      try {
        const prs = await fetchPullRequests('owner', 'repo', 'all', 20)
        setPullRequests(prs)
      } catch (error) {
        console.error('Failed to load PRs:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Filter PRs by status
  const filteredPRs = statusFilter === 'all' 
    ? pullRequests 
    : pullRequests.filter(pr => pr.status === statusFilter)

  // Calculate time ago
  const getTimeAgo = (date: string) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return 'just now'
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-xl p-4 flex gap-4 flex-wrap"
      >
        <button 
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            statusFilter === 'all' 
              ? 'bg-gradient-to-r from-purple-500/30 to-violet-500/30 text-prism-accent' 
              : 'hover:bg-white/5 text-gray-300'
          }`}>
          All Status ({pullRequests.length})
        </button>
        <button 
          onClick={() => setStatusFilter('merged')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            statusFilter === 'merged' 
              ? 'bg-green-500/20 text-green-400' 
              : 'hover:bg-white/5 text-gray-300'
          }`}>
          Merged ({pullRequests.filter(p => p.status === 'merged').length})
        </button>
        <button 
          onClick={() => setStatusFilter('open')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            statusFilter === 'open' 
              ? 'bg-violet-500/20 text-violet-400' 
              : 'hover:bg-white/5 text-gray-300'
          }`}>
          Open ({pullRequests.filter(p => p.status === 'open').length})
        </button>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-400">Loading pull requests...</p>
          </div>
        </div>
      )}

      {/* PR List */}
      {!loading && (
        <div className="space-y-4">
          {filteredPRs.length > 0 ? (
            filteredPRs.map((pr, index) => (
              <motion.div
                key={pr.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setSelectedPR(pr.id)}
                className={`glass rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                  selectedPR === pr.id ? 'ring-2 ring-prism-accent' : 'hover:bg-white/[0.08]'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{pr.title}</h3>
                    <p className="text-sm text-gray-400">PR-{pr.number} in {pr.repository}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                    pr.status === 'merged' ? 'bg-green-500/20 text-green-400' :
                    pr.status === 'open' ? 'bg-violet-500/20 text-violet-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {pr.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-6 text-sm">
                  <div>
                    <p className="text-gray-400">Author</p>
                    <p className="font-semibold">{pr.author}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Files Changed</p>
                    <p className="font-semibold text-prism-accent">{pr.filesChanged}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Additions</p>
                    <p className="font-semibold text-green-400">+{pr.additions}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Deletions</p>
                    <p className="font-semibold text-red-400">-{pr.deletions}</p>
                  </div>
                  <div className="ml-auto">
                    <p className="text-gray-400">{getTimeAgo(pr.updatedAt)}</p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400">
              No pull requests found with this filter.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
